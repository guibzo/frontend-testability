import { NextResponse } from 'next/server'

import { getOrdersSummary } from '@/server/dashboard-store'

const parseNumber = (value: string | null, fallback: number) => {
  if (!value) return fallback
  const parsedValue = Number.parseInt(value, 10)
  if (Number.isNaN(parsedValue)) return fallback
  return parsedValue
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const latencyMs = parseNumber(url.searchParams.get('latencyMs'), 1300)

  const summary = await getOrdersSummary({ latencyMs })

  return NextResponse.json(summary)
}

