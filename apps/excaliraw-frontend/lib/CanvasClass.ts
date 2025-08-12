import { CircleClass } from "./CircleClass";
import { EllipseClass } from "./EllipseClass";
import { FreehandClass } from "./FreeHandClass";
import { ImageClass } from "./ImageClass";
import { LineClass } from "./LineClass";
import { RectangleClass } from "./RectangleClass";
import { Shapes } from "./Types";

export class CanvasClass {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private Shapes: Shapes[] = []
    private Images: ImageClass[] = []
    clicked = false
    startX = 0
    startY = 0
    private panOffset = { x: 0, y: 0 }
    private selectedTool: string
    private currentStroke: { x: number; y: number }[] = [];
    private strokeColor
    private src: string | undefined
    clientX = 0;
    clientY = 0;
    startPanMousePosition = { x: 0, y: 0 }
    previousTool = ""
    constructor(canvas: HTMLCanvasElement) {
        if (!canvas) throw new Error("Canvas is null");

        this.canvas = canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.selectedTool = "rectangle"
        this.strokeColor = "#FFFFFF"
        const ctx = canvas.getContext("2d")
        if (!ctx) throw new Error("Unable to get 2D context");
        this.ctx = ctx
        this.ctx.save();
        this.ctx.translate(this.panOffset.x, this.panOffset.y)
        this.ctx.restore();
        this.drawAll()
        this.canvas.style.cursor = "crosshair";
    }
    drawAll() {
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.Shapes.forEach(el => el.draw(this.ctx, this.panOffset.x, this.panOffset.y));
        this.Images.forEach(el => el.draw(this.ctx, this.panOffset.x, this.panOffset.y));
        this.ctx.restore();
    }
    setFiles(fileList: any[]) {
        this.Images = fileList.map(file =>
            new ImageClass(200, 200, file.preview, 50, 50, () => this.drawAll())

        );
    }
    setSelectedTool(selectedTool: string) {
        this.selectedTool = selectedTool
        switch (selectedTool) {
            case "pencile":
            case "rectangle":
            case "circle":
            case "ellipse":
            case "line":
                this.canvas.style.cursor = "crosshair";
                break;
            case "hand":
                this.canvas.style.cursor = "grab";
                break;
            default:
                this.canvas.style.cursor = "default";
        }
    }
    setStrokeColor(strokeColor: string) {
        this.strokeColor = strokeColor
    }
    private getMousePosition(e: MouseEvent) {
        this.clientX = e.clientX - this.panOffset.x
        this.clientY = e.clientY - this.panOffset.y
    }

    private handleMouseDown = (e: MouseEvent) => {
        this.clicked = true
        this.getMousePosition(e)
        if (e.button === 1 || this.selectedTool === "hand") {

            this.previousTool = this.selectedTool
            this.setSelectedTool("hand")
            this.canvas.style.cursor = "grabbing";
            this.startPanMousePosition.x = this.clientX;
            this.startPanMousePosition.y = this.clientY;

        }

        this.startX = this.clientX
        this.startY = this.clientY
        if (this.selectedTool === "pencile") {
            this.currentStroke = [{ x: this.clientX, y: this.clientY }];
            this.ctx.beginPath()
            this.ctx.moveTo(this.startX, this.startY)
        }
    }

    private handleMouseUp = (e: MouseEvent) => {
        this.getMousePosition(e)
        this.clicked = false
        if (e.button == 1) {
            this.canvas.style.cursor = this.previousTool;
            this.setSelectedTool(this.previousTool)
        }
        if (e.button == 0 && this.selectedTool == 'hand') {
            this.setSelectedTool("hand")
        }

        const width = this.clientX - this.startX
        const height = this.clientY - this.startY
        if (this.selectedTool === "pencile") {
            const stroke = new FreehandClass(this.currentStroke, this.strokeColor);
            this.Shapes.push(stroke);
        }

        if (this.selectedTool == "rectangle") {

            const rect = new RectangleClass(this.startX, this.startY, width, height, this.strokeColor)
            this.Shapes.push(rect)
        }
        if (this.selectedTool === "circle") {
            const centerX = this.startX + width / 2;
            const centerY = this.startY + height / 2;
            const dx = this.clientX - centerX;
            const dy = this.clientY - centerY;
            const radius = Math.sqrt(dx * dx + dy * dy);
            const circle = new CircleClass(centerX, centerY, radius, this.strokeColor)
            this.Shapes.push(circle)


        }
        if (this.selectedTool == "ellipse") {
            const radiusX = Math.abs(width) / 2;
            const radiusY = Math.abs(height) / 2;
            const centerX = this.startX + width / 2;
            const centerY = this.startY + height / 2;

            const rotation = 0;

            const ellipse = new EllipseClass(centerX, centerY, radiusX, radiusY, rotation, this.strokeColor)
            this.Shapes.push(ellipse)
        }
        if (this.selectedTool === "line") {
            const line = new LineClass(this.startX, this.startY, this.clientX, this.clientY, this.strokeColor)
            this.Shapes.push(line)
        }
        this.drawAll();
    }

    private handleMouseMove = (e: MouseEvent) => {
        this.getMousePosition(e)
        if (this.clicked) {
            if (this.selectedTool === "hand") {
                this.canvas.style.cursor = "grabbing";
                const deltaX = this.clientX - this.startPanMousePosition.x
                const deltaY = this.clientY - this.startPanMousePosition.y

                this.panOffset.x += deltaX;
                this.panOffset.y += deltaY

            }
            const width = this.clientX - this.startX
            const height = this.clientY - this.startY
            this.drawAll();

            if (this.clicked && this.selectedTool === "pencile") {
                this.currentStroke.push({ x: this.clientX, y: this.clientY });
                this.drawAll(); // redraw existing shapes

                const tempStroke = new FreehandClass(this.currentStroke, this.strokeColor);
                tempStroke.draw(this.ctx, this.panOffset.x, this.panOffset.y); // draw the current live stroke

            }
            if (this.selectedTool === "rectangle") {
                const rectInstance = new RectangleClass(this.startX, this.startY, width, height, this.strokeColor);
                // this.ctx.save();
                // this.ctx.translate(this.panOffset.x, this.panOffset.y);
                rectInstance.draw(this.ctx, this.panOffset.x, this.panOffset.y);
                // this.ctx.restore();
            }
            if (this.selectedTool === "circle") {
                const centerX = this.startX + width / 2;
                const centerY = this.startY + height / 2;
                const dx = this.clientX - centerX;
                const dy = this.clientY - centerY;
                const radius = Math.sqrt(dx * dx + dy * dy);
                const circleInstance = new CircleClass(centerX, centerY, radius, this.strokeColor)
                circleInstance.draw(this.ctx, this.panOffset.x, this.panOffset.y)
            }
            if (this.selectedTool === "ellipse") {
                const radiusX = Math.abs(width) / 2;
                const radiusY = Math.abs(height) / 2;
                const centerX = this.startX + width / 2;
                const centerY = this.startY + height / 2;

                const rotation = 0;

                const ellipseInstance = new EllipseClass(centerX, centerY, radiusX, radiusY, rotation, this.strokeColor)
                ellipseInstance.draw(this.ctx, this.panOffset.x, this.panOffset.y)
            }
            if (this.selectedTool === "line") {
                const lineInstance = new LineClass(this.startX, this.startY, this.clientX, this.clientY, this.strokeColor)
                lineInstance.draw(this.ctx, this.panOffset.x, this.panOffset.y)
            }

        }

    }
    private panFuntion = (e: any) => {
        e.preventDefault();
        if (e.shiftKey) {

            this.panOffset.x -= e.deltaY;
        } else {

            this.panOffset.y -= e.deltaY;
            this.panOffset.x -= e.deltaX;
        }

        this.drawAll()
    }

    // ------------------------- Event Handlers --------------------
    addHandlers() {
        this.canvas.addEventListener("wheel", this.panFuntion, { passive: false });
        this.canvas.addEventListener("mousedown", this.handleMouseDown);
        this.canvas.addEventListener("mousemove", this.handleMouseMove);
        this.canvas.addEventListener("mouseup", this.handleMouseUp);
    }


}