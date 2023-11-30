"use strict";
// la définition de la classe Circle c'est comme définir une function mais sans les parenthèses
// la fonction par défaul est le constructor
// on peut passer des paramètres au constructor
// dans une class on n'écrit pas "function" pour TOUTES les fonctions
// une variable globale de class s'écrit avec "this."
class Circle {
    constructor(x, y, rayon, context) {
        this.x = x;
        this.y = y;
        this.origin = { x: x, y: y };
        this.target = { x: x, y: y };
        this.speedX = 1;
        this.speedY = 1.32;
        this.uniteDeTemps = 0;
        this.uniteDeTemps1 = 0;
        this.rayon = rayon;
        this.rayonOrigin = { rayon: rayon };
        this.rayonFinal = { rayon: rayon };
        this.lifeTime = 0;
        this.context = context;
        // on initialise une couleur au bol
        this.color = "red";
        this.rotation = 0;
    }
    changeColor() {
        // on affect une couleur aléatoire
        this.color = colors[Math.floor(Math.random() * colors.length)];
        //on change la taille du rayon
        // this.rayon = Math.random() * 100;
    }
    isInMe(mouseX, mouseY) {
        // on calcule la distance entre la souris et le centre
        let d = dist(mouseX, mouseY, this.x, this.y);
        // on compare cette distance au rayon
        if (d < this.rayon) {
            return true;
        }
        else {
            return false;
        }
    }
    draw() {
        //pour préparer la rotation
        this.context.save();
        //on translate le contexte au centre du cercle
        this.context.translate(this.x, this.y);
        //on fait la rotation
        this.context.rotate(this.rotation);
        //on dessine le cercle
        this.context.fillStyle = this.color;
        this.context.beginPath();
        if (this.rayon < 0) {
            this.rayon = 10;
        }
        this.context.arc(0, 0, this.rayon, 0, 2 * Math.PI, true);
        this.context.fill();
        this.context.closePath();
        this.context.restore();
        this.move();
        this.rapetisser();
    }
    definirDestination(x, y) {
        this.target = { x: x, y: y };
        this.uniteDeTemps = 0;
    }
    definirRayonAleatoire() {
        this.rayonFinal.rayon = Math.random() * 100 + 25;
        this.uniteDeTemps1 = 0;
    }
    move() {
        this.bounce();
        //calcul la distance entre le point de départ et la destination
        const d = dist(this.x, this.y, this.target.x, this.target.y);
        if (d < 0.01) {
            this.origin = { x: this.target.x, y: this.target.y };
            return;
        }
        //calcul de easing simple
        // equivalent à un pourcentage
        const easing = Easing.bounceOut(this.uniteDeTemps); //Math.pow(this.uniteDeTemps, 5); //this.uniteDeTemps * this.speed;
        //on incrémente le compteur de temps
        this.uniteDeTemps += 0.01;
        //on la distance entre le point de départ et la destination
        let distX = this.target.x - this.origin.x;
        let distY = this.target.y - this.origin.y;
        this.x = this.origin.x + distX * easing;
        this.y = this.origin.y + distY * easing;
    }
    rapetisser() {
        let differenceRayon2 = this.rayonFinal.rayon - this.rayon;
        // console.log(differenceRayon2);
        if (Math.abs(differenceRayon2) < 0.01) {
            this.rayonOrigin = { rayon: this.rayonFinal.rayon };
            return;
        }
        const easing = Easing.elasticOut(this.uniteDeTemps1);
        this.uniteDeTemps1 += 0.01;
        let differenceRayon = this.rayonFinal.rayon - this.rayonOrigin.rayon;
        this.rayon = this.rayonOrigin.rayon + differenceRayon * easing;
    }
    bounce() {
        let random0 = 0;
        let randomHalf = this.lifeTime * 25;
        //make ball bounce to the other wall if it hits the wall
        if (this.x + this.rayon > width && this.origin.x == this.target.x && this.origin.y == this.target.y) {
            this.definirDestination(context.canvas.width / 2 - randomHalf, context.canvas.height);
            this.definirRayonAleatoire();
            this.changeColor();
            this.lifeTime++;
        }
        if (this.x - this.rayon < 0 && this.origin.x == this.target.x && this.origin.y == this.target.y) {
            this.definirDestination(context.canvas.width / 2 + randomHalf, 0);
            this.definirRayonAleatoire();
            this.changeColor();
            this.lifeTime++;
        }
        if (this.y + this.rayon > height && this.origin.x == this.target.x && this.origin.y == this.target.y) {
            this.definirDestination(0, context.canvas.height / 2 - randomHalf);
            this.definirRayonAleatoire();
            this.changeColor();
            this.lifeTime++;
        }
        if (this.y - this.rayon < 0 && this.origin.x == this.target.x && this.origin.y == this.target.y) {
            this.definirDestination(context.canvas.width, context.canvas.height / 2 + randomHalf);
            this.definirRayonAleatoire();
            this.changeColor();
            this.lifeTime++;
        }
    }
}
class Easing {
    constructor() { }
    /**
     *
     * all calculations on time to ease movement
     */
    static backInOut(t) {
        const s = 1.70158 * 1.525;
        if ((t *= 2) < 1)
            return 0.5 * (t * t * ((s + 1) * t - s));
        return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
    }
    static backIn(t) {
        const s = 1.70158;
        return t * t * ((s + 1) * t - s);
    }
    static backOut(t) {
        const s = 1.70158;
        return --t * t * ((s + 1) * t + s) + 1;
    }
    static bounceInOut(t) {
        if (t < 0.5)
            return easing.bounceIn(t * 2) * 0.5;
        return easing.bounceOut(t * 2 - 1) * 0.5 + 0.5;
    }
    static bounceIn(t) {
        return 1 - easing.bounceOut(1 - t);
    }
    static bounceOut(t) {
        if (t < 1 / 2.75) {
            return 7.5625 * t * t;
        }
        else if (t < 2 / 2.75) {
            return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
        }
        else if (t < 2.5 / 2.75) {
            return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
        }
        else {
            return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        }
    }
    static circInOut(t) {
        if ((t *= 2) < 1)
            return -0.5 * (Math.sqrt(1 - t * t) - 1);
        return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    }
    static circIn(t) {
        return 1 - Math.sqrt(1 - t * t);
    }
    static circOut(t) {
        return Math.sqrt(1 - --t * t);
    }
    static cubicInOut(t) {
        if ((t *= 2) < 1)
            return 0.5 * t * t * t;
        return 0.5 * ((t -= 2) * t * t + 2);
    }
    static cubicIn(t) {
        return t * t * t;
    }
    static cubicOut(t) {
        return --t * t * t + 1;
    }
    static elasticInOut(t) {
        if ((t *= 2) < 1)
            return (0.5 * Math.sin(((13 * Math.PI) / 2) * t) * Math.pow(2, 10 * (t - 1)));
        return (0.5 *
            (Math.sin(((-13 * Math.PI) / 2) * (t - 1)) * Math.pow(2, -10 * (t - 1)) +
                2));
    }
    static elasticIn(t) {
        return Math.sin(((13 * Math.PI) / 2) * t) * Math.pow(2, 10 * (t - 1));
    }
    static elasticOut(t) {
        return Math.sin(((-13 * Math.PI) / 2) * (t + 1)) * Math.pow(2, -10 * t) + 1;
    }
    static expoInOut(t) {
        if (t === 0)
            return 0;
        if (t === 1)
            return 1;
        if ((t *= 2) < 1)
            return 0.5 * Math.pow(1024, t - 1);
        return 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
    }
    static expoIn(t) {
        return t === 0 ? 0 : Math.pow(1024, t - 1);
    }
    static expoOut(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }
    static quadInOut(t) {
        if ((t *= 2) < 1)
            return 0.5 * t * t;
        return -0.5 * (--t * (t - 2) - 1);
    }
    static quadIn(t) {
        return t * t;
    }
    static quadOut(t) {
        return -t * (t - 2);
    }
    static quartInOut(t) {
        if ((t *= 2) < 1)
            return 0.5 * t * t * t * t;
        return -0.5 * ((t -= 2) * t * t * t - 2);
    }
    static quartIn(t) {
        return t * t * t * t;
    }
    static quartOut(t) {
        return 1 - --t * t * t * t;
    }
    static quintInOut(t) {
        if ((t *= 2) < 1)
            return 0.5 * t * t * t * t * t;
        return 0.5 * ((t -= 2) * t * t * t * t + 2);
    }
    static quintIn(t) {
        return t * t * t * t * t;
    }
    static quintOut(t) {
        return --t * t * t * t * t + 1;
    }
    static sineInOut(t) {
        return -0.5 * (Math.cos(Math.PI * t) - 1);
    }
    static sineIn(t) {
        return 1 - Math.cos((t * Math.PI) / 2);
    }
    static sineOut(t) {
        return Math.sin((t * Math.PI) / 2);
    }
    static linear(t) {
        return t;
    }
}
var a1;
var a2;
var centerX;
var centerY;
var width = 800;
var height = 800;
var context;
var colors = [];
var monCercle;
function createCanvas(w, h) {
    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    context = canvas.getContext("2d");
    document.body.appendChild(canvas);
}
function draw() {
    // console.log("draw");
    // context.clearRect(0, 0, width, height);
    monCercle.draw();
    requestAnimationFrame(draw);
}
function setup() {
    console.log("setup");
    createCanvas(width, height);
    monCercle = new Circle(400, 400, 100, context);
    document.addEventListener("click", mousePressed);
    draw();
}
function mousePressed(e) {
    console.log("mousePressed", e);
    // monCercle.changeColor();
    monCercle.definirDestination(e.x, e.y);
    monCercle.definirRayonAleatoire();
}
window.onload = function () {
    console.log("on est pret");
    loadColors();
};
function dist(x1, y1, x2, y2) {
    // calcule la distance entre deux points
    // pythagore power
    let d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return d;
}
function lerp(start, end, amt) {
    // linear interpolation
    // https://en.wikipedia.org/wiki/Linear_interpolation
    return (1 - amt) * start + amt * end;
}
function loadColors() {
    // load colors from the palette.png file -> each pixel is a new color
    let img = new Image();
    img.src = "./static/palette.png";
    img.onload = function () {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let context = canvas.getContext("2d");
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
//# sourceMappingURL=build.js.map