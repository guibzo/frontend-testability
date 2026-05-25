import { http,HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import { apiBaseUrl, usersEndpoint } from '../../../../tests/mocks/handlers'
import { server } from '../../../../tests/mocks/server'
import { buildUsersRequestUrl, fetchUsers,UsersRequestError } from './users.service'

describe('users service', () => {
  it('monta URL com query string quando necessário', () => {
    const requestUrl = buildUsersRequestUrl({
      endpoint: '/api/testing-lab/users',
      query: 'Ada Lovelace',
    })

    expect(requestUrl).toBe(`${apiBaseUrl}/api/testing-lab/users?q=Ada+Lovelace`)
  })

  it('busca usuários e normaliza os dados', async () => {
    const users = await fetchUsers()

    expect(users).toHaveLength(3)
    expect(users[0]).toMatchObject({
      name: 'Ada Lovelace',
      email: 'ada@analysis.dev',
      company: 'Analytical Engines',
    })
    expect(users[1]).toMatchObject({
      name: 'Grace Hopper',
      email: 'grace@compiler.dev',
      company: 'Independent',
    })
  })

  it('permite buscar dados de endpoint externo', async () => {
    const endpoint = 'https://external.api.dev/users'

    server.use(
      http.get(endpoint, () => {
        return HttpResponse.json({
          users: [{ id: 10, name: 'Katherine Johnson', email: 'KJ@Nasa.dev', company: { name: 'NASA' } }],
        })
      }),
    )

    const users = await fetchUsers({ endpoint })

    expect(users).toEqual([
      {
        id: 10,
        name: 'Katherine Johnson',
        email: 'kj@nasa.dev',
        company: 'NASA',
      },
    ])
  })

  it('lança erro padronizado quando resposta não é ok', async () => {
    server.use(
      http.get(usersEndpoint, () => {
        return HttpResponse.json({ message: 'Erro' }, { status: 500 })
      }),
    )

    await expect(fetchUsers()).rejects.toBeInstanceOf(UsersRequestError)
    await expect(fetchUsers()).rejects.toMatchObject({
      message: 'Não foi possível carregar os usuários.',
      status: 500,
    })
  })
})

