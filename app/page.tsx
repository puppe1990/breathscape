"use client"

import { useState, useEffect } from "react"
import { TechniqueGrid } from "@/components/technique-grid"
import { BreathingGuide } from "@/components/breathing-guide"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Sparkles } from "lucide-react"
import { translations } from "@/lib/translations/index"

export default function Home() {
  const [language, setLanguage] = useState("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const browserLang = navigator.language
      if (translations[browserLang]) {
        setLanguage(browserLang)
        return
      }
      const baseLang = browserLang.split("-")[0]
      if (translations[baseLang]) {
        setLanguage(baseLang)
      }
    }
  }, [])

  const t = translations[language] || translations["en"]

  if (!mounted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-800/50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-32 h-32 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-800/50">


      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">


        {/* Breathing Techniques Section */}
        <div className="mb-20 lg:mb-24">
          <div className="text-center mb-12 lg:mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100">
                Breathing Techniques
              </h2>
            </div>
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {t.mainPage.breathingTechniquesDescription || "Choose from our collection of proven breathing exercises"}
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <Card className="overflow-hidden border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
              <CardContent className="p-6 lg:p-8">
                <TechniqueGrid language={language} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Breathing Guide Section */}
        <div>
          <div className="text-center mb-12 lg:mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100">
                Breathing Guide
              </h2>
            </div>
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {t.mainPage.breathingGuideDescription || "Learn about different breathing techniques and their benefits"}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <BreathingGuide language={language} />
          </div>
        </div>
      </div>
    </main>
  )
}

