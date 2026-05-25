import { NextResponse } from 'next/server'

import { listProducts } from '@/server/dashboard-store'

const parseNumber = (value: string | null, fallback: number) => {
  if (!value) return fallback
  const parsedValue = Number.parseInt(value, 10)
  if (Number.isNaN(parsedValue)) return fallback
  return parsedValue
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const search = url.searchParams.get('search') || ''
  const categoryValue = (url.searchParams.get('category') || 'all') as 'all' | 'hardware' | 'software' | 'accessory'
  const page = parseNumber(url.searchParams.get('page'), 1)
  const pageSize = parseNumber(url.searchParams.get('pageSize'), 4)
  const latencyMs = parseNumber(url.searchParams.get('latencyMs'), 500)
  const requestFingerprint = url.searchParams.get('requestFingerprint') || ''

  const payload = await listProducts({
    search,
    category: categoryValue,
    page,
    pageSize,
    latencyMs,
  })

  return NextResponse.json({
    ...payload,
    requestFingerprint,
  })
}

