import { ElementClass } from "./ElementClass";

export type Rectangle = {
    draw(ctx: CanvasRenderingContext2D,panOffsetX: number,panOffsetY: number): void;
    isHit(x: number, y: number): boolean;
    getBoundingBox(): { x: number; y: number; width: number; height: number };
    x: number, y: number, width: number, height: number, strokeColor: string
}
export type Ellipse = {
    draw(ctx: CanvasRenderingContext2D,panOffsetX: number,panOffsetY: number): void;
    isHit(x: number, y: number): boolean;
    getBoundingBox(): { x: number; y: number; width: number; height: number };
    x: number, y: number, radiusX: number, radiusY: number, rotation: number, strokeColor: string
}
export type Line = {
    draw(ctx: CanvasRenderingContext2D,panOffsetX: number,panOffsetY: number): void;
    isHit(x: number, y: number): boolean;
    getBoundingBox(): { x: number; y: number; width: number; height: number };
    x:number , y:number, x1:number, y1:number
}
export type Circle = {
    draw(ctx: CanvasRenderingContext2D,panOffsetX: number,panOffsetY: number): void;
    isHit(x: number, y: number): boolean;
    getBoundingBox(): { x: number; y: number; width: number; height: number };
     x:number , y:number, radius:number

}
export type Freehand = {
  draw(ctx: CanvasRenderingContext2D,panOffsetX: number,panOffsetY: number): void;
  isHit(x: number, y: number): boolean;
  getBoundingBox(): { x: number; y: number; width: number; height: number };
  points: { x: number; y: number }[];
  strokeColor: string;
};


export type Shapes = ElementClass;



