export abstract class ElementClass {
    strokeColor: string;
    x: number;
    y: number;
  constructor(x:number, y:number, strokeColor :string) {
    this.x = x;
    this.y = y;
    this.strokeColor = strokeColor;
  }

  abstract draw(ctx:CanvasRenderingContext2D,panOffsetX: number,panOffsetY: number):void 

  abstract isHit(x:number, y:number):boolean  
}
