import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const token = await prisma.tokens.findUnique({
    where: { id },
  });

  if (!token) {
    return NextResponse.json(
      { error: "invalid or expired token" },
      { status: 401 },
    );
  }

  return NextResponse.json(token);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const headerKey = request.headers.get("key");

    if (!headerKey) {
      return NextResponse.json(
        { error: "Invalid activation key" },
        { status: 401 },
      );
    }

    const checkKey = await fetch(new URL("/api/v2/check", request.url), {
      method: "POST",
      headers: {
        key: headerKey,
      },
    });
    const response = await checkKey.json();

    if (!response.valid) {
      return NextResponse.json(
        { error: "Invalid activation key" },
        { status: 401 },
      );
    }

    const updatedToken = await prisma.tokens.update({
      where: { id },
      data: {
        credits: {
          increment: 60,
        },
      },
    });

    return NextResponse.json(updatedToken);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update token" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const headerKey = request.headers.get("key");

    if (!headerKey) {
      return NextResponse.json(
        { error: "Invalid activation key" },
        { status: 401 },
      );
    }

    const checkKey = await fetch(new URL("/api/v2/check", request.url), {
      method: "POST",
      headers: {
        key: headerKey,
      },
    });
    const response = await checkKey.json();

    if (!response.valid) {
      return NextResponse.json(
        { error: "Invalid activation key" },
        { status: 401 },
      );
    }

    const query = await prisma.tokens.delete({
      where: { id },
    });

    return NextResponse.json(query);
  } catch (error) {
    return NextResponse.json({ error: "Token not found" }, { status: 404 });
  }
}
