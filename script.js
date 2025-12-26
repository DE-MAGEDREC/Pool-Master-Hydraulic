/************ TRADUCTIONS ************/
const translations = {
  fr:{title:"Pool Master Hydraulic",langue:"Langue :",logout:"Déconnexion",
  piscine_tab:"Piscine",canalisations_tab:"Canalisations",pertes_tab:"Pertes",pression_tab:"Pression",
  resultats_tab:"Résultats / PDF",forme_piscine:"Forme de la piscine",
  forme_rect:"Rectangulaire",forme_carree:"Carrée",forme_rond:"Ronde",
  forme_ovale:"Ovale",forme_libre:"Libre",
  surface:"Surface",volume:"Volume",debit:"Débit filtration",
  pertes_totales:"Pertes totales",exporter:"Exporter PDF",resultats:"Résultats"},
  en:{title:"Pool Master Hydraulic",langue:"Language :",logout:"Logout",
  piscine_tab:"Pool",canalisations_tab:"Pipes",pertes_tab:"Losses",pression_tab:"Pressure",
  resultats_tab:"Results / PDF",forme_piscine:"Pool shape",
  forme_rect:"Rectangular",forme_carree:"Square",forme_rond:"Round",
  forme_ovale:"Oval",forme_libre:"Free",
  surface:"Surface",volume:"Volume",debit:"Flow",
  pertes_totales:"Total losses",exporter:"Export PDF",resultats:"Results"},
  es:{title:"Pool Master Hydraulic",langue:"Idioma :",logout:"Cerrar sesión",
  piscine_tab:"Piscina",canalisations_tab:"Tuberías",pertes_tab:"Pérdidas",pression_tab:"Presión",
  resultats_tab:"Resultados / PDF",forme_piscine:"Forma de la piscina",
  forme_rect:"Rectangular",forme_carree:"Cuadrada",forme_rond:"Redonda",
  forme_ovale:"Oval",forme_libre:"Libre",
  surface:"Superficie",volume:"Volumen",debit:"Caudal",
  pertes_totales:"Pérdidas totales",exporter:"Exportar PDF",resultats:"Resultados"}
};

let currentLang="fr";

/************ OUTILS ************/
function getNumber(id){
  const v=$(id).val();
  return parseFloat((v||"").replace(',','.'))||0;
}

/************ LANGUE ************/
function setLanguage(l){
  currentLang=l;
  const t=translations[l];
  $('[data-i18n]').each(function(){
    const k=$(this).data('i18n');
    if(t[k]) $(this).text(t[k]);
  });
  calculer();
}

/************ FORMES ************/
function updateForme(){
  $('.forme-fields').hide();
  $('#'+$('input[name=forme]:checked').val()+'-fields').show();
}

/************ CALCULS ************/
function calculer(){
  let surface=0,volume=0;
  const f=$('input[name=forme]:checked').val();

  if(f==="rectangle"){surface=getNumber('#L')*getNumber('#l');volume=surface*getNumber('#p');}
  if(f==="carre"){surface=Math.pow(getNumber('#cote'),2);volume=surface*getNumber('#p_carre');}
  if(f==="ronde"){surface=Math.PI*Math.pow(getNumber('#D_piscine')/2,2);volume=surface*getNumber('#p_r');}
  if(f==="ovale"){surface=Math.PI*getNumber('#a_ovale')*getNumber('#b_ovale')/4;volume=surface*getNumber('#p_o');}
  if(f==="libre"){surface=getNumber('#L_libre')*getNumber('#l_libre');volume=surface*getNumber('#p_libre');}

  const debit=volume/(getNumber('#t_recycl')||1);
  const pertes=(getNumber('#L_asp')+getNumber('#L_ref'))*0.02;

  const html=`
  <b>${translations[currentLang].surface} :</b> ${surface.toFixed(2)} m²<br>
  <b>${translations[currentLang].volume} :</b> ${volume.toFixed(2)} m³<br>
  <b>${translations[currentLang].debit} :</b> ${debit.toFixed(2)} m³/h<br>
  <hr>
  <b>${translations[currentLang].pertes_totales} :</b> ${pertes.toFixed(2)} mCE
  `;

  $('#res_droite_contenu').html(html);
  $('#res').html(html);
}

/************ INIT ************/
$(document).ready(function () {

  // langue par défaut
  setLanguage(currentLang);

  // affichage initial de la forme
  updateForme();

  // ⚠️ CALCUL IMMÉDIAT AU CHARGEMENT
  calculer();

  // changement de langue
  $('#lang-select').on('change', function () {
    setLanguage(this.value);
  });

  // recalcul sur toute saisie
  $('input, select').on('input change', function () {
    updateForme();
    calculer();
  });

});

