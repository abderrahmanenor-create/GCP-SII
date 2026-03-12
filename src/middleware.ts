import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Routes publiques
        if (
          pathname === "/login" ||
          pathname === "/" ||
          pathname.startsWith("/api/auth") ||
          pathname.startsWith("/_next") ||
          pathname.startsWith("/favicon")
        ) {
          return true
        }

        // Toutes les autres routes nécessitent une authentification
        return !!token
      }
    },
    pages: {
      signIn: "/login"
    }
  }
)

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
}