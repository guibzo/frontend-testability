'use client'

import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'

import { filterUsersByName } from '../domain/users'
import { useUsers } from '../hooks/use-users'

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
        <h2 className='text-xl font-semibold'>Laboratório de Testes</h2>
        <p className='text-sm text-muted-foreground'>Fluxo com fetch, hook customizado, filtro e retry.</p>
      </header>

      <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder='Buscar por nome'
          aria-label='Buscar usuário por nome'
          className='h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring/50 placeholder:text-muted-foreground focus-visible:ring-3'
        />
        <Button variant='outline' onClick={reload} disabled={isLoading} aria-label='Recarregar usuários'>
          Recarregar
        </Button>
      </div>

      {isLoading && <p>Carregando usuários...</p>}

      {hasError && (
        <div className='space-y-2'>
          <p role='alert'>{errorMessage}</p>
          <Button variant='destructive' onClick={reload}>
            Tentar novamente
          </Button>
        </div>
      )}

      {isEmpty && <p>Nenhum usuário encontrado para esse filtro.</p>}

      {status === 'success' && filteredUsers.length > 0 && (
        <ul className='space-y-2' aria-label='Lista de usuários'>
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

