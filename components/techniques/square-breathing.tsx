"use client"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SquareBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
}

export function SquareBreathing({ size = 200, isPlaying, currentStep, progress, className }: SquareBreathingProps) {
  // Calculate positions for the moving dot
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
      case 0: // Breathe in (bottom left to top left)
        return {
          x: bottomLeft.x,
          y: bottomLeft.y - squareSize * percent,
        }
      case 1: // Hold (top left to top right)
        return {
          x: topLeft.x + squareSize * percent,
          y: topLeft.y,
        }
      case 2: // Breathe out (top right to bottom right)
        return {
          x: topRight.x,
          y: topRight.y + squareSize * percent,
        }
      case 3: // Hold (bottom right to bottom left)
        return {
          x: bottomRight.x - squareSize * percent,
          y: bottomRight.y,
        }
      default:
        return bottomLeft
    }
  }

  const position = getPosition()

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      {/* Square outline */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
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
      </svg>

      {/* Moving dot */}
      <motion.div
        className="absolute w-4 h-4 bg-blue-500 rounded-full -translate-x-2 -translate-y-2"
        animate={position}
        transition={{
          type: "linear",
          duration: 0.1,
        }}
      />

      {/* Step labels */}
      <div className="absolute inset-0">
        {/* Left label */}
        <div
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 transition-opacity",
            currentStep === 3 ? "opacity-100" : "opacity-30",
          )}
        >
          Hold
        </div>

        {/* Top label */}
        <div
          className={cn(
            "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 transition-opacity",
            currentStep === 0 ? "opacity-100" : "opacity-30",
          )}
        >
          Breathe In
        </div>

        {/* Right label */}
        <div
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 transition-opacity",
            currentStep === 1 ? "opacity-100" : "opacity-30",
          )}
        >
          Hold
        </div>

        {/* Bottom label */}
        <div
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 transition-opacity",
            currentStep === 2 ? "opacity-100" : "opacity-30",
          )}
        >
          Breathe Out
        </div>
      </div>
    </div>
  )
}

