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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <PWAInstall />
      
      {/* Language Toggle Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <div className="flex justify-between items-center">
            <div className="flex-1"></div>
            <div className="hidden lg:block">
              <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
            </div>
          </div>
          
          {/* Mobile Language Toggle */}
          <div className="lg:hidden flex justify-center mt-2 sm:mt-4">
            <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 sm:pb-16">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2">
          {/* Techniques Grid */}
          <Card className="glass-effect card-hover border-0 shadow-2xl order-2 lg:order-1">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Breathing Techniques
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Choose from our collection of proven breathing exercises
                </p>
              </div>
              <TechniqueGrid language={language} />
            </CardContent>
          </Card>

          {/* Breathing Guide */}
          <div className="order-1 lg:order-2">
            <BreathingGuide language={language} />
          </div>
        </div>
      </div>
    </main>
  )
}

