import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About • Breathscape",
  description:
    "Learn about Breathscape's mission and how mindful breathing techniques can help you find calm and focus.",
}

export default function AboutPage() {
  return (
    <main className="flex-1 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <section className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">About Breathscape</h1>
          <p className="text-muted-foreground">
            Breathscape helps you practice mindful breathing with simple, guided techniques designed for
            relaxation, focus, and stress relief.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">Our Mission</h2>
            <p className="text-sm text-muted-foreground">
              Make mindfulness accessible to everyone through a calm, distraction‑free experience that
              works on any device.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">Techniques</h2>
            <p className="text-sm text-muted-foreground">
              Explore multiple patterns like box breathing, triangle breathing, and more. Each technique
              includes timing and visual guidance.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">Works Offline</h2>
            <p className="text-sm text-muted-foreground">
              Install as a PWA and keep practicing even without an internet connection.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">Privacy‑Friendly</h2>
            <p className="text-sm text-muted-foreground">We don’t require accounts or personal data to use the app.</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Have feedback or ideas? We’d love to hear from you.
          </p>
        </div>
      </section>
    </main>
  )
}


