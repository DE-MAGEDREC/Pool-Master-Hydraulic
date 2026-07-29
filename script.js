// ====== TRADUCTIONS COMPLÈTES ======
const translations = {
  fr: {
    title: "Pool Master Hydraulic",
    logout: "Déconnexion",
    langue: "Langue :",
    suivant: "Suivant →",
    exporter: "Afficher le rapport",
    reset: "🔄 Réinitialiser",
    resultats: "Résultats",
    en_attente: "En attente de données…",
    tab_piscine: "Piscine",
    tab_canalisations: "Canalisations",
    tab_pertes: "Pertes singulières",
    tab_pression: "Pression & Filtre",
    tab_resultats: "Résultats / Rapport",
    forme: "Forme de la piscine",
    rectangle: "Rectangulaire",
    carre: "Carrée",
    ronde: "Ronde",
    ovale: "Ovale",
    libre: "Libre",
    longueur: "Longueur (m)",
    largeur: "Largeur (m)",
    profondeur: "Profondeur (m)",
    cote: "Côté (m)",
    diametre: "Diamètre (m)",
    grand_axe: "Grand axe (m)",
    petit_axe: "Petit axe (m)",
    longueur_approx: "Longueur approx. (m)",
    largeur_approx: "Largeur approx. (m)",
    temps_recycl: "Temps recyclage (h)",
    diametre_canalisation: "Diamètre intérieur canalisation (mm)",
    aide_diametre: "⚠️ Exemple : PVC 50 mm PN16 → diamètre intérieur = 46 mm",
    materiau: "Matériau",
    aspiration: "Aspiration",
    refoulement: "Refoulement",
    longueur_asp: "Longueur aspiration (m)",
    vitesse_asp: "Vitesse aspiration (m/s)",
    longueur_ref: "Longueur refoulement (m)",
    vitesse_ref: "Vitesse refoulement (m/s)",
    option_PVC_rigide: "PVC rigide",
    option_PVC_souple: "PVC souple",
    option_PE: "Polyéthylène",
    option_Turbulent: "Turbulent",
    aspiration_tab: "Aspiration",
    refoulement_tab: "Refoulement",
    coudes90C: "Coude 90° court rayon (K=1.50)",
    coudes90G: "Coude 90° grand rayon (K=0.35)",
    tes: "Té 90° dérivation (K=1.80)",
    vannes: "Vanne à boisseau sphérique (K=0.05)",
    hauteur_geo: "Hauteur géométrique (m)",
    perte_filtre: "Perte filtre (mCE)",
    resultats_title: "Résultats",
    surface: "Surface",
    volume: "Volume",
    debit: "Débit filtration",
    hauteur: "Hauteur géométrique",
    filtre: "Perte filtre",
    friction: "Friction canalisation",
    pertes_sing_asp: "Pertes singulières aspiration",
    pertes_sing_ref: "Pertes singulières refoulement",
    total_asp: "Total aspiration",
    total_ref: "Total refoulement",
    pertes_totales: "Pertes totales",
    en_bar: "Bar",
    en_psi: "PSI",
    rapport: "RAPPORT D'ÉTUDE HYDRAULIQUE",
    date: "Date",
    heure: "Heure",
    forme_piscine: "Forme de la piscine",
    mention: "Les valeurs présentées dans ce rapport sont indicatives et permettent une approche dimensionnelle. Pour une étude détaillée, veuillez consulter un bureau d'études spécialisé.",
    imprimer: "🖨️ Imprimer",
    fermer: "✖ Fermer",
    diametre_interieur: "Diamètre intérieur",
    vitesse_ecoulement: "Vitesse d'écoulement",
    reset_confirm: "Données réinitialisées avec succès !",
    point_decimal: "⚠️ Utilisez le point pour les décimales (ex: 1.5 pour 1,5 mètre)"
  },
  en: {
    title: "Pool Master Hydraulic",
    logout: "Logout",
    langue: "Language:",
    suivant: "Next →",
    exporter: "View report",
    reset: "🔄 Reset",
    resultats: "Results",
    en_attente: "Waiting for data…",
    tab_piscine: "Pool",
    tab_canalisations: "Pipes",
    tab_pertes: "Singular losses",
    tab_pression: "Pressure & Filter",
    tab_resultats: "Results / Report",
    forme: "Pool shape",
    rectangle: "Rectangular",
    carre: "Square",
    ronde: "Round",
    ovale: "Oval",
    libre: "Free form",
    longueur: "Length (m)",
    largeur: "Width (m)",
    profondeur: "Depth (m)",
    cote: "Side (m)",
    diametre: "Diameter (m)",
    grand_axe: "Major axis (m)",
    petit_axe: "Minor axis (m)",
    longueur_approx: "Approx. length (m)",
    largeur_approx: "Approx. width (m)",
    temps_recycl: "Recycling time (h)",
    diametre_canalisation: "Internal pipe diameter (mm)",
    aide_diametre: "⚠️ Example: PVC 50 mm PN16 → internal diameter = 46 mm",
    materiau: "Material",
    aspiration: "Suction",
    refoulement: "Discharge",
    longueur_asp: "Suction length (m)",
    vitesse_asp: "Suction velocity (m/s)",
    longueur_ref: "Discharge length (m)",
    vitesse_ref: "Discharge velocity (m/s)",
    option_PVC_rigide: "Rigid PVC",
    option_PVC_souple: "Flexible PVC",
    option_PE: "Polyethylene",
    option_Turbulent: "Turbulent",
    aspiration_tab: "Suction",
    refoulement_tab: "Discharge",
    coudes90C: "90° short radius elbow (K=1.50)",
    coudes90G: "90° long radius elbow (K=0.35)",
    tes: "90° tee branch (K=1.80)",
    vannes: "Ball valve (K=0.05)",
    hauteur_geo: "Geometric height (m)",
    perte_filtre: "Filter loss (mCE)",
    resultats_title: "Results",
    surface: "Surface",
    volume: "Volume",
    debit: "Filtration flow",
    hauteur: "Geometric height",
    filtre: "Filter loss",
    friction: "Pipe friction",
    pertes_sing_asp: "Suction singular losses",
    pertes_sing_ref: "Discharge singular losses",
    total_asp: "Total suction",
    total_ref: "Total discharge",
    pertes_totales: "Total losses",
    en_bar: "Bar",
    en_psi: "PSI",
    rapport: "HYDRAULIC STUDY REPORT",
    date: "Date",
    heure: "Time",
    forme_piscine: "Pool shape",
    mention: "The values presented in this report are indicative and allow a dimensional approach. For a detailed study, please consult a specialized engineering firm.",
    imprimer: "🖨️ Print",
    fermer: "✖ Close",
    diametre_interieur: "Internal diameter",
    vitesse_ecoulement: "Flow velocity",
    reset_confirm: "Data reset successfully!",
    point_decimal: "⚠️ Use decimal point (ex: 1.5 for 1.5 meters)"
  },
  es: {
    title: "Pool Master Hydraulic",
    logout: "Cerrar sesión",
    langue: "Idioma:",
    suivant: "Siguiente →",
    exporter: "Ver informe",
    reset: "🔄 Reiniciar",
    resultats: "Resultados",
    en_attente: "Esperando datos…",
    tab_piscine: "Piscina",
    tab_canalisations: "Tuberías",
    tab_pertes: "Pérdidas singulares",
    tab_pression: "Presión & Filtro",
    tab_resultats: "Resultados / Informe",
    forme: "Forma de la piscina",
    rectangle: "Rectangular",
    carre: "Cuadrada",
    ronde: "Redonda",
    ovale: "Oval",
    libre: "Forma libre",
    longueur: "Largo (m)",
    largeur: "Ancho (m)",
    profondeur: "Profundidad (m)",
    cote: "Lado (m)",
    diametre: "Diámetro (m)",
    grand_axe: "Eje mayor (m)",
    petit_axe: "Eje menor (m)",
    longueur_approx: "Largo aprox. (m)",
    largeur_approx: "Ancho aprox. (m)",
    temps_recycl: "Tiempo reciclaje (h)",
    diametre_canalisation: "Diámetro interior tubería (mm)",
    aide_diametre: "⚠️ Ejemplo: PVC 50 mm PN16 → diámetro interior = 46 mm",
    materiau: "Material",
    aspiration: "Aspiración",
    refoulement: "Impulsión",
    longueur_asp: "Longitud aspiración (m)",
    vitesse_asp: "Velocidad aspiración (m/s)",
    longueur_ref: "Longitud impulsión (m)",
    vitesse_ref: "Velocidad impulsión (m/s)",
    option_PVC_rigide: "PVC rígido",
    option_PVC_souple: "PVC flexible",
    option_PE: "Polietileno",
    option_Turbulent: "Turbulento",
    aspiration_tab: "Aspiración",
    refoulement_tab: "Impulsión",
    coudes90C: "Codo 90° radio corto (K=1.50)",
    coudes90G: "Codo 90° radio largo (K=0.35)",
    tes: "Te 90° derivación (K=1.80)",
    vannes: "Válvula de esfera (K=0.05)",
    hauteur_geo: "Altura geométrica (m)",
    perte_filtre: "Pérdida filtro (mCE)",
    resultats_title: "Resultados",
    surface: "Superficie",
    volume: "Volumen",
    debit: "Caudal filtración",
    hauteur: "Altura geométrica",
    filtre: "Pérdida filtro",
    friction: "Fricción tuberías",
    pertes_sing_asp: "Pérdidas succión",
    pertes_sing_ref: "Pérdidas impulsión",
    total_asp: "Total aspiración",
    total_ref: "Total impulsión",
    pertes_totales: "Pérdidas totales",
    en_bar: "Bar",
    en_psi: "PSI",
    rapport: "INFORME DE ESTUDIO HIDRÁULICO",
    date: "Fecha",
    heure: "Hora",
    forme_piscine: "Forma de la piscina",
    mention: "Los valores presentados en este informe son indicativos y permiten un enfoque dimensional. Para un estudio detallado, consulte una oficina de ingeniería especializada.",
    imprimer: "🖨️ Imprimir",
    fermer: "✖ Cerrar",
    diametre_interieur: "Diámetro interior",
    vitesse_ecoulement: "Velocidad de flujo",
    reset_confirm: "¡Datos reiniciados correctamente!",
    point_decimal: "⚠️ Use punto decimal (ej: 1.5 para 1,5 metros)"
  }
};

let currentLang = "fr";

// Variables globales pour les résultats
let resultatsGlobaux = {};

// ====== COEFFICIENTS K POUR PERTES SINGULIÈRES ======
const K_COEFFICIENTS = {
  coude90C: 1.50,   // Coude 90° court rayon
  coude90G: 0.35,   // Coude 90° grand rayon
  te: 1.80,         // Té 90° dérivation
  vanne: 0.05       // Vanne à boisseau sphérique
};

// ====== VALEURS PAR DÉFAUT ======
const DEFAULT_VALUES = {
  // Piscine - Rectangle
  L: '10',
  l: '5',
  p: '1.5',
  // Piscine - Carré
  cote: '',
  p_carre: '',
  // Piscine - Ronde
  D_piscine: '',
  p_r: '',
  // Piscine - Ovale
  a_ovale: '',
  b_ovale: '',
  p_o: '',
  // Piscine - Libre
  L_libre: '',
  l_libre: '',
  p_libre: '',
  // Piscine - Général
  t_recycl: '5',
  // Canalisations
  D: '46',
  materiau: 'PVC_rigide',
  L_asp: '10',
  v_asp: '1.5',
  L_ref: '15',
  v_ref: '2',
  // Pertes singulières - Aspiration
  coudes90C_asp: '2',
  coudes90G_asp: '1',
  tes_asp: '1',
  vannes_asp: '1',
  // Pertes singulières - Refoulement
  coudes90C_ref: '3',
  coudes90G_ref: '2',
  tes_ref: '1',
  vannes_ref: '1',
  // Pression
  H_geo: '0',
  dp_filtre: '3',
  // Forme par défaut
  forme: 'rectangle'
};

// ====== FONCTIONS GLOBALES ======
window.suivant = function(id){
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
  calculerResultats();
};

window.choixForme = function(){
  const f = $('input[name="forme"]:checked').val();
  $('.forme-fields').hide();
  switch(f){
    case "rectangle": $('#rectangle-fields').show(); break;
    case "carre": $('#carre-fields').show(); break;
    case "ronde": $('#ronde-fields').show(); break;
    case "ovale": $('#ovale-fields').show(); break;
    case "libre": $('#libre-fields').show(); break;
  }
  calculerResultats();
};

// ====== RÉINITIALISATION ======
window.resetAll = function(){
  const t = translations[currentLang];
  
  // Réinitialiser tous les champs avec les valeurs par défaut
  Object.keys(DEFAULT_VALUES).forEach(function(key) {
    if (key === 'forme') {
      $('input[name="forme"][value="' + DEFAULT_VALUES.forme + '"]').prop('checked', true);
    } else {
      var element = $('#' + key);
      if (element.length) {
        if (element.is('select')) {
          element.val(DEFAULT_VALUES[key]);
        } else {
          element.val(DEFAULT_VALUES[key]);
        }
      }
    }
  });
  
  // Forcer la mise à jour des champs de forme
  choixForme();
  
  // Recalculer les résultats
  calculerResultats();
  
  // Afficher un message de confirmation
  alert(t.reset_confirm);
};

// ====== CONVERSIONS ======
function mceToBar(val){ return (val*0.0981).toFixed(2); }
function mceToPsi(val){ return (val*1.422).toFixed(2); }

// ====== CALCUL DES PERTES SINGULIERES AVEC COEFFICIENT K ======
function calcSingK(c90C, c90G, te, vanne, V){
  // Perte singulière = K * (V² / 2g)
  const g = 9.81;
  const K_total = (c90C * K_COEFFICIENTS.coude90C) + 
                  (c90G * K_COEFFICIENTS.coude90G) + 
                  (te * K_COEFFICIENTS.te) + 
                  (vanne * K_COEFFICIENTS.vanne
