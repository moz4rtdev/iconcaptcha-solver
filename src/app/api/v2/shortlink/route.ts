import { generateShortLink } from "@/utils/shortlink";
import { NextResponse } from "next/server";

export async function GET() {
  const shortLink = await generateShortLink();
  return NextResponse.json(shortLink);
}
