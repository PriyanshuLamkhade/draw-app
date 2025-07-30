import { ElementClass } from "./ElementClass";

export class FreehandClass extends ElementClass {
  points: { x: number; y: number }[];

  constructor(points: { x: number; y: number }[], strokeColor: string) {
    // Start from the first point
    super(points[0].x, points[0].y, strokeColor);
    this.points = points;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }

    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
  }

  isHit(x: number, y: number): boolean {
    // Optional: basic proximity check
    return this.points.some(p => {
      const dx = p.x - x;
      const dy = p.y - y;
      return dx * dx + dy * dy < 16; // within 4px
    });
  }
}
