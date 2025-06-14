// lib/prisma.ts
import { PrismaClient } from "@/lib/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // optional: shows DB queries in dev
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
