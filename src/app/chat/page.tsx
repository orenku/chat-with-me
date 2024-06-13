'use client'

import { useChat } from 'ai/react';
import React, { useState } from 'react'
import MessageList from '../components/MessageList';
import { v4 as uuidv4 } from 'uuid';

const Chat = () => {
    const [sessionId, setsessionId] = useState<string>(Date.now().toString()); //using current time as sessionId - 
    //TODO - change to UUID
    const { messages, input, handleInputChange, handleSubmit, isLoading, } = useChat({ id: sessionId });

    return (
        <div className=" flex flex-col h-full w-full max-w-3xl py-12 mx-auto">
            <MessageList messages={messages} className="flex-grow  overflow-y-auto scroll-snap-y-container" />

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