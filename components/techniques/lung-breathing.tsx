"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { translations } from "@/lib/translations/index"

interface LungBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
  language: string
}

export function LungBreathing({ size = 200, isPlaying, currentStep, progress, className, language }: LungBreathingProps) {
  const t = translations[language] || translations["en"]
  const padding = size * 0.1
  const width = size - padding * 2
  const height = width * 0.8

  // Calculate lung scale based on breathing phase
  const getLungScale = () => {
    const baseScale = 0.8
    const maxScale = 1.2

    if (currentStep === 0) {
      // Breathing in
      return baseScale + (maxScale - baseScale) * (progress / 100)
    } else if (currentStep === 2) {
      // Breathing out
      return maxScale - (maxScale - baseScale) * (progress / 100)
    }
    return currentStep === 1 ? maxScale : baseScale // Hold phase
  }

  // Create paths for left and right lungs
  const createLungPath = (side: "left" | "right") => {
    const centerX = size / 2
    const centerY = size / 2
    const lungWidth = width * 0.25
    const lungHeight = height * 0.4
    const xOffset = side === "left" ? -lungWidth * 1.2 : lungWidth * 0.2

    return `
      M ${centerX + xOffset} ${centerY - lungHeight * 0.5}
      C ${centerX + xOffset - lungWidth * 0.8} ${centerY - lungHeight * 0.3},
        ${centerX + xOffset - lungWidth} ${centerY},
        ${centerX + xOffset - lungWidth * 0.8} ${centerY + lungHeight * 0.5}
      C ${centerX + xOffset - lungWidth * 0.5} ${centerY + lungHeight * 0.8},
        ${centerX + xOffset + lungWidth * 0.5} ${centerY + lungHeight * 0.8},
        ${centerX + xOffset + lungWidth * 0.8} ${centerY + lungHeight * 0.5}
      C ${centerX + xOffset + lungWidth} ${centerY},
        ${centerX + xOffset + lungWidth * 0.8} ${centerY - lungHeight * 0.3},
        ${centerX + xOffset} ${centerY - lungHeight * 0.5}
      Z
    `
  }

  // Create bronchi paths
  const createBronchiPath = (side: "left" | "right") => {
    const centerX = size / 2
    const centerY = size / 2
    const length = height * 0.2
    const width = length * 0.4
    const angle = side === "left" ? 45 : -45
    const radians = (angle * Math.PI) / 180

    const startX = centerX
    const startY = centerY - length * 0.5
    const endX = startX + Math.sin(radians) * length
    const endY = startY + Math.cos(radians) * length
    const controlX = startX + Math.sin(radians) * length * 0.5
    const controlY = startY + Math.cos(radians) * length * 0.5

    return `
      M ${startX} ${startY}
      Q ${controlX} ${controlY}, ${endX} ${endY}
    `
  }

  // Create trachea path
  const createTracheaPath = () => {
    const centerX = size / 2
    const centerY = size / 2
    const length = height * 0.2

    return `
      M ${centerX} ${centerY - length * 1.2}
      L ${centerX} ${centerY - length * 0.5}
    `
  }

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      {/* Background glow effect */}
      <div className={cn("absolute inset-0 transition-opacity duration-500", isPlaying ? "opacity-30" : "opacity-0")}>
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(239,68,68,0) 70%)",
            transform: `scale(${getLungScale()})`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      {/* SVG container for lungs */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute">
        <defs>
          <linearGradient id="lungGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#fca5a5" />
          </linearGradient>
          <filter id="lungGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Respiratory system */}
        <g
          style={{
            transformOrigin: "center",
            transform: `scale(${getLungScale()})`,
          }}
        >
          {/* Left lung */}
          <motion.path
            d={createLungPath("left")}
            fill="url(#lungGradient)"
            fillOpacity={0.2}
            stroke="url(#lungGradient)"
            strokeWidth={2}
            filter="url(#lungGlow)"
            animate={{
              scale: getLungScale(),
            }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 12,
            }}
          />

          {/* Right lung */}
          <motion.path
            d={createLungPath("right")}
            fill="url(#lungGradient)"
            fillOpacity={0.2}
            stroke="url(#lungGradient)"
            strokeWidth={2}
            filter="url(#lungGlow)"
            animate={{
              scale: getLungScale(),
            }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 12,
            }}
          />

          {/* Bronchi */}
          <motion.path
            d={createBronchiPath("left")}
            stroke="url(#lungGradient)"
            strokeWidth={3}
            fill="none"
            filter="url(#lungGlow)"
          />
          <motion.path
            d={createBronchiPath("right")}
            stroke="url(#lungGradient)"
            strokeWidth={3}
            fill="none"
            filter="url(#lungGlow)"
          />

          {/* Trachea */}
          <motion.path
            d={createTracheaPath()}
            stroke="url(#lungGradient)"
            strokeWidth={3}
            fill="none"
            filter="url(#lungGlow)"
          />
        </g>

        {/* Particle effects */}
        {isPlaying && currentStep === 0 && (
          <>
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180
              const radius = width * 0.3
              return (
                <motion.circle
                  key={i}
                  cx={size / 2 + Math.cos(angle) * radius}
                  cy={size / 2 + Math.sin(angle) * radius}
                  r={2}
                  fill="url(#lungGradient)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
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

      {/* Breathing instructions */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-x-0 top-0 flex justify-center">
          <div
            className={cn(
              "px-4 py-2 rounded-full transition-all duration-300",
              currentStep === 0 ? "bg-red-500/10 text-red-700 dark:text-red-300 scale-110" : "opacity-40 scale-100",
            )}
          >
            {t.ui.breatheIn}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <div
            className={cn(
              "px-4 py-2 rounded-full transition-all duration-300",
              currentStep === 2 ? "bg-red-500/10 text-red-700 dark:text-red-300 scale-110" : "opacity-40 scale-100",
            )}
          >
            {t.ui.breatheOut}
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {[0, 1, 2].map((step) => (
          <div key={step} className="h-1 w-12 rounded-full overflow-hidden bg-red-100 dark:bg-red-950">
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

