import { useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';

export function ImageDrop({setFiles,selectedTool}: any) {
const idCounter = useRef(0);

    const {
        getRootProps,
        getInputProps,
        open, isDragReject
    } = useDropzone({
        noClick: true,
        noKeyboard: true,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        onDrop: (acceptedFiles) => {
            const newFiles = acceptedFiles.map((file) =>{
                idCounter.current += 1;
                return Object.assign(file, {
                     id: idCounter.current,
                    preview: URL.createObjectURL(file),
                })
            });
            setFiles((prev: any) => [...prev, ...newFiles]);
            
        },
    });
    useEffect(() => {
        if (isDragReject) {
            alert("Wrong file type");
        }
    }, [isDragReject]);
   

    return (
        <div className={`${selectedTool === "img" ? `border border-blue-800 border-dashed m-2 mb-0 bg-zinc-800 rounded-xl 
            p-2 px-4 flex gap-2 justify-around flex-wrap` : "hidden" }`}>
            <div className="container">
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p className="text-white">Drag 'n' drop some files here</p>
                    <button
                        type="button"
                        className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded mt-2"
                        onClick={open}
                    >
                        Open File Dialog
                    </button>
                </div>


            </div>
        </div>
    );
}
