import { OrdersSummarySkeleton } from '@/app/admin/(components)/orders-summary-skeleton'

export default function AdminLoading() {
  return (
    <main className='mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-4 p-6'>
      <section className='rounded-lg border border-border bg-card p-4'>
        <div className='h-6 w-48 animate-pulse rounded bg-muted' />
        <div className='mt-2 h-4 w-72 animate-pulse rounded bg-muted' />
      </section>

      <OrdersSummarySkeleton />

      <section className='space-y-3 rounded-lg border border-border bg-card p-4'>
        <div className='h-5 w-32 animate-pulse rounded bg-muted' />
        <div className='h-9 w-full animate-pulse rounded bg-muted' />
        <div className='h-56 w-full animate-pulse rounded bg-muted' />
      </section>
    </main>
  )
}

