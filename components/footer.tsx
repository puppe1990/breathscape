"use client"

import React from "react"
import Link from "next/link"
import { Sparkles, Github, Heart, Brain, Leaf } from "lucide-react"
import { translations } from "@/lib/translations/index"

export function Footer() {
  const year = new Date().getFullYear()
  
  // Get current language (default to English)
  const [language, setLanguage] = React.useState("en")
  const [mounted, setMounted] = React.useState(false)
  const t = translations[language] || translations.en

  React.useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const browserLang = navigator.language
      if (translations[browserLang]) {
        setLanguage(browserLang)
      } else {
        const baseLang = browserLang.split("-")[0]
        if (translations[baseLang]) {
          setLanguage(baseLang)
        }
      }
    }
  }, [])

  // Don't render language-dependent content until mounted to avoid SSR issues
  if (!mounted) {
    return (
      <footer className="glass-effect border-t border-white/20 dark:border-white/10 mt-auto">
        {/* Hero Descriptions Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center space-y-6 mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                Mindful Breathing
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Breathscape
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Select a breathing technique to begin your mindful breathing exercise. Each technique offers unique benefits for relaxation and stress relief.
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
        </div>

        {/* Footer Links Section */}
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-foreground">Breathscape</span>
            <span className="hidden md:inline text-muted-foreground" aria-hidden>
              •
            </span>
            <span>© {year}</span>
          </div>

          <nav className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium hover:underline underline-offset-4"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium hover:underline underline-offset-4"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium hover:underline underline-offset-4"
            >
              Terms
            </Link>
            <a
              href="#"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-2 hover:bg-white/10 dark:hover:bg-white/5 rounded-lg"
            >
              <Github className="h-5 w-5" />
            </a>
          </nav>
        </div>
        
        {/* Made with love */}
        <div className="border-t border-white/20 dark:border-white/10 py-4">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              Made with <Heart className="w-3 h-3 text-rose-500" /> for mindful breathing
            </p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="glass-effect border-t border-white/20 dark:border-white/10 mt-auto">
      {/* Hero Descriptions Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center space-y-6 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
              Mindful Breathing
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.description}
          </p>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
      </div>

      {/* Footer Links Section */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-foreground">Breathscape</span>
          <span className="hidden md:inline text-muted-foreground" aria-hidden>
            •
          </span>
          <span>© {year}</span>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium hover:underline underline-offset-4"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium hover:underline underline-offset-4"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium hover:underline underline-offset-4"
          >
            Terms
          </Link>
          <a
            href="#"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-2 hover:bg-white/10 dark:hover:bg-white/5 rounded-lg"
          >
            <Github className="h-5 w-5" />
          </a>
        </nav>
      </div>
      
      {/* Made with love */}
      <div className="border-t border-white/20 dark:border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="w-3 h-3 text-rose-500" /> for mindful breathing
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


