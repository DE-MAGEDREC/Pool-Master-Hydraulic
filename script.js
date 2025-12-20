// ====== LANGUES ======
const translations = {
  en: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Pool",
    canalisations_tab: "Pipes",
    pertes_tab: "Singular losses",
    pression_tab: "Pressure & Temperature",
    resultats_tab: "Results / PDF",
    lblForme: "Pool shape",
    forme_rect: "Rectangular",
    forme_carre: "Square",
    forme_rond: "Round",
    forme_ovale: "Oval",
    forme_libre: "Free shape",
    longueur: "Length (m)",
    largeur: "Width (m)",
    profondeur: "Depth (m)",
    recyclage: "Water turnover time (h)",
    materiau: "Material",
    aspiration: "Suction",
    refoulement: "Discharge",
    vitesse: "Velocity (m/s)",
    coudes: "Elbows",
    tes: "Tees",
    vannes: "Valves",
    hauteur: "Geometric height",
    filtre: "Filter loss",
    surface: "Surface",
    volume: "Volume",
    debit: "Filtration flow rate",
    pertes_sing: "Singular losses",
    friction: "Pipe friction",
    total_asp: "Total suction",
    total_ref: "Total discharge",
    suivant: "Next →",
    exporter: "Export PDF",
    resultats: "Results",
    en_bar: " (bar)"
  },
  fr: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscine",
    canalisations_tab: "Canalisations",
    pertes_tab: "Pertes singulières",
    pression_tab: "Pression & Température",
    resultats_tab: "Résultats / PDF",
    lblForme: "Forme de la piscine",
    forme_rect: "Rectangulaire",
    forme_carre: "Carré",
    forme_rond: "Ronde",
    forme_ovale: "Ovale",
    forme_libre: "Forme libre",
    longueur: "Longueur (m)",
    largeur: "Largeur (m)",
    profondeur: "Profondeur (m)",
    recyclage: "Temps de recyclage de l’eau (h)",
    materiau: "Matériau",
    aspiration: "Aspiration",
    refoulement: "Refoulement",
    vitesse: "Vitesse (m/s)",
    coudes: "Coudes",
    tes: "Tés",
    vannes: "Vannes",
    hauteur: "Hauteur géométrique",
    filtre: "Perte filtre",
    surface: "Surface",
    volume: "Volume",
    debit: "Débit filtration",
    pertes_sing: "Pertes singulières",
    friction: "Friction canalisations",
    total_asp: "Total aspiration",
    total_ref: "Total refoulement",
    suivant: "Suivant →",
    exporter: "Exporter PDF",
    resultats: "Résultats",
    en_bar: " (bar)"
  },
  es: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscina",
    canalisations_tab: "Tuberías",
    pertes_tab: "Pérdidas singulares",
    pression_tab: "Presión & Temperatura",
    resultats_tab: "Resultados / PDF",
    lblForme: "Forma de la piscina",
    forme_rect: "Rectangular",
    forme_carre: "Cuadrada",
    forme_rond: "Redonda",
    forme_ovale: "Ovalada",
    forme_libre: "Forma libre",
    longueur: "Longitud (m)",
    largeur: "Ancho (m)",
    profondeur: "Profundidad (m)",
    recyclage: "Tiempo de recirculación del agua (h)",
    materiau: "Material",
    aspiration: "Aspiración",
    refoulement: "Impulsión",
    vitesse: "Velocidad (m/s)",
    coudes: "Codos",
    tes: "Tés",
    vannes: "Válvulas",
    hauteur: "Altura geométrica",
    filtre: "Pérdida de filtro",
    surface: "Superficie",
    volume: "Volumen",
    debit: "Caudal filtración",
    pertes_sing: "Pérdidas singulares",
    friction: "Fricción tuberías",
    total_asp: "Total aspiración",
    total_ref: "Total impulsión",
    suivant: "Siguiente →",
    exporter: "Exportar PDF",
    resultats: "Resultados",
    en_bar: " (bar)"
  }
};

let currentLang = "en";

// ====== CONVERSION MCE -> BAR ======
function mceToBar(val){ return (val*0.0981).toFixed(2); }

// ====== NAVIGATION ONGLET ======
function suivant(id){
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
}

// ====== CALCUL HYDRAULIQUE ======
function calculerResultats() {
  const t = translations[currentLang];

  // 🏊 Piscine
  let surface=0, volume=0;
  const forme = $('#forme_piscine').val();
  const Lval = +$('#L').val()||0;
  const lval = +$('#l').val()||0;
  const pval = +$('#p').val()||0;

  if(forme==="rectangle" || forme==="carre"){
    surface = Lval*lval;
    volume = surface*pval;
  } else if(forme==="ronde"){
    const D = Lval || 0; // utiliser L comme diamètre pour rond
    surface = Math.PI*Math.pow(D/2,2);
    volume = surface*pval;
  } else if(forme==="ovale" || forme==="libre"){
    surface = Lval*lval; // approximation simple
    volume = surface*pval;
  }

  // 💧 Débit filtration
  const t_renouv = +$('#t_renouv').val() || 5;
  const debit = volume / t_renouv;

  // 🚰 Pertes singulières (PdeC = Λ * L / Ø * V² / 2g)
  const g = 9.81;
  const lambda = 1; // coefficient fictif par défaut
  const H_sing_asp = lambda*(+$('#L_asp').val()||0)/(+$('#D').val()||1)*Math.pow(+$('#v_asp').val()||0,2)/(2*g) 
                    + (+$('#coudes_asp').val()||0) + (+$('#tes_asp').val()||0) + (+$('#vannes_asp').val()||0);
  const H_sing_ref = lambda*(+$('#L_ref').val()||0)/(+$('#D').val()||1)*Math.pow(+$('#v_ref').val()||0,2)/(2*g) 
                    + (+$('#coudes_ref').val()||0) + (+$('#tes_ref').val()||0) + (+$('#vannes_ref').val()||0);

  // 🌡️ Hauteur géométrique et filtre
  const H_geo_val = +$('#H_geo').val()||0;
  const dp_filtre_val = +$('#dp_filtre').val()||0;

  // 🛠️ Friction canalisations
  const H_fric_asp = (+$('#L_asp').val()||0)*0.02;
  const H_fric_ref = (+$('#L_ref').val()||0)*0.02;

  // 🔹 Totaux
  const H_total_asp = H_geo_val + dp_filtre_val + H_sing_asp + H_fric_asp;
  const H_total_ref = H_geo_val + dp_filtre_val + H_sing_ref + H_fric_ref;

  // 🔹 Affichage
  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>

<b>${t.pertes_sing} ${t.aspiration} :</b> ${H_sing_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_asp)}${t.en_bar}</small><br>
<b>${t.pertes_sing} ${t.refoulement} :</b> ${H_sing_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_ref)}${t.en_bar}</small><br>
<b>${t.hauteur} :</b> ${H_geo_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_geo_val)}${t.en_bar}</small><br>
<b>${t.filtre} :</b> ${dp_filtre_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(dp_filtre_val)}${t.en_bar}</small><br>
<b>${t.friction} ${t.aspiration} :</b> ${H_fric_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_asp)}${t.en_bar}</small><br>
<b>${t.friction} ${t.refoulement} :</b> ${H_fric_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_ref)}${t.en_bar}</small><br><hr>

<b>${t.total_asp} :</b> ${H_total_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_asp)}${t.en_bar}</small><br>
<b>${t.total_ref} :</b> ${H_total_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_ref)}${t.en_bar}</small>
`;

  $('#res').html(html);
  $('#res_droite').html(html);
}

// ====== BOUTONS SUIVANT ======
$('.btn-suivant').on('click', function(){
  calculerResultats();
  const nextTab = $(this).data('next');
  if(nextTab) suivant(nextTab);
});

// ====== EXPORT PDF ======
$('#btn-pdf').on('click', function(){
  html2pdf().from(document.getElementById('res')).save();
});

// ====== CHANGEMENT DE LANGUE ======
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];

  $('#page-title').text(t.title);
  $('#res-title').text(t.resultats);
  $('#tab-piscine').text(t.piscine_tab);
  $('#tab-canalisations').text(t.canalisations_tab);
  $('#tab-pertes').text(t.pertes_tab);
  $('#tab-pression').text(t.pression_tab);
  $('#tab-resultats').text(t.resultats_tab);

  $('#lbl-forme').text(t.lblForme);
  $('#opt-rectangle').text(t.forme_rect);
  $('#opt-carre').text(t.forme_carre);
  $('#opt-ronde').text(t.forme_rond);
  $('#opt-ovale').text(t.forme_ovale);
  $('#opt-libre').text(t.forme_libre);

  $('#lbl-longueur').text(t.longueur);
  $('#lbl-largeur').text(t.largeur);
  $('#lbl-profondeur').text(t.profondeur);
  $('#lbl-recyclage').text(t.recyclage);

  $('#lbl-diam-canal').text(t.longueur);
  $('#lbl-materiau').text(t.materiau);

  $('#lbl-asp').text(t.aspiration);
  $('#lbl-long-asp').text(t.longueur);
  $('#lbl-v-asp').text(t.vitesse);

  $('#lbl-ref').text(t.refoulement);
  $('#lbl-long-ref').text(t.longueur);
  $('#lbl-v-ref').text(t.vitesse);

  $('#lbl-asp-sing').text(t.aspiration);
  $('#lbl-coudes-asp').text(t.coudes);
  $('#lbl-tes-asp').text(t.tes);
  $('#lbl-vannes-asp').text(t.vannes);

  $('#lbl-ref-sing').text(t.refoulement);
  $('#lbl-coudes-ref').text(t.coudes);
  $('#lbl-tes-ref').text(t.tes);
  $('#lbl-vannes-ref').text(t.vannes);

  $('#lbl-hauteur').text(t.hauteur);
  $('#lbl-dp-filtre').text(t.filtre);

  $('.btn-suivant').text(t.suivant);
  $('#btn-pdf').text(t.exporter);

  calculerResultats();
}

// ====== INITIALISATION ======
$(document).ready(function(){
  setLanguage(currentLang);
  calculerResultats();
  $('#lang-select').on('change', function(){ setLanguage($(this).val()); });
});

// ====== MISE À JOUR TEMPS RÉEL ======
$('input, select').on('input change', calculerResultats);
