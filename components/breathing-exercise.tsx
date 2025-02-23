"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Play, Pause, RotateCcw } from "lucide-react"
import { SquareBreathing } from "@/components/techniques/square-breathing"
import { HexagonBreathing } from "@/components/techniques/hexagon-breathing"
import { TriangleBreathing } from "@/components/techniques/triangle-breathing"
import { StarBreathing } from "@/components/techniques/star-breathing"
import { InfinityBreathing } from "@/components/techniques/infinity-breathing"
import { HeartBreathing } from "@/components/techniques/heart-breathing"
import { FlowerBreathing } from "@/components/techniques/flower-breathing"
import { CircleBreathing } from "@/components/techniques/circle-breathing"
import { motion } from "framer-motion"

interface BreathingExerciseProps {
  technique: {
    name: string
    steps: string[]
    duration: number
    icon: React.ComponentType<{ className?: string }>
    textColor: string
    id: string
  }
  onClose: () => void
}

export function BreathingExercise({ technique, onClose }: BreathingExerciseProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [customDurations, setCustomDurations] = useState<number[]>([])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      const stepDuration = customDurations[currentStep] || technique.duration
      const stepDurationMs = stepDuration * 1000
      const increment = (100 / stepDurationMs) * 100 // Update every 100ms

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentStep((prevStep) => (prevStep + 1) % technique.steps.length)
            return 0
          }
          return prev + increment
        })
      }, 100)
    }

    return () => clearInterval(interval)
  }, [isPlaying, technique.duration, technique.steps.length, currentStep, customDurations])

  const resetExercise = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setProgress(0)
  }

  const handleUpdateDurations = (durations: number[]) => {
    setCustomDurations(durations)
    resetExercise()
  }

  const renderBreathingAnimation = () => {
    switch (technique.id) {
      case "square":
        return (
          <SquareBreathing
            isPlaying={isPlaying}
            currentStep={currentStep}
            progress={progress}
            className={technique.textColor}
          />
        )
      case "hexagon":
        return (
          <HexagonBreathing
            isPlaying={isPlaying}
            currentStep={currentStep}
            progress={progress}
            className={technique.textColor}
          />
        )
      case "triangle":
        return (
          <TriangleBreathing
            isPlaying={isPlaying}
            currentStep={currentStep}
            progress={progress}
            className={technique.textColor}
          />
        )
      case "star":
        return (
          <StarBreathing
            isPlaying={isPlaying}
            currentStep={currentStep}
            progress={progress}
            className={technique.textColor}
          />
        )
      case "infinity":
        return (
          <InfinityBreathing
            isPlaying={isPlaying}
            currentStep={currentStep}
            progress={progress}
            className={technique.textColor}
          />
        )
      case "heart":
        return (
          <HeartBreathing
            isPlaying={isPlaying}
            currentStep={currentStep}
            progress={progress}
            className={technique.textColor}
          />
        )
      case "flower":
        return (
          <FlowerBreathing
            isPlaying={isPlaying}
            currentStep={currentStep}
            progress={progress}
            className={technique.textColor}
          />
        )
      case "circle":
        return (
          <CircleBreathing
            isPlaying={isPlaying}
            currentStep={currentStep}
            progress={progress}
            className={technique.textColor}
            onUpdateDurations={handleUpdateDurations}
          />
        )
      default:
        return (
          <>
            <technique.icon className={`w-full h-full ${technique.textColor}`} />
            <motion.div
              className="absolute inset-0 bg-current opacity-20"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </>
        )
    }
  }

  const getCurrentDuration = () => {
    return customDurations[currentStep] || technique.duration
  }

  return (
    <div className="space-y-6 py-4">
      <DialogHeader>
        <DialogTitle>{technique.name}</DialogTitle>
      </DialogHeader>

      <div className="flex flex-col items-center justify-center gap-8">
        <div className="relative w-64 h-64">{renderBreathingAnimation()}</div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2">{technique.steps[currentStep]}</h3>
          <p className="text-muted-foreground">
            {Math.ceil(getCurrentDuration() - (progress / 100) * getCurrentDuration())}s
          </p>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={resetExercise}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

