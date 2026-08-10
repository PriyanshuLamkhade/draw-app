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
        const minX = Math.min(this.x, this.x + this.width);
        const maxX = Math.max(this.x, this.x + this.width);
        const minY = Math.min(this.y, this.y + this.height);
        const maxY = Math.max(this.y, this.y + this.height);
        return x >= minX && x <= maxX && y >= minY && y <= maxY;
    }

    getBoundingBox(): { x: number; y: number; width: number; height: number } {
        const minX = Math.min(this.x, this.x + this.width);
        const minY = Math.min(this.y, this.y + this.height);
        return {
            x: minX,
            y: minY,
            width: Math.abs(this.width),
            height: Math.abs(this.height),
        };
    }
}