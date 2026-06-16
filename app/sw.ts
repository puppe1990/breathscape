/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope

const CACHE_NAME = "breathscape-v2"

const urlsToCache = [
  "/",
  "/about",
  "/privacy",
  "/terms",
  "/contact",
  "/favicon.png",
  "/icons/apple-touch-icon.png",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/badge-72x72.png",
]

self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})

self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      )
    })
  )
})

self.addEventListener("push", (event: PushEvent) => {
  const options: NotificationOptions = {
    body: event.data?.text() ?? "Time for your breathing exercise!",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      url: "/",
    },
  }

  event.waitUntil(self.registration.showNotification("Breathscape", options))
})

self.addEventListener("notificationclick", (event: NotificationEvent) => {
  event.notification.close()
  event.waitUntil(self.clients.openWindow(event.notification.data?.url ?? "/"))
})

export {}
