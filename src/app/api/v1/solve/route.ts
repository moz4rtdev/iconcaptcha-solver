import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { SolveRequest } from '@/types';
import { solveCaptcha } from '@/utils/addon';

// export const runtime = 'nodejs';
// export const preferredRegion = 'auto';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SolveRequest;
    const token = await prisma.tokens.findUnique({
      where: { id: body.token }
    });

    if (!token) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    if (token.credits <= 0) {
      return NextResponse.json(
        { error: 'Insufficient credits' },
        { status: 402 }
      );
    }

    const result = await solveCaptcha(body.image);
    
    await prisma.tokens.update({
      where: { id: body.token },
      data: { credits: { decrement: 1 } }
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in solve endpoint:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}