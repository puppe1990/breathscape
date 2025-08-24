"use client"

import { useState, useEffect } from "react"
import { TechniqueGrid } from "@/components/technique-grid"
import { BreathingGuide } from "@/components/breathing-guide"
import { Card, CardContent } from "@/components/ui/card"
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Language Toggle Section - Mobile First */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="relative container py-4 sm:py-6 md:py-8">
          {/* Mobile Language Toggle - Centered */}
          <div className="flex justify-center lg:hidden">
            <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
          </div>
          
          {/* Desktop Language Toggle - Right Aligned */}
          <div className="hidden lg:flex justify-end">
            <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
          </div>
        </div>
      </div>

      {/* Main Content - Mobile First Layout */}
      <div className="container pb-20 sm:pb-8 md:pb-12 lg:pb-16">
        {/* Mobile: Single Column Stack */}
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:hidden">
          {/* Breathing Guide - Top on Mobile */}
          <div className="order-1">
            <BreathingGuide language={language} />
          </div>
          
          {/* Techniques Grid - Bottom on Mobile */}
          <Card className="glass-effect card-hover border-0 shadow-xl order-2">
            <CardContent className="mobile-padding">
              <div className="mb-4 sm:mb-6">
                <h2 className="mobile-heading font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t.mainPage.breathingTechniques}
                </h2>
                <p className="mobile-text text-muted-foreground">
                  {t.mainPage.breathingTechniquesDescription}
                </p>
              </div>
              <TechniqueGrid language={language} />
            </CardContent>
          </Card>
        </div>

        {/* Desktop: Two Column Grid */}
        <div className="hidden lg:grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-2">
          {/* Techniques Grid */}
          <Card className="glass-effect card-hover border-0 shadow-2xl order-1">
            <CardContent className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t.mainPage.breathingTechniques}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground">
                  {t.mainPage.breathingTechniquesDescription}
                </p>
              </div>
              <TechniqueGrid language={language} />
            </CardContent>
          </Card>

          {/* Breathing Guide */}
          <div className="order-2">
            <BreathingGuide language={language} />
          </div>
        </div>
      </div>
    </main>
  )
}

