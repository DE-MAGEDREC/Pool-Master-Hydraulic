// ====== LANGUES ======
const translations = {
  en: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Pool",
    canalisations_tab: "Pipes",
    pertes_tab: "Singular losses",
    pression_tab: "Pressure & Temperature",
    resultats_tab: "Results / PDF",
    surface: "Surface",
    volume: "Volume",
    debit: "Filtration flow rate",
    longueur: "Length (m)",
    largeur: "Width (m)",
    profondeur: "Depth (m)",
    forme_rect: "Rectangular",
    forme_rond: "Round",
    suivant: "Next →",
    resultats: "Results",
    pertes_sing: "Singular losses",
    filtre: "Filter loss",
    hauteur: "Geometric height",
    friction: "Pipe friction",
    total_asp: "Total suction",
    total_ref: "Total discharge",
    exporter: "Export PDF",
    logout: "Logout",
    en_bar: " (bar)"
  },
  fr: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscine",
    canalisations_tab: "Canalisations",
    pertes_tab: "Pertes singulières",
    pression_tab: "Pression & Température",
    resultats_tab: "Résultats / PDF",
    surface: "Surface",
    volume: "Volume",
    debit: "Débit filtration",
    longueur: "Longueur (m)",
    largeur: "Largeur (m)",
    profondeur: "Profondeur (m)",
    forme_rect: "Rectangulaire",
    forme_rond: "Ronde",
    suivant: "Suivant →",
    resultats: "Résultats",
    pertes_sing: "Pertes singulières",
    filtre: "Perte filtre",
    hauteur: "Hauteur géométrique",
    friction: "Friction canalisations",
    total_asp: "Total aspiration",
    total_ref: "Total refoulement",
    exporter: "Exporter PDF",
    logout: "Déconnexion",
    en_bar: " (bar)"
  },
  es: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscina",
    canalisations_tab: "Tuberías",
    pertes_tab: "Pérdidas singulares",
    pression_tab: "Presión & Temperatura",
    resultats_tab: "Resultados / PDF",
    surface: "Superficie",
    volume: "Volumen",
    debit: "Caudal filtración",
    longueur: "Longitud (m)",
    largeur: "Ancho (m)",
    profondeur: "Profundidad (m)",
    forme_rect: "Rectangular",
    forme_rond: "Redonda",
    suivant: "Siguiente →",
    resultats: "Resultados",
    pertes_sing: "Pérdidas singulares",
    filtre: "Pérdida de filtro",
    hauteur: "Altura geométrica",
    friction: "Fricción tuberías",
    total_asp: "Total aspiración",
    total_ref: "Total impulsión",
    exporter: "Exportar PDF",
    logout: "Cerrar sesión",
    en_bar: " (bar)"
  }
};

let currentLang = "en";

// ====== NAVIGATION ONGLET ======
function suivant(id){
  calculerResultats();
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
}

// ====== CHOIX FORMES ======
function choixForme(){
  const f = $('input[name="forme"]:checked').val();
  $('.forme-fields').hide();
  if(f==="rectangle") $('#rectangle-fields').show();
  else $('#ronde-fields').show();
  $('#forme-img').attr('src','img/'+f+'.png');
}

// ====== CONVERSION MCE -> BAR ======
function mceToBar(val){ return (val*0.0981).toFixed(2); }

// ====== COEFFICIENT LAMBDA ======
function getLambda(){
  const mat = $('#materiau').val();
  if(mat==="PVC") return 0.02;
  if(mat==="PVC_souple") return 0.025;
  return 0.03; // turbulent
}

// ====== CALCUL HYDRAULIQUE COMPLET ======
function calculerResultats(){
  const t = translations[currentLang];

  // 🏊 Piscine
  let surface=0, volume=0;
  const forme = $('input[name="forme"]:checked').val();
  if (forme==="rectangle"){
    surface = (+L.value||0)*(+l.value||0);
    volume = surface*(+p.value||0);
  } else {
    surface = Math.PI*Math.pow((+D_piscine.value||0)/2,2);
    volume = surface*(+p_r.value||0);
  }

  // 💧 Débit filtration (m3/h)
  const t_renouv = +t.value || 5;
  const debit = volume / t_renouv;

  // 🚰 Pertes singulières
  const H_sing_asp = (+coudes_asp.value||0) + (+tes_asp.value||0) + (+vannes_asp.value||0);
  const H_sing_ref = (+coudes_ref.value||0) + (+tes_ref.value||0) + (+vannes_ref.value||0);

  // 🌡️ Hauteur géométrique et filtre
  const H_geo_val = +H_geo.value||0;
  const dp_filtre_val = +dp_filtre.value||0;

  // 🛠️ Friction canalisations
  const lambda = getLambda();
  const H_fric_asp = lambda * (+L_asp.value||0) / (+D.value||1) * Math.pow(+v_asp.value||0,2)/(2*9.81);
  const H_fric_ref = lambda * (+L_ref.value||0) / (+D.value||1) * Math.pow(+v_ref.value||0,2)/(2*9.81);

  // 🔹 Totaux
  const H_total_asp = H_geo_val + dp_filtre_val + H_sing_asp + H_fric_asp;
  const H_total_ref = H_geo_val + dp_filtre_val + H_sing_ref + H_fric_ref;

  // 🔹 Affichage format mètre + bar
  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>

<b>${t.pertes_sing} aspiration :</b> ${H_sing_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_asp)}${t.en_bar}</small><br>
<b>${t.pertes_sing} refoulement :</b> ${H_sing_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_ref)}${t.en_bar}</small><br>
<b>${t.hauteur} :</b> ${H_geo_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_geo_val)}${t.en_bar}</small><br>
<b>${t.filtre} :</b> ${dp_filtre_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(dp_filtre_val)}${t.en_bar}</small><br>
<b>${t.friction} aspiration :</b> ${H_fric_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_asp)}${t.en_bar}</small><br>
<b>${t.friction} refoulement :</b> ${H_fric_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_ref)}${t.en_bar}</small><br><hr>

<b>${t.total_asp} :</b> ${H_total_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_asp)}${t.en_bar}</small><br>
<b>${t.total_ref} :</b> ${H_total_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_ref)}${t.en_bar}</small>
`;

  $('#res').html(html);
  $('#res_droite').html(html);
}

// ====== EXPORT PDF ======
$('#btn-pdf').on('click', function(){
  html2pdf().from(document.getElementById('res')).save();
});

// ====== LANGUE ======
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];

  $('h2.text-center').text(t.title);
  $('#res_droite h5').text(t.resultats);
  $('input[name="forme"][value="rectangle"]').parent().contents().filter(function(){return this.nodeType==3}).first()[0].textContent = " " + t.forme_rect;
  $('input[name="forme"][value="ronde"]').parent().contents().filter(function(){return this.nodeType==3}).first()[0].textContent = " " + t.forme_rond;
  $('.btn-primary').text(t.suivant);
  $('#btn-pdf').text(t.exporter);

  // recalculer pour traduire tout
  calculerResultats();
}

$('#lang-select').on('change', function(){ setLanguage($(this).val()); });

// ====== INITIALISATION ======
$(document).ready(function(){
  setLanguage(currentLang);
  calculerResultats();
});

// ====== ÉVÉNEMENT TEMPS RÉEL ======
$('input, select').on('input change', calculerResultats);
