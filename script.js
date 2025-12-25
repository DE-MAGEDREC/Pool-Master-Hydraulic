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
  }
};

let currentLang = "fr";

/*************************************************
 *        TRADUCTION GLOBALE (AJOUT)
 *************************************************/
function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  const t = translations[lang];

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });

  calculerResultats();
}

document.getElementById("lang-select")
  .addEventListener("change", e => setLanguage(e.target.value));

/*************************************************
 *        NAVIGATION ONGLET (IDENTIQUE)
 *************************************************/
function suivant(id) {
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
  calculerResultats();
}

/*************************************************
 *        FORMES PISCINE (IDENTIQUE)
 *************************************************/
function choixForme() {
  const f = $('input[name="forme"]:checked').val();
  $('.forme-fields').hide();
  $('#' + f + '-fields').show();
}

/*************************************************
 *        OUTILS
 *************************************************/
function mceToBar(val) {
  return (val * 0.0981).toFixed(2);
}

/*************************************************
 *        CALCUL HYDRAULIQUE (INCHANGÉ)
 *************************************************/
function calculerResultats() {
  const t = translations[currentLang];

  const forme = $('input[name="forme"]:checked').val();
  let surface = 0, volume = 0;
  const t_renouv = +$('#t_recycl').val() || 5;

  if (forme === "rectangle") {
    surface = (+$('#L').val() || 0) * (+$('#l').val() || 0);
    volume = surface * (+$('#p').val() || 0);
  } else if (forme === "carre") {
    surface = Math.pow(+$('#cote').val() || 0, 2);
    volume = surface * (+$('#p_carre').val() || 0);
  } else if (forme === "ronde") {
    surface = Math.PI * Math.pow((+$('#D_piscine').val() || 0) / 2, 2);
    volume = surface * (+$('#p_r').val() || 0);
  } else if (forme === "ovale") {
    surface = Math.PI * (+$('#a_ovale').val() || 0) / 2 * (+$('#b_ovale').val() || 0) / 2;
    volume = surface * (+$('#p_o').val() || 0);
  } else {
    surface = (+$('#L_libre').val() || 0) * (+$('#l_libre').val() || 0);
    volume = surface * (+$('#p_libre').val() || 0);
  }

  const debit = volume / t_renouv;

  const DN = (+$('#D').val() || 50) / 1000;
  const v_asp = +$('#v_asp').val() || 1;
  const v_ref = +$('#v_ref').val() || 1;
  const lambda =
    $('#materiau').val() === "PVC_souple" ? 0.035 :
    $('#materiau').val() === "Turbulence" ? 0.316 : 0.02;

  const L_asp = +$('#L_asp').val() || 0;
  const L_ref = +$('#L_ref').val() || 0;

  const H_fric_asp = lambda * L_asp / DN * Math.pow(v_asp, 2) / (2 * 9.81);
  const H_fric_ref = lambda * L_ref / DN * Math.pow(v_ref, 2) / (2 * 9.81);

  function calcSing(c90C, c90G, te, vanne, V) {
    const L_eq =
      (c90C * 30 + c90G * 20 + te * 40 + vanne * 8) * DN;
    return lambda * L_eq / DN * Math.pow(V, 2) / (2 * 9.81);
  }

  const H_sing_asp = calcSing(
    +$('#coudes90C_asp').val() || 0,
    +$('#coudes90G_asp').val() || 0,
    +$('#tes_asp').val() || 0,
    +$('#vannes_asp').val() || 0,
    v_asp
  );

  const H_sing_ref = calcSing(
    +$('#coudes90C_ref').val() || 0,
    +$('#coudes90G_ref').val() || 0,
    +$('#tes_ref').val() || 0,
    +$('#vannes_ref').val() || 0,
    v_ref
  );

  const H_geo = +$('#H_geo').val() || 0;
  const dp_filtre = +$('#dp_filtre').val() || 0;

  const H_total_asp = H_fric_asp + H_sing_asp;
  const H_total_ref = H_fric_ref + H_sing_ref;
  const H_total = H_total_asp + H_total_ref + H_geo + dp_filtre;

  const html = `
<b>${t.surface}</b> : ${surface.toFixed(2)} m²<br>
<b>${t.volume}</b> : ${volume.toFixed(2)} m³<br>
<b>${t.debit}</b> : ${debit.toFixed(2)} m³/h<br><hr>
<b>${t.pertes_totales}</b> : ${H_total.toFixed(2)} mCE
<small>≈ ${mceToBar(H_total)}${t.en_bar}</small>
`;

  $('#res, #res_droite').html(html);
}

/*************************************************
 *        EXPORT PDF (IDENTIQUE)
 *************************************************/
$('#btn-pdf').on('click', () => {
  html2pdf().from(document.getElementById('res')).save();
});

/*************************************************
 *        INIT
 *************************************************/
$(document).ready(() => {
  setLanguage(currentLang);
  $('input, select').on('input change', calculerResultats);
});



