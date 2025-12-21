/*************************************************
 * CONFIGURATION GÉNÉRALE
 *************************************************/
let currentLang = "fr";

/*************************************************
 * TRADUCTIONS
 *************************************************/
const translations = {
  fr: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscine",
    canalisations_tab: "Canalisations",
    pertes_tab: "Pertes singulières",
    pression_tab: "Pression & Température",
    resultats_tab: "Résultats / PDF",

    forme: "Forme de la piscine",
    forme_rect: "Rectangulaire",
    forme_carree: "Carrée",
    forme_rond: "Ronde",
    forme_ovale: "Ovale",
    forme_libre: "Libre",

    longueur: "Longueur (m)",
    largeur: "Largeur (m)",
    profondeur: "Profondeur (m)",
    temps_renouv: "Temps de recyclage (h)",

    surface: "Surface",
    volume: "Volume",
    debit: "Débit filtration",

    pertes_sing_asp: "Pertes singulières aspiration",
    pertes_sing_ref: "Pertes singulières refoulement",
    friction: "Friction canalisations",
    filtre: "Perte filtre",
    hauteur: "Hauteur géométrique",

    total_asp: "Total aspiration",
    total_ref: "Total refoulement",
    pertes_totales: "Pertes totales",

    suivant: "Suivant →",
    exporter: "Exporter PDF",
    resultats: "Résultats",
    logout: "Déconnexion",
    en_bar: " (bar)"
  },

  en: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Pool",
    canalisations_tab: "Pipes",
    pertes_tab: "Singular losses",
    pression_tab: "Pressure & Temperature",
    resultats_tab: "Results / PDF",

    forme: "Pool shape",
    forme_rect: "Rectangular",
    forme_carree: "Square",
    forme_rond: "Round",
    forme_ovale: "Oval",
    forme_libre: "Free form",

    longueur: "Length (m)",
    largeur: "Width (m)",
    profondeur: "Depth (m)",
    temps_renouv: "Recycle time (h)",

    surface: "Surface",
    volume: "Volume",
    debit: "Filtration flow rate",

    pertes_sing_asp: "Singular losses suction",
    pertes_sing_ref: "Singular losses discharge",
    friction: "Pipe friction",
    filtre: "Filter loss",
    hauteur: "Geometric height",

    total_asp: "Total suction",
    total_ref: "Total discharge",
    pertes_totales: "Total losses",

    suivant: "Next →",
    exporter: "Export PDF",
    resultats: "Results",
    logout: "Logout",
    en_bar: " (bar)"
  },

  es: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscina",
    canalisations_tab: "Tuberías",
    pertes_tab: "Pérdidas singulares",
    pression_tab: "Presión & Temperatura",
    resultats_tab: "Resultados / PDF",

    forme: "Forma de la piscina",
    forme_rect: "Rectangular",
    forme_carree: "Cuadrada",
    forme_rond: "Redonda",
    forme_ovale: "Oval",
    forme_libre: "Libre",

    longueur: "Longitud (m)",
    largeur: "Ancho (m)",
    profondeur: "Profundidad (m)",
    temps_renouv: "Tiempo de reciclaje (h)",

    surface: "Superficie",
    volume: "Volumen",
    debit: "Caudal de filtración",

    pertes_sing_asp: "Pérdidas singulares aspiración",
    pertes_sing_ref: "Pérdidas singulares impulsión",
    friction: "Fricción tuberías",
    filtre: "Pérdida de filtro",
    hauteur: "Altura geométrica",

    total_asp: "Total aspiración",
    total_ref: "Total impulsión",
    pertes_totales: "Pérdidas totales",

    suivant: "Siguiente →",
    exporter: "Exportar PDF",
    resultats: "Resultados",
    logout: "Cerrar sesión",
    en_bar: " (bar)"
  }
};

/*************************************************
 * GESTION DES LANGUES
 *************************************************/
function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.innerText = t[key];
  });

  calculerResultats();
}

$("#lang-select").on("change", function () {
  setLanguage(this.value);
});

/*************************************************
 * NAVIGATION ONGLET
 *************************************************/
function suivant(id) {
  $(".tab-pane").removeClass("show active");
  $(id).addClass("show active");

  $(".nav-link").removeClass("active");
  $(`a[href="${id}"]`).addClass("active");
}

/*************************************************
 * CHOIX FORME
 *************************************************/
function choixForme() {
  const forme = $('input[name="forme"]:checked').val();
  $(".forme-fields").hide();
  $("#" + forme + "-fields").show();
}

/*************************************************
 * CONVERSION mCE → BAR
 *************************************************/
function mceToBar(val) {
  return (val * 0.0981).toFixed(2);
}

/*************************************************
 * CALCUL HYDRAULIQUE
 *************************************************/
function calculerResultats() {
  const t = translations[currentLang];

  /* ===== PISCINE ===== */
  const forme = $('input[name="forme"]:checked').val();
  let surface = 0;
  let volume = 0;

  const L = +$("#L").val() || 0;
  const l = +$("#l").val() || 0;
  const p = +$("#p").val() || 0;

  if (forme === "rectangle") {
    surface = L * l;
    volume = surface * p;
  }

  const tRenouv = +$("#t_renouv").val() || 5;
  const debit = volume / tRenouv;

  /* ===== CANALISATIONS ===== */
  const D = (+$("#D").val() || 50) / 1000;
  const vAsp = +$("#v_asp").val() || 1;
  const vRef = +$("#v_ref").val() || 1;
  const L_asp = +$("#L_asp").val() || 0;
  const L_ref = +$("#L_ref").val() || 0;

  const lambda =
    $("#materiau").val() === "PVC_souple" ? 0.035 :
    $("#materiau").val() === "Turbulence" ? 0.316 : 0.02;

  const H_fric_asp = lambda * L_asp / D * (vAsp ** 2) / (2 * 9.81);
  const H_fric_ref = lambda * L_ref / D * (vRef ** 2) / (2 * 9.81);

  /* ===== PERTES SINGULIÈRES ===== */
  function pertesSing(c90C, c90G, te, vanne, v) {
    const Leq =
      c90C * 30 * D +
      c90G * 20 * D +
      te * 40 * D +
      vanne * 8 * D;

    return lambda * Leq / D * (v ** 2) / (2 * 9.81);
  }

  const H_sing_asp = pertesSing(
    +$("#coudes90C_asp").val() || 0,
    +$("#coudes90G_asp").val() || 0,
    +$("#tes_asp").val() || 0,
    +$("#vannes_asp").val() || 0,
    vAsp
  );

  const H_sing_ref = pertesSing(
    +$("#coudes90C_ref").val() || 0,
    +$("#coudes90G_ref").val() || 0,
    +$("#tes_ref").val() || 0,
    +$("#vannes_ref").val() || 0,
    vRef
  );

  /* ===== HAUTEUR & FILTRE ===== */
  const H_geo = +$("#H_geo").val() || 0;
  const H_filtre = +$("#dp_filtre").val() || 0;

  const H_total_asp = H_fric_asp + H_sing_asp;
  const H_total_ref = H_fric_ref + H_sing_ref;
  const H_total = H_total_asp + H_total_ref + H_geo + H_filtre;

  /* ===== AFFICHAGE ===== */
  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>

<b>${t.total_asp} :</b> ${H_total_asp.toFixed(2)} mCE<br>
<small>${mceToBar(H_total_asp)}${t.en_bar}</small><br>

<b>${t.total_ref} :</b> ${H_total_ref.toFixed(2)} mCE<br>
<small>${mceToBar(H_total_ref)}${t.en_bar}</small><br>

<b>${t.pertes_totales} :</b> ${H_total.toFixed(2)} mCE<br>
<small>${mceToBar(H_total)}${t.en_bar}</small>
`;

  $("#res").html(html);
  $("#res_droite").html(`<h5>${t.resultats}</h5>${html}`);
}

/*************************************************
 * EXPORT PDF
 *************************************************/
$("#btn-pdf").on("click", () => {
  html2pdf().from(document.getElementById("res")).save();
});

/*************************************************
 * INITIALISATION
 *************************************************/
$(document).ready(() => {
  setLanguage(currentLang);
  $("input, select").on("input change", calculerResultats);
  $('input[name="forme"]').on("change", choixForme);
  choixForme();
});
