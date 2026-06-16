"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Settings2, Heart, Wind } from "lucide-react"
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

interface InfinityBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
  language: string
  onUpdateDurations?: (durations: number[]) => void
}

const breathingPresets = {
  "4-4": { name: "Balanced Infinity", in: 4, out: 4 },
  "5-5": { name: "Extended Infinity", in: 5, out: 5 },
  "6-2": { name: "Relaxing Infinity", in: 6, out: 2 },
  "4-6": { name: "Calming Infinity", in: 4, out: 6 },
  "3-3": { name: "Quick Infinity", in: 3, out: 3 },
} as const

type PresetKey = keyof typeof breathingPresets

const stepColors = [
  "#34d399", // inhale
  "#38bdf8", // exhale
]

const durationFields = [
  { key: "in" as const, labelKey: "breatheIn", icon: Heart, color: "text-emerald-500" },
  { key: "out" as const, labelKey: "breatheOut", icon: Wind, color: "text-sky-500" },
]

const PATH_SAMPLES = 64

export function InfinityBreathing({
  size = 280,
  isPlaying,
  currentStep,
  progress,
  className,
  language,
  onUpdateDurations,
}: InfinityBreathingProps) {
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>("4-4")
  const [durations, setDurations] = useState({ in: 4, out: 4 })
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

  const center = adjustedSize / 2
  const actualInfinitySize = Math.max(adjustedSize * 0.72, 120)
  const curveWidth = actualInfinitySize * 0.4
  const curveHeight = actualInfinitySize * 0.16

  const getPointAt = (angle: number) => ({
    x: center + curveWidth * Math.cos(angle),
    y: center + curveHeight * Math.sin(angle) * Math.cos(angle),
  })

  const infinityPath = useMemo(() => {
    const segments = Array.from({ length: PATH_SAMPLES }, (_, i) => {
      const angle = (i / PATH_SAMPLES) * Math.PI * 2
      const point = getPointAt(angle)
      return `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`
    })
    return segments.join(" ") + " Z"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center, curveWidth, curveHeight])

  const samplePath = (startAngle: number, endAngle: number) => {
    const steps = Math.max(8, Math.round(PATH_SAMPLES * (endAngle / (Math.PI * 2))))
    return Array.from({ length: steps + 1 }, (_, i) => {
      const angle = startAngle + ((endAngle - startAngle) * i) / steps
      const point = getPointAt(angle)
      return `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`
    }).join(" ")
  }

  const getPosition = () => {
    const angle = (progress / 100) * Math.PI * 2
    return getPointAt(angle)
  }

  const getProgressPath = () => {
    const endAngle = (progress / 100) * Math.PI * 2
    return samplePath(0, endAngle)
  }

  const getCompletedPath = () => samplePath(0, Math.PI * 2)

  const handlePresetChange = (preset: PresetKey) => {
    setSelectedPreset(preset)
    const newDurations = breathingPresets[preset]
    setDurations({ in: newDurations.in, out: newDurations.out })
    onUpdateDurations?.([newDurations.in, newDurations.out])
  }

  const handleDurationChange = (type: keyof typeof durations, value: number) => {
    const newDurations = { ...durations, [type]: value }
    setDurations(newDurations)
    onUpdateDurations?.([newDurations.in, newDurations.out])
  }

  const position = getPosition()
  const progressPath = getProgressPath()
  const activeColor = stepColors[currentStep] ?? stepColors[0]
  const stepDuration = getStepDuration(currentStep, durations)

  const markers = [
    { ...getPointAt(0), step: 0, label: "start" },
    { ...getPointAt(Math.PI / 2), step: null, label: "peak" },
    { x: center, y: center, step: null, label: "center" },
    { ...getPointAt(Math.PI), step: 1, label: "mid" },
    { ...getPointAt((3 * Math.PI) / 2), step: null, label: "trough" },
  ]

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
              <SheetTitle>{t.breathingTechniques.infinity.name}</SheetTitle>
              <SheetDescription>Customize your infinity breathing pattern</SheetDescription>
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
                          {preset.in}-{preset.out}
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
                      min={2}
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
        <path d={infinityPath} fill="hsl(var(--primary) / 0.04)" />

        {/* Track */}
        <path
          d={infinityPath}
          fill="none"
          stroke="hsl(var(--primary) / 0.18)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Completed loop (previous step) */}
        {currentStep > 0 && (
          <path
            d={getCompletedPath()}
            fill="none"
            stroke={stepColors[0]}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.35}
          />
        )}

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

        {/* Path markers */}
        {markers.map((marker, i) => {
          const isActive =
            marker.step === currentStep && (marker.label === "start" || marker.label === "mid")
          return (
            <circle
              key={i}
              cx={marker.x}
              cy={marker.y}
              r={isActive ? 4.5 : marker.label === "center" ? 2.5 : 3}
              fill={
                isActive
                  ? stepColors[marker.step!]
                  : marker.label === "center"
                    ? "hsl(var(--primary) / 0.15)"
                    : "hsl(var(--primary) / 0.22)"
              }
              opacity={isActive ? 1 : 0.65}
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

function getStepDuration(step: number, durations: { in: number; out: number }) {
  const values = [durations.in, durations.out]
  return values[step] ?? 4
}
