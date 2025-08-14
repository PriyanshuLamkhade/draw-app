import { IconButton } from "./IconButton";
import { Circle, ImagePlusIcon, LucideHand, LucideMousePointer, Menu, Minus, Move, Pencil, RectangleHorizontal } from 'lucide-react'
import { EllipseIcon } from "@/Icons/EllipseIcon";
import { ColorPallet } from "./ColorPallet";
import { useRef } from "react";
interface ToolBarInterface {
  selectedTool: string,
  setSelectedTool: (a: string) => void,
  setBoxClicked: (a: boolean) => void
  strokeColor: string
  setStrokeColor: (a: string) => void,
  boxClicked: boolean

}


export function ToolBar({ selectedTool, setSelectedTool, setBoxClicked, strokeColor, setStrokeColor, boxClicked }: ToolBarInterface) {

  const toolBarRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);

  return (<div ref={toolBarRef} className="flex flex-col items-center absolute ">
    <div className="bg-zinc-800  py-1 rounded-t-md translate-y-1 px-3 border-b-0 border border-black cursor-move"
      onMouseDown={toolBarStart}
    ><Menu color="white" size={20} /></div>
    <div className=" border border-black max-w-[50vmax] mt-0 m-2 mb-0 bg-zinc-800 rounded-xl p-2 px-4 flex gap-2 justify-around flex-col "
      onClick={() => setBoxClicked(false)}>
      <IconButton gotClicked={selectedTool == "hand" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<LucideHand color="white" size={20} />} onClick={() => { setSelectedTool("hand") }} />
      <IconButton gotClicked={selectedTool == "mouse" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<LucideMousePointer color="white" size={20} />} onClick={() => { setSelectedTool("mouse") }} />

      <IconButton gotClicked={selectedTool == "pencile" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<Pencil color="white" size={20} />} onClick={() => { setSelectedTool("pencile") }} />
      <IconButton gotClicked={selectedTool == "rectangle" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<RectangleHorizontal color="white" size={20} />} onClick={() => { setSelectedTool("rectangle") }} />
      <IconButton gotClicked={selectedTool == "circle" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<Circle color="white" size={20} />} onClick={() => { setSelectedTool("circle") }} />
      <IconButton gotClicked={selectedTool == "ellipse" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<EllipseIcon color="white" />} onClick={() => { setSelectedTool("ellipse") }} />
      <IconButton gotClicked={selectedTool == "line" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<Minus color="white" size={20} />} onClick={() => { setSelectedTool("line") }} />
      <IconButton gotClicked={selectedTool == "img" ? " bg-slate-900" : "hover:bg-gray-500"} icon={<ImagePlusIcon color="white" size={20} />} onClick={() => { setSelectedTool("img") }} />


    </div>
    <ColorPallet strokeColor={strokeColor} setStrokeColor={setStrokeColor} selectedTool={selectedTool} boxClicked={boxClicked} setBoxClicked={setBoxClicked} />
  </div>

  )
  function toolBarStart(e: any) {
  setSelectedTool("mouse")
  startX.current = e.clientX
  startY.current = e.clientY
  dragging.current = true

  const moveHandler = (event: MouseEvent) => {
    toolBarMove(event, toolBarRef);
  };

  const upHandler = () => {
    dragging.current = false;
    document.removeEventListener("mousemove", moveHandler);
    document.removeEventListener("mouseup", upHandler);
  };
  document.addEventListener("mousemove", moveHandler);
  document.addEventListener("mouseup", upHandler);
}
function toolBarMove(e: MouseEvent, toolBarRef?: any) {
  if (dragging.current && toolBarRef?.current) {
    let newX = startX.current - e.clientX
    let newY = startY.current - e.clientY

    startX.current = e.clientX
    startY.current = e.clientY

    toolBarRef.current.style.top = `${toolBarRef.current.offsetTop - newY}px`
    toolBarRef.current.style.left = `${toolBarRef.current.offsetLeft - newX}px`

  }

}
}

