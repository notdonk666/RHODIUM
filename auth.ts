import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { 
  handlers, 
  auth, 
  signIn, 
  signOut 
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    ...authConfig.providers,
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.password) return null
        if (!user.emailVerified) return null

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) return null
        return user
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true
      }

      if (!user.id) return false
      
      const existingUser = await prisma.user.findUnique({
        where: { id: user.id }
      })

      return !!existingUser?.emailVerified
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { xp: true, level: true, rank: true, username: true }
        })

        if (dbUser) {
          session.user.xp = dbUser.xp
          session.user.level = dbUser.level
          session.user.rank = dbUser.rank
          session.user.username = dbUser.username
        }
      }
      return session
    },
  },
})
