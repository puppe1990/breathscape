"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { translations } from "@/lib/translations/index"

interface LanguageContextType {
  language: string
  setLanguage: (language: string) => void
  t: any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    console.log("LanguageProvider: Initializing...")
    setMounted(true)
    if (typeof window !== "undefined") {
      try {
        const browserLang = navigator.language
        console.log("LanguageProvider: Browser language detected:", browserLang)
        // Check if we support the full locale (e.g. pt-BR)
        if (translations[browserLang]) {
          console.log("LanguageProvider: Setting language to:", browserLang)
          setLanguage(browserLang)
          return
        }
        // Check if we support the base language (e.g. pt)
        const baseLang = browserLang.split("-")[0]
        if (translations[baseLang]) {
          console.log("LanguageProvider: Setting language to base:", baseLang)
          setLanguage(baseLang)
        }
      } catch (error) {
        console.warn("Error detecting browser language:", error)
        // Fallback to English
        setLanguage("en")
      }
    }
    console.log("LanguageProvider: Initialization complete")
  }, [])

  // Ensure we always have valid translations
  const t = translations[language] || translations["en"] || {}
  console.log("LanguageProvider: Current language:", language, "Translations available:", Object.keys(translations))

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Export both named and default
export { useLanguage }
export default useLanguage
