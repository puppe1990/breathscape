"use client"

import React from "react"
import Link from "next/link"
import { Wind, Github } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"

export function Header() {
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/70 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
            <Wind className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-medium tracking-tight text-foreground">
            {t.title}
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/about"
            className="hidden rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:block"
          >
            {t.footer?.about || "About"}
          </Link>
          <Link
            href="/contact"
            className="hidden rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:block"
          >
            {t.footer?.contact || "Contact"}
          </Link>

          <LanguageToggle />

          <a
            href="https://github.com/puppe1990/breathscape"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
