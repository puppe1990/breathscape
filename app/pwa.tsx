"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Check } from "lucide-react"

declare global {
  interface Window {
    deferredPrompt?: any
    workbox?: any
  }
}

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Register service worker
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

    // Check if the app is already installed
    const checkIfInstalled = () => {
      if (
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true
      ) {
        setIsInstalled(true)
        return true
      }
      return false
    }

    // Check if already installed
    if (checkIfInstalled()) {
      return
    }

    // Register service worker
    registerServiceWorker()

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
      console.log("Install prompt available")
    }

    // Listen for the appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
      console.log("App installed successfully")
    }

    // Add event listeners
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    // Check if the app is installable
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsInstallable(true)
    }

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
      deferredPrompt.prompt()

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice

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
