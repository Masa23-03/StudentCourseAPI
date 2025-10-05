import { PrismaClient } from "../../generated/prisma";
export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export const UserPrisma = prisma.user;
export const CoursePrisma = prisma.course;
