import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

interface Body {
  email: string;
  tokenAdmin: string;
  credits: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body;
    if (body.tokenAdmin !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const result = await prisma.tokens.create({
      data: {
        email: body.email,
        credits: body.credits as number,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days,
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
