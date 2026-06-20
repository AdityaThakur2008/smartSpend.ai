import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log("connected to the database successfully");
  } catch (error) {
    console.error("failed to connect to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

export default prisma;
