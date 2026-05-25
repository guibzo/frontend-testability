import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { AdminHeader } from '@/app/admin/(components)/admin-header'
import { InventoryPanel } from '@/app/admin/(components)/inventory-panel'
import { OrdersSummary } from '@/app/admin/(components)/orders-summary'
import { OrdersSummarySkeleton } from '@/app/admin/(components)/orders-summary-skeleton'
import { getDashboardProducts } from '@/http/dashboard/get-dashboard-products'
import { featureFlags } from '@/lib/feature-flags'
import { getUserPermissions } from '@/lib/permissions'
import { getRequestOrigin } from '@/lib/request-origin'
import { getSession } from '@/lib/session'

export default async function AdminPage() {
  const session = await getSession()

  if (!session) {
    redirect('/auth/sign-in')
  }

  const baseUrl = await getRequestOrigin()
  const userEmail = session.user.email
  const permissions = getUserPermissions({ email: userEmail })

  const initialData = await getDashboardProducts({
    baseUrl,
    latencyMs: 900,
    query: {
      search: '',
      category: 'all',
      page: 1,
      pageSize: 4,
    },
  })

  return (
    <main className='mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-4 p-6'>
      <AdminHeader email={userEmail} />

      <Suspense fallback={<OrdersSummarySkeleton />}>
        <OrdersSummary baseUrl={baseUrl} />
      </Suspense>

      <InventoryPanel
        initialData={initialData}
        baseUrl={baseUrl}
        permissions={permissions}
        featureInventoryTableV2={featureFlags.inventoryTableV2}
      />
    </main>
  )
}

