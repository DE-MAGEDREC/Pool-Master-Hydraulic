/*************************************************
 *               LANGUES
 *************************************************/
const translations = {
  fr: {
    title: "Pool Master Hydraulic",
    langue: "Langue :",
    logout: "Déconnexion",

    piscine_tab: "Piscine",
    canalisations_tab: "Canalisations",
    pertes_tab: "Pertes singulières",
    pression_tab: "Pression & Température",
    resultats_tab: "Résultats / PDF",

    forme_piscine: "Forme de la piscine",
    forme_rect: "Rectangulaire",
    forme_carree: "Carrée",
    forme_rond: "Ronde",
    forme_ovale: "Ovale",
    forme_libre: "Libre",

    longueur: "Longueur (m)",
    largeur: "Largeur (m)",
    profondeur: "Profondeur (m)",
    cote: "Côté (m)",
    diametre_piscine: "Diamètre (m)",
    grand_axe: "Grand axe (m)",
    petit_axe: "Petit axe (m)",
    longueur_approx: "Longueur approximative (m)",
    largeur_approx: "Largeur approximative (m)",

    temps_renouv: "Temps de recyclage (h)",

    diametre: "Diamètre canalisation (mm)",
    materiau: "Matériau",
    pvc_rigide: "PVC rigide",
    pvc_souple: "PVC souple",
    turbulent: "Turbulent",

    aspiration: "Aspiration",
    refoulement: "Refoulement",

    longueur_asp: "Longueur aspiration (m)",
    vitesse_asp: "Vitesse aspiration (m/s)",
    longueur_ref: "Longueur refoulement (m)",
    vitesse_ref: "Vitesse refoulement (m/s)",

    coude_90_court: "Coude 90° court rayon",
    coude_90_grand: "Coude 90° grand rayon",
    tes: "Tés",
    vannes: "Vannes",

    hauteur: "Hauteur géométrique (m)",
    filtre: "Perte de charge filtre (mCE)",

    suivant: "Suivant →",
    exporter: "Exporter PDF",
    resultats: "Résultats",
    attente: "En attente de données…",

    surface: "Surface",
    volume: "Volume",
    debit: "Débit filtration",
    pertes_sing_asp: "Pertes singulières aspiration",
    pertes_sing_ref: "Pertes singulières refoulement",
    friction: "Friction canalisations",
    total_asp: "Total aspiration",
    total_ref: "Total refoulement",
    pertes_totales: "Pertes totales",
    en_bar: " (bar)"
  },

  en: {
    title: "Pool Master Hydraulic",
    langue: "Language:",
    logout: "Logout",

    piscine_tab: "Pool",
    canalisations_tab: "Pipes",
    pertes_tab: "Singular losses",
    pression_tab: "Pressure & Temperature",
    resultats_tab: "Results / PDF",

    forme_piscine: "Pool shape",
    forme_rect: "Rectangular",
    forme_carree: "Square",
    forme_rond: "Round",
    forme_ovale: "Oval",
    forme_libre: "Free form",

    longueur: "Length (m)",
    largeur: "Width (m)",
    profondeur: "Depth (m)",
    cote: "Side (m)",
    diametre_piscine: "Diameter (m)",
    grand_axe: "Major axis (m)",
    petit_axe: "Minor axis (m)",
    longueur_approx: "Approx. length (m)",
    largeur_approx: "Approx. width (m)",

    temps_renouv: "Recycle time (h)",

    diametre: "Pipe diameter (mm)",
    materiau: "Material",
    pvc_rigide: "Rigid PVC",
    pvc_souple: "Flexible PVC",
    turbulent: "Turbulent",

    aspiration: "Suction",
    refoulement: "Discharge",

    longueur_asp: "Suction length (m)",
    vitesse_asp: "Suction velocity (m/s)",
    longueur_ref: "Discharge length (m)",
    vitesse_ref: "Discharge velocity (m/s)",

    coude_90_court: "90° short radius elbow",
    coude_90_grand: "90° long radius elbow",
    tes: "Tees",
    vannes: "Valves",

    hauteur: "Geometric height (m)",
    filtre: "Filter loss (mCE)",

    suivant: "Next →",
    exporter: "Export PDF",
    resultats: "Results",
    attente: "Waiting for data…",

    surface: "Surface",
    volume: "Volume",
    debit: "Filtration flow",
    pertes_sing_asp: "Singular losses suction",
    pertes_sing_ref: "Singular losses discharge",
    friction: "Pipe friction",
    total_asp: "Total suction",
    total_ref: "Total discharge",
    pertes_totales: "Total losses",
    en_bar: " (bar)"
  },

  es: {
    title: "Pool Master Hydraulic",
    langue: "Idioma:",
    logout: "Cerrar sesión",

    piscine_tab: "Piscina",
    canalisations_tab: "Tuberías",
    pertes_tab: "Pérdidas singulares",
    pression_tab: "Presión y Temperatura",
    resultats_tab: "Resultados / PDF",

    forme_piscine: "Forma de la piscina",
    forme_rect: "Rectangular",
    forme_carree: "Cuadrada",
    forme_rond: "Redonda",
    forme_ovale: "Oval",
    forme_libre: "Libre",

    longueur: "Longitud (m)",
    largeur: "Ancho (m)",
    profondeur: "Profundidad (m)",
    cote: "Lado (m)",
    diametre_piscine: "Diámetro (m)",
    grand_axe: "Eje mayor (m)",
    petit_axe: "Eje menor (m)",
    longueur_approx: "Longitud aproximada (m)",
    largeur_approx: "Anchura aproximada (m)",

    temps_renouv: "Tiempo de reciclaje (h)",

    diametre: "Diámetro de tubería (mm)",
    materiau: "Material",
    pvc_rigide: "PVC rígido",
    pvc_souple: "PVC flexible",
    turbulent: "Turbulento",

    aspiration: "Aspiración",
    refoulement: "Impulsión",

    longueur_asp: "Longitud aspiración (m)",
    vitesse_asp: "Velocidad aspiración (m/s)",
    longueur_ref: "Longitud impulsión (m)",
    vitesse_ref: "Velocidad impulsión (m/s)",

    coude_90_court: "Codo 90° radio corto",
    coude_90_grand: "Codo 90° radio largo",
    tes: "Tes",
    vannes: "Válvulas",

    hauteur: "Altura geométrica (m)",
    filtre: "Pérdida del filtro (mCE)",

    suivant: "Siguiente →",
    exporter: "Exportar PDF",
    resultats: "Resultados",
    attente: "Esperando datos…",

    surface: "Superficie",
    volume: "Volumen",
    debit: "Caudal de filtración",
    pertes_sing_asp: "Pérdidas singulares aspiración",
    pertes_sing_ref: "Pérdidas singulares impulsión",
    friction: "Fricción de tuberías",
    total_asp: "Total aspiración",
    total_ref: "Total impulsión",
    pertes_totales: "Pérdidas totales",
    en_bar: " (bar)"
  }
};

let currentLang = "fr";

/*************************************************
 *           FONCTIONS PRINCIPALES
 *************************************************/

// Appliquer la langue à tous les éléments data-i18n
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];

  $('[data-i18n]').each(function(){
    const key = $(this).attr('data-i18n');
    if(t[key]) $(this).text(t[key]);
  });

  calculerResultats();
}

// Navigation onglets
function suivant(id){
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
  calculerResultats();
}

// Choix forme piscine
function choixForme(){
  const f = $('input[name="forme"]:checked').val();
  $('.forme-fields').hide();
  switch(f){
    case "rectangle": $('#rectangle-fields').show(); break;
    case "carree": $('#carree-fields').show(); break;
    case "ronde": $('#ronde-fields').show(); break;
    case "ovale": $('#ovale-fields').show(); break;
    case "libre": $('#libre-fields').show(); break;
  }
}

// Conversion mCE -> bar
function mceToBar(val){ return (val*0.0981).toFixed(2); }

// Calcul hydraulique
function calculerResultats(){
  const t = translations[currentLang];

  // Exemple simplifié : Piscine
  const L_val = +$('#L').val()||0;
  const l_val = +$('#l').val()||0;
  const p_val = +$('#p').val()||0;
  const surface = L_val*l_val;
  const volume = surface*p_val;
  const t_renouv = +$('#t_recycl').val()||5;
  const debit = volume / t_renouv;

  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br>
`;

  $('#res').html(html);
  $('#res_droite').html(html);
}

// Export PDF
$('#btn-pdf').on('click', function(){
  html2pdf().from(document.getElementById('res')).save();
});

// Initialisation
$(document).ready(function(){
  setLanguage(currentLang);
  calculerResultats();
  $('#lang-select').on('change', function(){ setLanguage($(this).val()); });
  $('input, select').on('input change', calculerResultats);
});
