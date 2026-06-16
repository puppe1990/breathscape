"use client"

import React, { useState, useEffect } from "react"
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

interface SquareBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
  language: string
  onUpdateDurations?: (durations: number[]) => void
}

const breathingPresets = {
  "4-4-4-4": { name: "Box Breathing", in: 4, hold1: 4, out: 4, hold2: 4 },
  "5-5-5-5": { name: "5-5-5-5", in: 5, hold1: 5, out: 5, hold2: 5 },
  "6-6-6-6": { name: "6-6-6-6", in: 6, hold1: 6, out: 6, hold2: 6 },
  "4-7-8-4": { name: "Modified 4-7-8", in: 4, hold1: 7, out: 8, hold2: 4 },
  "3-3-3-3": { name: "Quick Box", in: 3, hold1: 3, out: 3, hold2: 3 },
} as const

type PresetKey = keyof typeof breathingPresets

const stepColors = ["#34d399", "#fbbf24", "#38bdf8", "#fbbf24"]

export function SquareBreathing({
  size = 280,
  isPlaying,
  currentStep,
  progress,
  className,
  language,
  onUpdateDurations,
}: SquareBreathingProps) {
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>("4-4-4-4")
  const [durations, setDurations] = useState({ in: 4, hold1: 4, out: 4, hold2: 4 })
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

  const actualSquareSize = Math.max(adjustedSize * 0.72, 120)
  const actualPadding = (adjustedSize - actualSquareSize) / 2

  const topLeft = { x: actualPadding, y: actualPadding }
  const topRight = { x: actualPadding + actualSquareSize, y: actualPadding }
  const bottomRight = { x: actualPadding + actualSquareSize, y: actualPadding + actualSquareSize }
  const bottomLeft = { x: actualPadding, y: actualPadding + actualSquareSize }

  const getPosition = () => {
    const percent = progress / 100
    switch (currentStep) {
      case 0:
        return {
          x: actualPadding,
          y: actualPadding + actualSquareSize - actualSquareSize * percent,
        }
      case 1:
        return { x: actualPadding + actualSquareSize * percent, y: actualPadding }
      case 2:
        return {
          x: actualPadding + actualSquareSize,
          y: actualPadding + actualSquareSize * percent,
        }
      case 3:
        return {
          x: actualPadding + actualSquareSize - actualSquareSize * percent,
          y: actualPadding + actualSquareSize,
        }
      default:
        return { x: actualPadding, y: actualPadding + actualSquareSize }
    }
  }

  const getProgressPath = () => {
    const percent = progress / 100
    switch (currentStep) {
      case 0:
        return `M ${bottomLeft.x} ${bottomLeft.y} L ${bottomLeft.x} ${bottomLeft.y - actualSquareSize * percent}`
      case 1:
        return `M ${topLeft.x} ${topLeft.y} L ${topLeft.x + actualSquareSize * percent} ${topLeft.y}`
      case 2:
        return `M ${topRight.x} ${topRight.y} L ${topRight.x} ${topRight.y + actualSquareSize * percent}`
      case 3:
        return `M ${bottomRight.x} ${bottomRight.y} L ${bottomRight.x - actualSquareSize * percent} ${bottomRight.y}`
      default:
        return ""
    }
  }

  const handlePresetChange = (preset: PresetKey) => {
    setSelectedPreset(preset)
    const newDurations = breathingPresets[preset]
    setDurations({
      in: newDurations.in,
      hold1: newDurations.hold1,
      out: newDurations.out,
      hold2: newDurations.hold2,
    })
    onUpdateDurations?.([newDurations.in, newDurations.hold1, newDurations.out, newDurations.hold2])
  }

  const handleDurationChange = (type: keyof typeof durations, value: number) => {
    const newDurations = { ...durations, [type]: value }
    setDurations(newDurations)
    onUpdateDurations?.([newDurations.in, newDurations.hold1, newDurations.out, newDurations.hold2])
  }

  const position = getPosition()
  const progressPath = getProgressPath()
  const activeColor = stepColors[currentStep] ?? stepColors[0]

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
              <SheetTitle>{t.breathingTechniques.square.name}</SheetTitle>
              <SheetDescription>Customize your box breathing pattern</SheetDescription>
            </SheetHeader>

            <div className="space-y-6 py-6">
              <div className="space-y-3">
                <Label>Choose Pattern</Label>
                <div className="grid grid-cols-2 gap-2">
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
                          {preset.in}-{preset.hold1}-{preset.out}-{preset.hold2}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Customize</Label>
                {(
                  [
                    {
                      key: "in" as const,
                      label: t.ui.breatheIn,
                      icon: Heart,
                      color: "text-emerald-500",
                    },
                    {
                      key: "hold1" as const,
                      label: `${t.ui.hold} 1`,
                      icon: Zap,
                      color: "text-amber-500",
                    },
                    {
                      key: "out" as const,
                      label: t.ui.breatheOut,
                      icon: Wind,
                      color: "text-sky-500",
                    },
                    {
                      key: "hold2" as const,
                      label: `${t.ui.hold} 2`,
                      icon: Zap,
                      color: "text-amber-500",
                    },
                  ] as const
                ).map(({ key, label, icon: Icon, color }) => (
                  <div key={key}>
                    <Label className="flex items-center gap-2 text-sm">
                      <Icon className={cn("h-4 w-4", color)} />
                      {label}: {durations[key]}s
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

      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${adjustedSize} ${adjustedSize}`}
        className="absolute inset-0"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Soft fill */}
        <rect
          x={actualPadding}
          y={actualPadding}
          width={actualSquareSize}
          height={actualSquareSize}
          fill="hsl(var(--primary) / 0.04)"
          rx="16"
        />

        {/* Track */}
        <rect
          x={actualPadding}
          y={actualPadding}
          width={actualSquareSize}
          height={actualSquareSize}
          fill="none"
          stroke="hsl(var(--primary) / 0.18)"
          strokeWidth="2"
          rx="16"
        />

        {/* Progress */}
        <path
          d={progressPath}
          fill="none"
          stroke={activeColor}
          strokeWidth="3"
          strokeLinecap="round"
          opacity={0.9}
        />

        {/* Corner markers */}
        {[topLeft, topRight, bottomRight, bottomLeft].map((corner, i) => (
          <circle key={i} cx={corner.x} cy={corner.y} r="3" fill="hsl(var(--primary) / 0.25)" />
        ))}
      </svg>

      {/* Center pulse orb */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="rounded-full bg-primary/10 ring-1 ring-primary/20"
          animate={{
            width: isPlaying ? [56, 72, 56] : 56,
            height: isPlaying ? [56, 72, 56] : 56,
            opacity: isPlaying ? [0.6, 1, 0.6] : 0.5,
          }}
          transition={{
            duration: getStepDuration(currentStep, durations),
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
  durations: { in: number; hold1: number; out: number; hold2: number }
) {
  const values = [durations.in, durations.hold1, durations.out, durations.hold2]
  return values[step] ?? 4
}
