import type { Metadata } from 'next'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Home() {
  return (
    <main className='mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-4 p-6'>
      <h1 className='text-3xl font-bold'>Testing Playground</h1>
      <p className='text-center text-muted-foreground'>SSR-first Next.js admin dashboard with auth, guards and testing scenarios.</p>

      <div className='flex flex-wrap justify-center gap-2'>
        <Link href='/auth/sign-in' className={buttonVariants()}>
          Go to auth
        </Link>
        <Link href='/admin' className={buttonVariants({ variant: 'outline' })}>
          Go to admin
        </Link>
      </div>
    </main>
  )
}
