import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms • Breathscape",
  description: "Terms of Use for Breathscape.",
}

export default function TermsPage() {
  return (
    <main className="ambient-bg flex-1">
      <section className="container max-w-3xl py-12 md:py-16">
        <div className="space-y-4 text-center">
          <h1 className="font-display text-4xl font-medium tracking-tight lg:text-5xl">Terms of Use</h1>
          <p className="text-muted-foreground">Please read these terms carefully before using Breathscape.</p>
        </div>

        <div className="mt-10 space-y-6">
          <section className="surface-card p-6">
            <h2 className="mb-2 text-lg font-semibold">Acceptance of Terms</h2>
            <p className="text-sm text-muted-foreground">
              By accessing or using Breathscape, you agree to be bound by these Terms of Use. If you do not
              agree, please do not use the app.
            </p>
          </section>

          <section className="surface-card p-6">
            <h2 className="mb-2 text-lg font-semibold">Use of the App</h2>
            <p className="text-sm text-muted-foreground">
              Breathscape is provided for personal, non-commercial use. Do not misuse the app, interfere
              with its operation, or attempt to access it using methods other than the interface provided.
            </p>
          </section>

          <section className="surface-card p-6">
            <h2 className="mb-2 text-lg font-semibold">No Medical Advice</h2>
            <p className="text-sm text-muted-foreground">
              Breathscape offers breathing exercises for relaxation and mindfulness. It is not a medical
              device and does not provide medical advice. Consult a qualified professional for health
              concerns.
            </p>
          </section>

          <section className="surface-card p-6">
            <h2 className="mb-2 text-lg font-semibold">Changes to the Terms</h2>
            <p className="text-sm text-muted-foreground">
              We may update these Terms from time to time. Continued use of the app after changes become
              effective constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section className="surface-card p-6">
            <h2 className="mb-2 text-lg font-semibold">Contact</h2>
            <p className="text-sm text-muted-foreground">
              If you have questions about these Terms, please reach out to us.
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}


