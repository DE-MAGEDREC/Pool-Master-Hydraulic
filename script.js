// ====== LANGUES ======
const translations = {
  en: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Pool",
    canalisations_tab: "Pipes",
    pertes_tab: "Singular losses",
    pression_tab: "Pressure & Temperature",
    resultats_tab: "Results / PDF",
    forme_label: "Pool shape",
    forme_options: ["Rectangular","Square","Round","Oval","Free"],
    t_recyclage: "Recycling time (h)",
    dn_label: "DN (mm)",
    materiau_label: "Pipe material",
    aspiration_label: "Suction",
    refoulement_label: "Discharge",
    longueur_label: "Length (m)",
    vitesse_label: "Velocity (m/s)",
    hauteur_label: "Geometric height (m)",
    dp_filtre_label: "Filter head loss (mCE)",
    debit: "Filtration flow rate",
    suivant: "Next →",
    exporter: "Export PDF",
    resultats: "Results",
    en_bar: " (bar)"
  },
  fr: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscine",
    canalisations_tab: "Canalisations",
    pertes_tab: "Pertes singulières",
    pression_tab: "Pression & Température",
    resultats_tab: "Résultats / PDF",
    forme_label: "Forme de la piscine",
    forme_options: ["Rectangulaire","Carrée","Ronde","Ovale","Libre"],
    t_recyclage: "Temps de recyclage (h)",
    dn_label: "DN (mm)",
    materiau_label: "Matériau tuyau",
    aspiration_label: "Aspiration",
    refoulement_label: "Refoulement",
    longueur_label: "Longueur (m)",
    vitesse_label: "Vitesse (m/s)",
    hauteur_label: "Hauteur géométrique (m)",
    dp_filtre_label: "Perte de charge filtre (mCE)",
    debit: "Débit filtration",
    suivant: "Suivant →",
    exporter: "Exporter PDF",
    resultats: "Résultats",
    en_bar: " (bar)"
  },
  es: {
    title: "Pool Master Hydraulic",
    piscine_tab: "Piscina",
    canalisations_tab: "Tuberías",
    pertes_tab: "Pérdidas singulares",
    pression_tab: "Presión & Temperatura",
    resultats_tab: "Resultados / PDF",
    forme_label: "Forma de la piscina",
    forme_options: ["Rectangular","Cuadrada","Redonda","Oval","Libre"],
    t_recyclage: "Tiempo de recirculación (h)",
    dn_label: "DN (mm)",
    materiau_label: "Material tubería",
    aspiration_label: "Aspiración",
    refoulement_label: "Impulsión",
    longueur_label: "Longitud (m)",
    vitesse_label: "Velocidad (m/s)",
    hauteur_label: "Altura geométrica (m)",
    dp_filtre_label: "Pérdida de carga filtro (mCE)",
    debit: "Caudal filtración",
    suivant: "Siguiente →",
    exporter: "Exportar PDF",
    resultats: "Resultados",
    en_bar: " (bar)"
  }
};

let currentLang = "en";

// ====== ACCESSOIRES ======
const accessoires = [
  {nom:"Coude 90° long rayon", val:20},
  {nom:"Coude 90° court rayon", val:30},
  {nom:"Coude 45°", val:12.5},
  {nom:"Té – passage droit", val:40},
  {nom:"Té – dérivation", val:80},
  {nom:"Manchon", val:2.5},
  {nom:"Clapet anti‑retour", val:125},
  {nom:"Vanne", val:8}
];

// ====== NAVIGATION ONGLET ======
function suivant(id){ 
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
}

// ====== GENERER LES ACCESSOIRES DANS L'ONGLET ======
function genererAccessoires(){
  const html_asp = accessoires.map(a=>`<label>${a.nom} (×Diamètre)</label><input type="number" step="0.01" id="asp_${a.nom.replace(/\s/g,"_")}" class="form-control input-small" value="0">`).join('');
  const html_ref = accessoires.map(a=>`<label>${a.nom} (×Diamètre)</label><input type="number" step="0.01" id="ref_${a.nom.replace(/\s/g,"_")}" class="form-control input-small" value="0">`).join('');
  $('#accessoires_asp').html(html_asp);
  $('#accessoires_ref').html(html_ref);
}

// ====== CALCUL HYDRAULIQUE COMPLET ======
function calculerResultats(){
  const t = translations[currentLang];

  // Piscine
  const forme = $('#forme_piscine').val();
  const t_recyclage = +$('#t_recyclage').val() || 5;
  const L_val = +$('#L').val() || 0;
  const l_val = +$('#l').val() || 0;
  const p_val = +$('#p').val() || 0;
  const D_piscine = +$('#D_piscine').val() || 0;

  let surface=0, volume=0;
  if (forme==="rectangle" || forme==="carree") surface = L_val*l_val;
  else if (forme==="ronde") surface = Math.PI*Math.pow(D_piscine/2,2);
  else if (forme==="ovale") surface = Math.PI*(L_val/2)*(l_val/2);
  else surface = L_val*l_val; // libre

  volume = surface * p_val;
  const debit = volume / t_recyclage;

  // Canalisations
  const D_mm = +$('#D').val() || 50;
  const materiau = $('#materiau').val();
  let lambda = 0.02;
  if(materiau==="PVC_souple") lambda=0.035;
  else if(materiau==="Turbulence") lambda=0.316;

  const L_asp_val = +$('#L_asp').val()||0;
  const v_asp_val = +$('#v_asp').val()||0;
  const L_ref_val = +$('#L_ref').val()||0;
  const v_ref_val = +$('#v_ref').val()||0;

  const H_fric_asp = lambda*L_asp_val/(D_mm/1000) * Math.pow(v_asp_val,2)/(2*9.81);
  const H_fric_ref = lambda*L_ref_val/(D_mm/1000) * Math.pow(v_ref_val,2)/(2*9.81);

  // Pertes singulières
  let H_sing_asp=0, H_sing_ref=0;
  accessoires.forEach(a=>{
    const val_asp = +$(`#asp_${a.nom.replace(/\s/g,"_")}`).val()||0;
    const val_ref = +$(`#ref_${a.nom.replace(/\s/g,"_")}`).val()||0;
    H_sing_asp += val_asp*(D_mm/1000);
    H_sing_ref += val_ref*(D_mm/1000);
  });

  const H_geo_val = +$('#H_geo').val()||0;
  const dp_filtre_val = +$('#dp_filtre').val()||0;

  const H_total_asp = H_geo_val + dp_filtre_val + H_sing_asp + H_fric_asp;
  const H_total_ref = H_geo_val + dp_filtre_val + H_sing_ref + H_fric_ref;

  const html = `
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br>
<b>${t.resultats} aspiration :</b> ${H_total_asp.toFixed(2)} mCE <small>≈ ${(H_total_asp*0.0981).toFixed(2)}${t.en_bar}</small><br>
<b>${t.resultats} refoulement :</b> ${H_total_ref.toFixed(2)} mCE <small>≈ ${(H_total_ref*0.0981).toFixed(2)}${t.en_bar}</small>
`;
  $('#res').html(html);
  $('#res_droite').html(html);
}

// ====== BOUTON SUIVANT + CALCUL ======
function calculerEtSuivant(id){
  calculerResultats();
  suivant(id);
}

// ====== LANGUE DYNAMIQUE ======
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];

  // Onglets
  $('a[href="#piscine"]').text(t.piscine_tab);
  $('a[href="#canalisations"]').text(t.canalisations_tab);
  $('a[href="#pertes_singulieres"]').text(t.pertes_tab);
  $('a[href="#pression_temp"]').text(t.pression_tab);
  $('a[href="#resultats_pdf"]').text(t.resultats_tab);

  // Labels
  $('label[for="forme_piscine"]').text(t.forme_label);
  $('#t_recyclage').prev('label').text(t.t_recyclage);
  $('#lbl-dn').text(t.dn_label);
  $('label[for="materiau"]').text(t.materiau_label);
  $('label[for="L_asp"]').text(t.longueur_label);
  $('label[for="v_asp"]').text(t.vitesse_label);
  $('label[for="L_ref"]').text(t.longueur_label);
  $('label[for="v_ref"]').text(t.vitesse_label);
  $('label[for="H_geo"]').text(t.hauteur_label);
  $('label[for="dp_filtre"]').text(t.dp_filtre_label);

  // Options piscine
  const options = t.forme_options.map(o=>`<option value="${o.toLowerCase()}">${o}</option>`).join('');
  $('#forme_piscine').html(options);

  // Boutons
  $('.btn-primary').text(t.suivant);
  $('#btn-pdf').text(t.exporter);

  calculerResultats();
}

// ====== INITIALISATION ======
$(document).ready(function(){
  genererAccessoires();
  calculerResultats();
  $('#lang-select').on('change', function(){ setLanguage($(this).val()); });
  $('input, select').on('input change', calculerResultats);
});
