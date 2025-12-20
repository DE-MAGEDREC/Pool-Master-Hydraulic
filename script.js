// ====== LANGUES ======
const translations = {
  en: {
    title: "Pool Master Hydraulic",
    surface: "Surface",
    volume: "Volume",
    debit: "Filtration flow rate",
    pertes_sing: "Singular losses",
    pertes_total_asp: "Total suction losses",
    pertes_total_ref: "Total discharge losses",
    pertes_total: "Total losses",
    friction: "Pipe friction",
    hauteur: "Geometric height",
    filtre: "Filter loss",
    total_install: "Total installation",
    forme_rect: "Rectangular",
    forme_rond: "Round",
    suivant: "Next →",
    exporter: "Export PDF",
    resultats: "Results",
    en_bar: " (bar)"
  },
  fr: {
    title: "Pool Master Hydraulic",
    surface: "Surface",
    volume: "Volume",
    debit: "Débit filtration",
    pertes_sing: "Pertes singulières",
    pertes_total_asp: "Pertes totales aspiration",
    pertes_total_ref: "Pertes totales refoulement",
    pertes_total: "Pertes totales",
    friction: "Friction canalisations",
    hauteur: "Hauteur géométrique",
    filtre: "Perte filtre",
    total_install: "Pertes totales installation",
    forme_rect: "Rectangulaire",
    forme_rond: "Ronde",
    suivant: "Suivant →",
    exporter: "Exporter PDF",
    resultats: "Résultats",
    en_bar: " (bar)"
  },
  es: {
    title: "Pool Master Hydraulic",
    surface: "Superficie",
    volume: "Volumen",
    debit: "Caudal filtración",
    pertes_sing: "Pérdidas singulares",
    pertes_total_asp: "Pérdidas totales aspiración",
    pertes_total_ref: "Pérdidas totales impulsión",
    pertes_total: "Pérdidas totales",
    friction: "Fricción tuberías",
    hauteur: "Altura geométrica",
    filtre: "Pérdida de filtro",
    total_install: "Pérdidas totales instalación",
    forme_rect: "Rectangular",
    forme_rond: "Redonda",
    suivant: "Siguiente →",
    exporter: "Exportar PDF",
    resultats: "Resultados",
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
  else $('#ronde-fields').show();
  $('#forme-img').attr('src','img/'+f+'.png');
}

// ====== CONVERSION MCE -> BAR ======
function mceToBar(val){ return (val*0.0981).toFixed(2); }

// ====== CALCUL HYDRAULIQUE COMPLET ======
function calculerResultats(){
  const t = translations[currentLang];

  // 🏊 Piscine
  let surface=0, volume=0;
  const forme = $('input[name="forme"]:checked').val();
  if (forme==="rectangle"){
    surface = (+L.value||0)*(+l.value||0);
    volume = surface*(+p.value||0);
  } else {
    surface = Math.PI*Math.pow((+D_piscine.value||0)/2,2);
    volume = surface*(+p_r.value||0);
  }

  let t_renouv = +t_renouv.value || 6; // heure(s) de renouvellement
  let debit = volume / t_renouv;

  // 💧 Diamètre tuyau
  const DN = (+D.value||0)/1000; // convertir mm -> m

  // 🚰 Pertes singulières (conversion en longueur équivalente)
  const lambda = 0.02;

  // Aspiration
  const L_sing_asp = 
        (+coude90_short.value||0)*20*DN +
        (+coude90_long.value||0)*30*DN +
        (+coude45.value||0)*12.5*DN +
        (+te_droit.value||0)*40*DN +
        (+te_derivation.value||0)*80*DN +
        (+manchon.value||0)*2.5*DN +
        (+clapet.value||0)*125*DN +
        (+vanne.value||0)*8*DN;

  // Refoulement
  const L_sing_ref = 
        (+coude90_short_ref.value||0)*20*DN +
        (+coude90_long_ref.value||0)*30*DN +
        (+coude45_ref.value||0)*12.5*DN +
        (+te_droit_ref.value||0)*40*DN +
        (+te_derivation_ref.value||0)*80*DN +
        (+manchon_ref.value||0)*2.5*DN +
        (+clapet_ref.value||0)*125*DN +
        (+vanne_ref.value||0)*8*DN;

  // Friction aspiration et refoulement
  const H_fric_asp = lambda * (+L_asp.value||0 + L_sing_asp) * Math.pow(+v_asp.value||0,2) / (2*9.81);
  const H_fric_ref = lambda * (+L_ref.value||0 + L_sing_ref) * Math.pow(+v_ref.value||0,2) / (2*9.81);

  // Totaux
  const H_total_asp = H_fric_asp; // Inclut L_sing_asp déjà converti
  const H_total_ref = H_fric_ref; // Inclut L_sing_ref déjà converti

  const H_geo_val = +H_geo.value||0;
  const dp_filtre_val = +dp_filtre.value||0;

  const H_install_total = H_total_asp + H_total_ref + H_geo_val + dp_filtre_val;

  // 🔹 Affichage
  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>

<b>${t.pertes_sing} aspiration :</b> ${L_sing_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(L_sing_asp)}${t.en_bar}</small><br>
<b>${t.pertes_sing} refoulement :</b> ${L_sing_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(L_sing_ref)}${t.en_bar}</small><br>
<b>${t.friction} aspiration :</b> ${H_fric_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_asp)}${t.en_bar}</small><br>
<b>${t.friction} refoulement :</b> ${H_fric_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_ref)}${t.en_bar}</small><br><hr>

<b>${t.pertes_total_asp} :</b> ${(L_sing_asp + H_fric_asp).toFixed(2)} mCE<br>
<b>${t.pertes_total_ref} :</b> ${(L_sing_ref + H_fric_ref).toFixed(2)} mCE<br>
<b>${t.pertes_total} :</b> ${H_install_total.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_install_total)}${t.en_bar}</small>
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


