import { describe, expect, it } from 'vitest'

import { normalizeUser, normalizeUsers } from './normalize-users'

describe('normalizeUsers', () => {
  it('normalizes a single user', () => {
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

  it('normalizes an array of users', () => {
    const users = normalizeUsers([
      { id: 1, name: 'Ada', email: 'ada@dev.test' },
      { id: 2, name: 'Grace', email: 'grace@dev.test' },
    ])

    expect(users).toHaveLength(2)
    expect(users[0]).toMatchObject({ id: 1, company: 'Independent' })
    expect(users[1]).toMatchObject({ id: 2, company: 'Independent' })
  })
})

