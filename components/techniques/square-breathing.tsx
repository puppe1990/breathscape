"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Settings2, Heart, Zap, Sparkles } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
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

  const t = translations[language] || translations["en"]

  const padding = size * 0.15
  const squareSize = size - padding * 2
  const center = size / 2

  // Define the path points for the square
  const topLeft = { x: padding, y: padding }
  const topRight = { x: padding + squareSize, y: padding }
  const bottomRight = { x: padding + squareSize, y: padding + squareSize }
  const bottomLeft = { x: padding, y: padding + squareSize }

  // Calculate current position based on step and progress
  const getPosition = () => {
    const percent = progress / 100

    switch (currentStep) {
      case 0: // Breathe in (bottom-left to top-left) - VERTICAL movement
        return {
          x: padding,
          y: padding + squareSize - (squareSize * percent),
        }
      case 1: // Hold 1 (top-left to top-right) - HORIZONTAL movement
        return {
          x: padding + (squareSize * percent),
          y: padding,
        }
      case 2: // Breathe out (top-right to bottom-right) - VERTICAL movement
        return {
          x: padding + squareSize,
          y: padding + (squareSize * percent),
        }
      case 3: // Hold 2 (bottom-right to bottom-left) - HORIZONTAL movement
        return {
          x: padding + squareSize - (squareSize * percent),
          y: padding + squareSize,
        }
      default:
        return { x: padding, y: padding + squareSize }
    }
  }

  // Calculate the progress path for the current step
  const getProgressPath = () => {
    const percent = progress / 100
    
    switch (currentStep) {
      case 0: // Breathe in (bottom-left to top-left) - VERTICAL
        return `M ${bottomLeft.x} ${bottomLeft.y} L ${bottomLeft.x} ${bottomLeft.y - (squareSize * percent)}`
      case 1: // Hold 1 (top-left to top-right) - HORIZONTAL
        return `M ${topLeft.x} ${topLeft.y} L ${topLeft.x + (squareSize * percent)} ${topLeft.y}`
      case 2: // Breathe out (top-right to bottom-right) - VERTICAL
        return `M ${topRight.x} ${topRight.y} L ${topRight.x} ${topRight.y + (squareSize * percent)}`
      case 3: // Hold 2 (bottom-right to bottom-left) - HORIZONTAL
        return `M ${bottomRight.x} ${bottomRight.y} L ${bottomRight.x - (squareSize * percent)} ${bottomRight.y}`
      default:
        return ""
    }
  }

  const getStepInfo = (step: number) => {
    const steps = [
      { name: t.ui.breatheIn, icon: Heart, color: "text-emerald-500" },
      { name: t.ui.hold, icon: Zap, color: "text-amber-500" },
      { name: t.ui.breatheOut, icon: Sparkles, color: "text-rose-500" },
      { name: t.ui.hold, icon: Zap, color: "text-amber-500" },
    ]
    return steps[step] || steps[0]
  }

  const handlePresetChange = (preset: PresetKey) => {
    setSelectedPreset(preset)
    const newDurations = breathingPresets[preset]
    setDurations({ 
      in: newDurations.in, 
      hold1: newDurations.hold1, 
      out: newDurations.out, 
      hold2: newDurations.hold2 
    })
    
    if (onUpdateDurations) {
      onUpdateDurations([newDurations.in, newDurations.hold1, newDurations.out, newDurations.hold2])
    }
  }

  const handleDurationChange = (type: keyof typeof durations, value: number) => {
    const newDurations = { ...durations, [type]: value }
    setDurations(newDurations)
    
    if (onUpdateDurations) {
      onUpdateDurations([newDurations.in, newDurations.hold1, newDurations.out, newDurations.hold2])
    }
  }

  const position = getPosition()
  const currentStepInfo = getStepInfo(currentStep)
  const progressPath = getProgressPath()

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      {/* Settings Button */}
      <div className="absolute top-3 right-3 z-10">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 shadow-sm"
            >
              <Settings2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-blue-700 dark:text-blue-300">Square Breathing Settings</SheetTitle>
              <SheetDescription>Customize your box breathing pattern</SheetDescription>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              {/* Preset Selection */}
              <div className="space-y-3">
                <Label className="font-medium text-blue-700 dark:text-blue-300">Choose Pattern</Label>
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
                        <div className="text-xs opacity-70">{preset.in}-{preset.hold1}-{preset.out}-{preset.hold2}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Durations */}
              <div className="space-y-4">
                <Label className="font-medium text-blue-700 dark:text-blue-300">Customize</Label>
                
                <div className="space-y-3">
                  <div>
                    <Label className="flex items-center gap-2 text-sm">
                      <Heart className="h-4 w-4 text-emerald-500" />
                      Breathe In: {durations.in}s
                    </Label>
                    <Slider
                      value={[durations.in]}
                      onValueChange={(value) => handleDurationChange("in", value[0])}
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
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Square */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Background Square */}
        <div className="absolute w-full h-full rounded-lg border-2 border-blue-200 dark:border-blue-700 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20" />
        
        {/* Square Outline */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute"
        >
          {/* Square outline */}
          <rect
            x={padding}
            y={padding}
            width={squareSize}
            height={squareSize}
            fill="none"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="2"
            rx="8"
          />
          
          {/* Progress Path */}
          <path
            d={progressPath}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            className="drop-shadow-lg"
          />
          
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="25%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#f43f5e" />
              <stop offset="75%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>

        {/* Central Indicator */}
        <div className="relative z-10">
          <motion.div
            className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center"
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
                className="w-6 h-6 mx-auto mb-1"
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
                  className: `w-6 h-6 ${currentStepInfo.color}`,
                })}
              </motion.div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {currentStepInfo.name}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Moving Dot */}
        <motion.div
          className="absolute z-20"
          style={{
            left: position.x,
            top: position.y,
          }}
          animate={{
            left: position.x,
            top: position.y,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.8 }}
        >
          {/* Outer glow */}
          <div className="absolute w-16 h-16 rounded-full -translate-x-8 -translate-y-8 bg-blue-400/20 blur-sm" />
          
          {/* Main dot */}
          <div className="absolute w-4 h-4 rounded-full -translate-x-2 -translate-y-2 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg border-2 border-white" />
          
          {/* Inner highlight */}
          <div className="absolute w-2 h-2 rounded-full -translate-x-1 -translate-y-1 bg-white/80" />
        </motion.div>

        {/* Step Indicators */}
        {[0, 1, 2, 3].map((step) => {
          const stepInfo = getStepInfo(step)
          const isActive = currentStep === step
          
          let position
          switch (step) {
            case 0: // Left (breathe in)
              position = { left: padding - 35, top: center, transform: "translateY(-50%)" }
              break
            case 1: // Top (hold 1)
              position = { left: center, top: padding - 35, transform: "translateX(-50%)" }
              break
            case 2: // Right (breathe out)
              position = { left: padding + squareSize + 35, top: center, transform: "translateY(-50%)" }
              break
            case 3: // Bottom (hold 2)
              position = { left: center, top: padding + squareSize + 35, transform: "translateX(-50%)" }
              break
          }

          return (
            <motion.div
              key={step}
              className="absolute z-20"
              style={position}
              animate={{
                scale: isActive ? 1.1 : 1,
                opacity: isActive ? 1 : 0.6,
              }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 border-white shadow-lg"
                    : "bg-white/80 dark:bg-gray-800/80 border-gray-300 dark:border-gray-600"
                )}
              >
                {React.createElement(stepInfo.icon, {
                  className: `w-4 h-4 ${
                    isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
                  }`,
                })}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Progress Bars */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((step) => (
            <motion.div
              key={step}
              className="h-1.5 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"
              animate={{
                scale: currentStep === step ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
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

