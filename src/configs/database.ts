import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

// Sekarang cukup begini. Prisma otomatis baca process.env.DATABASE_URL
export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"], // Nyalakan log biar kelihatan kalau konek
});
