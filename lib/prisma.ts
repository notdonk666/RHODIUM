import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  pgPool: Pool | undefined
}

// In serverless, we must handle the connection string carefully
const connectionString = `${process.env.DATABASE_URL}`;

if (!globalForPrisma.pgPool) {
  globalForPrisma.pgPool = new Pool({ 
    connectionString,
    max: 1, // Minimize connections to avoid exhausting DB limits in serverless
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  })
}

if (!globalForPrisma.prisma) {
  const adapter = new PrismaPg(globalForPrisma.pgPool)
  globalForPrisma.prisma = new PrismaClient({ 
    adapter,
    log: ["error"]
  })
}

export const prisma = globalForPrisma.prisma

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
