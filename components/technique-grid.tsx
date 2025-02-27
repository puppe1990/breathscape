"use client"

import { useState } from "react"
import { BreathingExercise } from "@/components/breathing-exercise"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  Square,
  Hexagon,
  Triangle,
  Star,
  Infinity,
  Heart,
  Flower,
  Circle,
  TreesIcon as Lungs,
  Octagon,
} from "lucide-react"
import { translations } from "@/lib/translations/index"

interface TechniqueGridProps {
  language: string
}

export function TechniqueGrid({ language }: TechniqueGridProps) {
  const t = translations[language] || translations["en"]

  const techniques = [
    {
      id: "circle",
      name: t.breathingTechniques.circle.name,
      icon: Circle,
      color: "bg-rose-100 hover:bg-rose-200 dark:bg-rose-900 dark:hover:bg-rose-800",
      textColor: "text-rose-600 dark:text-rose-300",
      steps: t.breathingTechniques.circle.steps,
      duration: 4,
    },
    {
      id: "square",
      name: t.breathingTechniques.square.name,
      icon: Square,
      color: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800",
      textColor: "text-blue-600 dark:text-blue-300",
      steps: t.breathingTechniques.square.steps,
      duration: 4,
    },
    {
      id: "hexagon",
      name: t.breathingTechniques.hexagon.name,
      icon: Hexagon,
      color: "bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900 dark:hover:bg-emerald-800",
      textColor: "text-emerald-600 dark:text-emerald-300",
      steps: t.breathingTechniques.hexagon.steps,
      duration: 4,
    },
    {
      id: "triangle",
      name: t.breathingTechniques.triangle.name,
      icon: Triangle,
      color: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800",
      textColor: "text-purple-600 dark:text-purple-300",
      steps: t.breathingTechniques.triangle.steps,
      duration: 5,
    },
    {
      id: "star",
      name: t.breathingTechniques.star.name,
      icon: Star,
      color: "bg-amber-100 hover:bg-amber-200 dark:bg-amber-900 dark:hover:bg-amber-800",
      textColor: "text-amber-600 dark:text-amber-300",
      steps: t.breathingTechniques.star.steps,
      duration: 4,
    },
    {
      id: "infinity",
      name: t.breathingTechniques.infinity.name,
      icon: Infinity,
      color: "bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-900 dark:hover:bg-cyan-800",
      textColor: "text-cyan-600 dark:text-cyan-300",
      steps: t.breathingTechniques.infinity.steps,
      duration: 6,
    },
    {
      id: "heart",
      name: t.breathingTechniques.heart.name,
      icon: Heart,
      color: "bg-rose-100 hover:bg-rose-200 dark:bg-rose-900 dark:hover:bg-rose-800",
      textColor: "text-rose-600 dark:text-rose-300",
      steps: t.breathingTechniques.heart.steps,
      duration: 5,
    },
    {
      id: "flower",
      name: t.breathingTechniques.flower.name,
      icon: Flower,
      color: "bg-pink-100 hover:bg-pink-200 dark:bg-pink-900 dark:hover:bg-pink-800",
      textColor: "text-pink-600 dark:text-pink-300",
      steps: t.breathingTechniques.flower.steps,
      duration: 4,
    },
    {
      id: "lungs",
      name: t.breathingTechniques.lungs.name,
      icon: Lungs,
      color: "bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800",
      textColor: "text-red-600 dark:text-red-300",
      steps: t.breathingTechniques.lungs.steps,
      duration: 6,
    },
    {
      id: "stop",
      name: t.breathingTechniques.stop.name,
      icon: Octagon,
      color: "bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800",
      textColor: "text-red-600 dark:text-red-300",
      steps: t.breathingTechniques.stop.steps,
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {techniques.map((technique, index) => (
          <Button
            key={technique.id}
            variant="ghost"
            className={`h-32 flex flex-col items-center justify-center gap-2 ${technique.color}`}
            onClick={() => setSelectedTechniqueIndex(index)}
          >
            <technique.icon className={`w-8 h-8 ${technique.textColor}`} />
            <span className={`text-sm font-medium ${technique.textColor}`}>{technique.name}</span>
          </Button>
        ))}
      </div>

      <Dialog open={selectedTechniqueIndex !== null} onOpenChange={() => setSelectedTechniqueIndex(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto flex flex-col items-center justify-center p-0">
          {selectedTechniqueIndex !== null && (
            <BreathingExercise
              technique={techniques[selectedTechniqueIndex]}
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

