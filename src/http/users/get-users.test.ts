import { apiBaseUrl, usersEndpoint } from '@tests/mocks/handlers'
import { server } from '@tests/mocks/server'
import { http,HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import { buildGetUsersUrl, getUsers } from './get-users'

describe('getUsers', () => {
  it('builds URL with query params', () => {
    const url = buildGetUsersUrl({
      endpoint: '/api/users',
      query: 'Ada Lovelace',
    })

    expect(url).toBe(`${apiBaseUrl}/api/users?q=Ada+Lovelace`)
  })

  it('returns normalized users', async () => {
    const users = await getUsers()

    expect(users).toHaveLength(3)
    expect(users[0]).toMatchObject({
      name: 'Ada Lovelace',
      email: 'ada@analysis.dev',
      company: 'Analytical Engines',
    })
  })

  it('supports external endpoints', async () => {
    const endpoint = 'https://external.api.dev/users'

    server.use(
      http.get(endpoint, () => {
        return HttpResponse.json({
          users: [{ id: 10, name: 'Katherine Johnson', email: 'KJ@Nasa.dev', company: { name: 'NASA' } }],
        })
      }),
    )

    const users = await getUsers({ endpoint })

    expect(users).toEqual([
      {
        id: 10,
        name: 'Katherine Johnson',
        email: 'kj@nasa.dev',
        company: 'NASA',
      },
    ])
  })

  it('throws when response is not ok', async () => {
    server.use(
      http.get(usersEndpoint, () => {
        return HttpResponse.json({ message: 'error' }, { status: 500 })
      }),
    )

    await expect(getUsers()).rejects.toThrow('Unable to load users.')
  })
})
