import { getSessionCookie } from 'better-auth/cookies'
import { type NextRequest,NextResponse } from 'next/server'

const AUTH_ROUTES = ['/auth/sign-in']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasSession = Boolean(getSessionCookie(request))

  if (pathname.startsWith('/admin') && !hasSession) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route))
  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/auth/sign-in'],
}

