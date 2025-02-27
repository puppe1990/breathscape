"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Settings2 } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { translations } from "@/lib/translations/index"

// Predefined breathing patterns
const breathingPresets = {
  custom: { name: "Custom", in: 4, hold: 4, out: 4 },
  "4-7-8": { name: "4-7-8 Breathing", in: 4, hold: 7, out: 8 },
  box: { name: "Box Breathing", in: 4, hold: 4, out: 4 },
  relaxing: { name: "Relaxing Breath", in: 6, hold: 0, out: 7 },
  energizing: { name: "Energizing Breath", in: 2, hold: 0, out: 4 },
  coherent: { name: "Coherent Breathing", in: 5, hold: 0, out: 5 },
  alternate: { name: "Alternate Breathing", in: 4, hold: 4, out: 6 },
} as const

type PresetKey = keyof typeof breathingPresets

interface CircleBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
  language: string
  onUpdateDurations?: (durations: number[]) => void
}

export function CircleBreathing({
  size = 200,
  isPlaying,
  currentStep,
  progress,
  className,
  language,
  onUpdateDurations,
}: CircleBreathingProps) {
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>("4-7-8")
  const [breatheInDuration, setBreatheInDuration] = useState(4)
  const [holdDuration, setHoldDuration] = useState(7)
  const [breatheOutDuration, setBreatheOutDuration] = useState(8)

  const t = translations[language] || translations["en"]

  const padding = size * 0.1
  const radius = (size - padding * 2) / 2
  const center = size / 2
  const circumference = 2 * Math.PI * radius

  // Calculate position along the circle path
  const getPosition = () => {
    const angle = (currentStep * 120 + (progress / 100) * 120) * (Math.PI / 180)
    return {
      x: center + radius * Math.cos(angle - Math.PI / 2),
      y: center + radius * Math.sin(angle - Math.PI / 2),
    }
  }

  // Get breathing instruction based on current step
  const getInstruction = (step: number) => {
    switch (step) {
      case 0:
        return t.ui.breatheIn
      case 1:
        return t.ui.hold
      case 2:
        return t.ui.breatheOut
      default:
        return ""
    }
  }

  // Calculate label positions
  const getLabelPosition = (index: number) => {
    const angle = (index * 120 - 90) * (Math.PI / 180)
    const labelRadius = radius + 40
    return {
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
      rotate: angle * (180 / Math.PI) + 90,
    }
  }

  // Handle preset selection
  const handlePresetChange = (value: PresetKey) => {
    setSelectedPreset(value)
    const preset = breathingPresets[value]
    setBreatheInDuration(preset.in)
    setHoldDuration(preset.hold)
    setBreatheOutDuration(preset.out)

    if (onUpdateDurations) {
      onUpdateDurations([preset.in, preset.hold, preset.out])
    }
  }

  const handleUpdateDurations = () => {
    if (onUpdateDurations) {
      onUpdateDurations([breatheInDuration, holdDuration, breatheOutDuration])
    }
  }

  const position = getPosition()

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      {/* Settings button */}
      <div className="absolute top-0 right-0 z-10">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings2 className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{t.ui.settings}</SheetTitle>
              <SheetDescription>Choose a preset or customize your breathing pattern</SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              {/* Preset selector */}
              <div className="space-y-2">
                <Label>Breathing Pattern</Label>
                <Select value={selectedPreset} onValueChange={(value) => handlePresetChange(value as PresetKey)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(breathingPresets).map(([key, preset]) => (
                      <SelectItem key={key} value={key}>
                        {t.ui.presets[key as PresetKey] || preset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-1">
                <Label>Current Pattern:</Label>
                <p className="text-sm text-muted-foreground">
                  {t.ui.breatheIn} ({breatheInDuration}s) - {t.ui.hold} ({holdDuration}s) - {t.ui.breatheOut} (
                  {breatheOutDuration}s)
                </p>
              </div>

              <div className="space-y-2">
                <Label>{t.ui.duration.breatheIn}</Label>
                <Slider
                  min={2}
                  max={10}
                  step={1}
                  value={[breatheInDuration]}
                  onValueChange={(value) => {
                    setBreatheInDuration(value[0])
                    setSelectedPreset("custom")
                  }}
                />
                <span className="text-sm text-muted-foreground">
                  {breatheInDuration} {t.ui.duration.seconds}
                </span>
              </div>

              <div className="space-y-2">
                <Label>{t.ui.duration.hold}</Label>
                <Slider
                  min={0}
                  max={10}
                  step={1}
                  value={[holdDuration]}
                  onValueChange={(value) => {
                    setHoldDuration(value[0])
                    setSelectedPreset("custom")
                  }}
                />
                <span className="text-sm text-muted-foreground">
                  {holdDuration} {t.ui.duration.seconds}
                </span>
              </div>

              <div className="space-y-2">
                <Label>{t.ui.duration.breatheOut}</Label>
                <Slider
                  min={2}
                  max={10}
                  step={1}
                  value={[breatheOutDuration]}
                  onValueChange={(value) => {
                    setBreatheOutDuration(value[0])
                    setSelectedPreset("custom")
                  }}
                />
                <span className="text-sm text-muted-foreground">
                  {breatheOutDuration} {t.ui.duration.seconds}
                </span>
              </div>

              <Button onClick={handleUpdateDurations} className="w-full">
                {t.ui.apply}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Background glow effect */}
      <div className={cn("absolute inset-0 transition-opacity duration-500", isPlaying ? "opacity-30" : "opacity-0")}>
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(244,114,182,0.4) 0%, rgba(244,114,182,0) 70%)",
          }}
        />
      </div>

      {/* Circle outline */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        <defs>
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
          <filter id="circleGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeOpacity={0.2}
          strokeWidth={2}
          fill="none"
        />

        {/* Active segment highlight */}
        <motion.path
          d={(() => {
            const startAngle = currentStep * 120 - 90
            const endAngle = startAngle + (progress / 100) * 120
            const start = {
              x: center + radius * Math.cos((startAngle * Math.PI) / 180),
              y: center + radius * Math.sin((startAngle * Math.PI) / 180),
            }
            const end = {
              x: center + radius * Math.cos((endAngle * Math.PI) / 180),
              y: center + radius * Math.sin((endAngle * Math.PI) / 180),
            }
            const largeArcFlag = progress > 50 ? 1 : 0
            return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`
          })()}
          stroke="url(#circleGradient)"
          strokeWidth={4}
          strokeLinecap="round"
          filter="url(#circleGlow)"
          fill="none"
        />
      </svg>

      {/* Moving dot with glow effects */}
      <div className="absolute">
        {/* Outer glow */}
        <motion.div
          className="absolute w-16 h-16 rounded-full -translate-x-8 -translate-y-8"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(236,72,153,0) 70%)",
          }}
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />

        {/* Medium glow */}
        <motion.div
          className="absolute w-12 h-12 rounded-full -translate-x-6 -translate-y-6"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(236,72,153,0) 70%)",
          }}
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />

        {/* Inner glow */}
        <motion.div
          className="absolute w-8 h-8 bg-pink-500/20 rounded-full -translate-x-4 -translate-y-4 blur-sm"
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />

        {/* Main dot */}
        <motion.div
          className="absolute w-4 h-4 rounded-full -translate-x-2 -translate-y-2"
          style={{
            background: "linear-gradient(45deg, #ec4899, #f472b6)",
            boxShadow: "0 0 20px rgba(236,72,153,0.5)",
          }}
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />
      </div>

      {/* Step labels */}
      {[0, 1, 2].map((index) => {
        const instruction = getInstruction(index)
        const labelPosition = getLabelPosition(index)

        return (
          <div
            key={index}
            className={cn(
              "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 px-3 py-1.5 rounded-full",
              currentStep === index
                ? "bg-pink-500/10 text-pink-700 dark:text-pink-300 scale-110"
                : "opacity-40 scale-100",
            )}
            style={{
              left: labelPosition.x,
              top: labelPosition.y,
              transform: `translate(-50%, -50%) rotate(${labelPosition.rotate}deg)`,
            }}
          >
            <span style={{ transform: `rotate(${-labelPosition.rotate}deg)`, display: "block" }}>{instruction}</span>
          </div>
        )
      })}

      {/* Progress indicators */}
      <div className="absolute inset-x-0 -bottom-8 flex justify-center gap-2">
        {[0, 1, 2].map((step) => (
          <div key={step} className="h-1 w-12 rounded-full overflow-hidden bg-pink-100 dark:bg-pink-950">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-pink-400 transition-all duration-100"
              style={{
                width: currentStep === step ? `${progress}%` : "0%",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

