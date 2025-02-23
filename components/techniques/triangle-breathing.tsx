"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TriangleBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
}

export function TriangleBreathing({ size = 200, isPlaying, currentStep, progress, className }: TriangleBreathingProps) {
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
        return "Breathe In"
      case 1:
        return "Hold"
      case 2:
        return "Breathe Out"
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
      {/* Triangle outline */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        <path d={trianglePath} stroke="currentColor" strokeOpacity={0.2} strokeWidth={2} fill="none" />
      </svg>

      {/* Moving dot */}
      <motion.div
        className="absolute w-4 h-4 bg-purple-500 rounded-full -translate-x-2 -translate-y-2"
        animate={position}
        transition={{
          type: "linear",
          duration: 0.1,
        }}
      />

      {/* Step labels */}
      {[0, 1, 2].map((index) => {
        const instruction = getInstruction(index)
        const labelPosition = getLabelPosition(index)

        return (
          <div
            key={index}
            className={cn(
              "absolute transform -translate-y-1/2 transition-opacity whitespace-nowrap",
              currentStep === index ? "opacity-100" : "opacity-30",
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
      {[0, 1, 2].map((index) => {
        const isActive = currentStep === index
        const progressWidth = isActive ? `${progress}%` : "0%"

        return (
          <div
            key={`progress-${index}`}
            className="absolute h-1 bg-purple-200 rounded overflow-hidden"
            style={{
              width: size / 3,
              left: `${index * (size / 3) + size / 6}px`,
              bottom: padding / 2,
              transform: "translateX(-50%)",
            }}
          >
            <div className="h-full bg-purple-500 transition-all duration-100" style={{ width: progressWidth }} />
          </div>
        )
      })}
    </div>
  )
}

