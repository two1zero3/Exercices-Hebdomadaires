"use strict";
// class App {
//     height: number;
//     width: number;
//     canvas: HTMLCanvasElement | null;
//     ctx: any;
//     circle: Circle | null;
//     allCircles: Circle[];
//     audioTool: AudioTool;
//     constructor() {
//       this.height = window.innerHeight;
//       this.width = window.innerWidth;
//       this.canvas = document.createElement("canvas");
//       this.canvas.width = this.width;
//       this.canvas.height = this.height;
//       this.ctx = this.canvas.getContext("2d");
//       document.body.appendChild(this.canvas);
//       this.circle = new Circle(100, 100, 50, this.ctx);
//       this.allCircles = [];
//       this.audioTool = new AudioTool();
//       this.setup();
//     }
//     setup() {
//       for (let i = 0; i < 1024; i++) {
//         this.allCircles.push(
//           /**
//            * A CHOIX : utiliser un cercle ou un texte
//            */
//           new Circle(i * 2, window.innerHeight / 2, 5, this.ctx)
//           // new TextCustom(i * 2, window.innerHeight / 2, this.ctx)
//         );
//       }
//       document.addEventListener("click", (e) => {
//         this.audioTool.play(e);
//       });
//       this.draw();
//     }
//     draw() {
//       this.ctx.fillStyle = "black";
//       this.ctx.fillRect(0, 0, this.width, this.height);
//       this.allCircles.forEach((circle) => {
//         circle.draw();
//       });
//       /**
//        *  A CHOIX : analyser un des 3 types de data
//        */
//       this.audioTool.updateWaveForm();
//       this.audioTool.updateFrequency();
//       this.audioTool.updatedFloatFrequency();
//       /**
//        *  A CHOIX : récupérer un des 3 types de tableau
//        */
//       // const data = this.audioTool.dataWave;
//       // const data = this.audioTool.dataFrequency;
//       const data = this.audioTool.dataFloatFrequency;
//       //----------------- 1ère analyse -----------------
//       if (this.audioTool.audioContext) {
//         for (let i = 0; i < data.length; i++) {
//           /**
//            * A CHOIX : modifier la position ou autre parametre
//            */
//           // this.allCircles[i].y = data[i] + window.innerHeight / 2 - 125;
//           this.allCircles[i].y = -data[i] + window.innerHeight / 2;
//           // console.log(Math.abs(data[i] / 10));
//           // this.allCircles[i].fontSize = -data[i] / 5;
//         }
//         //----------------- 2ème analyse -----------------
//         this.audioTool.dataWave.forEach((data, i) => {
//           //draw wave form
//         });
//       }
//       requestAnimationFrame(this.draw.bind(this));
//     }
//   }
//   let app: App;
//   window.onload = function () {
//     app = new App();
//     console.log(app);
//   };
class AudioTool {
    constructor(fftSize) {
        this.audioFile = "./static/The Rolf Kühn Orchestra - La Canal.mp3";
        this.audio = new Audio(this.audioFile);
        this.isPlaying = false;
        this.fftSize = fftSize;
    }
    initAudioContext() {
        this.audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
        this.initBroadcast();
        this.setupAnalyser();
    }
    initBroadcast() {
        this.source = this.audioContext.createMediaElementSource(this.audio);
    }
    setupAnalyser() {
        this.analyser = this.audioContext.createAnalyser();
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
        //fast fourier transform size -> how big is the window to analyse the sound
        this.analyser.fftSize = this.fftSize;
        //half the fftSize -> how many data we get as a result of the fft
        this.bufferLength = this.analyser.frequencyBinCount;
        //tableau de data (2 type)
        this.dataFrequency = new Uint8Array(this.bufferLength);
        this.dataFloatFrequency = new Float32Array(this.bufferLength);
        this.dataWave = new Uint8Array(this.bufferLength);
    }
    updateWaveForm() {
        if (this.audioContext)
            this.analyser.getByteTimeDomainData(this.dataWave);
    }
    updateFrequency() {
        if (this.audioContext)
            this.analyser.getByteFrequencyData(this.dataFrequency);
    }
    updatedFloatFrequency() {
        if (this.audioContext)
            this.analyser.getFloatFrequencyData(this.dataFloatFrequency);
    }
    play(mouse) {
        if (this.isPlaying === false) {
            if (!this.audioContext) {
                this.initAudioContext();
            }
            this.audio.play();
            UserInterface.textContent = audioTool.audioFile + " ///// ";
            this.isPlaying = true;
        }
        else {
            // this.audio.pause();
            // this.isPlaying = false;
            let timeToStart = (mouse.clientX / window.innerWidth) * this.audio.duration;
            this.audio.currentTime = timeToStart;
        }
    }
}
class Circle {
    constructor(x, y, radius, ctx) {
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
let canvas;
let wave;
let spectrum;
let UserInterface;
let ctx;
let circles;
let AllCircles = [];
let audioTool;
let fftSize = 4096;
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    ctx = drawingContext;
    wave = new AudioWaveform(new Uint8Array(fftSize / 2));
    spectrum = new spectrumWaveform(new Uint8Array(fftSize / 2));
    circles = new Circle(100, 100, 50, ctx);
    audioTool = new AudioTool(fftSize);
    UserInterface = new UI("Click To Play //// ");
    readWaveColorPaletteFromImage();
    readWaveColorPaletteFromImageTyped();
    readSpectrumColorPaletteFromImage();
    readSpectrumColorPaletteFromImageTyped();
    for (let i = 0; i < fftSize / 2; i++) {
        AllCircles.push(new Circle(i * 2, window.innerHeight / 2, 5, ctx));
    }
}
function draw() {
    audioTool.updateWaveForm();
    audioTool.updateFrequency();
    audioTool.updatedFloatFrequency();
    background(255);
    if (audioTool.dataWave) {
        wave.data = audioTool.dataWave;
        spectrum.data = audioTool.dataFrequency;
    }
    wave.draw();
    spectrum.draw();
    UserInterface.draw();
}
function mousePressed(e) {
    audioTool.play(e);
}
class TextCustom {
    constructor(x, y, ctx) {
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
class UI {
    // data: Float32Array;
    constructor(textContent) {
        this.font = loadFont("./static/font.otf");
        textFont(this.font);
        this.textContent = textContent;
    }
    draw() {
        push();
        //remove "./static/" from the text content by regex
        this.textContent = this.textContent.replace(/\.\/static\//g, "");
        //scroll text effect -> shifting letters in the text string every 10 frames
        if (frameCount % 10 === 0) {
            this.textContent = this.textContent.slice(1) + this.textContent[0];
        }
        textAlign(CENTER, CENTER);
        textSize(100);
        translate(width / 2, height - 200);
        // scale(0.5, )
        text(this.textContent, 0, 0);
        pop();
    }
}
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.x = x;
        this.y = y;
    }
    heading() {
        return Math.atan2(this.y, this.x);
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }
    mult(n) {
        return new Vector(this.x * n, this.y * n);
    }
    div(n) {
        return new Vector(this.x / n, this.y / n);
    }
    normalize() {
        return this.div(this.magnitude());
    }
    limit(max) {
        if (this.magnitude() > max) {
            return this.normalize().mult(max);
        }
        else {
            return this;
        }
    }
    setMag(n) {
        return this.normalize().mult(n);
    }
}
class AudioWaveform {
    constructor(data) {
        this.data = data;
    }
    update() { }
    draw() {
        if (waveColorPaletteTyped) {
            push();
            noStroke();
            translate(0, height / 2);
            rectMode(CENTER);
            // stroke("red");
            //downsample array to fit the width of the screen
            let downsampleRatio = 8;
            let downsampledData = [];
            //don't average but take every x values
            for (let i = 0; i < this.data.length; i += downsampleRatio) {
                downsampledData.push(this.data[i]);
            }
            //use the most accurate downsampling algorithm :
            let data = downsampledData;
            for (let i = 0; i < data.length; i++) {
                //change color based on intensity of the sound -> the uint8array is between 0 and 255 with 128 being the center
                fill(waveColorPaletteTyped[data[i] * 4], waveColorPaletteTyped[data[i] * 4 + 1], waveColorPaletteTyped[data[i] * 4 + 2]);
                //draw the waveform -> the uint8array is between 0 and 255 with 128 being the center
                rect(i * downsampleRatio, 0, downsampleRatio, (data[i] - 128) * (height / 128) * 0.5);
            }
            pop();
        }
    }
}
class spectrumWaveform {
    constructor(data) {
        this.data = data;
    }
    update() { }
    draw() {
        if (spectrumColorPaletteTyped) {
            //draw spectrum
            push();
            noStroke();
            translate(0, 200);
            rectMode(CENTER);
            // stroke("red");
            //draw
            for (let i = 0; i < this.data.length; i++) {
                //change color based on intensity of the sound -> the uint8array is between 0 and 255 with 128 being the center
                fill(spectrumColorPaletteTyped[this.data[i] * 4], spectrumColorPaletteTyped[this.data[i] * 4 + 1], spectrumColorPaletteTyped[this.data[i] * 4 + 2]);
                //draw the waveform -> the uint8array is between 0 and 255 with 128 being the center
                rect(i * 2, 0, 2, (this.data[i] - 128) * (height / 128) * 0.5);
            }
            pop();
        }
    }
}
//Our array of colors
let spectrumColorPalette = [];
let spectrumColorPaletteTyped;
//read colors from a file with each pixel being a color
function readSpectrumColorPaletteFromImage() {
    loadImage("../static/spectrumColor/palette2.png", (img) => {
        img.loadPixels();
        for (let i = 0; i < img.pixels.length; i += 4) {
            spectrumColorPalette.push(color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2]));
        }
    }, (event) => {
        console.error('Oops!', event);
    });
}
function readSpectrumColorPaletteFromImageTyped() {
    loadImage("../static/spectrumColor/palette2.png", (img) => {
        img.loadPixels();
        spectrumColorPaletteTyped = new Uint8ClampedArray(img.pixels);
    }, (event) => {
        console.error('Oops!', event);
    });
}
//Our array of colors
let waveColorPalette = [];
let waveColorPaletteTyped;
//read colors from a file with each pixel being a color
function readWaveColorPaletteFromImage() {
    loadImage("../static/waveColor/palette2.png", (img) => {
        img.loadPixels();
        for (let i = 0; i < img.pixels.length; i += 4) {
            waveColorPalette.push(color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2]));
        }
    }, (event) => {
        console.error('Oops!', event);
    });
}
function readWaveColorPaletteFromImageTyped() {
    loadImage("../static/waveColor/palette2.png", (img) => {
        img.loadPixels();
        waveColorPaletteTyped = new Uint8ClampedArray(img.pixels);
    }, (event) => {
        console.error('Oops!', event);
    });
}
//# sourceMappingURL=build.js.map