import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ref } from "process";

const prisma = new PrismaClient();

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

interface Body {
  tokenAdmin: string;
  email?: string;
  credits?: number;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const result = await prisma.tokens.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json(result, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { tokenAdmin, credits } = (await request.json()) as Body;
  const { id } = await params;
  if (tokenAdmin !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await prisma.tokens.update({
    where: {
      id,
    },
    data: {
      credits: {
        increment: credits,
      },
    },
  });

  return NextResponse.json(result, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { tokenAdmin } = (await request.json()) as Body;
  const { id } = await params;
  if (tokenAdmin !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await prisma.tokens.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(
    { message: "Token deleted successfully", token: result },
    { status: 200 },
  );
}
