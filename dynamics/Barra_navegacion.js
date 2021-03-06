/*Favicon*/
$("head").append("<link rel='apple-touch-icon' sizes='180x180' href='../statics/Favicon/apple-touch-icon.png'>")
$("head").append("<link rel='icon' type='image/png' sizes='32x32' href='../statics/Favicon/favicon-32x32.png'>")
$("head").append("<link rel='icon' type='image/png' sizes='16x16' href='../statics/Favicon/favicon-16x16.png'>")
$("head").append("<link rel='manifest' href='../statics/Favicon/site.webmanifest'>")
$("head").append("<link rel='mask-icon' href='../statics/Favicon/safari-pinned-tab.svg' color='#5bbad5'>")
$("head").append("<meta name='msapplication-TileColor' content='#da532c'>")
$("head").append("<meta name='theme-color' content='#ffffff'>")

/*Agrega los Creditos*/
let Creditos = $("<div id='Creditos-mostar'>")
Creditos.addClass("Creditos-fond")
let Contenido = $("<div>")
Contenido.addClass("Creditos-cont")
Contenido.append("<h1 class='Titulo'>Creditos</h1>");
Contenido.append("<h2>Nombre del Equipo</h2>");
Contenido.append("<h4>Dinamita</h4>");
Contenido.append("<h2>Integrantes del equipo</h2>");
Contenido.append("<h4>Mendoza Ramirez Luis Antonio</h4>");
Contenido.append("<h4>Romero Lara Rodrigo </h4>", "<h4>Villafranca Hernández Carlos Iván</h4>");
Creditos.append(Contenido);
$(".Top_bar").append(Creditos)

/*Obtiene el valor de los colores de la paleta  a aplicar*/
NombreUs = getCookie("NombreUs")
Paleta = getCookie("Paleta")
//Caso de primera vez o sin iniciar sesion
if (getCookie("NombreUs") == "" || getCookie("Paleta") == "") {
    $("head").append("<link rel='stylesheet' href='../statics/css/Captura-datos.css'>")
    let Captura = $("<div id='Captura-mostar'>")
    Captura.addClass("Captura-datos")
    let Contenido = $("<div>")
    Contenido.addClass("Captura-cont")
    Contenido.append("<h1 class='Titulo'>Bienvenido</h1>");
    Contenido.append("<h2>Veo que es la primera vez que ingresas, llena estos datos</h2>");
    Contenido.append("<h3>Paleta de color</h3>");
    if (getCookie("Paleta") != "") {
        Contenido.append("<h4 id='ColorSelect'>Color seleccionado " + getCookie("Paleta") + "</h4>");
    } else {
        Contenido.append("<h4 id='ColorSelect'>Color por default Morado</h4>");
        document.cookie = "Paleta=Morado"
    }
    let PaletasCol = $("<div>")
    PaletasCol.addClass("Paletas_opc")
    let Colores = ["Morado", "Azul", "Naranja"]
    for (var i = 0; i < Colores.length; i++) {
        let Butcolores = ("<button type='button' class='Butcolores' name='" + Colores[i] + "'></button>")
        PaletasCol.append(Butcolores)
    }
    Contenido.append(PaletasCol)
    Contenido.append("<h3>Nombre de Usuario</h3>");
    Contenido.append("<h4>Maximo 6 letras</h4>");
    var NomUsu = $("<input type='text' id='NombreUs' placeholder='NOM' maxlength='6' required>")
    Contenido.append(NomUsu);
    var Continuar = $("<input type='submit'  value='Continuar'>")
    Contenido.append(Continuar);
    Captura.append(Contenido);
    $("body").prepend(Captura)
    $(".Butcolores").each((ind, elem) => {
        $(elem).click(() => {
            $("#ColorSelect").text("Color seleccionado " + elem.name)
            document.cookie = "Paleta=" + elem.name
        })
    })
    NomUsu.on("input", () => {
        NomUsu.val(NomUsu.val().toUpperCase());
        document.cookie = "NombreUs=" + NomUsu.val()
    })
    Continuar.click(() => {
        location.reload();
    })
}
//Aplica la paleta de color seleccionada
if (Paleta == "Azul") {
    $(".Top_bar").addClass("Paleta_2")
    Creditos.addClass("Paleta_2")
} else if (Paleta == "Naranja") {
    $(".Top_bar").addClass("Paleta_3")
    Creditos.addClass("Paleta_3")
} else {
    $(".Top_bar").addClass("Paleta_1")
    Creditos.addClass("Paleta_1")
}
//Agrega los eventos de los botones
$("#Inicio").click(() => {
    window.location = "../templates/Inicio.html"
});

$("#Juegos").click(() => {
    window.location = "../templates/Juegos.html"
});

$("#Puntajes").click(() => {
    window.location = "../templates/Puntajes.html"
});
//Evento de abrir los creditos
$("#Creditos").click(() => {
    $("#Creditos-mostar").show();
    $("#Creditos-mostar").data("Estado", "Abierto")
});
//Evento de cerrar los creditos
$("#Creditos-mostar").click(() => {
    if ($("#Creditos-mostar").data("Estado") == "Abierto") {
        $("#Creditos-mostar").data("Estado", "Cerrado")
        $("#Creditos-mostar").hide();
    } else {
        console.log("No hay nada por cerrar");
    }
})
//Evento para cerrar la sesion
$("#Cerrar-ses").click(() => {
    document.cookie = "Paleta=Hola :); expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "NombreUs=Me alegra que leas esto; expires=Thu, 01 Jan 1970 00:00:00 UTC"
    location.reload();
});