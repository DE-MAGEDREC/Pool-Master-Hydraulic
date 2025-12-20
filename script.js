// ====== CONSTANTES ======
const g = 9.81; // m/s²

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
    recyclage: "Recycle time (h)",
    longueur: "Length (m)",
    largeur: "Width (m)",
    profondeur: "Depth (m)",
    forme_rect: "Rectangular",
    forme_carre: "Square",
    forme_rond: "Round",
    forme_ovale: "Oval",
    forme_libre: "Free shape",
    dn: "DN (mm)",
    tuyau: "Pipe material",
    lambda: "Friction coefficient λ",
    accessoires: "Accessories",
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
    recyclage: "Temps de recyclage (h)",
    longueur: "Longueur (m)",
    largeur: "Largeur (m)",
    profondeur: "Profondeur (m)",
    forme_rect: "Rectangulaire",
    forme_carre: "Carré",
    forme_rond: "Ronde",
    forme_ovale: "Ovale",
    forme_libre: "Forme libre",
    dn: "DN (mm)",
    tuyau: "Matériau tuyau",
    lambda: "Coefficient de frottement λ",
    accessoires: "Accessoires",
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
    recyclage: "Tiempo de recirculación (h)",
    longueur: "Longitud (m)",
    largeur: "Ancho (m)",
    profondeur: "Profundidad (m)",
    forme_rect: "Rectangular",
    forme_carre: "Cuadrada",
    forme_rond: "Redonda",
    forme_ovale: "Ovalada",
    forme_libre: "Forma libre",
    dn: "DN (mm)",
    tuyau: "Material de tubería",
    lambda: "Coef. de fricción λ",
    accessoires: "Accesorios",
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

// ====== MATERIALS ======
const materials = {
  "PVC Rigide": 0.02,
  "PVC Souple": 0.035,
  "Turbulence": 0.316
};

// ====== ACCESSORIES L/Ø ======
const accessoriesData = {
  "Coude 90° long rayon": 20,
  "Coude 90° court rayon": 30,
  "Coude 45°": 12,
  "Té passage droit": 40,
  "Té dérivation": 80,
  "Manchon": 2.5,
  "Clapet anti-retour": 125,
  "Vanne": 8
};

// ====== NAVIGATION ONGLET ======
function suivant(id){
  calculerResultats(); // calcul avant de passer
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
}

// ====== CHOIX FORMES ======
function choixForme() {
  const forme = $('input[name="forme"]:checked').val();
  // Ici pas de dessin, juste la sélection
}

// ====== CONVERSION ======
function mceToBar(val){ return (val*0.0981).toFixed(2); }

// ====== CALCUL ======
function calculerResultats(){
  const t = translations[currentLang];

  // ==== Piscine ====
  let surface=0, volume=0;
  const forme = $('input[name="forme"]:checked').val();
  const L_val = +$('#L').val() || 0;
  const l_val = +$('#l').val() || 0;
  const p_val = +$('#p').val() || 0;
  const D_pisc = +$('#D_piscine').val() || 0;
  const t_renouv = +$('#t').val() || 5;

  switch(forme){
    case "rectangle": surface = L_val*l_val; volume = surface*p_val; break;
    case "carre": surface = L_val*L_val; volume = surface*p_val; break;
    case "ronde": surface = Math.PI*Math.pow(D_pisc/2,2); volume = surface*p_val; break;
    case "ovale": surface = Math.PI*(L_val/2)*(l_val/2); volume = surface*p_val; break;
    case "libre": surface = L_val*l_val; volume = surface*p_val; break;
  }

  const debit = volume / t_renouv;

  // ==== Canalisations ====
  const D_pipe = (+$('#D').val() || 0)/1000; // mm -> m
  const L_asp = +$('#L_asp').val() || 0;
  const v_asp = +$('#v_asp').val() || 0;
  const L_ref = +$('#L_ref').val() || 0;
  const v_ref = +$('#v_ref').val() || 0;
  const mat = $('#materiau').val();
  const lambda = materials[mat] || 0.02;

  const H_fric_asp = lambda*L_asp/D_pipe*v_asp*v_asp/(2*g);
  const H_fric_ref = lambda*L_ref/D_pipe*v_ref*v_ref/(2*g);

  // ==== Pertes singulières ====
  let H_sing_asp = 0, H_sing_ref = 0;
  $('#pertes_singulieres input').each(function(){
    const val = +$(this).val() || 0;
    const acc = $(this).data('accessoire');
    if($(this).data('type')==='asp') H_sing_asp += accessoriesData[acc]*D_pipe*val*lambda*v_asp*v_asp/(2*g);
    else H_sing_ref += accessoriesData[acc]*D_pipe*val*lambda*v_ref*v_ref/(2*g);
  });

  // ==== Filtre & hauteur ====
  const H_geo_val = +$('#H_geo').val() || 0;
  const dp_filtre_val = +$('#dp_filtre').val() || 0;

  const H_total_asp = H_geo_val + dp_filtre_val + H_sing_asp + H_fric_asp;
  const H_total_ref = H_geo_val + dp_filtre_val + H_sing_ref + H_fric_ref;

  // ==== Affichage ====
  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>

<b>${t.pertes_sing} aspiration :</b> ${H_sing_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_asp)}${t.en_bar}</small><br>
<b>${t.pertes_sing} refoulement :</b> ${H_sing_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_ref)}${t.en_bar}</small><br>
<b>${t.hauteur} :</b> ${H_geo_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_geo_val)}${t.en_bar}</small><br>
<b>${t.filtre} :</b> ${dp_filtre_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(dp_filtre_val)}${t.en_bar}</small><br>
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
$('#btn-pdf').on('click', function(){
  html2pdf().from(document.getElementById('res')).save();
});

// ====== LANGUE ======
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];

  $('h2.text-center').text(t.title);
  $('.nav-link[href="#piscine"]').text(t.piscine_tab);
  $('.nav-link[href="#canalisations"]').text(t.canalisations_tab);
  $('.nav-link[href="#pertes_singulieres"]').text(t.pertes_tab);
  $('.nav-link[href="#pression_temp"]').text(t.pression_tab);
  $('.nav-link[href="#resultats_pdf"]').text(t.resultats_tab);

  $('input[name="forme"][value="rectangle"]').parent().contents().filter(function(){return this.nodeType==3})[0].textContent = " "+t.forme_rect;
  $('input[name="forme"][value="carre"]').parent().contents().filter(function(){return this.nodeType==3})[0].textContent = " "+t.forme_carre;
  $('input[name="forme"][value="ronde"]').parent().contents().filter(function(){return this.nodeType==3})[0].textContent = " "+t.forme_rond;
  $('input[name="forme"][value="ovale"]').parent().contents().filter(function(){return this.nodeType==3})[0].textContent = " "+t.forme_ovale;
  $('input[name="forme"][value="libre"]').parent().contents().filter(function(){return this.nodeType==3})[0].textContent = " "+t.forme_libre;

  $('.btn-primary').text(t.suivant);
  $('#btn-pdf').text(t.exporter);

  calculerResultats();
}

$('#lang-select').on('change', function(){ setLanguage($(this).val()); });

// ====== INITIALISATION ======
$(document).ready(function(){
  setLanguage(currentLang);
  calculerResultats();
});

// ====== Événement temps réel ======
$('input, select').on('input change', calculerResultats);
