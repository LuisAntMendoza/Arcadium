let width = 900;
let height = 500;
let context = canvas.getContext("2d");
let check = false;
let muertos = 0;
let velocidad=0.2;
let separacion= 50;
let separacionVertical= 50;
let Puntuacion=0;
let vivo=false;



let Posiciones=[
		[0,1,2,3,4,5,6,7,8,9,10,11,12],
		[1,2,3,4,5,6,7,8,9,10,11],
		[2,3,4,5,6,7,8,9,10],
		[3,4,5,6,7,8,9],
		[4,5,6,7,8],
		[5,6,7],
		[6],
];

let totalAliens=Posiciones.length*(Posiciones[0].length);
console.log(totalAliens);
var fecha=new Date()
fecha.setTime(fecha.getTime()+1000*60*60*24*365)


var fechaVieja=new Date()

canvas.width = width;
canvas.height = height;
let body=document.getElementsByTagName("body");
let puntaje=document.createElement("div");
let perdiste=document.createElement("div");
puntaje.innerText="Llevas "+ muertos+ " muertos.Sigue así";
puntaje.classList.add("Puntaje");
perdiste.classList.add("Perdiste");


body[0].appendChild(puntaje);
body[0].appendChild(perdiste);


function IniciarJuego() {
	document.getElementById("Iniciar_Juego").addEventListener("click",()=>{
		prepararJuego();
		Controles();
	})
}

function volverIniciar() {
	document.getElementById("Volver_a_jugar").addEventListener("click",()=>{
		quitarClases("modal2","perder","jugando");
		prepararJuego();

	})
}

function Controles() {
	document.getElementsByTagName("body")[0].addEventListener("keydown", (e) => {
		if (e.key == "a" || e.key == "A") {
			if (Nave.x-Nave.r!=0) {
				Nave.x-=10;
				dibujarNave(Nave.x,Nave.y,Nave.r)
			}
		}
		if (e.key == "d" || e.key == "D") {
			if (Nave.x+Nave.r!=width) {
				Nave.x+=10;
				dibujarNave(Nave.x,Nave.y,Nave.r)
			}
		}
		//Disparo
		if (e.key == "w" || e.key == "W") {
			if (check!=true) {
				check=true;
				}
			}
		}
	)
}

function prepararJuego() {
	quitarClases("modal","menu","jugando");
	console.log("Click");
	Nave.x=width/2;
	Ataque.pos_y=-100;
	Disparo.pos_y=width*2;
	vivo=true;
	requestAnimationFrame(juego);
}




function quitarClases(elemento,remover,agregar) {
	document.getElementById(elemento).classList.remove(remover);
	document.getElementById(elemento).classList.add(agregar);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// Objetos	 ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

let Nave = {
	x: width/2,
	y: height,
  r: 20,
	velocidad_x: 5,
	velocidad_y: 5
}


let Disparo = {
  size:10,
  velocidad_y:20,
	pos_x:Nave.x,
	pos_y:Nave.y,
	color:"green"
}

let Aliens = {
	x:20,
	y:20,
	velocidad: .04,
	size: 10,
	color: "rgb(43, 255, 0)",
	colorSec:"#ffffff",
}

//funcion para dibujar la Nave
function dibujarNave(x,y,r) {
  context.beginPath();
  context.rect(x-(r/6), y-1.5*r, r/3, r);
  context.fillStyle = "blue";
  context.fill();
  context.beginPath();
	context.arc(x, y, r, 0, Math.PI * 2)
	context.fillStyle = "white";
	context.fill();
	context.closePath();
}

function dibujarDisparo(x,y,lar,anch, color){
	context.beginPath();
	context.rect(x-Nave.r/6, y-Nave.r, anch, anch);
	context.fillStyle = color;
	context.fill();
}

function dibujarAlien(x, y,color, colorSec, colorSec2){
	context.beginPath();
	context.rect(x, y, Aliens.size*2, Aliens.size*2);
	context.fillStyle = color;
	context.fill();
	context.beginPath();
	context.strokeStyle = colorSec;
	context.rect(x+Aliens.size/8, y+Aliens.size/2, Aliens.size/2, Aliens.size/1.5 );
	context.rect(x+Aliens.size*1.2, y+Aliens.size/2, Aliens.size/2, Aliens.size/1.5);
	context.fillStyle = colorSec;
	context.arc(x+(Aliens.size), y+Aliens.size*1.5, Aliens.size/5, 0, Math.PI * 2)
	context.fill();
	context.beginPath();
}

/////////////////////////////////////////////////////Nave///////////////////////////////////


////////////////////////////////////////////////////Disparos/////////////////////////////////


function Disparar(){
	if (check==true) {
		Disparo.pos_y-=Disparo.velocidad_y;
		dibujarDisparo(Nave.x, Disparo.pos_y, Disparo.size, Disparo.size,Disparo.color );
		detectarDisparo(Disparo.pos_y);
		detectarWidth(Disparo.pos_y);
	}
}

function detectarWidth(posicion) {
	if (posicion>=width || posicion<=0) {
		check=false;
		Disparo.pos_y=height;
	}
}

////////////////////////////////////////////////////Disparos/////////////////////////////////



////////////////////////////////////////////////////Invasores :o/////////////////////////////////






function PosAliens() {
	for (var i = 0; i < Posiciones.length; i++) {
		for (var a = 0; a < Posiciones[i].length; a++) {
			let x=Posiciones[i][a]*separacion;
			let y=(i+1)*separacion;
			dibujarAlien(x,y,Aliens.color, Aliens.colorSec);
		}
		Posiciones[i]
	}

}

////////////////////////////////////////////////////Invasores :o/////////////////////////////////


////////////////////////////////////////////////////Los invasores viven :o/////////////////////////////////

function InvasoresViven(){
	for (var i = 0; i < Posiciones.length; i++) {
		for (var a = 0; a < Posiciones[i].length; a++) {
			Posiciones[i][a]+=Aliens.velocidad;
			if (Aliens.size*2+Posiciones[i][a]*separacion>=width || Posiciones[i][a]*separacion<=0) {
				Aliens.velocidad*=-1;
			}
		}
	}
}
////////////////////////////////////////////////////Los invasores viven :o/////////////////////////////////


////////////////////////////////////////////////////Los invasores Contraatacan :o/////////////////////////////////
let num=Math.floor(Math.random()*Posiciones.length);
let num2=Math.floor(Math.random()*Posiciones[num].length);


function azar() {
	Ataque.pos_x=Posiciones[num][num2]*separacion+Aliens.size;
	Ataque.pos_y=(num+1)*separacionVertical;
	num=Math.floor(Math.random()*Posiciones.length);
	num2=Math.floor(Math.random()*Posiciones[num].length);
}


let Ataque = {
  size:10,
  velocidad_y:-10,
	pos_x:(num2+1)*separacion,
	pos_y:(Math.floor(Math.random()*Posiciones.length)+1)*separacionVertical,
	color:"red"
}

function contraatacar() {
	disparoInvasor();
	Ataque.pos_y-=Ataque.velocidad_y;
	if (Ataque.pos_y>=height) {
		Ataque.pos_y=num2+1*separacionVertical;
		azar();
	}
	dibujarDisparo(Ataque.pos_x-20,Ataque.pos_y+50, Aliens.size/2, Ataque.size,Ataque.color);
}


////////////////////////////////////////////////////Los invasores Contraatacan :o/////////////////////////////////

////////////////////////////////////////////////////Muertisimo/////////////////////////////////





function Muertisimo() {
	todoNormal();
	quitarClases("modal2","jugando","perder");
	fechaVieja.setTime(fecha.getTime()-1);
	document.cookie = "tiempo="+muertos+";expires=" + fecha.toGMTString();
	vivo=false;
	volverIniciar();
}

function todoNormal() {
	Ataque.pos_y=num2+1*separacionVertical;
	azar();
	puntuacion=muertos*100;
	alert("Estas muertisimo, tienes "+puntuacion+" puntos")//Cambiar por un DOM
	let Posiciones=[
			[0,1,2,3,4,5,6,7,8,9,10,11,12],
			[1,2,3,4,5,6,7,8,9,10,11],
			[2,3,4,5,6,7,8,9,10],
			[3,4,5,6,7,8,9],
			[4,5,6,7,8],
			[5,6,7],
			[6],
	];
	muertos = 0;
}
////////////////////////////////////////////////////Muertisimo/////////////////////////////////


////////////////////////////////////////////////////Detectar Disparo/////////////////////////////////
function detectarDisparo(y,x) {
	for (var i = 0; i < Posiciones.length; i++) {
		if (y==(i+1)*separacionVertical) {
			for (var a = 0; a < Posiciones[i].length; a++) {
				if (Posiciones[i][a]*separacion+40>=Nave.x && Posiciones[i][a]*separacion<=Nave.x){
					Disparo.pos_y=-20
					Posiciones[i][a]="muerto";
					muertos+=1;
					document.cookie = "tiempo="+muertos+";expires=" + fecha.toGMTString()
					puntaje.innerText="Llevas "+ muertos+ " muertos. Sigue así";
					console.log(Posiciones[i]);
					console.log("LLevas "+muertos+" muertos");
				}
			}
		}
	}
}

function disparoInvasor(){
	if (Ataque.pos_y>=height-1.5*Nave.r) {
		if (Nave.x+Nave.r*2>=Ataque.pos_x && Nave.x<=Ataque.pos_x) {
			Muertisimo();
		}
	}
}
////////////////////////////////////////////////////Detectar Disparo/////////////////////////////////



function juego() {
	if (vivo==true) {
  	context.clearRect(0, 0, width, height);
  	dibujarNave(Nave.x,Nave.y,Nave.r);
		Disparar();
		PosAliens();
		InvasoresViven();
		contraatacar();
  	requestAnimationFrame(juego);
		console.log(vivo);
	}
}

IniciarJuego();

//
