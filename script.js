const t = {
fr:{
title:"Assistant hydraulique piscine",
logout:"Déconnexion",
mode_title:"Mode de calcul",
mode_direct:"Dimensionnement",
mode_inverse:"Audit existant",
pool:"Piscine",
volume:"Volume (m³)",
recycle:"Temps de recyclage (h)",
pipes:"Canalisations",
diameter:"Diamètre DN (mm)",
length_asp:"Longueur aspiration (m)",
length_ref:"Longueur refoulement (m)",
losses:"Pertes singulières",
elbow_short:"Coude 90° court",
elbow_long:"Coude 90° long",
tee:"Té",
valve:"Vanne",
pump:"Pompe & filtration",
pump_flow:"Débit pompe (m³/h)",
geo_height:"Hauteur géométrique (m)",
filter_loss:"Perte filtre (mCE)",
results:"Résultats",
prev:"⏮ Précédent",
next:"Suivant ⏭",
ok:"Installation conforme",
warn:"Zone limite",
bad:"Cavitation probable"
},
en:{
title:"Pool hydraulic assistant",
logout:"Logout",
mode_title:"Calculation mode",
mode_direct:"Sizing",
mode_inverse:"Audit",
pool:"Pool",
volume:"Volume (m³)",
recycle:"Recycle time (h)",
pipes:"Pipes",
diameter:"Pipe diameter (mm)",
length_asp:"Suction length (m)",
length_ref:"Discharge length (m)",
losses:"Singular losses",
elbow_short:"90° short elbow",
elbow_long:"90° long elbow",
tee:"Tee",
valve:"Valve",
pump:"Pump & filtration",
pump_flow:"Pump flow (m³/h)",
geo_height:"Geometric height (m)",
filter_loss:"Filter loss (mCE)",
results:"Results",
prev:"⏮ Previous",
next:"Next ⏭",
ok:"Installation OK",
warn:"Critical zone",
bad:"Cavitation likely"
},
es:{
title:"Asistente hidráulico piscina",
logout:"Cerrar sesión",
mode_title:"Modo de cálculo",
mode_direct:"Dimensionamiento",
mode_inverse:"Auditoría",
pool:"Piscina",
volume:"Volumen (m³)",
recycle:"Tiempo reciclaje (h)",
pipes:"Tuberías",
diameter:"Diámetro (mm)",
length_asp:"Longitud aspiración (m)",
length_ref:"Longitud impulsión (m)",
losses:"Pérdidas singulares",
elbow_short:"Codo 90° corto",
elbow_long:"Codo 90° largo",
tee:"Te",
valve:"Válvula",
pump:"Bomba y filtración",
pump_flow:"Caudal bomba (m³/h)",
geo_height:"Altura geométrica (m)",
filter_loss:"Pérdida filtro (mCE)",
results:"Resultados",
prev:"⏮ Anterior",
next:"Siguiente ⏭",
ok:"Instalación correcta",
warn:"Zona crítica",
bad:"Cavitación probable"
}
};

let lang="fr";
let step=0;
const steps=$(".wizard-step");

function applyLang(){
$("[data-i18n]").each(function(){
const k=$(this).data("i18n");
$(this).text(t[lang][k]);
});
}
$("#lang").on("change",e=>{lang=e.target.value;applyLang();calc();});

function next(){ if(step<steps.length-1){step++;update();}}
function prev(){ if(step>0){step--;update();}}
function update(){steps.removeClass("active").eq(step).addClass("active");calc();}

function calc(){
const mode=$("input[name=mode]:checked").val();
const vol=+$("#volume").val()||0;
const rec=+$("#recycle").val()||5;
const Q = mode==="direct"? vol/rec : +$("#pumpFlow").val()||0;
const Qs=Q/3600;
const D=(+$("#dn").val()||50)/1000;
const S=Math.PI*(D/2)**2;
const v=Qs/S||0;

const lambda=0.02;
const g=9.81;
const L= (+$("#Lasp").val()||0)+(+$("#Lref").val()||0);
const hf=lambda*(L/D)*(v*v/(2*g));

const K= (+$("#k1").val()||0)*0.9+(+$("#k2").val()||0)*0.4+(+$("#k3").val()||0)*0.6+(+$("#k4").val()||0)*0.2;
const hs=K*(v*v/(2*g));

const Hgeo=+$("#Hgeo").val()||0;
const Hf=+$("#filterLoss").val()||0;
const Htot=hf+hs+Hgeo+Hf;

const bar=(Htot*0.0981).toFixed(2);
const psi=(bar*14.5038).toFixed(1);

const NPSHa=10.33-0.24-hf;
let diag=t[lang].ok, cls="alert-ok";
if(NPSHa<3){diag=t[lang].warn;cls="alert-warn";}
if(NPSHa<1.5){diag=t[lang].bad;cls="alert-bad";}

$("#results").html(`
<b>Q :</b> ${Q.toFixed(2)} m³/h<br>
<b>v :</b> ${v.toFixed(2)} m/s<br>
<b>H :</b> ${Htot.toFixed(2)} mCE<br>
<b>${bar} bar / ${psi} PSI</b><hr>
<b class="${cls}">${diag}</b>
`);
}

$(document).ready(()=>{applyLang();update();});
