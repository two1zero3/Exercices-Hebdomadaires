var a1;
var a2;
var centerX;
var centerY;
var width = 800;
var height = 800;
var context: any;
var colors: string[] = [];

var monCercle: Circle;

function createCanvas(w: number, h: number) {
  var canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  context = canvas.getContext("2d");
  document.body.appendChild(canvas);
}

function draw() {
  // console.log("draw");
  // context.clearRect(0, 0, width, height);

  monCercle.draw();
  requestAnimationFrame(draw);
}

function setup() {
  console.log("setup");
  createCanvas(width, height);
  monCercle = new Circle(400, 400, 100, context);
  document.addEventListener("click", mousePressed);
  draw();
}

function mousePressed(e: MouseEvent) {
  console.log("mousePressed", e);
  // monCercle.changeColor();
  monCercle.definirDestination(e.x, e.y);
  monCercle.definirRayonAleatoire();
}

window.onload = function () {
  console.log("on est pret");
  loadColors();
};
