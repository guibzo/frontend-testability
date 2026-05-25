'use client'

import { useCallback, useEffect, useState } from 'react'

import { type User } from '../domain/users'
import { fetchUsers } from '../services/users.service'

type UsersStatus = 'idle' | 'loading' | 'success' | 'error'

const ABORT_ERROR_NAME = 'AbortError'

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  return 'Erro inesperado ao carregar usuários.'
}

const isAbortError = (error: unknown) => {
  return error instanceof Error && error.name === ABORT_ERROR_NAME
}

export const useUsers = ({ endpoint }: { endpoint?: string } = {}) => {
  const [users, setUsers] = useState<User[]>([])
  const [status, setStatus] = useState<UsersStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const loadUsers = useCallback(
    async ({ signal }: { signal?: AbortSignal } = {}) => {
      setStatus('loading')
      setErrorMessage('')

      try {
        const response = await fetchUsers({ endpoint, signal })
        setUsers(response)
        setStatus('success')
      } catch (error) {
        if (isAbortError(error)) return

        setStatus('error')
        setErrorMessage(getErrorMessage(error))
      }
    },
    [endpoint],
  )

  useEffect(() => {
    const controller = new AbortController()

    queueMicrotask(() => {
      void loadUsers({ signal: controller.signal })
    })

    return () => {
      controller.abort()
    }
  }, [loadUsers])

  const reload = useCallback(() => {
    void loadUsers()
  }, [loadUsers])

  return {
    users,
    status,
    errorMessage,
    isLoading: status === 'loading',
    hasError: status === 'error',
    reload,
  }
}
