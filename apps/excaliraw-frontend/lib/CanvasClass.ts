import { CircleClass } from "./CircleClass";
import { EllipseClass } from "./EllipseClass";
import { FreehandClass } from "./FreeHandClass";
import { LineClass } from "./LineClass";
import { RectangleClass } from "./RectangleClass";
import { Shapes } from "./Types";

export class CanvasClass {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private Shapes: Shapes[] = []
    clicked = false
    startX = 0
    startY = 0
    private selectedTool: string
    private currentStroke: { x: number; y: number }[] = [];

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
        if (this.selectedTool === "pencile") {
            this.currentStroke = [{ x: e.offsetX, y: e.offsetY }];
            this.ctx.beginPath()
            this.ctx.moveTo(this.startX, this.startY)
        }
    }

    private handleMouseUp = (e: MouseEvent) => {
        this.clicked = false

        const width = e.offsetX - this.startX
        const height = e.offsetY - this.startY
        if (this.selectedTool === "pencile") {
            const stroke = new FreehandClass(this.currentStroke, "white");
            this.Shapes.push(stroke);
        }

        if (this.selectedTool == "rectangle") {

            const rect = new RectangleClass(this.startX, this.startY, width, height, "white")
            this.Shapes.push(rect)
        }
        if (this.selectedTool === "circle") {
            const centerX = this.startX + width / 2;
            const centerY = this.startY + height / 2;
            const dx = e.offsetX - centerX;
            const dy = e.offsetY - centerY;
            const radius = Math.sqrt(dx * dx + dy * dy);
            const circle = new CircleClass(centerX, centerY, radius, "white")
            this.Shapes.push(circle)


        }
        if (this.selectedTool == "ellipse") {
            const radiusX = Math.abs(width) / 2;
            const radiusY = Math.abs(height) / 2;
            const centerX = this.startX + width / 2;
            const centerY = this.startY + height / 2;

            const rotation = 0;

            const ellipse = new EllipseClass(centerX, centerY, radiusX, radiusY, rotation, "white")
            this.Shapes.push(ellipse)
        }
        if (this.selectedTool === "line") {
            const line = new LineClass(this.startX, this.startY, e.offsetX, e.offsetY, "white")
            this.Shapes.push(line)
        }
    }

    private handleMouseMove = (e: MouseEvent) => {
        if (this.clicked) {
            const width = e.offsetX - this.startX
            const height = e.offsetY - this.startY
            this.drawAll();
            if (this.clicked && this.selectedTool === "pencile") {
                 this.currentStroke.push({ x: e.offsetX, y: e.offsetY });
                this.drawAll(); // redraw existing shapes

                const tempStroke = new FreehandClass(this.currentStroke, "white");
                tempStroke.draw(this.ctx); // draw the current live stroke

            }
            if (this.selectedTool === "rectangle") {
                const rectInstance = new RectangleClass(this.startX, this.startY, width, height, "white")
                rectInstance.draw(this.ctx)
            }
            if (this.selectedTool === "circle") {
                const centerX = this.startX + width / 2;
                const centerY = this.startY + height / 2;
                const dx = e.offsetX - centerX;
                const dy = e.offsetY - centerY;
                const radius = Math.sqrt(dx * dx + dy * dy);
                const circleInstance = new CircleClass(centerX, centerY, radius, "white")
                circleInstance.draw(this.ctx)
            }
            if (this.selectedTool === "ellipse") {
                const radiusX = Math.abs(width) / 2;
                const radiusY = Math.abs(height) / 2;
                const centerX = this.startX + width / 2;
                const centerY = this.startY + height / 2;

                const rotation = 0;

                const ellipseInstance = new EllipseClass(centerX, centerY, radiusX, radiusY, rotation, "white")
                ellipseInstance.draw(this.ctx)
            }
            if (this.selectedTool === "line") {
                const lineInstance = new LineClass(this.startX, this.startY, e.offsetX, e.offsetY, "white")
                lineInstance.draw(this.ctx)
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