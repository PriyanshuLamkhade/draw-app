type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "pencil";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

class CanvasClass{
    // private Shapes :Shape  = []
    private canvas ?:HTMLCanvasElement
    private ctx  ?: CanvasRenderingContext2D
    private x = 0
    private y =0
    socket?: WebSocket 
     
}