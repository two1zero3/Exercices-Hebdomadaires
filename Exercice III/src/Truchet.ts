class Truchet {
    x: number;
    y: number;
    rayon: number;
    color: string;
    color2: string;
    rotation: number;
    originalRotation: number;
    constructor(x: number, y: number, rayon: number) {
        this.x = x;
        this.y = y;
        this.rayon = rayon;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.color2 = "black";
        this.rotation = 0;
        this.originalRotation = 0;
    }

    isInMe(mouseX: number, mouseY: number) {
        // on calcule la distance entre la souris et le centre
        let d = dist(mouseX, mouseY, this.x, this.y);
        // on compare cette distance au rayon
        if (d < this.rayon) {
            return true;
        } else {
            return false;
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.save();

        this.rotation = lerp(this.rotation, this.originalRotation, 0.1);

        // on translate et on rotate le contexte
        context.translate(this.x, this.y);
        context.rotate(this.rotation);

        //on dessine le cercle
        this.truchetBlob();

        context.restore();
    }

    rotate() {
        this.originalRotation += Math.PI / 2;
    }

    truchetBlob() {

        //the "square" of width and height this.rayon
        let topLeft = { x: -this.rayon, y: -this.rayon };
        let topRight = { x: this.rayon, y: -this.rayon };
        let bottomLeft = { x: -this.rayon, y: this.rayon };
        let bottomRight = { x: this.rayon, y: this.rayon };


        //debug rectangle 
        // context.beginPath();
        // context.strokeStyle = "black";
        // context.lineWidth = 1;
        // context.rect(topLeft.x, topLeft.y, this.rayon*2, this.rayon*2);
        // context.stroke();
        // context.closePath();

        let rayonBig = this.rayon/1.5;
        let lineWidth = this.rayon/1.5;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(topLeft.x, topLeft.y, rayonBig, 0, 2*Math.PI, true);
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = this.color;
        context.arc(topRight.x, topRight.y, rayonBig, 0, 2*Math.PI, true);
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = this.color;
        context.arc(bottomLeft.x, bottomLeft.y, rayonBig, 0, 2*Math.PI, true);
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = this.color;
        context.arc(bottomRight.x, bottomRight.y, rayonBig, 0, 2*Math.PI, true);
        context.fill();
        context.closePath();

        //the connecting line from bottom left ot top right
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = lineWidth*1.5;
        context.moveTo(bottomLeft.x, bottomLeft.y);
        context.lineTo(topRight.x, topRight.y);
        context.stroke();
        context.closePath();

        context.lineCap = "round";

        //drawing curved lines that connect the midpoint of the "square" of width and height this.rayon
        let midTop = { x: 0, y: -this.rayon };
        let midBottom = { x: 0, y: this.rayon };
        let midLeft = { x: -this.rayon, y: 0 };
        let midRight = { x: this.rayon, y: 0 };


        // use arcTo() to draw a curved line between two points midTop and midLeft
        context.beginPath();
        context.strokeStyle = this.color2;
        context.lineWidth = lineWidth;
        context.moveTo(midTop.x, midTop.y);
        context.arcTo(0, 0, midLeft.x, midLeft.y, this.rayon);
        context.stroke();
        context.closePath();

        context.beginPath();
        context.strokeStyle = this.color2;
        context.lineWidth = lineWidth;
        context.moveTo(midRight.x, midRight.y);
        context.arcTo(0, 0, midBottom.x, midBottom.y, this.rayon);
        context.stroke();
        context.closePath();

    }
}
