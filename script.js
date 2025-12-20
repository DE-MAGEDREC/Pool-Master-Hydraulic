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
    forme_rect: "Rectangular",
    forme_carree: "Square",
    forme_rond: "Round",
    forme_ovale: "Oval",
    forme_libre: "Free shape",
    recyclage: "Recycle time (h)",
    dn: "Pipe DN (mm)",
    materiau: "Material",
    aspiration: "Suction",
    refoulement: "Discharge",
    coudes: "Elbows",
    tes: "Tees",
    vannes: "Valves",
    hauteur: "Geometric height",
    filtre: "Filter loss",
    friction: "Pipe friction",
    total_asp: "Total suction",
    total_ref: "Total discharge",
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
    surface: "Surface",
    volume: "Volume",
    debit: "Débit filtration",
    longueur: "Longueur (m)",
    largeur: "Largeur (m)",
    profondeur: "Profondeur (m)",
    forme_rect: "Rectangulaire",
    forme_carree: "Carrée",
    forme_rond: "Ronde",
    forme_ovale: "Ovale",
    forme_libre: "Forme libre",
    recyclage: "Temps de recyclage (h)",
    dn: "DN de la canalisation (mm)",
    materiau: "Matériau",
    aspiration: "Aspiration",
    refoulement: "Refoulement",
    coudes: "Coudes",
    tes: "Tés",
    vannes: "Vannes",
    hauteur: "Hauteur géométrique",
    filtre: "Perte filtre",
    friction: "Friction canalisations",
    total_asp: "Total aspiration",
    total_ref: "Total refoulement",
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
    surface: "Superficie",
    volume: "Volumen",
    debit: "Caudal filtración",
    longueur: "Longitud (m)",
    largeur: "Ancho (m)",
    profondeur: "Profundidad (m)",
    forme_rect: "Rectangular",
    forme_carree: "Cuadrada",
    forme_rond: "Redonda",
    forme_ovale: "Ovalada",
    forme_libre: "Forma libre",
    recyclage: "Tiempo de reciclaje (h)",
    dn: "DN de la tubería (mm)",
    materiau: "Material",
    aspiration: "Aspiración",
    refoulement: "Impulsión",
    coudes: "Codos",
    tes: "Tés",
    vannes: "Válvulas",
    hauteur: "Altura geométrica",
    filtre: "Pérdida de filtro",
    friction: "Fricción tuberías",
    total_asp: "Total aspiración",
    total_ref: "Total impulsión",
    suivant: "Siguiente →",
    exporter: "Exportar PDF",
    resultats: "Resultados",
    en_bar: " (bar)"
  }
};

let currentLang = "en";

// ====== NAVIGATION ONGLET ======
function suivant(id){
  calculerResultats();
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
}

// ====== CALCUL HYDRAULIQUE ======
const lambda = 0.02; // exemple pour friction PVC
const g = 9.81;

function mceToBar(val){ return (val*0.0981).toFixed(2); }

function calculerResultats(){
  const t = translations[currentLang];

  // 🏊 Piscine
  let surface=0, volume=0;
  const forme = $('input[name="forme"]:checked').val();
  if (forme==="rectangulaire"){
    surface = (+L.value||0)*(+l.value||0);
    volume = surface*(+p.value||0);
  } else if (forme==="carree"){
    surface = Math.pow((+L.value||0),2);
    volume = surface*(+p.value||0);
  } else if (forme==="ronde"){
    surface = Math.PI*Math.pow((+L.value||0)/2,2);
    volume = surface*(+p.value||0);
  } else if (forme==="ovale"){
    surface = Math.PI*(+L.value||0)/2*(+l.value||0)/2;
    volume = surface*(+p.value||0);
  } else { // libre
    surface = (+L.value||0)*(+l.value||0);
    volume = surface*(+p.value||0);
  }

  // 💧 Débit filtration
  let t_renouv = +$('#t').val() || 5;
  let debit = volume / t_renouv;

  // 🚰 Canalisations
  const DN = +$('#D').val() || 1;
  const v_asp_val = +$('#v_asp').val()||0;
  const v_ref_val = +$('#v_ref').val()||0;
  const L_asp_val = +$('#L_asp').val()||0;
  const L_ref_val = +$('#L_ref').val()||0;

  // Pertes singulières
  const H_sing_asp = lambda*L_asp_val/DN*v_asp_val*v_asp_val/(2*g)
                    + (+$('#coudes_asp').val()||0)+(+$('#tes_asp').val()||0)+(+$('#vannes_asp').val()||0);
  const H_sing_ref = lambda*L_ref_val/DN*v_ref_val*v_ref_val/(2*g)
                    + (+$('#coudes_ref').val()||0)+(+$('#tes_ref').val()||0)+(+$('#vannes_ref').val()||0);

  // Hauteur et filtre
  const H_geo_val = +$('#H_geo').val()||0;
  const dp_filtre_val = +$('#dp_filtre').val()||0;

  // Friction
  const H_fric_asp = L_asp_val*lambda;
  const H_fric_ref = L_ref_val*lambda;

  // Totaux
  const H_total_asp = H_geo_val + dp_filtre_val + H_sing_asp + H_fric_asp;
  const H_total_ref = H_geo_val + dp_filtre_val + H_sing_ref + H_fric_ref;

  const html = `
<b>${t.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.volume} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>

<b>${t.dn} :</b> ${DN.toFixed(2)} mm<br>
<b>${t.pertes_tab} ${t.aspiration} :</b> ${H_sing_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_asp)}${t.en_bar}</small><br>
<b>${t.pertes_tab} ${t.refoulement} :</b> ${H_sing_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_ref)}${t.en_bar}</small><br>
<b>${t.hauteur} :</b> ${H_geo_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_geo_val)}${t.en_bar}</small><br>
<b>${t.filtre} :</b> ${dp_filtre_val.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(dp_filtre_val)}${t.en_bar}</small><br>
<b>${t.friction} ${t.aspiration} :</b> ${H_fric_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_asp)}${t.en_bar}</small><br>
<b>${t.friction} ${t.refoulement} :</b> ${H_fric_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_ref)}${t.en_bar}</small><br><hr>

<b>${t.total_asp} :</b> ${H_total_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_asp)}${t.en_bar}</small><br>
<b>${t.total_ref} :</b> ${H_total_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_ref)}${t.en_bar}</small>
`;

  $('#res_droite').html(html);
  $('#res').html(html);
}

// ====== EXPORT PDF ======
$('#btn-pdf').on('click', function(){
  html2pdf().from(document.getElementById('res')).save();
});

// ====== LANGUE ======
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];

  $('h2.text-center').text(t.title);
  $('#tab-piscine').text(t.piscine_tab);
  $('#tab-canalisations').text(t.canalisations_tab);
  $('#tab-pertes').text(t.pertes_tab);
  $('#tab-pression').text(t.pression_tab);
  $('#tab-resultats').text(t.resultats_tab);

  $('#lbl-forme').text(t.lbl_forme||"Forme de la piscine");
  $('input[name="forme"][value="rectangulaire"]').parent().contents().filter(function(){return this.nodeType==3})[0].textContent = " "+t.forme_rect;
  $('input[name="forme"][value="carree"]').parent().contents().filter(function(){return this.nodeType==3})[0].textContent = " "+t.forme_carree;
  $('input[name="forme"][value="ronde"]').parent().contents().filter(function(){return this.nodeType==3})[0].textContent = " "+t.forme_rond;
  $('input[name="forme"][value="ovale"]').parent().contents().filter(function(){return this.nodeType==3})[0].textContent = " "+t.forme_ovale;
  $('input[name="forme"][value="libre"]').parent().contents().filter(function(){return this.nodeType==3})[0].textContent = " "+t.forme_libre;

  $('#lbl-longueur').text(t.longueur);
  $('#lbl-largeur').text(t.largeur);
  $('#lbl-profondeur').text(t.profondeur);
  $('#lbl-recyclage').text(t.recyclage);

  $('#lbl-dn').text(t.dn);
  $('#lbl-materiau').text(t.materiau);
  $('#lbl-aspiration').text(t.aspiration);
  $('#lbl-refoulement').text(t.refoulement);
  $('#lbl-long-asp').text(t.longueur);
  $('#lbl-v-asp').text("Vitesse (m/s)");
  $('#lbl-long-ref').text(t.longueur);
  $('#lbl-v-ref').text("Vitesse (m/s)");

  $('#lbl-pertes-asp').text(t.aspiration);
  $('#lbl-pertes-ref').text(t.refoulement);
  $('#lbl-coudes-asp').text(t.coudes);
  $('#lbl-tes-asp').text(t.tes);
  $('#lbl-vannes-asp').text(t.vannes);
  $('#lbl-coudes-ref').text(t.coudes);
  $('#lbl-tes-ref').text(t.tes);
  $('#lbl-vannes-ref').text(t.vannes);

  $('#lbl-hauteur').text(t.hauteur);
  $('#lbl-filtre').text(t.filtre);

  $('.btn-primary').text(t.suivant);
  $('#btn-pdf').text(t.exporter);

  calculerResultats();
}

$('#lang-select').on('change', function(){ setLanguage($(this).val()); });

// ====== INITIALISATION ======
$(document).ready(function(){
  setLanguage(currentLang);
  calculerResultats();
});

// ====== MISE À JOUR EN TEMPS RÉEL ======
$('input, select').on('input change', calculerResultats);
