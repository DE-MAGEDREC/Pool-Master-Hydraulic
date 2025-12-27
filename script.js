// ====== TRADUCTIONS ======
const translations = {
  fr: {
    title: "Pool Master Hydraulic",
    tab_piscine: "Piscine",
    tab_canalisations: "Canalisations",
    tab_pertes: "Pertes singulières",
    tab_pression: "Pression & Température",
    tab_pieces: "Pièces à sceller",
    tab_param: "Paramètres",
    tab_inverse: "Étude inversée",
    tab_resultats: "Résultats / PDF",
    formes: { rectangle:"Rectangle", carre:"Carré", ronde:"Ronde", ovale:"Ovale", libre:"Libre" },
    labels: { longueur:"Longueur (m)", largeur:"Largeur (m)", profondeur:"Profondeur (m)", cote:"Côté (m)",
              diam:"Diamètre (m)", grand_axe:"Grand axe (m)", petit_axe:"Petit axe (m)", surface:"Surface (m²)", t_recycl:"Temps recyclage (h)",
              dn:"Diamètre canalisation (mm)", materiau:"Matériau", longueur_can:"Longueur (m)", vitesse:"Vitesse (m/s)",
              h_geo:"Hauteur géométrique (m)", dp_filtre:"Perte filtre (mCE)", quantite:"Quantité", longueur_piece:"Longueur (m)",
              activer_inverse:"Activer étude inversée", debit:"Débit filtre (m³/h)", perte:"Perte de charge (mCE)"
            },
    pertes: { c90C:"Coudes 90° court", c90G:"Coudes 90° grand", tes:"Tés", vannes:"Vannes", total:"Total" },
    resultats:"Résultats",
    en_bar:"Bar", en_psi:"PSI",
    exporter:"Exporter PDF",
    suivant:"Suivant →",
    precedent:"← Précédent",
    alert:"⚠️",
  },
  en: {
    title:"Pool Master Hydraulic",
    tab_piscine:"Pool",
    tab_canalisations:"Pipes",
    tab_pertes:"Singular losses",
    tab_pression:"Pressure & Temperature",
    tab_pieces:"Embedded pieces",
    tab_param:"Settings",
    tab_inverse:"Reverse study",
    tab_resultats:"Results / PDF",
    formes:{ rectangle:"Rectangular", carre:"Square", ronde:"Round", ovale:"Oval", libre:"Free form" },
    labels:{ longueur:"Length (m)", largeur:"Width (m)", profondeur:"Depth (m)", cote:"Side (m)",
             diam:"Diameter (m)", grand_axe:"Major axis (m)", petit_axe:"Minor axis (m)", surface:"Surface (m²)", t_recycl:"Recycle time (h)",
             dn:"Pipe diameter (mm)", materiau:"Material", longueur_can:"Length (m)", vitesse:"Velocity (m/s)",
             h_geo:"Geometric height (m)", dp_filtre:"Filter loss (mCE)", quantite:"Quantity", longueur_piece:"Length (m)",
             activer_inverse:"Enable reverse study", debit:"Filter flow (m³/h)", perte:"Head loss (mCE)"
           },
    pertes:{ c90C:"Elbow 90° short", c90G:"Elbow 90° long", tes:"Tees", vannes:"Valves", total:"Total" },
    resultats:"Results",
    en_bar:"Bar", en_psi:"PSI",
    exporter:"Export PDF",
    suivant:"Next →",
    precedent:"← Previous",
    alert:"⚠️",
  },
  es: {
    title:"Pool Master Hydraulic",
    tab_piscine:"Piscina",
    tab_canalisations:"Tuberías",
    tab_pertes:"Pérdidas singulares",
    tab_pression:"Presión & Temperatura",
    tab_pieces:"Piezas a embutir",
    tab_param:"Parámetros",
    tab_inverse:"Estudio inverso",
    tab_resultats:"Resultados / PDF",
    formes:{ rectangle:"Rectangular", carre:"Cuadrada", ronde:"Redonda", ovale:"Oval", libre:"Libre" },
    labels:{ longueur:"Longitud (m)", largeur:"Ancho (m)", profondeur:"Profundidad (m)", cote:"Lado (m)",
             diam:"Diámetro (m)", grand_axe:"Eje mayor (m)", petit_axe:"Eje menor (m)", surface:"Superficie (m²)", t_recycl:"Tiempo reciclaje (h)",
             dn:"Diámetro tubería (mm)", materiau:"Material", longueur_can:"Longitud (m)", vitesse:"Velocidad (m/s)",
             h_geo:"Altura geométrica (m)", dp_filtre:"Pérdida filtro (mCE)", quantite:"Cantidad", longueur_piece:"Longitud (m)",
             activer_inverse:"Activar estudio inverso", debit:"Caudal filtro (m³/h)", perte:"Pérdida de carga (mCE)"
           },
    pertes:{ c90C:"Codo 90° corto", c90G:"Codo 90° largo", tes:"Tés", vannes:"Válvulas", total:"Total" },
    resultats:"Resultados",
    en_bar:"Bar", en_psi:"PSI",
    exporter:"Exportar PDF",
    suivant:"Siguiente →",
    precedent:"← Anterior",
    alert:"⚠️",
  }
};

let currentLang = "fr";

// ====== WIZARD ======
function suivant(id){
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
  calculerResultats();
}
function precedent(id){ suivant(id); }

// ====== CHOIX FORME ======
function choixForme(){
  const f = $('input[name="forme"]:checked').val();
  $('.forme-fields').hide();
  switch(f){
    case "rectangle": $('#rectangle-fields').show(); break;
    case "carre": $('#carre-fields').show(); break;
    case "ronde": $('#ronde-fields').show(); break;
    case "ovale": $('#ovale-fields').show(); break;
    case "libre": $('#libre-fields').show(); break;
  }
}

// ====== CONVERSION mCE -> Bar / PSI ======
function mceToBar(val){ return (val*0.0981).toFixed(2); }
function mceToPsi(val){ return (val*1.4223).toFixed(2); }

// ====== CALCUL HYDRAULIQUE COMPLET ======
function calculerResultats(){

  const t = translations[currentLang];

  // ----- Piscine -----
  const forme = $('input[name="forme"]:checked').val();
  let surface=0, volume=0;
  const t_renouv = +$('#t_recycl').val()||5;

  if(forme==="rectangle"){
    const L_val = +$('#L').val()||0;
    const l_val = +$('#l').val()||0;
    const p_val = +$('#p').val()||0;
    surface = L_val*l_val; volume = surface*p_val;
  } else if(forme==="carre"){
    const c_val = +$('#cote').val()||0;
    const p_val = +$('#p_carre').val()||0;
    surface = c_val*c_val; volume = surface*p_val;
  } else if(forme==="ronde"){
    const D_val = +$('#D_piscine').val()||0;
    const p_val = +$('#p_r').val()||0;
    surface = Math.PI*Math.pow(D_val/2,2); volume = surface*p_val;
  } else if(forme==="ovale"){
    const a = +$('#a_ovale').val()||0;
    const b = +$('#b_ovale').val()||0;
    const p_val = +$('#p_o').val()||0;
    surface = Math.PI*(a/2)*(b/2); volume = surface*p_val;
  } else if(forme==="libre"){
    const s = +$('#surface_libre').val()||0;
    const p_val = +$('#p_libre').val()||0;
    surface = s; volume = surface*p_val;
  }

  const debit = volume/t_renouv;

  // ----- Canalisations -----
  const DN = (+$('#D').val()/1000)||0.05; // m
  const v_asp = +$('#v_asp').val()||1.5;
  const v_ref = +$('#v_ref').val()||2;
  const mat = $('#materiau').val();
  let lambda = 0.02;
  if(mat==="PVC_souple") lambda=0.035;
  if(mat==="Turbulent") lambda=0.316;
  if(mat==="PE") lambda=0.03;
  const L_asp = +$('#L_asp').val()||0;
  const L_ref = +$('#L_ref').val()||0;
  const H_fric_asp = lambda*L_asp/DN*Math.pow(v_asp,2)/(2*9.81);
  const H_fric_ref = lambda*L_ref/DN*Math.pow(v_ref,2)/(2*9.81);

  // ----- Pertes singulières -----
  function calcSing(c90C, c90G, te, vanne, V){
    const L_eq = ((+c90C||0)*30*DN) + ((+c90G||0)*20*DN) + ((+te||0)*40*DN) + ((+vanne||0)*8*DN);
    return lambda*L_eq/DN*Math.pow(V,2)/(2*9.81);
  }
  const H_sing_asp = calcSing($('#coudes90C_asp').val(), $('#coudes90G_asp').val(), $('#tes_asp').val(), $('#vannes_asp').val(), v_asp);
  const H_sing_ref = calcSing($('#coudes90C_ref').val(), $('#coudes90G_ref').val(), $('#tes_ref').val(), $('#vannes_ref').val(), v_ref);

  // ----- Hauteur géométrique & Filtre -----
  const H_geo_val = +$('#H_geo').val()||0;
  const dp_filtre_val = +$('#dp_filtre').val()||0;

  const H_total_asp = H_fric_asp + H_sing_asp;
  const H_total_ref = H_fric_ref + H_sing_ref;
  const H_total = H_total_asp + H_total_ref + H_geo_val + dp_filtre_val;

  // ----- Résultats DROITE -----
  let html = `
<b>${t.labels.surface} :</b> ${surface.toFixed(2)} m²<br>
<b>${t.labels.profondeur} :</b> ${volume.toFixed(2)} m³<br>
<b>${t.labels.debit} :</b> ${debit.toFixed(2)} m³/h<br><hr>
<b>${t.pertes.c90C} aspiration :</b> ${H_sing_asp.toFixed(2)} mCE ≈ ${mceToBar(H_sing_asp)} ${t.en_bar} / ${mceToPsi(H_sing_asp)} ${t.en_psi}<br>
<b>${t.pertes.c90C} refoulement :</b> ${H_sing_ref.toFixed(2)} mCE ≈ ${mceToBar(H_sing_ref)} ${t.en_bar} / ${mceToPsi(H_sing_ref)} ${t.en_psi}<br>
<b>${t.labels.h_geo} :</b> ${H_geo_val.toFixed(2)} mCE ≈ ${mceToBar(H_geo_val)} ${t.en_bar} / ${mceToPsi(H_geo_val)} ${t.en_psi}<br>
<b>${t.labels.dp_filtre} :</b> ${dp_filtre_val.toFixed(2)} mCE ≈ ${mceToBar(dp_filtre_val)} ${t.en_bar} / ${mceToPsi(dp_filtre_val)} ${t.en_psi}<br>
<b>Friction aspiration :</b> ${H_fric_asp.toFixed(2)} mCE ≈ ${mceToBar(H_fric_asp)} ${t.en_bar} / ${mceToPsi(H_fric_asp)} ${t.en_psi}<br>
<b>Friction refoulement :</b> ${H_fric_ref.toFixed(2)} mCE ≈ ${mceToBar(H_fric_ref)} ${t.en_bar} / ${mceToPsi(H_fric_ref)} ${t.en_psi}<br><hr>
<b>${t.pertes.total} aspiration :</b> ${H_total_asp.toFixed(2)} mCE ≈ ${mceToBar(H_total_asp)} ${t.en_bar} / ${mceToPsi(H_total_asp)} ${t.en_psi}<br>
<b>${t.pertes.total} refoulement :</b> ${H_total_ref.toFixed(2)} mCE ≈ ${mceToBar(H_total_ref)} ${t.en_bar} / ${mceToPsi(H_total_ref)} ${t.en_psi}<br>
<b>${t.pertes.total} :</b> ${H_total.toFixed(2)} mCE ≈ ${mceToBar(H_total)} ${t.en_bar} / ${mceToPsi(H_total)} ${t.en_psi}
`;
  $('#res_droite_contenu').html(html);
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
  $('#app-title').text(t.title);
  $('#res-title').text(t.resultats);
  $('#tab-piscine').text(t.tab_piscine);
  $('#tab-canalisations').text(t.tab_canalisations);
  $('#tab-pertes').text(t.tab_pertes);
  $('#tab-pression').text(t.tab_pression);
  $('#tab-pieces').text(t.tab_pieces);
  $('#tab-param').text(t.tab_param);
  $('#tab-inverse').text(t.tab_inverse);
  $('#tab-resultats').text(t.tab_resultats);
  $('input[name="forme"][value="rectangle"]').parent().contents().filter(function(){return this.nodeType==3})[0].textContent=" "+t.formes.rectangle;
  $('input[name="forme"][value="carre"]').parent().contents().filter(function(){return this.nodeType==3})[0].textContent=" "+t.formes.carre;
  $('input[name="forme"][value="ronde"]').parent().contents().filter(function(){return this.nodeType==3})[0].textContent=" "+t.formes.ronde;
  $('input[name="forme"][value="ovale"]').parent().contents().filter(function(){return this.nodeType==3})[0].textContent=" "+t.formes.ovale;
  $('input[name="forme"][value="libre"]').parent().contents().filter(function(){return this.nodeType==3})[0].textContent=" "+t.formes.libre;
  $('#btn-pdf').text(t.exporter);
  $('.btn-primary').text(t.suivant);
  calculerResultats();
}

$('#lang-select').on('change', function(){ setLanguage($(this).val()); });

// ====== INITIALISATION ======
$(document).ready(function(){
  setLanguage(currentLang);
  calculerResultats();
  $('input, select').on('input change', calculerResultats);
  $('#activer_inverse').on('change', function(){
    if($(this).is(':checked')) $('#inverse-fields').show(); else $('#inverse-fields').hide();
  });
});
