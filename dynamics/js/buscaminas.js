let minas = undefined;
let bombas = undefined;
let ancho = undefined;
let largo = undefined;
$(document).ready(() => {
    $("#jugar").on("click", (e) => {
        e.preventDefault();
        $("#tablerominas").html("");
        if ($("#dificultad").val() == "f") {
            bombas = 10;
            ancho = 8;
            largo = 8;
        } else if ($("#dificultad").val() == "m") {
            bombas = 40;
            ancho = 16;
            largo = 16;
        } else if ($("#dificultad").val() == "d") {
            bombas = 99;
            ancho = 30;
            largo = 16;
        } else if ($("#dificultad").val() == "p") {
            bombas = $("#bombas").val();
            ancho = $("#ancho").val();
            largo = $("#largo").val();
        }
        if (validarTamaño() == true) {
            $("#tablerominas").css("width", (ancho * 30) + (ancho * 2) + "px");
            minas = inicializaMatriz(ancho, largo);
            cargarTablero();
        } else {
            $("#tablerominas").html("<h1>El ancho de su pantalla no soporta el número de casillas de ancho ingresado</h1>");
        }
    });
    $("#dificultad").on("change", () => {
        if ($("#dificultad").val() == "p") {
            $("#contPersonalizado").css("display", "block");
        } else {
            $("#contPersonalizado").css("display", "none");
        }
    })
});

function validarTamaño() {
    let regreso = true;
    if ((ancho * 30) + (ancho * 2) > (window.innerWidth - 16)) {
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
    console.log(tabla)
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
    } else if ($(divObj).css("background-color") == "rgb(144, 144, 144)") {
        $(divObj).css("background-image", "url(../statics/img/bandera.jpg)");
        $(divObj).data("bandera", true);
    }
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
    $("#bombasRest").text("Restantes: " + (bombas - numBanderas));
}

function mostrarNumero(e) {
    let auxstr = this.id.split("coma");
    let myid = auxstr[0] + "coma" + auxstr[1];
    divObj = $("#" + myid);

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
            alert("Perdiste =(");
            $("div").off("click");
            $("div").off("contextmenu");
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

    fil = Math.floor((Math.random() * (largo - 1)) + 0);
    col = Math.floor((Math.random() * (ancho - 1)) + 0);

    for (let i = 0; i < bombas; i++) {
        while (tablero[fil][col] == "*") {
            fil = Math.floor((Math.random() * (largo - 1)) + 0);
            col = Math.floor((Math.random() * (ancho - 1)) + 0);
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

function cargarTablero() {
    crearTablero(ancho, largo);
    generarBombas(minas);
    bombasAlrededor(minas);
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
    if (bombasEnc == bombas) {
        alert("Has ganado");
    }
}