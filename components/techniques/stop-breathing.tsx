"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { translations } from "@/lib/translations/index"
import { Heart, Zap, Sparkles } from "lucide-react"

interface StopBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
  language: string
}

export function StopBreathing({
  size = 200,
  isPlaying,
  currentStep,
  progress,
  className,
  language,
}: StopBreathingProps) {
  const t = translations[language] || translations["en"]
  const padding = size * 0.08
  const stopSize = size - padding * 2
  const center = size / 2
  const radius = stopSize / 2

  // Calculate the eight points of the octagon
  const points = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i * 45 - 22.5) * (Math.PI / 180)
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  })

  // Get the current position based on step and progress
  const getPosition = () => {
    const percent = progress / 100
    const currentPoint = points[currentStep]
    const nextPoint = points[(currentStep + 1) % 8]

    return {
      x: currentPoint.x + (nextPoint.x - currentPoint.x) * percent,
      y: currentPoint.y + (nextPoint.y - currentPoint.y) * percent,
    }
  }

  // Create the octagon path
  const octagonPath =
    points.map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ") + " Z"

  // Get breathing instruction based on current step
  const getInstruction = (step: number) => {
    switch (step) {
      case 0:
      case 4:
        return t.ui.breatheIn
      case 1:
      case 3:
      case 5:
      case 7:
        return t.ui.hold
      case 2:
      case 6:
        return t.ui.breatheOut
      default:
        return ""
    }
  }

  // Get step info with icons and colors
  const getStepInfo = (step: number) => {
    if (step === 0 || step === 4) {
      return { name: t.ui.breatheIn, icon: Heart, color: "text-emerald-500" }
    } else if (step === 2 || step === 6) {
      return { name: t.ui.breatheOut, icon: Sparkles, color: "text-rose-500" }
    } else {
      return { name: t.ui.hold, icon: Zap, color: "text-amber-500" }
    }
  }

  // Calculate label positions with proper spacing
  const getLabelPosition = (index: number) => {
    const angle = (index * 45 - 22.5) * (Math.PI / 180)
    const labelRadius = radius + 45
    return {
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
      rotate: angle * (180 / Math.PI) + 90,
    }
  }

  const position = getPosition()
  const currentStepInfo = getStepInfo(currentStep)

  // Create progress path for current segment
  const getProgressPath = () => {
    const percent = progress / 100
    const currentPoint = points[currentStep]
    const nextPoint = points[(currentStep + 1) % 8]

    const currentX = currentPoint.x + (nextPoint.x - currentPoint.x) * percent
    const currentY = currentPoint.y + (nextPoint.y - currentPoint.y) * percent

    return `M ${currentPoint.x} ${currentPoint.y} L ${currentX} ${currentY}`
  }

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className
      )}
      style={{ width: size, height: size }}
    >
      {/* Background glow effect */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isPlaying ? "opacity-30" : "opacity-0"
        )}
      >
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(239,68,68,0) 70%)",
          }}
        />
      </div>

      {/* SVG container for stop sign */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute">
        <defs>
          <linearGradient id="stopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="25%" stopColor="#f87171" />
            <stop offset="50%" stopColor="#fca5a5" />
            <stop offset="75%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        {/* Background octagon */}
        <path
          d={octagonPath}
          fill="url(#stopGradient)"
          fillOpacity={0.1}
          stroke="rgba(239, 68, 68, 0.6)"
          strokeWidth={3}
        />

        {/* Progress Path */}
        <path
          d={getProgressPath()}
          fill="none"
          stroke="url(#stopGradient)"
          strokeWidth={6}
          strokeLinecap="round"
          className="drop-shadow-lg"
        />
      </svg>

      {/* Central Indicator */}
      <div className="relative z-10">
        <motion.div
          className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800"
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
              className="mx-auto mb-1 h-5 w-5"
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
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
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
        <div className="absolute h-16 w-16 -translate-x-8 -translate-y-8 rounded-full bg-red-400/20 blur-sm" />

        {/* Main dot */}
        <div className="absolute h-4 w-4 -translate-x-2 -translate-y-2 rounded-full border-2 border-white bg-gradient-to-r from-red-500 to-red-400 shadow-lg" />

        {/* Inner highlight */}
        <div className="absolute h-2 w-2 -translate-x-1 -translate-y-1 rounded-full bg-white/80" />
      </motion.div>

      {/* Particle effects */}
      {isPlaying && (currentStep === 0 || currentStep === 4) && (
        <>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180
            return (
              <motion.circle
                key={i}
                cx={position.x}
                cy={position.y}
                r={2}
                fill="url(#stopGradient)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.5, 0],
                  x: [0, Math.cos(angle) * 30],
                  y: [0, Math.sin(angle) * 30],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeOut",
                }}
              />
            )
          })}
        </>
      )}

      {/* Step labels */}
      {points.map((_, index) => {
        const instruction = getInstruction(index)
        const labelPosition = getLabelPosition(index)

        return (
          <div
            key={index}
            className={cn(
              "duration-400 absolute -translate-x-1/2 -translate-y-1/2 transform rounded-full px-2 py-1 transition-all",
              currentStep === index
                ? "scale-110 bg-red-500/10 text-red-700 shadow-sm dark:text-red-300"
                : "scale-95 opacity-50"
            )}
            style={{
              left: labelPosition.x,
              top: labelPosition.y,
              transform: `translate(-50%, -50%) rotate(${labelPosition.rotate}deg)`,
            }}
          >
            <motion.span
              style={{ display: "block" }}
              animate={{
                transform: `rotate(${-labelPosition.rotate}deg)`,
                opacity: currentStep === index ? 1 : 0.7,
              }}
              transition={{ duration: 0.25 }}
            >
              {instruction}
            </motion.span>
          </div>
        )
      })}

      {/* Progress indicators */}
      <div className="absolute inset-x-0 -bottom-6 flex justify-center gap-1">
        {Array.from({ length: 8 }).map((_, step) => (
          <motion.div
            key={step}
            className="h-1.5 w-6 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
            animate={{
              scale: currentStep === step ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-400"
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
