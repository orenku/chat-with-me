import React, { useEffect, useRef } from 'react'
import { Message } from 'ai/react'

const WelcomeMessage = () => {
    return (
        <>
            <p className='text-2xl max-w-2xl m-1 mx-auto font-bold text-secondary-content/80'>You likely arrived here through my LinkedIn profile or by receiving a copy of my resume.</p>
            <p className='text-md max-w-2xl m-2 mx-auto text-secondary-content/80'>Curious to learn more about me? Feel free to ask anything. I&apos;ll do my best to provide an answer.</p>
        </>
    )
}

interface MessageTypeProps {
    messages: Message[],
    className?: string
}

const MessageList: React.FC<MessageTypeProps> = ({ messages, className }) => {
    const messageListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to the bottom only when new messages are added
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]); //

    return (
        <div className={`${className} `} ref={messageListRef}>
            {messages.length === 0 ?
                <WelcomeMessage /> :
                <div className='flex flex-col'>
                    {messages.map(m => (
                        <div key={m.id} className={` card card-side py-1 w-4/5 m-3 p3 
                            ${m.role === 'user' ? 'bg-primary text-primary-content self-start' : 'bg-secondary text-secondary-content self-end'}`} >
                            <span className={`font-bold mx-2`}>
                                {m.role === 'user' ? 'User: ' : 'AI: '}
                            </span>
                            <span className='whitespace-pre-wrap'>{m.content}</span>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default MessageList