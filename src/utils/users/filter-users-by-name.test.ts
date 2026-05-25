import { describe, expect, it } from 'vitest'

import { filterUsersByName } from './filter-users-by-name'
import { normalizeUsers } from './normalize-users'

describe('filterUsersByName', () => {
  it('filters users case-insensitively', () => {
    const users = normalizeUsers([
      { id: 1, name: 'Ada Lovelace', email: 'ada@dev.test' },
      { id: 2, name: 'Grace Hopper', email: 'grace@dev.test' },
    ])

    const filteredUsers = filterUsersByName({ users, query: 'ada' })

    expect(filteredUsers).toEqual([users[0]])
  })

  it('returns same array when query is empty', () => {
    const users = normalizeUsers([
      { id: 1, name: 'Ada Lovelace', email: 'ada@dev.test' },
      { id: 2, name: 'Grace Hopper', email: 'grace@dev.test' },
    ])

    const filteredUsers = filterUsersByName({ users, query: '  ' })

    expect(filteredUsers).toBe(users)
  })
})

