import { NextResponse } from "next/server"

export function proxy(request: Request) {
  if (request.url.includes("/sw.js")) {
    const response = NextResponse.next()
    response.headers.set("Cache-Control", "no-cache, no-store, max-age=0")
    response.headers.set("Service-Worker-Allowed", "/")
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/sw.js"],
}
