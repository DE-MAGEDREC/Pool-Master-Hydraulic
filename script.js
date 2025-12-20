// ==================== LANGUES ====================
const translations = {
  en: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Pool",
    canalisations_tab: "Pipes",
    pertes_tab: "Singular losses",
    pression_tab: "Pressure & Temperature",
    resultats_tab: "Results / PDF",
    forme: "Pool shape",
    rectangle: "Rectangular",
    carre: "Square",
    ronde: "Round",
    ovale: "Oval",
    libre: "Free shape",
    longueur: "Length (m)",
    largeur: "Width (m)",
    profondeur: "Depth (m)",
    temps_recyclage: "Recycling time (h)",
    dn: "DN (mm)",
    materiau: "Material",
    asp: "Suction",
    ref: "Discharge",
    L_asp: "Suction length (m)",
    v_asp: "Suction velocity (m/s)",
    L_ref: "Discharge length (m)",
    v_ref: "Discharge velocity (m/s)",
    accessoires: "Accessories",
    coudeL: "Elbow 90° long radius",
    coudeC: "Elbow 90° short radius",
    coude45: "Elbow 45°",
    teD: "Tee straight",
    teR: "Tee branch",
    manchon: "Coupling",
    clapet: "Non-return valve",
    vanne: "Valve",
    hauteur: "Geometric height",
    filtre: "Filter loss",
    debit: "Filtration flow rate",
    friction: "Pipe friction",
    total_asp: "Total suction",
    total_ref: "Total discharge",
    mce: " mCE",
    bar: " (bar)",
    suivant: "Next →",
    exporter: "Export PDF"
  },
  fr: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscine",
    canalisations_tab: "Canalisations",
    pertes_tab: "Pertes singulières",
    pression_tab: "Pression & Température",
    resultats_tab: "Résultats / PDF",
    forme: "Forme de la piscine",
    rectangle: "Rectangulaire",
    carre: "Carrée",
    ronde: "Ronde",
    ovale: "Ovale",
    libre: "Libre",
    longueur: "Longueur (m)",
    largeur: "Largeur (m)",
    profondeur: "Profondeur (m)",
    temps_recyclage: "Temps de recyclage (h)",
    dn: "DN (mm)",
    materiau: "Matériau",
    asp: "Aspiration",
    ref: "Refoulement",
    L_asp: "Longueur aspiration (m)",
    v_asp: "Vitesse aspiration (m/s)",
    L_ref: "Longueur refoulement (m)",
    v_ref: "Vitesse refoulement (m/s)",
    accessoires: "Accessoires",
    coudeL: "Coude 90° long rayon",
    coudeC: "Coude 90° court rayon",
    coude45: "Coude 45°",
    teD: "Té passage droit",
    teR: "Té dérivation",
    manchon: "Manchon",
    clapet: "Clapet anti-retour",
    vanne: "Vanne",
    hauteur: "Hauteur géométrique",
    filtre: "Perte filtre",
    debit: "Débit filtration",
    friction: "Friction canalisations",
    total_asp: "Total aspiration",
    total_ref: "Total refoulement",
    mce: " mCE",
    bar: " (bar)",
    suivant: "Suivant →",
    exporter: "Exporter PDF"
  },
  es: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscina",
    canalisations_tab: "Tuberías",
    pertes_tab: "Pérdidas singulares",
    pression_tab: "Presión & Temperatura",
    resultats_tab: "Resultados / PDF",
    forme: "Forma de la piscina",
    rectangle: "Rectangular",
    carre: "Cuadrada",
    ronde: "Redonda",
    ovale: "Oval",
    libre: "Libre",
    longueur: "Longitud (m)",
    largeur: "Ancho (m)",
    profondeur: "Profundidad (m)",
    temps_recyclage: "Tiempo reciclaje (h)",
    dn: "DN (mm)",
    materiau: "Material",
    asp: "Aspiración",
    ref: "Impulsión",
    L_asp: "Longitud aspiración (m)",
    v_asp: "Velocidad aspiración (m/s)",
    L_ref: "Longitud impulsión (m)",
    v_ref: "Velocidad impulsión (m/s)",
    accessoires: "Accesorios",
    coudeL: "Codo 90° radio largo",
    coudeC: "Codo 90° radio corto",
    coude45: "Codo 45°",
    teD: "Tee recto",
    teR: "Tee derivación",
    manchon: "Acople",
    clapet: "Válvula antirretorno",
    vanne: "Válvula",
    hauteur: "Altura geométrica",
    filtre: "Pérdida filtro",
    debit: "Caudal filtración",
    friction: "Fricción tuberías",
    total_asp: "Total aspiración",
    total_ref: "Total impulsión",
    mce: " mCE",
    bar: " (bar)",
    suivant: "Siguiente →",
    exporter: "Exportar PDF"
  }
};

let currentLang = "en";

// ==================== NAVIGATION ====================
function suivant(id){
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
}

// Bouton qui calcule puis passe à l'onglet suivant
function calculerEtSuivant(id){
  calculerResultats();
  suivant(id);
}

// ==================== CONVERSION ====================
function mceToBar(val){ return (val*0.0981).toFixed(2); }

// ==================== CALCUL ====================
function calculerResultats(){
  const t = translations[currentLang];

  // ===== Piscine =====
  let surface=0, volume=0;
  const forme = $('#forme').val();
  const Lval = +$('#L').val() || 0;
  const lval = +$('#l').val() || 0;
  const pval = +$('#p').val() || 0;
  const t_recyclage = +$('#t').val() || 5;

  if(forme==='rectangle' || forme==='carre') surface = Lval * lval;
  else surface = Math.PI*Math.pow(Lval/2,2); // simple approximation pour ronde/ovale

  volume = surface * pval;

  const debit = volume / t_recyclage;

  // ===== Canalisations =====
  const D_mm = +$('#D').val() || 0;
  const D_m = D_mm / 1000;
  const L_asp_val = +$('#L_asp').val() || 0;
  const v_asp_val = +$('#v_asp').val() || 0;
  const L_ref_val = +$('#L_ref').val() || 0;
  const v_ref_val = +$('#v_ref').val() || 0;

  // λ en fonction du matériau
  let materiau = $('#materiau').val();
  let lambda = 0.02;
  if(materiau==='PVC') lambda=0.02;
  else if(materiau==='PVC_souple') lambda=0.035;
  else if(materiau==='Turbulence') lambda=0.316;

  // Pertes friction
  const g = 9.81;
  const H_fric_asp = lambda * L_asp_val / D_m * (v_asp_val**2)/(2*g);
  const H_fric_ref = lambda * L_ref_val / D_m * (v_ref_val**2)/(2*g);

  // ===== Pertes singulières =====
  const coeffs = {
    coudeL: 20,
    coudeC: 30,
    coude45: 12.5,
    teD: 40,
    teR: 80,
    manchon: 2.5,
    clapet: 125,
    vanne: 8
  };

  function calculPertesSing(aspouref){
    let H = 0;
    for(let key in coeffs){
      H += (+$('#'+key+'_'+aspouref).val()||0) * D_m * coeffs[key];
    }
    return H;
  }

  const H_sing_asp = calculPertesSing('asp');
  const H_sing_ref = calculPertesSing('ref');

  // Hauteur et filtre
  const H_geo_val = +$('#H_geo').val() || 0;
  const dp_filtre_val = +$('#dp_filtre').val() || 0;

  const H_total_asp = H_geo_val + dp_filtre_val + H_fric_asp + H_sing_asp;
  const H_total_ref = H_geo_val + dp_filtre_val + H_fric_ref + H_sing_ref;

  // ===== Affichage =====
  const html = `
<b>${t.longueur} :</b> ${Lval.toFixed(2)} m<br>
<b>${t.largeur} :</b> ${lval.toFixed(2)} m<br>
<b>${t.profondeur} :</b> ${pval.toFixed(2)} m<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>

<b>${t.friction} ${t.asp} :</b> ${H_fric_asp.toFixed(2)}${t.mce}<br>
<small>≈ ${mceToBar(H_fric_asp)}${t.bar}</small><br>
<b>${t.friction} ${t.ref} :</b> ${H_fric_ref.toFixed(2)}${t.mce}<br>
<small>≈ ${mceToBar(H_fric_ref)}${t.bar}</small><br>

<b>${t.accessoires} ${t.asp} :</b> ${H_sing_asp.toFixed(2)}${t.mce}<br>
<small>≈ ${mceToBar(H_sing_asp)}${t.bar}</small><br>
<b>${t.accessoires} ${t.ref} :</b> ${H_sing_ref.toFixed(2)}${t.mce}<br>
<small>≈ ${mceToBar(H_sing_ref)}${t.bar}</small><br>

<b>${t.hauteur} :</b> ${H_geo_val.toFixed(2)}${t.mce}<br>
<b>${t.filtre} :</b> ${dp_filtre_val.toFixed(2)}${t.mce}<br><hr>

<b>${t.total_asp} :</b> ${H_total_asp.toFixed(2)}${t.mce}<br>
<small>≈ ${mceToBar(H_total_asp)}${t.bar}</small><br>
<b>${t.total_ref} :</b> ${H_total_ref.toFixed(2)}${t.mce}<br>
<small>≈ ${mceToBar(H_total_ref)}${t.bar}</small>
  `;

  $('#res').html(html);
  $('#res_droite').html(html);
}

// ==================== EXPORT PDF ====================
$('#btn-pdf').on('click', function(){
  html2pdf().from(document.getElementById('res')).save();
});

// ==================== LANGUE ====================
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];

  $('h2.text-center').text(t.title);
  $('.nav-link').each((i,el)=>{
    if(i==0) $(el).text(t.piscine_tab);
    else if(i==1) $(el).text(t.canalisations_tab);
    else if(i==2) $(el).text(t.pertes_tab);
    else if(i==3) $(el).text(t.pression_tab);
    else if(i==4) $(el).text(t.resultats_tab);
  });

  $('#lbl-forme').text(t.forme);
  $('#forme option[value="rectangle"]').text(t.rectangle);
  $('#forme option[value="carre"]').text(t.carre);
  $('#forme option[value="ronde"]').text(t.ronde);
  $('#forme option[value="ovale"]').text(t.ovale);
  $('#forme option[value="libre"]').text(t.libre);

  $('#lbl-longueur').text(t.longueur);
  $('#lbl-largeur').text(t.largeur);
  $('#lbl-profondeur').text(t.profondeur);
  $('#lbl-t').text(t.temps_recyclage);
  $('#lbl-dn').text(t.dn);
  $('#lbl-materiau').text(t.materiau);
  $('#lbl-asp').text(t.asp);
  $('#lbl-ref').text(t.ref);
  $('#lbl-L_asp').text(t.L_asp);
  $('#lbl-v_asp').text(t.v_asp);
  $('#lbl-L_ref').text(t.L_ref);
  $('#lbl-v_ref').text(t.v_ref);

  calculerResultats();
}

$('#lang-select').on('change', function(){ setLanguage($(this).val()); });

// ==================== INITIALISATION ====================
$(document).ready(function(){
  setLanguage(currentLang);
  calculerResultats();
});

// ==================== ÉVÉNEMENTS TEMPS RÉEL ====================
$('input, select').on('input change', calculerResultats);
