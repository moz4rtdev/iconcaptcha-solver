import "./global.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "IconCaptcha Solver Free",
  description: "Free API for solving IconCaptcha challenges",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "IconCaptcha Solver",
    description: "Free API for solving IconCaptcha challenges",
    url: "https://iconcaptcha-solver.vercel.app",
    siteName: "IconCaptcha Solver",
    images: [
      {
        url: "https://iconcaptcha-solver.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "IconCaptcha Solver",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IconCaptcha Solver",
    description: "Free API for solving IconCaptcha challenges",
    images: ["https://iconcaptcha-solver.vercel.app/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
