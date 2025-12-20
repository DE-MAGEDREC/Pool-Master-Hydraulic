// ====== LANGUES ======
const translations = {
  en: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Pool",
    canalisations_tab: "Pipes",
    pertes_tab: "Singular losses",
    pression_tab: "Pressure & Temperature",
    resultats_tab: "Results / PDF",
    lbl_forme: "Pool shape",
    forme_rectangulaire: "Rectangular",
    forme_carree: "Square",
    forme_ronde: "Round",
    forme_ovale: "Oval",
    forme_libre: "Free shape",
    lbl_longueur: "Length (m)",
    lbl_largeur: "Width (m)",
    lbl_profondeur: "Depth (m)",
    lbl_temps: "Water recycle time (h)",
    lbl_dn: "DN (mm)",
    lbl_materiau: "Pipe material",
    lbl_aspiration: "Suction",
    lbl_refoulement: "Discharge",
    lbl_long_asp: "Suction length (m)",
    lbl_long_ref: "Discharge length (m)",
    surface: "Surface",
    volume: "Volume",
    debit: "Filtration flow rate",
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
    lbl_forme: "Forme de la piscine",
    forme_rectangulaire: "Rectangulaire",
    forme_carree: "Carrée",
    forme_ronde: "Ronde",
    forme_ovale: "Ovale",
    forme_libre: "Libre",
    lbl_longueur: "Longueur (m)",
    lbl_largeur: "Largeur (m)",
    lbl_profondeur: "Profondeur (m)",
    lbl_temps: "Temps de recyclage (h)",
    lbl_dn: "DN (mm)",
    lbl_materiau: "Matériau",
    lbl_aspiration: "Aspiration",
    lbl_refoulement: "Refoulement",
    lbl_long_asp: "Longueur aspiration (m)",
    lbl_long_ref: "Longueur refoulement (m)",
    surface: "Surface",
    volume: "Volume",
    debit: "Débit filtration",
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
    lbl_forme: "Forma de la piscina",
    forme_rectangulaire: "Rectangular",
    forme_carree: "Cuadrada",
    forme_ronde: "Redonda",
    forme_ovale: "Ovalada",
    forme_libre: "Libre",
    lbl_longueur: "Longitud (m)",
    lbl_largeur: "Ancho (m)",
    lbl_profondeur: "Profundidad (m)",
    lbl_temps: "Tiempo de reciclaje (h)",
    lbl_dn: "DN (mm)",
    lbl_materiau: "Material",
    lbl_aspiration: "Aspiración",
    lbl_refoulement: "Impulsión",
    lbl_long_asp: "Longitud aspiración (m)",
    lbl_long_ref: "Longitud impulsión (m)",
    surface: "Superficie",
    volume: "Volumen",
    debit: "Caudal filtración",
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

// ====== CALCUL DES PERTES ======

// Coefficients λ pour canalisations selon matériau
const lambdaCoeffs = {
  PVC: 0.02,
  PVC_souple: 0.035,
  Turbulence: 0.316
};

// Pertes singulières par type d’accessoire (équivalent en m = coeff × DN)
const singularCoeffs = {
  coude_90_long: 20,
  coude_90_court: 30,
  coude_45: 12,
  te_droit: 40,
  te_derivation: 80,
  manchon: 2.5,
  clapet: 125,
  vanne: 8
};

// ====== CALCUL HYDRAULIQUE ======
function calculerResultats(){
  const t = translations[currentLang];

  // 🏊 Piscine
  let surface = 0, volume = 0;
  const forme = $('#forme').val();
  if(forme==="rectangulaire" || forme==="carree"){
    surface = (+L.value||0)*(+l.value||0);
    volume = surface*(+p.value||0);
  } else if(forme==="ronde" || forme==="ovale" || forme==="libre"){
    surface = Math.PI*Math.pow((+L.value||0)/2,2);
    volume = surface*(+p.value||0);
  }

  // 💧 Débit filtration
  const t_renouv = +t.value||5;
  const debit = volume / t_renouv;

  // 🚰 Pertes canalisations
  const DN = +D.value||100;
  const lambda = lambdaCoeffs[$('#materiau').val()] || 0.02;
  const H_fric_asp = lambda * (+L_asp.value||0) * Math.pow(+v_asp.value||0,2)/(2*9.81);
  const H_fric_ref = lambda * (+L_ref.value||0) * Math.pow(+v_ref.value||0,2)/(2*9.81);

  // 🔧 Pertes singulières
  const H_sing_asp = ((+coudes_asp.value||0)*singularCoeffs.coude_90_long*DN +
                      (+tes_asp.value||0)*singularCoeffs.te_droit*DN +
                      0*singularCoeffs.vanne) / 1000; // convert mm→m
  const H_sing_ref = ((+coudes_ref.value||0)*singularCoeffs.coude_90_long*DN +
                      (+tes_ref.value||0)*singularCoeffs.te_droit*DN +
                      0*singularCoeffs.vanne) / 1000;

  // 🌡️ Hauteur géométrique et filtre
  const H_geo_val = +H_geo.value||0;
  const dp_filtre_val = +dp_filtre.value||0;

  // 🔹 Totaux
  const H_total_asp = H_geo_val + dp_filtre_val + H_sing_asp + H_fric_asp;
  const H_total_ref = H_geo_val + dp_filtre_val + H_sing_ref + H_fric_ref;

  // 🔹 Affichage format mètre + bar
  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>

<b>${t.pertes_sing} ${t.lbl_aspiration} :</b> ${H_sing_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_asp)}${t.en_bar}</small><br>
<b>${t.pertes_sing} ${t.lbl_refoulement} :</b> ${H_sing_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_ref)}${t.en_bar}</small><br>
<b>${t.hauteur} :</b> ${H_geo_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_geo_val)}${t.en_bar}</small><br>
<b>${t.filtre} :</b> ${dp_filtre_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(dp_filtre_val)}${t.en_bar}</small><br>
<b>${t.friction} ${t.lbl_aspiration} :</b> ${H_fric_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_asp)}${t.en_bar}</small><br>
<b>${t.friction} ${t.lbl_refoulement} :</b> ${H_fric_ref.toFixed(2)} mCE<br>
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

  $('#app-title').text(t.title);
  $('#tab-piscine').text(t.piscine_tab);
  $('#tab-canalisations').text(t.canalisations_tab);
  $('#tab-pertes').text(t.pertes_tab);
  $('#tab-pression').text(t.pression_tab);
  $('#tab-resultats').text(t.resultats_tab);

  $('#lbl-forme').text(t.lbl_forme);
  $('#lbl-longueur').text(t.lbl_longueur);
  $('#lbl-largeur').text(t.lbl_largeur);
  $('#lbl-profondeur').text(t.lbl_profondeur);
  $('#lbl-temps').text(t.lbl_temps);
  $('#lbl-dn').text(t.lbl_dn);
  $('#lbl-materiau').text(t.lbl_materiau);
  $('#lbl-aspiration').text(t.lbl_aspiration);
  $('#lbl-refoulement').text(t.lbl_refoulement);
  $('#lbl-long-asp').text(t.lbl_long_asp);
  $('#lbl-long-ref').text(t.lbl_long_ref);

  $('#res-title').text(t.resultats_tab);

  calculerResultats();
}

$('#lang-select').on('change', function(){ setLanguage($(this).val()); });

// ====== INITIALISATION ======
$(document).ready(function(){
  setLanguage(currentLang);
  calculerResultats();
});

// ====== Événement temps réel ======
$('input, select').on('input change', calculerResultats);
