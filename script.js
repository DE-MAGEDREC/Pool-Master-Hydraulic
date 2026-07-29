// ====== TRADUCTIONS ======
var translations = {
  fr: {
    title: "Pool Master Hydraulic",
    logout: "Déconnexion",
    langue: "Langue :",
    suivant: "Suivant →",
    exporter: "Afficher le rapport complet",
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
    point_decimal: "⚠️ Utilisez le point pour les décimales (ex: 1.5 pour 1,5 mètre)",
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
    aide_vitesse_asp: "⚠️ Valeur de référence : 1.5 m/s",
    longueur_ref: "Longueur refoulement (m)",
    vitesse_ref: "Vitesse refoulement (m/s)",
    aide_vitesse_ref: "⚠️ Valeur de référence : 2.0 m/s",
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
    mention: "Les valeurs présentées sont indicatives et permettent une approche dimensionnelle.",
    imprimer: "🖨️ Imprimer",
    fermer: "✖ Fermer",
    diametre_interieur: "Diamètre intérieur",
    vitesse_ecoulement: "Vitesse d'écoulement",
    dn_selectionne: "DN sélectionné",
    coeff_k_adaptes: "(coefficients K adaptés au DN)"
  },
  en: {
    title: "Pool Master Hydraulic",
    logout: "Logout",
    langue: "Language:",
    suivant: "Next →",
    exporter: "View full report",
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
    point_decimal: "⚠️ Use decimal point (ex: 1.5 for 1.5 meters)",
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
    aide_vitesse_asp: "⚠️ Reference value: 1.5 m/s",
    longueur_ref: "Discharge length (m)",
    vitesse_ref: "Discharge velocity (m/s)",
    aide_vitesse_ref: "⚠️ Reference value: 2.0 m/s",
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
    mention: "The values presented are indicative and allow a dimensional approach.",
    imprimer: "🖨️ Print",
    fermer: "✖ Close",
    diametre_interieur: "Internal diameter",
    vitesse_ecoulement: "Flow velocity",
    dn_selectionne: "DN selected",
    coeff_k_adaptes: "(K coefficients adapted to DN)"
  },
  es: {
    title: "Pool Master Hydraulic",
    logout: "Cerrar sesión",
    langue: "Idioma:",
    suivant: "Siguiente →",
    exporter: "Ver informe completo",
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
    point_decimal: "⚠️ Use punto decimal (ej: 1.5 para 1,5 metros)",
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
    aide_vitesse_asp: "⚠️ Valor de referencia: 1.5 m/s",
    longueur_ref: "Longitud impulsión (m)",
    vitesse_ref: "Velocidad impulsión (m/s)",
    aide_vitesse_ref: "⚠️ Valor de referencia: 2.0 m/s",
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
    mention: "Los valores presentados son indicativos y permiten un enfoque dimensional.",
    imprimer: "🖨️ Imprimir",
    fermer: "✖ Cerrar",
    diametre_interieur: "Diámetro interior",
    vitesse_ecoulement: "Velocidad de flujo",
    dn_selectionne: "DN seleccionado",
    coeff_k_adaptes: "(coeficientes K adaptados al DN)"
  }
};

var currentLang = 'fr';

// ====== TABLE DES COEFFICIENTS K ======
var K_TABLE = {
  20: { coude90C: 1.70, coude90G: 0.40, coude45: 0.40, te: 2.00, vanne: 0.08 },
  25: { coude90C: 1.60, coude90G: 0.38, coude45: 0.38, te: 1.90, vanne: 0.07 },
  32: { coude90C: 1.50, coude90G: 0.35, coude45: 0.35, te: 1.80, vanne: 0.06 },
  40: { coude90C: 1.50, coude90G: 0.35, coude45: 0.35, te: 1.80, vanne: 0.05 },
  50: { coude90C: 1.50, coude90G: 0.35, coude45: 0.35, te: 1.80, vanne: 0.05 },
  63: { coude90C: 1.40, coude90G: 0.33, coude45: 0.33, te: 1.70, vanne: 0.05 },
  75: { coude90C: 1.40, coude90G: 0.33, coude45: 0.33, te: 1.70, vanne: 0.05 },
  90: { coude90C: 1.40, coude90G: 0.32, coude45: 0.32, te: 1.60, vanne: 0.05 }
};

var DN_REFERENCES = { 20: 15.0, 25: 20.0, 32: 26.0, 40: 34.0, 50: 46.0, 63: 57.4, 75: 68.0, 90: 83.0 };

// ====== FONCTIONS ======
function getDNFromDiameter(d) { if (!d || d <= 0) return 50; var dn = 50, min = Math.abs(d - 46); for (var key in DN_REFERENCES) { var ecart = Math.abs(d - DN_REFERENCES[key]); if (ecart < min) { min = ecart; dn = parseInt(key); } } return dn; }

function getKValues(dn) { if (K_TABLE[dn]) return K_TABLE[dn]; var dnProche = 50; for (var d in K_TABLE) { if (Math.abs(dn - parseInt(d)) < Math.abs(dn - dnProche)) dnProche = parseInt(d); } return K_TABLE[dnProche]; }

function mceToBar(v) { return (v * 0.0981).toFixed(2); }
function mceToPsi(v) { return (v * 1.422).toFixed(2); }

function suivant(id) {
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $('a[href="' + id + '"]').addClass('active');
  calculerResultats();
}

function choixForme() {
  var f = $('input[name="forme"]:checked').val();
  $('.forme-fields').hide();
  if (f == "rectangle") $('#rectangle-fields').show();
  else if (f == "carre") $('#carre-fields').show();
  else if (f == "ronde") $('#ronde-fields').show();
  else if (f == "ovale") $('#ovale-fields').show();
  else if (f == "libre") $('#libre-fields').show();
  calculerResultats();
}

// ====== CALCUL PRINCIPAL ======
function calculerResultats() {
  try {
    var t = translations[currentLang];
    var forme = $('input[name="forme"]:checked').val();
    var t_renouv = parseFloat($('#t_recycl').val()) || 5;
    var diametreInt = parseFloat($('#D').val()) || 46;
    var v_asp = parseFloat($('#v_asp').val()) || 1.5;
    var v_ref = parseFloat($('#v_ref').val()) || 2.0;
    var L_asp = parseFloat($('#L_asp').val()) || 0;
    var L_ref = parseFloat($('#L_ref').val()) || 0;
    var H_geo = parseFloat($('#H_geo').val()) || 0;
    var dp_filtre = parseFloat($('#dp_filtre').val()) || 0;

    var c90C_asp = parseFloat($('#coudes90C_asp').val()) || 0;
    var c90G_asp = parseFloat($('#coudes90G_asp').val()) || 0;
    var c45_asp = parseFloat($('#coudes45_asp').val()) || 0;
    var tes_asp = parseFloat($('#tes_asp').val()) || 0;
    var vannes_asp = parseFloat($('#vannes_asp').val()) || 0;
    var c90C_ref = parseFloat($('#coudes90C_ref').val()) || 0;
    var c90G_ref = parseFloat($('#coudes90G_ref').val()) || 0;
    var c45_ref = parseFloat($('#coudes45_ref').val()) || 0;
    var tes_ref = parseFloat($('#tes_ref').val()) || 0;
    var vannes_ref = parseFloat($('#vannes_ref').val()) || 0;

    var surface = 0, volume = 0;
    var L = parseFloat($('#L').val()) || 0;
    var l = parseFloat($('#l').val()) || 0;
    var p = parseFloat($('#p').val()) || 0;

    if (forme == "rectangle") { surface = L * l; volume = surface * p; }
    else if (forme == "carre") { var c = parseFloat($('#cote').val()) || 0; var pc = parseFloat($('#p_carre').val()) || 0; surface = c * c; volume = surface * pc; }
    else if (forme == "ronde") { var d = parseFloat($('#D_piscine').val()) || 0; var pr = parseFloat($('#p_r').val()) || 0; surface = Math.PI * Math.pow(d / 2, 2); volume = surface * pr; }
    else if (forme == "ovale") { var a = parseFloat($('#a_ovale').val()) || 0; var b = parseFloat($('#b_ovale').val()) || 0; var po = parseFloat($('#p_o').val()) || 0; surface = Math.PI * (a / 2) * (b / 2); volume = surface * po; }
    else if (forme == "libre") { var Ll = parseFloat($('#L_libre').val()) || 0; var ll = parseFloat($('#l_libre').val()) || 0; var pl = parseFloat($('#p_libre').val()) || 0; surface = Ll * ll; volume = surface * pl; }

    var debit = t_renouv > 0 ? volume / t_renouv : 0;
    var DN = diametreInt / 1000;
    var dnCommercial = getDNFromDiameter(diametreInt);
    var kValues = getKValues(dnCommercial);

    var mat = $('#materiau').val();
    var lambda = 0.02;
    if (mat == "PVC_souple") lambda = 0.035;
    else if (mat == "Turbulent") lambda = 0.316;
    else if (mat == "PE") lambda = 0.025;

    var H_fric_asp = DN > 0 ? lambda * L_asp / DN * Math.pow(v_asp, 2) / (2 * 9.81) : 0;
    var H_fric_ref = DN > 0 ? lambda * L_ref / DN * Math.pow(v_ref, 2) / (2 * 9.81) : 0;

    var K_asp = (c90C_asp * kValues.coude90C) + (c90G_asp * kValues.coude90G) + (c45_asp * kValues.coude45) + (tes_asp * kValues.te) + (vannes_asp * kValues.vanne);
    var K_ref = (c90C_ref * kValues.coude90C) + (c90G_ref * kValues.coude90G) + (c45_ref * kValues.coude45) + (tes_ref * kValues.te) + (vannes_ref * kValues.vanne);

    var H_sing_asp = K_asp * (Math.pow(v_asp, 2) / (2 * 9.81));
    var H_sing_ref = K_ref * (Math.pow(v_ref, 2) / (2 * 9.81));

    var H_total_asp = H_sing_asp + H_fric_asp;
    var H_total_ref = H_sing_ref + H_fric_ref;
    var H_total = H_total_asp + H_total_ref + H_geo + dp_filtre;

    var html = '<b>' + t.surface + ' :</b> ' + surface.toFixed(2) + ' m²<br>' +
               '<b>' + t.volume + ' :</b> ' + volume.toFixed(2) + ' m³<br>' +
               '<b>' + t.debit + ' :</b> ' + debit.toFixed(2) + ' m³/h<br>' +
               '<b>' + t.diametre_interieur + ' :</b> ' + diametreInt.toFixed(1) + ' mm<br>' +
               '<b>' + t.dn_selectionne + ' :</b> ' + dnCommercial + ' <span style="color:#0066cc;font-size:12px;">' + t.coeff_k_adaptes + '</span><br><hr>' +
               '<b>' + t.pertes_sing_asp + ' :</b> ' + H_sing_asp.toFixed(2) + ' mCE<br>' +
               '<small>≈ ' + mceToBar(H_sing_asp) + ' ' + t.en_bar + ' | ' + mceToPsi(H_sing_asp) + ' ' + t.en_psi + '</small><br>' +
               '<b>' + t.pertes_sing_ref + ' :</b> ' + H_sing_ref.toFixed(2) + ' mCE<br>' +
               '<small>≈ ' + mceToBar(H_sing_ref) + ' ' + t.en_bar + ' | ' + mceToPsi(H_sing_ref) + ' ' + t.en_psi + '</small><br>' +
               '<b>' + t.hauteur + ' :</b> ' + H_geo.toFixed(2) + ' mCE<br>' +
               '<small>≈ ' + mceToBar(H_geo) + ' ' + t.en_bar + ' | ' + mceToPsi(H_geo) + ' ' + t.en_psi + '</small><br>' +
               '<b>' + t.filtre + ' :</b> ' + dp_filtre.toFixed(2) + ' mCE<br>' +
               '<small>≈ ' + mceToBar(dp_filtre) + ' ' + t.en_bar + ' | ' + mceToPsi(dp_filtre) + ' ' + t.en_psi + '</small><br>' +
               '<b>' + t.friction + ' ' + t.aspiration.toLowerCase() + ' :</b> ' + H_fric_asp.toFixed(2) + ' mCE<br>' +
               '<small>≈ ' + mceToBar(H_fric_asp) + ' ' + t.en_bar + ' | ' + mceToPsi(H_fric_asp) + ' ' + t.en_psi + '</small><br>' +
               '<b>' + t.friction + ' ' + t.refoulement.toLowerCase() + ' :</b> ' + H_fric_ref.toFixed(2) + ' mCE<br>' +
               '<small>≈ ' + mceToBar(H_fric_ref) + ' ' + t.en_bar + ' | ' + mceToPsi(H_fric_ref) + ' ' + t.en_psi + '</small><br><hr>' +
               '<b>' + t.total_asp + ' :</b> ' + H_total_asp.toFixed(2) + ' mCE<br>' +
               '<small>≈ ' + mceToBar(H_total_asp) + ' ' + t.en_bar + ' | ' + mceToPsi(H_total_asp) + ' ' + t.en_psi + '</small><br>' +
               '<b>' + t.total_ref + ' :</b> ' + H_total_ref.toFixed(2) + ' mCE<br>' +
               '<small>≈ ' + mceToBar(H_total_ref) + ' ' + t.en_bar + ' | ' + mceToPsi(H_total_ref) + ' ' + t.en_psi + '</small><br>' +
               '<b>' + t.pertes_totales + ' :</b> ' + H_total.toFixed(2) + ' mCE<br>' +
               '<small>≈ ' + mceToBar(H_total) + ' ' + t.en_bar + ' | ' + mceToPsi(H_total) + ' ' + t.en_psi + '</small>';

    $('#res').html(html);
    $('#resultats-content').html(html);

  } catch (e) {
    $('#res').html('<p class="text-danger">Erreur de calcul</p>');
    $('#resultats-content').html('<p class="text-danger">Erreur de calcul</p>');
  }
}

// ====== OUVERTURE RAPPORT ======
function ouvrirRapport() {
  var t = translations[currentLang];
  var contenu = $('#res').html();
  if (!contenu || contenu.indexOf('Erreur') >= 0 || contenu.indexOf('En attente') >= 0) {
    alert(t.en_attente);
    return;
  }

  var now = new Date();
  var dateStr = now.toLocaleDateString('fr-FR');
  var heureStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  var rapport = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + t.rapport + '</title><style>' +
    'body { font-family: Arial, sans-serif; padding: 30px; max-width: 900px; margin: 0 auto; }' +
    'h1 { color: #003366; text-align: center; border-bottom: 3px solid #003366; padding-bottom: 15px; }' +
    'h2 { text-align: center; color: #0066cc; }' +
    '.infos { text-align: center; color: #666; margin-bottom: 20px; }' +
    '.mention { margin-top: 30px; padding: 15px; background: #f8f9fa; border-left: 4px solid #ffc107; }' +
    '.footer { text-align: center; color: #999; margin-top: 30px; border-top: 2px solid #ccc; padding-top: 15px; }' +
    '@media print { body { padding: 20px; } }' +
    '</style></head><body>' +
    '<h1>' + t.rapport + '</h1>' +
    '<h2>' + t.title + '</h2>' +
    '<div class="infos">' + t.date + ' : ' + dateStr + ' | ' + t.heure + ' : ' + heureStr + '</div><hr>' +
    contenu +
    '<hr><div class="mention">⚠️ ' + t.mention + '</div>' +
    '<div class="footer">' + t.title + ' - ' + dateStr + ' ' + heureStr + '</div>' +
    '<script>window.onload=function(){setTimeout(function(){window.print();},500);}<\/script>' +
    '</body></html>';

  var fenetre = window.open('', '_blank', 'width=900,height=800,scrollbars=yes');
  if (fenetre) { fenetre.document.write(rapport); fenetre.document.close(); } 
  else { alert('Veuillez autoriser les popups'); }
}

// ====== TRADUCTION ======
function setLanguage(lang) {
  currentLang = lang;
  var t = translations[lang];

  // Titres
  $('#main-title').text(t.title);
  $('#logout-btn').text(t.logout);
  $('#lang-label').text(t.langue);
  $('#btn-rapport').text('📄 ' + t.exporter);
  $('#res-droite-title').text(t.resultats);
  $('#resultats-content').text(t.en_attente);
  $('.btn-primary').text(t.suivant);

  // Onglets
  $('#tab-piscine').text(t.tab_piscine);
  $('#tab-canalisations').text(t.tab_canalisations);
  $('#tab-pertes').text(t.tab_pertes);
  $('#tab-pression').text(t.tab_pression);
  $('#tab-resultats').text(t.tab_resultats);

  // Piscine
  $('#label-forme').text(t.forme);
  $('#label-rectangle').text(t.rectangle);
  $('#label-carre').text(t.carre);
  $('#label-ronde').text(t.ronde);
  $('#label-ovale').text(t.ovale);
  $('#label-libre').text(t.libre);
  $('#label-point').html(t.point_decimal);
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

  // Canalisations
  $('#label-diametre-canalisation').text(t.diametre_canalisation);
  $('#aide-diametre').text(t.aide_diametre);
  $('#label-materiau').text(t.materiau);
  $('#label-aspiration').text(t.aspiration);
  $('#label-refoulement').text(t.refoulement);
  $('#label-Lasp').text(t.longueur_asp);
  $('#label-vasp').text(t.vitesse_asp);
  $('#aide-vasp').text(t.aide_vitesse_asp);
  $('#label-Lref').text(t.longueur_ref);
  $('#label-vref').text(t.vitesse_ref);
  $('#aide-vref').text(t.aide_vitesse_ref);
  $('#opt-PVC_rigide').text(t.option_PVC_rigide);
  $('#opt-PVC_souple').text(t.option_PVC_souple);
  $('#opt-PE').text(t.option_PE);
  $('#opt-Turbulent').text(t.option_Turbulent);

  // Pertes singulières
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

  // Pression
  $('#label-Hgeo').text(t.hauteur_geo);
  $('#label-dpfiltre').text(t.perte_filtre);

  // Résultats
  $('#label-resultats-title').text(t.resultats_title);

  calculerResultats();
}

// ====== INITIALISATION ======
$(document).ready(function() {
  // Événements sur les radios de forme
  $('.forme-radio').on('change', function() { 
    choixForme(); 
  });

  // Événements sur tous les inputs et selects avec la classe input-calc
  $(document).on('input change', '.input-calc', function() { 
    calculerResultats(); 
  });

  // Bouton rapport
  $('#btn-rapport').on('click', function() { 
    ouvrirRapport(); 
  });

  // Sélecteur de langue
  $('#lang-select').on('change', function() { 
    setLanguage($(this).val()); 
  });

  // Initialisation
  choixForme();
  setLanguage('fr');
});
