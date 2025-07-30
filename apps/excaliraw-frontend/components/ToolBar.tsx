import { useState } from "react";
import { IconButton } from "./IconButton";
import {Circle, Pencil, RectangleHorizontal} from 'lucide-react'
import { EllipseIcon } from "@/Icons/EllipseIcon";

export  function ToolBar({selectedTool,setSelectedTool}:any){
    
    return(
        <div className="fixed w-[25vmax] mt-2 bg-zinc-800 rounded-xl p-2 px-4 flex gap-2">
            <IconButton gotClicked={selectedTool == "pencil" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<Pencil color="white" size={20} />} onClick={()=>{setSelectedTool("pencil")}}/>
            <IconButton gotClicked={selectedTool == "rectangle" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<RectangleHorizontal color="white" size={20} />} onClick={()=>{setSelectedTool("rectangle")}}/>
            <IconButton gotClicked={selectedTool == "circle" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<Circle color="white" size={20} />} onClick={()=>{setSelectedTool("circle")}}/>
            <IconButton gotClicked={selectedTool == "ellipse" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<EllipseIcon color="white"/>} onClick={()=>{setSelectedTool("ellipse")}}/>
        </div>
    )
}

