import { getOrdersSummaryHttp } from '@/http/dashboard/get-orders-summary'
import { featureFlags } from '@/lib/feature-flags'

export const OrdersSummary = async ({ baseUrl }: { baseUrl: string }) => {
  if (!featureFlags.orderSummary) {
    return null
  }

  const summary = await getOrdersSummaryHttp({
    baseUrl,
    latencyMs: 1600,
  })

  return (
    <section className='grid gap-3 md:grid-cols-3'>
      <article className='rounded-lg border border-border bg-card p-4 text-card-foreground'>
        <p className='text-sm text-muted-foreground'>Pending</p>
        <p className='text-2xl font-semibold'>{summary.pending}</p>
      </article>
      <article className='rounded-lg border border-border bg-card p-4 text-card-foreground'>
        <p className='text-sm text-muted-foreground'>Approved</p>
        <p className='text-2xl font-semibold'>{summary.approved}</p>
      </article>
      <article className='rounded-lg border border-border bg-card p-4 text-card-foreground'>
        <p className='text-sm text-muted-foreground'>Canceled</p>
        <p className='text-2xl font-semibold'>{summary.canceled}</p>
      </article>
    </section>
  )
}

