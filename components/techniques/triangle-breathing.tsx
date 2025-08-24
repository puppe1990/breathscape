"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { translations } from "@/lib/translations/index"
import { Heart, Zap, Sparkles } from "lucide-react"

interface TriangleBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
  language: string
}

export function TriangleBreathing({
  size = 200,
  isPlaying,
  currentStep,
  progress,
  className,
  language,
}: TriangleBreathingProps) {
  const t = translations[language] || translations["en"]

  // Calculate triangle points for an equilateral triangle
  const padding = size * 0.08
  const triangleSize = size - padding * 2
  const height = triangleSize * Math.sin(Math.PI / 3) // Height of equilateral triangle
  const halfWidth = triangleSize / 2

  // Calculate the three points of the triangle
  const points = [
    { x: size / 2, y: padding }, // Top point
    { x: size / 2 + halfWidth, y: padding + height }, // Bottom right
    { x: size / 2 - halfWidth, y: padding + height }, // Bottom left
  ]

  // Get the current position based on step and progress
  const getPosition = () => {
    const percent = progress / 100
    const currentPoint = points[currentStep]
    const nextPoint = points[(currentStep + 1) % 3]

    return {
      x: currentPoint.x + (nextPoint.x - currentPoint.x) * percent,
      y: currentPoint.y + (nextPoint.y - currentPoint.y) * percent,
    }
  }

  // Create the triangle path
  const trianglePath = points.map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ") + " Z"

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

  // Get step info with icons and colors
  const getStepInfo = (step: number) => {
    const steps = [
      { name: t.ui.breatheIn, icon: Heart, color: "text-emerald-500" },
      { name: t.ui.hold, icon: Zap, color: "text-amber-500" },
      { name: t.ui.breatheOut, icon: Sparkles, color: "text-rose-500" },
    ]
    return steps[step] || steps[0]
  }

  // Calculate label positions with proper spacing
  const getLabelPosition = (index: number) => {
    switch (index) {
      case 0: // Top
        return {
          x: points[0].x,
          y: points[0].y - 28,
          align: "center",
        }
      case 1: // Bottom Right
        return {
          x: points[1].x + 28,
          y: points[1].y,
          align: "start",
        }
      case 2: // Bottom Left
        return {
          x: points[2].x - 28,
          y: points[2].y,
          align: "end",
        }
    }
  }

  const position = getPosition()
  const currentStepInfo = getStepInfo(currentStep)

  // Create progress path for current segment
  const getProgressPath = () => {
    const percent = progress / 100
    const currentPoint = points[currentStep]
    const nextPoint = points[(currentStep + 1) % 3]
    
    const currentX = currentPoint.x + (nextPoint.x - currentPoint.x) * percent
    const currentY = currentPoint.y + (nextPoint.y - currentPoint.y) * percent
    
    return `M ${currentPoint.x} ${currentPoint.y} L ${currentX} ${currentY}`
  }

  return (
    <div className={cn("relative w-full h-full flex items-center justify-center overflow-hidden", className)} style={{ width: size, height: size }}>
      {/* Background glow effect */}
      <div className={cn("absolute inset-0 transition-opacity duration-500", isPlaying ? "opacity-30" : "opacity-0")}>
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(16,185,129,0.4) 0%, rgba(16,185,129,0) 70%)",
          }}
        />
      </div>

      {/* Triangle outline */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        <defs>
          <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="25%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#6ee7b7" />
            <stop offset="75%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* Background triangle */}
        <path d={trianglePath} stroke="rgba(16, 185, 129, 0.6)" strokeWidth={3} fill="none" />

        {/* Progress Path */}
        <path
          d={getProgressPath()}
          fill="none"
          stroke="url(#triangleGradient)"
          strokeWidth={6}
          strokeLinecap="round"
          className="drop-shadow-lg"
        />
      </svg>

      {/* Central Indicator */}
      <div className="relative z-10">
        <motion.div
          className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center"
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
              className="mx-auto mb-1 w-5 h-5"
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
                className: cn(currentStepInfo.color, "w-5 h-5"),
              })}
            </motion.div>
            <span className="font-medium text-xs text-gray-600 dark:text-gray-400">
              {currentStepInfo.name}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Moving dot with enhanced glow effects */}
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
        <div className="absolute w-16 h-16 rounded-full -translate-x-8 -translate-y-8 bg-emerald-400/20 blur-sm" />
        
        {/* Main dot */}
        <div className="absolute w-4 h-4 rounded-full -translate-x-2 -translate-y-2 bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg border-2 border-white" />
        
        {/* Inner highlight */}
        <div className="absolute w-2 h-2 rounded-full -translate-x-1 -translate-y-1 bg-white/80" />
      </motion.div>

      {/* Step labels */}
      {[0, 1, 2].map((index) => {
        const instruction = getInstruction(index)
        const labelPosition = getLabelPosition(index)

        return (
          <div
            key={index}
            className={cn(
              "absolute transform -translate-y-1/2 transition-all duration-400 px-3 py-1.5 rounded-full",
              currentStep === index
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 scale-110 shadow-sm"
                : "opacity-50 scale-95",
            )}
            style={{
              left: labelPosition?.x,
              top: labelPosition?.y,
              textAlign: labelPosition?.align as any,
              transform: `translate(${
                labelPosition?.align === "center" ? "-50%" : labelPosition?.align === "end" ? "-100%" : "0"
              }, -50%)`,
            }}
          >
            <motion.span animate={{ opacity: currentStep === index ? 1 : 0.7 }} transition={{ duration: 0.25 }}>
              {instruction}
            </motion.span>
          </div>
        )
      })}

      {/* Progress indicators */}
      <div className="absolute inset-x-0 -bottom-6 flex justify-center gap-2">
        {[0, 1, 2].map((step) => (
          <motion.div
            key={step}
            className="h-1.5 w-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700"
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
  )
}

