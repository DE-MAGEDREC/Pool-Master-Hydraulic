// 🔹 Navigation onglets
function suivant(id) {
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
}

// 🔹 Choix dynamique des formes
function choixForme() {
  const f = document.querySelector('input[name="forme"]:checked').value;
  document.querySelectorAll('.forme-fields').forEach(d => d.style.display="none");
  if(f==="rectangle") {
    document.getElementById("rectangle-fields").style.display="block";
  } else {
    document.getElementById("ronde-fields").style.display="block";
  }
  document.getElementById("forme-img").src = "img/"+f+".png";
}

// 🔹 Calcul surface et volume en temps réel
$('input').on('input', () => {
  let surface = 0, volume = 0;
  const forme = $('input[name="forme"]:checked').val();
  if (forme === "rectangle") {
    surface = (+L.value||0)*(+l.value||0);
    volume = surface*(+p.value||0);
  } else {
    surface = Math.PI*Math.pow((+D_piscine.value||0)/2,2);
    volume = surface*(+p_r.value||0);
  }
  $('#res').html(`<b>Surface :</b> ${surface.toFixed(2)} m²<br><b>Volume :</b> ${volume.toFixed(2)} m³`);
  $('#res_droite').html(`<b>Surface :</b> ${surface.toFixed(2)} m²<br><b>Volume :</b> ${volume.toFixed(2)} m³`);
});

// 🔹 Export PDF sécurisé
$('#btn-pdf').on('click', function () {
  html2pdf().from(document.getElementById('res')).save();
});
