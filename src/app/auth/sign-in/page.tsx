import { redirect } from 'next/navigation'

import { getSession } from '@/lib/session'

import { AuthPanel } from './(components)/auth-panel'

export default async function SignInPage() {
  const session = await getSession()

  if (session) {
    redirect('/admin')
  }

  return (
    <main className='mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center p-6'>
      <AuthPanel />
    </main>
  )
}

