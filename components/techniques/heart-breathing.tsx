"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { translations } from "@/lib/translations/index"

interface HeartBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
  language: string
}

export function HeartBreathing({ size = 200, isPlaying, currentStep, progress, className, language }: HeartBreathingProps) {
  const t = translations[language] || translations["en"]
  const padding = size * 0.15
  const width = size - padding * 2
  const height = width * 0.9

  // Calculate heart path using cubic Bezier curves
  const heartPath = `
    M ${size / 2} ${padding + height * 0.35}
    C ${padding} ${padding + height * 0.35},
      ${padding} ${size - padding},
      ${size / 2} ${size - padding}
    C ${size - padding} ${size - padding},
      ${size - padding} ${padding + height * 0.35},
      ${size / 2} ${padding + height * 0.35}
    Z
  `

  // Calculate dot position along the heart path
  const getPosition = () => {
    const t = (progress / 100) * Math.PI * 2
    const heartX = (theta: number) => {
      return size / 2 + width * 0.4 * Math.cos(theta)
    }
    const heartY = (theta: number) => {
      return padding + height * 0.35 + height * 0.3 * (1 + Math.sin(theta))
    }

    return {
      x: heartX(t),
      y: heartY(t),
    }
  }

  // Calculate heart scale based on breathing phase
  const getHeartScale = () => {
    const baseScale = 1
    const scaleAmount = 0.1

    if (currentStep === 0) {
      // Breathing in
      return baseScale + scaleAmount * (progress / 100)
    } else if (currentStep === 2) {
      // Breathing out
      return baseScale + scaleAmount - scaleAmount * (progress / 100)
    }
    return baseScale + (currentStep === 1 ? scaleAmount : 0) // Hold phases
  }

  const position = getPosition()

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      {/* Glowing background effect */}
      <div className={cn("absolute inset-0 transition-opacity duration-500", isPlaying ? "opacity-30" : "opacity-0")}>
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(244,114,182,0.4) 0%, rgba(244,114,182,0) 70%)",
            transform: `scale(${getHeartScale()})`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      {/* Heart shape container */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: getHeartScale() }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        {/* Background heart */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className="absolute">
          <path
            d={heartPath}
            fill="currentColor"
            fillOpacity={0.1}
            className="animate-pulse"
            style={{ animationDuration: "2s" }}
          />
          <path d={heartPath} stroke="currentColor" strokeOpacity={0.2} strokeWidth={2} fill="none" />
        </svg>

        {/* Gradient heart */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className="absolute">
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>
          <path d={heartPath} stroke="url(#heartGradient)" strokeWidth={4} strokeOpacity={0.3} fill="none" />
        </svg>
      </motion.div>

      {/* Moving dot with enhanced effects */}
      <div className="absolute">
        {/* Outer glow */}
        <motion.div
          className="absolute w-16 h-16 rounded-full -translate-x-8 -translate-y-8"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(236,72,153,0) 70%)",
          }}
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />

        {/* Medium glow */}
        <motion.div
          className="absolute w-12 h-12 rounded-full -translate-x-6 -translate-y-6"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(236,72,153,0) 70%)",
          }}
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />

        {/* Inner glow */}
        <motion.div
          className="absolute w-8 h-8 bg-pink-500/20 rounded-full -translate-x-4 -translate-y-4 blur-sm"
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />

        {/* Main dot */}
        <motion.div
          className="absolute w-4 h-4 rounded-full -translate-x-2 -translate-y-2"
          style={{
            background: "linear-gradient(45deg, #ec4899, #f472b6)",
            boxShadow: "0 0 20px rgba(236,72,153,0.5)",
          }}
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />
      </div>

      {/* Breathing instructions */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-x-0 top-0 flex justify-center">
          <div
            className={cn(
              "px-4 py-2 rounded-full transition-all duration-300",
              currentStep === 0 ? "bg-pink-500/10 text-pink-700 dark:text-pink-300 scale-110" : "opacity-40 scale-100",
            )}
          >
            {t.ui.breatheIn}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <div
            className={cn(
              "px-4 py-2 rounded-full transition-all duration-300",
              currentStep === 2 ? "bg-pink-500/10 text-pink-700 dark:text-pink-300 scale-110" : "opacity-40 scale-100",
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

