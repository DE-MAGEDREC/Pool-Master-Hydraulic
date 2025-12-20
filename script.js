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
  document.querySelectorAll('.forme-fields').forEach(d => d.style.display = "none");
  if(f === "rectangle") {
    document.getElementById("rectangle-fields").style.display = "block";
  } else {
    document.getElementById("ronde-fields").style.display = "block";
  }
  document.getElementById("forme-img").src = "img/" + f + ".png";
}

// 🔹 Calcul hydraulique complet
function calculerResultats() {
  // 🏊 Surface et volume piscine
  let surface = 0, volume = 0;
  const forme = $('input[name="forme"]:checked').val();
  if (forme === "rectangle") {
    surface = (+L.value || 0) * (+l.value || 0);
    volume = surface * (+p.value || 0);
  } else {
    surface = Math.PI * Math.pow((+D_piscine.value || 0)/2, 2);
    volume = surface * (+p_r.value || 0);
  }

  // 🚰 Pertes singulières aspiration
  const K_coudes_asp = +coudes_asp.value || 0;
  const K_tes_asp = +tes_asp.value || 0;
  const K_vannes_asp = +vannes_asp.value || 0;
  const H_sing_asp = K_coudes_asp + K_tes_asp + K_vannes_asp;

  // 🚰 Pertes singulières refoulement
  const K_coudes_ref = +coudes_ref.value || 0;
  const K_tes_ref = +tes_ref.value || 0;
  const K_vannes_ref = +vannes_ref.value || 0;
  const H_sing_ref = K_coudes_ref + K_tes_ref + K_vannes_ref;

  // 🌡️ Hauteur géométrique et filtre
  const H_geo_val = +H_geo.value || 0;
  const dp_filtre_val = +dp_filtre.value || 0;

  // 🛠️ Canalisations
  const L_asp_val = +L_asp.value || 0;
  const v_asp_val = +v_asp.value || 0;
  const L_ref_val = +L_ref.value || 0;
  const v_ref_val = +v_ref.value || 0;

  // ⚡ Calcul simplifié des pertes par friction (Darcy-Weisbach simplifié)
  const H_fric_asp = L_asp_val * 0.02;  // coeff simplifié
  const H_fric_ref = L_ref_val * 0.02;

  // 🔹 Totaux
  const H_total_asp = H_geo_val + dp_filtre_val + H_sing_asp + H_fric_asp;
  const H_total_ref = H_geo_val + dp_filtre_val + H_sing_ref + H_fric_ref;

  // 🔹 Affichage
  const html = `
<b>Surface piscine :</b> ${surface.toFixed(2)} m²<br>
<b>Volume piscine :</b> ${volume.toFixed(2)} m³<br><hr>

<b>Pertes singulières aspiration :</b> ${H_sing_asp.toFixed(2)} mCE<br>
<b>Pertes singulières refoulement :</b> ${H_sing_ref.toFixed(2)} mCE<br>
<b>Hauteur géométrique :</b> ${H_geo_val.toFixed(2)} m<br>
<b>Perte filtre :</b> ${dp_filtre_val.toFixed(2)} mCE<br>
<b>Friction aspiration :</b> ${H_fric_asp.toFixed(2)} mCE<br>
<b>Friction refoulement :</b> ${H_fric_ref.toFixed(2)} mCE<br><hr>

<b>Total aspiration :</b> ${H_total_asp.toFixed(2)} mCE<br>
<b>Total refoulement :</b> ${H_total_ref.toFixed(2)} mCE
`;

  $('#res').html(html);
  $('#res_droite').html(html);
}

// ⚡ Mise à jour en temps réel sur tout input
$('input, select').on('input change', calculerResultats);

// 🔹 Export PDF sécurisé
$('#btn-pdf').on('click', function () {
  html2pdf().from(document.getElementById('res')).save();
});

// ⚡ Initialisation au chargement
$(document).ready(calculerResultats);
