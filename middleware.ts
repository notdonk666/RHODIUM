import NextAuth from "next-auth"
import authConfig from "./auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
  const isPublicRoute = ["/", "/ranks", "/auth/login", "/auth/signup", "/auth/new-verification"].includes(nextUrl.pathname)
  const isAuthRoute = nextUrl.pathname.startsWith("/auth")

  if (isApiAuthRoute) return

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/dashboard", nextUrl))
    }
    return
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl))
  }

  return
})

export const config = {
  matcher: ["/((?!.+\.[\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
