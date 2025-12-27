// ================= TRADUCTIONS =================
const translations = {
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
    temps_renouv: "Temps recyclage (h)",
    forme_rect: "Rectangulaire",
    forme_carree: "Carré",
    forme_rond: "Ronde",
    forme_ovale: "Ovale",
    forme_libre: "Libre",
    suivant: "Suivant →",
    precedent: "← Précédent",
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
    alert_accessoire: "⚠ Accessoire",
    bar: "Bar",
    psi: "PSI",
    cavitation: "Cavitation",
    debit_optionnel: "Débit connu (optionnel)",
    vitesse_calcule: "Vitesse calculée",
    npsh_min: "NPSH min",
    npsh_reel: "NPSH réel"
  },
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
    temps_renouv: "Recycle time (h)",
    forme_rect: "Rectangular",
    forme_carree: "Square",
    forme_rond: "Round",
    forme_ovale: "Oval",
    forme_libre: "Free form",
    suivant: "Next →",
    precedent: "← Previous",
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
    alert_accessoire: "⚠ Accessory",
    bar: "Bar",
    psi: "PSI",
    cavitation: "Cavitation",
    debit_optionnel: "Known flow (optional)",
    vitesse_calcule: "Calculated velocity",
    npsh_min: "Min NPSH",
    npsh_reel: "Actual NPSH"
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
    temps_renouv: "Tiempo de reciclaje (h)",
    forme_rect: "Rectangular",
    forme_carree: "Cuadrada",
    forme_rond: "Redonda",
    forme_ovale: "Oval",
    forme_libre: "Libre",
    suivant: "Siguiente →",
    precedent: "← Anterior",
    resultats: "Resultados",
    pertes_sing_asp: "Pérdidas singulares aspiración",
    pertes_sing_ref: "Pérdidas singulares impulsión",
    filtre: "Pérdida filtro",
    hauteur: "Altura geométrica",
    friction: "Fricción tuberías",
    total_asp: "Total aspiración",
    total_ref: "Total impulsión",
    pertes_totales: "Pérdidas totales",
    exporter: "Exportar PDF",
    alert_accessoire: "⚠ Accesorio",
    bar: "Bar",
    psi: "PSI",
    cavitation: "Cavitación",
    debit_optionnel: "Caudal conocido (opcional)",
    vitesse_calcule: "Velocidad calculada",
    npsh_min: "NPSH mín",
    npsh_reel: "NPSH real"
  }
};

// ================= VARIABLES =================
let currentLang = "fr";

// ================= UTILS =================
function mceToBar(val){ return (val*0.0981).toFixed(2); }
function mceToPSI(val){ return (val*1.42233).toFixed(2); }

// ================= WIZARD =================
function suivant(id){
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
  calculerResultats();
}

function precedent(id){
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
  calculerResultats();
}

// ================= CHOIX FORME =================
function updateForme(){
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

// ================= CALCUL =================
function calculerResultats(){
  const t = translations[currentLang];
  // ---- Piscine ----
  const forme = $('input[name="forme"]:checked').val();
  let surface=0, volume=0;
  const t_renouv = +$('#t_recycl').val() || 5;

  if(forme==="rectangle"){
    const L_val=+$('#L').val()||0;
    const l_val=+$('#l').val()||0;
    const p_val=+$('#p').val()||0;
    surface = L_val*l_val; volume = surface*p_val;
  } else if(forme==="carre"){
    const c_val=+$('#cote').val()||0;
    const p_val=+$('#p_carre').val()||0;
    surface = c_val*c_val; volume = surface*p_val;
  } else if(forme==="ronde"){
    const D_val=+$('#D_piscine').val()||0;
    const p_val=+$('#p_r').val()||0;
    surface = Math.PI*Math.pow(D_val/2,2); volume = surface*p_val;
  } else if(forme==="ovale"){
    const a_val=+$('#a_ovale').val()||0;
    const b_val=+$('#b_ovale').val()||0;
    const p_val=+$('#p_o').val()||0;
    surface = Math.PI*(a_val/2)*(b_val/2); volume = surface*p_val;
  } else if(forme==="libre"){
    const L_val=+$('#L_libre').val()||0;
    const l_val=+$('#l_libre').val()||0;
    const p_val=+$('#p_libre').val()||0;
    surface = L_val*l_val; volume = surface*p_val;
  }
  const debit = volume / t_renouv;

  // ---- Canalisations ----
  const DN = +$('#D').val()/1000 || 0.05;
  const v_asp = +$('#v_asp').val() || 1;
  const v_ref = +$('#v_ref').val() || 1;
  const lambda = ($('#materiau').val()==="PVC_souple")?0.035:($('#materiau').val()==="Turbulence")?0.316:0.02;
  const L_asp=+$('#L_asp').val()||0;
  const L_ref=+$('#L_ref').val()||0;
  const H_fric_asp = lambda*L_asp/DN*Math.pow(v_asp,2)/(2*9.81);
  const H_fric_ref = lambda*L_ref/DN*Math.pow(v_ref,2)/(2*9.81);

  // ---- Pertes singulières ----
  function calcSing(c90C, c90G, te, vanne, V){
    const L_eq = ((+c90C||0)*30*DN) + ((+c90G||0)*20*DN) + ((+te||0)*40*DN) + ((+vanne||0)*8*DN);
    return lambda*L_eq/DN*Math.pow(V,2)/(2*9.81);
  }
  const H_sing_asp = calcSing($('#coudes90C_asp').val(), $('#coudes90G_asp').val(), $('#tes_asp').val(), $('#vannes_asp').val(), v_asp);
  const H_sing_ref = calcSing($('#coudes90C_ref').val(), $('#coudes90G_ref').val(), $('#tes_ref').val(), $('#vannes_ref').val(), v_ref);

  // ---- Hauteur & filtre ----
  const H_geo_val = +$('#H_geo').val()||0;
  const dp_filtre_val = +$('#dp_filtre').val()||0;

  // ---- Totaux ----
  const H_total_asp = H_sing_asp + H_fric_asp;
  const H_total_ref = H_sing_ref + H_fric_ref;
  const H_total = H_total_asp + H_total_ref + H_geo_val + dp_filtre_val;

  // ---- Affichage ----
  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>

<b>${t.alert_accessoire} ${t.pertes_sing_asp} :</b> ${H_sing_asp.toFixed(2)} mCE <small>≈ ${mceToBar(H_sing_asp)} ${t.bar} | ${mceToPSI(H_sing_asp)} ${t.psi}</small><br>
<b>${t.alert_accessoire} ${t.pertes_sing_ref} :</b> ${H_sing_ref.toFixed(2)} mCE <small>≈ ${mceToBar(H_sing_ref)} ${t.bar} | ${mceToPSI(H_sing_ref)} ${t.psi}</small><br>
<b>${t.hauteur} :</b> ${H_geo_val.toFixed(2)} mCE <small>≈ ${mceToBar(H_geo_val)} ${t.bar} | ${mceToPSI(H_geo_val)} ${t.psi}</small><br>
<b>${t.filtre} :</b> ${dp_filtre_val.toFixed(2)} mCE <small>≈ ${mceToBar(dp_filtre_val)} ${t.bar} | ${mceToPSI(dp_filtre_val)} ${t.psi}</small><br>
<b>${t.friction} aspiration :</b> ${H_fric_asp.toFixed(2)} mCE <small>≈ ${mceToBar(H_fric_asp)} ${t.bar} | ${mceToPSI(H_fric_asp)} ${t.psi}</small><br>
<b>${t.friction} refoulement :</b> ${H_fric_ref.toFixed(2)} mCE <small>≈ ${mceToBar(H_fric_ref)} ${t.bar} | ${mceToPSI(H_fric_ref)} ${t.psi}</small><br><hr>

<b>${t.total_asp} :</b> ${H_total_asp.toFixed(2)} mCE <small>≈ ${mceToBar(H_total_asp)} ${t.bar} | ${mceToPSI(H_total_asp)} ${t.psi}</small><br>
<b>${t.total_ref} :</b> ${H_total_ref.toFixed(2)} mCE <small>≈ ${mceToBar(H_total_ref)} ${t.bar} | ${mceToPSI(H_total_ref)} ${t.psi}</small><br>
<b>${t.pertes_totales} :</b> ${H_total.toFixed(2)} mCE <small>≈ ${mceToBar(H_total)} ${t.bar} | ${mceToPSI(H_total)} ${t.psi}</small>
`;

  $('#res').html(html);
  $('#res_droite').html(html);
}

// ================= EXPORT PDF =================
$('#btn-pdf').on('click', function(){
  html2pdf().from(document.getElementById('res')).save();
});

// ================= LANGUE =================
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];
  $('#app-title').text(t.title);
  $('#tab-piscine').text(t.piscine_tab);
  $('#tab-canalisations').text(t.canalisations_tab);
  $('#tab-pertes').text(t.pertes_tab);
  $('#tab-pression').text(t.pression_tab);
  $('#tab-resultats').text(t.resultats_tab);
  $('#res_droite h5').text(t.resultats);
  $('#label-rectangle').text(t.forme_rect);
  $('#label-carre').text(t.forme_carree);
  $('#label-ronde').text(t.forme_rond);
  $('#label-ovale').text(t.forme_ovale);
  $('#label-libre').text(t.forme_libre);
  $('.btn-primary').text(t.suivant);
  $('.btn-secondary').text(t.precedent);
  $('#btn-pdf').text(t.exporter);
  calculerResultats();
}

$('#lang-select').on('change', function(){ setLanguage($(this).val()); });

// ================= INITIALISATION =================
$(document).ready(function(){
  setLanguage(currentLang);
  updateForme();
  calculerResultats();
  $('input, select').on('input change', function(){ calculerResultats(); updateForme(); });
});
