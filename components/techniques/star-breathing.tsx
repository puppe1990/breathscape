"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Settings2, Heart, Zap, Wind } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { translations } from "@/lib/translations/index"

interface StarBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
  language: string
  onUpdateDurations?: (durations: number[]) => void
}

const breathingPresets = {
  "4-4-4-4-4": { name: "Balanced Star", in1: 4, hold1: 4, out: 4, hold2: 4, focus: 4 },
  "5-5-5-5-5": { name: "Extended Star", in1: 5, hold1: 5, out: 5, hold2: 5, focus: 5 },
  "6-2-6-2-6": { name: "Relaxing Star", in1: 6, hold1: 2, out: 6, hold2: 2, focus: 6 },
  "4-7-8-4-4": { name: "Sleep Star", in1: 4, hold1: 7, out: 8, hold2: 4, focus: 4 },
  "3-3-3-3-3": { name: "Quick Star", in1: 3, hold1: 3, out: 3, hold2: 3, focus: 3 },
} as const

type PresetKey = keyof typeof breathingPresets

const stepColors = [
  "#34d399", // inhale 1
  "#fbbf24", // hold 1
  "#38bdf8", // exhale
  "#fbbf24", // hold 2
  "#2dd4bf", // inhale 2
]

const durationFields = [
  {
    key: "in1" as const,
    labelKey: "breatheIn",
    suffix: " 1",
    icon: Heart,
    color: "text-emerald-500",
  },
  { key: "hold1" as const, labelKey: "hold", suffix: " 1", icon: Zap, color: "text-amber-500" },
  { key: "out" as const, labelKey: "breatheOut", suffix: "", icon: Wind, color: "text-sky-500" },
  { key: "hold2" as const, labelKey: "hold", suffix: " 2", icon: Zap, color: "text-amber-500" },
  {
    key: "focus" as const,
    labelKey: "breatheIn",
    suffix: " 2",
    icon: Heart,
    color: "text-teal-500",
  },
]

const SEGMENTS_PER_STEP = 2

export function StarBreathing({
  size = 280,
  isPlaying,
  currentStep,
  progress,
  className,
  language,
  onUpdateDurations,
}: StarBreathingProps) {
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>("4-4-4-4-4")
  const [durations, setDurations] = useState({ in1: 4, hold1: 4, out: 4, hold2: 4, focus: 4 })
  const [adjustedSize, setAdjustedSize] = useState(size)

  const t = translations[language] || translations["en"]

  useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth
      if (width < 480) setAdjustedSize(Math.min(size, 220))
      else if (width < 768) setAdjustedSize(Math.min(size, 260))
      else setAdjustedSize(size)
    }
    checkSize()
    window.addEventListener("resize", checkSize)
    return () => window.removeEventListener("resize", checkSize)
  }, [size])

  const actualStarSize = Math.max(adjustedSize * 0.72, 120)
  const center = adjustedSize / 2
  const outerRadius = actualStarSize / 2
  const innerRadius = outerRadius * 0.382

  const points = Array.from({ length: 10 }).map((_, i) => {
    const angle = (i * 36 - 90) * (Math.PI / 180)
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  })

  const getStepIndices = (step: number) => {
    const baseIndex = (step * SEGMENTS_PER_STEP) % points.length
    return {
      baseIndex,
      nextIndex: (baseIndex + 1) % points.length,
      afterNextIndex: (baseIndex + 2) % points.length,
    }
  }

  const getPosition = () => {
    const stepProgress = progress / 100
    const { baseIndex, nextIndex, afterNextIndex } = getStepIndices(currentStep)

    if (stepProgress < 0.5) {
      const normalizedProgress = stepProgress * 2
      return {
        x: points[baseIndex].x + (points[nextIndex].x - points[baseIndex].x) * normalizedProgress,
        y: points[baseIndex].y + (points[nextIndex].y - points[baseIndex].y) * normalizedProgress,
      }
    }

    const normalizedProgress = (stepProgress - 0.5) * 2
    return {
      x:
        points[nextIndex].x + (points[afterNextIndex].x - points[nextIndex].x) * normalizedProgress,
      y:
        points[nextIndex].y + (points[afterNextIndex].y - points[nextIndex].y) * normalizedProgress,
    }
  }

  const starPath =
    points.map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ") + " Z"

  const getProgressPath = () => {
    const percent = progress / 100
    const { baseIndex, nextIndex, afterNextIndex } = getStepIndices(currentStep)

    if (percent < 0.5) {
      const normalizedProgress = percent * 2
      const currentX =
        points[baseIndex].x + (points[nextIndex].x - points[baseIndex].x) * normalizedProgress
      const currentY =
        points[baseIndex].y + (points[nextIndex].y - points[baseIndex].y) * normalizedProgress
      return `M ${points[baseIndex].x} ${points[baseIndex].y} L ${currentX} ${currentY}`
    }

    const normalizedProgress = (percent - 0.5) * 2
    const currentX =
      points[nextIndex].x + (points[afterNextIndex].x - points[nextIndex].x) * normalizedProgress
    const currentY =
      points[nextIndex].y + (points[afterNextIndex].y - points[nextIndex].y) * normalizedProgress
    return `M ${points[baseIndex].x} ${points[baseIndex].y} L ${points[nextIndex].x} ${points[nextIndex].y} L ${currentX} ${currentY}`
  }

  const getCompletedPaths = () =>
    Array.from({ length: currentStep }, (_, stepIndex) => {
      const { baseIndex, nextIndex, afterNextIndex } = getStepIndices(stepIndex)
      return `M ${points[baseIndex].x} ${points[baseIndex].y} L ${points[nextIndex].x} ${points[nextIndex].y} L ${points[afterNextIndex].x} ${points[afterNextIndex].y}`
    })

  const handlePresetChange = (preset: PresetKey) => {
    setSelectedPreset(preset)
    const newDurations = breathingPresets[preset]
    setDurations({
      in1: newDurations.in1,
      hold1: newDurations.hold1,
      out: newDurations.out,
      hold2: newDurations.hold2,
      focus: newDurations.focus,
    })
    onUpdateDurations?.([
      newDurations.in1,
      newDurations.hold1,
      newDurations.out,
      newDurations.hold2,
      newDurations.focus,
    ])
  }

  const handleDurationChange = (type: keyof typeof durations, value: number) => {
    const newDurations = { ...durations, [type]: value }
    setDurations(newDurations)
    onUpdateDurations?.([
      newDurations.in1,
      newDurations.hold1,
      newDurations.out,
      newDurations.hold2,
      newDurations.focus,
    ])
  }

  const position = getPosition()
  const progressPath = getProgressPath()
  const activeColor = stepColors[currentStep] ?? stepColors[0]
  const stepDuration = getStepDuration(currentStep, durations)

  return (
    <div className={cn("relative h-full w-full", className)}>
      {/* Settings */}
      <div className="absolute right-0 top-0 z-20">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Settings2 className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{t.breathingTechniques.star.name}</SheetTitle>
              <SheetDescription>Customize your 5-point star breathing pattern</SheetDescription>
            </SheetHeader>

            <div className="space-y-6 py-6">
              <div className="space-y-3">
                <Label>Choose Pattern</Label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(breathingPresets).map(([key, preset]) => (
                    <Button
                      key={key}
                      variant={selectedPreset === key ? "default" : "outline"}
                      size="sm"
                      className="h-auto py-2"
                      onClick={() => handlePresetChange(key as PresetKey)}
                    >
                      <div className="text-center">
                        <div className="font-medium">{preset.name}</div>
                        <div className="text-xs opacity-70">
                          {preset.in1}-{preset.hold1}-{preset.out}-{preset.hold2}-{preset.focus}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Customize</Label>
                {durationFields.map(({ key, labelKey, suffix, icon: Icon, color }) => (
                  <div key={key}>
                    <Label className="flex items-center gap-2 text-sm">
                      <Icon className={cn("h-4 w-4", color)} />
                      {t.ui[labelKey as keyof typeof t.ui]}
                      {suffix}: {durations[key]}s
                    </Label>
                    <Slider
                      value={[durations[key]]}
                      onValueChange={(value) => handleDurationChange(key, value[0])}
                      max={10}
                      min={key.startsWith("hold") ? 0 : 2}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: isPlaying ? 0.35 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="absolute inset-[15%] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${activeColor}55 0%, transparent 70%)`,
          }}
        />
      </motion.div>

      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${adjustedSize} ${adjustedSize}`}
        className="absolute inset-0"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Soft fill */}
        <path d={starPath} fill="hsl(var(--primary) / 0.04)" />

        {/* Track */}
        <path
          d={starPath}
          fill="none"
          stroke="hsl(var(--primary) / 0.18)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Completed segments */}
        {getCompletedPaths().map((path, i) => (
          <path
            key={i}
            d={path}
            fill="none"
            stroke={stepColors[i]}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.35}
          />
        ))}

        {/* Active progress */}
        <path
          d={progressPath}
          fill="none"
          stroke={activeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.9}
        />

        {/* Vertex markers — outer points (step starts) */}
        {points.map((point, i) => {
          const isOuter = i % 2 === 0
          const stepIndex = i / 2
          const isActive = isOuter && currentStep === stepIndex

          return (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={isActive ? 4.5 : isOuter ? 3 : 2}
              fill={
                isActive
                  ? stepColors[stepIndex]
                  : isOuter
                    ? "hsl(var(--primary) / 0.22)"
                    : "hsl(var(--primary) / 0.12)"
              }
              opacity={isActive ? 1 : isOuter ? 0.7 : 0.5}
            />
          )
        })}
      </svg>

      {/* Center pulse orb */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="rounded-full ring-1"
          style={{
            background: `${activeColor}18`,
            borderColor: `${activeColor}33`,
          }}
          animate={{
            width: isPlaying ? [52, 68, 52] : 52,
            height: isPlaying ? [52, 68, 52] : 52,
            opacity: isPlaying ? [0.5, 0.85, 0.5] : 0.45,
          }}
          transition={{
            duration: stepDuration,
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Moving dot */}
      <motion.div
        className="absolute z-10"
        style={{
          left: `${(position.x / adjustedSize) * 100}%`,
          top: `${(position.y / adjustedSize) * 100}%`,
        }}
        animate={{
          left: `${(position.x / adjustedSize) * 100}%`,
          top: `${(position.y / adjustedSize) * 100}%`,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.6 }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 14,
            height: 14,
            background: activeColor,
            boxShadow: `0 0 16px 4px ${activeColor}66`,
          }}
        />
      </motion.div>
    </div>
  )
}

function getStepDuration(
  step: number,
  durations: { in1: number; hold1: number; out: number; hold2: number; focus: number }
) {
  const values = [durations.in1, durations.hold1, durations.out, durations.hold2, durations.focus]
  return values[step] ?? 4
}
