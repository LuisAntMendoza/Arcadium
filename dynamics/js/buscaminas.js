function cookieTablero(board) {
    let board2 = board.split(",");
    let tabla = [];
    let j = 0;
    for (let i = 0; i < largo; i++) {
        tabla[i] = [];
        for (var k = 0; k < ancho; k++) {
            tabla[i][k] = board2[j];
            j++;
        }
    }
    return tabla;
}

function validarTamaño() {
    let regreso = true;
    let contenedor = $(".contTablero").css("width");
    contenedor = contenedor.split("p");
    let tamContenedor = contenedor[0];
    if ((ancho * 30) + (ancho * 2) > tamContenedor) {
        regreso = false;
    }
    return regreso;
}

function inicializaMatriz(x, y) {
    let tabla = [];
    for (let i = 0; i < y; i++) {
        tabla[i] = new Array();
        for (let j = 0; j < x; j++) {
            tabla[i][j] = 0;
        }
    }
    return tabla;
}

function crearTablero(x, y) {
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            let div = $("<div>");
            $(div).attr("id", i + "coma" + j);
            $(div).on("click", mostrarNumero);
            $(div).on("contextmenu", mostrarBandera);
            $(div).data("clic", false);
            $(tablerominas).append(div);
        }
    }
}

function mostrarBandera(e) {
    e.preventDefault();
    let auxstr = this.id.split("coma");
    let myid = auxstr[0] + "coma" + auxstr[1];
    divObj = $("#" + myid);
    if ($(divObj).css("background-image") !== "none") {
        $(divObj).css("background-image", "none");
        $(divObj).data("bandera", false);
        arrBanderas[parseInt(auxstr[0])][parseInt(auxstr[1])] = 0;
    } else if ($(divObj).css("background-color") == "rgb(144, 144, 144)") {
        $(divObj).css("background-image", "url(../statics/img/bandera.jpg)");
        $(divObj).data("bandera", true);
        arrBanderas[parseInt(auxstr[0])][parseInt(auxstr[1])] = 1;
    }
    document.cookie = "arrBanderasBuscaminas=" + arrBanderas;
    mostrarBanderas();
    valEndGame(minas);
}

function mostrarBanderas() {
    let numBanderas = 0;
    $($("#tablerominas").children()).each((ind, elem) => {
        if ($(elem).data("bandera") == true) {
            numBanderas++;
        }
    })
    $("#bombasRest").html("<h3><i class='fas fa-flag'></i> " + (bombas - numBanderas) + "</h3>");
}

function mostrarNumero(e) {
    let auxstr = this.id.split("coma");
    let myid = auxstr[0] + "coma" + auxstr[1];
    divObj = $("#" + myid);
    arrClic[parseInt(auxstr[0], 10)][parseInt(auxstr[1], 10)] = 1;
    document.cookie = "arrClicBuscaminas=" + arrClic;
    if (minas[parseInt(auxstr[0], 10)][parseInt(auxstr[1], 10)] == 0) {
        $(divObj).css("background-color", "rgb(210, 210, 210)");
        $(divObj).css("background-image", "none");
        abrirAlrededor(parseInt(auxstr[0], 10), parseInt(auxstr[1], 10), minas);
    } else {
        if (minas[parseInt(auxstr[0], 10)][parseInt(auxstr[1], 10)] != "*") {
            $(divObj).html("<p>" + minas[parseInt(auxstr[0], 10)][parseInt(auxstr[1], 10)] + "</p>");
            $(divObj).css("background-color", "rgb(210, 210, 210)");
            $(divObj).css("background-image", "none");
        } else {
            $(divObj).css("background-image", "url(../statics/img/bomba.jpg)");
            abrirTablero(minas);
            perder();
            borrarCookies();
            $($("#tablerominas").children()).off("click");
            $($("#tablerominas").children()).off("contextmenu");
        }
    }
}

function bombasAlrededor(tablero) {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
            if (tablero[i][j] == "*") {
                if (i == 0 && j == 0) {
                    colocaNumeroBombas(i, j, i + 1, j + 1, tablero);
                } else if (i == 0 && (j > 0 && j < (ancho - 1))) {
                    colocaNumeroBombas(i, j - 1, i + 1, j + 1, tablero);
                } else if (i == 0 && j == (ancho - 1)) {
                    colocaNumeroBombas(i, j - 1, i + 1, j, tablero);
                } else if (j == (ancho - 1) && (i > 0 && i < (largo - 1))) {
                    colocaNumeroBombas(i - 1, j - 1, i + 1, j, tablero);
                } else if (i == (largo - 1) && j == (ancho - 1)) {
                    colocaNumeroBombas(i - 1, j - 1, i, j, tablero);
                } else if (i == (largo - 1) && (j > 0 && j < (ancho - 1))) {
                    colocaNumeroBombas(i - 1, j - 1, i, j + 1, tablero);
                } else if (i == (largo - 1) && j == 0) {
                    colocaNumeroBombas(i - 1, j, i, j + 1, tablero);
                } else if (j == 0 && (i > 0 && i < (largo - 1))) {
                    colocaNumeroBombas(i - 1, j, i + 1, j + 1, tablero);
                } else {
                    colocaNumeroBombas(i - 1, j - 1, i + 1, j + 1, tablero);
                }
            }
        }
    }
}

function colocaNumeroBombas(leti, letj, fini, finj, tablero) {
    for (let i = leti; i <= fini; i++) {
        for (let j = letj; j <= finj; j++) {
            if (tablero[i][j] != "*") {
                tablero[i][j] = (parseInt(tablero[i][j]) + 1);
            }
        }
    }
}

function generarBombas(tablero) {
    let fil = 0;
    let col = 0;

    fil = Math.round((Math.random() * (largo - 1)) + 0);
    col = Math.round((Math.random() * (ancho - 1)) + 0);

    for (let i = 0; i < bombas; i++) {
        while (tablero[fil][col] == "*") {
            fil = Math.round((Math.random() * (largo - 1)) + 0);
            col = Math.round((Math.random() * (ancho - 1)) + 0);
        }
        tablero[fil][col] = "*";
    }
}

function abrirCeros(leti, letj, fini, finj, cori, corj, tablero) {
    for (let i = leti; i <= fini; i++) {
        for (let j = letj; j <= finj; j++) {
            let myid = i + "coma" + j;
            let objDiv = $("#" + myid);
            if ($(objDiv).text() == "") {
                if (tablero[i][j] == 0) {
                    if (i == cori && j == corj) {
                        $(objDiv).text("");
                        $(objDiv).css("background-color", "rgb(210, 210, 210)");
                        $(objDiv).css("background-image", "none");
                    } else {
                        if ($(objDiv).css("background-color") != "rgb(210, 210, 210)") {
                            abrirAlrededor(i, j, tablero);
                        }
                    }
                } else {
                    if (tablero[i][j] != "*") {
                        $("#" + myid).html("<p>" + tablero[i][j] + "</p>");
                        $(objDiv).css("background-color", "rgb(210, 210, 210)");
                        $(objDiv).css("background-image", "none");
                    }
                }
            }
        }
    }
}

function abrirAlrededor(xi, xj, tablero) {
    if (xi == 0 && xj == 0) {
        abrirCeros(xi, xj, xi + 1, xj + 1, xi, xj, tablero);
    } else if (xi == 0 && (xj > 0 && xj < (ancho - 1))) {
        abrirCeros(xi, xj - 1, xi + 1, xj + 1, xi, xj, tablero);
    } else if (xi == 0 && xj == (ancho - 1)) {
        abrirCeros(xi, xj - 1, xi + 1, xj, xi, xj, tablero);
    } else if (xj == (ancho - 1) && (xi > 0 && xi < (largo - 1))) {
        abrirCeros(xi - 1, xj - 1, xi + 1, xj, xi, xj, tablero);
    } else if (xi == (largo - 1) && xj == (ancho - 1)) {
        abrirCeros(xi - 1, xj - 1, xi, xj, xi, xj, tablero);
    } else if (xi == (largo - 1) && (xj > 0 && xj < (ancho - 1))) {
        abrirCeros(xi - 1, xj - 1, xi, xj + 1, xi, xj, tablero);
    } else if (xi == (largo - 1) && xj == 0) {
        abrirCeros(xi - 1, xj, xi, xj + 1, xi, xj, tablero);
    } else if (xj == 0 && (xi > 0 && xi < (largo - 1))) {
        abrirCeros(xi - 1, xj, xi + 1, xj + 1, xi, xj, tablero);
    } else {
        abrirCeros(xi - 1, xj - 1, xi + 1, xj + 1, xi, xj, tablero);
    }
}

function abrirTablero(tablero) {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
            let myid = i + "coma" + j;
            let objDiv = $("#" + myid);
            if (tablero[i][j] == "*") {
                $(objDiv).css("background-image", "url(../statics/img/bomba.jpg)");
            }
        }
    }
}

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

function guardarCookies(tablero) {
    document.cookie = "tableroBuscaminas=" + tablero;
    document.cookie = "largoBuscaminas=" + largo;
    document.cookie = "anchoBuscaminas=" + ancho;
    document.cookie = "bombasBuscaminas=" + bombas;
    document.cookie = "arrClicBuscaminas=" + arrClic;
    document.cookie = "arrBanderasBuscaminas=" + arrBanderas;
    document.cookie = "dificultadBuscaminas=" + dificultad;
}

function borrarCookies() {
    let time = new Date();
    time.setTime(time.getTime() - 1)
    document.cookie = "tableroBuscaminas=0;expires=" + time.toGMTString();
    document.cookie = "largoBuscaminas=0;expires=" + time.toGMTString();
    document.cookie = "anchoBuscaminas=0;expires=" + time.toGMTString();
    document.cookie = "bombasBuscaminas=0;expires=" + time.toGMTString();
    document.cookie = "arrClicBuscaminas=0;expires=" + time.toGMTString();
    document.cookie = "arrBanderasBuscaminas=0;expires=" + time.toGMTString();
    document.cookie = "dificultadBuscaminas=0;expires=" + time.toGMTString();
}

function cargarTablero() {
    crearTablero(ancho, largo);
    generarBombas(minas);
    bombasAlrededor(minas);
    borrarCookies();
    guardarCookies(minas)
    mostrarBanderas();
}

function valEndGame(tablero) {
    let bombasEnc = 0;
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
            let myid = i + "coma" + j;
            let objDiv = $("#" + myid);
            if (tablero[i][j] == "*" && $(objDiv).data("bandera") == true) {
                bombasEnc++;
            }
        }
    }
    score = bombasEnc * 100;
    if (bombasEnc == bombas) {
        borrarCookies();
        ganar();
    }
}

function mostrarClics(tablero) {
    for (let i = 0; i < tablero.length; i++) {
        for (let k = 0; k < tablero[i].length; k++) {
            if (arrClic[i][k] == 1) {
                let myid = i + "coma" + k;
                let divObj = $("#" + myid);
                if (minas[i][k] == 0) {
                    $(divObj).css("background-color", "rgb(210, 210, 210)");
                    $(divObj).css("background-image", "none");
                    abrirAlrededor(i, k, minas);
                } else {
                    if (minas[i][k] != "*") {
                        $(divObj).html("<p>" + minas[i][k] + "</p>");
                        $(divObj).css("background-color", "rgb(210, 210, 210)");
                        $(divObj).css("background-image", "none");
                    }
                }
            }
        }
    }
}

function cookiesBanderas(tablero) {
    for (let i = 0; i < tablero.length; i++) {
        for (let k = 0; k < tablero[i].length; k++) {
            let myid = i + "coma" + k;
            let divObj = $("#" + myid);
            if (arrBanderas[i][k] == 1) {
                $(divObj).css("background-image", "url(../statics/img/bandera.jpg)");
                $(divObj).data("bandera", true);
            }
        }
    }
}

function ganar() {
    $("#tablerominas").html("");
    $("#tablerominas").css("border", "none");
    $("#mensaje-tablero").css("color", "greenyellow");
    $("#bombasRest").css("display", "none");
    puntaje()
    $("#mensaje-tablero").html("<h4>Felicidades, ha encontrado todas las bombas!</h4><h4>Su puntaje ha sido: " + score + "</h4>")

}

function perder() {
    puntaje();
    $("#mensaje-tablero").html("<h4>Has detonado una bomba! Vuelve a intentarlo</h4><h4>Su puntaje ha sido: " + score + "</h4>")

}

function puntaje() {
    if (score == undefined) {
        score = 0;
    }
    if ($("#dificultad").val() == "f") {
        score += 500;
    } else if ($("#dificultad").val() == "m") {
        score += 1000;
    } else if ($("#dificultad").val() == "d") {
        score += 1500;
    } else if ($("#dificultad").val() == "p") {
        score = "Lo sentimos, no hay puntuaciones en el modo personalizado";
    }
    cookieScore(score);
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
    let indice = arrCookies2.indexOf("scoresBuscaminas");
    if (indice == -1) {
        document.cookie = "scoresBuscaminas=" + valorCookie;
    } else {
        let board2 = arrCookies2[indice + 1];

        document.cookie = "scoresBuscaminas=" + board2 + "," + valorCookie;
    }
}

let minas = undefined;
let bombas = undefined;
let ancho = undefined;
let largo = undefined;
let arrClic = undefined;
let arrBanderas = undefined;
let score = undefined;
let dificultad = undefined;
$(document).ready(() => {
    if (valCookie("tableroBuscaminas") != null) {
        bombas = valCookie("bombasBuscaminas");
        largo = valCookie("largoBuscaminas");
        ancho = valCookie("anchoBuscaminas");
        minas = cookieTablero(valCookie("tableroBuscaminas"));
        arrClic = cookieTablero(valCookie("arrClicBuscaminas"));
        arrBanderas = cookieTablero(valCookie("arrBanderasBuscaminas"));
        dificultad = valCookie("dificultadBuscaminas");
        if (validarTamaño() == true) {
            $("#tablerominas").css("width", (ancho * 30) + (ancho * 2) + "px");
            crearTablero(ancho, largo);
            mostrarClics(minas);
            cookiesBanderas(minas);
            mostrarBanderas();
        } else {
            $("#error-pers").text("El ancho de su pantalla no soporta el numero de casillas de ancho ingresado.");
        }
    }
    $("#jugar").on("click", (e) => {
        e.preventDefault();
        $("#tablerominas").html("");
        $("#tablerominas").css("border", "1px solid black");
        $("#mensaje-tablero").html("");
        $("#bombasRest").css("display", "block")
        if ($("#dificultad").val() == "f") {
            bombas = 10;
            ancho = 8;
            largo = 8;
            dificultad = "f";
        } else if ($("#dificultad").val() == "m") {
            bombas = 40;
            ancho = 16;
            largo = 16;
            dificultad = "m";
        } else if ($("#dificultad").val() == "d") {
            bombas = 99;
            ancho = 30;
            largo = 16;
            dificultad = "d";
        } else if ($("#dificultad").val() == "p") {
            bombas = $("#bombas").val();
            ancho = $("#ancho").val();
            largo = $("#largo").val();
            dificultad = "p";
        }
        if (bombas >= ancho * largo) {
            $("#error-pers").text("Por favor, reduzca el numero de bombas.");
            $("#tablerominas").css("border", "none");
            $("#bombasRest").html("");
        } else {
            if (validarTamaño() == true) {
                $("#tablerominas").css("width", (ancho * 30) + (ancho * 2) + "px");
                minas = inicializaMatriz(ancho, largo);
                arrClic = inicializaMatriz(ancho, largo);
                arrBanderas = inicializaMatriz(ancho, largo);
                score = undefined;
                cargarTablero();
            } else {
                $("#error-pers").text("El ancho de su pantalla no soporta el numero de casillas de ancho ingresado.");
                $("#tablerominas").css("border", "none");
                $("#bombasRest").html("");
            }
        }

    });
    $("#dificultad").on("change", () => {
        if ($("#dificultad").val() == "p") {
            $("#contPersonalizado").css("display", "block");
            $("#dificultad").css("border", "4px solid blue");
        } else if ($("#dificultad").val() == "f") {
            $("#contPersonalizado").css("display", "none");
            $("#dificultad").css("border", "4px solid greenyellow");
        } else if ($("#dificultad").val() == "m") {
            $("#contPersonalizado").css("display", "none");
            $("#dificultad").css("border", "4px solid yellow");
        } else if ($("#dificultad").val() == "d") {
            $("#contPersonalizado").css("display", "none");
            $("#dificultad").css("border", "4px solid red");
        }
    })
    $("#cerrar-juego").on("click", () => {
        borrarCookies();
        window.location = "../index.html";
    })
    //Modal
    $("#cerrar-modal").on("click", () => {
        $(".modal").css("animation", "desvanecerModal 0.5s linear");
        $(".fade-body").css("animation", "desvanecerFade 0.5s linear");
        setTimeout(() => {
            $(".modal").css("display", "none");
            $(".fade-body").css("display", "none");
        }, 450);
    });
    $("#ayuda").on("click", () => {
        $(".modal").css("animation", "aparecerModal 0.5s linear");
        $(".fade-body").css("animation", "aparecerFade 0.5s linear");
        setTimeout(() => {
            $(".modal").css("display", "block");
            $(".fade-body").css("display", "block");
        }, 450);
    })
});