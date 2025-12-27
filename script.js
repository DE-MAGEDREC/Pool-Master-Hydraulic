// ====== TRANSLATIONS ======
const translations = {
  fr: {
    title: "Pool Master Hydraulic BE",
    piscine_tab: "Piscine",
    canalisations_tab: "Canalisations",
    pertes_tab: "Pertes singulières",
    pression_tab: "Pression & Température",
    resultats_tab: "Résultats / PDF",
    surface: "Surface",
    volume: "Volume",
    debit: "Débit filtration",
    vitesse_max: "Vitesse max admissible",
    longueur: "Longueur (m)",
    largeur: "Largeur (m)",
    profondeur: "Profondeur (m)",
    temps_renouv: "Temps de recyclage (h)",
    forme_rect: "Rectangulaire",
    forme_carree: "Carrée",
    forme_rond: "Ronde",
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
    alert: "⚠️",
    suivant: "Suivant →",
    precedent: "← Précédent",
    exporter: "Exporter PDF",
    logout: "Déconnexion",
    en_bar: " bar",
    en_psi: " psi",
    cavitation: "Vérification cavitation",
    ok: "OK",
    risque: "Risque"
  },
  en: {
    title: "Pool Master Hydraulic BE",
    piscine_tab: "Pool",
    canalisations_tab: "Pipes",
    pertes_tab: "Singular losses",
    pression_tab: "Pressure & Temperature",
    resultats_tab: "Results / PDF",
    surface: "Surface",
    volume: "Volume",
    debit: "Filtration flow rate",
    vitesse_max: "Max admissible speed",
    longueur: "Length (m)",
    largeur: "Width (m)",
    profondeur: "Depth (m)",
    temps_renouv: "Recycle time (h)",
    forme_rect: "Rectangular",
    forme_carree: "Square",
    forme_rond: "Round",
    forme_ovale: "Oval",
    forme_libre: "Free form",
    pertes_sing_asp: "Singular losses suction",
    pertes_sing_ref: "Singular losses discharge",
    filtre: "Filter loss",
    hauteur: "Geometric height",
    friction: "Pipe friction",
    total_asp: "Total suction",
    total_ref: "Total discharge",
    pertes_totales: "Total losses",
    alert: "⚠️",
    suivant: "Next →",
    precedent: "← Previous",
    exporter: "Export PDF",
    logout: "Logout",
    en_bar: " bar",
    en_psi: " psi",
    cavitation: "Cavitation check",
    ok: "OK",
    risque: "Risk"
  },
  es: {
    title: "Pool Master Hydraulic BE",
    piscine_tab: "Piscina",
    canalisations_tab: "Tuberías",
    pertes_tab: "Pérdidas singulares",
    pression_tab: "Presión & Temperatura",
    resultats_tab: "Resultados / PDF",
    surface: "Superficie",
    volume: "Volumen",
    debit: "Caudal filtración",
    vitesse_max: "Velocidad máxima admisible",
    longueur: "Longitud (m)",
    largeur: "Ancho (m)",
    profondeur: "Profundidad (m)",
    temps_renouv: "Tiempo de reciclaje (h)",
    forme_rect: "Rectangular",
    forme_carree: "Cuadrada",
    forme_rond: "Redonda",
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
    alert: "⚠️",
    suivant: "Siguiente →",
    precedent: "← Anterior",
    exporter: "Exportar PDF",
    logout: "Cerrar sesión",
    en_bar: " bar",
    en_psi: " psi",
    cavitation: "Comprobación cavitación",
    ok: "OK",
    risque: "Riesgo"
  }
};

let currentLang = "fr";

// ====== NAVIGATION WIZARD ======
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

// ====== CHOIX FORMES ======
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
function mceToPsi(val){ return (val*1.4223).toFixed(2); } // 1 mCE ≈ 1.422 psi

// ====== CALCULS HYDRAULIQUES ======
function calculerResultats(){
  const t = translations[currentLang];

  // ==== PISCINE ====
  const forme = $('input[name="forme"]:checked').val();
  let surface=0, volume=0;
  const t_renouv = +$('#t_renouv').val() || 5;

  if(forme==="rectangle"){
    const L_val = +$('#L').val()||0;
    const l_val = +$('#l').val()||0;
    const p_val = +$('#p').val()||0;
    surface = L_val*l_val; volume = surface*p_val;
  } else if(forme==="carre"){
    const c_val = +$('#cote').val()||0;
    const p_val = +$('#p_carree').val()||0;
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
    const surface_val = +$('#surface_libre').val()||0;
    const p_val = +$('#p_libre').val()||0;
    surface = surface_val; volume = surface*p_val;
  }

  const debit = volume / t_renouv;

  // ==== CANALISATIONS ====
  const DN = (+$('#D').val()||50)/1000; // en m
  const v_asp = +$('#v_asp').val() || 1;
  const v_ref = +$('#v_ref').val() || 1;
  const L_asp = +$('#L_asp').val() || 0;
  const L_ref = +$('#L_ref').val() || 0;
  const lambda = ($('#materiau').val()==="PVC_souple") ? 0.035 : ($('#materiau').val()==="Turbulence") ? 0.316 : 0.02;

  const H_fric_asp = lambda*L_asp/DN*Math.pow(v_asp,2)/(2*9.81);
  const H_fric_ref = lambda*L_ref/DN*Math.pow(v_ref,2)/(2*9.81);

  // ==== PERTES SINGULIERES ====
  function calcSing(c90C, c90G, te, vanne, clapet, V){
    const L_eq = ((+c90C||0)*30*DN)
                + ((+c90G||0)*20*DN)
                + ((+te||0)*40*DN)
                + ((+vanne||0)*8*DN)
                + ((+clapet||0)*10*DN); // Clapets
    return lambda*L_eq/DN*Math.pow(V,2)/(2*9.81);
  }

  const H_sing_asp = calcSing($('#coudes90C_asp').val(), $('#coudes90G_asp').val(), $('#tes_asp').val(), $('#vannes_asp').val(), $('#clapets_asp').val(), v_asp);
  const H_sing_ref = calcSing($('#coudes90C_ref').val(), $('#coudes90G_ref').val(), $('#tes_ref').val(), $('#vannes_ref').val(), $('#clapets_ref').val(), v_ref);

  // ==== HAUTEUR GEOMETRIQUE & FILTRE ====
  const H_geo_val = +$('#H_geo').val()||0;
  const dp_filtre_val = +$('#dp_filtre').val()||0;

  // ==== TOTAUX ====
  const H_total_asp = H_fric_asp + H_sing_asp;
  const H_total_ref = H_fric_ref + H_sing_ref;
  const H_total = H_total_asp + H_total_ref + H_geo_val + dp_filtre_val;

  // ==== VITESSE MAX et CAVITATION ====
  const v_max = Math.sqrt(2*9.81*H_total); // simplifié
  const cavitation = (H_total > 2) ? t.risque : t.ok; // seuil simplifié

  // ==== AFFICHAGE ====
  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br>
<b>${t.vitesse_max} :</b> ${v_max.toFixed(2)} m/s<br>
<b>${t.cavitation} :</b> ${cavitation}<br><hr>

<b>${t.pertes_sing_asp} :</b> ${H_sing_asp.toFixed(2)} mCE <small>${t.alert} ≈ ${mceToBar(H_sing_asp)}${t.en_bar} / ${mceToPsi(H_sing_asp)}${t.en_psi}</small><br>
<b>${t.pertes_sing_ref} :</b> ${H_sing_ref.toFixed(2)} mCE <small>${t.alert} ≈ ${mceToBar(H_sing_ref)}${t.en_bar} / ${mceToPsi(H_sing_ref)}${t.en_psi}</small><br>
<b>${t.hauteur} :</b> ${H_geo_val.toFixed(2)} mCE <small>≈ ${mceToBar(H_geo_val)}${t.en_bar} / ${mceToPsi(H_geo_val)}${t.en_psi}</small><br>
<b>${t.filtre} :</b> ${dp_filtre_val.toFixed(2)} mCE <small>≈ ${mceToBar(dp_filtre_val)}${t.en_bar} / ${mceToPsi(dp_filtre_val)}${t.en_psi}</small><br>
<b>${t.friction} aspiration :</b> ${H_fric_asp.toFixed(2)} mCE <small>≈ ${mceToBar(H_fric_asp)}${t.en_bar} / ${mceToPsi(H_fric_asp)}${t.en_psi}</small><br>
<b>${t.friction} refoulement :</b> ${H_fric_ref.toFixed(2)} mCE <small>≈ ${mceToBar(H_fric_ref)}${t.en_bar} / ${mceToPsi(H_fric_ref)}${t.en_psi}</small><br><hr>

<b>${t.total_asp} :</b> ${H_total_asp.toFixed(2)} mCE <small>≈ ${mceToBar(H_total_asp)}${t.en_bar} / ${mceToPsi(H_total_asp)}${t.en_psi}</small><br>
<b>${t.total_ref} :</b> ${H_total_ref.toFixed(2)} mCE <small>≈ ${mceToBar(H_total_ref)}${t.en_bar} / ${mceToPsi(H_total_ref)}${t.en_psi}</small><br>
<b>${t.pertes_totales} :</b> ${H_total.toFixed(2)} mCE <small>≈ ${mceToBar(H_total)}${t.en_bar} / ${mceToPsi(H_total)}${t.en_psi}</small>
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
  $('#res_droite h5').text(t.resultats_tab);

  $('input[name="forme"][value="rectangle"]').parent().contents().filter(function(){return this.nodeType==3}).first()[0].textContent = " " + t.forme_rect;
  $('input[name="forme"][value="carre"]').parent().contents().filter(function(){return this.nodeType==3}).first()[0].textContent = " " + t.forme_carree;
  $('input[name="forme"][value="ronde"]').parent().contents().filter(function(){return this.nodeType==3}).first()[0].textContent = " " + t.forme_rond;
  $('input[name="forme"][value="ovale"]').parent().contents().filter(function(){return this.nodeType==3}).first()[0].textContent = " " + t.forme_ovale;
  $('input[name="forme"][value="libre"]').parent().contents().filter(function(){return this.nodeType==3}).first()[0].textContent = " " + t.forme_libre;

  $('.btn-primary').text(t.suivant);
  $('.btn-secondary').text(t.precedent);
  $('#btn-pdf').text(t.exporter);

  calculerResultats();
}

$('#lang-select').on('change', function(){ setLanguage($(this).val()); });

// ====== INITIALISATION ======
$(document).ready(function(){
  setLanguage(currentLang);
  calculerResultats();
  $('input, select').on('input change', calculerResultats);
});
