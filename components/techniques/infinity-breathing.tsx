"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { translations } from "@/lib/translations/index"

interface InfinityBreathingProps {
  size?: number
  isPlaying: boolean
  currentStep: number
  progress: number
  className?: string
  language: string
}

export function InfinityBreathing({ size = 200, isPlaying, currentStep, progress, className, language }: InfinityBreathingProps) {
  const t = translations[language] || translations["en"]
  const padding = size * 0.15
  const width = size - padding * 2
  const height = width * 0.4

  // Calculate control points for smooth infinity curve
  const center = size / 2
  const curveWidth = width * 0.4
  const curveHeight = height * 0.8

  // Create a smooth infinity path using cubic bezier curves
  const infinityPath = `
    M ${center - curveWidth} ${center}
    C ${center - curveWidth} ${center - curveHeight},
      ${center - curveWidth / 2} ${center - curveHeight},
      ${center} ${center}
    C ${center + curveWidth / 2} ${center + curveHeight},
      ${center + curveWidth} ${center + curveHeight},
      ${center + curveWidth} ${center}
    C ${center + curveWidth} ${center - curveHeight},
      ${center + curveWidth / 2} ${center - curveHeight},
      ${center} ${center}
    C ${center - curveWidth / 2} ${center + curveHeight},
      ${center - curveWidth} ${center + curveHeight},
      ${center - curveWidth} ${center}
  `

  // Calculate position along the infinity path using parametric equations
  const getPosition = () => {
    const t = (progress / 100) * Math.PI * 2
    const a = curveWidth // Scale factor
    const b = curveHeight / 2 // Height factor

    // Use lemniscate formula with adjustments for smoother motion
    const denominator = 1 + Math.sin(t) * Math.sin(t)
    const x = center + (a * Math.cos(t)) / denominator
    const y = center + (b * Math.sin(t) * Math.cos(t)) / denominator

    return { x, y }
  }

  // Calculate gradient rotation based on current position
  const getGradientRotation = () => {
    return (currentStep * 180 + (progress / 100) * 180) % 360
  }

  const position = getPosition()

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-10 rounded-full blur-2xl transition-opacity duration-500"
        style={{
          background: `linear-gradient(${getGradientRotation()}deg, #0ea5e9, #22d3ee, #06b6d4)`,
          transform: `rotate(${getGradientRotation()}deg)`,
        }}
      />

      {/* Main infinity path */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className="absolute">
        {/* Background path */}
        <path d={infinityPath} stroke="currentColor" strokeOpacity={0.15} strokeWidth={3} fill="none" />

        {/* Gradient path */}
        <path
          d={infinityPath}
          stroke="url(#gradient)"
          strokeOpacity={0.3}
          strokeWidth={6}
          fill="none"
          className="animate-pulse"
          style={{ animationDuration: "3s" }}
        />

        {/* Define gradient for the path */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Moving dot with enhanced effects */}
      <div className="absolute">
        {/* Large outer glow */}
        <motion.div
          className="absolute w-16 h-16 rounded-full -translate-x-8 -translate-y-8"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0) 70%)",
          }}
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />

        {/* Medium glow */}
        <motion.div
          className="absolute w-12 h-12 rounded-full -translate-x-6 -translate-y-6"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.2) 0%, rgba(6,182,212,0) 70%)",
          }}
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />

        {/* Inner glow */}
        <motion.div
          className="absolute w-8 h-8 bg-cyan-500/20 rounded-full -translate-x-4 -translate-y-4 blur-sm"
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />

        {/* Main dot */}
        <motion.div
          className="absolute w-4 h-4 rounded-full -translate-x-2 -translate-y-2"
          style={{
            background: "linear-gradient(45deg, #0ea5e9, #22d3ee)",
            boxShadow: "0 0 20px rgba(6,182,212,0.5)",
          }}
          animate={position}
          transition={{ type: "linear", duration: 0.1 }}
        />
      </div>

      {/* Breathing phase indicators */}
      <div className="absolute inset-0">
        {/* Left loop - Breathe Out */}
        <div
          className={cn(
            "absolute left-[20%] top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
            "flex flex-col items-center gap-2",
            currentStep === 1 ? "opacity-100 scale-110" : "opacity-40 scale-100",
          )}
        >
          <div className="text-cyan-600 dark:text-cyan-400 font-medium">{t.ui.breatheOut}</div>
          <div className="h-1 w-16 rounded-full overflow-hidden bg-cyan-100 dark:bg-cyan-950">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-100"
              style={{
                width: currentStep === 1 ? `${progress}%` : "0%",
              }}
            />
          </div>
        </div>

        {/* Right loop - Breathe In */}
        <div
          className={cn(
            "absolute left-[80%] top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
            "flex flex-col items-center gap-2",
            currentStep === 0 ? "opacity-100 scale-110" : "opacity-40 scale-100",
          )}
        >
          <div className="text-cyan-600 dark:text-cyan-400 font-medium">{t.ui.breatheIn}</div>
          <div className="h-1 w-16 rounded-full overflow-hidden bg-cyan-100 dark:bg-cyan-950">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-100"
              style={{
                width: currentStep === 0 ? `${progress}%` : "0%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

