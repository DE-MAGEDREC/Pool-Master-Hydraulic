import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { userEmail, userName, pdfBase64 } = await request.json()

    if (!userEmail || !pdfBase64) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await resend.emails.send({
      from: "Pool Master Calculation <onboarding@resend.dev>", // Change to your domain after verification
      to: [userEmail],
      subject: "🏊 Votre rapport de calcul hydraulique - Pool Master Calculation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🏊 Pool Master Calculation</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Votre rapport hydraulique est prêt</p>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">Bonjour ${userName || "cher client"},</p>
            
            <p style="font-size: 16px; color: #374151; line-height: 1.6;">
              Votre rapport de calcul hydraulique complet est disponible en pièce jointe de cet email.
            </p>
            
            <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #1e40af; font-weight: 600;">📋 Contenu du rapport :</p>
              <ul style="margin: 10px 0 0 0; color: #374151;">
                <li>Dimensions et caractéristiques de la piscine</li>
                <li>Calculs de débit et vitesses</li>
                <li>Pertes de charge détaillées</li>
                <li>Analyse de cavitation (NPSH)</li>
                <li>Pression requise au filtre</li>
              </ul>
            </div>
            
            <p style="font-size: 14px; color: #6b7280; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              Cet email a été généré automatiquement par <strong>Pool Master Calculation</strong><br>
              Pour toute question, n'hésitez pas à nous contacter.
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `pool-calculation-${new Date().toISOString().split("T")[0]}.pdf`,
          content: pdfBase64,
        },
      ],
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return NextResponse.json({ error: "Failed to send email via Resend" }, { status: 500 })
    }

    console.log("[v0] Email sent successfully via Resend:", data)

    return NextResponse.json({
      success: true,
      message: `PDF report sent to ${userEmail}`,
      emailId: data?.id,
    })
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
