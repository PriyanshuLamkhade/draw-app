"use client"
import { ToolBar } from "@/components/ToolBar"
import { RectangleClass } from "@/lib/RectangleClass";
import { useEffect, useRef, useState } from "react"

interface DrawAble {
    draw(ctx: CanvasRenderingContext2D): void;
    x: number, y: number, width: number, height: number, strokeColor: string
}
export default function Main() {
    const [selectedTool, setSelectedTool] = useState("rectangle")
    const [elements, setElements] = useState<DrawAble[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null)
    let clicked = useRef(false)
    let startX = useRef(0)
    let startY = useRef(0)

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current
            if (!canvas) return
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const ctx = canvas.getContext("2d")
            if (!ctx) return
            const drawAll = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                elements.forEach(el => RectangleClass.draw(ctx));
            };

            drawAll()


            const handleMouseDown = (e: MouseEvent) => {
                clicked.current = true
                startX.current = e.offsetX
                startY.current = e.offsetY
            }

            const handleMouseUp = (e: MouseEvent) => {
                clicked.current = false

                const width = e.offsetX - startX.current
                const height = e.offsetY - startY.current

                if (selectedTool == "rectangle") {

                    const rect = new RectangleClass(startX.current, startY.current, width, height, "white")
                    setElements(prev => [...prev, rect])
                }
            }

            const handleMouseMove = (e: MouseEvent) => {
                if (clicked.current) {
                    const width = e.offsetX - startX.current
                    const height = e.offsetY - startY.current
                    drawAll();
                    if (selectedTool === "rectangle") {
                        const rectInstance = new RectangleClass(startX.current, startY.current, width, height, "white")
                        rectInstance.draw(ctx)
                    }
                }
            }

            canvas.addEventListener("mousedown", handleMouseDown);
            canvas.addEventListener("mouseup", handleMouseUp);
            canvas.addEventListener("mousemove", handleMouseMove);
        }

    }, [canvasRef, elements])
    return <div className="w-[100vw] h-[100vh] overflow-hidden relative cursor bg-zinc-900">

        <canvas ref={canvasRef} className="w-[100vw] h-[100vh] absolute top-0 left-0 ">
        </canvas>
        <ToolBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
}