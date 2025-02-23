import { TechniqueGrid } from "@/components/technique-grid"
import { BreathingGuide } from "@/components/breathing-guide"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl lg:leading-[3.5rem]">Breathscape</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select a breathing technique to begin your mindful breathing exercise. Each technique offers unique benefits
            for relaxation and stress relief.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <TechniqueGrid />
            </CardContent>
          </Card>

          <BreathingGuide />
        </div>
      </div>
    </main>
  )
}

