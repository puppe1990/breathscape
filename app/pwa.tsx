"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

declare global {
  interface Window {
    workbox?: any
  }
}

export function PWAInstall() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && window.workbox !== undefined) {
      // PWA install logic here
    }
  }, [])

  return (
    <Button
      variant="outline"
      size="sm"
      className="fixed top-20 right-4 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-white/20 dark:border-white/10"
    >
      <Download className="w-4 h-4 mr-2" />
      Install App
    </Button>
  )
}

