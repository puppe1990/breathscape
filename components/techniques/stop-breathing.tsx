"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StopBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
}

export function StopBreathing({ size = 200, isPlaying, currentStep, progress, className }: StopBreathingProps) {
  const padding = size * 0.1
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
  const octagonPath = points.map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ") + " Z"

  // Get breathing instruction based on current step
  const getInstruction = (step: number) => {
    switch (step) {
      case 0:
      case 4:
        return "Breathe In"
      case 1:
      case 3:
      case 5:
      case 7:
        return "Hold"
      case 2:
      case 6:
        return "Breathe Out"
      default:
        return ""
    }
  }

  // Calculate label positions with proper spacing
  const getLabelPosition = (index: number) => {
    const angle = (index * 45 - 22.5) * (Math.PI / 180)
    const labelRadius = radius + 40
    return {
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
      rotate: angle * (180 / Math.PI) + 90,
    }
  }

  const position = getPosition()

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      {/* Background glow effect */}
      <div className={cn("absolute inset-0 transition-opacity duration-500", isPlaying ? "opacity-30" : "opacity-0")}>
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
            <stop offset="50%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#fca5a5" />
          </linearGradient>
          <filter id="stopGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background octagon */}
        <path
          d={octagonPath}
          fill="url(#stopGradient)"
          fillOpacity={0.1}
          stroke="currentColor"
          strokeOpacity={0.2}
          strokeWidth={2}
          filter="url(#stopGlow)"
        />

        {/* Active segment highlight */}
        <motion.path
          d={`
            M ${points[currentStep].x} ${points[currentStep].y}
            L ${points[(currentStep + 1) % 8].x} ${points[(currentStep + 1) % 8].y}
          `}
          stroke="url(#stopGradient)"
          strokeWidth={4}
          strokeLinecap="round"
          filter="url(#stopGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress / 100 }}
          transition={{ duration: 0.1, ease: "linear" }}
        />

        {/* Moving dot with glow effects */}
        <g filter="url(#stopGlow)">
          {/* Outer glow */}
          <motion.circle
            cx={position.x}
            cy={position.y}
            r={12}
            fill="url(#stopGradient)"
            fillOpacity={0.2}
            animate={position}
            transition={{ type: "linear", duration: 0.1 }}
          />
          {/* Inner glow */}
          <motion.circle
            cx={position.x}
            cy={position.y}
            r={8}
            fill="url(#stopGradient)"
            fillOpacity={0.3}
            animate={position}
            transition={{ type: "linear", duration: 0.1 }}
          />
          {/* Main dot */}
          <motion.circle
            cx={position.x}
            cy={position.y}
            r={4}
            fill="url(#stopGradient)"
            animate={position}
            transition={{ type: "linear", duration: 0.1 }}
          />
        </g>

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
      </svg>

      {/* Step labels */}
      {points.map((_, index) => {
        const instruction = getInstruction(index)
        const labelPosition = getLabelPosition(index)

        return (
          <div
            key={index}
            className={cn(
              "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 px-2 py-1 rounded-full",
              currentStep === index ? "bg-red-500/10 text-red-700 dark:text-red-300 scale-110" : "opacity-40 scale-100",
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

      {/* Progress indicator */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1">
        {Array.from({ length: 8 }).map((_, step) => (
          <div key={step} className="h-1 w-6 rounded-full overflow-hidden bg-red-100 dark:bg-red-950">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-100"
              style={{
                width: currentStep === step ? `${progress}%` : "0%",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

