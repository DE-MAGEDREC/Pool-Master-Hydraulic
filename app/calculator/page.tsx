"use client"

import { useState, useMemo } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import { getTranslation } from "@/lib/i18n/translations"
import { PDFExportButton } from "@/components/pdf-export-button"
import type { PoolCalculationData } from "@/lib/pdf/generate-report"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"

// Pool Hydraulics — Single-file React component (mobile-friendly)
// Exports a default component that renders a dashboard to compute pool surface, volume,
// default filtration flow (5 hours turnover), and hydraulic head losses (Darcy-Weisbach + minor losses).

const safeNumber = (value: any, fallback = 0): number => {
  const num = Number(value)
  return isNaN(num) || !isFinite(num) ? fallback : num
}

export default function PoolHydraulicsCalculator() {
  const g = 9.80665
  const rho = 1000
  const nu = 1e-6 // m^2/s

  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")

  const [shape, setShape] = useState("rectangle")
  const [filtrationHours, setFiltrationHours] = useState(5)

  const [length, setLength] = useState(10)
  const [width, setWidth] = useState(5)
  const [diameter, setDiameter] = useState(2)
  const [avgDepth, setAvgDepth] = useState(1.5)
  const [skimmers, setSkimmers] = useState(2)
  const [returns, setReturns] = useState(2)
  const [mainDrains, setMainDrains] = useState(1)

  const [pipeMaterial, setPipeMaterial] = useState("pvc-souple")
  const [dnSuction, setDnSuction] = useState("DN50")
  const [dnReturn, setDnReturn] = useState("DN50")

  const [pipeLengthSuction, setPipeLengthSuction] = useState(15)
  const [pipeLengthReturn, setPipeLengthReturn] = useState(15)
  const [elevationDiff, setElevationDiff] = useState(0.5)
  const [filterLoss, setFilterLoss] = useState(6)
  const [showSteps, setShowSteps] = useState(false)

  const [kSkimmer, setKSkimmer] = useState(0.5)
  const [kReturn, setKReturn] = useState(1.0)
  const [kMainDrain, setKMainDrain] = useState(0.5)

  const [velocityAspiration, setVelocityAspiration] = useState(2.5)
  const [velocityRefoulement, setVelocityRefoulement] = useState(3)

  const [altitude, setAltitude] = useState(0)
  const [waterTemp, setWaterTemp] = useState(25)
  const [staticHeight, setStaticHeight] = useState(1.0)
  const [npshRequired, setNpshRequired] = useState(4.0)

  const dnToDiameter = {
    DN32: 0.027, // DN32 → Ø intérieur 27mm (au lieu de 32mm)
    DN38: 0.033, // DN38 → Ø intérieur 33mm (au lieu de 38mm)
    DN50: 0.043, // DN50 → Ø intérieur 43mm (au lieu de 50mm)
    DN63: 0.055, // DN63 → Ø intérieur 55mm (au lieu de 63mm)
  }

  const materialToRoughness = {
    "pvc-souple": 2.5e-6,
    "pvc-pn10": 1.5e-6,
    "pvc-pn16": 1.5e-6,
    pe: 2.0e-6,
  }

  const pipeRoughness = materialToRoughness[pipeMaterial]

  const area = useMemo(() => {
    const safeLength = safeNumber(length, 10)
    const safeWidth = safeNumber(width, 5)
    const safeDiameter = safeNumber(diameter, 2)

    if (shape === "rectangle") return safeLength * safeWidth
    if (shape === "circle") return Math.PI * (safeDiameter / 2) ** 2
    if (shape === "oval") return Math.PI * (safeLength / 2) * (safeWidth / 2)
    return safeLength * safeWidth
  }, [shape, length, width, diameter])

  const volume = useMemo(() => {
    return safeNumber(area, 1) * safeNumber(avgDepth, 1.5)
  }, [area, avgDepth])

  const defaultFiltration_m3h = useMemo(() => {
    const safeVol = safeNumber(volume, 75)
    const safeFiltHours = safeNumber(filtrationHours, 5)
    return safeVol / safeFiltHours
  }, [volume, filtrationHours])

  const totalFlow_m3s = safeNumber(defaultFiltration_m3h / 3600, 0.004)

  const suctionCount = Math.max(1, safeNumber(skimmers, 2) + safeNumber(mainDrains, 1))
  const returnsCount = Math.max(1, safeNumber(returns, 2))
  const flowPerSuction = totalFlow_m3s / suctionCount
  const flowPerReturn = totalFlow_m3s / returnsCount

  const diameterSuction = dnToDiameter[dnSuction] || 0.043
  const diameterReturn = dnToDiameter[dnReturn] || 0.043

  const actualVelocitySuction = (4 * flowPerSuction) / (Math.PI * diameterSuction ** 2)
  const actualVelocityReturn = (4 * flowPerReturn) / (Math.PI * diameterReturn ** 2)

  function swameeJain(eps: number, d: number, Re: number) {
    if (Re < 2000) return 64 / Re
    const A = eps / (3.7 * d)
    const B = 5.74 / Math.pow(Re, 0.9)
    const f = 0.25 / Math.pow(Math.log10(A + B), 2)
    return isNaN(f) || !isFinite(f) ? 0.02 : f
  }

  const results = useMemo(() => {
    const V_s = safeNumber(velocityAspiration, 2.5)
    const d_s = safeNumber(diameterSuction, 0.043)
    const Re_s = (V_s * d_s) / nu
    const f_s = swameeJain(pipeRoughness, d_s, Re_s)
    const hf_s = (f_s * (safeNumber(pipeLengthSuction, 15) / d_s) * V_s ** 2) / (2 * g)
    const hminor_s =
      ((safeNumber(skimmers, 2) * safeNumber(kSkimmer, 0.5) + safeNumber(mainDrains, 1) * safeNumber(kMainDrain, 0.5)) *
        V_s ** 2) /
      (2 * g)

    const V_r = safeNumber(velocityRefoulement, 3)
    const d_r = safeNumber(diameterReturn, 0.043)
    const Re_r = (V_r * d_r) / nu
    const f_r = swameeJain(pipeRoughness, d_r, Re_r)
    const hf_r = (f_r * (safeNumber(pipeLengthReturn, 15) / d_r) * V_r ** 2) / (2 * g)
    const hminor_r = (safeNumber(returns, 2) * safeNumber(kReturn, 1.0) * V_r ** 2) / (2 * g)

    const TDH_m = safeNumber(elevationDiff, 0.5) + hf_s + hminor_s + hf_r + hminor_r + safeNumber(filterLoss, 6)
    const pressure_bar = (rho * g * TDH_m) / 1e5

    return {
      hf_s: safeNumber(hf_s, 0),
      hminor_s: safeNumber(hminor_s, 0),
      hf_r: safeNumber(hf_r, 0),
      hminor_r: safeNumber(hminor_r, 0),
      TDH_m: safeNumber(TDH_m, 0),
      pressure_bar: safeNumber(pressure_bar, 0),
    }
  }, [
    velocityAspiration,
    velocityRefoulement,
    pipeLengthSuction,
    pipeLengthReturn,
    skimmers,
    mainDrains,
    returns,
    elevationDiff,
    pipeRoughness,
    filterLoss,
    diameterSuction,
    diameterReturn,
    kSkimmer,
    kMainDrain,
    kReturn,
  ])

  const cavitationCalcs = useMemo(() => {
    const gamma = 9810
    const safeAltitude = safeNumber(altitude, 0)
    const safeWaterTemp = safeNumber(waterTemp, 25)
    const safeStaticHeight = safeNumber(staticHeight, 1.0)
    const safeNpshRequired = safeNumber(npshRequired, 4.0)

    const Patm_Pa = 101325 - (safeAltitude / 8.5) * 1000
    const Patm_mCE = Patm_Pa / gamma

    const Pvapor_kPa = 0.0611 * Math.exp((17.27 * safeWaterTemp) / (safeWaterTemp + 237.3))
    const Pvapor_Pa = Pvapor_kPa * 1000
    const hvapeur_mCE = Pvapor_Pa / gamma

    const haspiration = -safeStaticHeight
    const hpertes = results.hf_s + results.hminor_s

    const npshAvailable = Patm_mCE - haspiration - hpertes - hvapeur_mCE
    const cavitationMargin = npshAvailable - safeNpshRequired
    const isCavitating = cavitationMargin < 0

    return {
      npshAvailable: safeNumber(npshAvailable, 0),
      npshRequired: safeNpshRequired,
      cavitationMargin: safeNumber(cavitationMargin, 0),
      isCavitating,
      Patm_mCE: safeNumber(Patm_mCE, 10),
      hvapeur_mCE: safeNumber(hvapeur_mCE, 0),
    }
  }, [altitude, waterTemp, staticHeight, npshRequired, results.hf_s, results.hminor_s])

  const m = (x: any) => {
    const num = safeNumber(x, 0)
    return (Math.round(num * 1000) / 1000).toLocaleString()
  }

  const { language } = useLanguage()
  const t = getTranslation(language)

  useMemo(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      if (user) {
        setUserEmail(user.email || "")
        setUserName(user.user_metadata?.name || user.email?.split("@")[0] || "User")
      }
    }
    fetchUser()
  }, [])

  const calculationData: PoolCalculationData = useMemo(
    () => ({
      userName,
      userEmail,
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
      velocityAspiration,
      velocityRefoulement,
      actualVelocitySuction,
      actualVelocityReturn,
      skimmers,
      returns,
      mainDrains,
      pipeLengthSuction,
      pipeLengthReturn,
      elevationDiff,
      filterLoss,
      results,
      cavitationCalcs,
      language,
    }),
    [
      userName,
      userEmail,
      language,
      shape,
      length,
      width,
      diameter,
      avgDepth,
      area,
      volume,
      filtrationHours,
      defaultFiltration_m3h,
      pipeMaterial,
      dnSuction,
      dnReturn,
      velocityAspiration,
      velocityRefoulement,
      actualVelocitySuction,
      actualVelocityReturn,
      skimmers,
      returns,
      mainDrains,
      pipeLengthSuction,
      pipeLengthReturn,
      elevationDiff,
      filterLoss,
      results,
      cavitationCalcs,
    ],
  )

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        💧 {t.calculatorTitle}
      </h1>

      <div className="bg-card rounded-xl p-4 shadow-lg border border-border mb-4 hover:shadow-xl transition-shadow">
        <h2 className="font-semibold mb-3 text-lg flex items-center gap-2">
          <span className="text-2xl">🏊</span>
          1) {t.section1Title}
        </h2>

        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => setShape("rectangle")}
            className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
              shape === "rectangle"
                ? "border-primary bg-primary/10 shadow-md scale-105"
                : "border-border hover:border-primary/50 hover:scale-102"
            }`}
          >
            <svg width="80" height="50">
              <rect
                width="80"
                height="50"
                fill="oklch(0.85 0.1 200)"
                stroke="oklch(0.5 0.15 200)"
                strokeWidth="2"
                rx="4"
              />
            </svg>
            <div className="text-center text-xs mt-1 font-medium">{t.rectangular}</div>
          </button>
          <button
            onClick={() => setShape("circle")}
            className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
              shape === "circle"
                ? "border-primary bg-primary/10 shadow-md scale-105"
                : "border-border hover:border-primary/50 hover:scale-102"
            }`}
          >
            <svg width="80" height="50">
              <circle cx="40" cy="25" r="22" fill="oklch(0.85 0.1 200)" stroke="oklch(0.5 0.15 200)" strokeWidth="2" />
            </svg>
            <div className="text-center text-xs mt-1 font-medium">{t.round}</div>
          </button>
          <button
            onClick={() => setShape("oval")}
            className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
              shape === "oval"
                ? "border-primary bg-primary/10 shadow-md scale-105"
                : "border-border hover:border-primary/50 hover:scale-102"
            }`}
          >
            <svg width="80" height="50">
              <ellipse
                cx="40"
                cy="25"
                rx="30"
                ry="18"
                fill="oklch(0.85 0.1 200)"
                stroke="oklch(0.5 0.15 200)"
                strokeWidth="2"
              />
            </svg>
            <div className="text-center text-xs mt-1 font-medium">{t.oval}</div>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {shape !== "circle" && (
            <>
              <label className="space-y-1">
                <span className="text-sm font-medium text-muted-foreground">{t.length}</span>
                <input
                  type="number"
                  className="block w-full p-2 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition"
                  value={length}
                  onChange={(e) => setLength(Number.parseFloat(e.target.value))}
                />
              </label>
              <label className="space-y-1">
                <span className="text-sm font-medium text-muted-foreground">{t.width}</span>
                <input
                  type="number"
                  className="block w-full p-2 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition"
                  value={width}
                  onChange={(e) => setWidth(Number.parseFloat(e.target.value))}
                />
              </label>
            </>
          )}
          {shape === "circle" && (
            <label className="col-span-2 space-y-1">
              <span className="text-sm font-medium text-muted-foreground">{t.diameter}</span>
              <input
                type="number"
                className="block w-full p-2 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition"
                value={diameter}
                onChange={(e) => setDiameter(Number.parseFloat(e.target.value))}
              />
            </label>
          )}

          <label className="col-span-2 space-y-1">
            <span className="text-sm font-medium text-muted-foreground">{t.avgDepth}</span>
            <input
              type="number"
              className="block w-full p-2 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition"
              value={avgDepth}
              onChange={(e) => setAvgDepth(Number.parseFloat(e.target.value))}
            />
          </label>
        </div>

        <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t.surface}:</span>
              <strong className="text-primary">{m(area)} m²</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t.volume}:</span>
              <strong className="text-primary">{m(volume)} m³</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 shadow-lg border border-border mb-4 hover:shadow-xl transition-shadow">
        <h2 className="font-semibold mb-3 text-lg flex items-center gap-2">
          <span className="text-2xl">⏱️</span>
          2) {t.section2Title}
        </h2>
        <label className="space-y-1">
          <span className="text-sm font-medium text-muted-foreground">{t.renewalDuration}</span>
          <input
            type="number"
            className="block p-2 border border-input rounded-lg w-32 bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition"
            value={filtrationHours}
            onChange={(e) => setFiltrationHours(Number.parseFloat(e.target.value))}
          />
        </label>
        <div className="mt-3 p-3 bg-accent/10 rounded-lg border border-accent/30">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t.recommendedFlow}:</span>
            <strong className="text-lg text-accent">{defaultFiltration_m3h.toFixed(1)} m³/h</strong>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 shadow-lg border border-border mb-4 hover:shadow-xl transition-shadow">
        <h2 className="font-semibold mb-3 text-lg flex items-center gap-2">
          <span className="text-2xl">🔧</span>
          3) {t.section3Title}
        </h2>

        <div className="flex gap-6 mb-4 justify-center flex-wrap">
          <div className="text-center">
            <svg width="60" height="40">
              <rect
                x="10"
                y="10"
                width="40"
                height="20"
                fill="oklch(0.85 0.12 70)"
                stroke="oklch(0.5 0.15 70)"
                strokeWidth="2"
                rx="3"
              />
            </svg>
            <div className="text-xs font-medium mt-1">{t.skimmer}</div>
          </div>
          <div className="text-center">
            <svg width="60" height="40">
              <circle
                cx="30"
                cy="20"
                r="10"
                fill="oklch(0.75 0.15 150)"
                stroke="oklch(0.45 0.18 150)"
                strokeWidth="2"
              />
            </svg>
            <div className="text-xs font-medium mt-1">{t.return}</div>
          </div>
          <div className="text-center">
            <svg width="60" height="40">
              <circle cx="30" cy="20" r="12" fill="oklch(0.65 0.2 10)" stroke="oklch(0.4 0.22 10)" strokeWidth="2" />
            </svg>
            <div className="text-xs font-medium mt-1">{t.mainDrain}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">{t.skimmers}</span>
            <input
              type="number"
              className="block w-full p-2 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition"
              value={skimmers}
              onChange={(e) => setSkimmers(Number.parseInt(e.target.value))}
            />
          </label>
          <label className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">{t.returns}</span>
            <input
              type="number"
              className="block w-full p-2 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition"
              value={returns}
              onChange={(e) => setReturns(Number.parseInt(e.target.value))}
            />
          </label>
          <label className="col-span-2 space-y-1">
            <span className="text-sm font-medium text-muted-foreground">{t.mainDrains}</span>
            <input
              type="number"
              className="block w-full p-2 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition"
              value={mainDrains}
              onChange={(e) => setMainDrains(Number.parseInt(e.target.value))}
            />
          </label>
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 shadow-lg border border-border mb-4 hover:shadow-xl transition-shadow">
        <h2 className="font-semibold mb-3 text-lg flex items-center gap-2">
          <span className="text-2xl">🔩</span>
          4) {t.section4Title}
        </h2>
        <select
          className="w-full p-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition"
          value={pipeMaterial}
          onChange={(e) => setPipeMaterial(e.target.value)}
        >
          <option value="pvc-souple">{t.flexiblePipe}</option>
          <option value="pvc-pn10">{t.rigidPvcPn10}</option>
          <option value="pvc-pn16">{t.rigidPvcPn16}</option>
          <option value="pe">{t.polyethylene}</option>
        </select>
      </div>

      <div className="bg-card rounded-xl p-4 shadow-lg border border-border mb-4 hover:shadow-xl transition-shadow">
        <h2 className="font-semibold mb-3 text-lg flex items-center gap-2">
          <span className="text-2xl">📏</span>
          5) {t.section5Title}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground block">{t.dnSuction}</label>
            <select
              className="w-full p-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition"
              value={dnSuction}
              onChange={(e) => setDnSuction(e.target.value)}
            >
              <option value="DN32">DN32</option>
              <option value="DN38">DN38</option>
              <option value="DN50">DN50</option>
              <option value="DN63">DN63</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground block">{t.dnReturn}</label>
            <select
              className="w-full p-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition"
              value={dnReturn}
              onChange={(e) => setDnReturn(e.target.value)}
            >
              <option value="DN32">DN32</option>
              <option value="DN38">DN38</option>
              <option value="DN50">DN50</option>
              <option value="DN63">DN63</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 shadow-lg border border-border mb-4 hover:shadow-xl transition-shadow">
        <h2 className="font-semibold mb-3 text-lg flex items-center gap-2">
          <span className="text-2xl">💨</span>
          6) {t.section6Title}
        </h2>
        <p className="text-sm text-muted-foreground mb-3">{t.section6Description}</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">{t.velocitySuction}</label>
            <input
              type="number"
              step="0.1"
              value={velocityAspiration}
              onChange={(e) => setVelocityAspiration(Number.parseFloat(e.target.value))}
              className="w-full p-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">{t.velocityReturn}</label>
            <input
              type="number"
              step="0.1"
              value={velocityRefoulement}
              onChange={(e) => setVelocityRefoulement(Number.parseFloat(e.target.value))}
              className="w-full p-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition"
            />
          </div>
        </div>
        <div className="mt-3 p-2 bg-muted/50 rounded-lg text-xs text-muted-foreground">
          {t.actualVelocities}: {actualVelocitySuction.toFixed(2)} m/s | {t.return}: {actualVelocityReturn.toFixed(2)}{" "}
          m/s
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 shadow-lg border border-border mb-4 hover:shadow-xl transition-shadow">
        <h2 className="font-semibold mb-3 text-lg flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          7) {t.section7Title}
        </h2>
        <p className="text-sm text-muted-foreground mb-3">{t.section7Description}</p>
        <input
          type="number"
          className="w-full p-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition"
          value={filterLoss}
          onChange={(e) => setFilterLoss(Number.parseFloat(e.target.value))}
          placeholder="Ex: 6 mCE"
        />
      </div>

      <div className="bg-card rounded-xl p-4 shadow-lg border border-border mb-4 hover:shadow-xl transition-shadow">
        <h2 className="font-semibold mb-3 text-lg flex items-center gap-2">
          <span className="text-2xl">📐</span>
          8) {t.section8Title}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">{t.totalLengthSuction}</span>
            <input
              type="number"
              className="block w-full p-2 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition"
              value={pipeLengthSuction}
              onChange={(e) => setPipeLengthSuction(Number.parseFloat(e.target.value))}
            />
          </label>
          <label className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">{t.totalLengthReturn}</span>
            <input
              type="number"
              className="block w-full p-2 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition"
              value={pipeLengthReturn}
              onChange={(e) => setPipeLengthReturn(Number.parseFloat(e.target.value))}
            />
          </label>
          <label className="col-span-2 space-y-1">
            <span className="text-sm font-medium text-muted-foreground">{t.heightDiff}</span>
            <input
              type="number"
              className="block w-full p-2 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition"
              value={elevationDiff}
              onChange={(e) => setElevationDiff(Number.parseFloat(e.target.value))}
            />
          </label>
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>⚠️</span> {t.cavitation.title}
        </h3>

        <div className="mb-4 p-4 bg-background/50 rounded-lg">
          <p className="text-sm font-mono mb-2">
            NPSH<sub>disponible</sub> = (P<sub>atm</sub> / γ) - h<sub>aspiration</sub> - h<sub>pertes</sub> - h
            <sub>vapeur</sub>
          </p>
          <img src="/images/image.png" alt="NPSH Formula" className="max-w-full h-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-2">{t.cavitation.altitude}</label>
            <Input
              type="number"
              value={altitude}
              onChange={(e) => setAltitude(Number(e.target.value))}
              className="bg-background/50"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">{t.cavitation.waterTemp}</label>
            <Input
              type="number"
              value={waterTemp}
              onChange={(e) => setWaterTemp(Number(e.target.value))}
              className="bg-background/50"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">{t.cavitation.staticHeight}</label>
            <Input
              type="number"
              value={staticHeight}
              onChange={(e) => setStaticHeight(Number(e.target.value))}
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground mt-1">{t.cavitation.staticHeightHelp}</p>
          </div>
          <div>
            <label className="block text-sm mb-2">{t.cavitation.npshRequired}</label>
            <Input
              type="number"
              value={npshRequired}
              onChange={(e) => setNpshRequired(Number(e.target.value))}
              className="bg-background/50"
            />
          </div>
        </div>

        <div className="space-y-3 bg-background/30 p-4 rounded-lg">
          <div className="flex justify-between">
            <span>
              P<sub>atm</sub> / γ (Pression atmosphérique):
            </span>
            <span className="font-mono">{cavitationCalcs.Patm_mCE.toFixed(2)} mCE</span>
          </div>
          <div className="flex justify-between">
            <span>
              h<sub>aspiration</sub> (Hauteur aspiration):
            </span>
            <span className="font-mono">{cavitationCalcs.haspiration.toFixed(2)} m</span>
          </div>
          <div className="flex justify-between">
            <span>
              h<sub>pertes</sub> (Pertes aspiration):
            </span>
            <span className="font-mono">{cavitationCalcs.hpertes.toFixed(2)} mCE</span>
          </div>
          <div className="flex justify-between">
            <span>
              h<sub>vapeur</sub> (Tension vapeur):
            </span>
            <span className="font-mono">{cavitationCalcs.hvapeur_mCE.toFixed(2)} mCE</span>
          </div>
          <div className="border-t border-border/50 pt-3 mt-3">
            <div className="flex justify-between font-semibold text-lg">
              <span>
                NPSH<sub>disponible</sub>:
              </span>
              <span className="font-mono">{cavitationCalcs.npshAvailable.toFixed(2)} mCE</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>
                NPSH<sub>requis</sub>:
              </span>
              <span className="font-mono">{cavitationCalcs.npshRequired.toFixed(2)} mCE</span>
            </div>
            <div className="flex justify-between mt-2 font-semibold">
              <span>{t.cavitation.margin}:</span>
              <span
                className={`font-mono ${cavitationCalcs.cavitationMargin >= 0.5 ? "text-green-400" : "text-red-400"}`}
              >
                {cavitationCalcs.cavitationMargin.toFixed(2)} mCE
              </span>
            </div>
          </div>
        </div>

        {cavitationCalcs.isCavitating && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="font-semibold text-red-400 mb-2">⚠️ {t.cavitation.warning}</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>{t.cavitation.recommendations.lowerPump}</li>
              <li>{t.cavitation.recommendations.increaseDiameter}</li>
              <li>{t.cavitation.recommendations.reduceLosses}</li>
              <li>{t.cavitation.recommendations.checkNPSH}</li>
            </ul>
          </div>
        )}
      </div>

      <div className="bg-card rounded-xl p-4 shadow-lg border border-border mb-4 hover:shadow-xl transition-shadow">
        <h2 className="font-semibold mb-3 text-lg flex items-center gap-2">
          <span className="text-2xl">📊</span>
          11) {t.section9Title}
        </h2>
        <div className="mt-3 space-y-3">
          <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/30">
            <div className="text-sm text-muted-foreground mb-1">{t.totalTDH}</div>
            <div className="text-2xl font-bold text-primary">
              {m(results.TDH_m)} {t.mceUnit}
            </div>
          </div>
          <div className="p-4 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg border border-accent/30">
            <div className="text-sm text-muted-foreground mb-1">{t.filterPressure}</div>
            <div className="text-2xl font-bold text-accent">
              {results.pressure_bar.toFixed(3)} {t.barUnit}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-muted-foreground mb-1">{t.linearLossSuction}</div>
              <div className="font-semibold">
                {m(results.hf_s)} {t.mceUnit}
              </div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-muted-foreground mb-1">{t.singularLossSuction}</div>
              <div className="font-semibold">
                {m(results.hminor_s)} {t.mceUnit}
              </div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-muted-foreground mb-1">{t.linearLossReturn}</div>
              <div className="font-semibold">
                {m(results.hf_r)} {t.mceUnit}
              </div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-muted-foreground mb-1">{t.singularLossReturn}</div>
              <div className="font-semibold">
                {m(results.hminor_r)} {t.mceUnit}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 shadow-lg border border-border mb-4 hover:shadow-xl transition-shadow">
        <button
          onClick={() => setShowSteps(!showSteps)}
          className="w-full flex justify-between items-center font-semibold text-lg hover:text-primary transition"
        >
          <span className="flex items-center gap-2">
            <span className="text-2xl">🔬</span>
            {t.calculationSteps}
          </span>
          <span className="text-muted-foreground">{showSteps ? "▲" : "▼"}</span>
        </button>
        {showSteps && (
          <ol className="list-decimal space-y-2 ml-6 text-sm mt-4 text-muted-foreground">
            <li>{t.step1}</li>
            <li>{t.step2}</li>
            <li>{t.step3}</li>
            <li>{t.step4}</li>
            <li>{t.step5}</li>
            <li>{t.step6}</li>
            <li>{t.step7}</li>
            <li>{t.step8}</li>
          </ol>
        )}
      </div>

      <div className="bg-card rounded-xl p-4 shadow-lg border border-border mb-4 hover:shadow-xl transition-shadow">
        <h2 className="font-semibold mb-3 text-lg flex items-center gap-2">
          <span className="text-2xl">📄</span>
          {t.exportResults}
        </h2>
        <PDFExportButton calculationData={calculationData} userEmail={userEmail} userName={userName} />
      </div>

      <Alert className="mt-6 border-destructive/50 bg-destructive/5">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        <AlertTitle className="text-destructive font-bold">{t.disclaimer}</AlertTitle>
        <AlertDescription className="text-sm text-muted-foreground mt-2">{t.disclaimerText}</AlertDescription>
      </Alert>
    </div>
  )
}