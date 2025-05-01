import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{
    key: string;
  }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const key = request.headers.get("key");
  const checkKey = await fetch(
    "https://dev-generator-key.vercel.app/api/check",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: key }),
    },
  );
  return NextResponse.json(
    checkKey.status === 200 ? { valid: true } : { valid: false },
  );
}
