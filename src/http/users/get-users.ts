import { type User } from '@/http/users/types'
import { normalizeUsers } from '@/utils/users/normalize-users'

export const USERS_ENDPOINT = '/api/users'
const DEFAULT_ORIGIN = 'http://localhost:3000'

const getOrigin = () => {
  if (typeof window === 'undefined') return DEFAULT_ORIGIN
  return window.location.origin
}

export const buildGetUsersUrl = ({ endpoint = USERS_ENDPOINT, query = '' }: { endpoint?: string; query?: string }) => {
  const url = new URL(endpoint, getOrigin())
  const normalizedQuery = query.trim()

  if (normalizedQuery) {
    url.searchParams.set('q', normalizedQuery)
  }

  return url.toString()
}

export const getUsers = async ({
  endpoint = USERS_ENDPOINT,
  query = '',
  signal,
}: {
  endpoint?: string
  query?: string
  signal?: AbortSignal
} = {}): Promise<User[]> => {
  const response = await fetch(buildGetUsersUrl({ endpoint, query }), {
    headers: {
      Accept: 'application/json',
    },
    signal,
  })

  if (!response.ok) {
    throw new Error('Unable to load users.')
  }

  const payload = (await response.json()) as {
    users?: Parameters<typeof normalizeUsers>[0]
  }

  return normalizeUsers(payload.users || [])
}
