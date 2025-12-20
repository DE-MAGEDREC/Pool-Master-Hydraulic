const g = 9.81;
const mCE_to_bar = 0.0981;

// Pertes linéaires
function perteCharge(L, V, D, lambda){
  if(L<=0 || V<=0 || D<=0) return 0;
  return (lambda * L / D) * (V*V / (2*g));
}

// Pertes singulières
function perteSinguliere(nombre, zeta, V){
  return nombre * zeta * V*V / (2*g);
}

// Changement d’onglet
function showTab(tabId){
  $('.tab-pane').removeClass('show active');
  $(tabId).addClass('show active');
  $('.nav-link').removeClass('active');
  $(`a[href='${tabId}']`).addClass('active');
}

// Calcul principal
function calcul(){
  const L = +$('#L').val()||0;
  const l = +$('#l').val()||0;
  const p = +$('#p').val()||0;
  const t = +$('#t').val()||5;

  const volume = L*l*p;
  const surface = L*l;
  const debit = volume/t;

  const D = (+$('#D').val()||0)/1000;
  let lambda = 0.02;
  if($('#materiau').val()==="PVC_souple") lambda=0.035;
  if($('#materiau').val()==="Turbulence") lambda=0.316;

  let L_asp = +$('#L_asp').val()||0;
  let v_asp = +$('#v_asp').val()||0;
  let L_ref = +$('#L_ref').val()||0;
  let v_ref = +$('#v_ref').val()||0;

  if($('#pac').val()==="oui") {
    L_ref += +$('#L_pac').val()||0;
  }

  const coudes_asp = +$('#coudes_asp').val()||0;
  const tes_asp = +$('#tes_asp').val()||0;
  const vannes_asp = +$('#vannes_asp').val()||0;
  const coudes_ref = +$('#coudes_ref').val()||0;
  const tes_ref = +$('#tes_ref').val()||0;
  const vannes_ref = +$('#vannes_ref').val()||0;

  const H_geo = +$('#H_geo').val()||0;
  const dp_filtre = +$('#dp_filtre').val()||0;

  const pcAsp =
    perteCharge(L_asp,v_asp,D,lambda) +
    perteSinguliere(coudes_asp,0.3,v_asp) +
    perteSinguliere(tes_asp,0.6,v_asp) +
    perteSinguliere(vannes_asp,0.2,v_asp);

  const pcRef =
    perteCharge(L_ref,v_ref,D,lambda) +
    perteSinguliere(coudes_ref,0.3,v_ref) +
    perteSinguliere(tes_ref,0.6,v_ref) +
    perteSinguliere(vannes_ref,0.2,v_ref);

  const HMT = pcAsp + pcRef + H_geo + dp_filtre;

  $('#res_droite').html(`
    <h5>Résumé rapide</h5>
    <ul>
      <li>Volume : ${volume.toFixed(2)} m³</li>
      <li>Surface : ${surface.toFixed(2)} m²</li>
      <li>Débit : ${debit.toFixed(2)} m³/h</li>
      <li>HMT totale : ${HMT.toFixed(2)} mCE</li>
    </ul>
    <p style="color:red;font-weight:bold">
      ⚠️ Résultats indicatifs
    </p>
  `);

  $('#res').html($('#res_droite').html());
}

$('input, select').on('input change', calcul);

$('#btn-pdf').click(()=>{
  html2pdf().from(document.getElementById('res')).save();
});

calcul();
