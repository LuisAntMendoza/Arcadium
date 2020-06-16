Paleta = getCookie("Paleta")
if (Paleta=="Azul") {
  $("#Lista_Juegos").addClass("Paleta_2")
}else if (Paleta=="Naranja"){
  $("#Lista_Juegos").addClass("Paleta_3")
}else {
  $("#Lista_Juegos").addClass("Paleta_1")
}
$(".Jugar").each((ind, elem) => {
  //Guarda el numero de la carta ya que si lo pones directo no funciona
  let Nombre = $(".Jugar")[ind].name
  $(elem).click(()=>{
      window.location ="../templates/"+Nombre+".html"
    })
});
