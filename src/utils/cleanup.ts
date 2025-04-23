import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function cleanupTokens(): Promise<number> {
  const deleteTokens = await prisma.tokens.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });

  return deleteTokens.count;
}
