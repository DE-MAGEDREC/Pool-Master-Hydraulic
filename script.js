// ===== Traductions =====
const translations = {
  fr: {
    title: "Pool Master Hydraulic",
    piscine: "Piscine",
    canalisations: "Canalisations",
    pertes: "Pertes singulières",
    pression: "Pression & Température",
    resultats: "Résultats",
    rect: "Rectangulaire",
    ronde: "Ronde",
    longueur: "Longueur (m)",
    largeur: "Largeur (m)",
    profondeur: "Profondeur (m)",
    diametre: "Diamètre (m)",
    t_renouv: "Temps de recyclage (h)",
    D: "Diamètre (mm)",
    materiau: "Matériau",
    Lasp: "Longueur aspiration (m)",
    vasp: "Vitesse aspiration (m/s)",
    Lref: "Longueur refoulement (m)",
    vref: "Vitesse refoulement (m/s)",
    coudes_asp: "Coudes aspiration",
    tes_asp: "Tés aspiration",
    vannes_asp: "Vannes aspiration",
    coudes_ref: "Coudes refoulement",
    tes_ref: "Tés refoulement",
    vannes_ref: "Vannes refoulement",
    Hgeo: "Hauteur géométrique (m)",
    dpfiltre: "Perte filtre (mCE)",
    suivant: "Suivant →",
    exporter: "Exporter PDF",
    surface: "Surface",
    volume: "Volume",
    debit: "Débit filtration",
    pertes_sing_asp: "Pertes sing. asp",
    pertes_sing_ref: "Pertes sing. ref",
    friction_asp: "Friction asp",
    friction_ref: "Friction ref",
    total_asp: "Total asp",
    total_ref: "Total ref",
    en_bar: " bar"
  },
  en: {
    title: "Pool Master Hydraulic",
    piscine: "Pool",
    canalisations: "Pipes",
    pertes: "Singular losses",
    pression: "Pressure & Temperature",
    resultats: "Results",
    rect: "Rectangular",
    ronde: "Round",
    longueur: "Length (m)",
    largeur: "Width (m)",
    profondeur: "Depth (m)",
    diametre: "Diameter (m)",
    t_renouv: "Renewal time (h)",
    D: "Diameter (mm)",
    materiau: "Material",
    Lasp: "Suction length (m)",
    vasp: "Suction speed (m/s)",
    Lref: "Discharge length (m)",
    vref: "Discharge speed (m/s)",
    coudes_asp: "Elbows suction",
    tes_asp: "Tees suction",
    vannes_asp: "Valves suction",
    coudes_ref: "Elbows discharge",
    tes_ref: "Tees discharge",
    vannes_ref: "Valves discharge",
    Hgeo: "Geometric height (m)",
    dpfiltre: "Filter loss (mCE)",
    suivant: "Next →",
    exporter: "Export PDF",
    surface: "Surface",
    volume: "Volume",
    debit: "Filtration flow",
    pertes_sing_asp: "Sing. losses suction",
    pertes_sing_ref: "Sing. losses discharge",
    friction_asp: "Pipe friction suction",
    friction_ref: "Pipe friction discharge",
    total_asp: "Total suction",
    total_ref: "Total discharge",
    en_bar: " bar"
  },
  es: {
    title: "Pool Master Hydraulic",
    piscine: "Piscina",
    canalisations: "Tuberías",
    pertes: "Pérdidas singulares",
    pression: "Presión & Temperatura",
    resultats: "Resultados",
    rect: "Rectangular",
    ronde: "Redonda",
    longueur: "Longitud (m)",
    largeur: "Ancho (m)",
    profondeur: "Profundidad (m)",
    diametre: "Diámetro (m)",
    t_renouv: "Tiempo de renovación (h)",
    D: "Diámetro (mm)",
    materiau: "Material",
    Lasp: "Longitud aspiración (m)",
    vasp: "Velocidad aspiración (m/s)",
    Lref: "Longitud impulsión (m)",
    vref: "Velocidad impulsión (m/s)",
    coudes_asp: "Codos aspiración",
    tes_asp: "Tés aspiración",
    vannes_asp: "Válvulas aspiración",
    coudes_ref: "Codos impulsión",
    tes_ref: "Tés impulsión",
    vannes_ref: "Válvulas impulsión",
    Hgeo: "Altura geométrica (m)",
    dpfiltre: "Pérdida filtro (mCE)",
    suivant: "Siguiente →",
    exporter: "Exportar PDF",
    surface: "Superficie",
    volume: "Volumen",
    debit: "Caudal filtración",
    pertes_sing_asp: "Pérdidas sing. asp",
    pertes_sing_ref: "Pérdidas sing. ref",
    friction_asp: "Fricción asp",
    friction_ref: "Fricción ref",
    total_asp: "Total aspiración",
    total_ref: "Total impulsión",
    en_bar: " bar"
  }
};

// ===== Variables =====
let currentLang = "fr";

// ===== Navigation onglets =====
function suivant(id){
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
}

// ===== Forme piscine =====
function choixForme(){
  const f = $('input[name="forme"]:checked').val();
  $('.forme-fields').hide();
  if(f==="rectangle") $('#rectangle-fields').show();
  else $('#ronde-fields').show();
}

// ===== Conversion mCE -> bar =====
function mceToBar(val){ return (val*0.0981).toFixed(2); }

// ===== Calcul résultats =====
function calculerResultats(){
  const t = translations[currentLang];

  // Piscine
  const forme = $('input[name="forme"]:checked').val();
  let surface=0, volume=0;
  if(forme==="rectangle"){
    surface = (+$('#L').val()||0)*(+$('#l').val()||0);
    volume = surface*(+$('#p').val()||0);
  } else {
    surface = Math.PI*Math.pow((+$('#D_piscine').val()||0)/2,2);
    volume = surface*(+$('#p_r').val()||0);
  }
  const t_renouv = +$('#t_renouv').val()||5;
  const debit = volume/t_renouv;

  // Pertes singulières
  const H_sing_asp = (+$('#coudes_asp').val()||0)+(+$('#tes_asp').val()||0)+(+$('#vannes_asp').val()||0);
  const H_sing_ref = (+$('#coudes_ref').val()||0)+(+$('#tes_ref').val()||0)+(+$('#vannes_ref').val()||0);

  // Hauteur & filtre
  const H_geo_val = +$('#H_geo').val()||0;
  const dp_filtre_val = +$('#dp_filtre').val()||0;

  // Canalisations
  const H_fric_asp = (+$('#L_asp').val()||0)*0.02;
  const H_fric_ref = (+$('#L_ref').val()||0)*0.02;

  // Totaux
  const H_total_asp = H_geo_val + dp_filtre_val + H_sing_asp + H_fric_asp;
  const H_total_ref = H_geo_val + dp_filtre_val + H_sing_ref + H_fric_ref;

  // Affichage
  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>
<b>${t.pertes_sing_asp} :</b> ${H_sing_asp.toFixed(2)} mCE ≈ ${mceToBar(H_sing_asp)}${t.en_bar}<br>
<b>${t.pertes_sing_ref} :</b> ${H_sing_ref.toFixed(2)} mCE ≈ ${mceToBar(H_sing_ref)}${t.en_bar}<br>
<b>${t.Hgeo} :</b> ${H_geo_val.toFixed(2)} mCE ≈ ${mceToBar(H_geo_val)}${t.en_bar}<br>
<b>${t.dpfiltre} :</b> ${dp_filtre_val.toFixed(2)} mCE ≈ ${mceToBar(dp_filtre_val)}${t.en_bar}<br>
<b>${t.friction_asp} :</b> ${H_fric_asp.toFixed(2)} mCE ≈ ${mceToBar(H_fric_asp)}${t.en_bar}<br>
<b>${t.friction_ref} :</b> ${H_fric_ref.toFixed(2)} mCE ≈ ${mceToBar(H_fric_ref)}${t.en_bar}<br><hr>
<b>${t.total_asp} :</b> ${H_total_asp.toFixed(2)} mCE ≈ ${mceToBar(H_total_asp)}${t.en_bar}<br>
<b>${t.total_ref} :</b> ${H_total_ref.toFixed(2)} mCE ≈ ${mceToBar(H_total_ref)}${t.en_bar}
`;

  $('#res').html(html);
  $('#res_droite').html(html);
}

// ===== Export PDF =====
$('#btn-pdf').on('click', function(){ html2pdf().from(document.getElementById('res')).save(); });

// ===== Traduction dynamique =====
function traduire(){
  const t = translations[currentLang];
  $('#title').text(t.title);
  $('#tab-piscine').text(t.piscine);
  $('#tab-canalisations').text(t.canalisations);
  $('#tab-pertes').text(t.pertes);
  $('#tab-pression').text(t.pression);
  $('#tab-resultats').text(t.resultats);
  $('#lbl-forme').text(t.lbl_forme || "Forme de la piscine");
  $('#lbl-rect').text(t.rect);
  $('#lbl-ronde').text(t.ronde);
  $('#lbl-longueur').text(t.longueur);
  $('#lbl-largeur').text(t.largeur);
  $('#lbl-profondeur').text(t.profondeur);
  $('#lbl-t_renouv').text(t.t_renouv);
  $('#lbl-diametre').text(t.diametre);
  $('#lbl-profond_r').text(t.profondeur);
  $('#lbl-D').text(t.D);
  $('#lbl-materiau').text(t.materiau);
  $('#lbl-Lasp').text(t.Lasp);
  $('#lbl-vasp').text(t.vasp);
  $('#lbl-Lref').text(t.Lref);
  $('#lbl-vref').text(t.vref);
  $('#lbl-coudes_asp').text(t.coudes_asp);
  $('#lbl-tes_asp').text(t.tes_asp);
  $('#lbl-vannes_asp').text(t.vannes_asp);
  $('#lbl-coudes_ref').text(t.coudes_ref);
  $('#lbl-tes_ref').text(t.tes_ref);
  $('#lbl-vannes_ref').text(t.vannes_ref);
  $('#lbl-Hgeo').text(t.Hgeo);
  $('#lbl-dpfiltre').text(t.dpfiltre);
  $('#btn-suivant1, #btn-suivant2, #btn-suivant3, #btn-suivant4').text(t.suivant);
  $('#btn-pdf').text(t.exporter);
  $('#lbl-resultats').text(t.resultats);

  calculerResultats();
}

// ===== Événements =====
$('input, select').on('input change', calculerResultats);

$('#lang-select').on('change', function(){
  currentLang = $(this).val();
  traduire();
});

$(document).ready(function(){
  choixForme();
  traduire();
});
