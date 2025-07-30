import { RectangleClass } from "./RectangleClass";
interface DrawAble {
    draw(ctx: CanvasRenderingContext2D): void;
    x: number, y: number, width: number, height: number, strokeColor: string
}

export class CanvasClass {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private Shapes: DrawAble[] = []
    clicked = false
    startX = 0
    startY = 0
    private selectedTool: string


    constructor(canvas: HTMLCanvasElement) {
        if (!canvas) throw new Error("Canvas is null");

        this.canvas = canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.selectedTool = "rectangle"
        const ctx = canvas.getContext("2d")
        if (!ctx) throw new Error("Unable to get 2D context");
        this.ctx = ctx

        this.drawAll()
    }
    setSelectedTool(selectedToolTool: string) {
        this.selectedTool = selectedToolTool
    }

    drawAll() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.Shapes.forEach(el => el.draw(this.ctx));
    }
    private handleMouseDown = (e: MouseEvent) => {
        this.clicked = true
        this.startX = e.offsetX
        this.startY = e.offsetY
    }

    private handleMouseUp = (e: MouseEvent) => {
        this.clicked = false

        const width = e.offsetX - this.startX
        const height = e.offsetY - this.startY

        if (this.selectedTool == "rectangle") {

            const rect = new RectangleClass(this.startX, this.startY, width, height, "white")
            this.Shapes.push(rect)
        }
    }

    private handleMouseMove = (e: MouseEvent) => {
        if (this.clicked) {
            const width = e.offsetX - this.startX
            const height = e.offsetY - this.startY
            this.drawAll();
            if (this.selectedTool === "rectangle") {
                const rectInstance = new RectangleClass(this.startX, this.startY, width, height, "white")
                rectInstance.draw(this.ctx)
            }
        }
    }
    // ------------------------- Event Handlers --------------------
    addHandlers() {
        this.canvas.addEventListener("mousedown", this.handleMouseDown);
        this.canvas.addEventListener("mousemove", this.handleMouseMove);
        this.canvas.addEventListener("mouseup", this.handleMouseUp);
    }
    

}