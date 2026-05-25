'use client'

import { useCallback, useEffect, useMemo, useOptimistic, useRef, useState, useTransition } from 'react'

import { reserveProductAction } from '@/app/admin/actions'
import { Button } from '@/components/ui/button'
import { getDashboardProducts } from '@/http/dashboard/get-dashboard-products'
import { type InventoryResponse } from '@/http/dashboard/types'
import { type UserPermissions } from '@/lib/permissions'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const LATENCY_BY_REASON: Record<'search' | 'paginate' | 'refresh' | 'sync', number> = {
  search: 420,
  paginate: 140,
  refresh: 180,
  sync: 140,
}

export const InventoryPanel = ({
  initialData,
  baseUrl,
  permissions,
  featureInventoryTableV2,
}: {
  initialData: InventoryResponse
  baseUrl: string
  permissions: UserPermissions
  featureInventoryTableV2: boolean
}) => {
  const [data, setData] = useState(initialData)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<'all' | 'hardware' | 'software' | 'accessory'>('all')
  const [page, setPage] = useState(initialData.page)
  const [errorMessage, setErrorMessage] = useState('')
  const [isFetching, startFetchTransition] = useTransition()
  const [isMutating, startMutationTransition] = useTransition()
  const [fetchReason, setFetchReason] = useState<'idle' | 'search' | 'paginate' | 'refresh' | 'sync'>('idle')
  const requestCounterRef = useRef(0)

  const [optimisticItems, applyOptimisticReserve] = useOptimistic(
    data.items,
    (currentItems, payload: { productId: string }) =>
      currentItems.map(item =>
        item.id === payload.productId
          ? {
              ...item,
              stock: Math.max(0, item.stock - 1),
              reserved: item.reserved + 1,
            }
          : item,
      ),
  )

  const hasMorePages = data.page * data.pageSize < data.total

  const fetchPage = useCallback(
    ({
      nextPage,
      nextSearch,
      nextCategory,
      reason,
    }: {
      nextPage: number
      nextSearch: string
      nextCategory: 'all' | 'hardware' | 'software' | 'accessory'
      reason: 'search' | 'paginate' | 'refresh' | 'sync'
    }) => {
      requestCounterRef.current += 1
      const currentRequestNumber = requestCounterRef.current
      const latencyMs = LATENCY_BY_REASON[reason]

      setFetchReason(reason)

      startFetchTransition(() => {
        void getDashboardProducts({
          baseUrl,
          query: {
            search: nextSearch,
            page: nextPage,
            pageSize: data.pageSize,
            category: nextCategory,
          },
          latencyMs,
          requestFingerprint: String(currentRequestNumber),
        })
          .then(response => {
            if (currentRequestNumber !== requestCounterRef.current) return

            setData(response)
            setErrorMessage('')
            setFetchReason('idle')
          })
          .catch(() => {
            if (currentRequestNumber !== requestCounterRef.current) return
            setErrorMessage('Unable to refresh inventory right now.')
            setFetchReason('idle')
          })
      })
    },
    [baseUrl, data.pageSize],
  )

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1)
      fetchPage({
        nextPage: 1,
        nextSearch: search,
        nextCategory: category,
        reason: 'search',
      })
    }, 300)

    return () => {
      clearTimeout(timeout)
    }
  }, [category, fetchPage, search])

  const currentRows = useMemo(() => optimisticItems, [optimisticItems])

  const handleReserve = ({ productId, stock }: { productId: string; stock: number }) => {
    if (!permissions.canReserveStock || stock <= 0) return

    setErrorMessage('')

    startMutationTransition(() => {
      applyOptimisticReserve({ productId })

      void reserveProductAction({ productId }).then(response => {
        if (!response.ok) {
          setErrorMessage(response.message || 'Unable to reserve product right now.')
        }

        fetchPage({
          nextPage: page,
          nextSearch: search,
          nextCategory: category,
          reason: 'sync',
        })
      })
    })
  }

  const isBusy = isFetching || isMutating
  const showSkeleton = isFetching && (fetchReason === 'search' || fetchReason === 'paginate')

  return (
    <section data-testid='inventory-panel' className='space-y-4 rounded-lg border border-border bg-card p-4 text-card-foreground'>
      <header className='space-y-1'>
        <h2 className='text-xl font-semibold'>Inventory</h2>
        <p className='text-sm text-muted-foreground'>SSR initial data, client pagination, race-safe filters and optimistic updates.</p>
      </header>

      <div className='grid gap-2 md:grid-cols-[1fr_auto_auto]'>
        <input
          data-testid='inventory-search'
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder='Search product'
          aria-label='Search product'
          className='h-9 rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring/50 focus-visible:ring-3'
        />
        <select
          data-testid='inventory-category'
          value={category}
          onChange={event => setCategory(event.target.value as 'all' | 'hardware' | 'software' | 'accessory')}
          aria-label='Category filter'
          className='h-9 rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring/50 focus-visible:ring-3'
        >
          <option value='all'>All categories</option>
          <option value='hardware'>Hardware</option>
          <option value='software'>Software</option>
          <option value='accessory'>Accessory</option>
        </select>
        <Button
          data-testid='inventory-refresh'
          variant='outline'
          onClick={() =>
            fetchPage({
              nextPage: page,
              nextSearch: search,
              nextCategory: category,
              reason: 'refresh',
            })
          }
          disabled={isBusy}
        >
          Refresh
        </Button>
      </div>

      {errorMessage && <p role='alert' data-testid='inventory-error' className='text-sm text-destructive'>{errorMessage}</p>}
      {isBusy && <p data-testid='inventory-updating' className='text-sm text-muted-foreground'>Updating data...</p>}

      {featureInventoryTableV2 ? (
        <div className='relative overflow-hidden rounded-md border border-border'>
          <table data-testid='inventory-table' className='w-full text-left text-sm'>
            <thead className='bg-muted/40'>
              <tr>
                <th className='px-3 py-2 font-medium'>Product</th>
                <th className='px-3 py-2 font-medium'>Category</th>
                <th className='px-3 py-2 font-medium'>Price</th>
                <th className='px-3 py-2 font-medium'>Stock</th>
                <th className='px-3 py-2 font-medium'>Reserved</th>
                <th className='px-3 py-2 font-medium'>Actions</th>
              </tr>
            </thead>
            <tbody className={showSkeleton ? 'opacity-60' : ''}>
              {currentRows.map(product => (
                <tr data-testid={`inventory-row-${product.id}`} key={product.id} className='border-t border-border'>
                  <td className='px-3 py-2'>{product.name}</td>
                  <td className='px-3 py-2 capitalize'>{product.category}</td>
                  <td className='px-3 py-2'>{currencyFormatter.format(product.priceInCents / 100)}</td>
                  <td data-testid={`inventory-stock-${product.id}`} className='px-3 py-2'>
                    {product.stock}
                  </td>
                  <td className='px-3 py-2'>{product.reserved}</td>
                  <td className='px-3 py-2'>
                    <Button
                      data-testid={`inventory-reserve-${product.id}`}
                      size='sm'
                      disabled={!permissions.canReserveStock || product.stock <= 0 || isMutating}
                      onClick={() => handleReserve({ productId: product.id, stock: product.stock })}
                    >
                      Reserve 1
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showSkeleton && (
            <div data-testid='inventory-loading-skeleton' className='pointer-events-none absolute inset-0 grid gap-2 bg-background/50 p-3'>
              {Array.from({ length: Math.max(1, currentRows.length) }).map((_, index) => (
                <div key={index} className='h-8 animate-pulse rounded bg-muted/70' />
              ))}
            </div>
          )}
        </div>
      ) : (
        <ul className='grid gap-2 md:grid-cols-2' aria-label='Inventory cards'>
          {currentRows.map(product => (
            <li key={product.id} className='rounded-md border border-border p-3'>
              <h3 className='font-medium'>{product.name}</h3>
              <p className='text-sm text-muted-foreground'>Category: {product.category}</p>
              <p className='text-sm text-muted-foreground'>Stock: {product.stock}</p>
            </li>
          ))}
        </ul>
      )}

      <div className='flex items-center justify-between'>
        <p className='text-xs text-muted-foreground'>
          Page {data.page} of {Math.max(1, Math.ceil(data.total / data.pageSize))}
        </p>
        <div className='flex gap-2'>
          <Button
            data-testid='inventory-pagination-prev'
            variant='outline'
            size='sm'
            onClick={() => {
              const nextPage = Math.max(1, page - 1)
              setPage(nextPage)
              fetchPage({
                nextPage,
                nextSearch: search,
                nextCategory: category,
                reason: 'paginate',
              })
            }}
            disabled={page <= 1 || isBusy}
          >
            Previous
          </Button>
          <Button
            data-testid='inventory-pagination-next'
            variant='outline'
            size='sm'
            onClick={() => {
              const nextPage = page + 1
              setPage(nextPage)
              fetchPage({
                nextPage,
                nextSearch: search,
                nextCategory: category,
                reason: 'paginate',
              })
            }}
            disabled={!hasMorePages || isBusy}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  )
}
