export type Rectangle = {
    draw(ctx: CanvasRenderingContext2D): void;
    x: number, y: number, width: number, height: number, strokeColor: string
}
export type Ellipse = {
    draw(ctx: CanvasRenderingContext2D): void;
    x: number, y: number, radiusX: number, radiusY: number, rotation: number, strokeColor: string
}

export type Shapes = Rectangle | Ellipse