// class App {
//     height: number;
//     width: number;
//     canvas: HTMLCanvasElement | null;
//     ctx: any;
//     circle: Circle | null;
//     allCircles: Circle[];
//     audioTool: AudioTool;
//     constructor() {

//       this.height = window.innerHeight;
//       this.width = window.innerWidth;
//       this.canvas = document.createElement("canvas");
//       this.canvas.width = this.width;
//       this.canvas.height = this.height;
//       this.ctx = this.canvas.getContext("2d");
//       document.body.appendChild(this.canvas);
      
//       this.circle = new Circle(100, 100, 50, this.ctx);
//       this.allCircles = [];

//       this.audioTool = new AudioTool();

//       this.setup();
//     }
//     setup() {
//       for (let i = 0; i < 1024; i++) {
//         this.allCircles.push(
//           /**
//            * A CHOIX : utiliser un cercle ou un texte
//            */
//           new Circle(i * 2, window.innerHeight / 2, 5, this.ctx)
//           // new TextCustom(i * 2, window.innerHeight / 2, this.ctx)
//         );
//       }
  
//       document.addEventListener("click", (e) => {
//         this.audioTool.play(e);
//       });
  
//       this.draw();
//     }
  
//     draw() {
//       this.ctx.fillStyle = "black";
//       this.ctx.fillRect(0, 0, this.width, this.height);
//       this.allCircles.forEach((circle) => {
//         circle.draw();
//       });
  
//       /**
//        *  A CHOIX : analyser un des 3 types de data
//        */
//       this.audioTool.updateWaveForm();
//       this.audioTool.updateFrequency();
//       this.audioTool.updatedFloatFrequency();
  
//       /**
//        *  A CHOIX : récupérer un des 3 types de tableau
//        */
//       // const data = this.audioTool.dataWave;
//       // const data = this.audioTool.dataFrequency;
//       const data = this.audioTool.dataFloatFrequency;
  

//       //----------------- 1ère analyse -----------------
//       if (this.audioTool.audioContext) {
//         for (let i = 0; i < data.length; i++) {
//           /**
//            * A CHOIX : modifier la position ou autre parametre
//            */
//           // this.allCircles[i].y = data[i] + window.innerHeight / 2 - 125;
//           this.allCircles[i].y = -data[i] + window.innerHeight / 2;
//           // console.log(Math.abs(data[i] / 10));
//           // this.allCircles[i].fontSize = -data[i] / 5;
//         }

//         //----------------- 2ème analyse -----------------
//         this.audioTool.dataWave.forEach((data, i) => {
//           //draw wave form


        
//         });
//       }
  
//       requestAnimationFrame(this.draw.bind(this));
//     }
//   }
  
//   let app: App;
//   window.onload = function () {
//     app = new App();
//     console.log(app);
//   };
  