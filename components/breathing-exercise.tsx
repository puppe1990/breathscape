"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Timer, RotateCw } from "lucide-react"
import { SquareBreathing } from "@/components/techniques/square-breathing"
import { HexagonBreathing } from "@/components/techniques/hexagon-breathing"
import { TriangleBreathing } from "@/components/techniques/triangle-breathing"
import { StarBreathing } from "@/components/techniques/star-breathing"
import { InfinityBreathing } from "@/components/techniques/infinity-breathing"
import { HeartBreathing } from "@/components/techniques/heart-breathing"
import { FlowerBreathing } from "@/components/techniques/flower-breathing"
import { CircleBreathing } from "@/components/techniques/circle-breathing"
import { LungBreathing } from "@/components/techniques/lung-breathing"
import { StopBreathing } from "@/components/techniques/stop-breathing"
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
  onPrevious: () => void
  onNext: () => void
}

export function BreathingExercise({ technique, onClose, onPrevious, onNext }: BreathingExerciseProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [customDurations, setCustomDurations] = useState<number[]>([])
  const [sessionTime, setSessionTime] = useState(0)
  const [cyclesCompleted, setCyclesCompleted] = useState(0)

  // Session timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  // Breathing cycle progress
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      const stepDuration = customDurations[currentStep] || technique.duration
      const stepDurationMs = stepDuration * 1000
      const increment = (100 / stepDurationMs) * 100 // Update every 100ms

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            const nextStep = (currentStep + 1) % technique.steps.length
            setCurrentStep(nextStep)
            // Increment cycle counter when completing a full cycle
            if (nextStep === 0) {
              setCyclesCompleted((prev) => prev + 1)
            }
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
    setSessionTime(0)
    setCyclesCompleted(0)
  }

  const handleUpdateDurations = (durations: number[]) => {
    setCustomDurations(durations)
    resetExercise()
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
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
      case "lungs":
        return (
          <LungBreathing
            isPlaying={isPlaying}
            currentStep={currentStep}
            progress={progress}
            className={technique.textColor}
          />
        )
      case "stop":
        return (
          <StopBreathing
            isPlaying={isPlaying}
            currentStep={currentStep}
            progress={progress}
            className={technique.textColor}
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
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 sm:p-6 md:p-8 relative w-full">
      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full opacity-70 hover:opacity-100"
        onClick={onPrevious}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full opacity-70 hover:opacity-100"
        onClick={onNext}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <DialogHeader className="space-y-1">
        <DialogTitle className="text-3xl font-light tracking-wider text-left pl-4">{technique.name}</DialogTitle>
      </DialogHeader>

      {/* Session stats */}
      <div className="w-full max-w-md mx-auto mb-6 flex items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-background/50 backdrop-blur-sm shadow-sm">
            <Timer className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold">{formatTime(sessionTime)}</div>
            <div className="text-sm text-muted-foreground">Session Time</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-background/50 backdrop-blur-sm shadow-sm">
            <RotateCw className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold">{cyclesCompleted}</div>
            <div className="text-sm text-muted-foreground">Cycles</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 w-full">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 flex items-center justify-center">
          {renderBreathingAnimation()}
        </div>

        <div className="text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">{technique.steps[currentStep]}</h3>
          <p className="text-muted-foreground text-base sm:text-lg">
            {Math.ceil(getCurrentDuration() - (progress / 100) * getCurrentDuration())}s
          </p>
        </div>

        <div className="flex gap-6 w-full justify-center">
          <Button variant="outline" size="lg" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button variant="outline" size="lg" onClick={resetExercise}>
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

