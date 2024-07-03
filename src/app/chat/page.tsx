'use client'

import { useChat } from 'ai/react';
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import MessageList from '../components/MessageList';
import { v4 as uuidv4 } from 'uuid';

const WelcomeMessage: React.FC<{ askSampleQuestion: (q: string) => void }> = ({ askSampleQuestion }) => {
    const buttonClass = 'btn bg-primary text-xl m-1 p-2 md:w-1/4 md:text-base h-auto'
    const sampleQuestions = [
        'What kind of leadership experience does he have?',
        'Does he have experience in working with startups?',
        'Is Oren fun to work with?',
    ]
    //TODO - move samle Questions to .env

    return (
        <div className="flex flex-col justify-start">
            <p className='text-2xl max-w-2xl m-1 mx-auto font-bold text-primary-content/80'>Welcome! You have reached my Digital AI Persona</p>
            <p className='text-xl max-w-2xl m-2 mx-auto text-primary-content/80'>Curious to learn more about me? Feel free to ask anything. I&apos;ll do my best to provide an answer.</p>
            <p className='text-xl max-w-2xl m-2 mx-auto text-primary-content/80 font-bold'>For Example:</p>
            <div className='flex flex-col md:flex-row justify-around '>
                {sampleQuestions.map((question, index) => (
                    <button key={index} className={buttonClass} onClick={() => askSampleQuestion(question)}>{question}</button>
                ))}
            </div>
        </div>
    )
}

const Chat = () => {
    const [sessionId, setsessionId] = useState<string>(Date.now().toString()); //using current time as sessionId - 
    //TODO - change to UUID
    const { messages: _messages, input, setInput, handleInputChange, handleSubmit, isLoading, append } = useChat({ id: sessionId });
    const formRef = React.createRef<HTMLFormElement>();
    const inputRef = useRef<HTMLInputElement>(null); // Ref for the specific input field
    const [sampleQuestionClicked, setSampleQuestioncClicked] = useState<boolean>(false)

    const messages = _messages.map((m) => {
        return {
            id: m.id,
            text: m.content,
            role: m.role === 'user' ? 'User' : 'AI'
        }
    })

    useEffect(() => {
        const ev = new CustomEvent('submit') as unknown as FormEvent<HTMLFormElement>


        handleSubmit(ev, { options: { body: { sessionId } } })
    }, [sampleQuestionClicked]);

    return (
        <div className=" flex flex-col justify-between h-full w-full max-h-dvh overflow-y-auto max-w-3xl pt-12 mx-auto">
            {messages.length === 0 ?
                <WelcomeMessage askSampleQuestion={function (q: string): void {
                    setInput(q)
                    setSampleQuestioncClicked(true)
                }} />
                :
                <MessageList messages={messages} isLoading={isLoading} className="flex-grow w-full overflow-y-scroll" />
            }
            <form ref={formRef} onSubmit={(e) => handleSubmit(e, { options: { body: { sessionId } } })} className="flex flex-row w-full my-5 mx-auto">
                <input
                    ref={inputRef}
                    className=" input input-accent w-full "
                    value={input}
                    placeholder="Ask me anything..."
                    onChange={handleInputChange}
                    autoFocus={true}
                />
            </form>
        </div>
    )
}

export default Chat