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

interface CircleBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
  language: string
  onUpdateDurations?: (durations: number[]) => void
}

const breathingPresets = {
  "4-7-8": { name: "4-7-8", in: 4, hold: 7, out: 8 },
  box: { name: "Box", in: 4, hold: 4, out: 4 },
  relaxing: { name: "Relaxing", in: 6, hold: 0, out: 7 },
  energizing: { name: "Energizing", in: 2, hold: 0, out: 4 },
  coherent: { name: "Coherent", in: 5, hold: 0, out: 5 },
} as const

type PresetKey = keyof typeof breathingPresets

const stepColors = [
  "#34d399", // inhale
  "#fbbf24", // hold
  "#38bdf8", // exhale
]

const durationFields = [
  { key: "in" as const, labelKey: "breatheIn", icon: Heart, color: "text-emerald-500" },
  { key: "hold" as const, labelKey: "hold", icon: Zap, color: "text-amber-500" },
  { key: "out" as const, labelKey: "breatheOut", icon: Wind, color: "text-sky-500" },
]

const SEGMENT_ANGLE = (2 * Math.PI) / 3

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, startAngle)
  const end = polarToCartesian(cx, cy, r, endAngle)
  const sweep = endAngle - startAngle
  const largeArc = sweep > Math.PI ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`
}

export function CircleBreathing({
  size = 256,
  isPlaying,
  currentStep,
  progress,
  className,
  language,
  onUpdateDurations,
}: CircleBreathingProps) {
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>("4-7-8")
  const [durations, setDurations] = useState({ in: 4, hold: 7, out: 8 })
  const [adjustedSize, setAdjustedSize] = useState(size)

  const t = translations[language] || translations["en"]

  useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth
      if (width < 480) setAdjustedSize(Math.min(size, 192))
      else if (width < 768) setAdjustedSize(Math.min(size, 224))
      else setAdjustedSize(Math.min(size, 256))
    }
    checkSize()
    window.addEventListener("resize", checkSize)
    return () => window.removeEventListener("resize", checkSize)
  }, [size])

  const center = adjustedSize / 2
  const radius = adjustedSize * 0.34

  const getSegmentAngles = (step: number, segmentProgress = 1) => {
    const startAngle = step * SEGMENT_ANGLE - Math.PI / 2
    const endAngle = startAngle + SEGMENT_ANGLE * segmentProgress
    return { startAngle, endAngle }
  }

  const getPosition = () => {
    const { endAngle } = getSegmentAngles(currentStep, progress / 100)
    return polarToCartesian(center, center, radius, endAngle)
  }

  const getProgressPath = () => {
    const { startAngle, endAngle } = getSegmentAngles(currentStep, progress / 100)
    return describeArc(center, center, radius, startAngle, endAngle)
  }

  const getCompletedPaths = () =>
    Array.from({ length: currentStep }, (_, i) => {
      const { startAngle, endAngle } = getSegmentAngles(i)
      return describeArc(center, center, radius, startAngle, endAngle)
    })

  const handlePresetChange = (preset: PresetKey) => {
    setSelectedPreset(preset)
    const newDurations = breathingPresets[preset]
    setDurations({ in: newDurations.in, hold: newDurations.hold, out: newDurations.out })
    onUpdateDurations?.([newDurations.in, newDurations.hold, newDurations.out])
  }

  const handleDurationChange = (type: keyof typeof durations, value: number) => {
    const newDurations = { ...durations, [type]: value }
    setDurations(newDurations)
    onUpdateDurations?.([newDurations.in, newDurations.hold, newDurations.out])
  }

  const position = getPosition()
  const progressPath = getProgressPath()
  const activeColor = stepColors[currentStep] ?? stepColors[0]
  const stepDuration = getStepDuration(currentStep, durations)

  const stepMarkers = [0, 1, 2].map((step) => {
    const { startAngle } = getSegmentAngles(step)
    return { ...polarToCartesian(center, center, radius, startAngle), step }
  })

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
              <SheetTitle>{t.breathingTechniques.circle.name}</SheetTitle>
              <SheetDescription>Customize your breathing pattern</SheetDescription>
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
                          {preset.in}-{preset.hold}-{preset.out}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Customize</Label>
                {durationFields.map(({ key, labelKey, icon: Icon, color }) => (
                  <div key={key}>
                    <Label className="flex items-center gap-2 text-sm">
                      <Icon className={cn("h-4 w-4", color)} />
                      {t.ui[labelKey as keyof typeof t.ui]}: {durations[key]}s
                    </Label>
                    <Slider
                      value={[durations[key]]}
                      onValueChange={(value) => handleDurationChange(key, value[0])}
                      max={10}
                      min={key === "hold" ? 0 : 2}
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
        <circle cx={center} cy={center} r={radius} fill="hsl(var(--primary) / 0.04)" />

        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="hsl(var(--primary) / 0.18)"
          strokeWidth="2"
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
          opacity={0.9}
        />

        {/* Step markers */}
        {stepMarkers.map(({ x, y, step }) => (
          <circle
            key={step}
            cx={x}
            cy={y}
            r={currentStep === step ? 4.5 : 3}
            fill={currentStep === step ? stepColors[step] : "hsl(var(--primary) / 0.22)"}
            opacity={currentStep === step ? 1 : 0.7}
          />
        ))}
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
            width: isPlaying ? [48, 62, 48] : 48,
            height: isPlaying ? [48, 62, 48] : 48,
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

function getStepDuration(step: number, durations: { in: number; hold: number; out: number }) {
  const values = [durations.in, durations.hold, durations.out]
  return values[step] ?? 4
}
