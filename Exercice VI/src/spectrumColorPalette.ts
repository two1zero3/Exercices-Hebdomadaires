//Our array of colors
let spectrumColorPalette: p5.Color[] = [];
let spectrumColorPaletteTyped: Uint8ClampedArray;

//read colors from a file with each pixel being a color
function readSpectrumColorPaletteFromImage() {
    loadImage("../static/spectrumColor/palette2.png", (img) => {
        img.loadPixels();
        for (let i = 0; i < img.pixels.length; i += 4) {
            spectrumColorPalette.push(
                color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2])
            );
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
