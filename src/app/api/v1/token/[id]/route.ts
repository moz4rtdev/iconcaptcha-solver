import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const token = await prisma.tokens.findUnique({
    where: { id }
  });

  if (!token) {
    return NextResponse.json(
      { error: 'invalid or expired token' },
      { status: 401 }
    );
  }

  return NextResponse.json(token);
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const query = await prisma.tokens.delete({
      where: { id }
    });
    return NextResponse.json(query);
  } catch (error) {
    return NextResponse.json(
      { error: 'Token not found' },
      { status: 404 }
    );
  }
}