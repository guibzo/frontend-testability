'use server'

import { getUserPermissions } from '@/lib/permissions'
import { getSession } from '@/lib/session'
import { reserveOneUnit } from '@/server/dashboard-store'

export const reserveProductAction = async ({ productId }: { productId: string }) => {
  const session = await getSession()
  const userEmail = session?.user?.email || ''
  const permissions = getUserPermissions({ email: userEmail })

  if (!permissions.canReserveStock) {
    return {
      ok: false,
      message: 'You do not have permission to reserve stock.',
    }
  }

  return reserveOneUnit({ productId })
}

