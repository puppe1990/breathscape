"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { translations } from "@/lib/translations/index"

interface HexagonBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
  language: string
}

export function HexagonBreathing({
  size = 200,
  isPlaying,
  currentStep,
  progress,
  className,
  language,
}: HexagonBreathingProps) {
  const t = translations[language] || translations["en"]

  // Calculate hexagon points
  const padding = size * 0.1
  const hexagonSize = size - padding * 2
  const center = size / 2
  const radius = hexagonSize / 2

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

  // Get breathing instruction based on current step
  const getInstruction = (step: number) => {
    switch (step) {
      case 0:
      case 4:
        return t.ui.breatheIn
      case 1:
      case 3:
      case 5:
        return t.ui.hold
      case 2:
        return t.ui.breatheOut
      default:
        return ""
    }
  }

  // Calculate label positions with proper spacing
  const getLabelPosition = (index: number) => {
    const angle = (index * 60 - 30) * (Math.PI / 180)
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
            background: "radial-gradient(circle, rgba(16,185,129,0.4) 0%, rgba(16,185,129,0) 70%)",
          }}
        />
      </div>

      {/* Hexagon outline */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        <defs>
          <linearGradient id="hexagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#6ee7b7" />
          </linearGradient>
          <filter id="hexagonGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background hexagon */}
        <path d={hexagonPath} stroke="currentColor" strokeOpacity={0.2} strokeWidth={2} fill="none" />

        {/* Active segment highlight */}
        <motion.path
          d={(() => {
            const currentPoint = points[currentStep]
            const nextPoint = points[(currentStep + 1) % 6]
            return `M ${currentPoint.x} ${currentPoint.y} L ${nextPoint.x} ${nextPoint.y}`
          })()}
          stroke="url(#hexagonGradient)"
          strokeWidth={4}
          strokeLinecap="round"
          filter="url(#hexagonGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress / 100 }}
          transition={{ type: "tween", duration: 0.1, ease: "linear" }}
        />
      </svg>

      {/* Moving dot with glow effects */}
      <div className="absolute">
        {/* Outer glow */}
        <motion.div
          className="absolute w-16 h-16 rounded-full -translate-x-8 -translate-y-8"
          style={{
            background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0) 70%)",
          }}
          animate={position}
          transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.6 }}
        />

        {/* Medium glow */}
        <motion.div
          className="absolute w-12 h-12 rounded-full -translate-x-6 -translate-y-6"
          style={{
            background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0) 70%)",
          }}
          animate={position}
          transition={{ type: "spring", stiffness: 140, damping: 22, mass: 0.6 }}
        />

        {/* Inner glow */}
        <motion.div
          className="absolute w-8 h-8 bg-emerald-500/20 rounded-full -translate-x-4 -translate-y-4 blur-sm"
          animate={position}
          transition={{ type: "spring", stiffness: 160, damping: 24, mass: 0.55 }}
        />

        {/* Main dot */}
        <motion.div
          className="absolute w-4 h-4 rounded-full -translate-x-2 -translate-y-2"
          style={{
            background: "linear-gradient(45deg, #10b981, #34d399)",
            boxShadow: "0 0 20px rgba(16,185,129,0.5)",
          }}
          animate={position}
          transition={{ type: "spring", stiffness: 200, damping: 26, mass: 0.5 }}
        />
      </div>

      {/* Step labels */}
      {points.map((_, index) => {
        const instruction = getInstruction(index)
        const labelPosition = getLabelPosition(index)

        return (
          <div
            key={index}
            className={cn(
              "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-400 px-3 py-1.5 rounded-full",
              currentStep === index
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 scale-110 shadow-sm"
                : "opacity-50 scale-95",
            )}
            style={{
              left: labelPosition.x,
              top: labelPosition.y,
              transform: `translate(-50%, -50%) rotate(${labelPosition.rotate}deg)`,
            }}
          >
            <motion.span
              style={{ display: "block" }}
              animate={{ transform: `rotate(${-labelPosition.rotate}deg)`, opacity: currentStep === index ? 1 : 0.7 }}
              transition={{ duration: 0.25 }}
            >
              {instruction}
            </motion.span>
          </div>
        )
      })}

      {/* Progress indicators */}
      <div className="absolute inset-x-0 -bottom-8 flex justify-center gap-1">
        {Array.from({ length: 6 }).map((_, step) => (
          <div key={step} className="h-1 w-8 rounded-full overflow-hidden bg-emerald-100 dark:bg-emerald-950">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-100"
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

