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

function llenarBuscaminas() {
    let cookie = valCookie("scoresBuscaminas");
    let cookieSplit = cookie.split(",");
    let arrScores = [];
    for (let i = 0; i < (cookieSplit.length / 3); i++) {
        arrScores[i] = cookieSplit[i * 3];
    }
    arrScores.sort((a, b) => {
        return a - b;
    })
    let arrScoresSort = [];
    for (var i = 0; i < 5; i++) {
        if (arrScores.length != 0) {
            arrScoresSort[i] = arrScores.pop();
        }
    }
    for (var i = 0; i < arrScoresSort.length; i++) {
        if (arrScoresSort.length != 0) {
            let indice = cookieSplit.indexOf(arrScoresSort[i]);
            let fila = $("<tr>");
            let jugador = $("<td>");
            $(jugador).text(cookieSplit[indice + 1]);
            let puntuacion = $("<td>");
            $(puntuacion).text(cookieSplit[indice]);
            let tiempo = $("<td>");
            let valTiempo = new Date(parseInt(cookieSplit[indice + 2]));
            $(tiempo).text(valTiempo.toLocaleString());
            $(fila).append(jugador, puntuacion, tiempo);
            $("#body-Buscaminas").append(fila);
        }
    }
}

function llenarTetris() {
    let cookie = valCookie("scoresTetris");
    let cookieSplit = cookie.split(",");
    let arrScores = [];
    for (let i = 0; i < (cookieSplit.length / 3); i++) {
        arrScores[i] = cookieSplit[i * 3];
    }
    arrScores.sort((a, b) => {
        return a - b;
    })
    let arrScoresSort = [];
    for (var i = 0; i < 5; i++) {
        if (arrScores.length != 0) {
            arrScoresSort[i] = arrScores.pop();
        }
    }
    for (var i = 0; i < arrScoresSort.length; i++) {
        if (arrScoresSort.length != 0) {
            let indice = cookieSplit.indexOf(arrScoresSort[i]);
            let fila = $("<tr>");
            let jugador = $("<td>");
            $(jugador).text(cookieSplit[indice + 1]);
            let puntuacion = $("<td>");
            $(puntuacion).text(cookieSplit[indice]);
            let tiempo = $("<td>");
            let valTiempo = new Date(parseInt(cookieSplit[indice + 2]));
            $(tiempo).text(valTiempo.toLocaleString());
            $(fila).append(jugador, puntuacion, tiempo);
            $("#body-Tetris").append(fila);
        }
    }
}

function llenarSpace() {
    let cookie = valCookie("scoresSpace");
    let cookieSplit = cookie.split(",");
    let arrScores = [];
    for (let i = 0; i < (cookieSplit.length / 3); i++) {
        arrScores[i] = cookieSplit[i * 3];
    }
    arrScores.sort((a, b) => {
        return a - b;
    })
    let arrScoresSort = [];
    for (var i = 0; i < 5; i++) {
        if (arrScores.length != 0) {
            arrScoresSort[i] = arrScores.pop();
        }
    }
    for (var i = 0; i < arrScoresSort.length; i++) {
        if (arrScoresSort.length != 0) {
            let indice = cookieSplit.indexOf(arrScoresSort[i]);
            let fila = $("<tr>");
            let jugador = $("<td>");
            $(jugador).text(cookieSplit[indice + 1]);
            let puntuacion = $("<td>");
            $(puntuacion).text(cookieSplit[indice]);
            let tiempo = $("<td>");
            let valTiempo = new Date(parseInt(cookieSplit[indice + 2]));
            $(tiempo).text(valTiempo.toLocaleString());
            $(fila).append(jugador, puntuacion, tiempo);
            $("#body-Space").append(fila);
        }
    }
}

$(document).ready(() => {
    llenarBuscaminas();
    llenarTetris();
    llenarSpace();
})