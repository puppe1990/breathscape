import React from "react"
import Link from "next/link"
import { Sparkles, Github, Heart } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="glass-effect border-t border-white/20 dark:border-white/10 mt-auto">
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


