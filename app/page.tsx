"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"
import { getTranslation } from "@/lib/i18n/translations"
import { LanguageSelector } from "@/components/language-selector"

export default function HomePage() {
  const { language } = useLanguage()
  const t = getTranslation(language)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-6">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">💧</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
            {t.appName}
          </h1>
          <p className="text-xl text-muted-foreground">{t.appDescription}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-xl transition-shadow border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                {t.preciseCalculations}
              </CardTitle>
              <CardDescription>{t.preciseCalculationsDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> {t.calcSurface}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> {t.filtrationFlow}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> {t.headLoss}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> {t.tdhPressure}
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📁</span>
                {t.projectManagement}
              </CardTitle>
              <CardDescription>{t.projectManagementDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span> {t.secureAccount}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span> {t.unlimitedProjects}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span> {t.accessAnywhere}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span> {t.exportResults}
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8 shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/auth/login">
              <span className="mr-2">🔐</span>
              {t.login}
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-lg px-8 border-2 hover:bg-primary/5 bg-transparent"
          >
            <Link href="/auth/sign-up">
              <span className="mr-2">✨</span>
              {t.signUp}
            </Link>
          </Button>
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur border-primary/20 hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="font-semibold text-lg mb-2">{t.mobileOptimized}</h3>
              <p className="text-sm text-muted-foreground">{t.mobileOptimizedDesc}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
