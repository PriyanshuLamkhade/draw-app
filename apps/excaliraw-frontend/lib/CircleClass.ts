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
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = 1 //can add later
        
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,this.startAngle,this.endAngle)
        ctx.stroke()

    }
    isHit(testX: number, testY: number): boolean {
       return false
    }

}