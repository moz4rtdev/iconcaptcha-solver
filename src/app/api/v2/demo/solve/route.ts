import { NextRequest, NextResponse } from "next/server";
import { solveCaptcha } from "@/utils/addon";
import path from "path";
import { readFileSync } from "fs";

export async function POST(request: NextRequest) {
    const { pathFile } = await request.json();

    const captcha = readFileSync(path.join(process.cwd(), `public/${pathFile}`));

    const buffer = Buffer.from(captcha).toString('base64');
    try {
        const result = await solveCaptcha(buffer);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: "Failed to solve captcha" }, { status: 500 });
    }
}