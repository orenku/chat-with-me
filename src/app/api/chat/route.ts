// import OpenAI from 'openai';
import { StreamingTextResponse } from 'ai';
import { createChatEngine } from '../../llamaIndexEngine/engine';
import { LlamaIndexStream } from "../../llamaIndexEngine/llamaIndex-stream";
import { ChatMessage, MessageContent, OpenAI } from "llamaindex";
import { NextRequest, NextResponse } from 'next/server';
import { getLogger } from '../../lib/logging'
import dbConnect from '../../lib/dbConnect'
import Chat from '../../models/Chat'
import Session from '../../models/Session'

import fs from 'fs'

const Log = getLogger();

const convertMessageContent = (
    textMessage: string,
    imageUrl: string | undefined,
): MessageContent => {
    if (!imageUrl) return textMessage;
    return [
        {
            type: "text",
            text: textMessage,
        },
        {
            type: "image_url",
            image_url: {
                url: imageUrl,
            },
        },
    ];
};

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const sessionId = searchParams.get('sessionId');

    await dbConnect()
    try {
        const messages = await Chat.find({ sessionId })
        return NextResponse.json(messages)
    } catch (error) {
        return NextResponse.json(
            { error },
            { status: 400 }
        )
    }
}

export async function POST(req: Request) {
    const body = await req.json();
    const { messages, data, sessionId }: { messages: ChatMessage[]; data: any, sessionId: string } = body;
    const userMessage = messages.pop()

    await dbConnect()
    await Session.findOneAndUpdate({ sessionId: sessionId }, { sessionId: sessionId, userId: '1' }, { upsert: true, new: true });


    if (!messages || !userMessage || userMessage.role !== "user") {
        return NextResponse.json(
            {
                error:
                    "messages are required in the request body and the last message must be from the user",
            },
            { status: 400 },
        );
    }

    const llm = new OpenAI({
        model: (process.env.MODEL as any) ?? "gpt-3.5-turbo",
        maxTokens: 512,
    });

    const chatEngine = await createChatEngine(llm);

    // Convert message content from Vercel/AI format to LlamaIndex/OpenAI format
    const userMessageContent =
        convertMessageContent(
            userMessage.content.toString(),
            undefined,
            // data?.imageUrl,
        );

    Log.info({ sessionId, text: userMessage.content.toString(), user: 'User' })

    try {
        const chat = await Chat.create({
            role: 'User',
            text: userMessage.content.toString(),
            sessionId,
            userId: 1 // TODO - Add multy user support in the future
        })
    } catch (error) {
        return NextResponse.json(
            { error: "Internal DB error" },
            { status: 400 }
        );
    }

    const response = await chatEngine.chat({
        message: userMessageContent,
        chatHistory: messages,
        stream: true
    })

    const callbacks = {
        onCompletion: async (message: any) => {
            const chat = await Chat.create({
                role: 'AI',
                text: message,
                sessionId,
                userId: 1 // TODO - Add multy user support in the future
            })

            Log.info({ sessionId, text: message, user: 'AI' })
        },
    };

    // Transform LlamaIndex stream to Vercel/AI format
    const { stream } = LlamaIndexStream(response, {
        parserOptions: {
            image_url: data?.imageUrl,
        },
        callbacks: callbacks
    });

    // Respond with the stream
    return new StreamingTextResponse(stream, {});
}