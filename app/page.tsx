"use client"

import { TechniqueGrid } from "@/components/technique-grid"
import { BreathingGuide } from "@/components/breathing-guide"
import { useLanguage } from "@/components/language-provider"

export default function Home() {
  const { language, t } = useLanguage()

  return (
    <main className="ambient-bg min-h-screen">
      {/* Hero */}
      <section className="container pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label mb-4">{t.footer?.mindfulBreathing || "Mindful Breathing"}</p>
          <h1 className="font-display text-4xl font-medium leading-[1.15] text-foreground md:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.description}
          </p>

          {/* Breathing ring decoration */}
          <div className="mt-10 flex justify-center" aria-hidden>
            <div className="relative flex h-20 w-20 items-center justify-center">
              <div className="breathing-ring absolute inset-0 rounded-full border border-primary/20" />
              <div
                className="breathing-ring absolute inset-2 rounded-full border border-primary/30"
                style={{ animationDelay: "0.5s" }}
              />
              <div className="h-3 w-3 rounded-full bg-primary/60" />
            </div>
          </div>
        </div>
      </section>

      {/* Techniques */}
      <section className="container pb-20 md:pb-28" id="techniques">
        <div className="mb-10 md:mb-12">
          <p className="section-label mb-2">
            {t.mainPage?.breathingTechniques || "Breathing Techniques"}
          </p>
          <h2 className="font-display text-2xl font-medium text-foreground md:text-3xl">
            {t.mainPage?.breathingTechniquesDescription ||
              "Choose from our collection of proven breathing exercises"}
          </h2>
        </div>

        <TechniqueGrid language={language} />
      </section>

      {/* Guide */}
      <section className="container pb-20 md:pb-28">
        <div className="mb-10 md:mb-12">
          <p className="section-label mb-2">{t.guide?.title || "Breathing Guide"}</p>
          <h2 className="font-display text-2xl font-medium text-foreground md:text-3xl">
            {t.mainPage?.breathingGuideDescription ||
              "Learn about different breathing techniques and their benefits"}
          </h2>
        </div>

        <div className="mx-auto max-w-3xl">
          <BreathingGuide language={language} />
        </div>
      </section>
    </main>
  )
}
