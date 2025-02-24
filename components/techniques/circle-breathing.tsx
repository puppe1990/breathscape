"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Settings2 } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

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
  onUpdateDurations?: (durations: number[]) => void
}

export function CircleBreathing({
  size = 200,
  isPlaying,
  currentStep,
  progress,
  className,
  onUpdateDurations,
}: CircleBreathingProps) {
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>("4-7-8")
  const [breatheInDuration, setBreatheInDuration] = useState(4)
  const [holdDuration, setHoldDuration] = useState(7)
  const [breatheOutDuration, setBreatheOutDuration] = useState(8)

  const padding = size * 0.1
  const radius = (size - padding * 2) / 2
  const center = size / 2
  const circumference = 2 * Math.PI * radius

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

  // Calculate circle scale based on breathing phase
  const getCircleScale = () => {
    const baseScale = 0.6
    const maxScale = 1

    if (currentStep === 0) {
      // Breathing in
      return baseScale + (maxScale - baseScale) * (progress / 100)
    } else if (currentStep === 2) {
      // Breathing out
      return maxScale - (maxScale - baseScale) * (progress / 100)
    }
    return currentStep === 1 ? maxScale : baseScale // Hold phases
  }

  const handleUpdateDurations = () => {
    if (onUpdateDurations) {
      onUpdateDurations([breatheInDuration, holdDuration, breatheOutDuration])
    }
  }

  // Generate particles for visual effect
  const particles = Array.from({ length: 12 }).map((_, i) => {
    const angle = i * 30 * (Math.PI / 180)
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      delay: i * 0.1,
    }
  })

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
              <SheetTitle>Breathing Settings</SheetTitle>
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
                        {preset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-1">
                <Label>Current Pattern:</Label>
                <p className="text-sm text-muted-foreground">
                  Inhale ({breatheInDuration}s) - Hold ({holdDuration}s) - Exhale ({breatheOutDuration}s)
                </p>
              </div>

              <div className="space-y-2">
                <Label>Breathe In Duration</Label>
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
                <span className="text-sm text-muted-foreground">{breatheInDuration} seconds</span>
              </div>

              <div className="space-y-2">
                <Label>Hold Duration</Label>
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
                <span className="text-sm text-muted-foreground">{holdDuration} seconds</span>
              </div>

              <div className="space-y-2">
                <Label>Breathe Out Duration</Label>
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
                <span className="text-sm text-muted-foreground">{breatheOutDuration} seconds</span>
              </div>

              <Button onClick={handleUpdateDurations} className="w-full">
                Apply Changes
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main container with gradient background */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, 
              rgba(244,114,182,0.2) 0%, 
              rgba(244,114,182,0.1) 50%, 
              rgba(244,114,182,0) 100%
            )`,
            opacity: isPlaying ? 1 : 0,
          }}
        />
      </div>

      {/* SVG container for circles and effects */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute">
        <defs>
          <radialGradient id="circleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ripple effect circles */}
        <AnimatePresence>
          {isPlaying && currentStep === 0 && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.circle
                  key={`ripple-${i}`}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={{ strokeOpacity: 0.3, scale: 0.8 }}
                  animate={{
                    strokeOpacity: 0,
                    scale: 1.2,
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Base circle */}
        <circle cx={center} cy={center} r={radius} fill="url(#circleGradient)" className="opacity-30" />

        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeOpacity={0.2}
          filter="url(#glow)"
        />

        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress / 100)}
          className="origin-center"
          style={{ rotate: -90 }}
          filter="url(#glow)"
        />

        {/* Breathing circle */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius * 0.8}
          fill="currentColor"
          fillOpacity={0.15}
          animate={{
            scale: getCircleScale(),
          }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 12,
          }}
          style={{
            originX: center,
            originY: center,
          }}
          filter="url(#glow)"
        />

        {/* Particle effects */}
        {isPlaying && currentStep === 0 && (
          <>
            {particles.map((particle, i) => (
              <motion.circle
                key={i}
                cx={center + particle.x}
                cy={center + particle.y}
                r={2}
                fill="currentColor"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  delay: particle.delay,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </svg>

      {/* Breathing instruction */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <motion.div
          className="text-2xl sm:text-3xl md:text-4xl font-medium"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: getCircleScale(),
          }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 12,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 0 ? "Breathe In" : currentStep === 1 ? "Hold" : "Breathe Out"}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="text-base sm:text-lg md:text-xl text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {breathingPresets[selectedPreset].name}
        </motion.div>
      </div>

      {/* Duration display */}
      <div className="mt-4 flex justify-center gap-2 text-sm">
        <div className="flex items-center gap-1 opacity-60 bg-background/50 px-3 py-1 rounded-full backdrop-blur-sm">
          <span>{breatheInDuration}s</span>
          <span>•</span>
          <span>{holdDuration}s</span>
          <span>•</span>
          <span>{breatheOutDuration}s</span>
        </div>
      </div>
    </div>
  )
}

