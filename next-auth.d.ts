import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      username?: string | null
      xp?: number
      level?: number
      rank?: string
    } & DefaultSession["user"]
  }

  interface User {
    username?: string | null
    xp?: number
    level?: number
    rank?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string | null
    xp?: number
    level?: number
    rank?: string
  }
}
