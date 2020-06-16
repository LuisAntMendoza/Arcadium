/*Agrega los Creditos*/
let Creditos = $("<div id='Creditos-mostar'>")
Creditos.addClass("Creditos-fond")
let Contenido = $("<div>")
Contenido.addClass("Creditos-cont")
Contenido.append( "<h1 class='Titulo'>Creditos</h1>");
Contenido.append( "<h2>Nombre del Equipo</h2>");
Contenido.append( "<h4>Insertar Nombre aqui </h4>");
Contenido.append( "<h2>Integrantes del equipo</h2>");
Contenido.append( "<h4>Rodrigo</h4>","<h4>Mendoza Ramirez Luis Antonio</h4>");
Contenido.append( "<h4>Vapnik</h4>","<h4>Villafranca Hernández Carlos Iván</h4>");
Creditos.append(Contenido);
$(".Top_bar").append(Creditos )

/*Obtiene el valor de los colores de la paleta  a aplicar*/
Paleta = getCookie("Paleta")
if (Paleta=="Azul") {
  $(".Top_bar").addClass("Paleta_2")
  Creditos.addClass("Paleta_2")
}else if (Paleta=="Naranja"){
  $(".Top_bar").addClass("Paleta_3")
  Creditos.addClass("Paleta_3")
}else {
  $(".Top_bar").addClass("Paleta_1")
  Creditos.addClass("Paleta_1")
}
//Agrega los eventos de los botones
$("#Inicio").click(()=>{
  window.location ="../templates/Inicio.html"
});

$("#Juegos").click(()=>{
  window.location ="../templates/Juegos.html"
});

$("#Puntajes").click(()=>{
  console.log("Enviar al los maximos puntajes");
});
//Evento de abrir los creditos
$("#Creditos").click(()=>{
  $("#Creditos-mostar").show();
  $("#Creditos-mostar").data("Estado", "Abierto")
});
//Evento de cerrar los creditos
$("#Creditos-mostar").click(()=>{
    if ($("#Creditos-mostar").data("Estado")=="Abierto") {
      $("#Creditos-mostar").data("Estado", "Cerrado")
      $("#Creditos-mostar").hide();
    }else {
      console.log("No hay nada por cerrar");
    }
})
