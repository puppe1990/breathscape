"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Settings2, Heart, Zap, Sparkles, Infinity as InfinityIcon } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
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
  
  // Calculate centered infinity dimensions
  const desiredInfinitySize = adjustedSize * 0.7 // Infinity takes 70% of container
  const actualInfinitySize = Math.max(desiredInfinitySize, 120) // Minimum size
  const actualPadding = (adjustedSize - actualInfinitySize) / 2 // Center the infinity
  const center = adjustedSize / 2
  const width = actualInfinitySize
  const height = width * 0.4

  // Calculate control points for smooth infinity curve
  const curveWidth = width * 0.4
  const curveHeight = height * 0.8

  // Create a cleaner infinity path using simplified curves
  const infinityPath = `
    M ${center - curveWidth} ${center}
    Q ${center - curveWidth / 2} ${center - curveHeight}, ${center} ${center}
    Q ${center + curveWidth / 2} ${center + curveHeight}, ${center + curveWidth} ${center}
    Q ${center + curveWidth / 2} ${center - curveHeight}, ${center} ${center}
    Q ${center - curveWidth / 2} ${center + curveHeight}, ${center - curveWidth} ${center}
  `

  // Calculate position along the infinity path using simplified parametric equations
  const getPosition = () => {
    const t = (progress / 100) * Math.PI * 2
    
    // Simplified infinity curve for smoother animation
    const x = center + curveWidth * Math.cos(t)
    const y = center + curveHeight * Math.sin(t) * Math.cos(t)

    return { x, y }
  }

  const getStepInfo = (step: number) => {
    const steps = [
      { name: t.ui.breatheIn, icon: Heart, color: "text-cyan-500" },
      { name: t.ui.breatheOut, icon: Sparkles, color: "text-blue-500" },
    ]
    return steps[step] || steps[0]
  }

  const handlePresetChange = (preset: PresetKey) => {
    setSelectedPreset(preset)
    const newDurations = breathingPresets[preset]
    setDurations({ 
      in: newDurations.in, 
      out: newDurations.out
    })
    
    if (onUpdateDurations) {
      onUpdateDurations([newDurations.in, newDurations.out])
    }
  }

  const handleDurationChange = (type: keyof typeof durations, value: number) => {
    const newDurations = { ...durations, [type]: value }
    setDurations(newDurations)
    
    if (onUpdateDurations) {
      onUpdateDurations([newDurations.in, newDurations.out])
    }
  }



  const position = getPosition()
  const currentStepInfo = getStepInfo(currentStep)

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
                "text-cyan-600 dark:text-cyan-400",
                isSmallScreen ? "h-3 w-3" : "h-4 w-4"
              )} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-cyan-700 dark:text-cyan-300">Infinity Breathing Settings</SheetTitle>
              <SheetDescription>Customize your infinity breathing pattern</SheetDescription>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              {/* Preset Selection */}
              <div className="space-y-3">
                <Label className="font-medium text-cyan-700 dark:text-cyan-300">Choose Pattern</Label>
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
                        <div className="text-xs opacity-70">{preset.in}-{preset.out}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Durations */}
              <div className="space-y-4">
                <Label className="font-medium text-cyan-700 dark:text-cyan-300">Customize</Label>
                
                <div className="space-y-3">
                  <div>
                    <Label className="flex items-center gap-2 text-sm">
                      <Heart className="h-4 w-4 text-cyan-500" />
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
                      <Sparkles className="h-4 w-4 text-blue-500" />
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
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Infinity Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Subtle gradient background */}
        <div
          className="absolute inset-0 opacity-5 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(6,182,212,0) 70%)",
          }}
        />

        {/* Infinity Outline */}
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${adjustedSize} ${adjustedSize}`}
          className="absolute"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background path */}
          <path d={infinityPath} stroke="rgba(6, 182, 212, 0.3)" strokeWidth="3" fill="none" />

          {/* Gradient path */}
          <path
            d={infinityPath}
            stroke="url(#infinityGradient)"
            strokeOpacity={0.6}
            strokeWidth="6"
            fill="none"
            className="drop-shadow-lg"
          />

          {/* Define gradient for the path */}
          <defs>
            <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="25%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="75%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0ea5e9" />
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

        {/* Moving Dot - Simplified and cleaner */}
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
          transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
        >
          {/* Simple dot with subtle glow */}
          <div className={cn(
            "absolute rounded-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg border-2 border-white",
            isSmallScreen ? "w-4 h-4" : isMobile ? "w-5 h-5" : "w-6 h-6"
          )} />
        </motion.div>
      </div>

      {/* Progress Bars - Responsive positioning and sizing */}
      <div className={cn(
        "absolute left-1/2 transform -translate-x-1/2",
        isSmallScreen ? "-bottom-4" : "-bottom-6"
      )}>
        <div className="flex gap-1 sm:gap-2">
          {[0, 1].map((step) => (
            <motion.div
              key={step}
              className={cn(
                "h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden",
                isSmallScreen ? "w-8" : isMobile ? "w-12" : "w-16"
              )}
              animate={{
                scale: currentStep === step ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
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

