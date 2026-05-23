import '@/styles/_global.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/cn'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: {
    template: '%s | My App',
    default: 'My App',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt' className={cn('dark font-sans', inter.variable)}>
      <body className='antialiased'>{children}</body>
    </html>
  )
}
