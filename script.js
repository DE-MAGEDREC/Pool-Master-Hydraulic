// ====== TRADUCTIONS COMPLÈTES ======
const translations = {
  fr: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscine",
    canalisations_tab: "Canalisations",
    pertes_tab: "Pertes singulières",
    pression_tab: "Pression & Filtre",
    pieces_tab: "Pièces à sceller",
    parametres_tab: "Paramètres",
    inversee_tab: "Étude inversée",
    resultats_tab: "Résultats / PDF",
    suivant: "Suivant →",
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
    exporter: "Exporter PDF",
    logout: "Déconnexion",
    en_bar: "Bar",
    en_psi: "PSI",
    activer_inversee: "Activer étude inversée",
    // Labels
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
    diametre_canalisation: "Diamètre canalisation (mm)",
    materiau: "Matériau",
    aspiration: "Aspiration",
    refoulement: "Refoulement",
    longueur_asp: "Longueur aspiration (m)",
    vitesse_asp: "Vitesse aspiration (m/s)",
    longueur_ref: "Longueur refoulement (m)",
    vitesse_ref: "Vitesse refoulement (m/s)",
    coudes90C: "Coudes 90° court rayon",
    coudes90G: "Coudes 90° grand rayon",
    tes: "Tés",
    vannes: "Vannes",
    hauteur_geo: "Hauteur géométrique (m)",
    perte_filtre: "Perte filtre (mCE)",
    skimmers: "Skimmers",
    bondes: "Bondes de fond",
    refoulements: "Refoulements",
    cascade: "Cascade",
    type_tuyau: "Type de tuyau",
    section_int: "Section intérieure (mm)",
    option_PVC_rigide: "PVC rigide",
    option_PVC_souple: "PVC souple",
    option_PE: "Polyéthylène",
    option_Turbulent: "Turbulent",
    aspiration_tab: "Aspiration",
    refoulement_tab: "Refoulement",
    resultats: "Résultats",
    en_attente: "En attente de données…",
    inversee_text: "Entrez les débits et pertes pour calcul des vitesses et NPSH",
    debit_total: "Débit total (m3/h)",
    pertes_totales_label: "Pertes totales (mCE)"
  },
  en: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Pool",
    canalisations_tab: "Pipes",
    pertes_tab: "Singular losses",
    pression_tab: "Pressure & Filter",
    pieces_tab: "Embedded parts",
    parametres_tab: "Settings",
    inversee_tab: "Reverse study",
    resultats_tab: "Results / PDF",
    suivant: "Next →",
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
    exporter: "Export PDF",
    logout: "Logout",
    en_bar: "Bar",
    en_psi: "PSI",
    activer_inversee: "Enable reverse study",
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
    diametre_canalisation: "Pipe diameter (mm)",
    materiau: "Material",
    aspiration: "Suction",
    refoulement: "Discharge",
    longueur_asp: "Suction length (m)",
    vitesse_asp: "Suction velocity (m/s)",
    longueur_ref: "Discharge length (m)",
    vitesse_ref: "Discharge velocity (m/s)",
    coudes90C: "90° elbows short radius",
    coudes90G: "90° elbows long radius",
    tes: "Tees",
    vannes: "Valves",
    hauteur_geo: "Geometric height (m)",
    perte_filtre: "Filter loss (mCE)",
    skimmers: "Skimmers",
    bondes: "Bottom drains",
    refoulements: "Returns",
    cascade: "Waterfall",
    type_tuyau: "Pipe type",
    section_int: "Internal section (mm)",
    option_PVC_rigide: "Rigid PVC",
    option_PVC_souple: "Flexible PVC",
    option_PE: "Polyethylene",
    option_Turbulent: "Turbulent",
    aspiration_tab: "Suction",
    refoulement_tab: "Discharge",
    resultats: "Results",
    en_attente: "Waiting for data…",
    inversee_text: "Enter flow rates and losses to calculate velocities and NPSH",
    debit_total: "Total flow (m3/h)",
    pertes_totales_label: "Total losses (mCE)"
  },
  es: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscina",
    canalisations_tab: "Tuberías",
    pertes_tab: "Pérdidas singulares",
    pression_tab: "Presión & Filtro",
    pieces_tab: "Piezas a instalar",
    parametres_tab: "Parámetros",
    inversee_tab: "Estudio inverso",
    resultats_tab: "Resultados / PDF",
    suivant: "Siguiente →",
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
    exporter: "Exportar PDF",
    logout: "Cerrar sesión",
    en_bar: "Bar",
    en_psi: "PSI",
    activer_inversee: "Activar estudio inverso",
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
    diametre_canalisation: "Diámetro tubería (mm)",
    materiau: "Material",
    aspiration: "Aspiración",
    refoulement: "Impulsión",
    longueur_asp: "Longitud aspiración (m)",
    vitesse_asp: "Velocidad aspiración (m/s)",
    longueur_ref: "Longitud impulsión (m)",
    vitesse_ref: "Velocidad impulsión (m/s)",
    coudes90C: "Codos 90° radio corto",
    coudes90G: "Codos 90° radio largo",
    tes: "Tes",
    vannes: "Válvulas",
    hauteur_geo: "Altura geométrica (m)",
    perte_filtre: "Pérdida filtro (mCE)",
    skimmers: "Skimmers",
    bondes: "Drenajes de fondo",
    refoulements: "Retornos",
    cascade: "Cascada",
    type_tuyau: "Tipo de tubería",
    section_int: "Sección interna (mm)",
    option_PVC_rigide: "PVC rígido",
    option_PVC_souple: "PVC flexible",
    option_PE: "Polietileno",
    option_Turbulent: "Turbulento",
    aspiration_tab: "Aspiración",
    refoulement_tab: "Impulsión",
    resultats: "Resultados",
    en_attente: "Esperando datos…",
    inversee_text: "Ingrese caudales y pérdidas para calcular velocidades y NPSH",
    debit_total: "Caudal total (m3/h)",
    pertes_totales_label: "Pérdidas totales (mCE)"
  }
};

let currentLang = "fr";

// ====== WIZARD ======
function suivant(id){
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
  calculerResultats();
}

// ====== FORMES DE PISCINE ======
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
function mceToPsi(val){ return (val*1.422).toFixed(2); }

// ====== CALCUL DES PERTES SINGULIERES ======
function calcSing(c90C, c90G, te, vanne, V, lambda, DN){
  const L_eq = (c90C*30*DN) + (c90G*20*DN) + (te*40*DN) + (vanne*8*DN);
  return lambda * L_eq / DN * Math.pow(V,2)/(2*9.81);
}

// ====== CALCUL PRINCIPAL ======
function calculerResultats(){
  const t = translations[currentLang];

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

  // Canalisations
  const DN = parseFloat($('#D').val()) / 1000 || 0.05;
  const v_asp = parseFloat($('#v_asp').val()) || 1.5;
  const v_ref = parseFloat($('#v_ref').val()) || 2;
  
  const mat = $('#materiau').val();
  let lambda = 0.02;
  if(mat === "PVC_souple") lambda = 0.035;
  else if(mat === "Turbulent") lambda = 0.316;
  else if(mat === "PE") lambda = 0.025;
  
  const L_asp = parseFloat($('#L_asp').val()) || 0;
  const L_ref = parseFloat($('#L_ref').val()) || 0;
  
  const H_fric_asp = DN > 0 ? lambda * L_asp / DN * Math.pow(v_asp,2)/(2*9.81) : 0;
  const H_fric_ref = DN > 0 ? lambda * L_ref / DN * Math.pow(v_ref,2)/(2*9.81) : 0;

  // Pertes singulières
  const c90C_asp = parseFloat($('#coudes90C_asp').val()) || 0;
  const c90G_asp = parseFloat($('#coudes90G_asp').val()) || 0;
  const tes_asp = parseFloat($('#tes_asp').val()) || 0;
  const vannes_asp = parseFloat($('#vannes_asp').val()) || 0;
  
  const c90C_ref = parseFloat($('#coudes90C_ref').val()) || 0;
  const c90G_ref = parseFloat($('#coudes90G_ref').val()) || 0;
  const tes_ref = parseFloat($('#tes_ref').val()) || 0;
  const vannes_ref = parseFloat($('#vannes_ref').val()) || 0;
  
  const H_sing_asp = calcSing(c90C_asp, c90G_asp, tes_asp, vannes_asp, v_asp, lambda, DN);
  const H_sing_ref = calcSing(c90C_ref, c90G_ref, tes_ref, vannes_ref, v_ref, lambda, DN);

  const H_geo_val = parseFloat($('#H_geo').val()) || 0;
  const dp_filtre_val = parseFloat($('#dp_filtre').val()) || 0;

  const H_total_asp = H_sing_asp + H_fric_asp;
  const H_total_ref = H_sing_ref + H_fric_ref;
  const H_total = H_total_asp + H_total_ref + H_geo_val + dp_filtre_val;

  // Affichage
  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>
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
  $('#res_droite').html(html);
  $('#res-droite-empty').hide();
}

// ====== PDF ======
$('#btn-pdf').on('click', function(){
  html2pdf().from(document.getElementById('res')).save();
});

// ====== LANGUE ======
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];

  // Titres
  $('#main-title').text(t.title);
  $('#res-droite-title').text(t.resultats);
  $('#res-droite-empty').text(t.en_attente);
  
  // Boutons
  $('.btn-primary').text(t.suivant);
  $('#btn-pdf').text(t.exporter);
  $('.logout-btn').text(t.logout);
  
  // Onglets
  $('#tab-piscine').text(t.piscine_tab);
  $('#tab-canalisations').text(t.canalisations_tab);
  $('#tab-pertes').text(t.pertes_tab);
  $('#tab-pression').text(t.pression_tab);
  $('#tab-pieces').text(t.pieces_tab);
  $('#tab-parametres').text(t.parametres_tab);
  $('#tab-inversee').text(t.inversee_tab);
  $('#tab-resultats').text(t.resultats_tab);

  // Piscine
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
  $('#label-diametre').text(t.diametre);
  $('#label-pr').text(t.profondeur);
  $('#label-grandaxe').text(t.grand_axe);
  $('#label-petitaxe').text(t.petit_axe);
  $('#label-po').text(t.profondeur);
  $('#label-Llibre').text(t.longueur_approx);
  $('#label-llibre').text(t.largeur_approx);
  $('#label-plibre').text(t.profondeur);
  $('#label-temps').text(t.temps_recycl);

  // Canalisations
  $('#label-diametre-canalisation').text(t.diametre_canalisation);
  $('#label-materiau').text(t.materiau);
  $('#label-aspiration').text(t.aspiration);
  $('#label-refoulement').text(t.refoulement);
  $('#label-Lasp').text(t.longueur_asp);
  $('#label-vasp').text(t.vitesse_asp);
  $('#label-Lref').text(t.longueur_ref);
  $('#label-vref').text(t.vitesse_ref);
  
  // Options matériau
  $('#opt-PVC_rigide').text(t.option_PVC_rigide);
  $('#opt-PVC_souple').text(t.option_PVC_souple);
  $('#opt-PE').text(t.option_PE);
  $('#opt-Turbulent').text(t.option_Turbulent);

  // Pertes singulières
  $('#label-aspiration-sing').text(t.aspiration_tab);
  $('#label-refoulement-sing').text(t.refoulement_tab);
  $('#label-c90Casp').text(t.coudes90C);
  $('#label-c90Gasp').text(t.coudes90G);
  $('#label-tesasp').text(t.tes);
  $('#label-vannesasp').text(t.vannes);
  $('#label-c90Cref').text(t.coudes90C);
  $('#label-c90Gref').text(t.coudes90G);
  $('#label-tesref').text(t.tes);
  $('#label-vannesref').text(t.vannes);

  // Pression
  $('#label-Hgeo').text(t.hauteur_geo);
  $('#label-dpfiltre').text(t.perte_filtre);

  // Pièces
  $('#label-skimmer').text(t.skimmers);
  $('#label-bonde').text(t.bondes);
  $('#label-refoulement-pieces').text(t.refoulements);
  $('#label-cascade').text(t.cascade);

  // Paramètres
  $('#label-type-tuyau').text(t.type_tuyau);
  $('#label-section-int').text(t.section_int);

  // Étude inversée
  $('#label-activer-inversee').text(t.activer_inversee);
  $('#text-inversee').text(t.inversee_text);
  $('#label-Qinv').text(t.debit_total);
  $('#label-Hinv').text(t.pertes_totales_label);

  // Résultats
  $('#label-resultats').text(t.resultats);

  calculerResultats();
}

$('#lang-select').on('change', function(){ setLanguage($(this).val()); });

// ====== INITIALISATION ======
$(document).ready(function(){
  $('input[name="forme"]').on('change', choixForme);
  $('input, select').on('input change', function(){
    calculerResultats();
  });
  $('#activer_inversee').on('change', function(){
    $('#inversee_content').toggle(this.checked);
  });
  setLanguage('fr');
  choixForme();
  calculerResultats();
});
