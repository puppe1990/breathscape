import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Breathscape - Mindful Breathing Techniques",
  description:
    "Discover peace and balance with Breathscape's collection of interactive breathing exercises for relaxation and mindfulness",
  manifest: "/manifest.json",
  icons: {
    apple: [{ url: "/icons/apple-icon-180.png", sizes: "180x180", type: "image/png" }],
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-startup-image" href="/icons/apple-splash-2048-2732.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'