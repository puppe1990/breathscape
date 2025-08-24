"use client"

import React, { useState, useEffect } from "react"
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
  const padding = adjustedSize * 0.12 // Reduced padding for better mobile fit
  const squareSize = adjustedSize - padding * 2
  const center = adjustedSize / 2

  // Ensure minimum sizes for very small screens
  const minPadding = isSmallScreen ? 16 : 20
  const actualPadding = Math.max(padding, minPadding)
  const actualSquareSize = Math.max(squareSize, adjustedSize - (minPadding * 2))

  // Responsive offsets for step indicators
  const getStepIndicatorOffset = () => {
    if (isSmallScreen) return Math.min(20, actualPadding * 0.8)
    if (isMobile) return Math.min(25, actualPadding * 0.9)
    return Math.min(35, actualPadding * 1.2)
  }

  const stepIndicatorOffset = getStepIndicatorOffset()

  // Define the path points for the square
  const topLeft = { x: actualPadding, y: actualPadding }
  const topRight = { x: actualPadding + actualSquareSize, y: actualPadding }
  const bottomRight = { x: actualPadding + actualSquareSize, y: actualPadding + actualSquareSize }
  const bottomLeft = { x: actualPadding, y: actualPadding + actualSquareSize }

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
                "text-blue-600 dark:text-blue-400",
                isSmallScreen ? "h-3 w-3" : "h-4 w-4"
              )} />
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

      {/* Main Square Container - Responsive sizing with better overflow handling */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Background Square */}
        <div className="absolute w-full h-full rounded-lg border-2 border-blue-200 dark:border-blue-700 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20" />
        
        {/* Square Outline */}
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${adjustedSize} ${adjustedSize}`}
          className="absolute"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Square outline */}
          <rect
            x={actualPadding}
            y={actualPadding}
            width={actualSquareSize}
            height={actualSquareSize}
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
            "absolute rounded-full -translate-x-1/2 -translate-y-1/2 bg-blue-400/20 blur-sm",
            isSmallScreen ? "w-8 h-8" : isMobile ? "w-12 h-12" : "w-16 h-16"
          )} />
          
          {/* Main dot */}
          <div className={cn(
            "absolute rounded-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg border-2 border-white",
            isSmallScreen ? "w-3 h-3" : "w-4 h-4"
          )} />
          
          {/* Inner highlight */}
          <div className={cn(
            "absolute rounded-full -translate-x-1/2 -translate-y-1/2 bg-white/80",
            isSmallScreen ? "w-1.5 h-1.5" : "w-2 h-2"
          )} />
        </motion.div>

        {/* Step Indicators - Responsive positioning and sizing */}
        {[0, 1, 2, 3].map((step) => {
          const stepInfo = getStepInfo(step)
          const isActive = currentStep === step
          
          // Responsive positioning to prevent overflow
          const indicatorSize = isSmallScreen ? 32 : isMobile ? 40 : 48
          
          let position
          switch (step) {
            case 0: // Left (breathe in)
              position = { left: `${(actualPadding - stepIndicatorOffset) / adjustedSize * 100}%`, top: "50%", transform: "translateY(-50%)" }
              break
            case 1: // Top (hold 1)
              position = { left: "50%", top: `${(actualPadding - stepIndicatorOffset) / adjustedSize * 100}%`, transform: "translateX(-50%)" }
              break
            case 2: // Right (breathe out)
              position = { left: `${(actualPadding + actualSquareSize + stepIndicatorOffset) / adjustedSize * 100}%`, top: "50%", transform: "translateY(-50%)" }
              break
            case 3: // Bottom (hold 2)
              position = { left: "50%", top: `${(actualPadding + actualSquareSize + stepIndicatorOffset) / adjustedSize * 100}%`, transform: "translateX(-50%)" }
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
                  "rounded-full flex items-center justify-center border-2 transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 border-white shadow-lg"
                    : "bg-white/80 dark:bg-gray-800/80 border-gray-300 dark:border-gray-600",
                  isSmallScreen ? "w-8 h-8" : isMobile ? "w-10 h-10" : "w-12 h-12"
                )}
              >
                {React.createElement(stepInfo.icon, {
                  className: cn(
                    isActive ? "text-white" : "text-gray-500 dark:text-gray-400",
                    isSmallScreen ? "w-2.5 h-2.5" : isMobile ? "w-3 h-3" : "w-4 h-4"
                  ),
                })}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Progress Bars - Responsive positioning and sizing */}
      <div className={cn(
        "absolute left-1/2 transform -translate-x-1/2",
        isSmallScreen ? "-bottom-4" : "-bottom-6"
      )}>
        <div className="flex gap-1 sm:gap-2">
          {[0, 1, 2, 3].map((step) => (
            <motion.div
              key={step}
              className={cn(
                "h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden",
                isSmallScreen ? "w-6" : isMobile ? "w-8" : "w-10"
              )}
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

