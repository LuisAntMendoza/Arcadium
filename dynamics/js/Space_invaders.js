let width = 900;
let height = 600;
let context = canvas.getContext("2d");
let check = false;
let muertos = 0;
let velocidad=0.2;
let separacion= 80;
let separacionVertical= 100;
canvas.width = width;
canvas.height = height;

let body=document.getElementsByTagName("body");
let div=document.createElement("div");
div.innerText="Llevas "+ muertos+ " muertos.Sigue así";
div.classList.add("Puntaje");

body[0].appendChild(div);

/////////////////////////////////////////////////////Movimiento de la Naver///////////////////////////////////
//Movimiento de la Nave
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
			console.log("Piumm");
			}
  }
}
)
/////////////////////////////////////////////////////Movimiento de la Naver///////////////////////////////////


/////////////////////////////////////////////////////Nave///////////////////////////////////
//Objeto nave
let Nave = {
	x: width/2,
	y: height,
  r: 30,
	velocidad_x: 5,
	velocidad_y: 5
}

//funcion para dibujar la Nave
function dibujarNave(x,y,r) {
  context.beginPath();
  context.rect(x-(r/6), y-r-10, 10, r);
  context.fillStyle = "blue";
  context.fill();
  context.beginPath();
	context.arc(x, y, r, 0, Math.PI * 2)
	context.fillStyle = "white";
	context.fill();
	context.closePath();
}
/////////////////////////////////////////////////////Nave///////////////////////////////////


////////////////////////////////////////////////////Disparos/////////////////////////////////
let Disparo = {
  size:10,
  velocidad_y:20,
	pos_x:Nave.x,
	pos_y:Nave.y,
	color:"green"
}

function dibujarDisparo(x,y,lar,anch, color){
	context.beginPath();
  context.rect(x-5, y-30, anch, anch);
  context.fillStyle = color;
  context.fill();
}

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

let Aliens = {
	x:20,
	y:20,
	velocidad: .01,
	size: 50,
	color: "rgb(117, 175, 246)",
	colorSec:"rgb(169, 0, 255)"
}


function dibujarAlien(x, y,color, colorSec){
	context.beginPath();
	context.rect(x, y, 40, 40);
	context.fillStyle = color;
	context.fill();
	context.beginPath();
	context.strokeStyle = colorSec;
	context.rect(x+5, y+10, 10, 15);
	context.strokeStyle = colorSec;
	context.rect(x+25, y+10, 10, 15);
	context.fillStyle = colorSec;
	context.arc(x+22, y+32, 3, 0, Math.PI * 2)
	context.fill();
	context.beginPath();
}

let Posiciones=[
		[1,2,3,4,5,6,7,8],
		[1,2,3,4,5,6,7,8],
		[1,2,3,4,5,6,7,8]
	];

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
/*
function InvasoresViven(){
	setInterval(()=>{
		velocidad*=-1;
	},2000)
	setInterval(()=>{
		for (var i = 0; i < Posiciones.length; i++) {
			Posiciones[i]
			for (var a = 0; a < Posiciones[i].length; a++) {
				Posiciones[i][a]+=velocidad;
			}
		}
	},150)
}*/
let cantidad=Posiciones.length*Posiciones[0].length;
let check3=0;
function InvasoresViven(){
	for (var i = 0; i < Posiciones.length; i++) {
		for (var a = 0; a < Posiciones[i].length; a++) {
			Posiciones[i][a]+=Aliens.velocidad;
			if (40+Posiciones[i][a]*separacion>=width || Posiciones[i][a]*separacion<=0) {
				//Aliens.velocidad+=0.01;
				Aliens.velocidad*=-1;
				console.log(Aliens.velocidad);

			}

		}
	}
}


function checarWidth() {

}
////////////////////////////////////////////////////Los invasores viven :o/////////////////////////////////


////////////////////////////////////////////////////Los invasores Contraatacan :o/////////////////////////////////
let num=Math.floor(Math.random()*Posiciones.length);
let num2=Math.floor(Math.random()*Posiciones[num].length);


function azar() {
	Ataque.pos_x=Posiciones[num][num2]*separacion;
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

let check2=true;
function contraatacar() {
	disparoInvasor();
	Ataque.pos_y-=Ataque.velocidad_y;
	if (Ataque.pos_y>=height) {
		Ataque.pos_y=num2+1*separacionVertical;
		check2=false;
		azar();
	}
	dibujarDisparo(Ataque.pos_x-20,Ataque.pos_y+50, Aliens.size/2, Ataque.size,Ataque.color);
}


////////////////////////////////////////////////////Los invasores Contraatacan :o/////////////////////////////////

////////////////////////////////////////////////////Muertisimo/////////////////////////////////

function Muertisimo() {
	alert("Estas muertisimo")
	Posiciones=[
			[1,2,3,4,5,6,7,8],
			[1,2,3,4,5,6,7,8],
			[1,2,3,4,5,6,7,8]
		];
}


////////////////////////////////////////////////////Muertisimo/////////////////////////////////


////////////////////////////////////////////////////Detectar Disparo/////////////////////////////////
function detectarDisparo(y,x) {
	for (var i = 0; i < Posiciones.length; i++) {
		if (y==(i+1)*separacionVertical) {
			for (var a = 0; a < Posiciones[i].length; a++) {
				if (Posiciones[i][a]*separacion+40>=Nave.x && Posiciones[i][a]*separacion<=Nave.x){
					Disparo.pos_y=-10
					Posiciones[i][a]="muerto";
					muertos+=1;
					div.innerText="Llevas "+ muertos+ " muertos. Sigue así";
					console.log(Posiciones[i]);
					console.log("LLevas "+muertos+" muertos");
				}
			}
		}
	}
}

function disparoInvasor(){
	if (Ataque.pos_y==height-2*Nave.r) {
		if (Nave.x+30>=Ataque.pos_x && Nave.x<=Ataque.pos_x) {
			Muertisimo();
		}
	}
}
////////////////////////////////////////////////////Detectar Disparo/////////////////////////////////



function juego() {
  context.clearRect(0, 0, width, height);
  dibujarNave(Nave.x,Nave.y,Nave.r);
	Disparar();
	PosAliens();
	InvasoresViven();
	contraatacar();
  requestAnimationFrame(juego);
}

requestAnimationFrame(juego);
//
