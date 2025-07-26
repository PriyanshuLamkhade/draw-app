type Rectangle={
    type:"rect";
    x:number;
    y:number;
    weidth:number;
    height:number
}
type Circle ={
    type:"circle";
    centerX : number;
    centerY : number;
    radius :number
}
type Shape = Rectangle | Circle

export function initDraw(canvas: HTMLCanvasElement) {
    let existingShapes: Shape[] =[]
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.fillStyle = "rgba(0,0,0)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let clicked = false;
    let startX = 0;
    let startY = 0;
    canvas.addEventListener("mousedown", (e) => {
        clicked = true
        startX = e.clientX
        startY = e.clientY
    })
    canvas.addEventListener("mouseup", (e) => {
        clicked = false
        const weidth = e.clientX - startX
        const height = e.clientY - startY
        existingShapes.push({
            type:"rect",
            x:startX,
            y:startY,
            weidth:weidth,
            height:height

        })

    })
    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const weidth = e.clientX - startX
            const height = e.clientY - startY

           
            clearCanvas(existingShapes,ctx,canvas)
            ctx.strokeStyle = "white"
            ctx.strokeRect(startX, startY, weidth, height)
        }
    })
}

function clearCanvas(existingShapes:Shape[],ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement){
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      existingShapes.map((shape)=>{
        if(shape.type === "rect"){
            ctx.strokeStyle = "white",
            ctx.strokeRect(shape.x,shape.y,shape.weidth,shape.height)
        }
      })
}