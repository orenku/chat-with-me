import React, { useState } from 'react'

interface FileItemProps {
    name: string,
    index: number,
    deleteFile: (name: string, index: number) => void
}



const FileItem = (props: FileItemProps) => {
    const [isHovering, setIsHovering] = useState<boolean>(); // Track hover state
    const { deleteFile, name, index } = props;

    const handleListItemHover = (index: number, isHovered: boolean) => {
        setIsHovering(isHovered)
    };

    const handleDelete = () => {
        deleteFile(name, index);
    }

    return (
        <>
            <span className="text-left ml-4 pr-1" onMouseEnter={() => handleListItemHover(index, true)}
                onMouseLeave={() => handleListItemHover(index, false)}> {name}
                <button
                    type="button"
                    className={`ml-2 px-4 py-1 font-bold ${isHovering ? 'visible' : 'invisible' // Conditional visibility based on state
                        }`}
                    onClick={() => handleDelete()}
                >
                    Delete me
                </button>
            </span>
        </>

    )
}




export default FileItem