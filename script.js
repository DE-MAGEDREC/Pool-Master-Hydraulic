// ========================= TRANSLATIONS =========================
const translations = {
  fr: {
    title: "Pool Master Hydraulic",
    langue: "Langue :",
    piscine_tab: "Piscine",
    canalisations_tab: "Canalisations",
    pertes_tab: "Pertes singulières",
    pression_tab: "Pression & Température",
    resultats_tab: "Résultats / PDF",
    forme_piscine: "Forme de la piscine",
    forme_rect: "Rectangulaire",
    forme_carree: "Carrée",
    forme_rond: "Ronde",
    forme_ovale: "Ovale",
    forme_libre: "Libre",
    debit: "Débit filtration",
    surface: "Surface",
    volume: "Volume",
    suivant: "Suivant →",
    resultats: "Résultats",
    pertes_sing_asp: "Pertes singulières aspiration",
    pertes_sing_ref: "Pertes singulières refoulement",
    filtre: "Perte filtre",
    hauteur: "Hauteur géométrique",
    friction: "Friction canalisations",
    total_asp: "Total aspiration",
    total_ref: "Total refoulement",
    pertes_totales: "Pertes totales",
    exporter: "Exporter PDF",
    logout: "Déconnexion",
    en_bar: " Bar",
    en_psi: " PSI"
  },
  en: {
    title: "Pool Master Hydraulic",
    langue: "Language :",
    piscine_tab: "Pool",
    canalisations_tab: "Pipes",
    pertes_tab: "Singular losses",
    pression_tab: "Pressure & Temperature",
    resultats_tab: "Results / PDF",
    forme_piscine: "Pool shape",
    forme_rect: "Rectangular",
    forme_carree: "Square",
    forme_rond: "Round",
    forme_ovale: "Oval",
    forme_libre: "Free form",
    debit: "Filtration flow rate",
    surface: "Surface",
    volume: "Volume",
    suivant: "Next →",
    resultats: "Results",
    pertes_sing_asp: "Singular losses suction",
    pertes_sing_ref: "Singular losses discharge",
    filtre: "Filter loss",
    hauteur: "Geometric height",
    friction: "Pipe friction",
    total_asp: "Total suction",
    total_ref: "Total discharge",
    pertes_totales: "Total losses",
    exporter: "Export PDF",
    logout: "Logout",
    en_bar: " Bar",
    en_psi: " PSI"
  },
  es: {
    title: "Pool Master Hydraulic",
    langue: "Idioma :",
    piscine_tab: "Piscina",
    canalisations_tab: "Tuberías",
    pertes_tab: "Pérdidas singulares",
    pression_tab: "Presión & Temperatura",
    resultats_tab: "Resultados / PDF",
    forme_piscine: "Forma de la piscina",
    forme_rect: "Rectangular",
    forme_carree: "Cuadrada",
    forme_rond: "Redonda",
    forme_ovale: "Oval",
    forme_libre: "Libre",
    debit: "Caudal filtración",
    surface: "Superficie",
    volume: "Volumen",
    suivant: "Siguiente →",
    resultats: "Resultados",
    pertes_sing_asp: "Pérdidas singulares aspiración",
    pertes_sing_ref: "Pérdidas singulares impulsión",
    filtre: "Pérdida de filtro",
    hauteur: "Altura geométrica",
    friction: "Fricción tuberías",
    total_asp: "Total aspiración",
    total_ref: "Total impulsión",
    pertes_totales: "Pérdidas totales",
    exporter: "Exportar PDF",
    logout: "Cerrar sesión",
    en_bar: " Bar",
    en_psi: " PSI"
  }
};

// ========================= VARIABLES =========================
let currentLang = "fr";

// ========================= UTILITAIRES =========================
function getNumber(id) {
  const v = $(id).val();
  return parseFloat((v||"").toString().replace(',','.')) || 0;
}

// Conversion mCE -> Bar
function mceToBar(val) {
  return (val * 0.0981).toFixed(2);
}

// Conversion mCE -> PSI
function mceToPsi(val) {
  return (val * 1.42233).toFixed(2);
}

// ========================= WIZARD =========================
function suivant(id) {
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
  calculerResultats();
}

// ========================= CHOIX FORMES =========================
function choixForme() {
  const f = $('input[name="forme"]:checked').val();
  $('.forme-fields').hide();
  switch(f) {
    case "rectangle": $('#rectangle-fields').show(); break;
    case "carre": $('#carre-fields').show(); break;
    case "ronde": $('#ronde-fields').show(); break;
    case "ovale": $('#ovale-fields').show(); break;
    case "libre": $('#libre-fields').show(); break;
  }
}

// ========================= CALCUL HYDRAULIQUE =========================
function calculerResultats() {
  const t = translations[currentLang];

  // ----- Piscine -----
  const forme = $('input[name="forme"]:checked').val();
  let surface=0, volume=0;
  const t_recycl = getNumber('#t_recycl') || 5; // h par défaut

  if(forme==="rectangle"){
    const L_val = getNumber('#L');
    const l_val = getNumber('#l');
    const p_val = getNumber('#p');
    surface = L_val*l_val; volume = surface*p_val;
  } else if(forme==="carre"){
    const c_val = getNumber('#cote');
    const p_val = getNumber('#p_carre');
    surface = c_val*c_val; volume = surface*p_val;
  } else if(forme==="ronde"){
    const D_val = getNumber('#D_piscine');
    const p_val = getNumber('#p_r');
    surface = Math.PI*Math.pow(D_val/2,2); volume = surface*p_val;
  } else if(forme==="ovale"){
    const a_val = getNumber('#a_ovale');
    const b_val = getNumber('#b_ovale');
    const p_val = getNumber('#p_o');
    surface = Math.PI*(a_val/2)*(b_val/2); volume = surface*p_val;
  } else if(forme==="libre"){
    const L_val = getNumber('#L_libre');
    const l_val = getNumber('#l_libre');
    const p_val = getNumber('#p_libre');
    surface = L_val*l_val; volume = surface*p_val;
  }

  const debit = volume / t_recycl;

  // ----- Canalisations -----
  const DN = getNumber('#D')/1000 || 0.05; // m
  const v_asp = getNumber('#v_asp') || 1;
  const v_ref = getNumber('#v_ref') || 1;
  const L_asp = getNumber('#L_asp') || 0;
  const L_ref = getNumber('#L_ref') || 0;
  const lambda = ($('#materiau').val()==="PVC_souple") ? 0.035 : ($('#materiau').val()==="Turbulence") ? 0.316 : 0.02;

  const H_fric_asp = lambda * L_asp / DN * Math.pow(v_asp,2)/(2*9.81);
  const H_fric_ref = lambda * L_ref / DN * Math.pow(v_ref,2)/(2*9.81);

  // ----- Pertes singulières -----
  function calcSing(c90C, c90G, te, vanne, V){
    const L_eq = ((+c90C||0)*30*DN) + ((+c90G||0)*20*DN) + ((+te||0)*40*DN) + ((+vanne||0)*8*DN);
    return lambda * L_eq / DN * Math.pow(V,2)/(2*9.81);
  }

  const H_sing_asp = calcSing(getNumber('#coudes90C_asp'), getNumber('#coudes90G_asp'), getNumber('#tes_asp'), getNumber('#vannes_asp'), v_asp);
  const H_sing_ref = calcSing(getNumber('#coudes90C_ref'), getNumber('#coudes90G_ref'), getNumber('#tes_ref'), getNumber('#vannes_ref'), v_ref);

  // ----- Hauteur géométrique et filtre -----
  const H_geo_val = getNumber('#H_geo');
  const dp_filtre_val = getNumber('#dp_filtre');

  // ----- Totaux -----
  const H_total_asp = H_sing_asp + H_fric_asp;
  const H_total_ref = H_sing_ref + H_fric_ref;
  const H_total = H_total_asp + H_total_ref + H_geo_val + dp_filtre_val;

  // ----- Affichage -----
  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>

<b>${t.pertes_sing_asp} :</b> ${H_sing_asp.toFixed(2)} mCE <small>≈ ${mceToBar(H_sing_asp)}${t.en_bar} / ${mceToPsi(H_sing_asp)}${t.en_psi}</small><br>
<b>${t.pertes_sing_ref} :</b> ${H_sing_ref.toFixed(2)} mCE <small>≈ ${mceToBar(H_sing_ref)}${t.en_bar} / ${mceToPsi(H_sing_ref)}${t.en_psi}</small><br>
<b>${t.hauteur} :</b> ${H_geo_val.toFixed(2)} mCE <small>≈ ${mceToBar(H_geo_val)}${t.en_bar} / ${mceToPsi(H_geo_val)}${t.en_psi}</small><br>
<b>${t.filtre} :</b> ${dp_filtre_val.toFixed(2)} mCE <small>≈ ${mceToBar(dp_filtre_val)}${t.en_bar} / ${mceToPsi(dp_filtre_val)}${t.en_psi}</small><br>
<b>${t.friction} aspiration :</b> ${H_fric_asp.toFixed(2)} mCE <small>≈ ${mceToBar(H_fric_asp)}${t.en_bar} / ${mceToPsi(H_fric_asp)}${t.en_psi}</small><br>
<b>${t.friction} refoulement :</b> ${H_fric_ref.toFixed(2)} mCE <small>≈ ${mceToBar(H_fric_ref)}${t.en_bar} / ${mceToPsi(H_fric_ref)}${t.en_psi}</small><br><hr>

<b>${t.total_asp} :</b> ${H_total_asp.toFixed(2)} mCE <small>≈ ${mceToBar(H_total_asp)}${t.en_bar} / ${mceToPsi(H_total_asp)}${t.en_psi}</small><br>
<b>${t.total_ref} :</b> ${H_total_ref.toFixed(2)} mCE <small>≈ ${mceToBar(H_total_ref)}${t.en_bar} / ${mceToPsi(H_total_ref)}${t.en_psi}</small><br>
<b>${t.pertes_totales} :</b> ${H_total.toFixed(2)} mCE <small>≈ ${mceToBar(H_total)}${t.en_bar} / ${mceToPsi(H_total)}${t.en_psi}</small>
`;

  $('#res').html(html);
  $('#res_droite_contenu').html(html);
}

// ========================= EXPORT PDF =========================
$('#btn-pdf').on('click', function(){
  html2pdf().from(document.getElementById('res')).save();
});

// ========================= LANGUE =========================
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];

  $('h2.text-center').text(t.title);
  $('#res_droite h5').text(t.resultats);
  $('[data-i18n]').each(function(){
    const k = $(this).data('i18n');
    if(t[k]) $(this).text(t[k]);
  });

  calculerResultats();
}

// ========================= INIT =========================
$(document).ready(function(){
  setLanguage(currentLang);
  choixForme();
  calculerResultats();
  $('input, select').on('input change', function(){
    choixForme();
    calculerResultats();
  });
  $('#lang-select').on('change', function(){ setLanguage($(this).val()); });
});
