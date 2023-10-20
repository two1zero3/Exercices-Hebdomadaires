var a1;
var a2;
var centerX;
var centerY;
var width = 200;
var height = 200;
var context;
var rayon;
var color;
var bigRadius;
var smallRadius;

function createCanvas(w, h) {
    var canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    document.body.appendChild(canvas);
}

function circle(x, y, rayon) {
    context.beginPath();
    context.arc(x, y, rayon, 0, 2 * Math.PI, true);
    context.strokeStyle = "hsl(" + color + ", 50%,50%)";
    context.stroke();
    context.closePath();
}

function setup() {
    console.log("setup");
    createCanvas(width, height);
    color = 0;
    a1 = 0;
    a2 = 0;
    rayon = 50;
    bigRadius = 100;
    smallRadius = 100;
    centerX = width / 2;
    centerY = height / 2;

    // document.addEventListener("click", mousePressed);

    draw();
}

function draw() {
    //   console.log("draw");
    // context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(255,255,255,0.01)";
    context.fillRect(0, 0, width, height);
    //
    a1 += 1.83;
    a2 += 1.23;
    color += 1;
    var posx = centerX + Math.cos(a1 * (Math.PI / 180)) * bigRadius;
    var posy = centerY + Math.sin(a2 * (Math.PI / 180)) * smallRadius;
    var r = Math.abs(100 * Math.cos(a1 * (Math.PI / 180)));

    star(posx, posy, 10, 100, a1 * (Math.PI / 180) % 10);

    var imageData = context.getImageData(0, 0, width, height);
    var dithered = ditherImageData(imageData);
    context.putImageData(dithered, 0, 0);

    requestAnimationFrame(draw);
}

function mousePressed(e) {
    console.log("mousePressed");
}

window.onload = function () {
    console.log("on est pret");
    setup();
};

function star (x, y, r, r2, numberOfPoints) {
    context.fillStyle = "hsl(" + color + ", 50%,50%)";
    context.save();
    context.translate(x, y);
    context.rotate(numberOfPoints);
    context.beginPath();
    context.moveTo(r, 0);
    for (var i = 0; i < numberOfPoints; i++) {
        context.rotate(Math.PI / numberOfPoints);
        context.lineTo(r2, 0);
        context.rotate(Math.PI / numberOfPoints);
        context.lineTo(r, 0);
    }
    context.closePath();
    context.fill();
    context.restore();
}

function ditherImageData(imageDataToDither) {
  var ditheredData = new Uint8ClampedArray(imageDataToDither.data.length);
  var width = imageDataToDither.width;
  var height = imageDataToDither.height;
  var index, oldR, oldG, oldB, newR, newG, newB, errR, errG, errB;
  var quantErrorR, quantErrorG, quantErrorB;
  var threshold = 128;
  var quantWeight = 7 / 16;
  var quantWeight1 = 3 / 16;
  var quantWeight2 = 5 / 16;
  var quantWeight3 = 1 / 16;

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      index = (y * width + x) * 4;
      oldR = imageDataToDither.data[index];
      oldG = imageDataToDither.data[index + 1];
      oldB = imageDataToDither.data[index + 2];
      newR = oldR < threshold ? 0 : 255;
      newG = oldG < threshold ? 0 : 255;
      newB = oldB < threshold ? 0 : 255;
      errR = oldR - newR;
      errG = oldG - newG;
      errB = oldB - newB;
      ditheredData[index] = newR;
      ditheredData[index + 1] = newG;
      ditheredData[index + 2] = newB;
      ditheredData[index + 3] = imageDataToDither.data[index + 3];

      if (x < width - 1) {
        index += 4;
        quantErrorR = quantWeight * errR;
        quantErrorG = quantWeight * errG;
        quantErrorB = quantWeight * errB;
        imageDataToDither.data[index] += quantErrorR;
        imageDataToDither.data[index + 1] += quantErrorG;
        imageDataToDither.data[index + 2] += quantErrorB;
      }

      if (x > 0 && y < height - 1) {
        index -= 4 * width - 4;
        quantErrorR = quantWeight1 * errR;
        quantErrorG = quantWeight1 * errG;
        quantErrorB = quantWeight1 * errB;
        imageDataToDither.data[index] += quantErrorR;
        imageDataToDither.data[index + 1] += quantErrorG;
        imageDataToDither.data[index + 2] += quantErrorB;
      }

      if (y < height - 1) {
        index -= 4;
        quantErrorR = quantWeight2 * errR;
        quantErrorG = quantWeight2 * errG;
        quantErrorB = quantWeight2 * errB;
        imageDataToDither.data[index] += quantErrorR;
        imageDataToDither.data[index + 1] += quantErrorG;
        imageDataToDither.data[index + 2] += quantErrorB;
      }

      if (x < width - 1 && y < height - 1) {
        index += 4;
        quantErrorR = quantWeight3 * errR;
        quantErrorG = quantWeight3 * errG;
        quantErrorB = quantWeight3 * errB;
        imageDataToDither.data[index] += quantErrorR;
        imageDataToDither.data[index + 1] += quantErrorG;
        imageDataToDither.data[index + 2] += quantErrorB;
      }
    }
  }

  return new ImageData(ditheredData, width, height);
}
