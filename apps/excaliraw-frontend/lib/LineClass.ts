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
    draw(ctx: CanvasRenderingContext2D,panOffsetX: number,panOffsetY: number): void {
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = 1 //can add later
    ctx.save();
        ctx.translate(panOffsetX, panOffsetY)
        ctx.beginPath()
        ctx.moveTo(this.x,this.y)
        ctx.lineTo(this.x1,this.y1)
        ctx.stroke();
        ctx.restore()
    }
    isHit(px: number, py: number): boolean {
        const x1 = this.x;
        const y1 = this.y;
        const x2 = this.x1;
        const y2 = this.y1;
        const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
        if (l2 === 0) return Math.hypot(px - x1, py - y1) <= 8;
        let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
        t = Math.max(0, Math.min(1, t));
        const projX = x1 + t * (x2 - x1);
        const projY = y1 + t * (y2 - y1);
        return Math.hypot(px - projX, py - projY) <= 8;
    }

    getBoundingBox(): { x: number; y: number; width: number; height: number } {
        const minX = Math.min(this.x, this.x1);
        const minY = Math.min(this.y, this.y1);
        return {
            x: minX,
            y: minY,
            width: Math.abs(this.x1 - this.x),
            height: Math.abs(this.y1 - this.y),
        };
    }
}