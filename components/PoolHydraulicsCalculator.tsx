"use client";

import React, { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslation } from "@/lib/i18n/translations";
import { getSupabase } from "@/lib/supabase/client";
import { generatePoolCalculationPDF, type PoolCalculationData } from "@/lib/pdf/generate-report";

/**
 * PoolHydraulicsCalculator
 * Version allégée, typée et robuste :
 * - validation simple des entrées
 * - calculs principaux (surface, volume, débits, pertes simplifiées)
 * - export PDF via generatePoolCalculationPDF()
 * - envoi par mail via endpoint /api/send-calculation-email
 *
 * Note : ce composant évite les imports serveur-only et s'exécute côté client.
 */

type Shape = "rectangle" | "circle" | "oval";

function safeNumber(v: unknown, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export default function PoolHydraulicsCalculator() {
  const { language } = useLanguage();
  const t = getTranslation(language || "fr");

  // Basic pool & filtration inputs
  const [shape, setShape] = useState<Shape>("rectangle");
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(5);
  const [diameter, setDiameter] = useState<number>(2); // m for circle
  const [avgDepth, setAvgDepth] = useState<number>(1.5);
  const [filtrationHours, setFiltrationHours] = useState<number>(5);

  // Hydraulic inputs
  const [pipeMaterial, setPipeMaterial] = useState<string>("pvc-souple");
  const [dnSuction, setDnSuction] = useState<string>("DN50");
  const [dnReturn, setDnReturn] = useState<string>("DN50");
  const [pipeLengthSuction, setPipeLengthSuction] = useState<number>(15);
  const [pipeLengthReturn, setPipeLengthReturn] = useState<number>(15);
  const [elevationDiff, setElevationDiff] = useState<number>(0.5);
  const [filterLoss, setFilterLoss] = useState<number>(6);

  // Minor losses coefficients & counts
  const [skimmers, setSkimmers] = useState<number>(2);
  const [returns, setReturns] = useState<number>(2);
  const [mainDrains, setMainDrains] = useState<number>(1);
  const [kSkimmer, setKSkimmer] = useState<number>(0.5);
  const [kReturn, setKReturn] = useState<number>(1.0);
  const [kMainDrain, setKMainDrain] = useState<number>(0.5);

  // Simple UI state
  const [resultsVisible, setResultsVisible] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Constants
  const g = 9.80665;
  const rho = 1000;
  const nu = 1e-6;

  const dnToDiameter: Record<string, number> = {
    DN32: 0.027,
    DN38: 0.033,
    DN50: 0.043,
    DN63: 0.055,
  };

  const materialToRoughness: Record<string, number> = {
    "pvc-souple": 2.5e-6,
    "pvc-pn10": 1.5e-6,
    "pvc-pn16": 1.5e-6,
    pe: 2.0e-6,
  };

  const pipeRoughness = materialToRoughness[pipeMaterial] ?? 2e-6;

  // Area & volume
  const area = useMemo(() => {
    if (shape === "rectangle") return safeNumber(length, 10) * safeNumber(width, 5);
    if (shape === "circle") return Math.PI * Math.pow(safeNumber(diameter, 2) / 2, 2);
    // oval approximation
    return Math.PI * (safeNumber(length, 10) / 2) * (safeNumber(width, 5) / 2);
  }, [shape, length, width, diameter]);

  const volume = useMemo(() => {
    return safeNumber(area, 1) * safeNumber(avgDepth, 1.5);
  }, [area, avgDepth]);

  const defaultFiltration_m3h = useMemo(() => {
    const vol = safeNumber(volume, 75);
    const hours = safeNumber(filtrationHours, 5);
    return vol / Math.max(1, hours);
  }, [volume, filtrationHours]);

  const totalFlow_m3s = defaultFiltration_m3h / 3600;

  // split flow
  const suctionCount = Math.max(1, safeNumber(skimmers, 2) + safeNumber(mainDrains, 1));
  const returnsCount = Math.max(1, safeNumber(returns, 2));
  const flowPerSuction = totalFlow_m3s / suctionCount;
  const flowPerReturn = totalFlow_m3s / returnsCount;

  const diameterSuction = dnToDiameter[dnSuction] ?? 0.043;
  const diameterReturn = dnToDiameter[dnReturn] ?? 0.043;

  const actualVelocitySuction = (4 * flowPerSuction) / (Math.PI * Math.pow(diameterSuction, 2));
  const actualVelocityReturn = (4 * flowPerReturn) / (Math.PI * Math.pow(diameterReturn, 2));

  function swameeJain(eps: number, d: number, Re: number) {
    if (Re < 2000) return 64 / Re;
    const A = eps / (3.7 * d);
    const B = 5.74 / Math.pow(Re, 0.9);
    const f = 0.25 / Math.pow(Math.log10(A + B), 2);
    return Number.isFinite(f) ? f : 0.02;
  }

  const results = useMemo(() => {
    const V_s = actualVelocitySuction || 2.5;
    const d_s = diameterSuction;
    const Re_s = (V_s * d_s) / nu;
    const f_s = swameeJain(pipeRoughness, d_s, Re_s);
    const hf_s = (f_s * (safeNumber(pipeLengthSuction, 15) / d_s) * V_s ** 2) / (2 * g);
    const hminor_s =
      ((safeNumber(skimmers, 2) * safeNumber(kSkimmer, 0.5) + safeNumber(mainDrains, 1) * safeNumber(kMainDrain, 0.5)) *
        V_s ** 2) /
      (2 * g);

    const V_r = actualVelocityReturn || 3;
    const d_r = diameterReturn;
    const Re_r = (V_r * d_r) / nu;
    const f_r = swameeJain(pipeRoughness, d_r, Re_r);
    const hf_r = (f_r * (safeNumber(pipeLengthReturn, 15) / d_r) * V_r ** 2) / (2 * g);
    const hminor_r = (safeNumber(returns, 2) * safeNumber(kReturn, 1.0) * V_r ** 2) / (2 * g);

    const TDH_m = safeNumber(elevationDiff, 0.5) + hf_s + hminor_s + hf_r + hminor_r + safeNumber(filterLoss, 6);
    const pressure_bar = (rho * g * TDH_m) / 1e5;

    return {
      hf_s,
      hminor_s,
      hf_r,
      hminor_r,
      TDH_m,
      pressure_bar,
      actualVelocitySuction,
      actualVelocityReturn,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pipeLengthSuction,
    pipeLengthReturn,
    skimmers,
    mainDrains,
    returns,
    elevationDiff,
    filterLoss,
    pipeRoughness,
    actualVelocitySuction,
    actualVelocityReturn,
  ]);

  // Prepare data object matching PDF generator type
  function buildCalculationData(): PoolCalculationData {
    return {
      userName: "",
      userEmail: "",
      date: new Date().toLocaleDateString(language),
      shape,
      dimensions: {
        length: shape !== "circle" ? length : undefined,
        width: shape !== "circle" ? width : undefined,
        diameter: shape === "circle" ? diameter : undefined,
        avgDepth,
      },
      area,
      volume,
      filtrationHours,
      recommendedFlow: defaultFiltration_m3h,
      pipeMaterial,
      dnSuction,
      dnReturn,
      velocityAspiration: actualVelocitySuction,
      velocityRefoulement: actualVelocityReturn,
      actualVelocitySuction,
      actualVelocityReturn,
      skimmers,
      returns,
      mainDrains,
      pipeLengthSuction,
      pipeLengthReturn,
      elevationDiff,
      filterLoss,
      results: {
        hf_s: results.hf_s,
        hminor_s: results.hminor_s,
        hf_r: results.hf_r,
        hminor_r: results.hminor_r,
        TDH_m: results.TDH_m,
        pressure_bar: results.pressure_bar,
      },
      language,
    };
  }

  // Download PDF
  async function handleDownloadPDF() {
    try {
      const data = buildCalculationData();
      const blob = generatePoolCalculationPDF(data, getTranslation(language));
      // generatePoolCalculationPDF returns a Blob
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pool-calculation-${new Date().toISOString().slice(0, 10)}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setMessage(t.emailSent ? `${t.downloadPDF} - OK` : "PDF generated");
    } catch (err: any) {
      console.error(err);
      setMessage(t.pdfError || "Erreur génération PDF");
    }
  }

  // Send email (calls your server API)
  async function handleSendEmail() {
    setMessage(null);
    if (!results) {
      setMessage(t.invalidInputs || "Remplissez les champs");
      return;
    }

    setLoadingEmail(true);
    try {
      const supabase = getSupabase();
      const { data } = await supabase.auth.getSession();
      const email = data?.session?.user?.email;

      if (!email) {
        setMessage(t.mustBeLoggedIn || "Vous devez être connecté");
        setLoadingEmail(false);
        return;
      }

      const payload = {
        to: email,
        subject: `${t.calculatorTitle} — Résultats`,
        results: buildCalculationData(),
      };

      const resp = await fetch("/api/send-calculation-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || "Erreur API");
      }

      setMessage((t.emailSent ? `${t.emailSent} ${email}` : "Email envoyé"));
    } catch (err: any) {
      console.error(err);
      setMessage((t.emailError || "Erreur envoi email") + (err?.message ? `: ${err.message}` : ""));
    } finally {
      setLoadingEmail(false);
    }
  }

  return (
    <section style={{ marginTop: 20 }}>
      <h2 style={{ marginBottom: 12 }}>{t.calculatorTitle}</h2>

      <div style={{ display: "grid", gap: 10 }}>
        <div>
          <label style={{ marginRight: 8 }}>{t.section1Title}:</label>
          <select value={shape} onChange={(e) => setShape(e.target.value as Shape)}>
            <option value="rectangle">{t.rectangular}</option>
            <option value="circle">{t.round}</option>
            <option value="oval">{t.oval}</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {shape !== "circle" ? (
            <>
              <label>
                {t.length}
                <br />
                <input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} />
              </label>
              <label>
                {t.width}
                <br />
                <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
              </label>
            </>
          ) : (
            <label>
              {t.diameter}
              <br />
              <input type="number" value={diameter} onChange={(e) => setDiameter(Number(e.target.value))} />
            </label>
          )}

          <label>
            {t.avgDepth}
            <br />
            <input type="number" value={avgDepth} onChange={(e) => setAvgDepth(Number(e.target.value))} />
          </label>
        </div>

        <div>
          <label>
            {t.renewalDuration}
            <br />
            <input type="number" value={filtrationHours} onChange={(e) => setFiltrationHours(Number(e.target.value))} />
          </label>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div>
            <label>{t.pipeMaterial}</label>
            <br />
            <select value={pipeMaterial} onChange={(e) => setPipeMaterial(e.target.value)}>
              <option value="pvc-souple">{t.flexiblePipe}</option>
              <option value="pvc-pn10">{t.rigidPvcPn10}</option>
              <option value="pvc-pn16">{t.rigidPvcPn16}</option>
              <option value="pe">{t.polyethylene}</option>
            </select>
          </div>

          <div>
            <label>{t.dnSuction}</label>
            <br />
            <select value={dnSuction} onChange={(e) => setDnSuction(e.target.value)}>
              <option value="DN32">DN32</option>
              <option value="DN38">DN38</option>
              <option value="DN50">DN50</option>
              <option value="DN63">DN63</option>
            </select>
          </div>

          <div>
            <label>{t.dnReturn}</label>
            <br />
            <select value={dnReturn} onChange={(e) => setDnReturn(e.target.value)}>
              <option value="DN32">DN32</option>
              <option value="DN38">DN38</option>
              <option value="DN50">DN50</option>
              <option value="DN63">DN63</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <label>
            {t.totalLengthSuction}
            <br />
            <input type="number" value={pipeLengthSuction} onChange={(e) => setPipeLengthSuction(Number(e.target.value))} />
          </label>
          <label>
            {t.totalLengthReturn}
            <br />
            <input type="number" value={pipeLengthReturn} onChange={(e) => setPipeLengthReturn(Number(e.target.value))} />
          </label>
          <label>
            {t.heightDiff}
            <br />
            <input type="number" value={elevationDiff} onChange={(e) => setElevationDiff(Number(e.target.value))} />
          </label>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <label>
            {t.filterLoss}
            <br />
            <input type="number" value={filterLoss} onChange={(e) => setFilterLoss(Number(e.target.value))} />
          </label>

          <label>
            {t.skimmers}
            <br />
            <input type="number" value={skimmers} onChange={(e) => setSkimmers(Number(e.target.value))} />
          </label>

          <label>
            {t.returns}
            <br />
            <input type="number" value={returns} onChange={(e) => setReturns(Number(e.target.value))} />
          </label>

          <label>
            {t.mainDrains}
            <br />
            <input type="number" value={mainDrains} onChange={(e) => setMainDrains(Number(e.target.value))} />
          </label>
        </div>

        <div style={{ marginTop: 8 }}>
          <button onClick={() => setResultsVisible((s) => !s)}>{resultsVisible ? "Masquer résultats" : "Afficher résultats"}</button>
        </div>

        {resultsVisible && (
          <div style={{ marginTop: 12, padding: 12, border: "1px solid #ddd", borderRadius: 6 }}>
            <h3>{t.section9Title}</h3>
            <div>
              <div>
                <strong>{t.totalTDH}:</strong> {results.TDH_m.toFixed(3)} {t.mceUnit}
              </div>
              <div>
                <strong>{t.filterPressure}:</strong> {results.pressure_bar.toFixed(3)} {t.barUnit}
              </div>
              <div>
                <strong>{t.linearLossSuction}:</strong> {results.hf_s.toFixed(3)} {t.mceUnit}
              </div>
              <div>
                <strong>{t.singularLossSuction}:</strong> {results.hminor_s.toFixed(3)} {t.mceUnit}
              </div>
              <div>
                <strong>{t.linearLossReturn}:</strong> {results.hf_r.toFixed(3)} {t.mceUnit}
              </div>
              <div>
                <strong>{t.singularLossReturn}:</strong> {results.hminor_r.toFixed(3)} {t.mceUnit}
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <button onClick={handleDownloadPDF} style={{ marginRight: 8 }}>
                {t.downloadPDF}
              </button>
              <button onClick={handleSendEmail} disabled={loadingEmail}>
                {loadingEmail ? t.sending : t.sendEmail}
              </button>
            </div>

            {message && <p style={{ marginTop: 8, color: "#333" }}>{message}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
