//Our array of colors
let waveColorPalette: p5.Color[] = [];
let waveColorPaletteTyped: Uint8ClampedArray;

//read colors from a file with each pixel being a color
function readWaveColorPaletteFromImage() {
    loadImage("../static/waveColor/palette2.png", (img) => {
        img.loadPixels();
        for (let i = 0; i < img.pixels.length; i += 4) {
            waveColorPalette.push(
                color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2])
            );
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
