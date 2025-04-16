import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const deletedTokens = await prisma.tokens.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    return NextResponse.json({
      success: true,
      deletedCount: deletedTokens.count,
    });
  } catch (error) {
    console.error("Failed to cleanup expired tokens:", error);
    return NextResponse.json(
      { error: "Failed to cleanup expired tokens" },
      { status: 500 },
    );
  }
}
