"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HexagonBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
}

export function HexagonBreathing({ size = 200, isPlaying, currentStep, progress, className }: HexagonBreathingProps) {
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
        return "Breathe In"
      case 1:
      case 3:
      case 5:
        return "Hold"
      case 2:
        return "Breathe Out"
      default:
        return ""
    }
  }

  const position = getPosition()

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      {/* Hexagon outline */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        <path d={hexagonPath} stroke="currentColor" strokeOpacity={0.2} strokeWidth={2} fill="none" />
      </svg>

      {/* Moving dot */}
      <motion.div
        className="absolute w-4 h-4 bg-emerald-500 rounded-full -translate-x-2 -translate-y-2"
        animate={position}
        transition={{
          type: "linear",
          duration: 0.1,
        }}
      />

      {/* Step labels */}
      {points.map((point, index) => {
        const instruction = getInstruction(index)
        const angle = (index * 60 - 30) * (Math.PI / 180)
        const labelRadius = radius + 40
        const labelPosition = {
          x: center + labelRadius * Math.cos(angle),
          y: center + labelRadius * Math.sin(angle),
        }

        return (
          <div
            key={index}
            className={cn(
              "absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity whitespace-nowrap",
              currentStep === index ? "opacity-100" : "opacity-30",
            )}
            style={{
              left: labelPosition.x,
              top: labelPosition.y,
            }}
          >
            {instruction}
          </div>
        )
      })}
    </div>
  )
}

