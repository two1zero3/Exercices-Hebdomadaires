class spectrumWaveform {
    data: Uint8Array;
    constructor(data: Uint8Array) {
        this.data = data;
    }

    update() {}
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
                fill(
                    spectrumColorPaletteTyped[this.data[i] * 4],
                    spectrumColorPaletteTyped[this.data[i] * 4 + 1],
                    spectrumColorPaletteTyped[this.data[i] * 4 + 2]
                );

                //draw the waveform -> the uint8array is between 0 and 255 with 128 being the center
                rect(
                    i * 2,
                    0,
                    2,
                    (this.data[i] - 128) * (height / 128) * 0.5
                );
            }

            pop();


        }
    }
}
