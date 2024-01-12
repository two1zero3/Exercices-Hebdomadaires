class UI {
    font: p5.Font;
    textContent: string;
    // data: Float32Array;
    constructor(textContent: string) {
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
        translate(width / 2, height -200);
        // scale(0.5, )
        text(this.textContent, 0,0);
        pop();
    }
}
