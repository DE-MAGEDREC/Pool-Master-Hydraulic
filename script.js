function suivant(id) {
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
}

function choixForme() {
  const f = document.querySelector('input[name="forme"]:checked').value;
  document.querySelectorAll('.forme-fields').forEach(d => d.style.display="none");
  document.getElementById(f+"-fields").style.display="block";
  document.getElementById("forme-img").src = "img/"+f+".png";
}

$('input').on('input', () => {
  let surface = 0, volume = 0;
  if ($('input[name="forme"]:checked').val() === "rectangle") {
    surface = (+L.value||0)*(+l.value||0);
    volume = surface*(+p.value||0);
  } else {
    surface = Math.PI*Math.pow((+D_piscine.value||0)/2,2);
    volume = surface*(+p.value||0);
  }
  res.innerHTML = `<b>Surface :</b> ${surface.toFixed(2)} m²<br><b>Volume :</b> ${volume.toFixed(2)} m³`;
});
