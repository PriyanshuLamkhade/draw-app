// ctx.beginPath();
// ctx.moveTo(250, 30);
// ctx.lineTo(50, 250);
// ctx.stroke()

import { ElementClass } from "./ElementClass";


export class LineClass extends ElementClass
 {
    x1
    y1
    constructor(x: number, y: number, x1:number,y1:number,strokeColor:string) {
        super(x, y, strokeColor)
        this.x1 = x1
        this.y1 = y1
        
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = 1 //can add later
    
        ctx.beginPath()
        ctx.moveTo(this.x,this.y)
        ctx.lineTo(this.x1,this.y1)
        ctx.stroke();
        
    }
    isHit(x: number, y: number): boolean {
        return (
          false
        );
    }
}