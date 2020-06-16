Paleta = getCookie("Paleta")
if (Paleta=="Azul") {
  $(".Top_bar").addClass("Paleta_2")
}else if (Paleta=="Naranja"){
  $(".Top_bar").addClass("Paleta_3")
}else {
    $(".Top_bar").addClass("Paleta_1")
}
$("#Inicio").click(()=>{
  console.log("Enviar al Inicio");
});

$("#Juegos").click(()=>{
  window.location ="../templates/Juegos.html"
});

$("#Puntajes").click(()=>{
  console.log("Enviar al los maximos puntajes");
});

$("#Creditos").click(()=>{
  console.log("Mostar creditos enmedio de la pantalla con modal");
});
