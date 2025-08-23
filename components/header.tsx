import React from "react"
import Link from "next/link"
import { Sparkles, Github } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full glass-effect border-b border-white/20 dark:border-white/10">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Sparkles className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Breathscape
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm">
          <Link 
            href="/about" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium hover:underline underline-offset-4 hidden sm:block"
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium hover:underline underline-offset-4 hidden sm:block"
          >
            Contact
          </Link>
          <a 
            href="#" 
            aria-label="GitHub" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-1.5 sm:p-2 hover:bg-white/10 dark:hover:bg-white/5 rounded-lg"
          >
            <Github className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header


