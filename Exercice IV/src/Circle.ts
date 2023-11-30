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
    speedX: number;
    speedY: number;
    uniteDeTemps: number;
    uniteDeTemps1: number;
    rayon: number;
    rayonOrigin: { rayon: number };
    rayonFinal: { rayon: number };
    context: CanvasRenderingContext2D;
    color: string;
    rotation: number;
    lifeTime: number;

    constructor(x: number, y: number, rayon: number, context: CanvasRenderingContext2D) {
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
  
    isInMe(mouseX: number, mouseY: number) {
      // on calcule la distance entre la souris et le centre
      let d = dist(mouseX, mouseY, this.x, this.y);
      // on compare cette distance au rayon
      if (d < this.rayon) {
        return true;
      } else {
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
      if (this.rayon < 0) {this.rayon = 10;}
      this.context.arc(0, 0, this.rayon, 0, 2 * Math.PI, true);
      this.context.fill();
      this.context.closePath();
  
      this.context.restore();
  
      this.move();
      this.rapetisser();
    }
  
    definirDestination(x: number, y: number) {
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
      let randomHalf = this.lifeTime*25;
      //make ball bounce to the other wall if it hits the wall
      if (this.x + this.rayon > width && this.origin.x == this.target.x && this.origin.y == this.target.y ) {
        this.definirDestination(context.canvas.width/2 - randomHalf, context.canvas.height);
        this.definirRayonAleatoire();
        this.changeColor();
        this.lifeTime++;
      }
      if (this.x - this.rayon < 0 && this.origin.x == this.target.x && this.origin.y == this.target.y) {
        this.definirDestination(context.canvas.width/2 + randomHalf, 0);
        this.definirRayonAleatoire();
        this.changeColor();
        this.lifeTime++;
      }
      if (this.y + this.rayon > height && this.origin.x == this.target.x && this.origin.y == this.target.y) {
        this.definirDestination(0, context.canvas.height/2 - randomHalf);
        this.definirRayonAleatoire();
        this.changeColor();
        this.lifeTime++;
      }
      if (this.y - this.rayon < 0 && this.origin.x == this.target.x && this.origin.y == this.target.y) {
        this.definirDestination(context.canvas.width, context.canvas.height/2 + randomHalf);
        this.definirRayonAleatoire();
        this.changeColor();
        this.lifeTime++;
      }
  }

}