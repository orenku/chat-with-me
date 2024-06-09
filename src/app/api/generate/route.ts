import { generateDatasource } from "@/src/app/llamaIndexEngine/generate"
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
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