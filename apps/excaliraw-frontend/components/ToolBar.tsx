import { IconButton } from "./IconButton";
import {Circle, LucideHand, LucideMousePointer, Minus, Pencil, RectangleHorizontal} from 'lucide-react'
import { EllipseIcon } from "@/Icons/EllipseIcon";
interface ToolBarInterface{
    selectedTool:string,
    setSelectedTool : (a:string)=>void,
    setBoxClicked:(a:boolean)=>void
}
export function ToolBar({selectedTool,setSelectedTool,setBoxClicked}:ToolBarInterface){
    
    return(
        <div className=" border border-black max-w-[50vmax] m-2 mb-0 bg-zinc-800 rounded-xl p-2 px-4 flex gap-2 justify-around flex-wrap " 
        onClick={()=>setBoxClicked(false)}>
             <IconButton gotClicked={selectedTool == "hand" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<LucideHand color="white" size={20}/>} onClick={()=>{setSelectedTool("hand")}}/>
             <IconButton gotClicked={selectedTool == "mouse" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<LucideMousePointer color="white" size={20}/>} onClick={()=>{setSelectedTool("mouse")}}/>
        
            <IconButton gotClicked={selectedTool == "pencile" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<Pencil color="white" size={20} />} onClick={()=>{setSelectedTool("pencile")}}/>
            <IconButton gotClicked={selectedTool == "rectangle" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<RectangleHorizontal color="white" size={20} />} onClick={()=>{setSelectedTool("rectangle")}}/>
            <IconButton gotClicked={selectedTool == "circle" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<Circle color="white" size={20} />} onClick={()=>{setSelectedTool("circle")}}/>
            <IconButton gotClicked={selectedTool == "ellipse" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<EllipseIcon color="white"/>} onClick={()=>{setSelectedTool("ellipse")}}/>
            <IconButton gotClicked={selectedTool == "line" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<Minus color="white" size={20}/>} onClick={()=>{setSelectedTool("line")}}/>
        
        </div>
    )
}

