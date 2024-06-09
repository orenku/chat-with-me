import React, { useEffect, useRef, useState } from 'react'
import FileItem from './FileItem';


const FileList = () => {
    const [fileList, setFileList] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const inputFile = useRef<HTMLInputElement>(null);

    useEffect(() => {
        async function getFiles() {
            const response = await fetch('api/files')
            const files = (await response.json()).files
            setFileList(files)
        }
        getFiles()
    }, [])

    const deleteFile = async (file: string, index: number) => {
        const response = await fetch('api/files', {
            method: 'DELETE',
            body: JSON.stringify({
                fileName: file
            })
        })
        if (response.status === 200)
            setFileList((prevArray) => prevArray.filter((item, i) => i !== index))
    }

    const handleFileupload = async (event: any) => {
        event.preventDefault()
        const file = event.target.files[0]

        setIsProcessing(false);

        if (!file) {
            setErrorMessage('Please select a file to upload')
            return;
        }

        const formData = new FormData();
        formData.append('file', file)

        try {
            let response = await fetch(`api/files`, {
                method: 'POST',
                body: formData
            })

            if (response.ok) {
                setFileList((prevArray) => [...prevArray, file.name])
                setErrorMessage('FIle uploaded')
                if (inputFile.current) {
                    inputFile.current.value = ''
                }
            } else {
                throw new Error(await response.text())
            }
        } catch (error: any) {
            setErrorMessage(error.message)
        } finally {
            setIsProcessing(false);

        }
    }

    const generate = async () => {
        setIsProcessing(true);
        const response = await fetch("/api/generate",
            {
                method: "POST",
                body: JSON.stringify({ data: "some data" })
            })

        setIsProcessing(false);
        return response.json()
    }

    return (
        <div className='flex flex-col flex-grow mb-5'>
            <span
                className={`loading loading-spinner !absolute loading-lg self-center mt-45% h-full ${isProcessing ? 'visible' : 'invisible'}`}
            >Loading...</span
            >
            <div className="card mx-10 my-3  border-dashed border-4 bg-primary/10" >
                <form className="mx-auto p-5" onSubmit={handleFileupload}>
                    <input className="m-5" type="file" onChange={handleFileupload} id="file-select" ref={inputFile} hidden />
                    <label className="btn mx-auto text-sm rounded-md border-0 font-semibold bg-primary/50 hover:bg-secondary/70 cursor-pointer" htmlFor="file-select">Choose File</label>
                    {errorMessage && <div className='alert alert-error mt-1 mb-0 bg-primary/0 border-none '>{errorMessage}</div>}
                </form>
            </div>
            <div className='flex-grow flex-row card bg-primary/10 mx-10'>
                <div className='flex-grow ml-10 overflow-y-auto p-5'>
                    {fileList?.map((file, index) => {
                        return (
                            <li key={index} className="list-item relative" >
                                <FileItem name={file} index={index} deleteFile={deleteFile} />
                            </li>
                        )
                    })}
                </div>
                <button className="btn flex m-5 bg-primary/50 self-end" onClick={generate}>Generate Retriever</button>
            </div>

        </div >
    )
}

export default FileList
