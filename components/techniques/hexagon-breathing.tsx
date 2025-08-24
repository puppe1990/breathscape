"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Settings2, Heart, Zap, Sparkles, Wind, Brain, Pause } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { translations } from "@/lib/translations/index"

interface HexagonBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
  language: string
  onUpdateDurations?: (durations: number[]) => void
}

const breathingPresets = {
  "4-4-4-4-4-4": { name: "Box 6-Step", in1: 4, hold1: 4, out: 4, hold2: 4, in2: 4, hold3: 4 },
  "5-5-5-5-5-5": { name: "Extended 6-Step", in1: 5, hold1: 5, out: 5, hold2: 5, in2: 5, hold3: 5 },
  "6-2-6-2-6-2": { name: "Relaxing", in1: 6, hold1: 2, out: 6, hold2: 2, in2: 6, hold3: 2 },
  "4-7-8-4-4-7": { name: "Sleep Pattern", in1: 4, hold1: 7, out: 8, hold2: 4, in2: 4, hold3: 7 },
  "3-3-3-3-3-3": { name: "Quick Cycle", in1: 3, hold1: 3, out: 3, hold2: 3, in2: 3, hold3: 3 },
} as const

type PresetKey = keyof typeof breathingPresets

export function HexagonBreathing({
  size = 280,
  isPlaying,
  currentStep,
  progress,
  className,
  language,
  onUpdateDurations,
}: HexagonBreathingProps) {
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>("4-4-4-4-4-4")
  const [durations, setDurations] = useState({ in1: 4, hold1: 4, out: 4, hold2: 4, in2: 4, hold3: 4 })
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
  
  // Calculate centered hexagon dimensions
  const desiredHexagonSize = adjustedSize * 0.7 // Hexagon takes 70% of container
  const actualHexagonSize = Math.max(desiredHexagonSize, 120) // Minimum size
  const actualPadding = (adjustedSize - actualHexagonSize) / 2 // Center the hexagon
  const center = adjustedSize / 2
  const radius = actualHexagonSize / 2

  // Calculate the six points of the hexagon
  const points = Array.from({ length: 6 }).map((_, i) => {
    const angle = (i * 60 - 30) * (Math.PI / 180)
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  })

  // Get the current position based on step and progress
  const getPosition = () => {
    const percent = progress / 100
    const currentPoint = points[currentStep]
    const nextPoint = points[(currentStep + 1) % 6]

    return {
      x: currentPoint.x + (nextPoint.x - currentPoint.x) * percent,
      y: currentPoint.y + (nextPoint.y - currentPoint.y) * percent,
    }
  }

  // Create the hexagon path
  const hexagonPath = points.map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ") + " Z"

  const getStepInfo = (step: number) => {
    const steps = [
      { name: t.ui.breatheIn, icon: Heart, color: "text-emerald-500" },
      { name: t.ui.hold, icon: Zap, color: "text-amber-500" },
      { name: t.ui.breatheOut, icon: Sparkles, color: "text-rose-500" },
      { name: t.ui.hold, icon: Zap, color: "text-amber-500" },
      { name: t.ui.breatheIn, icon: Wind, color: "text-blue-500" },
      { name: t.ui.hold, icon: Brain, color: "text-purple-500" },
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
      in2: newDurations.in2,
      hold3: newDurations.hold3
    })
    
    if (onUpdateDurations) {
      onUpdateDurations([newDurations.in1, newDurations.hold1, newDurations.out, newDurations.hold2, newDurations.in2, newDurations.hold3])
    }
  }

  const handleDurationChange = (type: keyof typeof durations, value: number) => {
    const newDurations = { ...durations, [type]: value }
    setDurations(newDurations)
    
    if (onUpdateDurations) {
      onUpdateDurations([newDurations.in1, newDurations.hold1, newDurations.out, newDurations.hold2, newDurations.in2, newDurations.hold3])
    }
  }

  const position = getPosition()
  const currentStepInfo = getStepInfo(currentStep)

  // Create progress path for current segment
  const getProgressPath = () => {
    const percent = progress / 100
    const currentPoint = points[currentStep]
    const nextPoint = points[(currentStep + 1) % 6]
    
    const currentX = currentPoint.x + (nextPoint.x - currentPoint.x) * percent
    const currentY = currentPoint.y + (nextPoint.y - currentPoint.y) * percent
    
    return `M ${currentPoint.x} ${currentPoint.y} L ${currentX} ${currentY}`
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
                "text-emerald-600 dark:text-emerald-400",
                isSmallScreen ? "h-3 w-3" : "h-4 w-4"
              )} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-emerald-700 dark:text-emerald-300">Hexagon Breathing Settings</SheetTitle>
              <SheetDescription>Customize your 6-step breathing pattern</SheetDescription>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              {/* Preset Selection */}
              <div className="space-y-3">
                <Label className="font-medium text-emerald-700 dark:text-emerald-300">Choose Pattern</Label>
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
                        <div className="text-xs opacity-70">{preset.in1}-{preset.hold1}-{preset.out}-{preset.hold2}-{preset.in2}-{preset.hold3}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Durations */}
              <div className="space-y-4">
                <Label className="font-medium text-emerald-700 dark:text-emerald-300">Customize</Label>
                
                <div className="space-y-3">
                  <div>
                    <Label className="flex items-center gap-2 text-sm">
                      <Heart className="h-4 w-4 text-emerald-500" />
                      Breathe In 1: {durations.in1}s
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
                      <Zap className="h-4 w-4 text-amber-500" />
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
                      <Sparkles className="h-4 w-4 text-rose-500" />
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
                      <Zap className="h-4 w-4 text-amber-500" />
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
                      <Wind className="h-4 w-4 text-blue-500" />
                      Breathe In 2: {durations.in2}s
                    </Label>
                    <Slider
                      value={[durations.in2]}
                      onValueChange={(value) => handleDurationChange("in2", value[0])}
                      max={10}
                      min={2}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 text-sm">
                      <Brain className="h-4 w-4 text-purple-500" />
                      Hold 3: {durations.hold3}s
                    </Label>
                    <Slider
                      value={[durations.hold3]}
                      onValueChange={(value) => handleDurationChange("hold3", value[0])}
                      max={10}
                      min={0}
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

      {/* Main Hexagon Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Hexagon Outline */}
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${adjustedSize} ${adjustedSize}`}
          className="absolute"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Hexagon outline */}
          <path 
            d={hexagonPath} 
            stroke="rgba(16, 185, 129, 0.6)" 
            strokeWidth="3" 
            fill="none" 
          />
          
          {/* Progress Path */}
          <path
            d={getProgressPath()}
            fill="none"
            stroke="url(#hexagonGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            className="drop-shadow-lg"
          />
          
          <defs>
            <linearGradient id="hexagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="25%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#6ee7b7" />
              <stop offset="75%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#10b981" />
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
            "absolute rounded-full -translate-x-1/2 -translate-y-1/2 bg-emerald-400/20 blur-sm",
            isSmallScreen ? "w-8 h-8" : isMobile ? "w-12 h-12" : "w-16 h-16"
          )} />
          
          {/* Main dot */}
          <div className={cn(
            "absolute rounded-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg border-2 border-white",
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
          {[0, 1, 2, 3, 4, 5].map((step) => (
            <motion.div
              key={step}
              className={cn(
                "h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden",
                isSmallScreen ? "w-4" : isMobile ? "w-6" : "w-8"
              )}
              animate={{
                scale: currentStep === step ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
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

