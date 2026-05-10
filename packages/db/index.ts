import dotenv from 'dotenv'
import { PrismaClient } from "./generated/prisma/client";

dotenv.config({ path: "../../.env" });

console.log("DATABASE_URL:", process.env.DATABASE_URL ? "✅ Loaded" : "❌ Missing");

export const prismaClient = new PrismaClient();