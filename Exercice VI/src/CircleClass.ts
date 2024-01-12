class Circle {
    x: number;
    y: number;
    radius: number;
    ctx: CanvasRenderingContext2D;
    constructor(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.ctx = ctx;
    }
  
    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = "rgba(255,255,255,1)";
      this.ctx.fill();
      this.ctx.closePath();
    }
  }
  