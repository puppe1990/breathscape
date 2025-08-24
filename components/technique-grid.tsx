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
  Circle,
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
      color: "from-rose-400 to-pink-500",
      bgColor: "bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/50 dark:to-pink-950/50",
      textColor: "text-rose-700 dark:text-rose-300",
      borderColor: "border-rose-200 dark:border-rose-800",
      steps: t.breathingTechniques.circle.steps,
      duration: 4,
    },
    {
      id: "square",
      name: t.breathingTechniques.square.name,
      icon: Square,
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50",
      textColor: "text-blue-700 dark:text-blue-300",
      borderColor: "border-blue-200 dark:border-blue-800",
      steps: t.breathingTechniques.square.steps,
      duration: 4,
    },
    {
      id: "hexagon",
      name: t.breathingTechniques.hexagon.name,
      icon: Hexagon,
      color: "from-emerald-400 to-teal-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50",
      textColor: "text-emerald-700 dark:text-emerald-300",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      steps: t.breathingTechniques.hexagon.steps,
      duration: 4,
    },
    {
      id: "triangle",
      name: t.breathingTechniques.triangle.name,
      icon: Triangle,
      color: "from-purple-400 to-violet-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/50 dark:to-violet-950/50",
      textColor: "text-purple-700 dark:text-purple-300",
      borderColor: "border-purple-200 dark:border-purple-800",
      steps: t.breathingTechniques.triangle.steps,
      duration: 5,
    },
    {
      id: "star",
      name: t.breathingTechniques.star.name,
      icon: Star,
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50",
      textColor: "text-amber-700 dark:text-amber-300",
      borderColor: "border-amber-200 dark:border-amber-800",
      steps: t.breathingTechniques.star.steps,
      duration: 4,
    },
    {
      id: "infinity",
      name: t.breathingTechniques.infinity.name,
      icon: Infinity,
      color: "from-cyan-400 to-blue-500",
      bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/50 dark:to-blue-950/50",
      textColor: "text-cyan-700 dark:text-cyan-300",
      borderColor: "border-cyan-200 dark:border-cyan-800",
      steps: t.breathingTechniques.infinity.steps,
      duration: 6,
    },

    {
      id: "stop",
      name: t.breathingTechniques.stop.name,
      icon: Octagon,
      color: "from-gray-400 to-slate-500",
      bgColor: "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/50 dark:to-slate-950/50",
      textColor: "text-gray-700 dark:text-gray-300",
      borderColor: "border-gray-200 dark:border-gray-800",
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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {techniques.map((technique, index) => (
          <Button
            key={technique.id}
            variant="ghost"
            className={`h-24 sm:h-28 md:h-32 flex flex-col items-center justify-center gap-2 sm:gap-3 p-2 sm:p-4 ${technique.bgColor} border ${technique.borderColor} hover:scale-105 transition-all duration-300 hover:shadow-lg group`}
            onClick={() => setSelectedTechniqueIndex(index)}
          >
            <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br ${technique.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
              <technique.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className={`text-xs sm:text-sm font-semibold ${technique.textColor} text-center leading-tight`}>
              {technique.name}
            </span>
          </Button>
        ))}
      </div>

      <Dialog open={selectedTechniqueIndex !== null} onOpenChange={() => setSelectedTechniqueIndex(null)}>
        <DialogContent className="max-h-[95vh] sm:max-h-[90vh] w-[95vw] sm:w-auto max-w-4xl overflow-y-auto flex flex-col items-center justify-center p-0 border-0 shadow-2xl">
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

