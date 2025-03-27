import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Protected routes that require authentication
const protectedRoutes = ["/profile", "/applications", "/my-jobs"]

export function middleware(request: NextRequest) {
  // Check for token in localStorage via cookies
  const hasToken = request.cookies.has("token") || request.cookies.has("next-auth.session-token")
  const { pathname } = request.nextUrl

  // Check if the route is protected and user is not authenticated
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !hasToken) {
    const url = new URL("/login", request.url)
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  // If user is authenticated and tries to access login page, redirect to dashboard
  if (pathname === "/login" && hasToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/profile/:path*", "/applications/:path*", "/my-jobs/:path*", "/login"],
}

