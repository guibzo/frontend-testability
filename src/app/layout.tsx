import '@/styles/_global.css'

import type { Metadata } from 'next'

import { cn } from '@/lib/cn'

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
    <html lang='pt' className={cn('dark')}>
      <body className='antialiased'>{children}</body>
    </html>
  )
}
