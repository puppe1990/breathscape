"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { translations } from "@/lib/translations/index"

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
  const padding = size * 0.1
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

  // Calculate label positions with proper spacing
  const getLabelPosition = (index: number) => {
    switch (index) {
      case 0: // Top
        return {
          x: points[0].x,
          y: points[0].y - 24,
          align: "center",
        }
      case 1: // Bottom Right
        return {
          x: points[1].x + 24,
          y: points[1].y,
          align: "start",
        }
      case 2: // Bottom Left
        return {
          x: points[2].x - 24,
          y: points[2].y,
          align: "end",
        }
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
            background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(168,85,247,0) 70%)",
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
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#bf7af0" />
            <stop offset="100%" stopColor="#d8b4fe" />
          </linearGradient>
          <filter id="triangleGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background triangle */}
        <path d={trianglePath} stroke="currentColor" strokeOpacity={0.2} strokeWidth={2} fill="none" />

        {/* Active segment highlight */}
        <motion.path
          d={(() => {
            const currentPoint = points[currentStep]
            const nextPoint = points[(currentStep + 1) % 3]
            return `M ${currentPoint.x} ${currentPoint.y} L ${nextPoint.x} ${nextPoint.y}`
          })()}
          stroke="url(#triangleGradient)"
          strokeWidth={4}
          strokeLinecap="round"
          filter="url(#triangleGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress / 100 }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </svg>

      {/* Moving dot with glow effects */}
      <div className="absolute">
        {/* Outer glow */}
        <motion.div
          className="absolute w-16 h-16 rounded-full -translate-x-8 -translate-y-8"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(168,85,247,0) 70%)",
          }}
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />

        {/* Medium glow */}
        <motion.div
          className="absolute w-12 h-12 rounded-full -translate-x-6 -translate-y-6"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0) 70%)",
          }}
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />

        {/* Inner glow */}
        <motion.div
          className="absolute w-8 h-8 bg-purple-500/20 rounded-full -translate-x-4 -translate-y-4 blur-sm"
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />

        {/* Main dot */}
        <motion.div
          className="absolute w-4 h-4 rounded-full -translate-x-2 -translate-y-2"
          style={{
            background: "linear-gradient(45deg, #a855f7, #bf7af0)",
            boxShadow: "0 0 20px rgba(168,85,247,0.5)",
          }}
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />
      </div>

      {/* Step labels */}
      {[0, 1, 2].map((index) => {
        const instruction = getInstruction(index)
        const labelPosition = getLabelPosition(index)

        return (
          <div
            key={index}
            className={cn(
              "absolute transform -translate-y-1/2 transition-all duration-300 px-3 py-1.5 rounded-full",
              currentStep === index
                ? "bg-purple-500/10 text-purple-700 dark:text-purple-300 scale-110"
                : "opacity-40 scale-100",
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
            {instruction}
          </div>
        )
      })}

      {/* Progress indicators */}
      <div className="absolute inset-x-0 -bottom-8 flex justify-center gap-2">
        {[0, 1, 2].map((step) => (
          <div key={step} className="h-1 w-12 rounded-full overflow-hidden bg-purple-100 dark:bg-purple-950">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-100"
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

