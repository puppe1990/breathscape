import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy • Breathscape",
  description: "Understand how Breathscape handles your data and privacy.",
}

export default function PrivacyPage() {
  return (
    <main className="ambient-bg flex-1">
      <section className="container max-w-3xl py-12 md:py-16">
        <div className="space-y-4 text-center">
          <h1 className="font-display text-4xl font-medium tracking-tight lg:text-5xl">Privacy Policy</h1>
          <p className="text-muted-foreground">
            We built Breathscape to be calm, simple, and privacy‑friendly.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          <section className="surface-card p-6">
            <h2 className="mb-2 text-lg font-semibold">No Accounts, No Tracking</h2>
            <p className="text-sm text-muted-foreground">
              Breathscape does not require you to create an account and does not collect personal
              information. We don’t use analytics or trackers that identify you.
            </p>
          </section>

          <section className="surface-card p-6">
            <h2 className="mb-2 text-lg font-semibold">Local‑Only Preferences</h2>
            <p className="text-sm text-muted-foreground">
              Any settings (like theme or language) are stored locally on your device so your
              preferences stay with you.
            </p>
          </section>

          <section className="surface-card p-6">
            <h2 className="mb-2 text-lg font-semibold">Works Offline</h2>
            <p className="text-sm text-muted-foreground">
              As a Progressive Web App, Breathscape can work offline. Content may be cached on your
              device to enable this experience.
            </p>
          </section>

          <section className="surface-card p-6">
            <h2 className="mb-2 text-lg font-semibold">Cookies</h2>
            <p className="text-sm text-muted-foreground">
              We aim to avoid non‑essential cookies. If any are used, they are strictly necessary to
              provide core functionality.
            </p>
          </section>

          <section className="surface-card p-6">
            <h2 className="mb-2 text-lg font-semibold">Contact</h2>
            <p className="text-sm text-muted-foreground">
              Have questions about privacy? Reach out and we’ll be happy to help.
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}


