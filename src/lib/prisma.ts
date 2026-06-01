import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

/**
 * Lazy Prisma client.
 *
 * The real `PrismaClient` is only instantiated on first property access (i.e.
 * the first query), not when this module is imported. This keeps the
 * production build from requiring `DATABASE_URL` at build time — the public
 * site renders from mock data, and DB-backed API routes are try/catch-wrapped,
 * so the app builds and runs even before a database is connected. Set a real
 * `DATABASE_URL` and persistence/auth begin working with no code changes.
 */
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = (globalForPrisma.prisma ??= createClient());
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
