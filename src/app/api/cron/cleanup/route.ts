import { NextRequest, NextResponse } from "next/server";
import { cleanupTokens } from "@/utils/cleanup";

export async function GET(request: NextRequest) {
  try {
    const count = await cleanupTokens();
    return NextResponse.json({
      success: true,
      deletedCount: count,
    });
  } catch (error) {
    console.error("Failed to cleanup expired tokens:", error);
    return NextResponse.json(
      { error: "Failed to cleanup expired tokens" },
      { status: 500 },
    );
  }
}
