import './global.css';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IconCaptcha Solver',
  description: 'API for solving IconCaptcha challenges',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1372819950640997"
          crossOrigin="anonymous"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}