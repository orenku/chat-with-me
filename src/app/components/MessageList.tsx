import React, { useEffect, useRef } from 'react'
import { Message } from 'ai/react'
import Image from 'next/image'

const WelcomeMessage = () => {
    return (
        <>
            <p className='text-2xl max-w-2xl m-1 mx-auto font-bold text-primary-content/80'>You likely arrived here through my LinkedIn profile or by receiving a copy of my resume.</p>
            <p className='text-md max-w-2xl m-2 mx-auto text-primary-content/80'>Curious to learn more about me? Feel free to ask anything. I&apos;ll do my best to provide an answer.</p>
            <p className='text-md max-w-2xl m-2 mx-auto text-primary-content/80'>For Example:</p>
            <Image src='/example.png' width={700} height={700} quality={100} alt="example" />
        </>
    )
}

interface MessageTypeProps {
    messages: Message[],
    className?: string
}

const MessageList: React.FC<MessageTypeProps> = ({ messages, className }) => {
    const messageListRef = useRef<HTMLDivElement>(null);
    const USER_TEXT = 'bg-primary text-primary-content self-start rounded-t-xl rounded-br-xl'
    const LLM_TEXT = 'bg-primary/25 text-primary-content self-end rounded-t-xl rounded-bl-xl'

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
                        <div key={m.id} className={`flex flex-row items-end  my-2 ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                            <div className={` mx-2 flex items-center justify-center w-10 h-10 bg-red-200 rounded-full ${m.role === 'user' ? '' : 'order-2'}`}>
                                <span className='shadow-sm text-sm font-bold text-primary-content/80'>
                                    {m.role === 'user' ? 'User ' : 'AI '}
                                </span>
                            </div>
                            <div className={` w-4/5 p-2 shadow-sm ${m.role === 'user' ? USER_TEXT : LLM_TEXT}`} >
                                <span className='whitespace-pre-wrap'>{m.content}</span>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default MessageList