import { NextRequest, NextResponse } from "next/server";
import Session from "../../models/Session";
import dbConnect from "../../lib/dbConnect";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest, res: NextResponse) {
    const session = await getServerSession()

    if (!session?.user?.name) {
        return NextResponse.json(
            { error: 'Not Loggedin' },
            { status: 400 }
        )
    }

    try {
        await dbConnect()

        const chats = await Session.find({}, null, { sort: { date: -1 } })
        console.log(JSON.stringify(chats))

        return NextResponse.json(chats)
    } catch (error) {
        return NextResponse.json({ error, status: 400 })
    }
}