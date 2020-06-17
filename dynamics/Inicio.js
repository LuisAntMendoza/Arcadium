var Paleta = getCookie("Paleta")

if (Paleta=="Azul") {
  $("#Bienvenida").addClass("Paleta_2")
}else if (Paleta=="Naranja"){
  $("#Bienvenida").addClass("Paleta_3")
}else {
  $("#Bienvenida").addClass("Paleta_1")
}
$("#Enviar_juegos").click(()=>{
  window.location ="../templates/Juegos.html"
})
$("#Enviar_Puntajes").click(()=>{
  console.log("Enviar al los maximos puntajes");
  console.log("Cambio ruta 2");
})
