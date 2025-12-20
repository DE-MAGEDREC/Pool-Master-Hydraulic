// ====== LANGUES ======
const translations = {
  en: {
    title: "Pool Master Hydraulic",
    surface: "Surface",
    volume: "Volume",
    debit: "Filtration flow rate",
    resultats: "Results",
    forme_rect: "Rectangular",
    forme_rond: "Round",
    suivant: "Next →",
    pertes_sing: "Singular losses",
    filtre: "Filter loss",
    hauteur: "Geometric height",
    friction: "Pipe friction",
    total_asp: "Total suction",
    total_ref: "Total discharge",
    exporter: "Export PDF",
    en_bar: " (bar)"
  },
  fr: {
    title: "Pool Master Hydraulic",
    surface: "Surface",
    volume: "Volume",
    debit: "Débit filtration",
    resultats: "Résultats",
    forme_rect: "Rectangulaire",
    forme_rond: "Ronde",
    suivant: "Suivant →",
    pertes_sing: "Pertes singulières",
    filtre: "Perte filtre",
    hauteur: "Hauteur géométrique",
    friction: "Friction canalisations",
    total_asp: "Total aspiration",
    total_ref: "Total refoulement",
    exporter: "Exporter PDF",
    en_bar: " (bar)"
  },
  es: {
    title: "Pool Master Hydraulic",
    surface: "Superficie",
    volume: "Volumen",
    debit: "Caudal filtración",
    resultats: "Resultados",
    forme_rect: "Rectangular",
    forme_rond: "Redonda",
    suivant: "Siguiente →",
    pertes_sing: "Pérdidas singulares",
    filtre: "Pérdida de filtro",
    hauteur: "Altura geométrica",
    friction: "Fricción tuberías",
    total_asp: "Total aspiración",
    total_ref: "Total impulsión",
    exporter: "Exportar PDF",
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

// ====== CALCUL HYDRAULIQUE COMPLET ======
function calculerResultats(){
  const t = translations[currentLang];

  // 🏊 Piscine
  const forme = $('input[name="forme"]:checked').val();
  let surface=0, volume=0;
  if(forme==="rectangle"){
    surface = (+$('#L').val()||0) * (+$('#l').val()||0);
    volume = surface * (+$('#p').val()||0);
  } else if(forme==="ronde"){
    const diam = +$('#D_piscine').val()||0;
    surface = Math.PI * Math.pow(diam/2,2);
    volume = surface * (+$('#p_r').val()||0);
  }
  const t_renouv = +$('#t_renouv').val() || 5;
  const debit = volume / t_renouv;

  // 🚰 Canalisations
  const D = +$('#D').val()/1000 || 0.05; // Diamètre en m
  const V_asp = +$('#v_asp').val()||0;
  const V_ref = +$('#v_ref').val()||0;
  const lambda = 0.02;
  const g = 9.81;

  // 🔧 Pertes singulières ASPIRATION
  const L_asp_sing = 
    (+$('#coude90_short').val()||0)*20*D +
    (+$('#coude90_long').val()||0)*30*D +
    (+$('#tes_asp').val()||0)*40*D +
    (+$('#vannes_asp').val()||0)*8*D;
  const H_sing_asp = lambda * L_asp_sing / D * V_asp*V_asp / (2*g);

  // 🔧 Pertes singulières REFOULEMENT
  const L_ref_sing = 
    (+$('#coude90_short_ref').val()||0)*20*D +
    (+$('#coude90_long_ref').val()||0)*30*D +
    (+$('#tes_ref').val()||0)*40*D +
    (+$('#vannes_ref').val()||0)*8*D;
  const H_sing_ref = lambda * L_ref_sing / D * V_ref*V_ref / (2*g);

  // 🌡️ Hauteur géométrique et filtre
  const H_geo_val = +$('#H_geo').val()||0;
  const dp_filtre_val = +$('#dp_filtre').val()||0;

  // 🛠️ Friction
  const H_fric_asp = lambda * (+$('#L_asp').val()||0) / D * V_asp*V_asp / (2*g);
  const H_fric_ref = lambda * (+$('#L_ref').val()||0) / D * V_ref*V_ref / (2*g);

  // 🔹 Totaux
  const H_total_asp = H_sing_asp + H_fric_asp;
  const H_total_ref = H_sing_ref + H_fric_ref;
  const H_total_global = H_total_asp + H_total_ref + H_geo_val + dp_filtre_val;

  // 🔹 Affichage format mètre + bar
  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>

<b>Pertes totales aspiration :</b> ${H_total_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_asp)}${t.en_bar}</small><br>
<b>Pertes totales refoulement :</b> ${H_total_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_ref)}${t.en_bar}</small><br>
<b>Hauteur géométrique :</b> ${H_geo_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_geo_val)}${t.en_bar}</small><br>
<b>Perte filtre :</b> ${dp_filtre_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(dp_filtre_val)}${t.en_bar}</small><br><hr>

<b>Pertes totales :</b> ${H_total_global.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_global)}${t.en_bar}</small>
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

  calculerResultats();
}

$('#lang-select').on('change', function(){ setLanguage($(this).val()); });

// ====== INITIALISATION ======
$(document).ready(function(){
  setLanguage(currentLang);
  calculerResultats();
  $('input, select').on('input change', calculerResultats);
});

