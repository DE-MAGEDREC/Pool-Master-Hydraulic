/* =====================================================
   POOL MASTER HYDRAULIC – SCRIPT COMPLET
===================================================== */

let currentLang = "fr";

/* ===================== TRADUCTIONS ===================== */
const t = {
  fr: {
    resultats: "Résultats",
    surface: "Surface",
    volume: "Volume",
    debit: "Débit filtration",
    pertes_friction: "Pertes de friction",
    pertes_sing: "Pertes singulières",
    aspiration: "Aspiration",
    refoulement: "Refoulement",
    hauteur: "Hauteur géométrique",
    filtre: "Perte filtre",
    pertes_totales: "Pertes hydrauliques totales"
  },
  en: {
    resultats: "Results",
    surface: "Surface",
    volume: "Volume",
    debit: "Filtration flow",
    pertes_friction: "Friction losses",
    pertes_sing: "Singular losses",
    aspiration: "Suction",
    refoulement: "Discharge",
    hauteur: "Geometric height",
    filtre: "Filter loss",
    pertes_totales: "Total hydraulic losses"
  },
  es: {
    resultats: "Resultados",
    surface: "Superficie",
    volume: "Volumen",
    debit: "Caudal",
    pertes_friction: "Pérdidas por fricción",
    pertes_sing: "Pérdidas singulares",
    aspiration: "Aspiración",
    refoulement: "Impulsión",
    hauteur: "Altura geométrica",
    filtre: "Pérdida de filtro",
    pertes_totales: "Pérdidas hidráulicas totales"
  }
};

/* ===================== UTILS ===================== */
const mceToBar = mce => (mce * 0.0981).toFixed(2);

/* ===================== FORMES ===================== */
function choixForme() {
  const forme = $('input[name="forme"]:checked').val();
  $(".forme-fields").hide();
  $("#" + forme + "-fields").show();
}

/* ===================== CALCUL GLOBAL ===================== */
function calculerResultats() {

  /* ---------- ONGLET 1 : PISCINE ---------- */
  let surface = 0, volume = 0;
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
      surface = Math.PI *
        ((+$("#a_ovale").val() || 0) / 2) *
        ((+$("#b_ovale").val() || 0) / 2);
      volume = surface * (+$("#p_o").val() || 0);
      break;

    case "libre":
      surface = (+$("#L_libre").val() || 0) * (+$("#l_libre").val() || 0);
      volume = surface * (+$("#p_libre").val() || 0);
      break;
  }

  const debit = volume / tRecycl;

  /* ---------- ONGLET 2 : CANALISATIONS ---------- */
  const DN = (+$("#D").val() || 50) / 1000;
  const L_asp = +$("#L_asp").val() || 0;
  const L_ref = +$("#L_ref").val() || 0;
  const v_asp = +$("#v_asp").val() || 1;
  const v_ref = +$("#v_ref").val() || 1;

  const lambda =
    $("#materiau").val() === "PVC_souple" ? 0.035 :
    $("#materiau").val() === "Turbulence" ? 0.316 : 0.02;

  const H_fric_asp = lambda * (L_asp / DN) * (Math.pow(v_asp, 2) / (2 * 9.81));
  const H_fric_ref = lambda * (L_ref / DN) * (Math.pow(v_ref, 2) / (2 * 9.81));

  /* ---------- ONGLET 3 : PERTES SINGULIÈRES ---------- */
  const sing = (c90C, c90G, te, vanne, v) =>
    lambda *
    (
      ((+c90C || 0) * 30 * DN) +
      ((+c90G || 0) * 20 * DN) +
      ((+te || 0) * 40 * DN) +
      ((+vanne || 0) * 8 * DN)
    ) / DN *
    (Math.pow(v, 2) / (2 * 9.81));

  const H_sing_asp = sing(
    $("#coudes90C_asp").val(),
    $("#coudes90G_asp").val(),
    $("#tes_asp").val(),
    $("#vannes_asp").val(),
    v_asp
  );

  const H_sing_ref = sing(
    $("#coudes90C_ref").val(),
    $("#coudes90G_ref").val(),
    $("#tes_ref").val(),
    $("#vannes_ref").val(),
    v_ref
  );

  /* ---------- ONGLET 4 : HAUTEUR & FILTRE ---------- */
  const H_geo = +$("#H_geo").val() || 0;
  const H_filtre = +$("#dp_filtre").val() || 0;

  /* ---------- TOTAUX ---------- */
  const H_total =
    H_fric_asp +
    H_fric_ref +
    H_sing_asp +
    H_sing_ref +
    H_geo +
    H_filtre;

  /* ---------- AFFICHAGE ---------- */
  const lang = t[currentLang];

  const html = `
    <h5>${lang.resultats}</h5>

    <b>${lang.surface} :</b> ${surface.toFixed(2)} m²<br>
    <b>${lang.volume} :</b> ${volume.toFixed(2)} m³<br>
    <b>${lang.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>

    <b>${lang.pertes_friction} (${lang.aspiration}) :</b> ${H_fric_asp.toFixed(2)} mCE (${mceToBar(H_fric_asp)} bar)<br>
    <b>${lang.pertes_friction} (${lang.refoulement}) :</b> ${H_fric_ref.toFixed(2)} mCE (${mceToBar(H_fric_ref)} bar)<br><hr>

    <b>${lang.pertes_sing} (${lang.aspiration}) :</b> ${H_sing_asp.toFixed(2)} mCE (${mceToBar(H_sing_asp)} bar)<br>
    <b>${lang.pertes_sing} (${lang.refoulement}) :</b> ${H_sing_ref.toFixed(2)} mCE (${mceToBar(H_sing_ref)} bar)<br><hr>

    <b>${lang.hauteur} :</b> ${H_geo.toFixed(2)} mCE<br>
    <b>${lang.filtre} :</b> ${H_filtre.toFixed(2)} mCE<br><hr>

    <b style="color:#c00">${lang.pertes_totales} :</b>
    <b>${H_total.toFixed(2)} mCE (${mceToBar(H_total)} bar)</b>
  `;

  $("#res").html(html);
  $("#res_droite").html(html);
}

/* ===================== INIT ===================== */
$(document).ready(function () {
  choixForme();
  calculerResultats();

  $("input, select").on("input change", function () {
    choixForme();
    calculerResultats();
  });
});

/* ===================== PDF ===================== */
$(document).on("click", "#btn-pdf", function () {
  html2pdf().from(document.getElementById("res")).save();
});
