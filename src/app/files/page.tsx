// import React from 'react'

'use client'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import FileList from "../components/FileList";

function File() {

    const { data: session } = useSession()

    if (!session || !session.user) {
        redirect("api/auth/signin")
    } 

    return (
        <div className="flex flex-col h-full">
            <h1 className="mt-5 ml-10 text-2xl font-bold text-primary">File Manager</h1>

            <FileList />
        </div>
    )
}

export default File