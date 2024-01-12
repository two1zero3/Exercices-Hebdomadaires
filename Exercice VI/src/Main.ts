let canvas: p5.Renderer;

let wave: AudioWaveform;
let spectrum: spectrumWaveform;
let UserInterface: UI;

let ctx: CanvasRenderingContext2D;
let circles: Circle;
let AllCircles: Circle[] = [];
let audioTool: AudioTool;
let fftSize = 4096;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    ctx = drawingContext;
    wave = new AudioWaveform(new Uint8Array(fftSize/2));
    spectrum = new spectrumWaveform(new Uint8Array(fftSize/2));

    circles = new Circle(100, 100, 50, ctx);
    audioTool = new AudioTool(fftSize);
    UserInterface = new UI("Click To Play //// ");

    readWaveColorPaletteFromImage();
    readWaveColorPaletteFromImageTyped();

    readSpectrumColorPaletteFromImage();
    readSpectrumColorPaletteFromImageTyped();

    for (let i = 0; i < fftSize/2; i++) {
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

function mousePressed(e: MouseEvent) {
    audioTool.play(e);
}
