"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
import { SquareBreathing } from "@/components/techniques/square-breathing"
import { HexagonBreathing } from "@/components/techniques/hexagon-breathing"
import { TriangleBreathing } from "@/components/techniques/triangle-breathing"
import { StarBreathing } from "@/components/techniques/star-breathing"
import { InfinityBreathing } from "@/components/techniques/infinity-breathing"
import { CircleBreathing } from "@/components/techniques/circle-breathing"
import { StopBreathing } from "@/components/techniques/stop-breathing"
import { motion, AnimatePresence } from "framer-motion"
import { translations } from "@/lib/translations/index"
import { cn } from "@/lib/utils"

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

type StepPhase = "inhale" | "hold" | "exhale"

function getStepPhase(stepIndex: number, totalSteps: number): StepPhase {
  if (totalSteps === 3) return (["inhale", "hold", "exhale"] as const)[stepIndex] ?? "inhale"
  if (totalSteps === 4) return (["inhale", "hold", "exhale", "hold"] as const)[stepIndex] ?? "inhale"
  if (totalSteps === 6) {
    const phases: StepPhase[] = ["inhale", "hold", "exhale", "hold", "inhale", "hold"]
    return phases[stepIndex] ?? "inhale"
  }
  return stepIndex % 2 === 0 ? "inhale" : "hold"
}

const phaseStyles: Record<StepPhase, { label: string; dot: string; ring: string }> = {
  inhale: {
    label: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/30",
  },
  hold: {
    label: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
    ring: "ring-amber-500/30",
  },
  exhale: {
    label: "text-sky-600 dark:text-sky-400",
    dot: "bg-sky-500",
    ring: "ring-sky-500/30",
  },
}

export function BreathingExercise({ technique, onClose, onPrevious, onNext, language }: BreathingExerciseProps) {
  const t = translations[language] || translations["en"]
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [customDurations, setCustomDurations] = useState<number[]>([])
  const [sessionTime, setSessionTime] = useState(0)
  const [cyclesCompleted, setCyclesCompleted] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => setSessionTime((prev) => prev + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      const stepDuration = customDurations[currentStep] || technique.duration
      const stepDurationMs = stepDuration * 1000
      const increment = (100 / stepDurationMs) * 100

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            const nextStep = (currentStep + 1) % technique.steps.length
            setCurrentStep(nextStep)
            if (nextStep === 0) setCyclesCompleted((c) => c + 1)
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
        return <SquareBreathing {...commonProps} onUpdateDurations={handleUpdateDurations} />
      case "hexagon":
        return <HexagonBreathing {...commonProps} onUpdateDurations={handleUpdateDurations} />
      case "triangle":
        return <TriangleBreathing {...commonProps} />
      case "star":
        return <StarBreathing {...commonProps} onUpdateDurations={handleUpdateDurations} />
      case "infinity":
        return <InfinityBreathing {...commonProps} onUpdateDurations={handleUpdateDurations} />
      case "circle":
        return <CircleBreathing {...commonProps} onUpdateDurations={handleUpdateDurations} />
      case "stop":
        return <StopBreathing {...commonProps} />
      default:
        return (
          <>
            <technique.icon className={`h-full w-full ${technique.textColor}`} />
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

  const getCurrentDuration = () => customDurations[currentStep] || technique.duration
  const remainingSeconds = Math.ceil(getCurrentDuration() - (progress / 100) * getCurrentDuration())
  const phase = getStepPhase(currentStep, technique.steps.length)
  const styles = phaseStyles[phase]

  const isLargeShape =
    technique.id === "square" ||
    technique.id === "hexagon" ||
    technique.id === "star" ||
    technique.id === "infinity"

  const getBreathScale = () => {
    const progress01 = Math.min(Math.max(progress / 100, 0), 1)
    if (phase === "inhale") return 1 + 0.06 * progress01
    if (phase === "exhale") return 1.06 - 0.06 * progress01
    return 1.04
  }

  return (
    <div className="exercise-shell relative flex min-h-[85vh] w-full flex-col sm:min-h-[75vh]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/40 px-4 py-4 sm:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0 rounded-full text-muted-foreground hover:text-foreground"
          onClick={onPrevious}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="min-w-0 flex-1 px-3 text-center">
          <h2 className="truncate font-display text-lg font-medium text-foreground sm:text-xl">
            {technique.name}
          </h2>
          <div className="mt-1 flex items-center justify-center gap-3 text-xs text-muted-foreground">
            <span>{formatTime(sessionTime)}</span>
            <span className="text-border">·</span>
            <span>
              {cyclesCompleted} {t?.ui?.cycles || "cycles"}
            </span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0 rounded-full text-muted-foreground hover:text-foreground"
          onClick={onNext}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Animation area */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-6 sm:px-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 50%, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
          }}
        />

        <motion.div
          className={cn(
            "relative flex items-center justify-center",
            isLargeShape
              ? "h-[min(52vw,320px)] w-[min(52vw,320px)] sm:h-[min(45vw,380px)] sm:w-[min(45vw,380px)]"
              : "h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64"
          )}
          animate={{ scale: isPlaying ? getBreathScale() : 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, mass: 0.8 }}
        >
          {renderBreathingAnimation()}
        </motion.div>

        {/* Instruction + countdown */}
        <div className="relative z-10 mt-8 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={cn("font-display text-xl font-medium sm:text-2xl", styles.label)}
            >
              {technique.steps[currentStep]}
            </motion.p>
          </AnimatePresence>

          <motion.div
            key={`${currentStep}-${remainingSeconds}`}
            className="mt-2 font-display text-6xl font-light tabular-nums tracking-tight text-foreground sm:text-7xl"
            initial={{ scale: 0.95, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {remainingSeconds}
          </motion.div>

          {/* Step progress */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {technique.steps.map((_, index) => {
              const stepPhase = getStepPhase(index, technique.steps.length)
              const isActive = index === currentStep
              const isDone = index < currentStep || (index === currentStep && progress > 0)

              return (
                <div key={index} className="flex flex-col items-center gap-1">
                  <div
                    className={cn(
                      "h-1.5 overflow-hidden rounded-full bg-muted transition-all duration-300",
                      isActive ? "w-10" : "w-6"
                    )}
                  >
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-100",
                        phaseStyles[stepPhase].dot,
                        isActive ? "opacity-100" : isDone ? "w-full opacity-40" : "w-0 opacity-0"
                      )}
                      style={{ width: isActive ? `${progress}%` : isDone ? "100%" : "0%" }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="border-t border-border/40 px-6 py-5 sm:py-6">
        <div className="mx-auto flex max-w-xs items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 shrink-0 rounded-full border-border/70"
            onClick={resetExercise}
            aria-label="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            className={cn(
              "h-16 w-16 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95",
              isPlaying && styles.ring,
              isPlaying && "ring-4"
            )}
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" fill="currentColor" />
            ) : (
              <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
            )}
          </Button>

          <div className="h-12 w-12 shrink-0" aria-hidden />
        </div>
      </div>
    </div>
  )
}
