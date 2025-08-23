"use client"

import { useState, useEffect } from "react"
import { TechniqueGrid } from "@/components/technique-grid"
import { BreathingGuide } from "@/components/breathing-guide"
import { Card, CardContent } from "@/components/ui/card"
import { PWAInstall } from "./pwa"
import { LanguageToggle } from "@/components/language-toggle"
import { translations } from "@/lib/translations/index"
import { Sparkles, Heart, Brain, Leaf } from "lucide-react"

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
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="flex justify-between items-start mb-12">
            <div className="text-center space-y-6 flex-1 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                  Mindful Breathing
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t.description}
              </p>
              
              {/* Feature highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">Relaxation</h3>
                  <p className="text-sm text-muted-foreground">Reduce stress and anxiety</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">Focus</h3>
                  <p className="text-sm text-muted-foreground">Improve concentration</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">Wellness</h3>
                  <p className="text-sm text-muted-foreground">Enhance overall health</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
            </div>
          </div>
          
          {/* Mobile Language Toggle */}
          <div className="lg:hidden flex justify-center">
            <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Techniques Grid */}
          <Card className="glass-effect card-hover border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Breathing Techniques
                </h2>
                <p className="text-muted-foreground">
                  Choose from our collection of proven breathing exercises
                </p>
              </div>
              <TechniqueGrid language={language} />
            </CardContent>
          </Card>

          {/* Breathing Guide */}
          <BreathingGuide language={language} />
        </div>
      </div>
    </main>
  )
}

