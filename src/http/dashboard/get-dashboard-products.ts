import { env } from '@/lib/env'

import { type InventoryQuery, type InventoryResponse } from './types'

export const getDashboardProducts = async ({
  query,
  baseUrl,
  latencyMs,
  requestFingerprint,
}: {
  query: InventoryQuery
  baseUrl?: string
  latencyMs?: number
  requestFingerprint?: string
}): Promise<InventoryResponse> => {
  const origin = baseUrl || env.APP_URL
  const url = new URL('/api/dashboard/products', origin)

  url.searchParams.set('search', query.search)
  url.searchParams.set('category', query.category)
  url.searchParams.set('page', String(query.page))
  url.searchParams.set('pageSize', String(query.pageSize))

  if (latencyMs) {
    url.searchParams.set('latencyMs', String(latencyMs))
  }

  if (requestFingerprint) {
    url.searchParams.set('requestFingerprint', requestFingerprint)
  }

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Unable to load dashboard products.')
  }

  return response.json()
}

