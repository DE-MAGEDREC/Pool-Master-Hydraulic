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
    forme: "Pool shape",
    temps: "Water turnover time (h)",
    suivant: "Next →",
    resultats: "Results",
    pertes_sing: "Singular losses",
    filtre: "Filter loss",
    hauteur: "Geometric height",
    friction: "Pipe friction",
    total_asp: "Total suction",
    total_ref: "Total discharge",
    total_inst: "Total installation loss",
    exporter: "Export PDF",
    logout: "Logout",
    en_bar: " (bar)",
    accessoires: "Accessories"
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
    forme: "Forme piscine",
    temps: "Temps de recyclage (h)",
    suivant: "Suivant →",
    resultats: "Résultats",
    pertes_sing: "Pertes singulières",
    filtre: "Perte filtre",
    hauteur: "Hauteur géométrique",
    friction: "Friction canalisations",
    total_asp: "Total aspiration",
    total_ref: "Total refoulement",
    total_inst: "Pertes totales installation",
    exporter: "Exporter PDF",
    logout: "Déconnexion",
    en_bar: " (bar)",
    accessoires: "Accessoires"
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
    forme: "Forma piscina",
    temps: "Tiempo de reciclaje (h)",
    suivant: "Siguiente →",
    resultats: "Resultados",
    pertes_sing: "Pérdidas singulares",
    filtre: "Pérdida de filtro",
    hauteur: "Altura geométrica",
    friction: "Fricción tuberías",
    total_asp: "Total aspiración",
    total_ref: "Total impulsión",
    total_inst: "Pérdida total instalación",
    exporter: "Exportar PDF",
    logout: "Cerrar sesión",
    en_bar: " (bar)",
    accessoires: "Accesorios"
  }
};
let currentLang = "en";

// ====== Conversion mCE → bar ======
function mceToBar(val) { return (val*0.0981).toFixed(2); }

// ====== Navigation onglets ======
function suivant(id){
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
}

// ====== Calcul des pertes hydrauliques Darcy ======
function calculerResultats(){
  const t = translations[currentLang];

  // Piscine
  const forme = $('input[name="forme"]:checked').val();
  let surface=0, volume=0;
  const Lval = +$('#L').val() || 0;
  const lval = +$('#l').val() || 0;
  const pval = +$('#p').val() || 0;
  if(forme === "rectangle" || forme==="carre"){
    surface = Lval*lval;
    volume = surface*pval;
  } else {
    surface = Math.PI*Math.pow(Lval/2,2);
    volume = surface*pval;
  }

  // Débit filtration
  const t_recyclage = +$('#t').val() || 5;
  const debit = volume/t_recyclage;

  // Canalisations
  const D_mm = +$('#D').val() || 0;
  const D_m = D_mm/1000;
  const L_asp_val = +$('#L_asp').val() || 0;
  const v_asp = +$('#v_asp').val() || 0;
  const L_ref_val = +$('#L_ref').val() || 0;
  const v_ref = +$('#v_ref').val() || 0;

  const mat = $('#materiau').val();
  let lambda = 0.02; // défaut PVC Rigide
  if(mat === "PVC Souple") lambda = 0.035;
  else if(mat==="Turbulence") lambda = 0.316;

  // Darcy
  const g = 9.81;
  const H_fric_asp = lambda*L_asp_val/D_m*(v_asp**2)/(2*g);
  const H_fric_ref = lambda*L_ref_val/D_m*(v_ref**2)/(2*g);

  // Pertes singulières (accessoires)
  const coeffs = {
    coude90l:20, coude90c:30, coude45:12.5, te_droit:40, te_deriv:80,
    manchon:2.5, clapet:125, vanne:8
  };
  function calculAccessoires(prefix){
    return (
      ( +$(`#coude90l_${prefix}`).val() ||0 )*coeffs.coude90l*D_m +
      ( +$(`#coude90c_${prefix}`).val() ||0 )*coeffs.coude90c*D_m +
      ( +$(`#coude45_${prefix}`).val() ||0 )*coeffs.coude45*D_m +
      ( +$(`#te_droit_${prefix}`).val() ||0 )*coeffs.te_droit*D_m +
      ( +$(`#te_deriv_${prefix}`).val() ||0 )*coeffs.te_deriv*D_m +
      ( +$(`#manchon_${prefix}`).val() ||0 )*coeffs.manchon*D_m +
      ( +$(`#clapet_${prefix}`).val() ||0 )*coeffs.clapet*D_m +
      ( +$(`#vanne_${prefix}`).val() ||0 )*coeffs.vanne*D_m
    );
  }
  const H_sing_asp = calculAccessoires("asp");
  const H_sing_ref = calculAccessoires("ref");

  // Totaux
  const total_asp = H_fric_asp + H_sing_asp;
  const total_ref = H_fric_ref + H_sing_ref;
  const H_geo_val = +$('#H_geo').val() || 0;
  const dp_filtre_val = +$('#dp_filtre').val() || 0;
  const total_install = total_asp + total_ref + H_geo_val + dp_filtre_val;

  // Affichage
  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>

<b>${t.friction} ${t.total_asp} :</b> ${H_fric_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_asp)}${t.en_bar}</small><br>
<b>${t.accessoires} ${t.total_asp} :</b> ${H_sing_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_asp)}${t.en_bar}</small><br>
<b>${t.total_asp} :</b> ${total_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(total_asp)}${t.en_bar}</small><br><hr>

<b>${t.friction} ${t.total_ref} :</b> ${H_fric_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_ref)}${t.en_bar}</small><br>
<b>${t.accessoires} ${t.total_ref} :</b> ${H_sing_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_ref)}${t.en_bar}</small><br>
<b>${t.total_ref} :</b> ${total_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(total_ref)}${t.en_bar}</small><br><hr>

<b>${t.hauteur} :</b> ${H_geo_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_geo_val)}${t.en_bar}</small><br>
<b>${t.filtre} :</b> ${dp_filtre_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(dp_filtre_val)}${t.en_bar}</small><br>
<b>${t.total_inst} :</b> ${total_install.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(total_install)}${t.en_bar}</small>
`;
  $('#res').html(html);
  $('#res_droite').html(html);
}

// ====== Export PDF ======
$('#btn-pdf').on('click', function(){
  html2pdf().from(document.getElementById('res')).save();
});

// ====== Langue ======
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];

  $('#title').text(t.title);
  $('#tab-piscine').text(t.piscine_tab);
  $('#tab-canalisations').text(t.canalisations_tab);
  $('#tab-pertes').text(t.pertes_tab);
  $('#tab-pression').text(t.pression_tab);
  $('#tab-resultats').text(t.resultats_tab);
  $('#lbl-forme').text(t.forme);
  $('#lbl-t').text(t.temps);
  $('.btn-primary').text(t.suivant);
  $('#btn-pdf').text(t.exporter);
  
  calculerResultats();
}
$('#lang-select').on('change', function(){ setLanguage($(this).val()); });

// ====== Initialisation ======
$(document).ready(function(){
  setLanguage(currentLang);
  calculerResultats();
});
$('input, select').on('input change', calculerResultats);
