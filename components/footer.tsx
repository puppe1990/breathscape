import React from "react"
import Link from "next/link"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/30">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">Breathscape</span>
          <span className="hidden md:inline" aria-hidden>
            •
          </span>
          <span>© {year}</span>
        </div>

        <nav className="flex items-center gap-4">
          <Link
            href="/about"
            className="hover:text-foreground hover:underline underline-offset-4"
          >
            About
          </Link>
          <a
            href="#"
            className="hover:text-foreground hover:underline underline-offset-4"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-foreground hover:underline underline-offset-4"
          >
            Terms
          </a>
          <a
            href="#"
            aria-label="GitHub"
            className="hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M12 2C6.477 2 2 6.486 2 12.021c0 4.428 2.865 8.186 6.839 9.504.5.092.682-.219.682-.486 0-.24-.009-.876-.014-1.72-2.782.606-3.369-1.344-3.369-1.344-.454-1.156-1.11-1.464-1.11-1.464-.907-.62.069-.607.069-.607 1.003.071 1.53 1.032 1.53 1.032.892 1.534 2.341 1.09 2.91.834.091-.647.35-1.09.636-1.342-2.221-.254-4.555-1.113-4.555-4.952 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.276.098-2.66 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.91-1.296 2.748-1.026 2.748-1.026.546 1.384.203 2.406.1 2.66.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.565 4.944.36.31.68.92.68 1.855 0 1.338-.012 2.417-.012 2.746 0 .269.18.582.688.483A10.02 10.02 0 0 0 22 12.021C22 6.486 17.523 2 12 2Z" />
            </svg>
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer


