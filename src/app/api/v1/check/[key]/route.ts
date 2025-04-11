import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{
    key: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { key } = await params;
  const keyOrigin = await fetch("https://key-generator-api.vercel.app", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "referer": "https://shrinkme.ink"
    }
  }).then(res => res.text());

  return NextResponse.json(key === keyOrigin ? { valid: true } : { valid: false }, { status: key === keyOrigin ? 200 : 401 });
}   