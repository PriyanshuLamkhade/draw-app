import { ElementClass } from "./ElementClass";


export class EllipseClass extends ElementClass {
     startAngle
     endAngle
     radiusX
     radiusY
     rotation
    constructor(x: number, y: number, radiusX: number, radiusY: number, rotation: number, strokeColor: string) {
        super(x, y, strokeColor)
        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;
        this.radiusX = radiusX;
        this.radiusY = radiusY
        this.rotation = rotation
    }
    draw(ctx: CanvasRenderingContext2D,panOffsetX: number,panOffsetY: number): void {
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = 1 //can add later
        ctx.save();
        ctx.translate(panOffsetX, panOffsetY)
        ctx.beginPath()
        ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle)
        ctx.stroke()
        ctx.restore()
    }
    isHit(testX: number, testY: number): boolean {
        const dx = testX - this.x;
        const dy = testY - this.y;

        return ((dx * dx) / (this.radiusX * this.radiusX)) + ((dy * dy) / (this.radiusY * this.radiusY)) <= 1;
    }

}