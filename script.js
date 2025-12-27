// ====== TRADUCTIONS ======
const translations = {
  fr:{ /*... toutes traductions FR ...*/ },
  en:{ /*... toutes traductions EN ...*/ },
  es:{ /*... toutes traductions ES ...*/ }
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
function precedent(id){
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
  calculerResultats();
}

// ====== CHOIX FORMES ======
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

// ====== CONVERSIONS ======
function mceToBar(val){ return (val*0.0981).toFixed(2); }
function mceToPsi(val){ return (val*1.42233).toFixed(2); }

// ====== CALCUL HYDRAULIQUE ======
function calculerResultats(){
  const t = translations[currentLang];

  // ===== Piscine =====
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
    const p_val = +$('#p_carree').val()||0;
    surface = c_val*c_val; volume = surface*p_val;
  } else if(forme==="ronde"){
    const D_val = +$('#D_piscine').val()||0;
    const p_val = +$('#p_r').val()||0;
    surface = Math.PI*(D_val/2)**2; volume = surface*p_val;
  } else if(forme==="ovale"){
    const a_val = +$('#a_ovale').val()||0;
    const b_val = +$('#b_ovale').val()||0;
    const p_val = +$('#p_o').val()||0;
    surface = Math.PI*(a_val/2)*(b_val/2); volume = surface*p_val;
  } else if(forme==="libre"){
    const s_val = +$('#surface_libre').val()||0;
    const p_val = +$('#p_libre').val()||0;
    surface = s_val; volume = surface*p_val;
  }

  const debit = volume / t_renouv;

  // ===== Canalisations =====
  const DN = +$('#D').val()/1000||0.05; // m
  const v_asp = +$('#v_asp').val()||1;
  const v_ref = +$('#v_ref').val()||1;
  const lambda = ($('#materiau').val()==="PVC_souple")?0.035:($('#materiau').val()==="Turbulence")?0.316:0.02;
  const L_asp = +$('#L_asp').val()||0;
  const L_ref = +$('#L_ref').val()||0;
  const H_fric_asp = lambda*L_asp/DN*v_asp*v_asp/(2*9.81);
  const H_fric_ref = lambda*L_ref/DN*v_ref*v_ref/(2*9.81);

  // ===== Pertes singulières =====
  function calcSing(c90C, c90G, te, vanne, clapet, V){
    const L_eq = ((+c90C||0)*30*DN) + ((+c90G||0)*20*DN) + ((+te||0)*40*DN) + ((+vanne||0)*8*DN) + ((+clapet||0)*10*DN);
    return lambda*L_eq/DN*V*V/(2*9.81);
  }
  const H_sing_asp = calcSing($('#coudes90C_asp').val(), $('#coudes90G_asp').val(), $('#tes_asp').val(), $('#vannes_asp').val(), $('#clapets_asp').val(), v_asp);
  const H_sing_ref = calcSing($('#coudes90C_ref').val(), $('#coudes90G_ref').val(), $('#tes_ref').val(), $('#vannes_ref').val(), $('#clapets_ref').val(), v_ref);

  // ===== Hauteur géométrique & filtre =====
  const H_geo_val = +$('#H_geo').val()||0;
  const dp_filtre_val = +$('#dp_filtre').val()||0;

  // ===== Totaux =====
  const H_total_asp = H_sing_asp + H_fric_asp;
  const H_total_ref = H_sing_ref + H_fric_ref;
  const H_total = H_total_asp + H_total_ref + H_geo_val + dp_filtre_val;

  // ===== Affichage =====
  const html = `
<b>Surface :</b> ${surface.toFixed(2)} m²<br>
<b>Volume :</b> ${volume.toFixed(2)} m³<br>
<b>Débit :</b> ${debit.toFixed(2)} m³/h<br><hr>

<b><span class="alerte">⚠</span> Pertes sing. aspiration :</b> ${H_sing_asp.toFixed(2)} mCE | ${mceToBar(H_sing_asp)} Bar | ${mceToPsi(H_sing_asp)} PSI<br>
<b><span class="alerte">⚠</span> Pertes sing. refoulement :</b> ${H_sing_ref.toFixed(2)} mCE | ${mceToBar(H_sing_ref)} Bar | ${mceToPsi(H_sing_ref)} PSI<br>
<b>Hauteur géométrique :</b> ${H_geo_val.toFixed(2)} mCE | ${mceToBar(H_geo_val)} Bar | ${mceToPsi(H_geo_val)} PSI<br>
<b>Filtre :</b> ${dp_filtre_val.toFixed(2)} mCE | ${mceToBar(dp_filtre_val)} Bar | ${mceToPsi(dp_filtre_val)} PSI<br>
<b>Friction aspiration :</b> ${H_fric_asp.toFixed(2)} mCE | ${mceToBar(H_fric_asp)} Bar | ${mceToPsi(H_fric_asp)} PSI<br>
<b>Friction refoulement :</b> ${H_fric_ref.toFixed(2)} mCE | ${mceToBar(H_fric_ref)} Bar | ${mceToPsi(H_fric_ref)} PSI<br><hr>

<b>Total aspiration :</b> ${H_total_asp.toFixed(2)} mCE | ${mceToBar(H_total_asp)} Bar | ${mceToPsi(H_total_asp)} PSI<br>
<b>Total refoulement :</b> ${H_total_ref.toFixed(2)} mCE | ${mceToBar(H_total_ref)} Bar | ${mceToPsi(H_total_ref)} PSI<br>
<b>Pertes totales :</b> ${H_total.toFixed(2)} mCE | ${mceToBar(H_total)} Bar | ${mceToPsi(H_total)} PSI
`;

  $('#res').html(html);
  $('#res_droite').html(html);
}

// ====== EXPORT PDF ======
$('#btn-pdf').on('click', function(){
  html2pdf().from(document.getElementById('res')).save();
});

// ====== LANGUE ======
function setLanguage(lang){
  currentLang = lang;
  calculerResultats();
}

$('#lang-select').on('change', function(){ setLanguage($(this).val()); });

// ====== INIT ======
$(document).ready(function(){
  choixForme();
  calculerResultats();
  $('input, select').on('input change', calculerResultats);
});
