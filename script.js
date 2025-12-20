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
    forme_rect: "Rectangle",
    forme_carre: "Square",
    forme_rond: "Round",
    forme_ovale: "Oval",
    forme_libre: "Free shape",
    recyclage: "Recycling time (h)",
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
    forme_rect: "Rectangle",
    forme_carre: "Carré",
    forme_rond: "Ronde",
    forme_ovale: "Ovale",
    forme_libre: "Forme libre",
    recyclage: "Temps de recyclage (h)",
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
    forme_carre: "Cuadrado",
    forme_rond: "Redonda",
    forme_ovale: "Ovalada",
    forme_libre: "Forma libre",
    recyclage: "Tiempo de reciclaje (h)",
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
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
}

// ====== CONVERSION MCE -> BAR ======
function mceToBar(val){ return (val*0.0981).toFixed(2); }

// ====== CALCUL HYDRAULIQUE ======
function calculerResultats(){
  const t = translations[currentLang];

  // 🏊 Piscine
  let surface=0, volume=0;
  const forme = $('#forme_piscine').val();
  if (forme==="rectangle") surface = (+L.value||0)*(+l.value||0);
  else if (forme==="carre") surface = Math.pow(+L.value||0,2);
  else if (forme==="ronde") surface = Math.PI*Math.pow((+L.value||0)/2,2);
  else if (forme==="ovale") surface = Math.PI*(+L.value||0/2)*(+l.value||0/2);
  else if (forme==="libre") surface = +L.value||0; // L = surface pour libre

  volume = surface*(+p.value||0);

  // 💧 Débit filtration
  let t_recyclage = +t_renouv.value || 5; // h
  let debit = volume / t_recyclage;

  // 🚰 Pertes singulières
  const H_sing_asp = (+coudes_asp.value||0) + (+tes_asp.value||0) + (+vannes_asp.value||0);
  const H_sing_ref = (+coudes_ref.value||0) + (+tes_ref.value||0) + (+vannes_ref.value||0);

  // 🌡️ Hauteur géométrique et filtre
  const H_geo_val = +H_geo.value||0;
  const dp_filtre_val = +dp_filtre.value||0;

  // 🛠️ Canalisations
  const H_fric_asp = (+L_asp.value||0)*0.02;
  const H_fric_ref = (+L_ref.value||0)*0.02;

  // 🔹 Totaux
  const H_total_asp = H_geo_val + dp_filtre_val + H_sing_asp + H_fric_asp;
  const H_total_ref = H_geo_val + dp_filtre_val + H_sing_ref + H_fric_ref;

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

// ====== BOUTONS SUIVANT ======
$('.btn-primary').on('click', function(){
  calculerResultats();
  const nextTab = $(this).closest('.tab-pane').next('.tab-pane').attr('id');
  if(nextTab) suivant('#'+nextTab);
});

// ====== EXPORT PDF ======
$('#btn-pdf').on('click', function(){
  html2pdf().from(document.getElementById('res')).save();
});

// ====== LANGUE ======
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];

  $('#page-title').text(t.title);
  $('#res-title').text(t.resultats);
  $('#tab-piscine').text(t.piscine_tab);
  $('#tab-canalisations').text(t.canalisations_tab);
  $('#tab-pertes').text(t.pertes_tab);
  $('#tab-pression').text(t.pression_tab);
  $('#tab-resultats').text(t.resultats_tab);

  $('#lbl-forme').text(t.lblForme || "Forme de la piscine");
  $('#opt-rectangle').text(t.forme_rect);
  $('#opt-carre').text(t.forme_carre);
  $('#opt-ronde').text(t.forme_rond);
  $('#opt-ovale').text(t.forme_ovale);
  $('#opt-libre').text(t.forme_libre);

  $('#lbl-longueur').text(t.longueur);
  $('#lbl-largeur').text(t.largeur);
  $('#lbl-profondeur').text(t.profondeur);
  $('#lbl-recyclage').text(t.recyclage);

  $('#lbl-diam-canal').text(t.longueur);
  $('#lbl-materiau').text(t.materiau || "Matériau");

  $('#lbl-asp').text(t.aspiration || "Aspiration");
  $('#lbl-long-asp').text(t.longueur);
  $('#lbl-v-asp').text(t.vitesse || "Vitesse");

  $('#lbl-ref').text(t.refoulement || "Refoulement");
  $('#lbl-long-ref').text(t.longueur);
  $('#lbl-v-ref').text(t.vitesse || "Vitesse");

  $('#lbl-asp-sing').text(t.aspiration || "Aspiration");
  $('#lbl-coudes-asp').text(t.coudes || "Coudes");
  $('#lbl-tes-asp').text(t.tes || "Tés");
  $('#lbl-vannes-asp').text(t.vannes || "Vannes");

  $('#lbl-ref-sing').text(t.refoulement || "Refoulement");
  $('#lbl-coudes-ref').text(t.coudes || "Coudes");
  $('#lbl-tes-ref').text(t.tes || "Tés");
  $('#lbl-vannes-ref').text(t.vannes || "Vannes");

  $('#lbl-hauteur').text(t.hauteur);
  $('#lbl-dp-filtre').text(t.filtre);

  $('.btn-primary').text(t.suivant);
  $('#btn-pdf').text(t.exporter);

  calculerResultats();
}

// ====== INITIALISATION ======
$(document).ready(function(){
  setLanguage(currentLang);
  calculerResultats();
  $('#lang-select').on('change', function(){ setLanguage($(this).val()); });
});

// ====== Événement temps réel ======
$('input, select').on('input change', calculerResultats);
