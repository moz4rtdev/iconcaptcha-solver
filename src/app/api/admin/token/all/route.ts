import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

interface Body {
  tokenAdmin: string;
  email?: string;
  credits?: number;
}

export async function PUT(request: NextRequest) {
  const { tokenAdmin, credits } = (await request.json()) as Body;

  if (tokenAdmin !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await prisma.tokens.updateMany({
    where: {},
    data: { credits },
  });

  return NextResponse.json({ count: result.count }, { status: 200 });
}
