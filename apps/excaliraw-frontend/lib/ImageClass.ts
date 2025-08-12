export class ImageClass {
    private img: HTMLImageElement;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private isLoaded: boolean = false;

    constructor(
        x: number,
        y: number,
        src: string,
        width?: number,
        height?: number,
        onLoadCallback?: () => void
    ) {
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = src;
        this.width = width ?? this.img.width;
        this.height = height ?? this.img.height;


        // Scale image down on load
        this.img.onload = () => {
            this.isLoaded = true;

            // Example: scale to max width 200px, preserving aspect ratio
            const maxWidth = 200;
            const scale = maxWidth / this.img.width;
            this.width = this.img.width * scale;
            this.height = this.img.height * scale;

            if (onLoadCallback) onLoadCallback();
        };
    }

    draw(ctx: CanvasRenderingContext2D,panOffsetX: number,panOffsetY: number): void {
        if (this.isLoaded) {
            ctx.save();
        ctx.translate(panOffsetX, panOffsetY)
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            ctx.restore()
        }

    }
}
