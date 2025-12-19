const g = 9.81;
const mCE_to_bar = 0.0981;

// Pertes linéaires (ta formule PdeC)
function perteCharge(L, V, D, lambda){
    if(L<=0 || V<=0 || D<=0) return 0;
    return (lambda * L / D) * (V*V / (2*g));
}

// Pertes singulières
function perteSinguliere(nombre, zeta, V){
    return nombre * zeta * V*V / (2*g);
}

// Changer d'onglet
function showTab(tabId){
    $('.tab-pane').removeClass('show active');
    $(tabId).addClass('show active');
    $('.nav-link').removeClass('active');
    $(`a[href='${tabId}']`).addClass('active');
}

// Fonction principale de calcul
function calcul(){
    // Piscine
    const L = +$('#L').val()||0;
    const l = +$('#l').val()||0;
    const p = +$('#p').val()||0;
    const t = +$('#t').val()||5;
    const volume = L*l*p;
    const surface = L*l;
    const debit = volume/t;

    // Température (affecte éventuellement nu mais ici pour info)
    let temp_eau = +$('#temp_eau').val()||20;

    // Canalisations
    let D = (+$('#D').val()||0)/1000; // en m
    let lambda = 0.02;
    switch($('#materiau').val()){
        case "PVC_rigide": lambda=0.02; break;
        case "PVC_souple": lambda=0.035; break;
        case "Turbulence": lambda=0.316; break;
    }

    let L_asp = +$('#L_asp').val()||0;
    let v_asp = +$('#v_asp').val()||0;
    let L_ref = +$('#L_ref').val()||0;
    let v_ref = +$('#v_ref').val()||0;
    if($('#pac').val()==="oui") L_ref += +$('#L_pac').val()||0;

    // Pertes singulières
    const coudes_asp = +$('#coudes_asp').val()||0;
    const tes_asp = +$('#tes_asp').val()||0;
    const vannes_asp = +$('#vannes_asp').val()||0;
    const coudes_ref = +$('#coudes_ref').val()||0;
    const tes_ref = +$('#tes_ref').val()||0;
    const vannes_ref = +$('#vannes_ref').val()||0;

    // Hauteur et pression
    const H_geo = +$('#H_geo').val()||0;
    let dp_filtre_user = +$('#dp_filtre').val()||0;
    const unite = $('#dp_unite').val();
    let dp_filtre_mCE = dp_filtre_user;
    if(unite==="bar") dp_filtre_mCE = dp_filtre_user / mCE_to_bar;
    const dp_filtre_bar = dp_filtre_mCE * mCE_to_bar;

    // Calcul pertes linéaires
    const pcAsp_lineaire = perteCharge(L_asp,v_asp,D,lambda);
    const pcRef_lineaire = perteCharge(L_ref,v_ref,D,lambda);

    // Calcul pertes singulières
    const pcAsp_sing = perteSinguliere(coudes_asp,0.3,v_asp)+perteSinguliere(tes_asp,0.6,v_asp)+perteSinguliere(vannes_asp,0.2,v_asp);
    const pcRef_sing = perteSinguliere(coudes_ref,0.3,v_ref)+perteSinguliere(tes_ref,0.6,v_ref)+perteSinguliere(vannes_ref,0.2,v_ref);

    // Totaux
    const pcAsp_total = pcAsp_lineaire + pcAsp_sing;
    const pcRef_total = pcRef_lineaire + pcRef_sing;
    const HMT_total_mCE = pcAsp_total + pcRef_total + H_geo + dp_filtre_mCE;
    const HMT_total_bar = HMT_total_mCE * mCE_to_bar;

    const disclaimer = `<p style="color:red; font-weight:bold; margin-top:10px;">
⚠️ Les résultats sont à titre indicatif et n'ont aucune valeur contractuelle ou réglementaire.
</p>`;

    // Résumé à droite
    const html_droite = `
    <h5>Résumé rapide</h5>
    <ul>
      <li><b>Volume :</b> ${volume.toFixed(2)} m³</li>
      <li><b>Surface :</b> ${surface.toFixed(2)} m²</li>
      <li><b>Débit filtration :</b> ${debit.toFixed(2)} m³/h</li>
      <li><b>Hauteur géométrique :</b> ${H_geo.toFixed(2)} m</li>
      <li><b>Pression différ. filtre :</b> ${dp_filtre_mCE.toFixed(2)} mCE (${dp_filtre_bar.toFixed(3)} bar)</li>
      <li><b>Température :</b> ${temp_eau} °C</li>
      <li><b>Pertes aspiration :</b> ${pcAsp_total.toFixed(2)} mCE (${(pcAsp_total*mCE_to_bar).toFixed(3)} bar)</li>
      <li><b>Pertes refoulement :</b> ${pcRef_total.toFixed(2)} mCE (${(pcRef_total*mCE_to_bar).toFixed(3)} bar)</li>
      <li><b>Total HMT :</b> ${HMT_total_mCE.toFixed(2)} mCE (${HMT_total_bar.toFixed(3)} bar)</li>
    </ul>${disclaimer}`;

    $('#res_droite').html(html_droite);

    // PDF
    $('#res').html(html_droite);
}

// Calcul automatique à chaque saisie
$('input, select').on('input change', calcul);

// Navigation onglets
$('#btn-piscine').click(()=>showTab('#canalisations'));
$('#btn-canalisations').click(()=>showTab('#pertes_singulieres'));
$('#btn-pertes').click(()=>showTab('#pression_temp'));
$('#btn-pression_temp').click(()=>showTab('#resultats_pdf'));

// Export PDF sur une seule page
$('#btn-pdf').click(()=>{
    const element = document.getElementById('res');
    html2pdf().set({
      margin: 0.5,
      filename: 'Calcul_Pertes_Charge.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'cm', format: 'a4', orientation: 'landscape' }
    }).from(element).save();
});

// Premier calcul au chargement
calcul();
