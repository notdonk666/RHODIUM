import { PrismaClient } from "@prisma/client"
import { Pool, types } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"

// Handle BigInt conversion if needed
types.setTypeParser(20, (val) => parseInt(val, 10));

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  pgPool: Pool | undefined
}

const connectionString = process.env.DATABASE_URL;

if (!globalForPrisma.pgPool) {
  globalForPrisma.pgPool = new Pool({ 
    connectionString,
    max: 1, // Minimize connections in serverless to avoid exhausting DB limits
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000, // Slightly longer for cold starts
  })
}

if (!globalForPrisma.prisma) {
  const adapter = new PrismaPg(globalForPrisma.pgPool)
  globalForPrisma.prisma = new PrismaClient({ 
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })
}

export const prisma = globalForPrisma.prisma

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
