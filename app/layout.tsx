import type React from "react"
import type { Metadata, Viewport } from "next"
import { Fraunces, DM_Sans } from "next/font/google"
import "./globals.css"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { LanguageProvider } from "@/components/language-provider"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Breathscape - Mindful Breathing Techniques",
  description:
    "Discover peace and balance with Breathscape's collection of interactive breathing exercises for relaxation and mindfulness",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  generator: "v0.dev",
}

export const viewport: Viewport = {
  themeColor: "#3d7a6e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-startup-image" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      </head>
      <body
        className={`${fraunces.variable} ${dmSans.variable} flex min-h-screen flex-col font-sans`}
      >
        <LanguageProvider>
          <Header />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
