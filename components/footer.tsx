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
      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 mt-auto">
        {/* Hero Descriptions Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center space-y-6 sm:space-y-8 mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 animate-pulse" />
              <span className="text-sm sm:text-base font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                Mindful Breathing
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Breathscape
            </h2>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
              <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">Relaxation</h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Reduce stress and anxiety</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">Focus</h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Improve concentration</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">Wellness</h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Enhance overall health</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-6 sm:gap-8 py-8 sm:py-10 text-sm sm:text-base text-slate-600 dark:text-slate-400 md:flex-row">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-slate-100">{t.title}</span>
            <span className="hidden md:inline text-slate-400 dark:text-slate-500" aria-hidden>
              •
            </span>
            <span>© {year}</span>
          </div>

          <nav className="flex items-center gap-6 sm:gap-8">
            <Link
              href="/about"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 font-medium hover:underline underline-offset-4 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.footer.about}
            </Link>
            <Link
              href="/privacy"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 font-medium hover:underline underline-offset-4 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="/terms"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 font-medium hover:underline underline-offset-4 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.footer.terms}
            </Link>
            <a
              href="#"
              aria-label="GitHub"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <Github className="h-5 w-5" />
            </a>
          </nav>
        </div>
        
        {/* Made with love */}
        <div className="border-t border-slate-200/50 dark:border-slate-700/50 py-4 sm:py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-500 flex items-center justify-center gap-2">
              {t.footer.madeWith} <Heart className="w-4 h-4 text-rose-500" /> {t.footer.forMindfulBreathing}
            </p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 mt-auto">
      {/* Hero Descriptions Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center space-y-6 sm:space-y-8 mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 animate-pulse" />
            <span className="text-sm sm:text-base font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
              Mindful Breathing
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
            {t.description}
          </p>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">{t.footer.relaxation}</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">{t.footer.relaxationDescription}</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">{t.footer.focus}</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">{t.footer.focusDescription}</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">{t.footer.wellness}</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">{t.footer.wellnessDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-6 sm:gap-8 py-8 sm:py-10 text-sm sm:text-base text-slate-600 dark:text-slate-400 md:flex-row">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-100">{t.title}</span>
          <span className="hidden md:inline text-slate-400 dark:text-slate-500" aria-hidden>
            •
          </span>
          <span>© {year}</span>
        </div>

        <nav className="flex items-center gap-6 sm:gap-8">
          <Link
            href="/about"
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 font-medium hover:underline underline-offset-4 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 font-medium hover:underline underline-offset-4 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 font-medium hover:underline underline-offset-4 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Terms
          </Link>
          <a
            href="#"
            aria-label="GitHub"
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <Github className="h-5 w-5" />
          </a>
        </nav>
      </div>
      
      {/* Made with love */}
      <div className="border-t border-slate-200/50 dark:border-slate-700/50 py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-500 flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-rose-500" /> for mindful breathing
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


