import { PrismaClient } from "@prisma/client";

/**
 * Cliente Prisma singleton (evita esgotar conexões no hot-reload do Next).
 * Dev: SQLite. Produção: trocar o provider no schema para postgresql.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
