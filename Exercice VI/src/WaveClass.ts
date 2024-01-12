class AudioWaveform {
    data: Uint8Array;
    constructor(data: Uint8Array) {
        this.data = data;
    }

    update() {}
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
                fill(
                    waveColorPaletteTyped[data[i] * 4],
                    waveColorPaletteTyped[data[i] * 4 + 1],
                    waveColorPaletteTyped[data[i] * 4 + 2]
                );

                //draw the waveform -> the uint8array is between 0 and 255 with 128 being the center
                rect(
                    i * downsampleRatio,
                    0,
                    downsampleRatio,
                    (data[i] - 128) * (height / 128) * 0.5
                );
            }
            pop();
        }
    }
}
