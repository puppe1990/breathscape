"use client"

import { useState } from "react"
import { BreathingExercise } from "@/components/breathing-exercise"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Square, Hexagon, Triangle, Star, Infinity, Circle, Octagon } from "lucide-react"
import { translations } from "@/lib/translations/index"
import { cn } from "@/lib/utils"

interface TechniqueGridProps {
  language: string
}

const techniqueStyles = {
  square: { iconBg: "bg-teal-500/10 text-teal-700 dark:text-teal-400", dot: "bg-teal-500" },
  hexagon: {
    iconBg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  triangle: {
    iconBg: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
    dot: "bg-violet-500",
  },
  star: { iconBg: "bg-amber-500/10 text-amber-700 dark:text-amber-400", dot: "bg-amber-500" },
  infinity: { iconBg: "bg-sky-500/10 text-sky-700 dark:text-sky-400", dot: "bg-sky-500" },
  stop: { iconBg: "bg-slate-500/10 text-slate-600 dark:text-slate-400", dot: "bg-slate-500" },
  circle: { iconBg: "bg-rose-500/10 text-rose-700 dark:text-rose-400", dot: "bg-rose-500" },
} as const

export function TechniqueGrid({ language }: TechniqueGridProps) {
  const t = translations[language] || translations["en"]

  const techniques = [
    {
      id: "square",
      name: t.breathingTechniques.square.name,
      icon: Square,
      textColor: "text-teal-700 dark:text-teal-400",
      steps: t.breathingTechniques.square.steps,
      duration: 4,
    },
    {
      id: "hexagon",
      name: t.breathingTechniques.hexagon.name,
      icon: Hexagon,
      textColor: "text-emerald-700 dark:text-emerald-400",
      steps: t.breathingTechniques.hexagon.steps,
      duration: 4,
    },
    {
      id: "triangle",
      name: t.breathingTechniques.triangle.name,
      icon: Triangle,
      textColor: "text-violet-700 dark:text-violet-400",
      steps: t.breathingTechniques.triangle.steps,
      duration: 5,
    },
    {
      id: "star",
      name: t.breathingTechniques.star.name,
      icon: Star,
      textColor: "text-amber-700 dark:text-amber-400",
      steps: t.breathingTechniques.star.steps,
      duration: 4,
    },
    {
      id: "infinity",
      name: t.breathingTechniques.infinity.name,
      icon: Infinity,
      textColor: "text-sky-700 dark:text-sky-400",
      steps: t.breathingTechniques.infinity.steps,
      duration: 6,
    },
    {
      id: "stop",
      name: t.breathingTechniques.stop.name,
      icon: Octagon,
      textColor: "text-slate-600 dark:text-slate-400",
      steps: t.breathingTechniques.stop.steps,
      duration: 4,
    },
    {
      id: "circle",
      name: t.breathingTechniques.circle.name,
      icon: Circle,
      textColor: "text-rose-700 dark:text-rose-400",
      steps: t.breathingTechniques.circle.steps,
      duration: 4,
    },
  ]

  const [selectedTechniqueIndex, setSelectedTechniqueIndex] = useState<number | null>(null)

  const handlePrevious = () => {
    setSelectedTechniqueIndex((current) => {
      if (current === null) return null
      return current === 0 ? techniques.length - 1 : current - 1
    })
  }

  const handleNext = () => {
    setSelectedTechniqueIndex((current) => {
      if (current === null) return null
      return current === techniques.length - 1 ? 0 : current + 1
    })
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {techniques.map((technique, index) => {
          const style = techniqueStyles[technique.id as keyof typeof techniqueStyles]
          return (
            <button
              key={technique.id}
              type="button"
              className="technique-card h-36 sm:h-40"
              onClick={() => setSelectedTechniqueIndex(index)}
            >
              <span className={cn("absolute left-3 top-3 h-1.5 w-1.5 rounded-full", style.dot)} />
              <div className={cn("technique-icon", style.iconBg)}>
                <technique.icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <span className="text-center text-sm font-medium leading-snug text-foreground">
                {technique.name}
              </span>
            </button>
          )
        })}
      </div>

      <Dialog
        open={selectedTechniqueIndex !== null}
        onOpenChange={() => setSelectedTechniqueIndex(null)}
      >
        <DialogContent className="exercise-dialog max-h-[96vh] w-[96vw] !max-w-lg overflow-hidden border-border/50 bg-background p-0 shadow-2xl sm:!max-w-xl md:!max-w-2xl">
          {selectedTechniqueIndex !== null && (
            <BreathingExercise
              technique={techniques[selectedTechniqueIndex]}
              language={language}
              onClose={() => setSelectedTechniqueIndex(null)}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
