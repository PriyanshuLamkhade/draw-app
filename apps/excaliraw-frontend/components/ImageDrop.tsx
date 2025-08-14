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
        <div className={`${selectedTool === "img" ? `border border-blue-800 border-dashed m-2  bg-zinc-800 rounded-xl 
             px-4   ` : "hidden" }`}>
                <div {...getRootProps({ className: 'dropzone h-full w-full   flex flex-col  justify-around' })}>
                    <input {...getInputProps()} />
                    <p className="text-white ">Drag 'n' drop some files here</p>
                    <button
                        type="button"
                        className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded mt-2"
                        onClick={open}
                    >
                        Open File Dialog
                    </button>
                </div>


        </div>
    );
}
