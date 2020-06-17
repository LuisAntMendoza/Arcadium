const COLUMNAS = 10;
const FILAS = 20;
var FilAct=0;
var CeldAct=4;
var RotarFig=0;
var TetActual=Math.floor(Math.random()*Tetranomios.length);
var TetProx=Math.floor(Math.random()*Tetranomios.length);
var Tablero =document.getElementById('Tablero')
var Proxima_Figura= document.getElementById("Proxima_Figura")
///////////////////////////////////////////////////////////////////////////////
//////*******  Generacion del terreno de juego y prox Tet  **********//////////
///////////////////////////////////////////////////////////////////////////////
function CrearTerreno() {
  for (var i = 0; i < FILAS; i++) {
    var Fila= document.createElement("div")
    Fila.classList.add("Columna")
    Tablero.appendChild(Fila);
    for (var n = 0; n < COLUMNAS; n++) {
      var Celda =  document.createElement("div");
      Celda.classList.add("celda");
      Tablero.children[i].appendChild(Celda);
    }
  }
}
////////////////////////////  Proxima Figura  ///////////////////////////////////
function CrearProxFig() {
  for (var i = 0; i < 6; i++) {
    var Fila= document.createElement("div")
    Fila.classList.add("Columna")
    Proxima_Figura.appendChild(Fila);
    for (var n = 0; n < 6; n++) {
      var Celda =  document.createElement("div");
      Celda.classList.add("celda");
      Proxima_Figura.children[i].appendChild(Celda);
    }
  }
}

///////////////////////////////////////////////////////////////////////////////
//////////**** Funciones de dibujado de las piezas en la pantalla ******///////
///////////////////////////////////////////////////////////////////////////////

function DibujarTet(FilActual, CeldaActual, Figura) {
  let FigX=0;
  let FigY=0;
  for (var i = FilActual; i < FilActual+(Tetranomios[TetActual][Figura].length); i++) {
    FigX=0
    for (var n = CeldaActual; n < CeldaActual+Tetranomios[TetActual][Figura][FigY].length; n++) {
      if (Tetranomios[TetActual][Figura][FigY][FigX]>0) {
        Tablero.children[i].children[n].classList.add(TetColor[TetActual])
      }
      FigX++;
    }
    FigY++;
  }
}
////////////////////////////////////////////////////////////////////////////////
function DesDibujarTet(FilActual, CeldaActual, Figura) {
  let FigX=0;
  let FigY=0;
  for (var i = FilActual; i < FilActual+(Tetranomios[TetActual][Figura].length); i++) {
    FigX=0
    for (var n = CeldaActual; n < CeldaActual+Tetranomios[TetActual][Figura][FigY].length; n++) {
      if (Tetranomios[TetActual][Figura][FigY][FigX]>0){
        Tablero.children[i].children[n].classList.remove(TetColor[TetActual])
      }
      FigX++;
    }
    FigY++;
  }
}
////////////////////////////////////////////////////////////////////////////////
function DibujarNext() {
  let FigX=0;
  let FigY=0;
  for (var i = 1; i < Tetranomios[TetProx][0].length+1; i++) {
    FigX=0
    for (var n = 1; n < Tetranomios[TetProx][0][FigY].length+1; n++) {
      if (Tetranomios[TetProx][0][FigY][FigX]>0) {
        Proxima_Figura.children[i].children[n].classList.add(TetColor[TetProx])
      }
      FigX++;
    }
    FigY++;
  }
}
////////////////////////////////////////////////////////////////////////////////
function DesDibujarNext() {
  let FigX=0;
  let FigY=0;
  for (var i = 1; i < Tetranomios[TetProx][0].length+1; i++) {
    FigX=0
    for (var n = 1; n < Tetranomios[TetProx][0][FigY].length+1; n++) {
      if (Tetranomios[TetProx][0][FigY][FigX]>0) {
        Proxima_Figura.children[i].children[n].classList.remove(TetColor[TetProx])
      }
      FigX++;
    }
    FigY++;
  }
}
////////////////////////////////////////////////////////////////////////////////
function GenerarTet() {
  DesDibujarNext()
  FilAct=0;
  CeldAct=4;
  RotarFig=0;
  TetActual=TetProx;
  TetProx=Math.floor(Math.random()*Tetranomios.length);
  DibujarTet(FilAct, CeldAct, RotarFig)
  DibujarNext()
}
///////////////////////////////////////////////////////////////////////////////
//////////**** Funciones colisiones de las piezas en el juego ******///////////
///////////////////////////////////////////////////////////////////////////////

function ColParedIzq(PosFigura) {
  let ColVacia=true;
  let n = 0;
  do {
    for (let i = 0; i < Tetranomios[TetActual][PosFigura].length; i++) {
      if (Tetranomios[TetActual][PosFigura][i][n]==0) {
      }else {
        ColVacia=false;
      }
    }
    n++;
  } while (ColVacia==true);
  return n-1
}
////////////////////////////////////////////////////////////////////////////////
function ColParedDer(PosFigura) {
  let ColVacia=true;
  let n = 0;
  do {
    for (let i = 0; i < Tetranomios[TetActual][PosFigura].length; i++) {
      if (Tetranomios[TetActual][PosFigura][i][(Tetranomios[TetActual][PosFigura][i].length)-n-1]==0) {
      }else {
        ColVacia=false;
      }
    }
    n++;
  } while (ColVacia==true);
  return n-1
}
///////////////////////////////////////////////////////////////////////////////
function ColAbajo(PosFigura) {
  let ColVacia=true;
  let n = 0;
  let alturaPieca=Tetranomios[TetActual][PosFigura].length-1;
  do {
    for (let i = 0; i < Tetranomios[TetActual][PosFigura].length; i++) {
      if (Tetranomios[TetActual][PosFigura][alturaPieca-n][i]==0) {
      }else {
        ColVacia=false;
      }
    }
    n++;
  } while (ColVacia==true);
  return n-1
}
////////////////////////////////////////////////////////////////////////////////
function PoderRotar() {
  var SiPuedo=true
  let alturaPieca=Tetranomios[TetActual][RotarFig].length-1
  //Comprueba en caso de que estes del lado izquierdo
  if (CeldAct<0) {
    if (RotarFig==3){
      if(!(ColParedIzq(RotarFig)<=ColParedIzq(0))){
        SiPuedo= false;
      }
    }else {
      if(!(ColParedIzq(RotarFig)<=ColParedIzq(RotarFig+1))){
        SiPuedo= false;
      }
    }
  }else if (CeldAct>COLUMNAS-4 && TetActual==5) {
    //Caso especifico del tetranomio I
    if (RotarFig%2==0) {
      SiPuedo= false;
    }
  }else if (CeldAct>COLUMNAS-3) {
    //Comprueba en caso de que estes del lado derecho
    if (RotarFig==3){
      if(ColParedDer(RotarFig)<=ColParedDer(0)){
        SiPuedo= true;
      }else {
        SiPuedo= false;
      }
    }else {
      if(ColParedDer(RotarFig)<=ColParedDer(RotarFig+1)){
        SiPuedo= true;
      }else {
        SiPuedo= false;
      }
    }
  }else if (FilAct+alturaPieca>FILAS-1) {
    if (RotarFig==3){
      if(ColAbajo(RotarFig)<=ColAbajo(0)){
        SiPuedo= true;
      }else {
        SiPuedo= false;
      }
    }else {
      if(ColAbajo(RotarFig)<=ColAbajo(RotarFig+1)){
        SiPuedo= true;
      }else {
        SiPuedo= false;
      }
    }
  }
  return SiPuedo
}
////////////////////////////////////////////////////////////////////////////////
function ColIzqTet(FilActual, CeldaActual, Figura) {
    let FigX=0;
    let FigY=0;
    let x =ColParedIzq(RotarFig)
    let y= ColParedDer(RotarFig)
    let z= ColAbajo(RotarFig)
    var SiPuedo=true;
    for (var i = FilActual; i < FilActual+(Tetranomios[TetActual][Figura].length)-z; i++) {
      FigX=0;
      for (var n = CeldaActual-1; n < CeldaActual+Tetranomios[TetActual][Figura][FigY].length-x-1; n++) {
        if (n>=0 && n<=9) {
          if (Tablero.children[i].children[n].classList.length>1 && Tetranomios[TetActual][Figura][FigY][FigX]>0) {
            SiPuedo=false;
          }
        }
        FigX++;
      }
      FigY++;
    }
    return SiPuedo;
}
////////////////////////////////////////////////////////////////////////////////
function ColDerTet(FilActual, CeldaActual, Figura) {
    let FigX=0;
    let FigY=0;
    let x =ColParedIzq(RotarFig)
    let y= ColParedDer(RotarFig)
    let z= ColAbajo(RotarFig)
    var SiPuedo=true;
    for (var i = FilActual; i < FilActual+(Tetranomios[TetActual][Figura].length)-z; i++) {
      FigX=0;
      for (var n = CeldaActual+1; n < CeldaActual+Tetranomios[TetActual][Figura][FigY].length-y+1; n++) {
        if (n>=0 && n<=9) {
          if (Tablero.children[i].children[n].classList.length>1 && Tetranomios[TetActual][Figura][FigY][FigX]>0) {
            SiPuedo=false;
          }
        }
        FigX++;
      }
      FigY++;
    }
    return SiPuedo;
}
/////////////////////////////////////////////////////////////////////////////////
function ColAbajoTet(FilActual, CeldaActual, Figura) {
    let FigX=0;
    let FigY=0;
    let x =ColParedIzq(RotarFig)
    let y= ColParedDer(RotarFig)
    let z= ColAbajo(RotarFig)
    var SiPuedo=true;
    for (var i = FilActual+1; i < FilActual+1+(Tetranomios[TetActual][Figura].length)-z; i++) {
      FigX=0;
      for (var n = CeldaActual; n < CeldaActual+Tetranomios[TetActual][Figura][FigY].length; n++) {
        if (n>=0 && n<=9) {
          if (Tablero.children[i].children[n].classList.length>1 && Tetranomios[TetActual][Figura][FigY][FigX]>0) {
            SiPuedo=false;
          }
        }
        FigX++;
      }
      FigY++;
    }
    return SiPuedo;
}
////////////////////////////////////////////////////////////////////////////////
function PoderRotTet(FilActual, CeldaActual, Figura) {
  let FigX=0;
  let FigY=0;
  let x =ColParedIzq(RotarFig)
  let y= ColParedDer(RotarFig)
  let z= ColAbajo(RotarFig)
  if (Figura==3) {
    var NextFig=0;
  }else {
    var NextFig=Figura+1;
  }
  var SiPuedo=true;
  for (var i = FilActual; i < FilActual+(Tetranomios[TetActual][NextFig].length); i++) {
    FigX=0;
    for (var n = CeldaActual; n < CeldaActual+Tetranomios[TetActual][NextFig][FigY].length; n++) {
      if (n>=0 && n<=9) {
        if (Tablero.children[i].children[n].classList.length>1 && Tetranomios[TetActual][NextFig][FigY][FigX]>0) {
          SiPuedo=false;
        }
      }
      FigX++;
    }
    FigY++;
  }
  return SiPuedo;
}
///////////////////////////////////////////////////////////////////////////////
//////****** Funciones de destruir y crear las filas y puntuacion ******///////
///////////////////////////////////////////////////////////////////////////////
function FilasHechas() {
  var FilasAremover=[];
  for (var i = 0; i < FILAS; i++) {
    var CeldasLlenas=0;
    for (var n = 0; n < COLUMNAS; n++) {
      if(Tablero.children[i].children[n].classList.length>1){
        CeldasLlenas++;
      }
    }
    if (CeldasLlenas==10) {
      FilasAremover.push(i)
    }
  }
  if (FilasAremover.length>0) {
    if (FilasAremover.length==4) {
      Make_Tetris.play()
    }else if (FilasAremover.length==3) {
      Make_Triple.play()
    }else{
      Destroy_Row.play()
    }
    if (Velocidad>100) {
      Velocidad=Velocidad-20;
    }
    Puntuacion+=Math.pow((FilasAremover.length)*10, 2)
    FilasDestruidas+=FilasAremover.length
    document.getElementById("FilasD").innerHTML = FilasDestruidas;
    ModifcarPuntaje(Puntuacion);
    for (var i = FilasAremover.length-1; i >=0 ; i--) {
      Tablero.children[FilasAremover[i]].remove();
    }
    for (var i = FilasAremover.length-1; i >=0 ; i--) {
      let Fila= document.createElement("div")
      Fila.classList.add("Columna")
      for (var n = 0; n < COLUMNAS; n++) {
        let Celda =  document.createElement("div");
        Celda.classList.add("celda");
        Fila.appendChild(Celda);
      }
      Tablero.insertBefore(Fila, Tablero.firstChild);
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////
  function ModifcarPuntaje(Puntuacion){
    document.getElementById("Puntuacion").innerHTML = Puntuacion;
  }
  function SeguirVivo() {
    for (var i = 0; i < 4; i++) {
      for (var n = 0; n < COLUMNAS; n++) {
        if (Tablero.children[i].children[n].classList.length>2) {
          Vivo=false;
        }
      }
    }
    if (!Vivo) {
      Musica_Fondo_1.pause()
      let VolverPlay = document.createElement("button")
      VolverPlay.innerText="Volver a jugar"
      VolverPlay.addEventListener("click", ()=>{
        Velocidad = 1100;
        Puntuacion = 0;
        FilasDestruidas = 0;
        Vivo=true;
        Tablero.innerHTML= ""
        Proxima_Figura.innerHTML= ""
        CrearTerreno()
        CrearProxFig()
        ModifcarPuntaje(Puntuacion);
        document.getElementById("FilasD").innerHTML = FilasDestruidas;
        document.getElementById("Datos_Juego").style.display = "none";
        Tetris(Velocidad);
        DibujarTet(FilAct, CeldAct, RotarFig)
        DibujarNext()
        if (MusicaON) {
          Musica_Fondo_1.play()
        }
      })
      let Mensaje = document.createElement("h1")
      Mensaje.innerText="Has perdido :("
      let PuntuacionFinal = document.createElement("h3")
      PuntuacionFinal.innerText="Tu puntuacion es de "+Puntuacion;
      document.getElementById("Datos_Juego-cont").innerHTML= ""
      document.getElementById("Datos_Juego-cont").appendChild(Mensaje)
      document.getElementById("Datos_Juego-cont").appendChild(PuntuacionFinal)
      //Consulta los maxscore en tetris
      for (var i = 3; i > 0; i--) {
        var Posicion=100;
        if (Puntuacion> getCookie("MaxScore-Tetris-"+i)) {
          var Posicion=i;
        }
      }
      if (Posicion>=1 && Posicion<=3) {
        console.log(Posicion+">=1 && "+Posicion+"<=3");
        var MaxScore = document.createElement("h3")
        MaxScore.innerText="Tu puntuacion esta dentro de las tres mas altas, ingresa tu nombre";
        var Nombre = document.createElement("input")
        Nombre.type = "text"
        Nombre.maxLength= 3
        NombreMaxScore=""
        Nombre.addEventListener("input", ()=>{
          NombreMaxScore=Nombre.value;
          console.log(NombreMaxScore);
          if (NombreMaxScore="") {
            document.cookie ="MaxScore-Tetris-"+Posicion+"Nom=---";
          }
          document.cookie ="MaxScore-Tetris-"+Posicion+"Nom="+NombreMaxScore;
        })
        document.cookie ="MaxScore-Tetris-"+Posicion+"="+Puntuacion;
        document.getElementById("Datos_Juego-cont").appendChild(MaxScore)
        document.getElementById("Datos_Juego-cont").appendChild(Nombre)
        console.log("Se agrego nombre?");
      }
      // document.getElementById("Datos_Juego-cont").appendChild(VolverPlay)
      setTimeout(()=>{
      document.getElementById("Datos_Juego-cont").appendChild( document.createElement("br"))
      document.getElementById("Datos_Juego").style.display = "inherit";
    }, 100)
      setTimeout(()=>{
        Game_Over.play()
      }, 200)
    }
    return Vivo;
  }
