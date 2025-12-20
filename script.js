// ====== LANGUES ======
const translations = {
  en: { 
    title:"Pool Master Hydraulic",
    piscine_tab:"Pool",
    canalisations_tab:"Pipes",
    pertes_tab:"Singular losses",
    pression_tab:"Pressure & Temperature",
    resultats_tab:"Results / PDF",
    surface:"Surface",
    volume:"Volume",
    debit:"Filtration flow rate",
    longueur:"Length (m)",
    largeur:"Width (m)",
    profondeur:"Depth (m)",
    forme_rect:"Rectangle",
    forme_carre:"Square",
    forme_rond:"Round",
    forme_ovale:"Oval",
    forme_libre:"Free shape",
    recyclage:"Water renewal time (h)",
    suivant:"Next →",
    resultats:"Results",
    pertes_sing:"Singular losses",
    filtre:"Filter loss",
    hauteur:"Geometric height",
    friction:"Pipe friction",
    total_asp:"Total suction",
    total_ref:"Total discharge",
    exporter:"Export PDF",
    logout:"Logout",
    en_bar:" (bar)"
  },
  fr: { 
    title:"Pool Master Hydraulic",
    piscine_tab:"Piscine",
    canalisations_tab:"Canalisations",
    pertes_tab:"Pertes singulières",
    pression_tab:"Pression & Température",
    resultats_tab:"Résultats / PDF",
    surface:"Surface",
    volume:"Volume",
    debit:"Débit filtration",
    longueur:"Longueur (m)",
    largeur:"Largeur (m)",
    profondeur:"Profondeur (m)",
    forme_rect:"Rectangle",
    forme_carre:"Carré",
    forme_rond:"Ronde",
    forme_ovale:"Ovale",
    forme_libre:"Forme libre",
    recyclage:"Temps de recyclage de l'eau (h)",
    suivant:"Suivant →",
    resultats:"Résultats",
    pertes_sing:"Pertes singulières",
    filtre:"Perte filtre",
    hauteur:"Hauteur géométrique",
    friction:"Friction canalisations",
    total_asp:"Total aspiration",
    total_ref:"Total refoulement",
    exporter:"Exporter PDF",
    logout:"Déconnexion",
    en_bar:" (bar)"
  },
  es: { 
    title:"Pool Master Hydraulic",
    piscine_tab:"Piscina",
    canalisations_tab:"Tuberías",
    pertes_tab:"Pérdidas singulares",
    pression_tab:"Presión & Temperatura",
    resultats_tab:"Resultados / PDF",
    surface:"Superficie",
    volume:"Volumen",
    debit:"Caudal filtración",
    longueur:"Longitud (m)",
    largeur:"Ancho (m)",
    profondeur:"Profundidad (m)",
    forme_rect:"Rectangular",
    forme_carre:"Cuadrada",
    forme_rond:"Redonda",
    forme_ovale:"Ovalada",
    forme_libre:"Forma libre",
    recyclage:"Tiempo de renovación del agua (h)",
    suivant:"Siguiente →",
    resultats:"Resultados",
    pertes_sing:"Pérdidas singulares",
    filtre:"Pérdida de filtro",
    hauteur:"Altura geométrica",
    friction:"Fricción tuberías",
    total_asp:"Total aspiración",
    total_ref:"Total impulsión",
    exporter:"Exportar PDF",
    logout:"Cerrar sesión",
    en_bar:" (bar)"
  }
};

let currentLang = "fr";

// ====== NAVIGATION ONGLET ======
function suivant(id){
  calculerResultats(); // Valide avant de passer
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
}

// ====== CONVERSION ======
function mceToBar(val){ return (val*0.0981).toFixed(2); }
function getLambda(mat){
  if(mat=="PVC_rigide") return 0.02;
  if(mat=="PVC_souple") return 0.035;
  if(mat=="Turbulence") return 0.316;
  return 0.02;
}

// ====== COEFFICIENTS ACCESSOIRES ======
const coeffsAccessoires = {
  "Coude_90_long_rayon":20,
  "Coude_90_court_rayon":30,
  "Coude_45":12.5,
  "Te_passage_droit":40,
  "Te_derivation":80,
  "Manchon":2.5,
  "Clapet_anti_retour":125,
  "Vanne":8
};

const accessoiresNames = {
  "Coude_90_long_rayon":"Coude 90° long rayon",
  "Coude_90_court_rayon":"Coude 90° court rayon",
  "Coude_45":"Coude 45°",
  "Te_passage_droit":"Té – passage droit",
  "Te_derivation":"Té – dérivation",
  "Manchon":"Manchon",
  "Clapet_anti_retour":"Clapet anti‑retour",
  "Vanne":"Vanne"
};

// ====== GENERER CHAMPS ACCESSOIRES ======
function genererAccessoires(){
  const container = $('#accessoires-list');
  container.empty();
  container.append('<div class="row font-weight-bold mb-2"><div class="col-6">Accessoire</div><div class="col-3">Aspiration</div><div class="col-3">Refoulement</div></div>');
  for(let key in coeffsAccessoires){
    container.append(`
      <div class="row mb-1">
        <div class="col-6">${accessoiresNames[key]}</div>
        <div class="col-3"><input type="number" min="0" step="1" value="0" id="asp_${key}" class="form-control"></div>
        <div class="col-3"><input type="number" min="0" step="1" value="0" id="ref_${key}" class="form-control"></div>
      </div>
    `);
  }
}

// ====== CALCUL ACCESSOIRES ======
function calculAccessoires(prefix, D_m){
  let total = 0;
  for(let key in coeffsAccessoires){
    const qty = +$(`#${prefix}_${key}`).val()||0;
    total += qty * coeffsAccessoires[key] * D_m;
  }
  return total;
}

// ====== CALCUL PRINCIPAL ======
function calculerResultats(){
  const t = translations[currentLang];

  // Piscine
  const forme = $('input[name="forme"]:checked').val();
  const L_val = +$('#L').val()||0;
  const l_val = +$('#l').val()||0;
  const p_val = +$('#p').val()||0;
  const t_recycl = +$('#t').val()||5;

  let surface=0, volume=0;
  if(forme=="rectangle" || forme=="carre") surface = L_val*l_val;
  else if(forme=="ronde") surface = Math.PI*Math.pow(L_val/2,2);
  else if(forme=="ovale") surface = Math.PI*L_val*l_val/4;
  else surface = L_val*l_val;
  volume = surface*p_val;

  const debit = volume / t_recycl;

  // Canalisations
  const D_mm = +$('#D').val()||50;
  const D_m = D_mm/1000;
  const lambda = getLambda($('#materiau').val());

  const L_asp_val = +$('#L_asp').val()||0;
  const L_ref_val = +$('#L_ref').val()||0;
  const V_asp = +$('#v_asp').val()||0;
  const V_ref = +$('#v_ref').val()||0;

  // Accessoires
  const H_sing_asp = calculAccessoires('asp', D_m);
  const H_sing_ref = calculAccessoires('ref', D_m);

  // Pertes Darcy
  const H_fric_asp = lambda*(L_asp_val + H_sing_asp)/D_m*(V_asp*V_asp/(2*9.81));
  const H_fric_ref = lambda*(L_ref_val + H_sing_ref)/D_m*(V_ref*V_ref/(2*9.81));

  const H_geo_val = +$('#H_geo').val()||0;
  const dp_filtre_val = +$('#dp_filtre').val()||0;

  const H_total_asp = H_fric_asp + H_sing_asp;
  const H_total_ref = H_fric_ref + H_sing_ref;
  const H_total_install = H_total_asp + H_total_ref + H_geo_val + dp_filtre_val;

  // Remplir tableau à droite
  const tbody = $('#res_droite tbody');
  tbody.empty();

  function ajouterLigne(nom, valeur){
    tbody.append(`
      <tr>
        <td>${nom}</td>
        <td>${valeur.toFixed(2)}</td>
        <td>${mceToBar(valeur)}</td>
      </tr>
    `);
  }

  ajouterLigne(t.surface, surface);
  ajouterLigne(t.volume, volume);
  ajouterLigne(t.debit, debit);
  ajouterLigne(t.pertes_sing+" aspiration", H_sing_asp);
  ajouterLigne(t.pertes_sing+" refoulement", H_sing_ref);
  ajouterLigne(t.friction+" aspiration", H_fric_asp);
  ajouterLigne(t.friction+" refoulement", H_fric_ref);
  ajouterLigne(t.hauteur, H_geo_val);
  ajouterLigne(t.filtre, dp_filtre_val);
  ajouterLigne(t.total_asp, H_total_asp);
  ajouterLigne(t.total_ref, H_total_ref);
  ajouterLigne("Perte totale installation", H_total_install);
}

// ====== LANGUE ======
function setLanguage(lang){
  currentLang = lang;
  const t = translations[lang];
  $('#title').text(t.title);
  $('#tab-piscine').text(t.piscine_tab);
  $('#tab-canalisations').text(t.canalisations_tab);
  $('#tab-pertes').text(t.pertes_tab);
  $('#tab-pression').text(t.pression_tab);
  $('#tab-resultats').text(t.resultats_tab);

  $('#lbl-forme').text(t.piscine_tab);
  $('#lbl-longueur').text(t.longueur);
  $('#lbl-largeur').text(t.largeur);
  $('#lbl-profondeur').text(t.profondeur);
  $('#lbl-recyclage').text(t.recyclage);
  $('#lbl-dn').text("DN (mm)");
  $('#lbl-materiau').text("Matériau");
  $('#lbl-long-asp').text("Longueur aspiration (m)");
  $('#lbl-v-asp').text("Vitesse aspiration (m/s)");
  $('#lbl-long-ref').text("Longueur refoulement (m)");
  $('#lbl-v-ref').text("Vitesse refoulement (m/s)");
  $('#lbl-pertes').text(t.pertes_sing);
  $('#lbl-hauteur').text(t.hauteur);
  $('#lbl-filtre').text(t.filtre);
  $('#btn-suivant-piscine').text(t.suivant);
  $('#btn-suivant-canalisations').text(t.suivant);
  $('#btn-suivant-pertes').text(t.suivant);
  $('#btn-suivant-pression').text(t.suivant);
  $('#btn-pdf').text(t.exporter);
}

// ====== EXPORT PDF ======
$('#btn-pdf').on('click', function(){
  const element = document.getElementById('res_droite');
  html2pdf().from(element).save('resultats.pdf');
});

// ====== INITIALISATION ======
$(document).ready(function(){
  genererAccessoires();
  setLanguage(currentLang);
  calculerResultats();
  $('input, select').on('input change', calculerResultats);
  $('#lang-select').on('change', function(){ setLanguage($(this).val()); });
});
