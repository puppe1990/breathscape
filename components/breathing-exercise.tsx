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
import { translations } from "@/lib/translations/index"

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
  language: string
}

export function BreathingExercise({ technique, onClose, onPrevious, onNext, language }: BreathingExerciseProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [customDurations, setCustomDurations] = useState<number[]>([])
  const [sessionTime, setSessionTime] = useState(0)
  const [cyclesCompleted, setCyclesCompleted] = useState(0)

  const t = translations[language] || translations["en"]

  const getStepText = (step: number) => {
    if (step === 0) return t?.ui?.breatheIn || "Breathe In"
    if (step === 1) return t?.ui?.hold || "Hold"
    return t?.ui?.breatheOut || "Breathe Out"
  }

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
    const commonProps = {
      isPlaying,
      currentStep,
      progress,
      className: technique.textColor,
      language,
    }

    switch (technique.id) {
      case "square":
        return <SquareBreathing {...commonProps} />
      case "hexagon":
        return <HexagonBreathing {...commonProps} />
      case "triangle":
        return <TriangleBreathing {...commonProps} />
      case "star":
        return <StarBreathing {...commonProps} />
      case "infinity":
        return <InfinityBreathing {...commonProps} />
      case "heart":
        return <HeartBreathing {...commonProps} />
      case "flower":
        return <FlowerBreathing {...commonProps} />
      case "circle":
        return <CircleBreathing {...commonProps} onUpdateDurations={handleUpdateDurations} />
      case "lungs":
        return <LungBreathing {...commonProps} />
      case "stop":
        return <StopBreathing {...commonProps} />
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

  // Compute a smooth scale for a subtle in/hold/out pulse synced with the step
  const getBreathScale = () => {
    const progress01 = Math.min(Math.max(progress / 100, 0), 1)
    // Common patterns: index 0=in, 1=hold, 2=out, and for 4-step: 0=in, 1=hold, 2=out, 3=hold
    const inhaleIndex = 0
    const exhaleIndex = technique.steps.length === 4 ? 2 : 2

    if (currentStep === inhaleIndex) {
      return 1 + 0.12 * progress01
    }
    if (currentStep === exhaleIndex) {
      return 1.12 - 0.12 * progress01
    }
    // Hold
    return 1.12
  }

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 relative w-full">
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

      <DialogHeader className="space-y-0.5">
        <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-light tracking-wider text-left pl-2 sm:pl-4">
          {technique.name}
        </DialogTitle>
      </DialogHeader>

      {/* Session stats */}
      <div className="w-full max-w-md mx-auto mb-2 sm:mb-4 flex items-center justify-center gap-4 sm:gap-6">
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <div className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-background/50 backdrop-blur-sm shadow-sm">
            <Timer className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          </div>
          <div className="text-center">
            <div className="text-base sm:text-xl font-semibold">{formatTime(sessionTime)}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">{t?.ui?.sessionTime || "Session Time"}</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <div className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-background/50 backdrop-blur-sm shadow-sm">
            <RotateCw className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          </div>
          <div className="text-center">
            <div className="text-base sm:text-xl font-semibold">{cyclesCompleted}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">{t?.ui?.cycles || "Cycles"}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 w-full">
        <motion.div
          className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 flex items-center justify-center"
          animate={{ scale: isPlaying ? getBreathScale() : 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.6 }}
        >
          {/* Pulsing background aura synced with breath */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)",
              filter: "blur(10px)",
            }}
            animate={{ opacity: isPlaying ? 0.6 : 0 }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
          />
          {renderBreathingAnimation()}
        </motion.div>

        <div className="text-center mt-1 sm:mt-2">
          <h3 className="text-base sm:text-xl md:text-2xl font-semibold mb-0.5 sm:mb-1">
            {technique.steps[currentStep]}
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            {Math.ceil(getCurrentDuration() - (progress / 100) * getCurrentDuration())}s
          </p>
        </div>

        <div className="flex gap-3 sm:gap-4 w-full justify-center mt-2 sm:mt-4">
          <Button variant="outline" size="default" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="default" onClick={resetExercise}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

