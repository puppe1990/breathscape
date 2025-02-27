"use client"

import { useState, useEffect } from "react"
import { TechniqueGrid } from "@/components/technique-grid"
import { BreathingGuide } from "@/components/breathing-guide"
import { Card, CardContent } from "@/components/ui/card"
import { PWAInstall } from "./pwa"
import { LanguageToggle } from "@/components/language-toggle"
import { translations } from "@/lib/translations/index"

export default function Home() {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      const browserLang = navigator.language
      // Check if we support the full locale (e.g. pt-BR)
      if (translations[browserLang]) {
        return browserLang
      }
      // Check if we support the base language (e.g. pt)
      const baseLang = browserLang.split("-")[0]
      if (translations[baseLang]) {
        return baseLang
      }
    }
    return "en" // Fallback to English
  })
  const t = translations[language]

  useEffect(() => {
    const browserLang = navigator.language
    // Check if we support the full locale (e.g. pt-BR)
    if (translations[browserLang]) {
      setLanguage(browserLang)
      return
    }
    // Check if we support the base language (e.g. pt)
    const baseLang = browserLang.split("-")[0]
    if (translations[baseLang]) {
      setLanguage(baseLang)
    }
  }, []) // Only run once on mount

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <PWAInstall />
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <div className="text-center space-y-4 flex-1">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl lg:leading-[3.5rem]">{t.title}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.description}</p>
          </div>
          <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <TechniqueGrid language={language} />
            </CardContent>
          </Card>

          <BreathingGuide language={language} />
        </div>
      </div>
    </main>
  )
}

