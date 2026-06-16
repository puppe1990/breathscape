"use client"

import React, { createContext, useContext, useState } from "react"
import { translations } from "@/lib/translations/index"

interface LanguageContextType {
  language: string
  setLanguage: (language: string) => void
  t: any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function detectBrowserLanguage() {
  if (typeof window === "undefined") {
    return "en"
  }

  try {
    const browserLang = navigator.language
    if (translations[browserLang]) {
      return browserLang
    }

    const baseLang = browserLang.split("-")[0]
    if (translations[baseLang]) {
      return baseLang
    }
  } catch (error) {
    console.warn("Error detecting browser language:", error)
  }

  return "en"
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState(detectBrowserLanguage)
  const t = translations[language] || translations["en"] || {}

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

export { useLanguage }
export default useLanguage
