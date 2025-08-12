import { ElementClass } from "./ElementClass";


export class RectangleClass extends ElementClass
 {
    width: number;
    height: number;
    
    constructor(x: number, y: number, width: number, height: number, strokeColor: string) {
        super(x, y, strokeColor)
        this.width = width;
        this.height = height
        
    }
    draw(ctx: CanvasRenderingContext2D,panOffsetX: number,panOffsetY: number): void {
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = 1 //can add later
        ctx.save();
        ctx.translate(panOffsetX, panOffsetY)
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.restore()
    }
    isHit(x: number, y: number): boolean {
        return (
            x >= this.x &&
            x <= this.x + this.width &&
            y >= this.y &&
            y <= this.y + this.height
        );
    }
}