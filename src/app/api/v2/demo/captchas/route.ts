import { readdirSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
    try {
        const captchas = readdirSync(path.join(process.cwd(), "public/captchas"));
        const pngCaptchas = captchas
            .filter((captcha) => captcha.endsWith(".png"))
            .map(captcha => `/captchas/${captcha}`);

        return NextResponse.json({ captchas: pngCaptchas });
    } catch (error) {
        return NextResponse.json({ error: "Failed to load captchas" }, { status: 500 });
    }
}