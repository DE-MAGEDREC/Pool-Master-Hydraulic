const translations = {
fr:{
 title:"Pool Master Hydraulic",
 tab_piscine:"Piscine",
 tab_canal:"Canalisations",
 tab_pression:"Pression",
 longueur:"Longueur (m)",
 largeur:"Largeur (m)",
 profondeur:"Profondeur (m)",
 recyclage:"Temps recyclage (h)",
 dn:"Diamètre DN (mm)",
 asp_len:"Longueur aspiration (m)",
 asp_v:"Vitesse aspiration (m/s)",
 ref_len:"Longueur refoulement (m)",
 ref_v:"Vitesse refoulement (m/s)",
 hauteur:"Hauteur géométrique (m)",
 filtre:"Perte filtre (mCE)",
 resultats:"Résultats en temps réel",
 surface:"Surface",
 volume:"Volume",
 debit:"Débit",
 asp:"Aspiration",
 ref:"Refoulement",
 total:"Perte totale installation",
 export_pdf:"Exporter PDF",
 logout:"Déconnexion",
 param:"Paramètre"
},
en:{
 title:"Pool Master Hydraulic",
 tab_piscine:"Pool",
 tab_canal:"Pipes",
 tab_pression:"Pressure",
 longueur:"Length (m)",
 largeur:"Width (m)",
 profondeur:"Depth (m)",
 recyclage:"Turnover time (h)",
 dn:"Diameter DN (mm)",
 asp_len:"Suction length (m)",
 asp_v:"Suction velocity (m/s)",
 ref_len:"Discharge length (m)",
 ref_v:"Discharge velocity (m/s)",
 hauteur:"Geometric head (m)",
 filtre:"Filter loss (m)",
 resultats:"Live results",
 surface:"Area",
 volume:"Volume",
 debit:"Flow rate",
 asp:"Suction",
 ref:"Discharge",
 total:"Total system head",
 export_pdf:"Export PDF",
 logout:"Logout",
 param:"Parameter"
},
es:{
 title:"Pool Master Hydraulic",
 tab_piscine:"Piscina",
 tab_canal:"Tuberías",
 tab_pression:"Presión",
 longueur:"Longitud (m)",
 largeur:"Ancho (m)",
 profondeur:"Profundidad (m)",
 recyclage:"Tiempo de renovación (h)",
 dn:"Diámetro DN (mm)",
 asp_len:"Longitud aspiración (m)",
 asp_v:"Velocidad aspiración (m/s)",
 ref_len:"Longitud impulsión (m)",
 ref_v:"Velocidad impulsión (m/s)",
 hauteur:"Altura geométrica (m)",
 filtre:"Pérdida filtro (m)",
 resultats:"Resultados en tiempo real",
 surface:"Superficie",
 volume:"Volumen",
 debit:"Caudal",
 asp:"Aspiración",
 ref:"Impulsión",
 total:"Pérdida total instalación",
 export_pdf:"Exportar PDF",
 logout:"Cerrar sesión",
 param:"Parámetro"
}
};

let currentLang="fr";

function setLanguage(lang){
 currentLang=lang;
 const t=translations[lang];
 document.querySelectorAll("[data-i18n]").forEach(e=>{
   const k=e.dataset.i18n;
   if(t[k]) e.textContent=t[k];
 });
 calcul();
}

function mceToBar(v){return (v*0.0981).toFixed(2);}

function calcul(){
 const t=translations[currentLang];

 const L=+$('#L').val()||0;
 const l=+$('#l').val()||0;
 const p=+$('#p').val()||0;
 const tr=+$('#t').val()||5;

 const surface=L*l;
 const volume=surface*p;
 const debit=volume/tr;

 const D=(+$('#D').val()||50)/1000;
 const Lasp=+$('#L_asp').val()||0;
 const Lref=+$('#L_ref').val()||0;
 const vasp=+$('#v_asp').val()||0;
 const vref=+$('#v_ref').val()||0;

 const lambda=0.02;
 const Hasp=lambda*Lasp/D*(vasp**2/(2*9.81));
 const Href=lambda*Lref/D*(vref**2/(2*9.81));

 const Hgeo=+$('#H_geo').val()||0;
 const Hfil=+$('#dp_filtre').val()||0;
 const Htot=Hasp+Href+Hgeo+Hfil;

 const tb=$("#res_droite tbody");
 tb.empty();
 const add=(n,v)=>tb.append(`<tr><td>${n}</td><td>${v.toFixed(2)}</td><td>${mceToBar(v)}</td></tr>`);

 add(t.surface,surface);
 add(t.volume,volume);
 add(t.debit,debit);
 add(t.asp,Hasp);
 add(t.ref,Href);
 add(t.total,Htot);
}

$("#lang-select").on("change",e=>setLanguage(e.target.value));
$("input").on("input",calcul);
$("#btn-pdf").click(()=>html2pdf().from(res_droite).save("pool_master.pdf"));

$(document).ready(()=>{
 setLanguage("fr");
 calcul();
});
