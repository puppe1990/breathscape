import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers)

  // Add service worker headers
  if (request.url.includes("/sw.js")) {
    const response = NextResponse.next()
    response.headers.set("Cache-Control", "no-cache, no-store, max-age=0")
    response.headers.set("Service-Worker-Allowed", "/")
    return response
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ["/sw.js"],
}

