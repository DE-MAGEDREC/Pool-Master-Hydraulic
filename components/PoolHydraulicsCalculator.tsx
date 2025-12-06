"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslation } from "@/lib/i18n/translations";
import { generatePDF } from "@/lib/pdf/generate-report";
import { getSupabase } from "@/lib/supabase/client";

export default function PoolHydraulicsCalculator() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const [flowRate, setFlowRate] = useState("");
  const [pipeDiameter, setPipeDiameter] = useState("");
  const [pipeLength, setPipeLength] = useState("");
  const [lossCoefficient, setLossCoefficient] = useState("");

  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  function calculate() {
    const q = parseFloat(flowRate);
    const d = parseFloat(pipeDiameter);
    const L = parseFloat(pipeLength);
    const k = parseFloat(lossCoefficient);

    if (isNaN(q) || isNaN(d) || isNaN(L) || isNaN(k)) {
      alert(t.invalidInputs);
      return;
    }

    // Débit m3/h → m3/s
    const Q = q / 3600;

    // Aire de la conduite
    const A = Math.PI * Math.pow(d / 1000 / 2, 2);

    // Vitesse
    const velocity = Q / A;

    // Pertes de charge Hazen-Williams simplifiées (exemple)
    const headLoss = k * L * Math.pow(velocity, 2);

    setResults({
      velocity,
      headLoss,
      inputs: { q, d, L, k }
    });
  }

  async function handleSendEmail() {
    if (!results) return;

    setLoading(true);
    try {
      const supabase = getSupabase();

      const { data: { session } } = await supabase.auth.getSession();
      const email = session?.user?.email;

      if (!email) {
        alert(t.mustBeLoggedIn);
        return;
      }

      const resp = await fetch("/api/send-calculation-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: "Résultats de calcul hydraulique",
          results
        })
      });

      if (!resp.ok) {
        throw new Error("API email error");
      }

      alert(t.emailSent);
    } catch (e) {
      alert("Erreur email : " + e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDownloadPDF() {
    if (!results) return;
    generatePDF(results);
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h2>{t.calculatorTitle}</h2>

      <div>
        <label>{t.flowRate}</label><br />
        <input value={flowRate} onChange={e => setFlowRate(e.target.value)} />
      </div>

      <div>
        <label>{t.pipeDiameter}</label><br />
        <input value={pipeDiameter} onChange={e => setPipeDiameter(e.target.value)} />
      </div>

      <div>
        <label>{t.pipeLength}</label><br />
        <input value={pipeLength} onChange={e => setPipeLength(e.target.value)} />
      </div>

      <div>
        <label>{t.lossCoefficient}</label><br />
        <input value={lossCoefficient} onChange={e => setLossCoefficient(e.target.value)} />
      </div>

      <button onClick={calculate} style={{ marginTop: 15 }}>
        {t.calculate}
      </button>

      {results && (
        <div style={{ marginTop: 25 }}>
          <h3>{t.results}</h3>
          <p>{t.velocity}: {results.velocity.toFixed(3)} m/s</p>
          <p>{t.headLoss}: {results.headLoss.toFixed(3)} mCE</p>

          <button onClick={handleDownloadPDF}>{t.downloadPDF}</button>
          <button onClick={handleSendEmail} disabled={loading} style={{ marginLeft: 10 }}>
            {loading ? t.sending : t.sendByEmail}
          </button>
        </div>
      )}
    </div>
  );
}
