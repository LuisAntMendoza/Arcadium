const COLUMNAS = 10;
const FILAS = 20;
var FilAct=0;//Fila en la que se encuentra la parte superiori del tetranomio
var CeldAct=4;//Columna el que se encuentra la parte izquierda del tetranomio
var RotarFig=0;//Posicion en la (de las 4 rotacione) en la que se encuentra
var TetActual=Math.floor(Math.random()*Tetranomios.length);//Generacion del primer tetranomio
var TetProx=Math.floor(Math.random()*Tetranomios.length);//Generacion del siguiente tetranomio
var Tablero =document.getElementById('Tablero')//Obtencio por DOM del tablero donde se insertara todo
var Proxima_Figura= document.getElementById("Proxima_Figura")//Obtencio por DOM del tablero donde la sisuienten figura
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
/*Aqui son funciones que analizan cuantas veces mas se pueden mover hacias la
 derecha e izquierda sin que sobresalgan el terreno*/
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
/*Comprueba si es posible bajar aun más o no*/
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
/*Checa que si al rotar no sobresaldra del terreno por haber rotado*/
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
/*Comprueba si hay algun tetranomio en sus lados (inferiori y laterelas)
de ser asi regresara un false para evitar de que se puedan ejecutar estos hechos*/
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
/*Comprueba que a la hora de rotar no se sobre ponga a una de las piezas ya existentes*/
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
    //Dependiendo de las filas eliminadas genera un sonido
    if (FilasAremover.length==4) {
      Make_Tetris.play()
    }else if (FilasAremover.length==3) {
      Make_Triple.play()
    }else{
      Destroy_Row.play()
    }
    // Disminuye la velocidas con un minimo de 100
    if (Velocidad>100) {
      Velocidad=Velocidad-20;
    }
    // Aumenta el score dependiendo de las filas FilasDestruidas
    /*
      1 fILA == 100 puntos
      2 fILA == 400 puntos
      3 fILA == 900 puntos
      4 fILA == 1600 puntos

      ** Mienttas se acelera la velocidad de caida se suma 1 punto
    */
    Puntuacion+=Math.pow((FilasAremover.length)*10, 2)
    //Aumenta las filas destruidas
    FilasDestruidas+=FilasAremover.length
    //Refelja ese contenido
    document.getElementById("FilasD").innerHTML = FilasDestruidas;
    ModifcarPuntaje(Puntuacion);
    //Destruye las filas de abajo hacia arriba en la ubicacion indicada para evitar conflictos
    for (var i = FilasAremover.length-1; i >=0 ; i--) {
      Tablero.children[FilasAremover[i]].remove();
    }
    //Crea filas nuevas al inicio para representar la caida de las otras
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
///////////////////////////////////////////////////////////////////////////////////////
/*Funciones  para hacer los scores by Luis :) */
function valCookie(nombre) {
    let regreso = undefined;
    let cookies = document.cookie;
    let arrCookies = cookies.split("; ");
    let arrCookies2 = [];
    for (let i = 0; i < arrCookies.length; i++) {
        arrCookies2.push(arrCookies[i].split("=")[0]);
        arrCookies2.push(arrCookies[i].split("=")[1]);
    }
    let indice = arrCookies2.indexOf(nombre);
    if (indice == -1) {
        regreso = null;
    } else {
        regreso = arrCookies2[indice + 1]
    }
    return regreso;
}

function cookieScore(puntuacion) {
    let fecha = new Date().getTime();
    let usuario = valCookie("NombreUs");
    let valorCookie = [puntuacion, usuario, fecha];
    let cookies = document.cookie;
    let arrCookies = cookies.split("; ");
    let arrCookies2 = [];
    for (let i = 0; i < arrCookies.length; i++) {
        arrCookies2.push(arrCookies[i].split("=")[0]);
        arrCookies2.push(arrCookies[i].split("=")[1]);
    }
    let indice = arrCookies2.indexOf("scoresTetris");
    if (indice == -1) {
        document.cookie = "scoresTetris=" + valorCookie;
    } else {
        let board2 = arrCookies2[indice + 1];

        document.cookie = "scoresTetris=" + board2 + "," + valorCookie;
    }
}
////////////////////////////////////////////////////////////////////////////////////////
/////////////////******  Funcion para continuar el juego  *****/////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

  function SeguirVivo() {
    //Calculas si en la primeras tres filas (donde aparecen las piezas)
    //hay alguna que tenga mas de dos clases (que haya fichas sobreescritas)
    for (var i = 0; i < 4; i++) {
      for (var n = 0; n < COLUMNAS; n++) {
        if (Tablero.children[i].children[n].classList.length>2) {
          Vivo=false;
        }
      }
    }
    //De ser asi terminara el juego
    if (!Vivo) {
      Musica_Fondo_1.pause()
      let VolverPlay = document.createElement("button")
      VolverPlay.innerText="Volver a jugar"
      VolverPlay.addEventListener("click", ()=>{
        //Se reinician a los valores predeterminados
        Velocidad = 1100;
        Puntuacion = 0;
        FilasDestruidas = 0;
        Vivo=true;
        Tablero.innerHTML= ""//Limpia el tablero
        Proxima_Figura.innerHTML= ""//Limpia la proxima pieza
        CrearTerreno()
        CrearProxFig()
        ModifcarPuntaje(Puntuacion);//limpia la puntuacion
        document.getElementById("FilasD").innerHTML = FilasDestruidas;//Limpia las filas destruidas
        document.getElementById("Datos_Juego").style.display = "none";//Desaperece la pestaña de game over
        Tetris(Velocidad);//Vuelve a comenzar el juego
        DibujarTet(FilAct, CeldAct, RotarFig)
        DibujarNext()
        if (MusicaON) {
          Musica_Fondo_1.play()
        }
      })
      //Muestra el mensaje de que perdiste
      let Mensaje = document.createElement("h1")
      Mensaje.innerText="Has perdido :("
      let PuntuacionFinal = document.createElement("h3")
      ModifcarPuntaje(Puntuacion);
      PuntuacionFinal.innerText="Tu puntuacion es de "+Puntuacion;
      cookieScore(Puntuacion)
      document.getElementById("Datos_Juego-cont").innerHTML= ""
      document.getElementById("Datos_Juego-cont").appendChild(Mensaje)
      document.getElementById("Datos_Juego-cont").appendChild(PuntuacionFinal)
      document.getElementById("Datos_Juego-cont").appendChild(VolverPlay)
      document.getElementById("Datos_Juego-cont").appendChild( document.createElement("br"))
      document.getElementById("Datos_Juego").style.display = "inherit";
      setTimeout(()=>{
        Game_Over.play()
      }, 200)
    }
    return Vivo;
  }
