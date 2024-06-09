// import React from 'react'

'use client'
import { generateDatasource } from "@/src/app/llamaIndexEngine/generate"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import FileList from "../components/FileList";
function File() {




    return (
        <div className="flex flex-col h-full">
            <h1 className="mt-5 ml-10 text-2xl font-bold text-primary">File Manager</h1>

            <FileList />
        </div>
    )
}

export default File