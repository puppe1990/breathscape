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

interface PentagonBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
  language: string
  onUpdateDurations?: (durations: number[]) => void
}

const breathingPresets = {
  "4-4-4-4-4": { name: "Balanced Pentagon", in1: 4, hold1: 4, out: 4, hold2: 4, in2: 4 },
  "5-5-5-5-5": { name: "Extended Pentagon", in1: 5, hold1: 5, out: 5, hold2: 5, in2: 5 },
  "6-2-6-2-6": { name: "Relaxing Pentagon", in1: 6, hold1: 2, out: 6, hold2: 2, in2: 6 },
  "4-7-8-4-4": { name: "Sleep Pentagon", in1: 4, hold1: 7, out: 8, hold2: 4, in2: 4 },
  "3-3-3-3-3": { name: "Quick Pentagon", in1: 3, hold1: 3, out: 3, hold2: 3, in2: 3 },
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
  { key: "in2" as const, labelKey: "breatheIn", suffix: " 2", icon: Heart, color: "text-teal-500" },
]

export function PentagonBreathing({
  size = 280,
  isPlaying,
  currentStep,
  progress,
  className,
  language,
  onUpdateDurations,
}: PentagonBreathingProps) {
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>("4-4-4-4-4")
  const [durations, setDurations] = useState({
    in1: 4,
    hold1: 4,
    out: 4,
    hold2: 4,
    in2: 4,
  })
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

  const actualPentagonSize = Math.max(adjustedSize * 0.72, 120)
  const center = adjustedSize / 2
  const radius = actualPentagonSize / 2

  const points = Array.from({ length: 5 }).map((_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180)
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  })

  const getPosition = () => {
    const percent = progress / 100
    const currentPoint = points[currentStep]
    const nextPoint = points[(currentStep + 1) % 5]
    return {
      x: currentPoint.x + (nextPoint.x - currentPoint.x) * percent,
      y: currentPoint.y + (nextPoint.y - currentPoint.y) * percent,
    }
  }

  const pentagonPath =
    points.map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ") + " Z"

  const getProgressPath = () => {
    const percent = progress / 100
    const currentPoint = points[currentStep]
    const nextPoint = points[(currentStep + 1) % 5]
    const currentX = currentPoint.x + (nextPoint.x - currentPoint.x) * percent
    const currentY = currentPoint.y + (nextPoint.y - currentPoint.y) * percent
    return `M ${currentPoint.x} ${currentPoint.y} L ${currentX} ${currentY}`
  }

  const getCompletedPaths = () =>
    Array.from({ length: currentStep }, (_, i) => {
      const p1 = points[i]
      const p2 = points[(i + 1) % 5]
      return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`
    })

  const handlePresetChange = (preset: PresetKey) => {
    setSelectedPreset(preset)
    const newDurations = breathingPresets[preset]
    setDurations({
      in1: newDurations.in1,
      hold1: newDurations.hold1,
      out: newDurations.out,
      hold2: newDurations.hold2,
      in2: newDurations.in2,
    })
    onUpdateDurations?.([
      newDurations.in1,
      newDurations.hold1,
      newDurations.out,
      newDurations.hold2,
      newDurations.in2,
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
      newDurations.in2,
    ])
  }

  const position = getPosition()
  const progressPath = getProgressPath()
  const activeColor = stepColors[currentStep] ?? stepColors[0]
  const stepDuration = getStepDuration(currentStep, durations)

  return (
    <div className={cn("relative h-full w-full", className)}>
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
              <SheetTitle>{t.breathingTechniques.pentagon.name}</SheetTitle>
              <SheetDescription>Customize your 5-step breathing pattern</SheetDescription>
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
                          {preset.in1}-{preset.hold1}-{preset.out}-{preset.hold2}-{preset.in2}
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
        <path d={pentagonPath} fill="hsl(var(--primary) / 0.04)" />

        <path
          d={pentagonPath}
          fill="none"
          stroke="hsl(var(--primary) / 0.18)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {getCompletedPaths().map((path, i) => (
          <path
            key={i}
            d={path}
            fill="none"
            stroke={stepColors[i]}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity={0.35}
          />
        ))}

        <path
          d={progressPath}
          fill="none"
          stroke={activeColor}
          strokeWidth="3"
          strokeLinecap="round"
          opacity={0.9}
        />

        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={currentStep === i ? 4.5 : 3}
            fill={currentStep === i ? stepColors[i] : "hsl(var(--primary) / 0.22)"}
            opacity={currentStep === i ? 1 : 0.7}
          />
        ))}
      </svg>

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
  durations: { in1: number; hold1: number; out: number; hold2: number; in2: number }
) {
  const values = [durations.in1, durations.hold1, durations.out, durations.hold2, durations.in2]
  return values[step] ?? 4
}
