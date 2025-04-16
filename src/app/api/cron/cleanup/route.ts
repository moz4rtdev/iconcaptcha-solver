import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CleanupResponse {
  success: boolean;
  deletedCount: number;
}

export async function GET() {
  try {
    const deletedTokens = await fetch(new URL("/api/v2/cleanup")).then(
      (response) => response.json() as Promise<CleanupResponse>,
    );

    return NextResponse.json({
      success: true,
      deletedCount: deletedTokens.deletedCount,
    });
  } catch (error) {
    console.error("Failed to cleanup expired tokens:", error);
    return NextResponse.json(
      { error: "Failed to cleanup expired tokens" },
      { status: 500 },
    );
  }
}
