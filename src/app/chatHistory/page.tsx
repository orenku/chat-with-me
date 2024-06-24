'use client'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import MessageList from "../components/MessageList"
import { DisplayMessage } from '../../app/components/MessageList'


interface chatHistoryType {
    date: Date,
    sessionId: string
}

const ChatHistory = () => {
    const [chatHistory, setChatHistory] = useState<chatHistoryType[]>([])
    const [selectedChatIndex, setSelectedChatIndex] = useState<number>(-1)
    const [messages, setMessages] = useState<DisplayMessage[]>([])

    const { data: session } = useSession()

    if (!session || !session.user) {
        redirect("api/auth/signin")
    }

    useEffect(() => {
        async function getChatHistory() {
            const response = await fetch('api/chatHistory')
            const chats = (await response.json())
            setChatHistory(chats)
        }

        getChatHistory()
    }, [])

    useEffect(() => {
        async function getselectedChatMessages() {
            const selectedSessionId = chatHistory[selectedChatIndex].sessionId

            const messages = await (await fetch(`/api/chat?sessionId=${selectedSessionId}`)).json()
            setMessages(messages)
        }

        if (!document || selectedChatIndex === -1)
            return;
        else {
            getselectedChatMessages();
            (document?.getElementById('chat_modal') as HTMLFormElement).showModal()
        }
    }, [selectedChatIndex, chatHistory])


    return (<div>
        {chatHistory?.map((item, index) => {
            console.log(item)
            return (

                <li key={index} onClick={() => setSelectedChatIndex(index)}>
                    <span className="mr-2">{item.date ? new Date(item.date).toLocaleDateString() : 'Unknown'}</span>
                    <span>{item.sessionId}</span>
                </li>
            )
        })}

        <dialog id="chat_modal" className="modal">
            <div className="modal-box">
                <form method="dialog w-11/12">

                </form>
                <h3 className="font-bold text-lg">Hello!</h3>
                <MessageList messages={messages} className="flex-grow w-full overflow-y-scroll" />
            </div>
        </dialog>
    </div>)
}

export default ChatHistory