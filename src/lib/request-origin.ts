import { headers } from 'next/headers'

import { env } from '@/lib/env'

export const getRequestOrigin = async () => {
  const headerList = await headers()
  const host = headerList.get('x-forwarded-host') || headerList.get('host')
  const protocol = headerList.get('x-forwarded-proto') || 'http'

  if (!host) return env.APP_URL

  return `${protocol}://${host}`
}

