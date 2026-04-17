import {PrismaPg} from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client";
import { defineConfig } from "prisma/config";

const adapter = new PrismaPg({connectionString: process.env.DATABASE_URL})
export const prismaClient  = new PrismaClient({adapter:adapter});