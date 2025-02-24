"use client"

import { useEffect } from "react"

export function PWAInstall() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && window.workbox !== undefined) {
      // Register service worker only in production
      if (process.env.NODE_ENV === "production") {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("Service Worker registration successful:", registration.scope)
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error.message)
          })
      }
    }
  }, [])

  return null
}

