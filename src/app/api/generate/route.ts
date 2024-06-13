import { generateDatasource } from "@/src/app/llamaIndexEngine/generate"
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth"


export async function POST(request: NextRequest) {
    const session = await getServerSession()

    if (!session?.user?.name) {
        return NextResponse.json(
            { error: "Not loggedin" },
            { status: 400 }
        );
    }

    try {
        await generateDatasource();

        return NextResponse.json({ message: "generate completed succesfuly" })

    } catch (err) {
        console.log('Error = ', err)

        return NextResponse.json(
            {
                error: (err as Error).message,
            },
            {
                status: 500,
            },
        );
    }
}