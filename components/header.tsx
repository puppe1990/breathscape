import React from "react"
import Link from "next/link"
import { Sparkles, Github } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full glass-effect border-b border-white/20 dark:border-white/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Breathscape
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <Link 
            href="/about" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium hover:underline underline-offset-4"
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium hover:underline underline-offset-4"
          >
            Contact
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
    </header>
  )
}

export default Header


