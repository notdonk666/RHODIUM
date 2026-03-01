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
  trustHost: true,
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { 
    strategy: "jwt",
  },
  providers: [
    ...authConfig.providers,
    Credentials({
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null

          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          })

          if (!user || !user.password) {
             console.error("[AUTH_DEBUG] No user or password found for email:", credentials.email);
             return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          if (!isPasswordValid) {
            console.error("[AUTH_DEBUG] Invalid password for email:", credentials.email);
            return null
          }
          return user
        } catch (error) {
           console.error("[AUTH_FATAL_ERROR] Error in authorize:", error);
           return null;
        }
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
