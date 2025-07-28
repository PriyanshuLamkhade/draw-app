"use client"
import { ToolBar } from "@/components/ToolBar"
import { useEffect, useRef, useState } from "react"


export default function Main() {
    const[selectedTool,setSelectedTool] = useState("")
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(()=>{
        if(canvasRef.current){
            const canvas = canvasRef.current
            
            const ctx = canvas.getContext("2d")
            if(!ctx) return
        }
    },[canvasRef])
    return <div className="w-[100vw] h-[100vh] overflow-hidden relative cursor bg-zinc-900">
    
        <canvas ref={canvasRef} className="w-[100vw] h-[100vh] absolute top-0 left-0 ">
        </canvas>
        <ToolBar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
    </div>
}