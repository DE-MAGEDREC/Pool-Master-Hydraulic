import jsPDF from "jspdf"

export interface PoolCalculationData {
  userName: string
  userEmail: string
  date: string
  shape: string
  dimensions: {
    length?: number
    width?: number
    diameter?: number
    avgDepth: number
  }
  area: number
  volume: number
  filtrationHours: number
  recommendedFlow: number
  pipeMaterial: string
  dnSuction: string
  dnReturn: string
  velocityAspiration: number
  velocityRefoulement: number
  actualVelocitySuction: number
  actualVelocityReturn: number
  skimmers: number
  returns: number
  mainDrains: number
  pipeLengthSuction: number
  pipeLengthReturn: number
  elevationDiff: number
  filterLoss: number
  results: {
    hf_s: number
    hminor_s: number
    hf_r: number
    hminor_r: number
    TDH_m: number
    pressure_bar: number
  }
  language: string
}

export function generatePoolCalculationPDF(data: PoolCalculationData, translations: any): Blob {
  const doc = new jsPDF()
  const t = translations

  // Header
  doc.setFillColor(0, 119, 182)
  doc.rect(0, 0, 210, 40, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.text("Pool Master Calculation", 105, 20, { align: "center" })
  doc.setFontSize(12)
  doc.text(t.calculatorTitle, 105, 30, { align: "center" })

  // User info
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(10)
  doc.text(`${t.user}: ${data.userName}`, 20, 50)
  doc.text(`${t.email}: ${data.userEmail}`, 20, 56)
  doc.text(`${t.date}: ${data.date}`, 20, 62)

  let y = 75

  // Section 1: Pool dimensions
  doc.setFontSize(14)
  doc.setFont(undefined, "bold")
  doc.text(`1) ${t.section1Title}`, 20, y)
  y += 8
  doc.setFontSize(10)
  doc.setFont(undefined, "normal")
  doc.text(`${t.shape}: ${data.shape}`, 25, y)
  y += 6
  if (data.shape !== "circle") {
    doc.text(`${t.length}: ${data.dimensions.length} m`, 25, y)
    y += 6
    doc.text(`${t.width}: ${data.dimensions.width} m`, 25, y)
    y += 6
  } else {
    doc.text(`${t.diameter}: ${data.dimensions.diameter} m`, 25, y)
    y += 6
  }
  doc.text(`${t.avgDepth}: ${data.dimensions.avgDepth} m`, 25, y)
  y += 6
  doc.setFont(undefined, "bold")
  doc.text(`${t.surface}: ${data.area.toFixed(2)} m² - ${t.volume}: ${data.volume.toFixed(2)} m³`, 25, y)
  y += 10

  // Section 2: Filtration
  doc.setFontSize(14)
  doc.text(`2) ${t.section2Title}`, 20, y)
  y += 8
  doc.setFontSize(10)
  doc.setFont(undefined, "normal")
  doc.text(`${t.renewalDuration}: ${data.filtrationHours} h`, 25, y)
  y += 6
  doc.setFont(undefined, "bold")
  doc.text(`${t.recommendedFlow}: ${data.recommendedFlow.toFixed(1)} m³/h`, 25, y)
  y += 10

  // Section 3: Equipment
  doc.setFontSize(14)
  doc.text(`3) ${t.section3Title}`, 20, y)
  y += 8
  doc.setFontSize(10)
  doc.setFont(undefined, "normal")
  doc.text(`${t.skimmers}: ${data.skimmers}`, 25, y)
  y += 6
  doc.text(`${t.returns}: ${data.returns}`, 25, y)
  y += 6
  doc.text(`${t.mainDrains}: ${data.mainDrains}`, 25, y)
  y += 10

  // Section 4: Pipe material
  doc.setFontSize(14)
  doc.setFont(undefined, "bold")
  doc.text(`4) ${t.section4Title}`, 20, y)
  y += 8
  doc.setFontSize(10)
  doc.setFont(undefined, "normal")
  doc.text(`${t.material}: ${data.pipeMaterial}`, 25, y)
  y += 10

  // Section 5: Diameters
  doc.setFontSize(14)
  doc.setFont(undefined, "bold")
  doc.text(`5) ${t.section5Title}`, 20, y)
  y += 8
  doc.setFontSize(10)
  doc.setFont(undefined, "normal")
  doc.text(`${t.dnSuction}: ${data.dnSuction}`, 25, y)
  y += 6
  doc.text(`${t.dnReturn}: ${data.dnReturn}`, 25, y)
  y += 10

  // Section 6: Velocities
  doc.setFontSize(14)
  doc.setFont(undefined, "bold")
  doc.text(`6) ${t.section6Title}`, 20, y)
  y += 8
  doc.setFontSize(10)
  doc.setFont(undefined, "normal")
  doc.text(
    `${t.velocitySuction}: ${data.velocityAspiration} m/s (${t.actual}: ${data.actualVelocitySuction.toFixed(2)} m/s)`,
    25,
    y,
  )
  y += 6
  doc.text(
    `${t.velocityReturn}: ${data.velocityRefoulement} m/s (${t.actual}: ${data.actualVelocityReturn.toFixed(2)} m/s)`,
    25,
    y,
  )
  y += 10

  // Check if new page needed
  if (y > 250) {
    doc.addPage()
    y = 20
  }

  // Section 7: Filter loss
  doc.setFontSize(14)
  doc.setFont(undefined, "bold")
  doc.text(`7) ${t.section7Title}`, 20, y)
  y += 8
  doc.setFontSize(10)
  doc.setFont(undefined, "normal")
  doc.text(`${t.filterLoss}: ${data.filterLoss} mCE`, 25, y)
  y += 10

  // Section 8: Pipe lengths
  doc.setFontSize(14)
  doc.setFont(undefined, "bold")
  doc.text(`8) ${t.section8Title}`, 20, y)
  y += 8
  doc.setFontSize(10)
  doc.setFont(undefined, "normal")
  doc.text(`${t.totalLengthSuction}: ${data.pipeLengthSuction} m`, 25, y)
  y += 6
  doc.text(`${t.totalLengthReturn}: ${data.pipeLengthReturn} m`, 25, y)
  y += 6
  doc.text(`${t.heightDiff}: ${data.elevationDiff} m`, 25, y)
  y += 10

  // Section 9: Results - highlighted box
  doc.setFillColor(240, 248, 255)
  doc.rect(15, y - 5, 180, 45, "F")
  doc.setDrawColor(0, 119, 182)
  doc.setLineWidth(0.5)
  doc.rect(15, y - 5, 180, 45)

  doc.setFontSize(14)
  doc.setFont(undefined, "bold")
  doc.setTextColor(0, 119, 182)
  doc.text(`9) ${t.section9Title}`, 20, y)
  y += 10

  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text(`${t.totalTDH}: ${data.results.TDH_m.toFixed(3)} mCE`, 25, y)
  y += 8
  doc.text(`${t.filterPressure}: ${data.results.pressure_bar.toFixed(3)} bar`, 25, y)
  y += 8

  doc.setFontSize(9)
  doc.setFont(undefined, "normal")
  doc.text(
    `${t.linearLossSuction}: ${data.results.hf_s.toFixed(3)} m | ${t.singularLossSuction}: ${data.results.hminor_s.toFixed(3)} m`,
    25,
    y,
  )
  y += 5
  doc.text(
    `${t.linearLossReturn}: ${data.results.hf_r.toFixed(3)} m | ${t.singularLossReturn}: ${data.results.hminor_r.toFixed(3)} m`,
    25,
    y,
  )
  y += 15

  // Formula section
  doc.setFontSize(10)
  doc.setFont(undefined, "bold")
  doc.setTextColor(0, 0, 0)
  doc.text(t.formulaUsed || "Formule utilisée / Formula used:", 20, y)
  y += 6
  doc.setFont(undefined, "normal")
  doc.text("Darcy-Weisbach: PdeC = λ × (L/Ø) × (V²/2g)", 25, y)

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(128, 128, 128)
    doc.text(`Pool Master Calculation - ${new Date().toLocaleDateString()}`, 105, 290, { align: "center" })
    doc.text(`Page ${i} / ${pageCount}`, 200, 290, { align: "right" })
  }

  return doc.output("blob")
}
