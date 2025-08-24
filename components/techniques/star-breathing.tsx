"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Settings2, Heart, Zap, Sparkles, Star, Flame } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
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
  const [isMobile, setIsMobile] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const t = translations[language] || translations["en"]

  // Detect screen sizes
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsSmallScreen(width < 480)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Responsive sizing
  const getResponsiveSize = () => {
    if (isSmallScreen) return Math.min(size, 200)
    if (isMobile) return Math.min(size, 240)
    return size
  }

  const adjustedSize = getResponsiveSize()
  
  // Calculate centered star dimensions
  const desiredStarSize = adjustedSize * 0.7 // Star takes 70% of container
  const actualStarSize = Math.max(desiredStarSize, 120) // Minimum size
  const actualPadding = (adjustedSize - actualStarSize) / 2 // Center the star
  const center = adjustedSize / 2
  const outerRadius = actualStarSize / 2
  const innerRadius = outerRadius * 0.382 // Golden ratio for star proportion

  // Calculate all star points (5 outer points and 5 inner points)
  const points = Array.from({ length: 10 }).map((_, i) => {
    const angle = (i * 36 - 90) * (Math.PI / 180) // Start from top (-90 degrees)
    // Alternate between outer and inner points
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  })

  // Get the current position based on step and progress
  const getPosition = () => {
    // Each step now covers 2 segments of the star (from outer to inner to outer)
    const segmentsPerStep = 2
    const totalPoints = points.length

    // Calculate which segments we're currently traversing
    const baseIndex = (currentStep * segmentsPerStep) % totalPoints
    const nextIndex = (baseIndex + 1) % totalPoints
    const afterNextIndex = (baseIndex + 2) % totalPoints

    // Calculate progress within the current step (0-1)
    const stepProgress = progress / 100

    // If we're in the first half of the step
    if (stepProgress < 0.5) {
      // Normalize progress for the first segment
      const normalizedProgress = stepProgress * 2
      return {
        x: points[baseIndex].x + (points[nextIndex].x - points[baseIndex].x) * normalizedProgress,
        y: points[baseIndex].y + (points[nextIndex].y - points[baseIndex].y) * normalizedProgress,
      }
    } else {
      // Normalize progress for the second segment
      const normalizedProgress = (stepProgress - 0.5) * 2
      return {
        x: points[nextIndex].x + (points[afterNextIndex].x - points[nextIndex].x) * normalizedProgress,
        y: points[nextIndex].y + (points[afterNextIndex].y - points[nextIndex].y) * normalizedProgress,
      }
    }
  }

  // Create the star path
  const starPath = points.map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ") + " Z"

  const getStepInfo = (step: number) => {
    const steps = [
      { name: t.ui.breatheIn, icon: Heart, color: "text-amber-500" },
      { name: t.ui.hold, icon: Zap, color: "text-orange-500" },
      { name: t.ui.breatheOut, icon: Sparkles, color: "text-red-500" },
      { name: t.ui.hold, icon: Star, color: "text-yellow-500" },
      { name: "Focus", icon: Flame, color: "text-pink-500" },
    ]
    return steps[step] || steps[0]
  }

  const handlePresetChange = (preset: PresetKey) => {
    setSelectedPreset(preset)
    const newDurations = breathingPresets[preset]
    setDurations({ 
      in1: newDurations.in1, 
      hold1: newDurations.hold1, 
      out: newDurations.out, 
      hold2: newDurations.hold2,
      focus: newDurations.focus
    })
    
    if (onUpdateDurations) {
      onUpdateDurations([newDurations.in1, newDurations.hold1, newDurations.out, newDurations.hold2, newDurations.focus])
    }
  }

  const handleDurationChange = (type: keyof typeof durations, value: number) => {
    const newDurations = { ...durations, [type]: value }
    setDurations(newDurations)
    
    if (onUpdateDurations) {
      onUpdateDurations([newDurations.in1, newDurations.hold1, newDurations.out, newDurations.hold2, newDurations.focus])
    }
  }

  const position = getPosition()
  const currentStepInfo = getStepInfo(currentStep)

  // Create progress path for current segment
  const getProgressPath = () => {
    const percent = progress / 100
    const segmentsPerStep = 2
    const totalPoints = points.length

    // Calculate which segments we're currently traversing
    const baseIndex = (currentStep * segmentsPerStep) % totalPoints
    const nextIndex = (baseIndex + 1) % totalPoints
    const afterNextIndex = (baseIndex + 2) % totalPoints

    // If we're in the first half of the step
    if (percent < 0.5) {
      const normalizedProgress = percent * 2
      const currentX = points[baseIndex].x + (points[nextIndex].x - points[baseIndex].x) * normalizedProgress
      const currentY = points[baseIndex].y + (points[nextIndex].y - points[baseIndex].y) * normalizedProgress
      return `M ${points[baseIndex].x} ${points[baseIndex].y} L ${currentX} ${currentY}`
    } else {
      const normalizedProgress = (percent - 0.5) * 2
      const midX = points[nextIndex].x
      const midY = points[nextIndex].y
      const currentX = points[nextIndex].x + (points[afterNextIndex].x - points[nextIndex].x) * normalizedProgress
      const currentY = points[nextIndex].y + (points[afterNextIndex].y - points[nextIndex].y) * normalizedProgress
      return `M ${points[baseIndex].x} ${points[baseIndex].y} L ${midX} ${midY} L ${currentX} ${currentY}`
    }
  }

  return (
    <div className={cn(
      "relative w-full h-full flex items-center justify-center overflow-hidden",
      className
    )}>
      {/* Settings Button - Responsive positioning */}
      <div className={cn(
        "absolute z-10",
        isSmallScreen ? "top-2 right-2" : "top-3 right-3"
      )}>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 shadow-sm",
                isSmallScreen ? "h-7 w-7" : "h-9 w-9"
              )}
            >
              <Settings2 className={cn(
                "text-amber-600 dark:text-amber-400",
                isSmallScreen ? "h-3 w-3" : "h-4 w-4"
              )} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-amber-700 dark:text-amber-300">Star Breathing Settings</SheetTitle>
              <SheetDescription>Customize your 5-point star breathing pattern</SheetDescription>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              {/* Preset Selection */}
              <div className="space-y-3">
                <Label className="font-medium text-amber-700 dark:text-amber-300">Choose Pattern</Label>
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
                        <div className="text-xs opacity-70">{preset.in1}-{preset.hold1}-{preset.out}-{preset.hold2}-{preset.focus}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Durations */}
              <div className="space-y-4">
                <Label className="font-medium text-amber-700 dark:text-amber-300">Customize</Label>
                
                <div className="space-y-3">
                  <div>
                    <Label className="flex items-center gap-2 text-sm">
                      <Heart className="h-4 w-4 text-amber-500" />
                      Breathe In: {durations.in1}s
                    </Label>
                    <Slider
                      value={[durations.in1]}
                      onValueChange={(value) => handleDurationChange("in1", value[0])}
                      max={10}
                      min={2}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label className="flex items-center gap-2 text-sm">
                      <Zap className="h-4 w-4 text-orange-500" />
                      Hold 1: {durations.hold1}s
                    </Label>
                    <Slider
                      value={[durations.hold1]}
                      onValueChange={(value) => handleDurationChange("hold1", value[0])}
                      max={10}
                      min={0}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-red-500" />
                      Breathe Out: {durations.out}s
                    </Label>
                    <Slider
                      value={[durations.out]}
                      onValueChange={(value) => handleDurationChange("out", value[0])}
                      max={10}
                      min={2}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Hold 2: {durations.hold2}s
                    </Label>
                    <Slider
                      value={[durations.hold2]}
                      onValueChange={(value) => handleDurationChange("hold2", value[0])}
                      max={10}
                      min={0}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 text-sm">
                      <Flame className="h-4 w-4 text-pink-500" />
                      Focus: {durations.focus}s
                    </Label>
                    <Slider
                      value={[durations.focus]}
                      onValueChange={(value) => handleDurationChange("focus", value[0])}
                      max={10}
                      min={2}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Star Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Star Outline */}
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${adjustedSize} ${adjustedSize}`}
          className="absolute"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Star outline */}
          <path 
            d={starPath} 
            stroke="rgba(217, 119, 6, 0.6)" 
            strokeWidth="3" 
            fill="none" 
            strokeLinejoin="round"
          />
          
          {/* Progress Path */}
          <path
            d={getProgressPath()}
            fill="none"
            stroke="url(#starGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            className="drop-shadow-lg"
          />
          
          <defs>
            <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="25%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="75%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        {/* Central Indicator - Responsive sizing */}
        <div className="relative z-10">
          <motion.div
            className={cn(
              "rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center",
              isSmallScreen ? "w-12 h-12" : isMobile ? "w-16 h-16" : "w-20 h-20"
            )}
            animate={{
              scale: isPlaying ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: isPlaying ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <div className="text-center">
              <motion.div
                className={cn(
                  "mx-auto mb-1",
                  isSmallScreen ? "w-4 h-4" : isMobile ? "w-5 h-5" : "w-6 h-6"
                )}
                animate={{
                  scale: isPlaying ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: isPlaying ? Infinity : 0,
                  ease: "easeInOut",
                }}
              >
                {React.createElement(currentStepInfo.icon, {
                  className: cn(
                    currentStepInfo.color,
                    isSmallScreen ? "w-4 h-4" : isMobile ? "w-5 h-5" : "w-6 h-6"
                  ),
                })}
              </motion.div>
              <span className={cn(
                "font-medium text-gray-600 dark:text-gray-400",
                isSmallScreen ? "text-[10px]" : "text-xs"
              )}>
                {currentStepInfo.name}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Moving Dot - Responsive sizing */}
        <motion.div
          className="absolute z-20"
          style={{
            left: `${(position.x / adjustedSize) * 100}%`,
            top: `${(position.y / adjustedSize) * 100}%`,
          }}
          animate={{
            left: `${(position.x / adjustedSize) * 100}%`,
            top: `${(position.y / adjustedSize) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.8 }}
        >
          {/* Outer glow */}
          <div className={cn(
            "absolute rounded-full -translate-x-1/2 -translate-y-1/2 bg-amber-400/20 blur-sm",
            isSmallScreen ? "w-8 h-8" : isMobile ? "w-12 h-12" : "w-16 h-16"
          )} />
          
          {/* Main dot */}
          <div className={cn(
            "absolute rounded-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg border-2 border-white",
            isSmallScreen ? "w-3 h-3" : "w-4 h-4"
          )} />
          
          {/* Inner highlight */}
          <div className={cn(
            "absolute rounded-full -translate-x-1/2 -translate-y-1/2 bg-white/80",
            isSmallScreen ? "w-1.5 h-1.5" : "w-2 h-2"
          )} />
        </motion.div>
      </div>

      {/* Progress Bars - Responsive positioning and sizing */}
      <div className={cn(
        "absolute left-1/2 transform -translate-x-1/2",
        isSmallScreen ? "-bottom-4" : "-bottom-6"
      )}>
        <div className="flex gap-1 sm:gap-2">
          {[0, 1, 2, 3, 4].map((step) => (
            <motion.div
              key={step}
              className={cn(
                "h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden",
                isSmallScreen ? "w-5" : isMobile ? "w-7" : "w-9"
              )}
              animate={{
                scale: currentStep === step ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: currentStep === step ? `${progress}%` : "0%",
                }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

