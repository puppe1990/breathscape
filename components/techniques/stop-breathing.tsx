"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StopBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
  language: string
}

const stepColors = [
  "#34d399", // inhale 1
  "#fbbf24", // hold 1
  "#38bdf8", // exhale 1
  "#fbbf24", // hold 2
  "#2dd4bf", // inhale 2
  "#fbbf24", // hold 3
  "#60a5fa", // exhale 2
  "#a78bfa", // hold 4
]

const stepDurations = [4, 4, 4, 4, 4, 4, 4, 4]

export function StopBreathing({
  size = 256,
  isPlaying,
  currentStep,
  progress,
  className,
  language: _language,
}: StopBreathingProps) {
  const [adjustedSize, setAdjustedSize] = useState(size)

  useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth
      if (width < 480) setAdjustedSize(Math.min(size, 192))
      else if (width < 768) setAdjustedSize(Math.min(size, 224))
      else setAdjustedSize(Math.min(size, 256))
    }
    checkSize()
    window.addEventListener("resize", checkSize)
    return () => window.removeEventListener("resize", checkSize)
  }, [size])

  const padding = adjustedSize * 0.12
  const stopSize = adjustedSize - padding * 2
  const center = adjustedSize / 2
  const radius = stopSize / 2

  const points = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i * 45 - 22.5) * (Math.PI / 180)
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  })

  const getPosition = () => {
    const percent = progress / 100
    const currentPoint = points[currentStep]
    const nextPoint = points[(currentStep + 1) % 8]
    return {
      x: currentPoint.x + (nextPoint.x - currentPoint.x) * percent,
      y: currentPoint.y + (nextPoint.y - currentPoint.y) * percent,
    }
  }

  const octagonPath =
    points.map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ") + " Z"

  const getProgressPath = () => {
    const percent = progress / 100
    const currentPoint = points[currentStep]
    const nextPoint = points[(currentStep + 1) % 8]
    const currentX = currentPoint.x + (nextPoint.x - currentPoint.x) * percent
    const currentY = currentPoint.y + (nextPoint.y - currentPoint.y) * percent
    return `M ${currentPoint.x} ${currentPoint.y} L ${currentX} ${currentY}`
  }

  const getCompletedPaths = () =>
    Array.from({ length: currentStep }, (_, i) => {
      const p1 = points[i]
      const p2 = points[(i + 1) % 8]
      return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`
    })

  const position = getPosition()
  const progressPath = getProgressPath()
  const activeColor = stepColors[currentStep] ?? stepColors[0]
  const stepDuration = stepDurations[currentStep] ?? 4

  return (
    <div className={cn("relative h-full w-full", className)}>
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: isPlaying ? 0.35 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="absolute inset-[15%] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${activeColor}55 0%, transparent 70%)`,
          }}
        />
      </motion.div>

      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${adjustedSize} ${adjustedSize}`}
        className="absolute inset-0"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Soft fill */}
        <path d={octagonPath} fill="hsl(var(--primary) / 0.04)" />

        {/* Track */}
        <path
          d={octagonPath}
          fill="none"
          stroke="hsl(var(--primary) / 0.18)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Completed segments */}
        {getCompletedPaths().map((path, i) => (
          <path
            key={i}
            d={path}
            fill="none"
            stroke={stepColors[i]}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity={0.35}
          />
        ))}

        {/* Active progress */}
        <path
          d={progressPath}
          fill="none"
          stroke={activeColor}
          strokeWidth="3"
          strokeLinecap="round"
          opacity={0.9}
        />

        {/* Vertex markers */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={currentStep === i ? 4.5 : 3}
            fill={currentStep === i ? stepColors[i] : "hsl(var(--primary) / 0.22)"}
            opacity={currentStep === i ? 1 : 0.7}
          />
        ))}
      </svg>

      {/* Center pulse orb */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="rounded-full ring-1"
          style={{
            background: `${activeColor}18`,
            borderColor: `${activeColor}33`,
          }}
          animate={{
            width: isPlaying ? [48, 62, 48] : 48,
            height: isPlaying ? [48, 62, 48] : 48,
            opacity: isPlaying ? [0.5, 0.85, 0.5] : 0.45,
          }}
          transition={{
            duration: stepDuration,
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Moving dot */}
      <motion.div
        className="absolute z-10"
        style={{
          left: `${(position.x / adjustedSize) * 100}%`,
          top: `${(position.y / adjustedSize) * 100}%`,
        }}
        animate={{
          left: `${(position.x / adjustedSize) * 100}%`,
          top: `${(position.y / adjustedSize) * 100}%`,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.6 }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 14,
            height: 14,
            background: activeColor,
            boxShadow: `0 0 16px 4px ${activeColor}66`,
          }}
        />
      </motion.div>
    </div>
  )
}
