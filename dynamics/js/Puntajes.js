Paleta = getCookie("Paleta")
if (Paleta == "Azul") {
    $("#Mejores-Puntajes").addClass("Paleta_2")
} else if (Paleta == "Naranja") {
    $("#Mejores-Puntajes").addClass("Paleta_3")
} else {
    $("#Mejores-Puntajes").addClass("Paleta_1")
}
$(".Jugar").each((ind, elem) => {
    //Guarda el numero de la carta ya que si lo pones directo no funciona
    let Nombre = $(".Jugar")[ind].name
    $(elem).click(() => {
        window.location = "../templates/" + Nombre + ".html"
    })
});

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
var TetrisScores = valCookie("scoresTetris").split(",")
console.log(TetrisScores);
Top5Tetris=[];
for (var i = 0; i < TetrisScores.length; i+=3) {
  var Linea = $("<tr>")
  Linea.append("<td>"+TetrisScores[i]+"</td>")
  Linea.append("<td>"+TetrisScores[i+1]+"</td>")
  var miliseg = TetrisScores[i+2];
  var Fecha = new Date(miliseg);
  console.log(Fecha);
  Linea.append("<td>"+TetrisScores[i+2]+"</td>")
  $("#Tetris").append(Linea)
}
console.log(Top5Tetris.sort())
