import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { CreateTokenRequest } from '@/types';

export const runtime = 'nodejs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const headerKey = request.headers.get('key');
    if (!headerKey) {
      return NextResponse.json({ error: 'Invalid activation key' }, { status: 401 });
    }

    const checkKey = await fetch(new URL("/api/v1/check/" + headerKey, request.url).toString());
    const response = await checkKey.json();
    if (!response.valid) {
      return NextResponse.json({ error: 'Invalid activation key' }, { status: 401 });
    }

    const body = await request.json() as CreateTokenRequest;

    const token = await prisma.tokens.create({
      data: {
        email: body.email,
        credits: 5,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      }
    });

    return NextResponse.json(token, { status: 201 });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}