var i;
var ctx;
var width = 500;
var height = 800;
var offset = 50;
var nbOfLines = 5;
var noise = new Noise(Math.random());
let amplify = 10;


function createCanvas(width, height) {
  var canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
}

function setup() {
  console.log("setup");
  createCanvas(width, height);
  i = 0;

  document.addEventListener("click", mousePressed);

  draw();
}

function draw() {
  //   console.log("draw");
  // console.log(i);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.strokeRect(0, 0, width, height);
  //divide the grid into 5 lines in the x axis with for loop

  //make background a gradient from white to red
  var grd = ctx.createLinearGradient(0, 0, 0, height);
  grd.addColorStop(0, "white");
  grd.addColorStop(1, "red");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, width, height);

  for (var x = width / nbOfLines; x < width; x += width / nbOfLines) {
    console.log(x);
    for (var y = offset; y < height - offset; y++) {
      //generate noise values from x and y coordinates -> make extreme

      let noise1 = Math.abs(noise.simplex2((y / width) * amplify, x, 0.5))
      
      // let noise1 = PerlinNoise.noise(y / height, x / width, 20);
      // let noise1 = PerlinNoise.noise(x, y*1, 20);

      //make stroke color dependent on noise -> amplify noise
      ctx.strokeStyle = `rgb(${noise1 * 255}, ${noise1 * 255}, ${1 * 255})`;
      ctx.fillStyle = `rgb(${noise1 * 255}, ${noise1 * 255}, ${1 * 255})`;

      //ellipse
      ctx.beginPath();
      //use noise1 and noise1 to draw ellipse with extreme shape differences -> amplify noise
      //keep it somewhat smooth -> perlin noise
      ctx.ellipse(x, y, noise1 * 50, noise1 * 50, 0, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();

      if (y < (offset + 1) && x !=400 && x != 200) {
        //draw more circles at the top
        for(let k = 0; k < 100; k++) {
          let noise2 = Math.abs(noise.simplex2((k / width) * amplify, x, 0.5))
          ctx.strokeStyle = `rgb(${noise2 * 255}, ${noise2 * 255}, ${1 * 255})`;
          ctx.beginPath();
          ctx.ellipse(x+k, y, noise2 * 50, noise2 * 50, 0, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.fill();
        }

      } else if (y > (height - offset - 2) && x !=400 ) {
        //draw more circles at the bottom
        for(let k = 0; k < 100; k++) {
          let noise2 = Math.abs(noise.simplex2((k / width) * amplify, x, 0.5))
          ctx.strokeStyle = `rgb(${noise2 * 255}, ${noise2 * 255}, ${1 * 255})`;
          ctx.beginPath();
          ctx.ellipse(x+k, y, noise2 * 50, noise2 * 50, 0, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.fill();
        }
      }

      //randomly skip either 3 or 4 ellipses
      let skip = Math.floor(Math.random() * 2) + 3;
      y += skip;
    }

    // connect lines at top and bottom with more ellipses
    // for (var k = 0; 

  }
  i += 1;
  // requestAnimationFrame(draw);
}

function mousePressed(e) {
  console.log("mousePressed");
}

window.onload = function () {
  console.log("on est pret");
  setup();
};
