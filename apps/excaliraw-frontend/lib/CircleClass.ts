import { ElementClass } from "./ElementClass";


export class CircleClass extends ElementClass {
     startAngle
     endAngle
     radius
    constructor(x: number, y: number, radius: number, strokeColor: string) {
        super(x, y, strokeColor)
        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;
        this.radius = radius

    }
    draw(ctx: CanvasRenderingContext2D,panOffsetX: number,panOffsetY: number): void {
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = 1 //can add later
        ctx.save();
        ctx.translate(panOffsetX, panOffsetY)
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,this.startAngle,this.endAngle)
        ctx.stroke()
        ctx.restore()

    }
    isHit(testX: number, testY: number): boolean {
        const dx = testX - this.x;
        const dy = testY - this.y;
        return dx * dx + dy * dy <= this.radius * this.radius;
    }

    getBoundingBox(): { x: number; y: number; width: number; height: number } {
        return {
            x: this.x - this.radius,
            y: this.y - this.radius,
            width: this.radius * 2,
            height: this.radius * 2,
        };
    }
}