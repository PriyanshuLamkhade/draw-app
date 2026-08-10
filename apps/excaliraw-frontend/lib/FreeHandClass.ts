import { ElementClass } from "./ElementClass";

export class FreehandClass extends ElementClass {
  points: { x: number; y: number }[];

  constructor(points: { x: number; y: number }[], strokeColor: string) {
    // Start from the first point
    super(points[0].x, points[0].y, strokeColor);
    this.points = points;
  }

  draw(ctx: CanvasRenderingContext2D,panOffsetX: number,panOffsetY: number): void {
    ctx.save();
    ctx.translate(panOffsetX, panOffsetY)
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
    ctx.restore()
  }

  isHit(x: number, y: number): boolean {
    if (!this.points || this.points.length === 0) return false;
    return this.points.some(p => {
      const dx = p.x - x;
      const dy = p.y - y;
      return dx * dx + dy * dy <= 100; // within 10px
    });
  }

  getBoundingBox(): { x: number; y: number; width: number; height: number } {
    if (!this.points || this.points.length === 0) {
      return { x: this.x, y: this.y, width: 0, height: 0 };
    }
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const p of this.points) {
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    }

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }
}
