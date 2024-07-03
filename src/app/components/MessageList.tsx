import React, { useEffect, useRef } from 'react'
import { Message } from 'ai/react'
import Image from 'next/image'


export interface DisplayMessage {
    role: string,
    text: string,
    id: string
}

interface MessageTypeProps {
    messages: DisplayMessage[],
    className?: string,
    isLoading: boolean
}

const MessageList: React.FC<MessageTypeProps> = ({ messages, className, isLoading }) => {
    const messageListRef = useRef<HTMLDivElement>(null);
    const USER_TEXT = 'bg-primary text-primary-content self-start rounded-t-xl rounded-br-xl'
    const LLM_TEXT = 'bg-primary/25 text-primary-content self-end rounded-t-xl rounded-bl-xl'

    useEffect(() => {
        // Scroll to the bottom only when new messages are added
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]); 

    return (
        <div className={`${className} `} ref={messageListRef}>
                <div className='flex flex-col'>
                    {messages.map(m => {
                        return (
                            <div key={m.id} className={`flex flex-row items-end  my-2 ${m.role === 'User' ? 'justify-start' : 'justify-end'}`}>
                                <div className={` mx-2 flex items-center justify-center w-10 h-10 bg-red-200 rounded-full ${m.role === 'User' ? '' : 'order-2'}`}>
                                    <span className='shadow-sm text-sm font-bold text-primary-content/80'>
                                        {m.role === 'User' ? 'User ' : 'AI '}
                                    </span>
                                </div>
                                <div className={` w-4/5 p-2 shadow-sm ${m.role === 'User' ? USER_TEXT : LLM_TEXT}`} >
                                    <span className='whitespace-pre-wrap text-xl md:text-base'>{m.text}</span>
                                </div>
                            </div>
                        )
                    })}
            </div>
            <div className={`${isLoading ? 'visible' : 'invisible'} flex justify-center`}>
                <span className='loading loading-dots loading-lg text-primary mr-5 center'></span>
            </div>
        </div>
    )
}

export default MessageList