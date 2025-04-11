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
      <body>{children}</body>
    </html>
  )
}