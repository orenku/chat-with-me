'use client'

import { useChat } from 'ai/react';
import React, { useState } from 'react'
import MessageList from '../components/MessageList';
import { v4 as uuidv4 } from 'uuid';

const Chat = () => {
    const [sessionId, setsessionId] = useState<string>(Date.now().toString()); //using current time as sessionId - 
    //TODO - change to UUID
    const { messages: _messages, input, handleInputChange, handleSubmit, isLoading, } = useChat({ id: sessionId });

    const messages = _messages.map((m) => {
        return {
            id: m.id,
            text: m.content,
            role: m.role === 'user' ? 'User' : 'AI'
        }
    })

    return (
        <div className=" flex flex-col justify-between h-full w-full max-h-dvh overflow-y-auto max-w-3xl pt-12 mx-auto">
            <MessageList messages={messages} className="flex-grow w-full overflow-y-scroll" />

            <form onSubmit={(e) => handleSubmit(e, { options: { body: { sessionId } } })} className="flex flex-row w-full my-5 mx-auto">
                <span className={`loading loading-dots loading-lg text-primary mr-5 ${isLoading ? 'visible' : 'invisible'} `}></span>

                <input
                    className=" input input-accent w-full "
                    value={input}
                    placeholder="Ask me anything..."
                    onChange={handleInputChange}
                    autoFocus={true}
                />
            </form>
        </div>
    );
}

export default Chat