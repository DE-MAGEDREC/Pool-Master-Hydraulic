"use client"

import { useState } from "react"
import { Download, Mail, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generatePoolCalculationPDF, type PoolCalculationData } from "@/lib/pdf/generate-report"
import { useLanguage } from "@/lib/i18n/language-context"
import { getTranslation } from "@/lib/i18n/translations"

interface PDFExportButtonProps {
  calculationData: PoolCalculationData
  userEmail: string
  userName: string
}

export function PDFExportButton({ calculationData, userEmail, userName }: PDFExportButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const { language } = useLanguage()
  const t = getTranslation(language)

  const handleDownloadPDF = () => {
    setIsGenerating(true)
    try {
      const enrichedData = {
        ...calculationData,
        userName,
        userEmail,
        date: new Date().toLocaleDateString(language),
        language,
      }

      const pdfBlob = generatePoolCalculationPDF(enrichedData, t)
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `pool-calculation-${new Date().toISOString().split("T")[0]}.pdf`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("[v0] Error generating PDF:", error)
      alert(t.pdfError || "Erreur lors de la génération du PDF")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSendEmail = async () => {
    setIsSending(true)
    try {
      const enrichedData = {
        ...calculationData,
        userName,
        userEmail,
        date: new Date().toLocaleDateString(language),
        language,
      }

      const pdfBlob = generatePoolCalculationPDF(enrichedData, t)
      const reader = new FileReader()

      reader.onloadend = async () => {
        const base64data = reader.result as string

        const response = await fetch("/api/send-calculation-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail,
            userName,
            pdfBase64: base64data.split(",")[1],
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to send email")
        }

        alert(t.emailSent || `Email envoyé à ${userEmail}`)
      }

      reader.readAsDataURL(pdfBlob)
    } catch (error) {
      console.error("[v0] Error sending email:", error)
      alert(t.emailError || "Erreur lors de l'envoi de l'email")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex gap-2">
      <Button onClick={handleDownloadPDF} disabled={isGenerating} className="flex-1">
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t.generating || "Génération..."}
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            {t.downloadPDF || "Télécharger PDF"}
          </>
        )}
      </Button>
      <Button onClick={handleSendEmail} disabled={isSending} variant="outline" className="flex-1 bg-transparent">
        {isSending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t.sending || "Envoi..."}
          </>
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" />
            {t.sendEmail || "Envoyer par email"}
          </>
        )}
      </Button>
    </div>
  )
}
