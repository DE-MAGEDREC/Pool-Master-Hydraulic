// ====== TRADUCTIONS ======
const translations = {
  fr: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscine",
    canalisations_tab: "Canalisations",
    pertes_tab: "Pertes singulières",
    pression_tab: "Pression & Température",
    resultats_tab: "Résultats / PDF",
    forme_title: "Forme de la piscine",
    forme_rect: "Rectangulaire",
    forme_carree: "Carrée",
    forme_ronde: "Ronde",
    forme_ovale: "Ovale",
    forme_libre: "Libre",
    longueur: "Longueur (m)",
    largeur: "Largeur (m)",
    cote: "Côté (m)",
    diametre: "Diamètre (m)",
    grand_axe: "Grand axe (m)",
    petit_axe: "Petit axe (m)",
    profondeur: "Profondeur (m)",
    temps_recycl: "Temps recyclage (h)",
    materiau: "Matériau",
    aspiration: "Aspiration",
    refoulement: "Refoulement",
    coudes90C: "Coudes 90° courts",
    coudes90G: "Coudes 90° grands",
    tes: "Tés",
    vannes: "Vannes",
    H_geo: "Hauteur géométrique (m)",
    dp_filtre: "Perte filtre (mCE)",
    surface: "Surface",
    volume: "Volume",
    debit: "Débit filtration",
    pertes_sing_asp: "Pertes singulières aspiration",
    pertes_sing_ref: "Pertes singulières refoulement",
    friction_asp: "Friction aspiration",
    friction_ref: "Friction refoulement",
    total_asp: "Total aspiration",
    total_ref: "Total refoulement",
    pertes_totales: "Pertes totales",
    exporter: "Exporter PDF",
    suivant: "Suivant →",
    precedent: "← Précédent",
    en_bar: "Bar",
    en_psi: "PSI",
    en_mce: "mCE"
  },
  en: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Pool",
    canalisations_tab: "Pipes",
    pertes_tab: "Singular losses",
    pression_tab: "Pressure & Temperature",
    resultats_tab: "Results / PDF",
    forme_title: "Pool shape",
    forme_rect: "Rectangular",
    forme_carree: "Square",
    forme_ronde: "Round",
    forme_ovale: "Oval",
    forme_libre: "Free form",
    longueur: "Length (m)",
    largeur: "Width (m)",
    cote: "Side (m)",
    diametre: "Diameter (m)",
    grand_axe: "Major axis (m)",
    petit_axe: "Minor axis (m)",
    profondeur: "Depth (m)",
    temps_recycl: "Recycle time (h)",
    materiau: "Material",
    aspiration: "Suction",
    refoulement: "Discharge",
    coudes90C: "Short radius elbows",
    coudes90G: "Long radius elbows",
    tes: "Tees",
    vannes: "Valves",
    H_geo: "Geometric height (m)",
    dp_filtre: "Filter loss (mCE)",
    surface: "Surface",
    volume: "Volume",
    debit: "Filtration flow",
    pertes_sing_asp: "Suction singular losses",
    pertes_sing_ref: "Discharge singular losses",
    friction_asp: "Suction friction",
    friction_ref: "Discharge friction",
    total_asp: "Total suction",
    total_ref: "Total discharge",
    pertes_totales: "Total losses",
    exporter: "Export PDF",
    suivant: "Next →",
    precedent: "← Previous",
    en_bar: "Bar",
    en_psi: "PSI",
    en_mce: "mCE"
  },
  es: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscina",
    canalisations_tab: "Tuberías",
    pertes_tab: "Pérdidas singulares",
    pression_tab: "Presión & Temperatura",
    resultats_tab: "Resultados / PDF",
    forme_title: "Forma de la piscina",
    forme_rect: "Rectangular",
    forme_carree: "Cuadrada",
    forme_ronde: "Redonda",
    forme_ovale: "Ovalada",
    forme_libre: "Libre",
    longueur: "Longitud (m)",
    largeur: "Ancho (m)",
    cote: "Lado (m)",
    diametre: "Diámetro (m)",
    grand_axe: "Eje mayor (m)",
    petit_axe: "Eje menor (m)",
    profondeur: "Profundidad (m)",
    temps_recycl: "Tiempo reciclaje (h)",
    materiau: "Material",
    aspiration: "Aspiración",
    refoulement: "Impulsión",
    coudes90C: "Codos 90° cortos",
    coudes90G: "Codos 90° largos",
    tes: "Tés",
    vannes: "Válvulas",
    H_geo: "Altura geométrica (m)",
    dp_filtre: "Pérdida filtro (mCE)",
    surface: "Superficie",
    volume: "Volumen",
    debit: "Caudal filtración",
    pertes_sing_asp: "Pérdidas aspiración",
    pertes_sing_ref: "Pérdidas impulsión",
    friction_asp: "Fricción aspiración",
    friction_ref: "Fricción impulsión",
    total_asp: "Total aspiración",
    total_ref: "Total impulsión",
    pertes_totales: "Pérdidas totales",
    exporter: "Exportar PDF",
    suivant: "Siguiente →",
    precedent: "← Anterior",
    en_bar: "Bar",
    en_psi: "PSI",
    en_mce: "mCE"
  }
};

let currentLang = "fr";

// ====== FONCTIONS UTILES ======
function getNumber(id){ return parseFloat($(id).val().replace(',', '.')) || 0; }
function mceToBar(val){ return (val*0.0980665).toFixed(2); }
function mceToPsi(val){ return (val*1.42233).toFixed(2); }

// ====== WIZARD ======
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

// ====== FORMES ======
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

// ====== CALCULS ======
function calculerResultats(){
  const t = translations[currentLang];

  // Piscine
  const forme = $('input[name="forme"]:checked').val();
  let surface=0, volume=0;
  const t_renouv = getNumber('#t_recycl') || 5;

  if(forme==="rectangle"){ const L=getNumber('#L'), l=getNumber('#l'), p=getNumber('#p'); surface=L*l; volume=surface*p;}
  if(forme==="carre"){ const c=getNumber('#cote'), p=getNumber('#p_carre'); surface=c*c; volume=surface*p;}
  if(forme==="ronde"){ const D=getNumber('#D_piscine'), p=getNumber('#p_r'); surface=Math.PI*(D/2)**2; volume=surface*p;}
  if(forme==="ovale"){ const a=getNumber('#a_ovale'), b=getNumber('#b_ovale'), p=getNumber('#p_o'); surface=Math.PI*a*b/4; volume=surface*p;}
  if(forme==="libre"){ const L=getNumber('#L_libre'), l=getNumber('#l_libre'), p=getNumber('#p_libre'); surface=L*l; volume=surface*p;}

  const debit = volume/t_renouv;

  // Canalisations
  const DN = getNumber('#D')/1000 || 0.05;
  const v_asp = getNumber('#v_asp') || 1;
  const v_ref = getNumber('#v_ref') || 1;
  const lambda = $('#materiau').val()==="PVC_souple"?0.035:$('#materiau').val()==="Turbulence"?0.316:0.02;
  const L_asp = getNumber('#L_asp'), L_ref = getNumber('#L_ref');

  const H_fric_asp = lambda*L_asp/DN*Math.pow(v_asp,2)/(2*9.81);
  const H_fric_ref = lambda*L_ref/DN*Math.pow(v_ref,2)/(2*9.81);

  // Pertes singulières
  function calcSing(c90C,c90G,te,vanne,V){
    const L_eq = c90C*30*DN + c90G*20*DN + te*40*DN + vanne*8*DN;
    return lambda*L_eq/DN*Math.pow(V,2)/(2*9.81);
  }
  const H_sing_asp = calcSing(getNumber('#coudes90C_asp'), getNumber('#coudes90G_asp'), getNumber('#tes_asp'), getNumber('#vannes_asp'), v_asp);
  const H_sing_ref = calcSing(getNumber('#coudes90C_ref'), getNumber('#coudes90G_ref'), getNumber('#tes_ref'), getNumber('#vannes_ref'), v_ref);

  const H_geo_val = getNumber('#H_geo'), dp_filtre_val=getNumber('#dp_filtre');

  const H_total_asp = H_fric_asp + H_sing_asp;
  const H_total_ref = H_fric_ref + H_sing_ref;
  const H_total = H_total_asp + H_total_ref + H_geo_val + dp_filtre_val;

  // Affichage
  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>

<b>${t.pertes_sing_asp} :</b> ${H_sing_asp.toFixed(2)} mCE
 (<small>${mceToBar(H_sing_asp)} ${t.en_bar} / ${mceToPsi(H_sing_asp)} ${t.en_psi}</small>)<br>
<b>${t.pertes_sing_ref} :</b> ${H_sing_ref.toFixed(2)} mCE
 (<small>${mceToBar(H_sing_ref)} ${t.en_bar} / ${mceToPsi(H_sing_ref)} ${t.en_psi}</small>)<br>
<b>${t.H_geo} :</b> ${H_geo_val.toFixed(2)} mCE
 (<small>${mceToBar(H_geo_val)} ${t.en_bar} / ${mceToPsi(H_geo_val)} ${t.en_psi}</small>)<br>
<b>${t.dp_filtre} :</b> ${dp_filtre_val.toFixed(2)} mCE
 (<small>${mceToBar(dp_filtre_val)} ${t.en_bar} / ${mceToPsi(dp_filtre_val)} ${t.en_psi}</small>)<br>
<b>${t.friction_asp} :</b> ${H_fric_asp.toFixed(2)} mCE
 (<small>${mceToBar(H_fric_asp)} ${t.en_bar} / ${mceToPsi(H_fric_asp)} ${t.en_psi}</small>)<br>
<b>${t.friction_ref} :</b> ${H_fric_ref.toFixed(2)} mCE
 (<small>${mceToBar(H_fric_ref)} ${t.en_bar} / ${mceToPsi(H_fric_ref)} ${t.en_psi}</small>)<br><hr>

<b>${t.total_asp} :</b> ${H_total_asp.toFixed(2)} mCE
 (<small>${mceToBar(H_total_asp)} ${t.en_bar} / ${mceToPsi(H_total_asp)} ${t.en_psi}</small>)<br>
<b>${t.total_ref} :</b> ${H_total_ref.toFixed(2)} mCE
 (<small>${mceToBar(H_total_ref)} ${t.en_bar} / ${mceToPsi(H_total_ref)} ${t.en_psi}</small>)<br>
<b>${t.pertes_totales} :</b> ${H_total.toFixed(2)} mCE
 (<small>${mceToBar(H_total)} ${t.en_bar} / ${mceToPsi(H_total)} ${t.en_psi}</small>)
`;
  $('#res').html(html);
  $('#res_droite').html(`<h5>${t.resultats_tab}</h5>`+html);
}

// ====== EXPORT PDF ======
$('#btn-pdf').on('click',()=> html2pdf().from(document.getElementById('res')).save());

// ====== LANGUE ======
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];

  $('#title').text(t.title);
  $('#tab-piscine').text(t.piscine_tab);
  $('#tab-canalisations').text(t.canalisations_tab);
  $('#tab-pertes').text(t.pertes_tab);
  $('#tab-pression').text(t.pression_tab);
  $('#tab-resultats').text(t.resultats_tab);

  $('#forme-title').text(t.forme_title);
  $('#label-rect').text(t.forme_rect);
  $('#label-carre').text(t.forme_carree);
  $('#label-ronde').text(t.forme_ronde);
  $('#label-ovale').text(t.forme_ovale);
  $('#label-libre').text(t.forme_libre);

  $('#lang-label').text(lang==="fr"?"Langue :":"Language / Idioma :");
  $('.btn-primary').text(t.suivant);
  $('.btn-secondary').text(t.precedent);
  $('#btn-pdf').text(t.exporter);

  calculerResultats();
}

$('#lang-select').on('change', function(){ setLanguage($(this).val()); });

// ====== INITIALISATION ======
$(document).ready(function(){
  setLanguage(currentLang);
  choixForme();
  calculerResultats();
  $('input, select').on('input change', ()=>{ calculerResultats(); choixForme(); });
});
