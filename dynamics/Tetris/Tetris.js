/////////////////////////////////////////////////////////////////////////////////////////////
///////*********************  Inico Tetris by Carlos-V24 :D *************************///////
////////////////////////////////////////////////////////////////////////////////////////////

//Primer Tetranomio que aparece
CrearTerreno()
CrearProxFig()
var Velocidad = 1100;
var Puntuacion = 0;
var FilasDestruidas = 0;
var Vivo=true;

//Audios del juego
let Musica_Fondo_1 = new Audio();
let Make_Triple = new Audio();
let Make_Tetris = new Audio();
let Destroy_Row = new Audio();
let Rotar = new Audio();
let Fijar = new Audio();
let Mover = new Audio();
let Game_Over = new Audio();

Mover.src = "../statics/Tetris/Sonidos/Mover.mp3";
Game_Over.src = "../statics/Tetris/Sonidos/Muerto.mp3";
Fijar.src = "../statics/Tetris/Sonidos/Fijar.mp3";
Rotar.src = "../statics/Tetris/Sonidos/Rotar.mp3";
Musica_Fondo_1.src = "../statics/Tetris/Sonidos/Tetris_99.mp3";
Make_Triple.src = "../statics/Tetris/Sonidos/Make_Triple.mp3";
Make_Tetris.src = "../statics/Tetris/Sonidos/Hacer_tetris.mp3";
Destroy_Row.src = "../statics/Tetris/Sonidos/Destruir_fila.mp3";
Musica_Fondo_1.loop = true;

//Variable que permite reproducir la musica de fondo
var MusicaON = true;

//Eventos para activar y desactivar la musica
document.getElementById("Musica").addEventListener("click",()=>{
  if (document.getElementById("Musica").classList.contains("Si")) {
    Musica_Fondo_1.pause()
    MusicaON=false;
    document.getElementById("Musica").classList.remove("Si")
    document.getElementById("Musica").classList.add("No")
  }else if (document.getElementById("Musica").classList.contains("No")) {
    if (Vivo) {
      Musica_Fondo_1.play()
    }
    MusicaON=true;
    document.getElementById("Musica").classList.remove("No")
    document.getElementById("Musica").classList.add("Si")
  }
})
//Movimiento de los tetranomios
//El juego en si
function Tetris(caida) {
  setTimeout(()=>{
    //Si la parte de abajo esta vacia permite bajar la ficha cada Velocidad milisegundos
    if(FilAct-ColAbajo(RotarFig)<(FILAS-Tetranomios[TetActual][RotarFig].length)){//Caso de figuras abajo
      DesDibujarTet(FilAct, CeldAct, RotarFig);
      if(!(ColAbajoTet(FilAct, CeldAct, RotarFig))){
        DibujarTet(FilAct, CeldAct, RotarFig)
        Fijar.play()
        FilasHechas()
        GenerarTet()
      }else if (FilAct-ColAbajo(RotarFig)+Tetranomios[TetActual][RotarFig].length==19) {//Caso de estar hasta abajo
        FilAct++;
        DibujarTet(FilAct, CeldAct, RotarFig)
        Fijar.play()
        FilasHechas()
        GenerarTet()
      }else {
        FilAct++;
        DibujarTet(FilAct, CeldAct, RotarFig)
      }
      SeguirVivo()
      if (SeguirVivo()) {//Determina si aun autollamarse
        Tetris(Velocidad)
      }
    }
  },Velocidad)
}
//Cuando se hace click en iniciar juego comienza
document.getElementById("Iniciar_Juego").addEventListener("click",()=>{
  document.addEventListener("keydown",()=>{
    //Mientras que estes vivo puedes moverte
    if (Vivo) {
      let dir = event.keyCode;
      //Movimiento Hacia Arriba
      if( dir == 37 &&  CeldAct>0-ColParedIzq(RotarFig)){//Moverse izquierda
        DesDibujarTet(FilAct, CeldAct, RotarFig);
        Mover.play()
        if(ColIzqTet(FilAct, CeldAct, RotarFig)){
          CeldAct--;
        }
        DibujarTet(FilAct, CeldAct, RotarFig);
        Fijar.play()
        FilasHechas()
      }else if(dir == 39 && (CeldAct+Tetranomios[TetActual][RotarFig][0].length)-ColParedDer(RotarFig)<COLUMNAS){//Moverse derecha
        DesDibujarTet(FilAct, CeldAct, RotarFig);
        Mover.play()
        if(ColDerTet(FilAct, CeldAct, RotarFig)){
          CeldAct++;
        }
        DibujarTet(FilAct, CeldAct, RotarFig);
      }else if(dir == 40 && FilAct-ColAbajo(RotarFig)<(FILAS-Tetranomios[TetActual][RotarFig].length) && SeguirVivo()){//Este es abajo
        Puntuacion+=1//Aumenta un punto
        DesDibujarTet(FilAct, CeldAct, RotarFig);
        if(!(ColAbajoTet(FilAct, CeldAct, RotarFig))){//Hay tetrinomio abajo
          DibujarTet(FilAct, CeldAct, RotarFig)
          Fijar.play()
          FilasHechas()
          GenerarTet()
        }else if (FilAct-ColAbajo(RotarFig)+Tetranomios[TetActual][RotarFig].length==19 && SeguirVivo()) {//Esta en la ultima fila
          FilAct++;
          DibujarTet(FilAct, CeldAct, RotarFig)
          Fijar.play()
          FilasHechas()
          GenerarTet()
        }else {//Simplemente desciende
          FilAct++;
        }
        DibujarTet(FilAct, CeldAct, RotarFig)
      }else if(dir == 38 && PoderRotar()){//Rotar la figura
        Rotar.play()
        DesDibujarTet(FilAct, CeldAct, RotarFig);
        if (PoderRotTet(FilAct, CeldAct, RotarFig)) {
          if (RotarFig==3) {
            RotarFig=0;
          }else {
            RotarFig++;
          }
        }
        DibujarTet(FilAct, CeldAct, RotarFig)
      }
    }
  });
  //Quita la pantalla de Inicio
  document.getElementById("Datos_Juego").style.display = "none";
  Tetris(Velocidad);
  DibujarTet(FilAct, CeldAct, RotarFig)
  DibujarNext()
  Musica_Fondo_1.play()
})
//Muestra la imagen de los controles en la pagina Inicio del tetris
document.getElementById("Controles").addEventListener("click",()=>{
    let Controles = document.createElement("img")
    Controles.src="../statics/Tetris/img/Controles.png"
    Controles.classList.add("imagen-modal")
    Controles.addEventListener("click",()=>{
    Controles.remove()
  })
  document.getElementById("Datos_Juego-cont").appendChild(Controles)
})
