// ====== TABLE DES COEFFICIENTS K PAR DN ======
const K_TABLE = {
  20: { coude90C: 1.70, coude90G: 0.40, coude45: 0.40, te: 2.00, vanne: 0.08 },
  25: { coude90C: 1.60, coude90G: 0.38, coude45: 0.38, te: 1.90, vanne: 0.07 },
  32: { coude90C: 1.50, coude90G: 0.35, coude45: 0.35, te: 1.80, vanne: 0.06 },
  40: { coude90C: 1.50, coude90G: 0.35, coude45: 0.35, te: 1.80, vanne: 0.05 },
  50: { coude90C: 1.50, coude90G: 0.35, coude45: 0.35, te: 1.80, vanne: 0.05 },
  63: { coude90C: 1.40, coude90G: 0.33, coude45: 0.33, te: 1.70, vanne: 0.05 },
  75: { coude90C: 1.40, coude90G: 0.33, coude45: 0.33, te: 1.70, vanne: 0.05 },
  90: { coude90C: 1.40, coude90G: 0.32, coude45: 0.32, te: 1.60, vanne: 0.05 }
};

// ====== DIAMÈTRES INTÉRIEURS DE RÉFÉRENCE ======
const DN_REFERENCES = {
  20: 15.0, 25: 20.0, 32: 26.0, 40: 34.0,
  50: 46.0, 63: 57.4, 75: 68.0, 90: 83.0
};

// ====== FONCTION POUR DÉTERMINER LE DN LE PLUS PROCHE ======
function getDNFromDiameter(diametreInt) {
  if (!diametreInt || diametreInt <= 0) return 50;
  let dnProche = 50;
  let ecartMin = Math.abs(diametreInt - DN_REFERENCES[50]);
  for (let dn in DN_REFERENCES) {
    let ecart = Math.abs(diametreInt - DN_REFERENCES[dn]);
    if (ecart < ecartMin) {
      ecartMin = ecart;
      dnProche = parseInt(dn);
    }
  }
  return dnProche;
}

// ====== FONCTION POUR OBTENIR LES COEFFICIENTS K ======
function getKValues(dn) {
  if (K_TABLE[dn]) return K_TABLE[dn];
  let dnProche = 50;
  for (let d in K_TABLE) {
    if (Math.abs(dn - parseInt(d)) < Math.abs(dn - dnProche)) {
      dnProche = parseInt(d);
    }
  }
  return K_TABLE[dnProche];
}

// ====== CONVERSIONS ======
function mceToBar(val){ return (val*0.0981).toFixed(2); }
function mceToPsi(val){ return (val*1.422).toFixed(2); }

// ====== SUIVANT ======
function suivant(id){
  $('.tab-pane').removeClass('show active');
  $(id).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href="${id}"]`).addClass('active');
  calculerResultats();
}

// ====== CHOIX FORME ======
function choixForme(){
  var f = $('input[name="forme"]:checked').val();
  $('.forme-fields').hide();
  if(f == "rectangle") $('#rectangle-fields').show();
  else if(f == "carre") $('#carre-fields').show();
  else if(f == "ronde") $('#ronde-fields').show();
  else if(f == "ovale") $('#ovale-fields').show();
  else if(f == "libre") $('#libre-fields').show();
  calculerResultats();
}

// ====== RESET ======
function resetAll(){
  // Vider tous les champs
  $('input').val('');
  $('select').val('PVC_rigide');
  $('input[name="forme"][value="rectangle"]').prop('checked', true);
  choixForme();
  alert('Toutes les données ont été réinitialisées !');
}

// ====== CALCUL PRINCIPAL ======
function calculerResultats(){
  try {
    // Récupération des valeurs
    var forme = $('input[name="forme"]:checked').val();
    var t_renouv = parseFloat($('#t_recycl').val()) || 5;
    var diametreInt = parseFloat($('#D').val()) || 46;
    var v_asp = parseFloat($('#v_asp').val()) || 1.5;
    var v_ref = parseFloat($('#v_ref').val()) || 2.0;
    var L_asp = parseFloat($('#L_asp').val()) || 0;
    var L_ref = parseFloat($('#L_ref').val()) || 0;
    var H_geo = parseFloat($('#H_geo').val()) || 0;
    var dp_filtre = parseFloat($('#dp_filtre').val()) || 0;
    
    // Pertes singulières
    var c90C_asp = parseFloat($('#coudes90C_asp').val()) || 0;
    var c90G_asp = parseFloat($('#coudes90G_asp').val()) || 0;
    var c45_asp = parseFloat($('#coudes45_asp').val()) || 0;
    var tes_asp = parseFloat($('#tes_asp').val()) || 0;
    var vannes_asp = parseFloat($('#vannes_asp').val()) || 0;
    
    var c90C_ref = parseFloat($('#coudes90C_ref').val()) || 0;
    var c90G_ref = parseFloat($('#coudes90G_ref').val()) || 0;
    var c45_ref = parseFloat($('#coudes45_ref').val()) || 0;
    var tes_ref = parseFloat($('#tes_ref').val()) || 0;
    var vannes_ref = parseFloat($('#vannes_ref').val()) || 0;

    // Calcul surface et volume
    var surface = 0, volume = 0;
    var L = parseFloat($('#L').val()) || 0;
    var l = parseFloat($('#l').val()) || 0;
    var p = parseFloat($('#p').val()) || 0;
    
    if(forme == "rectangle"){
      surface = L * l;
      volume = surface * p;
    } else if(forme == "carre"){
      var c = parseFloat($('#cote').val()) || 0;
      var pc = parseFloat($('#p_carre').val()) || 0;
      surface = c * c;
      volume = surface * pc;
    } else if(forme == "ronde"){
      var d = parseFloat($('#D_piscine').val()) || 0;
      var pr = parseFloat($('#p_r').val()) || 0;
      surface = Math.PI * Math.pow(d/2, 2);
      volume = surface * pr;
    } else if(forme == "ovale"){
      var a = parseFloat($('#a_ovale').val()) || 0;
      var b = parseFloat($('#b_ovale').val()) || 0;
      var po = parseFloat($('#p_o').val()) || 0;
      surface = Math.PI * (a/2) * (b/2);
      volume = surface * po;
    } else if(forme == "libre"){
      var Ll = parseFloat($('#L_libre').val()) || 0;
      var ll = parseFloat($('#l_libre').val()) || 0;
      var pl = parseFloat($('#p_libre').val()) || 0;
      surface = Ll * ll;
      volume = surface * pl;
    }
    
    var debit = t_renouv > 0 ? volume / t_renouv : 0;

    // Canalisations
    var DN = diametreInt / 1000;
    var dnCommercial = getDNFromDiameter(diametreInt);
    var kValues = getKValues(dnCommercial);
    
    // Coefficient de friction
    var mat = $('#materiau').val();
    var lambda = 0.02;
    if(mat == "PVC_souple") lambda = 0.035;
    else if(mat == "Turbulent") lambda = 0.316;
    else if(mat == "PE") lambda = 0.025;
    
    // Frictions linéaires
    var H_fric_asp = DN > 0 ? lambda * L_asp / DN * Math.pow(v_asp,2)/(2*9.81) : 0;
    var H_fric_ref = DN > 0 ? lambda * L_ref / DN * Math.pow(v_ref,2)/(2*9.81) : 0;
    
    // Pertes singulières
    var K_asp = (c90C_asp * kValues.coude90C) + (c90G_asp * kValues.coude90G) + 
                (c45_asp * kValues.coude45) + (tes_asp * kValues.te) + (vannes_asp * kValues.vanne);
    var K_ref = (c90C_ref * kValues.coude90C) + (c90G_ref * kValues.coude90G) + 
                (c45_ref * kValues.coude45) + (tes_ref * kValues.te) + (vannes_ref * kValues.vanne);
    
    var H_sing_asp = K_asp * (Math.pow(v_asp, 2) / (2 * 9.81));
    var H_sing_ref = K_ref * (Math.pow(v_ref, 2) / (2 * 9.81));
    
    var H_total_asp = H_sing_asp + H_fric_asp;
    var H_total_ref = H_sing_ref + H_fric_ref;
    var H_total = H_total_asp + H_total_ref + H_geo + dp_filtre;

    // Affichage
    var html = `
<b>Surface :</b> ${surface.toFixed(2)} m²<br>
<b>Volume :</b> ${volume.toFixed(2)} m³<br>
<b>Débit filtration :</b> ${debit.toFixed(2)} m³/h<br>
<b>Diamètre intérieur :</b> ${diametreInt.toFixed(1)} mm<br>
<b>DN sélectionné :</b> ${dnCommercial}<br><hr>
<b>Pertes singulières aspiration :</b> ${H_sing_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_asp)} Bar | ${mceToPsi(H_sing_asp)} PSI</small><br>
<b>Pertes singulières refoulement :</b> ${H_sing_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_sing_ref)} Bar | ${mceToPsi(H_sing_ref)} PSI</small><br>
<b>Hauteur géométrique :</b> ${H_geo.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_geo)} Bar | ${mceToPsi(H_geo)} PSI</small><br>
<b>Perte filtre :</b> ${dp_filtre.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(dp_filtre)} Bar | ${mceToPsi(dp_filtre)} PSI</small><br>
<b>Friction canalisation aspiration :</b> ${H_fric_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_asp)} Bar | ${mceToPsi(H_fric_asp)} PSI</small><br>
<b>Friction canalisation refoulement :</b> ${H_fric_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_fric_ref)} Bar | ${mceToPsi(H_fric_ref)} PSI</small><br><hr>
<b>Total aspiration :</b> ${H_total_asp.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_asp)} Bar | ${mceToPsi(H_total_asp)} PSI</small><br>
<b>Total refoulement :</b> ${H_total_ref.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total_ref)} Bar | ${mceToPsi(H_total_ref)} PSI</small><br>
<b>Pertes totales :</b> ${H_total.toFixed(2)} mCE<br>
<small>≈ ${mceToBar(H_total)} Bar | ${mceToPsi(H_total)} PSI</small>
`;

    $('#res').html(html);
    $('#resultats-content').html(html);
    
  } catch(e) {
    $('#res').html('<p class="text-danger">Erreur de calcul</p>');
    $('#resultats-content').html('<p class="text-danger">Erreur de calcul</p>');
  }
}

// ====== OUVERTURE RAPPORT ======
function ouvrirRapport(){
  var contenu = $('#res').html();
  if (!contenu || contenu.indexOf('Erreur') >= 0) {
    alert('Veuillez saisir des données valides');
    return;
  }
  
  var now = new Date();
  var dateStr = now.toLocaleDateString('fr-FR');
  var heureStr = now.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'});
  
  var rapport = `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Rapport Hydraulique</title>
<style>
body { font-family: Arial; padding: 30px; }
h1 { color: #003366; text-align: center; border-bottom: 3px solid #003366; padding-bottom: 15px; }
.infos { text-align: center; color: #666; margin-bottom: 20px; }
.mention { margin-top: 30px; padding: 15px; background: #f8f9fa; border-left: 4px solid #ffc107; }
@media print { body { padding: 20px; } }
</style>
</head><body>
<h1>RAPPORT D'ÉTUDE HYDRAULIQUE</h1>
<h2 style="text-align:center;color:#0066cc;">Pool Master Hydraulic</h2>
<div class="infos">Date : ${dateStr} | Heure : ${heureStr}</div>
<hr>
${contenu}
<hr>
<div class="mention">⚠️ Les valeurs présentées sont indicatives et permettent une approche dimensionnelle.</div>
<div style="text-align:center;color:#999;margin-top:30px;border-top:2px solid #ccc;padding-top:15px;">
  Pool Master Hydraulic - ${dateStr} ${heureStr}
</div>
<script>
  window.onload = function(){ setTimeout(function(){ window.print(); }, 500); }
</script>
</body></html>
  `;
  
  var fenetre = window.open('', '_blank', 'width=900,height=800,scrollbars=yes');
  if (fenetre) {
    fenetre.document.write(rapport);
    fenetre.document.close();
  } else {
    alert('Veuillez autoriser les popups');
  }
}

// ====== INITIALISATION ======
$(document).ready(function(){
  // Événement sur les radios de forme
  $('input[name="forme"]').on('change', function(){
    choixForme();
  });
  
  // Événement sur tous les inputs et selects
  $('input, select').on('input change', function(){
    calculerResultats();
  });
  
  // Bouton reset
  $('#btn-reset').on('click', function(){
    resetAll();
  });
  
  // Bouton rapport
  $('#btn-rapport').on('click', function(){
    ouvrirRapport();
  });
  
  // Sélecteur de langue
  $('#lang-select').on('change', function(){
    var lang = $(this).val();
    // Pour simplifier, on change juste le titre des boutons
    if(lang == 'fr') {
      $('#btn-rapport').text('📄 Afficher le rapport complet');
      $('#btn-reset').text('🔄 Réinitialiser');
    } else if(lang == 'en') {
      $('#btn-rapport').text('📄 View full report');
      $('#btn-reset').text('🔄 Reset');
    } else if(lang == 'es') {
      $('#btn-rapport').text('📄 Ver informe completo');
      $('#btn-reset').text('🔄 Reiniciar');
    }
  });
  
  // Initialisation
  choixForme();
  calculerResultats();
  
  // Reset automatique à l'ouverture
  if (localStorage.getItem('reset_required') == 'true') {
    localStorage.removeItem('reset_required');
    resetAll();
  }
});
