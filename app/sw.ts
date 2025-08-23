/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope

const CACHE_NAME = "breathscape-v1"

// Add all the files you want to cache
const urlsToCache = [
  "/",
  "/about",
  "/privacy",
  "/terms",
  "/contact",
  "/icons/icon-192x192.png",
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
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    }),
  )
})

// Handle push notifications
self.addEventListener("push", (event: PushEvent) => {
  const options: NotificationOptions = {
    body: "Time for your breathing exercise!",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
    data: {
      url: "/",
    },
  }

  event.waitUntil(
    self.registration.showNotification("Breathscape", options)
  )
})

// Handle notification clicks
self.addEventListener("notificationclick", (event: NotificationEvent) => {
  event.notification.close()
  event.waitUntil(
    self.clients.openWindow("/")
  )
})

export {}

