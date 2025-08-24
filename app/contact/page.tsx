import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact • Breathscape",
  description: "Get in touch with the Breathscape team.",
}

export default function ContactPage() {
  return (
    <main className="flex-1 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <section className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Contact</h1>
          <p className="text-muted-foreground">Questions, feedback, or ideas? We’d love to hear from you.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">Email</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Send us an email and we’ll get back to you as soon as possible.
            </p>
            <a
              href="mailto:matheus.puppe@gmail.com?subject=Breathscape%20Contact"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Email Us
            </a>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">GitHub</h2>
            <p className="text-sm text-muted-foreground mb-4">Open an issue or share suggestions.</p>
            <a
              href="https://github.com/puppe1990/breathscape"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Visit Repository
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}


