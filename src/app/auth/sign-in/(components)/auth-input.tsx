import { type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

type AuthInputProps = InputHTMLAttributes<HTMLInputElement>

export const AuthInput = ({ className, ...props }: AuthInputProps) => {
  return (
    <input
      className={cn(
        'h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring/50 focus-visible:ring-3',
        className,
      )}
      {...props}
    />
  )
}

