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
    forme_carre: "Square",
    forme_rond: "Round",
    forme_ovale: "Oval",
    forme_libre: "Free form",
    suivant: "Next →",
    resultats: "Results",
    pertes_sing: "Singular losses",
    filtre: "Filter loss",
    hauteur: "Geometric height",
    friction: "Pipe friction",
    total_asp: "Total suction",
    total_ref: "Total discharge",
    total_pertes: "Total system loss",
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
    forme_carre: "Carrée",
    forme_rond: "Ronde",
    forme_ovale: "Ovale",
    forme_libre: "Libre",
    suivant: "Suivant →",
    resultats: "Résultats",
    pertes_sing: "Pertes singulières",
    filtre: "Perte filtre",
    hauteur: "Hauteur géométrique",
    friction: "Friction canalisations",
    total_asp: "Total aspiration",
    total_ref: "Total refoulement",
    total_pertes: "Pertes totales",
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
    forme_carre: "Cuadrada",
    forme_rond: "Redonda",
    forme_ovale: "Oval",
    forme_libre: "Libre",
    suivant: "Siguiente →",
    resultats: "Resultados",
    pertes_sing: "Pérdidas singulares",
    filtre: "Pérdida de filtro",
    hauteur: "Altura geométrica",
    friction: "Fricción tuberías",
    total_asp: "Total aspiración",
    total_ref: "Total impulsión",
    total_pertes: "Pérdidas totales",
    exporter: "Exportar PDF",
    logout: "Cerrar sesión",
    en_bar: " (bar)"
  }
};

let currentLang = "fr";

// ====== NAVIGATION ONGLET ======
function suivant(id){
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
  else if(f==="carre") $('#carre-fields').show();
  else if(f==="ronde") $('#ronde-fields').show();
  else if(f==="ovale") $('#ovale-fields').show();
  else $('#libre-fields').show();
}

// ====== CONVERSION MCE -> BAR ======
function mceToBar(val){ return (val*0.0981).toFixed(2); }

// ====== CALCUL HYDRAULIQUE COMPLET ======
function calculerResultats(){
  const t = translations[currentLang];

  // ----- Piscine -----
  let surface=0, volume=0;
  const forme = $('input[name="forme"]:checked').val();
  if(forme==="rectangle"){
    const L_val = +$('#L').val() || 0;
    const l_val = +$('#l').val() || 0;
    const p_val = +$('#p').val() || 0;
    surface = L_val*l_val;
    volume = surface*p_val;
  } else if(forme==="carre"){
    const cote = +$('#cote').val() || 0;
    const p_val = +$('#p_carre').val() || 0;
    surface = cote*cote;
    volume = surface*p_val;
  } else if(forme==="ronde"){
    const D_val = +$('#D_piscine').val() || 0;
    const p_val = +$('#p_r').val() || 0;
    surface = Math.PI*Math.pow(D_val/2,2);
    volume = surface*p_val;
  } else if(forme==="ovale"){
    const a = +$('#a_ovale').val() || 0;
    const b = +$('#b_ovale').val() || 0;
    const p_val = +$('#p_o').val() || 0;
    surface = Math.PI*a*b/4;
    volume = surface*p_val;
  } else {
    const L_val = +$('#L_libre').val() || 0;
    const l_val = +$('#l_libre').val() || 0;
    const p_val = +$('#p_libre').val() || 0;
    surface = L_val*l_val;
    volume = surface*p_val;
  }

  const t_recycl = +$('#t_recycl').val() || 5; // temps de recyclage
  const debit = volume / t_recycl;

  // ----- Canalisations -----
  const DN = +$('#D').val()/1000 || 0.05; // en m
  const v_asp = +$('#v_asp').val() || 1;
  const v_ref = +$('#v_ref').val() || 1;
  const lambda = ($('#materiau').val()==="PVC_souple") ? 0.035 : ($('#materiau').val()==="Turbulence") ? 0.316 : 0.02;
  const L_asp = +$('#L_asp').val() || 0;
  const L_ref = +$('#L_ref').val() || 0;

  const H_fric_asp = lambda * L_asp / DN * Math.pow(v_asp,2)/(2*9.81);
  const H_fric_ref = lambda * L_ref / DN * Math.pow(v_ref,2)/(2*9.81);

  // ----- Pertes singulières -----
  function calcSing(c90C, c90G, te, vanne){
    return ((+c90C||0)*20*DN) + ((+c90G||0)*30*DN) + ((+te||0)*40*DN) + ((+vanne||0)*8*DN);
  }
  const H_sing_asp = calcSing($('#coudes90C_asp').val(), $('#coudes90G_asp').val(), $('#tes_asp').val(), $('#vannes_asp').val());
  const H_sing_ref = calcSing($('#coudes90C_ref').val(), $('#coudes90G_ref').val(), $('#tes_ref').val(), $('#vannes_ref').val());

  // ----- Totaux -----
  const H_total_asp = H_sing_asp + H_fric_asp;
  const H_total_ref = H_sing_ref + H_fric_ref;

  const H_geo_val = +$('#H_geo').val() || 0;
  const dp_filtre_val = +$('#dp_filtre').val() || 0;

  const H_total_system = H_total_asp + H_total_ref + H_geo_val + dp_filtre_val;

  // ----- Affichage -----
  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>

<b>${t.pertes_sing} aspiration :</b> ${H_sing_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_asp)}${t.en_bar}</small><br>
<b>${t.pertes_sing} refoulement :</b> ${H_sing_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_ref)}${t.en_bar}</small><br>
<b>${t.friction} aspiration :</b> ${H_fric_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_asp)}${t.en_bar}</small><br>
<b>${t.friction} refoulement :</b> ${H_fric_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_ref)}${t.en_bar}</small><br>
<b>${t.total_asp} :</b> ${H_total_asp.toFixed(2)} mCE<br>
<b>${t.total_ref} :</b> ${H_total_ref.toFixed(2)} mCE<br>
<b>${t.hauteur} :</b> ${H_geo_val.toFixed(2)} mCE<br>
<b>${t.filtre} :</b> ${dp_filtre_val.toFixed(2)} mCE<br>
<hr>
<b>${t.total_pertes} :</b> ${H_total_system.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_system)}${t.en_bar}</small>
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
  calculerResultats();
}

$('#lang-select').on('change', function(){ setLanguage($(this).val()); });

// ====== INITIALISATION ======
$(document).ready(function(){
  setLanguage(currentLang);
  choixForme();
  calculerResultats();
  $('input, select').on('input change', function(){
    choixForme();
    calculerResultats();
  });
});
