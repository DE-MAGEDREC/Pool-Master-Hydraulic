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
    forme_rect: "Rectangle",
    forme_carre: "Square",
    forme_rond: "Round",
    forme_ovale: "Oval",
    forme_libre: "Free shape",
    recyclage: "Water renewal time (h)",
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
    longueur: "Longueur (m)",
    largeur: "Largeur (m)",
    profondeur: "Profondeur (m)",
    forme_rect: "Rectangle",
    forme_carre: "Carré",
    forme_rond: "Ronde",
    forme_ovale: "Ovale",
    forme_libre: "Forme libre",
    recyclage: "Temps de recyclage de l'eau (h)",
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
    longueur: "Longitud (m)",
    largeur: "Ancho (m)",
    profondeur: "Profundidad (m)",
    forme_rect: "Rectangular",
    forme_carre: "Cuadrada",
    forme_rond: "Redonda",
    forme_ovale: "Ovalada",
    forme_libre: "Forma libre",
    recyclage: "Tiempo de renovación del agua (h)",
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

// ====== COEFFICIENTS ======
const coeffs = {
  coude90l: 20,
  coude90c: 30,
  coude45: 12.5,
  te_droit: 40,
  te_deriv: 80,
  manchon: 2.5,
  clapet: 125,
  vanne: 8
};

// Coefficient lambda selon matériau
function getLambda(mat){
  if(mat == "PVC_rigide") return 0.02;
  if(mat == "PVC_souple") return 0.035;
  if(mat == "Turbulence") return 0.316;
  return 0.02;
}

// Conversion mCE → bar
function mceToBar(val){ 
  return (val * 0.0981).toFixed(2); 
}

// ====== CALCUL DES ACCESSOIRES ======

// Récupère les quantités depuis les champs input
function calculAccessoires(prefix){
  const res = {};
  for(const key in coeffs){
    res[key] = +$(`#${key}_${prefix}`).val()||0;
  }
  return res;
}

// Calcule la longueur équivalente totale en mètres
function calculLongueurEquivalent(accessoires, D_m){
  let L_eq = 0;
  for(const key in accessoires){
    L_eq += accessoires[key] * coeffs[key] * D_m; // quantité × coefficient × D (m)
  }
  return L_eq;
}

// Affiche le tableau interactif des accessoires
function afficherTableauAccessoires(){
  const accessoires_asp = calculAccessoires('asp');
  const accessoires_ref = calculAccessoires('ref');

  let html = `<table class="table table-sm table-bordered text-center">
    <thead>
      <tr>
        <th>Accessoire</th>
        <th>Aspiration</th>
        <th>Refoulement</th>
      </tr>
    </thead>
    <tbody>`;

  for(const key in coeffs){
    html += `<tr>
      <td>${key}</td>
      <td><input type="number" min="0" step="1" class="form-control input-small" id="${key}_asp" value="${accessoires_asp[key]}"></td>
      <td><input type="number" min="0" step="1" class="form-control input-small" id="${key}_ref" value="${accessoires_ref[key]}"></td>
    </tr>`;
  }

  html += `</tbody></table>`;

  $('#accessoires-asp').html(html);

  // Relance le calcul quand une valeur change
  $('input').off('input').on('input', calculerResultats);

  return { accessoires_asp, accessoires_ref };
}

// ====== CALCUL HYDRAULIQUE COMPLET ======
function calculerResultats(){
  const t = translations[currentLang];

  // Piscine
  const forme = $('input[name="forme"]:checked').val();
  const L_val = +$('#L').val()||0;
  const l_val = +$('#l').val()||0;
  const p_val = +$('#p').val()||0;
  const t_recycl = +$('#t').val()||5;

  let surface = 0, volume = 0;
  if(forme=="rectangle" || forme=="carre") surface = L_val*l_val;
  else if(forme=="ronde") surface = Math.PI*Math.pow(L_val/2,2);
  else if(forme=="ovale") surface = Math.PI*L_val*l_val/4;
  else surface = L_val*l_val;
  volume = surface*p_val;

  const debit = volume/t_recycl;

  // Canalisations
  const D_mm = +$('#D').val()||50;
  const D_m = D_mm/1000;
  const lambda = getLambda($('#materiau').val());

  const L_asp_val = +$('#L_asp').val()||0;
  const L_ref_val = +$('#L_ref').val()||0;
  const V_asp = +$('#v_asp').val()||0;
  const V_ref = +$('#v_ref').val()||0;

  // Tableau accessoires
  const { accessoires_asp, accessoires_ref } = afficherTableauAccessoires();

  // Longueurs équivalentes
  const L_sing_asp = calculLongueurEquivalent(accessoires_asp, D_m);
  const L_sing_ref = calculLongueurEquivalent(accessoires_ref, D_m);

  // Friction totale
  const H_fric_asp = lambda*(L_asp_val + L_sing_asp)/D_m*(V_asp*V_asp/(2*9.81));
  const H_fric_ref = lambda*(L_ref_val + L_sing_ref)/D_m*(V_ref*V_ref/(2*9.81));

  // Hauteur géométrique et filtre
  const H_geo_val = +$('#H_geo').val()||0;
  const dp_filtre_val = +$('#dp_filtre').val()||0;

  // Totaux
  const H_total_asp = H_fric_asp;
  const H_total_ref = H_fric_ref;
  const H_total_install = H_total_asp + H_total_ref + H_geo_val + dp_filtre_val;

  // Affichage résultats
  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>
<b>${t.friction} aspiration :</b> ${H_fric_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_asp)}${t.en_bar}</small><br>
<b>${t.friction} refoulement :</b> ${H_fric_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_ref)}${t.en_bar}</small><br>
<b>${t.hauteur} :</b> ${H_geo_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_geo_val)}${t.en_bar}</small><br>
<b>${t.filtre} :</b> ${dp_filtre_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(dp_filtre_val)}${t.en_bar}</small><br><hr>
<b>Total Aspiration :</b> ${H_total_asp.toFixed(2)} mCE<br>
<b>Total Refoulement :</b> ${H_total_ref.toFixed(2)} mCE<br>
<b>Perte totale installation :</b> ${H_total_install.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_install)}${t.en_bar}</small>
`;

  $('#res').html(html);
  $('#res_droite').html(html);
}

// ====== NAVIGATION ONGLET ======
function suivant(id){
  calculerResultats();
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
}

// ====== LANGUE ======
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];
  $('h2.text-center').text(t.title);
  $('#res_droite h5').text(t.resultats);
  $('#lbl-forme').text(t.piscine_tab);
  $('#lbl-longueur').text(t.longueur);
  $('#lbl-largeur').text(t.largeur);
  $('#lbl-profondeur').text(t.profondeur);
  $('#lbl-recyclage').text(t.recyclage);
}

$('#lang-select').on('change', function(){ setLanguage($(this).val()); });

// ====== INITIALISATION ======
$(document).ready(function(){
  setLanguage(currentLang);
  calculerResultats();
  $('input, select').on('input change', calculerResultats);
});
