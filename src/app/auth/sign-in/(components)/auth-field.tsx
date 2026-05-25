import { type ReactNode } from 'react'

export const AuthField = ({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: ReactNode
  children: ReactNode
}) => {
  return (
    <div className='space-y-1'>
      <label className='text-sm' htmlFor={id}>
        {label}
      </label>
      {children}
      {error ? <p className='text-xs text-destructive'>{error}</p> : null}
    </div>
  )
}

