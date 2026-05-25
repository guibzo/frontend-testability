'use client'

import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useUsers } from '@/hooks/use-users'
import { filterUsersByName } from '@/utils/users/filter-users-by-name'

export const UsersLab = () => {
  const [query, setQuery] = useState('')
  const { users, status, errorMessage, isLoading, hasError, reload } = useUsers()

  const filteredUsers = useMemo(() => {
    return filterUsersByName({ users, query })
  }, [users, query])

  const isEmpty = status === 'success' && filteredUsers.length === 0

  return (
    <section className='w-full max-w-2xl space-y-4 rounded-lg border border-border bg-card p-4 text-card-foreground'>
      <header className='space-y-2'>
        <h2 className='text-xl font-semibold'>Testing Lab</h2>
        <p className='text-sm text-muted-foreground'>Daily testing scenarios with HTTP, hooks and UI interactions.</p>
      </header>

      <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder='Search by name'
          aria-label='Search user by name'
          className='h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring/50 placeholder:text-muted-foreground focus-visible:ring-3'
        />
        <Button variant='outline' onClick={reload} disabled={isLoading} aria-label='Reload users'>
          Reload
        </Button>
      </div>

      {isLoading && <p>Loading users...</p>}

      {hasError && (
        <div className='space-y-2'>
          <p role='alert'>{errorMessage}</p>
          <Button variant='destructive' onClick={reload}>
            Try again
          </Button>
        </div>
      )}

      {isEmpty && <p>No users found for this filter.</p>}

      {status === 'success' && filteredUsers.length > 0 && (
        <ul className='space-y-2' aria-label='Users list'>
          {filteredUsers.map(user => (
            <li key={user.id} className='rounded-md border border-border p-3'>
              <h3 className='font-medium'>{user.name}</h3>
              <p className='text-sm text-muted-foreground'>{user.email}</p>
              <p className='text-xs text-muted-foreground'>{user.company}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

