// la définition de la classe Circle c'est comme définir une function mais sans les parenthèses
// la fonction par défaul est le constructor
// on peut passer des paramètres au constructor
// dans une class on n'écrit pas "function" pour TOUTES les fonctions
// une variable globale de class s'écrit avec "this."
class Circle {
    x: number;
    y: number;
    origin: { x: number; y: number };
    target: { x: number; y: number };
    speed: number;
    uniteDeTemps: number;
    uniteDeTemps1: number;
    rayon: number;
    rayonOrigin: { rayon: number };
    rayonFinal: { rayon: number };
    context: CanvasRenderingContext2D;
    color: string;
    rotation: number;
    angle: number;
    index: number;
    constructor(
        x: number,
        y: number,
        rayon: number,
        context: CanvasRenderingContext2D,
        index: number
    ) {
        this.x = x;
        this.y = y;
        this.origin = { x: x, y: y };
        this.target = { x: x, y: y };

        this.index = index;

        this.speed = 1;
        this.uniteDeTemps = 0;
        this.uniteDeTemps1 = 0;

        this.rayon = rayon;
        this.rayonOrigin = { rayon: rayon };
        this.rayonFinal = { rayon: rayon };

        this.context = context;
        // on initialise une couleur au bol
        this.color = "white";
        this.rotation = 0;
        this.angle = 0;
    }

    changeColor(r: number, g: number, b: number) {
        // on affect une couleur aléatoire
        this.color = `rgb(${Math.random() * 255},${Math.random() * 255},${
            Math.random() * 255
        })`;

        // this.color = `rgb(${r},${g},${b})`;
    }

    changeRadius(pourcentage: number) {
        this.rayon = this.rayonOrigin.rayon * pourcentage;
    }

    isInMe(mouseX: number, mouseY: number) {
        // on calcule la distance entre la souris et le centre
        let d = this.dist(mouseX, mouseY, this.x, this.y);
        // on compare cette distance au rayon
        if (d < this.rayon) {
            return true;
        } else {
            return false;
        }
    }

    shaderColor() {
        let fragCoord = { x: this.x, y: this.y };
        let iResolution = { x: largeur, y: hauteur };
        let uv = {
            x: fragCoord.x / iResolution.x,
            y: fragCoord.y / iResolution.y,
        };
        
        let uv0 = uv;
        uv0.x = uv0.x * 1.0 - .5;
        uv0.y = uv0.y * 1.0 - .5;
        uv = { x: uv.x * 2.0 - 1.0, y: uv.y * 2.0 - 1.0 };
        uv.x = (uv.x * iResolution.x) / iResolution.y;

        let col;
        let d;
        let finalColor = { r: 0, g: 0, b: 0, a: 1.0 };
        
        for (let i = 0; i < 2; i++) {

            uv.x *= 1.25;
            uv.y *= 1.25;
            uv.x = uv.x - Math.floor(uv.x);
            uv.y = uv.y - Math.floor(uv.y);
            uv.x -= 0.5;
            uv.y -= 0.5;

            d = Math.sqrt(uv.x * uv.x + uv.y * uv.y);
    
            // let ll = this.lengthGLSL(uv0.x, uv0.y);
            let ll = this.rayon;
            d = Math.floor(d + ll);
    
            col = this.palette(ll + frameCount * 0.01);
    
            d = Math.sin(d * 10.0 + frameCount * 0.01) * 1;
            d = Math.abs(d);
    
            d = 0.2 / d;

            finalColor.r += col.r * d;
            finalColor.g += col.g * d;
            finalColor.b += col.b * d;
        }

        let color0 = { r: finalColor.r, g: finalColor.g, b: finalColor.b, a: 1.0 };
        this.color = `rgb(${color0.r * 255},${color0.g * 255},${
            color0.b * 255
        })`;
    }

    lengthGLSL(x, y) {
        return Math.sqrt(x * x + y * y);
    }

    palette(t: number) {
        let a = {x: 0.5, y:0.5, z:0.5};
        let b = {x:0.5, y:0.5, z:0.5};
        let c = {x:1.0, y:1.0, z:1.0};
        let d = {x:0.263, y:0.416, z:0.557};

        let first = a.x + b.x * Math.cos(6.28318 * (c.x * t + d.x));
        let second = a.y + b.y * Math.cos(6.28318 * (c.y * t + d.y));
        let third = a.z + b.z * Math.cos(6.28318 * (c.z * t + d.z));

        return {r: first, g: second, b: third};
    }

    draw() {
        this.move();
        this.shaderColor();
        //pour préparer la rotation
        this.context.save();
        //on translate le contexte au centre du cercle
        this.context.translate(this.x, this.y);
        //on fait la rotation
        this.context.rotate(this.rotation);
        //on dessine le cercle
        this.context.fillStyle = this.color;
        this.context.beginPath();

        this.context.arc(0, 0, this.rayon, 0, 2 * Math.PI, true);
        //this.context.rect(0, 0, this.rayon * 2, this.rayon * 2);

        this.context.fill();
        this.context.closePath();

        this.context.restore();
    }

    dist(x1: number, y1: number, x2: number, y2: number) {
        // calcule la distance entre deux points
        // pythagore power
        let d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        return d;
    }

    definirDestination(x: number, y: number) {
        this.target = { x: x, y: y };
        this.uniteDeTemps = 0;
    }

    definirRayonAleatoire() {
        this.rayonFinal.rayon = Math.random() * 200 + 50;
        this.uniteDeTemps1 = 0;
    }

    move() {
        this.angle++;
        //   this.x = this.origin.x + Math.cos(this.angle * (Math.PI / 180)) * 100;
        //   this.y = this.origin.y + Math.sin(this.angle * (Math.PI / 180)) * 100;
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
}
