// ======= Traductions =======
const translations = {
  fr: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscine",
    canalisations_tab: "Canalisations",
    pertes_tab: "Pertes singulières",
    pression_tab: "Pression & Filtre",
    resultats_tab: "Résultats / PDF",
    inverse_tab: "Version inversée",
    pieces_tab: "Pièces à sceller",
    param_tab: "Paramètres",
    surface: "Surface",
    volume: "Volume",
    debit: "Débit filtration",
    longueur: "Longueur (m)",
    largeur: "Largeur (m)",
    profondeur: "Profondeur (m)",
    temps_renouv: "Temps de recyclage (h)",
    forme_rect: "Rectangulaire",
    forme_carree: "Carrée",
    forme_ronde: "Ronde",
    forme_ovale: "Ovale",
    forme_libre: "Libre",
    pertes_sing_asp: "Pertes singulières aspiration",
    pertes_sing_ref: "Pertes singulières refoulement",
    filtre: "Perte filtre",
    hauteur: "Hauteur géométrique",
    friction: "Friction canalisations",
    total_asp: "Total aspiration",
    total_ref: "Total refoulement",
    pertes_totales: "Pertes totales",
    exporter: "Exporter PDF",
    en_bar: " bar",
    en_psi: " psi",
    activer_inverse: "Activer étude inversée",
    debit_inverse: "Débit filtre (m³/h)",
    pertes_inverse: "Pertes totales (mCE)",
    vitesse_calc: "Vitesses calculées",
    npsh_calc: "NPSH calculé",
    attention: "⚠️"
  },
  en: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Pool",
    canalisations_tab: "Pipes",
    pertes_tab: "Singular losses",
    pression_tab: "Pressure & Filter",
    resultats_tab: "Results / PDF",
    inverse_tab: "Reverse version",
    pieces_tab: "Embedded parts",
    param_tab: "Settings",
    surface: "Surface",
    volume: "Volume",
    debit: "Filtration flow",
    longueur: "Length (m)",
    largeur: "Width (m)",
    profondeur: "Depth (m)",
    temps_renouv: "Recycle time (h)",
    forme_rect: "Rectangular",
    forme_carree: "Square",
    forme_ronde: "Round",
    forme_ovale: "Oval",
    forme_libre: "Free form",
    pertes_sing_asp: "Suction singular losses",
    pertes_sing_ref: "Discharge singular losses",
    filtre: "Filter loss",
    hauteur: "Geometric height",
    friction: "Pipe friction",
    total_asp: "Total suction",
    total_ref: "Total discharge",
    pertes_totales: "Total losses",
    exporter: "Export PDF",
    en_bar: " bar",
    en_psi: " psi",
    activer_inverse: "Enable reverse study",
    debit_inverse: "Filter flow (m³/h)",
    pertes_inverse: "Total losses (mCE)",
    vitesse_calc: "Calculated velocities",
    npsh_calc: "Calculated NPSH",
    attention: "⚠️"
  },
  es: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscina",
    canalisations_tab: "Tuberías",
    pertes_tab: "Pérdidas singulares",
    pression_tab: "Presión & Filtro",
    resultats_tab: "Resultados / PDF",
    inverse_tab: "Versión inversa",
    pieces_tab: "Piezas a sellar",
    param_tab: "Parámetros",
    surface: "Superficie",
    volume: "Volumen",
    debit: "Caudal filtración",
    longueur: "Longitud (m)",
    largeur: "Ancho (m)",
    profondeur: "Profundidad (m)",
    temps_renouv: "Tiempo de reciclaje (h)",
    forme_rect: "Rectangular",
    forme_carree: "Cuadrada",
    forme_ronde: "Redonda",
    forme_ovale: "Oval",
    forme_libre: "Libre",
    pertes_sing_asp: "Pérdidas singulares aspiración",
    pertes_sing_ref: "Pérdidas singulares impulsión",
    filtre: "Pérdida filtro",
    hauteur: "Altura geométrica",
    friction: "Fricción tuberías",
    total_asp: "Total aspiración",
    total_ref: "Total impulsión",
    pertes_totales: "Pérdidas totales",
    exporter: "Exportar PDF",
    en_bar: " bar",
    en_psi: " psi",
    activer_inverse: "Activar estudio inverso",
    debit_inverse: "Caudal filtro (m³/h)",
    pertes_inverse: "Pérdidas totales (mCE)",
    vitesse_calc: "Velocidades calculadas",
    npsh_calc: "NPSH calculado",
    attention: "⚠️"
  }
};

let currentLang = "fr";

// ======== Wizard ========
function nextTab(id){
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
  calculerResultats();
}

// ======== Forme piscine ========
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

// ======== Conversion mCE → Bar / PSI ========
function mceToBar(val){ return (val*0.0981).toFixed(2); }
function mceToPsi(val){ return (val*1.422); }

// ======== Calcul hydraulique ========
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
  const DN = (+$('#D').val()||50)/1000; // m
  const v_asp = +$('#v_asp').val()||1.5;
  const v_ref = +$('#v_ref').val()||2;
  const L_asp = +$('#L_asp').val()||0;
  const L_ref = +$('#L_ref').val()||0;
  const mat = $('#materiau').val();
  const lambda = (mat==="PVC_souple")?0.035:(mat==="Turbulence")?0.316:0.02;

  const H_fric_asp = lambda * L_asp / DN * Math.pow(v_asp,2)/(2*9.81);
  const H_fric_ref = lambda * L_ref / DN * Math.pow(v_ref,2)/(2*9.81);

  // Pertes singulières
  function calcSing(c90C, c90G, te, vanne, V){
    const L_eq = ((+c90C||0)*30*DN)+((+c90G||0)*20*DN)+((+te||0)*40*DN)+((+vanne||0)*8*DN);
    return lambda*L_eq/DN*Math.pow(V,2)/(2*9.81);
  }
  const H_sing_asp = calcSing($('#coudes90C_asp').val(), $('#coudes90G_asp').val(), $('#tes_asp').val(), $('#vannes_asp').val(), v_asp);
  const H_sing_ref = calcSing($('#coudes90C_ref').val(), $('#coudes90G_ref').val(), $('#tes_ref').val(), $('#vannes_ref').val(), v_ref);

  // Hauteur géométrique & filtre
  const H_geo_val = +$('#H_geo').val()||0;
  const dp_filtre_val = +$('#dp_filtre').val()||0;

  // Totaux
  const H_total_asp = H_fric_asp+H_sing_asp;
  const H_total_ref = H_fric_ref+H_sing_ref;
  const H_total = H_total_asp+H_total_ref+H_geo_val+dp_filtre_val;

  // Affichage
  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>
<b>${t.pertes_sing_asp} :</b> ${H_sing_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_asp)}${t.en_bar} / ${mceToPsi(H_sing_asp).toFixed(1)}${t.en_psi}</small><br>
<b>${t.pertes_sing_ref} :</b> ${H_sing_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_ref)}${t.en_bar} / ${mceToPsi(H_sing_ref).toFixed(1)}${t.en_psi}</small><br>
<b>${t.hauteur} :</b> ${H_geo_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_geo_val)}${t.en_bar} / ${mceToPsi(H_geo_val).toFixed(1)}${t.en_psi}</small><br>
<b>${t.filtre} :</b> ${dp_filtre_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(dp_filtre_val)}${t.en_bar} / ${mceToPsi(dp_filtre_val).toFixed(1)}${t.en_psi}</small><br>
<b>${t.friction} aspiration :</b> ${H_fric_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_asp)}${t.en_bar} / ${mceToPsi(H_fric_asp).toFixed(1)}${t.en_psi}</small><br>
<b>${t.friction} refoulement :</b> ${H_fric_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_ref)}${t.en_bar} / ${mceToPsi(H_fric_ref).toFixed(1)}${t.en_psi}</small><br><hr>
<b>${t.total_asp} :</b> ${H_total_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_asp)}${t.en_bar} / ${mceToPsi(H_total_asp).toFixed(1)}${t.en_psi}</small><br>
<b>${t.total_ref} :</b> ${H_total_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_ref)}${t.en_bar} / ${mceToPsi(H_total_ref).toFixed(1)}${t.en_psi}</small><br>
<b>${t.pertes_totales} :</b> ${H_total.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total)}${t.en_bar} / ${mceToPsi(H_total).toFixed(1)}${t.en_psi}</small>
`;

  $('#res').html(html);
  $('#res_droite_contenu').html(html);
}

// ======= Export PDF =======
$('#btn-pdf').on('click', function(){
  html2pdf().from(document.getElementById('res')).save();
});

// ======= Langue =======
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];
  $('#app-title').text(t.title);
  $('#tab-piscine').text(t.piscine_tab);
  $('#tab-canalisations').text(t.canalisations_tab);
  $('#tab-pertes').text(t.pertes_tab);
  $('#tab-pression').text(t.pression_tab);
  $('#tab-resultats').text(t.resultats_tab);
  $('#tab-inverse').text(t.inverse_tab);
  $('#tab-pieces').text(t.pieces_tab);
  $('#tab-param').text(t.param_tab);
  $('input[name="forme"][value="rectangle"]').parent().contents().filter(function(){return this.nodeType==3}).first()[0].textContent = " " + t.forme_rect;
  $('input[name="forme"][value="carre"]').parent().contents().filter(function(){return this.nodeType==3}).first()[0].textContent = " " + t.forme_carree;
  $('input[name="forme"][value="ronde"]').parent().contents().filter(function(){return this.nodeType==3}).first()[0].textContent = " " + t.forme_ronde;
  $('input[name="forme"][value="ovale"]').parent().contents().filter(function(){return this.nodeType==3}).first()[0].textContent = " " + t.forme_ovale;
  $('input[name="forme"][value="libre"]').parent().contents().filter(function(){return this.nodeType==3}).first()[0].textContent = " " + t.forme_libre;
  $('#btn-pdf').text(t.exporter);
  calculerResultats();
}
$('#lang-select').on('change', function(){ setLanguage($(this).val()); });

// ======= Version inversée =======
function toggleInverse(){
  $('#inverse-content').toggle($('#enableInverse').is(':checked'));
}

function calculInverse(){
  const t = translations[currentLang];
  const Q = +$('#Q_inverse').val() || 0; // m3/h
  const H_total = +$('#H_total_inverse').val() || 0;
  const A = Math.PI*Math.pow((+$('#D').val()||50)/2000,2); // section m²
  const V = Q/3600/A; // m/s
  const NPSH = 10-H_total; // simplifié pour l'exemple
  const html = `<b>${t.vitesse_calc} :</b> ${V.toFixed(2)} m/s<br>
                <b>${t.npsh_calc} :</b> ${NPSH.toFixed(2)} mCE`;
  $('#res-inverse').html(html);
}

// ======= Initialisation =======
$(document).ready(function(){
  setLanguage(currentLang);
  calculerResultats();
  $('input, select').on('input change', calculerResultats);
});
