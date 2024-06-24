import mongoose from "mongoose";

export interface Sessions extends mongoose.Document {
    sessionId: string,
    userId: string,
    date: Date
}

const SessionSchema = new mongoose.Schema<Sessions>({
    sessionId: {
        type: String,
        rewuired: true
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Session || mongoose.model<Sessions>("Session", SessionSchema)