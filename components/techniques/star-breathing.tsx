"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { translations } from "@/lib/translations/index"

interface StarBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
  language: string
}

export function StarBreathing({ size = 200, isPlaying, currentStep, progress, className, language }: StarBreathingProps) {
  const t = translations[language] || translations["en"]
  // Calculate star points
  const padding = size * 0.1
  const starSize = size - padding * 2
  const center = size / 2
  const outerRadius = starSize / 2
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

  // Get breathing instruction based on current step
  const getInstruction = (step: number) => {
    switch (step) {
      case 0:
      case 4:
        return t.ui.breatheIn
      case 1:
      case 3:
        return t.ui.hold
      case 2:
        return t.ui.breatheOut
      default:
        return ""
    }
  }

  const getLabelPosition = (index: number) => {
    const angle = (index * 72 - 90) * (Math.PI / 180)
    const labelRadius = outerRadius + 45
    return {
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
      rotate: angle * (180 / Math.PI) + 90,
    }
  }

  const position = getPosition()

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      {/* Background star */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute opacity-5">
        <path d={starPath} fill="currentColor" className="animate-pulse" style={{ animationDuration: "4s" }} />
      </svg>

      {/* Star outline */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        <path
          d={starPath}
          stroke="currentColor"
          strokeOpacity={0.2}
          strokeWidth={2}
          fill="none"
          strokeLinejoin="round"
        />
      </svg>

      {/* Moving dot and glow effect */}
      <div className="absolute">
        {/* Outer glow */}
        <motion.div
          className="absolute w-12 h-12 bg-amber-500/20 rounded-full -translate-x-6 -translate-y-6 blur-md"
          animate={position}
          transition={{
            type: "linear",
            duration: 0.1,
          }}
        />
        {/* Inner glow */}
        <motion.div
          className="absolute w-8 h-8 bg-amber-500/30 rounded-full -translate-x-4 -translate-y-4 blur-sm"
          animate={position}
          transition={{
            type: "linear",
            duration: 0.1,
          }}
        />
        {/* Main dot */}
        <motion.div
          className="absolute w-4 h-4 bg-amber-500 rounded-full -translate-x-2 -translate-y-2 shadow-lg shadow-amber-500/50"
          animate={position}
          transition={{
            type: "linear",
            duration: 0.1,
          }}
        />
      </div>

      {/* Active segment highlight */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute pointer-events-none">
        <path
          d={starPath}
          stroke="currentColor"
          strokeOpacity={0.3}
          strokeWidth={4}
          fill="none"
          strokeDasharray="4 2"
          className="animate-dash"
          style={{ animationDuration: "30s" }}
        />
      </svg>

      {/* Step labels */}
      {[0, 1, 2, 3, 4].map((index) => {
        const instruction = getInstruction(index)
        const labelPosition = getLabelPosition(index)

        return (
          <div
            key={index}
            className={cn(
              "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 px-2 py-1 rounded-full",
              currentStep === index ? "opacity-100 bg-amber-500/10 text-amber-700 dark:text-amber-300" : "opacity-40",
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

      {/* Progress arc */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute rotate-[-90deg]">
        <circle
          cx={center}
          cy={center}
          r={outerRadius + 20}
          stroke="currentColor"
          strokeOpacity={0.1}
          strokeWidth={3}
          fill="none"
        />
        <motion.circle
          cx={center}
          cy={center}
          r={outerRadius + 20}
          stroke="currentColor"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * (outerRadius + 20)}`}
          strokeDashoffset={2 * Math.PI * (outerRadius + 20) * (1 - progress / 100)}
          className="drop-shadow-[0_0_2px_rgba(217,119,6,0.5)]"
        />
      </svg>
    </div>
  )
}

