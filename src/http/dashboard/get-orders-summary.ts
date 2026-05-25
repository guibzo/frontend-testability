import { env } from '@/lib/env'

import { type OrdersSummary } from './types'

export const getOrdersSummaryHttp = async ({
  baseUrl,
  latencyMs = 1300,
}: {
  baseUrl?: string
  latencyMs?: number
}) => {
  const origin = baseUrl || env.APP_URL
  const url = new URL('/api/dashboard/orders-summary', origin)
  url.searchParams.set('latencyMs', String(latencyMs))

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Unable to load order summary.')
  }

  return response.json() as Promise<OrdersSummary>
}

