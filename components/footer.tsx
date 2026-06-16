"use client"

import React from "react"
import Link from "next/link"
import { Github, Heart } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const year = new Date().getFullYear()
  const { t } = useLanguage()

  return (
    <footer className="mt-auto border-t border-border/50 bg-muted/30">
      <div className="container flex flex-col items-center justify-between gap-6 py-8 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-display font-medium text-foreground">{t.title}</span>
          <span className="text-border" aria-hidden>·</span>
          <span>© {year}</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/about" className="transition-colors hover:text-foreground">
            {t.footer?.about || "About"}
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">
            {t.footer?.contact || "Contact"}
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            {t.footer?.privacy || "Privacy"}
          </Link>
          <Link href="/terms" className="transition-colors hover:text-foreground">
            {t.footer?.terms || "Terms"}
          </Link>
          <a
            href="https://github.com/puppe1990/breathscape"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
        </nav>
      </div>

      <div className="border-t border-border/40 py-4">
        <p className="container text-center text-xs text-muted-foreground/70 flex items-center justify-center gap-1.5">
          {t.footer?.madeWith || "Made with"} <Heart className="h-3 w-3 text-primary/60" /> {t.footer?.forMindfulBreathing || "for mindful breathing"}
        </p>
      </div>
    </footer>
  )
}

export default Footer
