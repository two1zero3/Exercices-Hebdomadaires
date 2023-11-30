function dist(x1: number, y1: number, x2: number, y2: number) {
    // calcule la distance entre deux points
    // pythagore power
    let d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return d;
}

function lerp(start: number, end: number, amt: number) {
    // linear interpolation
    // https://en.wikipedia.org/wiki/Linear_interpolation
    return (1 - amt) * start + amt * end;
}

function loadColors () {
    // load colors from the palette.png file -> each pixel is a new color
    let img = new Image();
    img.src = "./static/palette.png";
    img.onload = function () {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let context = canvas.getContext("2d")!;
        context.drawImage(img, 0, 0);
        let imageData = context.getImageData(0, 0, img.width, img.height);
        let data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];
            let color = `rgb(${r},${g},${b})`;
            colors.push(color);
        }
    setup();
    };
}