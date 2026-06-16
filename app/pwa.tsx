"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Check } from "lucide-react"

declare global {
  interface Window {
    deferredPrompt?: Event
    workbox?: unknown
  }
}

function getIsInstalled() {
  if (typeof window === "undefined") {
    return false
  }

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

function getIsInstallable() {
  if (typeof window === "undefined") {
    return false
  }

  return "serviceWorker" in navigator && "PushManager" in window
}

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [isInstalled, setIsInstalled] = useState(getIsInstalled)
  const [isInstallable, setIsInstallable] = useState(getIsInstallable)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (getIsInstalled()) {
      return
    }

    const registerServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js")
          console.log("Service Worker registered successfully:", registration)
        } catch (error) {
          console.error("Service Worker registration failed:", error)
        }
      }
    }

    registerServiceWorker()

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
      console.log("Install prompt available")
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
      console.log("App installed successfully")
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (isLoading) return

    setIsLoading(true)

    try {
      if (!deferredPrompt) {
        // Fallback: try to open the install prompt manually
        if ("serviceWorker" in navigator) {
          // Show a message to guide users
          const message = `To install this app:

1. Tap the share button (📤) in your browser
2. Select "Add to Home Screen" or "Install App"
3. Or look for the install option in your browser menu

On Chrome/Edge: Look for the install icon (⬇️) in the address bar
On Safari: Tap Share → Add to Home Screen
On Firefox: Look for the install option in the menu`

          alert(message)
        }
        return
      }

      // Show the install prompt
      const promptEvent = deferredPrompt as Event & {
        prompt: () => void
        userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
      }
      promptEvent.prompt()

      // Wait for the user to respond to the prompt
      const { outcome } = await promptEvent.userChoice

      if (outcome === "accepted") {
        console.log("User accepted the install prompt")
        setIsInstalled(true)
      } else {
        console.log("User dismissed the install prompt")
      }

      // Clear the deferred prompt
      setDeferredPrompt(null)
      setIsInstallable(false)
    } catch (error) {
      console.error("Install prompt failed:", error)
      // Show fallback message
      alert("Install failed. Please use your browser's menu to add this app to your home screen.")
    } finally {
      setIsLoading(false)
    }
  }

  // Don't show the button if the app is already installed
  if (isInstalled) {
    return null
  }

  // Don't show the button if the app is not installable
  if (!isInstallable) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleInstallClick}
      disabled={isLoading}
      className="fixed right-4 top-20 z-50 border-white/20 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-black/90 dark:hover:bg-black"
    >
      <Download className="mr-2 h-4 w-4" />
      {isLoading ? "Installing..." : "Install App"}
    </Button>
  )
}
