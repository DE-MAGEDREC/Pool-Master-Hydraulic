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
    coudes90C: "Coude 90° court rayon",
    coudes90G: "Coude 90° grand rayon",
    coudes45: "Coude 45°",
    tes: "Té 90° dérivation",
    vannes: "Vanne à boisseau sphérique",
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
    point_decimal: "⚠️ Utilisez le point pour les décimales (ex: 1.5 pour 1,5 mètre)",
    dn_selectionne: "DN sélectionné",
    coeff_k_adaptes: "(coefficients K adaptés au DN)"
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
    coudes90C: "90° short radius elbow",
    coudes90G: "90° long radius elbow",
    coudes45: "45° elbow",
    tes: "90° tee branch",
    vannes: "Ball valve",
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
    point_decimal: "⚠️ Use decimal point (ex: 1.5 for 1.5 meters)",
    dn_selectionne: "DN selected",
    coeff_k_adaptes: "(K coefficients adapted to DN)"
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
    coudes90C: "Codo 90° radio corto",
    coudes90G: "Codo 90° radio largo",
    coudes45: "Codo 45°",
    tes: "Te 90° derivación",
    vannes: "Válvula de esfera",
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
    point_decimal: "⚠️ Use punto decimal (ej: 1.5 para 1,5 metros)",
    dn_selectionne: "DN seleccionado",
    coeff_k_adaptes: "(coeficientes K adaptados al DN)"
  }
};

let currentLang = "fr";
let resultatsGlobaux = {};

// ====== TABLE DES COEFFICIENTS K PAR DN ======
const K_TABLE = {
  20: { coude90C: 1.70, coude90G: 0.40, coude45: 0.40, te: 2.00, vanne: 0.08 },
  25: { coude90C: 1.60, coude90G: 0.38, coude45: 0.38, te: 1.90, vanne: 0.07 },
  32: { coude90C: 1.50, coude90G: 0.35, coude45: 0.35, te: 1.80, vanne: 0.06 },
  40: { coude90C: 1.50, coude90G: 0.35, coude45: 0.35, te: 1.80, vanne: 0.05 },
  50: { coude90C: 1.50, coude90G: 0.35, coude45: 0.35, te: 1.80, vanne: 0.05 },
  63: { coude90C: 1.40, coude90G: 0.33, coude45: 0.33, te: 1.70, vanne: 0.05 },
  75: { coude90C: 1.40, coude90G: 0.33, coude45: 0.33, te: 1.70, vanne: 0.05 },
  90: { coude90C: 1.40, coude90G: 0.32, coude45: 0.32, te: 1.60, vanne: 0.05 }
};

// ====== DIAMÈTRES INTÉRIEURS DE RÉFÉRENCE ======
const DN_REFERENCES = {
  20: 15.0,
  25: 20.0,
  32: 26.0,
  40: 34.0,
  50: 46.0,
  63: 57.4,
  75: 68.0,
  90: 83.0
};

// ====== FONCTION POUR DÉTERMINER LE DN LE PLUS PROCHE ======
function getDNFromDiameter(diametreInt) {
  const dns = Object.keys(DN_REFERENCES).map(Number);
  let dnProche = dns[0];
  let ecartMin = Math.abs(diametreInt - DN_REFERENCES[dnProche]);
  
  for (let i = 1; i < dns.length; i++) {
    const ecart = Math.abs(diametreInt - DN_REFERENCES[dns[i]]);
    if (ecart < ecartMin) {
      ecartMin = ecart;
      dnProche = dns[i];
    }
  }
  return dnProche;
}

// ====== FONCTION POUR OBTENIR LES COEFFICIENTS K ======
function getKValues(dn) {
  const dns = Object.keys(K_TABLE).map(Number);
  let dnTable = dns[0];
  let ecartMin = Math.abs(dn - dnTable);
  
  for (let i = 1; i < dns.length; i++) {
    const ecart = Math.abs(dn - dns[i]);
    if (ecart < ecartMin) {
      ecartMin = ecart;
      dnTable = dns[i];
    }
  }
  return K_TABLE[dnTable];
}

// ====== VALEURS PAR DÉFAUT ======
const DEFAULT_VALUES = {
  L: '10',
  l: '5',
  p: '1.5',
  cote: '',
  p_carre: '',
  D_piscine: '',
  p_r: '',
  a_ovale: '',
  b_ovale: '',
  p_o: '',
  L_libre: '',
  l_libre: '',
  p_libre: '',
  t_recycl: '5',
  D: '46',
  materiau: 'PVC_rigide',
  L_asp: '10',
  v_asp: '1.5',
  L_ref: '15',
  v_ref: '2',
  coudes90C_asp: '2',
  coudes90G_asp: '1',
  coudes45_asp: '0',
  tes_asp: '1',
  vannes_asp: '1',
  coudes90C_ref: '3',
  coudes90G_ref: '2',
  coudes45_ref: '0',
  tes_ref: '1',
  vannes_ref: '1',
  H_geo: '0',
  dp_filtre: '3',
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
  
  choixForme();
  calculerResultats();
  alert(t.reset_confirm);
};

// ====== CONVERSIONS ======
function mceToBar(val){ return (val*0.0981).toFixed(2); }
function mceToPsi(val){ return (val*1.422).toFixed(2); }

// ====== CALCUL PRINCIPAL AVEC MISE À JOUR AUTOMATIQUE ======
window.calculerResultats = function(){
  const t = translations[currentLang];

  try {
    // Piscine
    const forme = $('input[name="forme"]:checked').val();
    let surface=0, volume=0;
    const t_renouv = parseFloat($('#t_recycl').val()) || 5;

    if(forme==="rectangle"){
      const L_val = parseFloat($('#L').val()) || 0;
      const l_val = parseFloat($('#l').val()) || 0;
      const p_val = parseFloat($('#p').val()) || 0;
      surface = L_val*l_val; 
      volume = surface*p_val;
    } else if(forme==="carre"){
      const c_val = parseFloat($('#cote').val()) || 0;
      const p_val = parseFloat($('#p_carre').val()) || 0;
      surface = c_val*c_val; 
      volume = surface*p_val;
    } else if(forme==="ronde"){
      const D_val = parseFloat($('#D_piscine').val()) || 0;
      const p_val = parseFloat($('#p_r').val()) || 0;
      surface = Math.PI*Math.pow(D_val/2,2); 
      volume = surface*p_val;
    } else if(forme==="ovale"){
      const a_val = parseFloat($('#a_ovale').val()) || 0;
      const b_val = parseFloat($('#b_ovale').val()) || 0;
      const p_val = parseFloat($('#p_o').val()) || 0;
      surface = Math.PI*(a_val/2)*(b_val/2); 
      volume = surface*p_val;
    } else if(forme==="libre"){
      const L_val = parseFloat($('#L_libre').val()) || 0;
      const l_val = parseFloat($('#l_libre').val()) || 0;
      const p_val = parseFloat($('#p_libre').val()) || 0;
      surface = L_val*l_val; 
      volume = surface*p_val;
    }
    
    const debit = t_renouv > 0 ? volume / t_renouv : 0;

    // ====== CANALISATIONS - MISE À JOUR AUTOMATIQUE ======
    // Récupérer le diamètre intérieur saisi par l'utilisateur
    const diametreInt = parseFloat($('#D').val()) || 46;
    const DN = diametreInt / 1000; // Conversion en mètres
    
    // DÉTERMINER AUTOMATIQUEMENT LE DN COMMERCIAL LE PLUS PROCHE
    const dnCommercial = getDNFromDiameter(diametreInt);
    const kValues = getKValues(dnCommercial);
    
    // Log pour débogage
    console.log("Diamètre intérieur saisi: " + diametreInt + " mm → DN sélectionné: " + dnCommercial);
    console.log("Coefficients K utilisés:", kValues);
    
    const v_asp = parseFloat($('#v_asp').val()) || 1.5;
    const v_ref = parseFloat($('#v_ref').val()) || 2;
    
    const mat = $('#materiau').val();
    let lambda = 0.02;
    if(mat === "PVC_souple") lambda = 0.035;
    else if(mat === "Turbulent") lambda = 0.316;
    else if(mat === "PE") lambda = 0.025;
    
    const L_asp = parseFloat($('#L_asp').val()) || 0;
    const L_ref = parseFloat($('#L_ref').val()) || 0;
    
    // Frictions linéaires
    const H_fric_asp = DN > 0 ? lambda * L_asp / DN * Math.pow(v_asp,2)/(2*9.81) : 0;
    const H_fric_ref = DN > 0 ? lambda * L_ref / DN * Math.pow(v_ref,2)/(2*9.81) : 0;

    // ====== PERTES SINGULIÈRES AVEC COEFFICIENTS K AUTO-ADAPTATIFS ======
    // Aspiration
    const c90C_asp = parseFloat($('#coudes90C_asp').val()) || 0;
    const c90G_asp = parseFloat($('#coudes90G_asp').val()) || 0;
    const c45_asp = parseFloat($('#coudes45_asp').val()) || 0;
    const tes_asp = parseFloat($('#tes_asp').val()) || 0;
    const vannes_asp = parseFloat($('#vannes_asp').val()) || 0;
    
    // Refoulement
    const c90C_ref = parseFloat($('#coudes90C_ref').val()) || 0;
    const c90G_ref = parseFloat($('#coudes90G_ref').val()) || 0;
    const c45_ref = parseFloat($('#coudes45_ref').val()) || 0;
    const tes_ref = parseFloat($('#tes_ref').val()) || 0;
    const vannes_ref = parseFloat($('#vannes_ref').val()) || 0;
    
    // Calcul des K totaux avec les coefficients du DN sélectionné
    const K_asp = (c90C_asp * kValues.coude90C) + 
                  (c90G_asp * kValues.coude90G) + 
                  (c45_asp * kValues.coude45) + 
                  (tes_asp * kValues.te) + 
                  (vannes_asp * kValues.vanne);
                  
    const K_ref = (c90C_ref * kValues.coude90C) + 
                  (c90G_ref * kValues.coude90G) + 
                  (c45_ref * kValues.coude45) + 
                  (tes_ref * kValues.te) + 
                  (vannes_ref * kValues.vanne);
    
    // Calcul des pertes singulières
    const H_sing_asp = K_asp * (Math.pow(v_asp, 2) / (2 * 9.81));
    const H_sing_ref = K_ref * (Math.pow(v_ref, 2) / (2 * 9.81));

    const H_geo_val = parseFloat($('#H_geo').val()) || 0;
    const dp_filtre_val = parseFloat($('#dp_filtre').val()) || 0;

    const H_total_asp = H_sing_asp + H_fric_asp;
    const H_total_ref = H_sing_ref + H_fric_ref;
    const H_total = H_total_asp + H_total_ref + H_geo_val + dp_filtre_val;

    // Stocker les résultats
    resultatsGlobaux = {
      surface: surface,
      volume: volume,
      debit: debit,
      H_sing_asp: H_sing_asp,
      H_sing_ref: H_sing_ref,
      H_geo_val: H_geo_val,
      dp_filtre_val: dp_filtre_val,
      H_fric_asp: H_fric_asp,
      H_fric_ref: H_fric_ref,
      H_total_asp: H_total_asp,
      H_total_ref: H_total_ref,
      H_total: H_total,
      forme: forme,
      t_renouv: t_renouv,
      DN: DN * 1000,
      dnCommercial: dnCommercial,
      v_asp: v_asp,
      v_ref: v_ref,
      lambda: lambda,
      mat: mat,
      kValues: kValues,
      c90C_asp: c90C_asp,
      c90G_asp: c90G_asp,
      c45_asp: c45_asp,
      tes_asp: tes_asp,
      vannes_asp: vannes_asp,
      c90C_ref: c90C_ref,
      c90G_ref: c90G_ref,
      c45_ref: c45_ref,
      tes_ref: tes_ref,
      vannes_ref: vannes_ref
    };

    // Affichage avec indication du DN sélectionné
    const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br>
<b>${t.diametre_interieur} :</b> ${(DN * 1000).toFixed(1)} mm<br>
<b>${t.dn_selectionne} :</b> DN ${dnCommercial} <span style="color:#0066cc;font-size:12px;">${t.coeff_k_adaptes}</span><br><hr>
<b>${t.pertes_sing_asp} :</b> ${H_sing_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_asp)} ${t.en_bar} | ${mceToPsi(H_sing_asp)} ${t.en_psi}</small><br>
<b>${t.pertes_sing_ref} :</b> ${H_sing_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_ref)} ${t.en_bar} | ${mceToPsi(H_sing_ref)} ${t.en_psi}</small><br>
<b>${t.hauteur} :</b> ${H_geo_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_geo_val)} ${t.en_bar} | ${mceToPsi(H_geo_val)} ${t.en_psi}</small><br>
<b>${t.filtre} :</b> ${dp_filtre_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(dp_filtre_val)} ${t.en_bar} | ${mceToPsi(dp_filtre_val)} ${t.en_psi}</small><br>
<b>${t.friction} ${t.aspiration.toLowerCase()} :</b> ${H_fric_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_asp)} ${t.en_bar} | ${mceToPsi(H_fric_asp)} ${t.en_psi}</small><br>
<b>${t.friction} ${t.refoulement.toLowerCase()} :</b> ${H_fric_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_ref)} ${t.en_bar} | ${mceToPsi(H_fric_ref)} ${t.en_psi}</small><br><hr>
<b>${t.total_asp} :</b> ${H_total_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_asp)} ${t.en_bar} | ${mceToPsi(H_total_asp)} ${t.en_psi}</small><br>
<b>${t.total_ref} :</b> ${H_total_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_ref)} ${t.en_bar} | ${mceToPsi(H_total_ref)} ${t.en_psi}</small><br>
<b>${t.pertes_totales} :</b> ${H_total.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total)} ${t.en_bar} | ${mceToPsi(H_total)} ${t.en_psi}</small>
`;

    $('#res').html(html);
    $('#resultats-content').html(html);
    $('#resultats-content').show();
    
  } catch(e) {
    console.error("Erreur de calcul:", e);
    const errorHtml = '<p class="text-danger">Erreur de calcul. Vérifiez les données saisies.</p>';
    $('#res').html(errorHtml);
    $('#resultats-content').html(errorHtml);
  }
};

// ====== OUVERTURE DU RAPPORT ======
window.ouvrirRapport = function(){
  const t = translations[currentLang];
  const r = resultatsGlobaux;
  
  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR');
  const heureStr = now.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'});
  
  const formeLabels = {
    'rectangle': t.rectangle,
    'carre': t.carre,
    'ronde': t.ronde,
    'ovale': t.ovale,
    'libre': t.libre
  };
  const formeLabel = formeLabels[r.forme] || t.rectangle;
  
  const matLabels = {
    'PVC_rigide': t.option_PVC_rigide,
    'PVC_souple': t.option_PVC_souple,
    'PE': t.option_PE,
    'Turbulent': t.option_Turbulent
  };
  const matLabel = matLabels[r.mat] || 'PVC rigide';
  
  const rapportHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.title} - ${t.rapport}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; display: flex; justify-content: center; }
    .rapport-container { max-width: 900px; width: 100%; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .en-tete { text-align: center; border-bottom: 3px solid #003366; padding-bottom: 15px; margin-bottom: 20px; }
    .en-tete h1 { color: #003366; font-size: 24px; margin: 0; }
    .en-tete h2 { color: #0066cc; font-size: 20px; margin: 5px 0; }
    .en-tete .infos { font-size: 14px; color: #666; margin-top: 10px; }
    .section { margin: 15px 0; }
    .section h3 { color: #003366; border-bottom: 1px solid #ccc; padding-bottom: 8px; font-size: 17px; margin-bottom: 10px; }
    .ligne { padding: 4px 0; font-size: 14px; line-height: 1.6; }
    .ligne strong { font-weight: 600; }
    .sous-ligne { padding-left: 25px; font-size: 13px; color: #555; }
    .separateur { border: 1px solid #eee; margin: 10px 0; }
    .separateur-epais { border: 2px solid #003366; margin: 12px 0; }
    .total { font-size: 18px; font-weight: bold; color: #003366; }
    .mention { margin-top: 25px; padding: 15px; background: #f8f9fa; border-left: 4px solid #ffc107; border-radius: 4px; }
    .mention p { font-size: 13px; color: #555; font-style: italic; margin: 0; text-align: justify; }
    .pied-page { text-align: center; border-top: 2px solid #ccc; padding-top: 15px; margin-top: 25px; font-size: 12px; color: #999; }
    .actions { display: flex; gap: 10px; justify-content: center; margin-top: 20px; flex-wrap: wrap; }
    .actions button { padding: 10px 25px; border: none; border-radius: 5px; font-size: 14px; cursor: pointer; }
    .btn-imprimer { background: #28a745; color: white; }
    .btn-imprimer:hover { background: #218838; }
    .btn-fermer { background: #dc3545; color: white; }
    .btn-fermer:hover { background: #c82333; }
    @media print { body { background: white; padding: 0; } .rapport-container { box-shadow: none; padding: 20px; } .actions { display: none; } }
    @media (max-width: 600px) { .rapport-container { padding: 15px; } .en-tete h1 { font-size: 20px; } .en-tete h2 { font-size: 17px; } .ligne { font-size: 13px; } .total { font-size: 16px; } }
  </style>
</head>
<body>
  <div class="rapport-container" id="rapport">
    <div class="en-tete">
      <h1>${t.rapport}</h1>
      <h2>${t.title}</h2>
      <div class="infos">
        <span>${t.date} : ${dateStr}</span> &nbsp;|&nbsp; 
        <span>${t.heure} : ${heureStr}</span>
      </div>
    </div>
    
    <div class="section">
      <h3>${t.resultats_title}</h3>
      <div class="ligne"><strong>${t.forme_piscine} :</strong> ${formeLabel}</div>
      <div class="ligne"><strong>${t.surface} :</strong> ${r.surface.toFixed(2)} m²</div>
      <div class="ligne"><strong>${t.volume} :</strong> ${r.volume.toFixed(2)} m³</div>
      <div class="ligne"><strong>${t.debit} :</strong> ${r.debit.toFixed(2)} m³/h</div>
    </div>
    
    <hr class="separateur">
    
    <div class="section">
      <h3 style="font-size:15px;">${t.diametre_interieur} : ${r.DN.toFixed(1)} mm - ${t.dn_selectionne} : DN ${r.dnCommercial}</h3>
      <div class="ligne"><strong>${t.materiau} :</strong> ${matLabel}</div>
      <div class="ligne"><strong>${t.vitesse_ecoulement} ${t.aspiration.toLowerCase()} :</strong> ${r.v_asp.toFixed(2)} m/s</div>
      <div class="ligne"><strong>${t.vitesse_ecoulement} ${t.refoulement.toLowerCase()} :</strong> ${r.v_ref.toFixed(2)} m/s</div>
    </div>
    
    <hr class="separateur">
    
    <div class="section">
      <div class="ligne"><strong>${t.pertes_sing_asp} :</strong> ${r.H_sing_asp.toFixed(2)} mCE</div>
      <div class="sous-ligne">≈ ${mceToBar(r.H_sing_asp)} ${t.en_bar} | ${mceToPsi(r.H_sing_asp)} ${t.en_psi}</div>
      <div class="ligne" style="margin-top:6px;"><strong>${t.pertes_sing_ref} :</strong> ${r.H_sing_ref.toFixed(2)} mCE</div>
      <div class="sous-ligne">≈ ${mceToBar(r.H_sing_ref)} ${t.en_bar} | ${mceToPsi(r.H_sing_ref)} ${t.en_psi}</div>
    </div>
    
    <hr class="separateur">
    
    <div class="section">
      <div class="ligne"><strong>${t.hauteur} :</strong> ${r.H_geo_val.toFixed(2)} mCE</div>
      <div class="sous-ligne">≈ ${mceToBar(r.H_geo_val)} ${t.en_bar} | ${mceToPsi(r.H_geo_val)} ${t.en_psi}</div>
      <div class="ligne" style="margin-top:6px;"><strong>${t.filtre} :</strong> ${r.dp_filtre_val.toFixed(2)} mCE</div>
      <div class="sous-ligne">≈ ${mceToBar(r.dp_filtre_val)} ${t.en_bar} | ${mceToPsi(r.dp_filtre_val)} ${t.en_psi}</div>
    </div>
    
    <hr class="separateur">
    
    <div class="section">
      <div class="ligne"><strong>${t.friction} ${t.aspiration.toLowerCase()} :</strong> ${r.H_fric_asp.toFixed(2)} mCE</div>
      <div class="sous-ligne">≈ ${mceToBar(r.H_fric_asp)} ${t.en_bar} | ${mceToPsi(r.H_fric_asp)} ${t.en_psi}</div>
      <div class="ligne" style="margin-top:6px;"><strong>${t.friction} ${t.refoulement.toLowerCase()} :</strong> ${r.H_fric_ref.toFixed(2)} mCE</div>
      <div class="sous-ligne">≈ ${mceToBar(r.H_fric_ref)} ${t.en_bar} | ${mceToPsi(r.H_fric_ref)} ${t.en_psi}</div>
    </div>
    
    <hr class="separateur">
    
    <div class="section">
      <div class="ligne"><strong>${t.total_asp} :</strong> ${r.H_total_asp.toFixed(2)} mCE</div>
      <div class="sous-ligne">≈ ${mceToBar(r.H_total_asp)} ${t.en_bar} | ${mceToPsi(r.H_total_asp)} ${t.en_psi}</div>
      <div class="ligne" style="margin-top:6px;"><strong>${t.total_ref} :</strong> ${r.H_total_ref.toFixed(2)} mCE</div>
      <div class="sous-ligne">≈ ${mceToBar(r.H_total_ref)} ${t.en_bar} | ${mceToPsi(r.H_total_ref)} ${t.en_psi}</div>
    </div>
    
    <hr class="separateur-epais">
    
    <div class="section">
      <div class="ligne total">${t.pertes_totales} : ${r.H_total.toFixed(2)} mCE</div>
      <div class="sous-ligne" style="font-size:14px;">≈ ${mceToBar(r.H_total)} ${t.en_bar} | ${mceToPsi(r.H_total)} ${t.en_psi}</div>
    </div>
    
    <div class="mention">
      <p>⚠️ ${t.mention}</p>
    </div>
    
    <div class="pied-page">
      ${t.title} - ${t.rapport} - ${dateStr} ${heureStr}
    </div>
    
    <div class="actions">
      <button class="btn-imprimer" onclick="window.print()">${t.imprimer}</button>
      <button class="btn-fermer" onclick="window.close()">${t.fermer}</button>
    </div>
  </div>
</body>
</html>
  `;
  
  const nouvelleFenetre = window.open('', '_blank', 'width=900,height=800,scrollbars=yes,resizable=yes');
  if (nouvelleFenetre) {
    nouvelleFenetre.document.write(rapportHTML);
    nouvelleFenetre.document.close();
  } else {
    alert('Veuillez autoriser les popups pour cette application.');
  }
};

// ====== LANGUE ======
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];

  $('#main-title').text(t.title);
  $('#logout-btn').text(t.logout);
  $('#lang-label').text(t.langue);
  $('#btn-rapport').text('📄 ' + t.exporter);
  $('#btn-reset').text('🔄 ' + t.reset);
  $('#res-droite-title').text(t.resultats);
  $('#resultats-content').text(t.en_attente);
  $('.btn-primary').text(t.suivant);
  
  $('#tab-piscine').text(t.tab_piscine);
  $('#tab-canalisations').text(t.tab_canalisations);
  $('#tab-pertes').text(t.tab_pertes);
  $('#tab-pression').text(t.tab_pression);
  $('#tab-resultats').text(t.tab_resultats);
  
  $('#label-forme').text(t.forme);
  $('#label-rectangle').text(t.rectangle);
  $('#label-carre').text(t.carre);
  $('#label-ronde').text(t.ronde);
  $('#label-ovale').text(t.ovale);
  $('#label-libre').text(t.libre);
  $('#label-L').text(t.longueur);
  $('#label-l').text(t.largeur);
  $('#label-p').text(t.profondeur);
  $('#label-cote').text(t.cote);
  $('#label-pcarre').text(t.profondeur);
  $('#label-diametre-piscine').text(t.diametre);
  $('#label-pr').text(t.profondeur);
  $('#label-grandaxe').text(t.grand_axe);
  $('#label-petitaxe').text(t.petit_axe);
  $('#label-po').text(t.profondeur);
  $('#label-Llibre').text(t.longueur_approx);
  $('#label-llibre').text(t.largeur_approx);
  $('#label-plibre').text(t.profondeur);
  $('#label-temps-recycl').text(t.temps_recycl);
  
  $('#label-diametre-canalisation').text(t.diametre_canalisation);
  $('#aide-diametre').text(t.aide_diametre);
  $('#label-materiau').text(t.materiau);
  $('#label-aspiration').text(t.aspiration);
  $('#label-refoulement').text(t.refoulement);
  $('#label-Lasp').text(t.longueur_asp);
  $('#label-vasp').text(t.vitesse_asp);
  $('#label-Lref').text(t.longueur_ref);
  $('#label-vref').text(t.vitesse_ref);
  $('#opt-PVC_rigide').text(t.option_PVC_rigide);
  $('#opt-PVC_souple').text(t.option_PVC_souple);
  $('#opt-PE').text(t.option_PE);
  $('#opt-Turbulent').text(t.option_Turbulent);
  
  $('#label-aspiration-sing').text(t.aspiration_tab);
  $('#label-refoulement-sing').text(t.refoulement_tab);
  $('#label-c90Casp').text(t.coudes90C);
  $('#label-c90Gasp').text(t.coudes90G);
  $('#label-c45asp').text(t.coudes45);
  $('#label-tesasp').text(t.tes);
  $('#label-vannesasp').text(t.vannes);
  $('#label-c90Cref').text(t.coudes90C);
  $('#label-c90Gref').text(t.coudes90G);
  $('#label-c45ref').text(t.coudes45);
  $('#label-tesref').text(t.tes);
  $('#label-vannesref').text(t.vannes);
  
  $('#label-Hgeo').text(t.hauteur_geo);
  $('#label-dpfiltre').text(t.perte_filtre);
  $('#label-resultats-title').text(t.resultats_title);

  calculerResultats();
}

// ====== INITIALISATION ======
$(document).ready(function(){
  console.log("Document ready - Initialisation");
  
  // Vérifier si une réinitialisation est demandée
  const resetNeeded = localStorage.getItem('reset_required');
  if (resetNeeded === 'true') {
    localStorage.removeItem('reset_required');
    setTimeout(function() {
      resetAll();
    }, 100);
  }
  
  $('#lang-select').on('change', function(){ 
    setLanguage($(this).val()); 
  });
  
  choixForme();
  setLanguage('fr');
  
  console.log("Initialisation terminée");
});
