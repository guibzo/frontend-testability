import type { Metadata } from 'next'

import { UsersLab } from '@/features/testing-lab/components/users-lab'

export const metadata: Metadata = {
  title: 'Testing Lab',
}

export default function TestingLabPage() {
  return (
    <main className='mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center p-6'>
      <UsersLab />
    </main>
  )
}

