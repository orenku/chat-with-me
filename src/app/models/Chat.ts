import mongoose from 'mongoose'
import { Interface } from 'readline'

export interface Chats extends mongoose.Document {
    role: string,
    text: string,
    sessionId: string,
    userId: string
}

const ChatSchema = new mongoose.Schema<Chats>({
    role: {
        type: String,
        require: true,
    },
    text: {
        type: String,
        required: true,
    },
    sessionId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

export default mongoose.models.Chat || mongoose.model<Chats>("Chat", ChatSchema)