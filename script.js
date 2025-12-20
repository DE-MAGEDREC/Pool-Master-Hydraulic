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
    forme_carree: "Square",
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
    forme_carree: "Carrée",
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
    forme_carree: "Cuadrada",
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
    exporter: "Exportar PDF",
    logout: "Cerrar sesión",
    en_bar: " (bar)"
  }
};
let currentLang = "en";

// ====== NAVIGATION ONGLET ======
function suivant(id){
  calculerResultats();
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
}

// ====== CONVERSION MCE -> BAR ======
function mceToBar(val){ return (val*0.0981).toFixed(2); }

// ====== CALCUL HYDRAULIQUE COMPLET ======
function calculerResultats(){
  const t = translations[currentLang];

  // 🏊 Piscine
  const forme = $('input[name="forme"]:checked').val();
  let surface=0, volume=0;
  const L_val = +L.value||0;
  const l_val = +l.value||0;
  const p_val = +p.value||0;
  const t_recyclage = +t_renouv.value || 5;

  if(forme==="rectangle" || forme==="carree") surface = L_val*l_val;
  else if(forme==="ronde") surface = Math.PI*Math.pow(L_val/2,2);
  else if(forme==="ovale") surface = Math.PI*(L_val/2)*(l_val/2);
  else surface = L_val*l_val; // libre approximation
  volume = surface * p_val;

  const debit = volume / t_recyclage;

  // 🚰 Canalisations
  const DN = +D.value/1000; // m
  const materiau = materiau.value;
  let lambda = 0.02;
  if(materiau==="PVC_souple") lambda=0.035;
  else if(materiau==="Turbulence") lambda=0.316;

  const H_fric_asp = lambda * (+L_asp.value||0) / DN * Math.pow(+v_asp.value||0,2)/(2*9.81);
  const H_fric_ref = lambda * (+L_ref.value||0) / DN * Math.pow(+v_ref.value||0,2)/(2*9.81);

  // 🔧 Pertes singulières
  const H_sing_asp = 
    (+coudes90L.value||0)*20*DN +
    (+coudes90C.value||0)*30*DN +
    (+coudes45.value||0)*12.5*DN +
    (+teDroit.value||0)*40*DN +
    (+teDeriv.value||0)*80*DN +
    (+manchon.value||0)*2.5*DN +
    (+clapet.value||0)*125*DN +
    (+vanne.value||0)*8*DN;

  const H_total_asp = H_sing_asp + H_fric_asp + (+H_geo.value||0) + (+dp_filtre.value||0);
  const H_total_ref = H_fric_ref + (+H_geo.value||0) + (+dp_filtre.value||0); // pas de singulières refoulement ici

  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>
<b>${t.pertes_sing} aspiration :</b> ${H_sing_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_asp)}${t.en_bar}</small><br>
<b>${t.hauteur} :</b> ${(+H_geo.value||0).toFixed(2)} mCE<br>
<small>≈ ${mceToBar(+H_geo.value||0)}${t.en_bar}</small><br>
<b>${t.filtre} :</b> ${(+dp_filtre.value||0).toFixed(2)} mCE<br>
<small>≈ ${mceToBar(+dp_filtre.value||0)}${t.en_bar}</small><br>
<b>${t.friction} aspiration :</b> ${H_fric_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_asp)}${t.en_bar}</small><br>
<b>${t.friction} refoulement :</b> ${H_fric_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_ref)}${t.en_bar}</small><br><hr>
<b>${t.total_asp} :</b> ${H_total_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_asp)}${t.en_bar}</small><br>
<b>${t.total_ref} :</b> ${H_total_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_ref)}${t.en_bar}</small>
`;

  $('#res').html(html);
  $('#res_droite').html(html);
}

// ====== EXPORT PDF ======
$('#btn-pdf').on('click', function(){ html2pdf().from(document.getElementById('res')).save(); });

// ====== LANGUE ======
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];

  $('h2.text-center').text(t.title);
  $('#res_droite h5').text(t.resultats);

  $('input[name="forme"][value="rectangle"]').parent().contents().filter(function(){return this.nodeType==3}).first()[0].textContent = " " + t.forme_rect;
  $('input[name="forme"][value="carree"]').parent().contents().filter(function(){return this.nodeType==3}).first()[0].textContent = " " + t.forme_carree;
  $('input[name="forme"][value="ronde"]').parent().contents().filter(function(){return this.nodeType==3}).first()[0].textContent = " " + t.forme_rond;
  $('input[name="forme"][value="ovale"]').parent().contents().filter(function(){return this.nodeType==3}).first()[0].textContent = " " + t.forme_ovale;
  $('input[name="forme"][value="libre"]').parent().contents().filter(function(){return this.nodeType==3}).first()[0].textContent = " " + t.forme_libre;

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