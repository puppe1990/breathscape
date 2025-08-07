"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { translations } from "@/lib/translations/index"

interface FlowerBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
  language: string
}

export function FlowerBreathing({ size = 200, isPlaying, currentStep, progress, className, language }: FlowerBreathingProps) {
  const t = translations[language] || translations["en"]
  const padding = size * 0.15
  const centerSize = size * 0.2
  const petalLength = (size - padding * 2 - centerSize) / 2

  // Create petal paths
  const createPetal = (angle: number) => {
    const rad = (angle - 90) * (Math.PI / 180)
    const centerX = size / 2
    const centerY = size / 2
    const startX = centerX + Math.cos(rad) * (centerSize / 2)
    const startY = centerY + Math.sin(rad) * (centerSize / 2)
    const endX = centerX + Math.cos(rad) * (petalLength + centerSize / 2)
    const endY = centerY + Math.sin(rad) * (petalLength + centerSize / 2)
    const controlX1 = centerX + Math.cos(rad - 0.5) * petalLength
    const controlY1 = centerY + Math.sin(rad - 0.5) * petalLength
    const controlX2 = centerX + Math.cos(rad + 0.5) * petalLength
    const controlY2 = centerY + Math.sin(rad + 0.5) * petalLength

    return `
      M ${startX} ${startY}
      C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}
      C ${controlX2} ${controlY2}, ${controlX1} ${controlY1}, ${startX} ${startY}
    `
  }

  // Calculate petal scale based on breathing phase
  const getPetalScale = () => {
    const baseScale = 0.7
    const maxScale = 1

    if (currentStep === 0) {
      // Breathing in
      return baseScale + (maxScale - baseScale) * (progress / 100)
    } else if (currentStep === 2) {
      // Breathing out
      return maxScale - (maxScale - baseScale) * (progress / 100)
    }
    return currentStep === 1 ? maxScale : baseScale // Hold phases
  }

  // Calculate petal rotation based on breathing phase
  const getPetalRotation = () => {
    const baseRotation = 0
    const maxRotation = 15

    if (currentStep === 0) {
      // Breathing in
      return baseRotation + maxRotation * (progress / 100)
    } else if (currentStep === 2) {
      // Breathing out
      return maxRotation - maxRotation * (progress / 100)
    }
    return currentStep === 1 ? maxRotation : baseRotation // Hold phases
  }

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      {/* Background glow effect */}
      <div className={cn("absolute inset-0 transition-opacity duration-500", isPlaying ? "opacity-30" : "opacity-0")}>
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(244,114,182,0.4) 0%, rgba(244,114,182,0) 70%)",
            transform: `scale(${getPetalScale()})`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      {/* Flower container */}
      <div className="absolute inset-0">
        {/* Petals */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className="absolute">
          <defs>
            <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>

          {/* Generate 8 petals */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = i * 45
            return (
              <motion.path
                key={i}
                d={createPetal(angle)}
                fill="url(#petalGradient)"
                fillOpacity={0.2}
                stroke="url(#petalGradient)"
                strokeWidth={2}
                animate={{
                  scale: getPetalScale(),
                  rotate: getPetalRotation(),
                }}
                style={{
                  originX: size / 2,
                  originY: size / 2,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
              />
            )
          })}

          {/* Flower center */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={centerSize / 2}
            fill="url(#petalGradient)"
            animate={{
              scale: getPetalScale(),
            }}
            style={{
              originX: size / 2,
              originY: size / 2,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
          />
        </svg>

        {/* Animated particles */}
        {isPlaying && currentStep === 0 && (
          <div className="absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180
              const delay = i * 0.1
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-pink-400/30"
                  initial={{
                    x: size / 2,
                    y: size / 2,
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: size / 2 + Math.cos(angle) * (size / 3),
                    y: size / 2 + Math.sin(angle) * (size / 3),
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 2, delay, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
                />
              )
            })}
          </div>
        )}
      </div>

      {/* Breathing instructions */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-x-0 top-0 flex justify-center">
          <div
            className={cn(
              "px-4 py-2 rounded-full transition-all duration-400",
              currentStep === 0 ? "bg-pink-500/10 text-pink-700 dark:text-pink-300 scale-110 shadow-sm" : "opacity-50 scale-95",
            )}
          >
            {t.ui.breatheIn}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <div
            className={cn(
              "px-4 py-2 rounded-full transition-all duration-400",
              currentStep === 2 ? "bg-pink-500/10 text-pink-700 dark:text-pink-300 scale-110 shadow-sm" : "opacity-50 scale-95",
            )}
          >
            {t.ui.breatheOut}
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {[0, 1, 2].map((step) => (
          <div key={step} className="h-1 w-12 rounded-full overflow-hidden bg-pink-100 dark:bg-pink-950">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-pink-400 transition-all duration-100"
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

