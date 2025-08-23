"use client"

import { Button } from "@/components/ui/button"
import { Globe, Check } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface LanguageToggleProps {
  currentLanguage: string
  onLanguageChange: (language: string) => void
}

export function LanguageToggle({ currentLanguage, onLanguageChange }: LanguageToggleProps) {
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "pt-BR", name: "Português", flag: "🇧🇷" },
  ]

  const currentLang = languages.find(lang => lang.code === currentLanguage)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-10 px-4 gap-2 hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-200 border border-white/20 dark:border-white/10 rounded-xl"
        >
          <Globe className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium">{currentLang?.flag} {currentLang?.name}</span>
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 p-2 border-0 shadow-2xl bg-white/90 dark:bg-black/90 backdrop-blur-xl">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              currentLanguage === language.code 
                ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800" 
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
            </div>
            {currentLanguage === language.code && (
              <Check className="h-4 w-4 text-blue-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

