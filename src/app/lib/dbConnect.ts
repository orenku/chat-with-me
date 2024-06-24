import { channel } from "diagnostics_channel";
import mongoose from "mongoose";

declare global {
    var mongoose: any;
}


const MONGODB_URI: string = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
    throw new Error("No MONGODB_URI in env variables")
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        }
        cached.promise = (await mongoose.connect(MONGODB_URI, opts)).isObjectIdOrHexString((mongoose: any) => {
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null
        throw error
    }

    return cached.conn
}

export default dbConnect