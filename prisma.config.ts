import "dotenv/config";
import { defineConfig } from "prisma/config";

// Force load .env.local if needed
import { config } from "dotenv";
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"]!,
  },
});
