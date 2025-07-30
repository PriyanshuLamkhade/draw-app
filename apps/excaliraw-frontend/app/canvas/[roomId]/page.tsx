"use client"

import { ToolBar } from "@/components/ToolBar"
import { CanvasClass } from "@/lib/CanvasClass"
import { useEffect, useRef, useState } from "react"

export default function Main() {
  const [selectedTool, setSelectedTool] = useState("rectangle")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasInstanceRef = useRef<CanvasClass | null>(null)

  useEffect(() => {
    if (canvasRef.current && !canvasInstanceRef.current) {
      // initialize once
      const instance = new CanvasClass(canvasRef.current)
      canvasInstanceRef.current = instance
      instance.addHandlers()
    }
  }, [])

  useEffect(() => {
    // update selected tool inside class
    canvasInstanceRef.current?.setSelectedTool(selectedTool)
  }, [selectedTool])

  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden relative cursor bg-zinc-900">
      <canvas ref={canvasRef} className="absolute top-0 left-0" />
      <ToolBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
  )
}
