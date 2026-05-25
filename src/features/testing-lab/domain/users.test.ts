import { describe, expect, it } from 'vitest'

import { filterUsersByName, normalizeUser, normalizeUsers } from './users'

describe('users domain', () => {
  it('normaliza dados de um usuário', () => {
    const user = normalizeUser({
      id: 1,
      name: '  Ada Lovelace  ',
      email: 'ADA@analysis.dev',
      company: {
        name: ' ',
      },
    })

    expect(user).toEqual({
      id: 1,
      name: 'Ada Lovelace',
      email: 'ada@analysis.dev',
      company: 'Independent',
    })
  })

  it('normaliza uma lista completa', () => {
    const users = normalizeUsers([
      { id: 1, name: 'Ada', email: 'ada@dev.test' },
      { id: 2, name: 'Grace', email: 'grace@dev.test' },
    ])

    expect(users).toHaveLength(2)
    expect(users[0]).toMatchObject({ id: 1, company: 'Independent' })
    expect(users[1]).toMatchObject({ id: 2, company: 'Independent' })
  })

  it('filtra usuários ignorando maiúsculas/minúsculas', () => {
    const users = normalizeUsers([
      { id: 1, name: 'Ada Lovelace', email: 'ada@dev.test' },
      { id: 2, name: 'Grace Hopper', email: 'grace@dev.test' },
    ])

    const filteredUsers = filterUsersByName({ users, query: 'ada' })

    expect(filteredUsers).toEqual([users[0]])
  })

  it('retorna lista original quando filtro está vazio', () => {
    const users = normalizeUsers([
      { id: 1, name: 'Ada Lovelace', email: 'ada@dev.test' },
      { id: 2, name: 'Grace Hopper', email: 'grace@dev.test' },
    ])

    const filteredUsers = filterUsersByName({ users, query: '  ' })

    expect(filteredUsers).toBe(users)
  })
})

