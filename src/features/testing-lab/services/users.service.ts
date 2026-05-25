import { type ExternalUserDTO, normalizeUsers, type User } from '../domain/users'

export const USERS_ENDPOINT = '/api/testing-lab/users'

const DEFAULT_ORIGIN = 'http://localhost:3000'

const resolveOrigin = () => {
  if (typeof window === 'undefined') return DEFAULT_ORIGIN
  return window.location.origin
}

export class UsersRequestError extends Error {
  public readonly status: number

  public constructor({ message, status }: { message: string; status: number }) {
    super(message)
    this.name = 'UsersRequestError'
    this.status = status
  }
}

export const buildUsersRequestUrl = ({
  endpoint = USERS_ENDPOINT,
  query = '',
}: {
  endpoint?: string
  query?: string
}) => {
  const url = new URL(endpoint, resolveOrigin())
  const normalizedQuery = query.trim()

  if (normalizedQuery) {
    url.searchParams.set('q', normalizedQuery)
  }

  return url.toString()
}

export const fetchUsers = async ({
  endpoint = USERS_ENDPOINT,
  query = '',
  signal,
}: {
  endpoint?: string
  query?: string
  signal?: AbortSignal
} = {}): Promise<User[]> => {
  const response = await fetch(buildUsersRequestUrl({ endpoint, query }), {
    headers: {
      Accept: 'application/json',
    },
    signal,
  })

  if (!response.ok) {
    throw new UsersRequestError({
      message: 'Não foi possível carregar os usuários.',
      status: response.status,
    })
  }

  const payload = (await response.json()) as {
    users?: ExternalUserDTO[]
  }

  return normalizeUsers(payload.users || [])
}

