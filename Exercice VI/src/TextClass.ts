class TextCustom {
    x: number;
    y: number;
    ctx: CanvasRenderingContext2D;
    fontSize: number;
    letters: string;
    letter: string;
    constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.fontSize = 15;
        this.letters = "abcdefghijklmnopqrstuvwxyz0123456789";
        this.letter =
            this.letters[Math.floor(Math.random() * this.letters.length)];
    }

    draw() {
        this.ctx.font = `${this.fontSize}px Arial`;
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`${this.letter}`, this.x, this.y);
    }
}
