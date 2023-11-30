var width = 800;
var height = 800;
var context: CanvasRenderingContext2D;
var lineX = 5;
var colY = 5;
var circles: Array<Truchet> = [];
var frameCount = 0;
var colors: Array<string> = [];

function createCanvas(w: number, h: number) {
  var canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  context = canvas.getContext("2d")!;
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

function mousePressed(e: MouseEvent) {

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