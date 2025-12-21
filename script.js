/* =====================================================
   POOL MASTER HYDRAULIC – SCRIPT PRINCIPAL
   Version propre, stable, sans crash
===================================================== */

/* ===================== LANGUES ===================== */
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
    suivant: "Suivant →",
    resultats: "Résultats",
    hauteur: "Hauteur géométrique (m)",
    filtre: "Perte de charge filtre (mCE)",
    exporter: "Exporter PDF",
    logout: "Déconnexion"
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
    suivant: "Next →",
    resultats: "Results",
    hauteur: "Geometric height (m)",
    filtre: "Filter head loss (mCE)",
    exporter: "Export PDF",
    logout: "Logout"
  },
  es: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscina",
    canalisations_tab: "Tuberías",
    pertes_tab: "Pérdidas singulares",
    pression_tab: "Presión y temperatura",
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
    suivant: "Siguiente →",
    resultats: "Resultados",
    hauteur: "Altura geométrica (m)",
    filtre: "Pérdida de filtro (mCE)",
    exporter: "Exportar PDF",
    logout: "Cerrar sesión"
  }
};

let currentLang = "fr";

/* ===================== LANGUE ===================== */
function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.innerText = t[key];
  });

  calculerResultats();
}

/* ===================== NAVIGATION ONGLET ===================== */
function suivant(id) {
  $(".tab-pane").removeClass("show active");
  $(id).addClass("show active");

  $(".nav-link").removeClass("active");
  $(`a[href="${id}"]`).addClass("active");
}

/* ===================== FORMES ===================== */
function choixForme() {
  const forme = $('input[name="forme"]:checked').val();
  $(".forme-fields").hide();
  $("#" + forme + "-fields").show();
}

/* ===================== CALCUL PRINCIPAL ===================== */
function calculerResultats() {

  let surface = 0;
  let volume = 0;

  const forme = $('input[name="forme"]:checked').val();
  const tRecycl = +$("#t_recycl").val() || 5;

  switch (forme) {
    case "rectangle":
      surface = (+$("#L").val() || 0) * (+$("#l").val() || 0);
      volume = surface * (+$("#p").val() || 0);
      break;

    case "carree":
      surface = Math.pow(+$("#cote").val() || 0, 2);
      volume = surface * (+$("#p_carre").val() || 0);
      break;

    case "ronde":
      surface = Math.PI * Math.pow((+$("#D_piscine").val() || 0) / 2, 2);
      volume = surface * (+$("#p_r").val() || 0);
      break;

    case "ovale":
      surface =
        Math.PI *
        ((+$("#a_ovale").val() || 0) / 2) *
        ((+$("#b_ovale").val() || 0) / 2);
      volume = surface * (+$("#p_o").val() || 0);
      break;

    case "libre":
      surface =
        (+$("#L_libre").val() || 0) * (+$("#l_libre").val() || 0);
      volume = surface * (+$("#p_libre").val() || 0);
      break;
  }

  const debit = volume / tRecycl;

  const html = `
    <b>Surface :</b> ${surface.toFixed(2)} m²<br>
    <b>Volume :</b> ${volume.toFixed(2)} m³<br>
    <b>Débit de filtration :</b> ${debit.toFixed(2)} m³/h
  `;

  $("#res").html(html);
  $("#res_droite").html(`<h5>${translations[currentLang].resultats}</h5>` + html);
}

/* ===================== EXPORT PDF ===================== */
$(document).on("click", "#btn-pdf", function () {
  html2pdf().from(document.getElementById("res")).save();
});

/* ===================== INITIALISATION ===================== */
$(document).ready(function () {
  setLanguage(currentLang);
  choixForme();

  $("#lang-select").on("change", function () {
    setLanguage(this.value);
  });

  $("input, select").on("input change", function () {
    choixForme();
    calculerResultats();
  });

  calculerResultats();
});
