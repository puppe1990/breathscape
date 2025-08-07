/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope

const CACHE_NAME = "breathscape-v1"

// Add all the files you want to cache
const urlsToCache = [
  "/",
  "/about",
  "/privacy",
  "/terms",
  "/contact",
  "/icons/icon-192x192.png",
  "/icons/icon-384x384.png",
  "/icons/icon-512x512.png",
]

self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }),
  )
})

self.addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch new version
      return response || fetch(event.request)
    }),
  )
})

self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)))
    }),
  )
})

// Handle push notifications
self.addEventListener("push", (event: PushEvent) => {
  const options: NotificationOptions = {
    body: event.data?.text() ?? "New notification",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-72x72.png",
    vibrate: [100, 50, 100],
  }

  event.waitUntil(self.registration.showNotification("Breathscape", options))
})

self.addEventListener("notificationclick", (event: NotificationEvent) => {
  event.notification.close()
  event.waitUntil(clients.openWindow("/"))
})

export {}

