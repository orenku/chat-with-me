import { NextRequest, NextResponse } from "next/server";
import fs, { existsSync, mkdirSync } from 'fs';
import { getServerSession } from "next-auth"
import { tmpdir } from 'os';
import path from "path";

import { DATA_DIR } from "../../llamaIndexEngine/llm-config";

export async function POST(req: NextRequest, res: NextResponse) {
    const session = await getServerSession()

    if (!session?.user?.name) {
        return NextResponse.json(
            { error: "Not loggedin" },
            { status: 400 }
        );
    }

    try {
        const formData = await req.formData();

        const uploadedFile = formData.get("file") as File;

        const fileName = uploadedFile?.name

        if (!uploadedFile) {
            return NextResponse.json(
                { error: "File blob is required." },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await uploadedFile.arrayBuffer());

        const uploadPath = path.join(tmpdir(), DATA_DIR)


        console.log('file upload path = ', uploadPath)

        if (!existsSync(uploadPath)) {
            console.log('Creating directory for files', uploadPath)
            try {
                mkdirSync(uploadPath, { recursive: true });
            } catch (error) {
                console.log('Error uploading file', error)
            }
        }

        try {
            await fs.writeFile(uploadPath + '/' + fileName, buffer, () => { });
        } catch (error) {
            console.error('Error writing file:', error);
        }

        return NextResponse.json(
            { message: "File uploaded successfully!." },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Error uploading file' },
            { status: 500 }
        );
    }
}

export async function GET() {
    const uploadPath = tmpdir() + '/data/'
    const files = fs.readdirSync(uploadPath);

    return NextResponse.json(
        { files }
    );
}

export async function DELETE(req: NextRequest) {
    const uploadPath = tmpdir() + /data/
    const reqBody = await req.json()

    const session = await getServerSession()

    if (!session?.user?.name) {
        return NextResponse.json(
            { error: "Not loggedin" },
            { status: 400 }
        );
    }

    fs.rm(uploadPath + reqBody.fileName, (err) => {
        if (err) {
            return NextResponse.json(
                { error: err },
                { status: 500 }
            )
        }
    })
    return NextResponse.json({})

}