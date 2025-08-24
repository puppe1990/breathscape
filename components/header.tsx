"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Sparkles, Github } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"
import { translations } from "@/lib/translations/index"

export function Header() {
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

  if (!mounted) {
    return (
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm">
        <div className="mx-auto flex h-16 sm:h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Breathscape
              </span>
            </Link>
          </div>
          <nav className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base">
            <div className="w-20 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
          </nav>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm">
      <div className="mx-auto flex h-16 sm:h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Breathscape
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base">
          <Link 
            href="/about" 
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 font-medium hover:underline underline-offset-4 hidden sm:block"
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 font-medium hover:underline underline-offset-4 hidden sm:block"
          >
            Contact
          </Link>
          
          {/* Language Toggle */}
          <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
          
          <a 
            href="#" 
            aria-label="GitHub" 
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            <Github className="h-5 w-5" />
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header


