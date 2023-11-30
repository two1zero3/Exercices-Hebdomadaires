"use strict";
class Truchet {
    constructor(x, y, rayon) {
        this.x = x;
        this.y = y;
        this.rayon = rayon;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.color2 = "black";
        this.rotation = 0;
        this.originalRotation = 0;
    }
    isInMe(mouseX, mouseY) {
        // on calcule la distance entre la souris et le centre
        let d = dist(mouseX, mouseY, this.x, this.y);
        // on compare cette distance au rayon
        if (d < this.rayon) {
            return true;
        }
        else {
            return false;
        }
    }
    draw(context) {
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
        let rayonBig = this.rayon / 1.5;
        let lineWidth = this.rayon / 1.5;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(topLeft.x, topLeft.y, rayonBig, 0, 2 * Math.PI, true);
        context.fill();
        context.closePath();
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(topRight.x, topRight.y, rayonBig, 0, 2 * Math.PI, true);
        context.fill();
        context.closePath();
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(bottomLeft.x, bottomLeft.y, rayonBig, 0, 2 * Math.PI, true);
        context.fill();
        context.closePath();
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(bottomRight.x, bottomRight.y, rayonBig, 0, 2 * Math.PI, true);
        context.fill();
        context.closePath();
        //the connecting line from bottom left ot top right
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = lineWidth * 1.5;
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
function dist(x1, y1, x2, y2) {
    // calcule la distance entre deux points
    // pythagore power
    let d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return d;
}
function lerp(start, end, amt) {
    // linear interpolation
    // https://en.wikipedia.org/wiki/Linear_interpolation
    return (1 - amt) * start + amt * end;
}
function loadColors() {
    // load colors from the palette.png file -> each pixel is a new color
    let img = new Image();
    img.src = "./static/palette.png";
    img.onload = function () {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);
        let imageData = context.getImageData(0, 0, img.width, img.height);
        let data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];
            let color = `rgb(${r},${g},${b})`;
            colors.push(color);
        }
        setup();
    };
}
var width = 800;
var height = 800;
var context;
var lineX = 5;
var colY = 5;
var circles = [];
var frameCount = 0;
var colors = [];
function createCanvas(w, h) {
    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    context = canvas.getContext("2d");
    document.body.appendChild(canvas);
}
function setup() {
    console.log("setup");
    createCanvas(width, height);
    document.addEventListener("click", mousePressed);
    // INITIALISATION DES CERCLES
    for (let j = 1; j < lineX; j++) {
        for (let i = 1; i < colY; i++) {
            var gridX = width / lineX;
            var gridY = height / colY;
            var r = gridX / 2;
            var circle = new Truchet(i * gridX, j * gridY, r);
            circles.push(circle);
        }
    }
    draw();
}
function draw() {
    frameCount++;
    //every 3 seconds select random circle and rotate it
    if (frameCount % 60 == 0) {
        var randomCircle = Math.floor(Math.random() * circles.length);
        circles[randomCircle].rotate();
    }
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < circles.length; i++) {
        var circle = circles[i];
        circle.draw(context);
    }
    requestAnimationFrame(draw);
}
function mousePressed(e) {
    // il faut utiliser la fonction isInMe() dans CHAQUE circle
    for (let i = 0; i < circles.length; i++) {
        var circle = circles[i];
        if (circle.isInMe(e.x, e.y)) {
            circle.rotate();
        }
    }
}
window.onload = function () {
    console.log("on est pret");
    loadColors();
};
//# sourceMappingURL=build.js.map