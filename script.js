// ====== TRADUCTIONS ======
const translations = {
  fr: {
    title: "Pool Master Hydraulic",
    tabs: ["Piscine", "Canalisations", "Pertes singulières", "Pression & Filtre", "Pièces à sceller", "Paramètres", "Étude inversée", "Résultats / PDF"],
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
    resultats: "Résultats",
    en_attente: "En attente de données…",
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
    refoulement_tab: "Refoulement"
  },
  en: {
    title: "Pool Master Hydraulic",
    tabs: ["Pool", "Pipes", "Singular losses", "Pressure & Filter", "Embedded parts", "Settings", "Reverse study", "Results / PDF"],
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
    resultats: "Results",
    en_attente: "Waiting for data…",
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
    refoulement_tab: "Discharge"
  },
  es: {
    title: "Pool Master Hydraulic",
    tabs: ["Piscina", "Tuberías", "Pérdidas singulares", "Presión & Filtro", "Piezas a instalar", "Parámetros", "Estudio inverso", "Resultados / PDF"],
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
    resultats: "Resultados",
    en_attente: "Esperando datos…",
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
    refoulement_tab: "Impulsión"
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
    $('#resultats-content').html(html);
  } catch(e) {
    console.error("Erreur de calcul:", e);
    $('#resultats-content').html('<p class="text-danger">Erreur de calcul. Vérifiez les données saisies.</p>');
  }
}

// ====== PDF ======
$(document).on('click', '#btn-pdf', function(){
  html2pdf().from(document.getElementById('res')).save();
});

// ====== LANGUE ======
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];

  // Titres
  $('#main-title').text(t.title);
  $('#res_droite h5').text(t.resultats);
  $('#resultats-content').html(t.en_attente);
  
  // Boutons
  $('.btn-primary').text(t.suivant);
  $('#btn-pdf').text(t.exporter);
  $('.logout-btn').text(t.logout);
  
  // Onglets
  $('.nav-link').each(function(index){
    if(index < t.tabs.length){
      $(this).text(t.tabs[index]);
    }
  });

  // Labels et textes
  $('h6:contains("Forme")').text(t.forme);
  $('label:contains("Rectangulaire")').text(t.rectangle);
  $('label:contains("Carrée")').text(t.carre);
  $('label:contains("Ronde")').text(t.ronde);
  $('label:contains("Ovale")').text(t.ovale);
  $('label:contains("Libre")').text(t.libre);
  
  $('#rectangle-fields label:eq(0)').text(t.longueur);
  $('#rectangle-fields label:eq(1)').text(t.largeur);
  $('#rectangle-fields label:eq(2)').text(t.profondeur);
  $('#carre-fields label:eq(0)').text(t.cote);
  $('#carre-fields label:eq(1)').text(t.profondeur);
  $('#ronde-fields label:eq(0)').text(t.diametre);
  $('#ronde-fields label:eq(1)').text(t.profondeur);
  $('#ovale-fields label:eq(0)').text(t.grand_axe);
  $('#ovale-fields label:eq(1)').text(t.petit_axe);
  $('#ovale-fields label:eq(2)').text(t.profondeur);
  $('#libre-fields label:eq(0)').text(t.longueur_approx);
  $('#libre-fields label:eq(1)').text(t.largeur_approx);
  $('#libre-fields label:eq(2)').text(t.profondeur);
  
  $('#piscine label:contains("Temps")').text(t.temps_recycl);
  $('#canalisations label:contains("Diamètre")').text(t.diametre_canalisation);
  $('#canalisations label:contains("Matériau")').text(t.materiau);
  $('#canalisations h6:contains("Aspiration")').text(t.aspiration);
  $('#canalisations h6:contains("Refoulement")').text(t.refoulement);
  $('#canalisations label:contains("Longueur aspiration")').text(t.longueur_asp);
  $('#canalisations label:contains("Vitesse aspiration")').text(t.vitesse_asp);
  $('#canalisations label:contains("Longueur refoulement")').text(t.longueur_ref);
  $('#canalisations label:contains("Vitesse refoulement")').text(t.vitesse_ref);
  
  $('#materiau option[value="PVC_rigide"]').text(t.option_PVC_rigide);
  $('#materiau option[value="PVC_souple"]').text(t.option_PVC_souple);
  $('#materiau option[value="PE"]').text(t.option_PE);
  $('#materiau option[value="Turbulent"]').text(t.option_Turbulent);
  
  $('#pertes_singulieres h6:eq(0)').text(t.aspiration_tab);
  $('#pertes_singulieres h6:eq(1)').text(t.refoulement_tab);
  $('#pertes_singulieres label:contains("Coudes 90° court")').text(t.coudes90C);
  $('#pertes_singulieres label:contains("Coudes 90° grand")').text(t.coudes90G);
  $('#pertes_singulieres label:contains("Tés")').text(t.tes);
  $('#pertes_singulieres label:contains("Vannes")').text(t.vannes);
  
  $('#pression label:contains("Hauteur")').text(t.hauteur_geo);
  $('#pression label:contains("Perte filtre")').text(t.perte_filtre);
  
  $('#pieces label:contains("Skimmers")').text(t.skimmers);
  $('#pieces label:contains("Bondes")').text(t.bondes);
  $('#pieces label:contains("Refoulements")').text(t.refoulements);
  $('#pieces label:contains("Cascade")').text(t.cascade);
  
  $('#parametres label:contains("Type")').text(t.type_tuyau);
  $('#parametres label:contains("Section")').text(t.section_int);
  
  $('#inversee label:contains("Activer")').text(t.activer_inversee || "Activer étude inversée");
  $('#inversee p').text(t.inversee_text || "Entrez les débits et pertes pour calcul des vitesses et NPSH");
  $('#inversee label:contains("Débit")').text(t.debit_total || "Débit total (m3/h)");
  $('#inversee label:contains("Pertes")').text(t.pertes_totales_label || "Pertes totales (mCE)");

  calculerResultats();
}

// ====== INITIALISATION ======
$(document).ready(function(){
  // Gestion des changements de forme
  $('input[name="forme"]').on('change', function(){
    choixForme();
    calculerResultats();
  });
  
  // Gestion des événements pour recalculer
  $('input, select').on('input change', function(){
    calculerResultats();
  });
  
  // Inverse study toggle
  $('#activer_inversee').on('change', function(){
    $('#inversee_content').toggle(this.checked);
  });
  
  // Sélecteur de langue
  $('#lang-select').on('change', function(){ 
    setLanguage($(this).val()); 
  });
  
  // Initialisation
  choixForme();
  setLanguage('fr');
});
