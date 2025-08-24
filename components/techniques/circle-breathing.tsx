"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Settings2, Heart, Zap, Sparkles } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"

interface CircleBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
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

export function CircleBreathing({
  size = 280,
  isPlaying,
  currentStep,
  progress,
  className,
  onUpdateDurations,
}: CircleBreathingProps) {
  const { t } = useLanguage()
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>("4-7-8")
  const [durations, setDurations] = useState({ in: 4, hold: 7, out: 8 })

  const center = size / 2
  const radius = size * 0.35

  const getStepInfo = (step: number) => {
    const steps = [
      { name: t.ui.breatheIn, icon: Heart, color: "text-emerald-500" },
      { name: t.ui.hold, icon: Zap, color: "text-amber-500" },
      { name: t.ui.breatheOut, icon: Sparkles, color: "text-rose-500" },
    ]
    return steps[step] || steps[0]
  }

  const handlePresetChange = (preset: PresetKey) => {
    setSelectedPreset(preset)
    const newDurations = breathingPresets[preset]
    setDurations({ in: newDurations.in, hold: newDurations.hold, out: newDurations.out })
    
    if (onUpdateDurations) {
      onUpdateDurations([newDurations.in, newDurations.hold, newDurations.out])
    }
  }

  const handleDurationChange = (type: keyof typeof durations, value: number) => {
    const newDurations = { ...durations, [type]: value }
    setDurations(newDurations)
    
    if (onUpdateDurations) {
      onUpdateDurations([newDurations.in, newDurations.hold, newDurations.out])
    }
  }

  const currentStepInfo = getStepInfo(currentStep)

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
              <Settings2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Breathing Settings</SheetTitle>
              <SheetDescription>Customize your breathing pattern</SheetDescription>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              {/* Preset Selection */}
              <div className="space-y-3">
                <Label className="font-medium">Choose Pattern</Label>
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
                        <div className="text-xs opacity-70">{preset.in}-{preset.hold}-{preset.out}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Durations */}
              <div className="space-y-4">
                <Label className="font-medium">Customize</Label>
                
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
                      Hold: {durations.hold}s
                    </Label>
                    <Slider
                      value={[durations.hold]}
                      onValueChange={(value) => handleDurationChange("hold", value[0])}
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
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Breathing Circle */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Background Circle */}
        <div className="absolute w-full h-full rounded-full border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900" />
        
        {/* Breathing Progress Circle */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute -rotate-90"
        >
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          
          {/* Progress Circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${(progress / 100) * 2 * Math.PI * radius} ${2 * Math.PI * radius}`}
            className="transition-all duration-100"
          />
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

        {/* Step Indicators */}
        {[0, 1, 2].map((step) => {
          const stepInfo = getStepInfo(step)
          const angle = (step * 120 - 90) * (Math.PI / 180)
          const distance = radius + 25
          const x = center + distance * Math.cos(angle)
          const y = center + distance * Math.sin(angle)
          const isActive = currentStep === step

          return (
            <motion.div
              key={step}
              className="absolute z-20"
              style={{ left: x, top: y }}
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
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 border-white shadow-lg"
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
          {[0, 1, 2].map((step) => (
            <motion.div
              key={step}
              className="h-1.5 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"
              animate={{
                scale: currentStep === step ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-rose-500 rounded-full"
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
