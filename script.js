// ====== TRADUCTIONS ======
const translations = {
  fr: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscine",
    canalisations_tab: "Canalisations",
    pertes_tab: "Pertes singulières",
    pression_tab: "Pression & Filtre",
    pieces_tab: "Pièces à sceller",
    parametres_tab: "Paramètres",
    inversee_tab: "Étude inversée",
    resultats_tab: "Résultats / PDF",
    suivant: "Suivant →",
    precedent: "← Précédent",
    surface: "Surface",
    volume: "Volume",
    debit: "Débit filtration",
    hauteur: "Hauteur géométrique",
    filtre: "Perte filtre",
    friction: "Friction canalisation",
    pertes_sing_asp: "Pertes singulières aspiration",
    pertes_sing_ref: "Pertes singulières refoulement",
    total_asp: "Total aspiration",
    total_ref: "Total refoulement",
    pertes_totales: "Pertes totales",
    exporter: "Exporter PDF",
    logout: "Déconnexion",
    en_bar: "Bar",
    en_psi: "PSI",
    activer_inversee: "Activer étude inversée",
    alert: "⚠️"
  },
  en: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Pool",
    canalisations_tab: "Pipes",
    pertes_tab: "Singular losses",
    pression_tab: "Pressure & Filter",
    pieces_tab: "Embedded parts",
    parametres_tab: "Settings",
    inversee_tab: "Reverse study",
    resultats_tab: "Results / PDF",
    suivant: "Next →",
    precedent: "← Previous",
    surface: "Surface",
    volume: "Volume",
    debit: "Filtration flow",
    hauteur: "Geometric height",
    filtre: "Filter loss",
    friction: "Pipe friction",
    pertes_sing_asp: "Suction singular losses",
    pertes_sing_ref: "Discharge singular losses",
    total_asp: "Total suction",
    total_ref: "Total discharge",
    pertes_totales: "Total losses",
    exporter: "Export PDF",
    logout: "Logout",
    en_bar: "Bar",
    en_psi: "PSI",
    activer_inversee: "Enable reverse study",
    alert: "⚠️"
  },
  es: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscina",
    canalisations_tab: "Tuberías",
    pertes_tab: "Pérdidas singulares",
    pression_tab: "Presión & Filtro",
    pieces_tab: "Piezas a instalar",
    parametres_tab: "Parámetros",
    inversee_tab: "Estudio inverso",
    resultats_tab: "Resultados / PDF",
    suivant: "Siguiente →",
    precedent: "← Anterior",
    surface: "Superficie",
    volume: "Volumen",
    debit: "Caudal filtración",
    hauteur: "Altura geométrica",
    filtre: "Pérdida filtro",
    friction: "Fricción tuberías",
    pertes_sing_asp: "Pérdidas succión",
    pertes_sing_ref: "Pérdidas impulsión",
    total_asp: "Total aspiración",
    total_ref: "Total impulsión",
    pertes_totales: "Pérdidas totales",
    exporter: "Exportar PDF",
    logout: "Cerrar sesión",
    en_bar: "Bar",
    en_psi: "PSI",
    activer_inversee: "Activar estudio inverso",
    alert: "⚠️"
  }
};

let currentLang = "fr";

// ====== WIZARD ======
function suivant(id){
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
  calculerResultats();
}

// ====== FORMES DE PISCINE ======
function choixForme(){
  const f = $('input[name="forme"]:checked').val();
  $('.forme-fields').hide();
  switch(f){
    case "rectangle": $('#rectangle-fields').show(); break;
    case "carre": $('#carre-fields').show(); break;
    case "ronde": $('#ronde-fields').show(); break;
    case "ovale": $('#ovale-fields').show(); break;
    case "libre": $('#libre-fields').show(); break;
  }
}

// ====== CONVERSIONS ======
function mceToBar(val){ return (val*0.0981).toFixed(2); }
function mceToPsi(val){ return (val*1.422).toFixed(2); }

// ====== CALCUL DES PERTES SINGULIERES ======
function calcSing(c90C, c90G, te, vanne, V, lambda, DN){
  const L_eq = (c90C*30*DN) + (c90G*20*DN) + (te*40*DN) + (vanne*8*DN);
  return lambda * L_eq / DN * Math.pow(V,2)/(2*9.81);
}

// ====== CALCUL PRINCIPAL ======
function calculerResultats(){
  const t = translations[currentLang];

  // Piscine
  const forme = $('input[name="forme"]:checked').val();
  let surface=0, volume=0;
  const t_renouv = +$('#t_recycl').val() || 5;

  if(forme==="rectangle"){
    const L_val = +$('#L').val()||0;
    const l_val = +$('#l').val()||0;
    const p_val = +$('#p').val()||0;
    surface = L_val*l_val; volume = surface*p_val;
  } else if(forme==="carre"){
    const c_val = +$('#cote').val()||0;
    const p_val = +$('#p_carre').val()||0;
    surface = c_val*c_val; volume = surface*p_val;
  } else if(forme==="ronde"){
    const D_val = +$('#D_piscine').val()||0;
    const p_val = +$('#p_r').val()||0;
    surface = Math.PI*Math.pow(D_val/2,2); volume = surface*p_val;
  } else if(forme==="ovale"){
    const a_val = +$('#a_ovale').val()||0;
    const b_val = +$('#b_ovale').val()||0;
    const p_val = +$('#p_o').val()||0;
    surface = Math.PI*(a_val/2)*(b_val/2); volume = surface*p_val;
  } else if(forme==="libre"){
    const L_val = +$('#L_libre').val()||0;
    const l_val = +$('#l_libre').val()||0;
    const p_val = +$('#p_libre').val()||0;
    surface = L_val*l_val; volume = surface*p_val;
  }
  const debit = volume / t_renouv;

  // Canalisations
  const DN = +$('#D').val()/1000 || 0.05;
  const v_asp = +$('#v_asp').val() || 1.5;
  const v_ref = +$('#v_ref').val() || 2;
  const lambda = ($('#materiau').val()==="PVC_souple") ? 0.035 : ($('#materiau').val()==="Turbulent") ? 0.316 : ($('#materiau').val()==="PE") ? 0.025 : 0.02;
  const L_asp = +$('#L_asp').val() || 0;
  const L_ref = +$('#L_ref').val() || 0;
  const H_fric_asp = lambda * L_asp / DN * Math.pow(v_asp,2)/(2*9.81);
  const H_fric_ref = lambda * L_ref / DN * Math.pow(v_ref,2)/(2*9.81);

  // Pertes singulières
  const H_sing_asp = calcSing(+$('#coudes90C_asp').val(), +$('#coudes90G_asp').val(), +$('#tes_asp').val(), +$('#vannes_asp').val(), v_asp, lambda, DN);
  const H_sing_ref = calcSing(+$('#coudes90C_ref').val(), +$('#coudes90G_ref').val(), +$('#tes_ref').val(), +$('#vannes_ref').val(), v_ref, lambda, DN);

  // Hauteur géométrique & filtre
  const H_geo_val = +$('#H_geo').val()||0;
  const dp_filtre_val = +$('#dp_filtre').val()||0;

  // Totaux
  const H_total_asp = H_sing_asp + H_fric_asp;
  const H_total_ref = H_sing_ref + H_fric_ref;
  const H_total = H_total_asp + H_total_ref + H_geo_val + dp_filtre_val;

  // Affichage
  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>
<b>${t.pertes_sing_asp} :</b> ${H_sing_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_asp)} ${t.en_bar} | ${mceToPsi(H_sing_asp)} ${t.en_psi}</small><br>
<b>${t.pertes_sing_ref} :</b> ${H_sing_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_ref)} ${t.en_bar} | ${mceToPsi(H_sing_ref)} ${t.en_psi}</small><br>
<b>${t.hauteur} :</b> ${H_geo_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_geo_val)} ${t.en_bar} | ${mceToPsi(H_geo_val)} ${t.en_psi}</small><br>
<b>${t.filtre} :</b> ${dp_filtre_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(dp_filtre_val)} ${t.en_bar} | ${mceToPsi(dp_filtre_val)} ${t.en_psi}</small><br>
<b>${t.friction} aspiration :</b> ${H_fric_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_asp)} ${t.en_bar} | ${mceToPsi(H_fric_asp)} ${t.en_psi}</small><br>
<b>${t.friction} refoulement :</b> ${H_fric_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_ref)} ${t.en_bar} | ${mceToPsi(H_fric_ref)} ${t.en_psi}</small><br><hr>
<b>${t.total_asp} :</b> ${H_total_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_asp)} ${t.en_bar} | ${mceToPsi(H_total_asp)} ${t.en_psi}</small><br>
<b>${t.total_ref} :</b> ${H_total_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_ref)} ${t.en_bar} | ${mceToPsi(H_total_ref)} ${t.en_psi}</small><br>
<b>${t.pertes_totales} :</b> ${H_total.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total)} ${t.en_bar} | ${mceToPsi(H_total)} ${t.en_psi}</small>
`;

  $('#res').html(html);
  $('#res_droite').html(html);
}

// ====== PDF ======
$('#btn-pdf').on('click', function(){
  html2pdf().from(document.getElementById('res')).save();
});

// ====== LANGUE ======
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];

  $('h2.text-center').text(t.title);
  $('#res_droite h5').text(t.resultats_tab);

  $('.btn-primary').text(t.suivant);
  $('#btn-pdf').text(t.exporter);

  calculerResultats();
}

$('#lang-select').on('change', function(){ setLanguage($(this).val()); });

// ====== INITIALISATION ======
$(document).ready(function(){
  setLanguage(currentLang);
  calculerResultats();
  $('input, select').on('input change', calculerResultats);
  $('#activer_inversee').on('change', function(){
    $('#inversee_content').toggle(this.checked);
  });
});
