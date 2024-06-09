// import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { getDataSource } from '../../llamaIndexEngine/generate';
import { createChatEngine } from '../../llamaIndexEngine/engine';
import { LlamaIndexStream } from "../../llamaIndexEngine/llamaIndex-stream";
import { ChatMessage, MessageContent, OpenAI } from "llamaindex";
import { NextResponse } from 'next/server';
import { createAndWriteToLog } from '../../lib/logging'
import fs from 'fs'

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

export async function POST(req: Request) {
    const body = await req.json();
    const { messages, data, sessionId }: { messages: ChatMessage[]; data: any, sessionId: string } = body;
    const userMessage = messages.pop()

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

    createAndWriteToLog(sessionId, userMessage.content.toString(), 'Q: ')

    const response = await chatEngine.chat({
        message: userMessageContent,
        chatHistory: messages,
        stream: true
    })

    const callbacks = {
        onCompletion: async (message: any) => {
            createAndWriteToLog(sessionId, message, 'A: ')
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