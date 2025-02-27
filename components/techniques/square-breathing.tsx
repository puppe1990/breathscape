"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { translations } from "@/lib/translations/index"

interface SquareBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
  language: string
}

export function SquareBreathing({
  size = 200,
  isPlaying,
  currentStep,
  progress,
  className,
  language,
}: SquareBreathingProps) {
  const t = translations[language] || translations["en"]
  const padding = size * 0.1
  const squareSize = size - padding * 2

  // Define the path points for the square
  const topLeft = { x: padding, y: padding }
  const topRight = { x: padding + squareSize, y: padding }
  const bottomRight = { x: padding + squareSize, y: padding + squareSize }
  const bottomLeft = { x: padding, y: padding + squareSize }

  // Calculate current position based on step and progress
  const getPosition = () => {
    const percent = progress / 100

    switch (currentStep) {
      case 0: // Breathe in (left to top)
        return {
          x: padding,
          y: padding + squareSize - squareSize * percent,
        }
      case 1: // Hold (top to right)
        return {
          x: padding + squareSize * percent,
          y: padding,
        }
      case 2: // Breathe out (right to bottom)
        return {
          x: padding + squareSize,
          y: padding + squareSize * percent,
        }
      case 3: // Hold (bottom to left)
        return {
          x: padding + squareSize - squareSize * percent,
          y: padding + squareSize,
        }
      default:
        return bottomLeft
    }
  }

  const position = getPosition()

  // Get breathing instruction based on current step
  const getInstruction = (step: number) => {
    switch (step) {
      case 0:
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

  // Calculate label positions with proper spacing
  const getLabelPosition = (index: number) => {
    switch (index) {
      case 0: // Left
        return {
          x: padding - 40,
          y: padding + squareSize / 2,
          align: "end" as const,
        }
      case 1: // Top
        return {
          x: padding + squareSize / 2,
          y: padding - 24,
          align: "center" as const,
        }
      case 2: // Right
        return {
          x: padding + squareSize + 40,
          y: padding + squareSize / 2,
          align: "start" as const,
        }
      case 3: // Bottom
        return {
          x: padding + squareSize / 2,
          y: padding + squareSize + 24,
          align: "center" as const,
        }
      default:
        return { x: 0, y: 0, align: "center" as const }
    }
  }

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      {/* Background glow effect */}
      <div className={cn("absolute inset-0 transition-opacity duration-500", isPlaying ? "opacity-30" : "opacity-0")}>
        <div
          className="absolute inset-0 rounded-lg blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(59,130,246,0) 70%)",
          }}
        />
      </div>

      {/* Square outline */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        <defs>
          <linearGradient id="squareGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
          <filter id="squareGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background square */}
        <rect
          x={padding}
          y={padding}
          width={squareSize}
          height={squareSize}
          stroke="currentColor"
          strokeOpacity={0.2}
          strokeWidth={2}
          fill="none"
        />

        {/* Active segment highlight */}
        <motion.path
          d={(() => {
            switch (currentStep) {
              case 0:
                return `M ${bottomLeft.x} ${bottomLeft.y} L ${bottomLeft.x} ${topLeft.y}`
              case 1:
                return `M ${topLeft.x} ${topLeft.y} L ${topRight.x} ${topRight.y}`
              case 2:
                return `M ${topRight.x} ${topRight.y} L ${bottomRight.x} ${bottomRight.y}`
              case 3:
                return `M ${bottomRight.x} ${bottomRight.y} L ${bottomLeft.x} ${bottomLeft.y}`
              default:
                return ""
            }
          })()}
          stroke="url(#squareGradient)"
          strokeWidth={4}
          strokeLinecap="round"
          filter="url(#squareGlow)"
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
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0) 70%)",
          }}
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />

        {/* Medium glow */}
        <motion.div
          className="absolute w-12 h-12 rounded-full -translate-x-6 -translate-y-6"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 70%)",
          }}
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />

        {/* Inner glow */}
        <motion.div
          className="absolute w-8 h-8 bg-blue-500/20 rounded-full -translate-x-4 -translate-y-4 blur-sm"
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />

        {/* Main dot */}
        <motion.div
          className="absolute w-4 h-4 rounded-full -translate-x-2 -translate-y-2"
          style={{
            background: "linear-gradient(45deg, #3b82f6, #60a5fa)",
            boxShadow: "0 0 20px rgba(59,130,246,0.5)",
          }}
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />
      </div>

      {/* Step labels */}
      {[0, 1, 2, 3].map((index) => {
        const instruction = getInstruction(index)
        const labelPosition = getLabelPosition(index)

        return (
          <div
            key={index}
            className={cn(
              "absolute transform -translate-y-1/2 transition-all duration-300 px-3 py-1.5 rounded-full",
              currentStep === index
                ? "bg-blue-500/10 text-blue-700 dark:text-blue-300 scale-110"
                : "opacity-40 scale-100",
            )}
            style={{
              left: labelPosition.x,
              top: labelPosition.y,
              textAlign: labelPosition.align,
              transform: `translate(${
                labelPosition.align === "center" ? "-50%" : labelPosition.align === "end" ? "-100%" : "0"
              }, -50%)`,
            }}
          >
            {instruction}
          </div>
        )
      })}

      {/* Progress indicator */}
      <div className="absolute inset-x-0 -bottom-8 flex justify-center gap-2">
        {[0, 1, 2, 3].map((step) => (
          <div key={step} className="h-1 w-12 rounded-full overflow-hidden bg-blue-100 dark:bg-blue-950">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-100"
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

