import { renderHook, waitFor } from '@testing-library/react'
import { usersEndpoint } from '@tests/mocks/handlers'
import { server } from '@tests/mocks/server'
import { http,HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import { useUsers } from './use-users'

describe('useUsers', () => {
  it('loads users successfully', async () => {
    const { result } = renderHook(() => useUsers())

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.users).toHaveLength(3)
    expect(result.current.hasError).toBe(false)
  })

  it('exposes error state when request fails', async () => {
    server.use(
      http.get(usersEndpoint, () => {
        return HttpResponse.json({ message: 'error' }, { status: 500 })
      }),
    )

    const { result } = renderHook(() => useUsers())

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.errorMessage).toBe('Unable to load users.')
    expect(result.current.users).toHaveLength(0)
  })

  it('allows retry and recovers from error', async () => {
    let shouldFail = true

    server.use(
      http.get(usersEndpoint, () => {
        if (shouldFail) {
          return HttpResponse.json({ message: 'error' }, { status: 500 })
        }

        return HttpResponse.json({
          users: [{ id: 99, name: 'Margaret Hamilton', email: 'margaret@nasa.dev', company: { name: 'NASA' } }],
        })
      }),
    )

    const { result } = renderHook(() => useUsers())

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    shouldFail = false
    result.current.reload()

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.users).toEqual([
      {
        id: 99,
        name: 'Margaret Hamilton',
        email: 'margaret@nasa.dev',
        company: 'NASA',
      },
    ])
  })
})

