'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useActionState, useMemo, useState, useTransition } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { type SignInSchema, signInSchema, type SignUpSchema, signUpSchema } from '@/utils/auth-form-schema'
import { formatCpf } from '@/utils/format-cpf'

import { type AuthActionState, signInAction, signUpAction } from '../actions'

const inputStyle =
  'h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring/50 focus-visible:ring-3'
const initialAuthActionState: AuthActionState = {
  status: 'idle',
  message: '',
}

export const AuthPanel = () => {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in')

  const [isSubmitting, startTransition] = useTransition()
  const [signInState, signInDispatch] = useActionState(signInAction, initialAuthActionState)
  const [signUpState, signUpDispatch] = useActionState(signUpAction, initialAuthActionState)

  const signInForm = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const signUpForm = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      password: '',
    },
  })
  const cpfValue = useWatch({
    control: signUpForm.control,
    name: 'cpf',
  })

  const currentErrorMessage = useMemo(() => {
    return mode === 'sign-in' ? signInState.message : signUpState.message
  }, [mode, signInState.message, signUpState.message])

  const handleSignInSubmit = signInForm.handleSubmit(values => {
    startTransition(() => {
      signInDispatch(values)
    })
  })

  const handleSignUpSubmit = signUpForm.handleSubmit(values => {
    startTransition(() => {
      signUpDispatch(values)
    })
  })

  return (
    <section className='w-full max-w-md space-y-4 rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm'>
      <header className='space-y-1'>
        <h1 className='text-2xl font-semibold'>Admin Access</h1>
        <p className='text-sm text-muted-foreground'>Use email/password to access the protected dashboard.</p>
      </header>

      <div className='grid grid-cols-2 gap-2'>
        <Button type='button' variant={mode === 'sign-in' ? 'default' : 'outline'} onClick={() => setMode('sign-in')}>
          Sign in
        </Button>
        <Button type='button' variant={mode === 'sign-up' ? 'default' : 'outline'} onClick={() => setMode('sign-up')}>
          Sign up
        </Button>
      </div>

      {mode === 'sign-in' && (
        <form className='space-y-3' onSubmit={handleSignInSubmit}>
          <div className='space-y-1'>
            <label className='text-sm' htmlFor='sign-in-email'>
              Email
            </label>
            <input id='sign-in-email' className={inputStyle} {...signInForm.register('email')} placeholder='admin@company.com' />
            {signInForm.formState.errors.email && (
              <p className='text-xs text-destructive'>{signInForm.formState.errors.email.message}</p>
            )}
          </div>

          <div className='space-y-1'>
            <label className='text-sm' htmlFor='sign-in-password'>
              Password
            </label>
            <input
              id='sign-in-password'
              className={inputStyle}
              type='password'
              {...signInForm.register('password')}
              placeholder='********'
            />
            {signInForm.formState.errors.password && (
              <p className='text-xs text-destructive'>{signInForm.formState.errors.password.message}</p>
            )}
          </div>

          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      )}

      {mode === 'sign-up' && (
        <form className='space-y-3' onSubmit={handleSignUpSubmit}>
          <div className='space-y-1'>
            <label className='text-sm' htmlFor='sign-up-name'>
              Name
            </label>
            <input id='sign-up-name' className={inputStyle} {...signUpForm.register('name')} placeholder='Jane Doe' />
            {signUpForm.formState.errors.name && (
              <p className='text-xs text-destructive'>{signUpForm.formState.errors.name.message}</p>
            )}
          </div>

          <div className='space-y-1'>
            <label className='text-sm' htmlFor='sign-up-email'>
              Email
            </label>
            <input id='sign-up-email' className={inputStyle} {...signUpForm.register('email')} placeholder='jane@company.com' />
            {signUpForm.formState.errors.email && (
              <p className='text-xs text-destructive'>{signUpForm.formState.errors.email.message}</p>
            )}
          </div>

          <div className='space-y-1'>
            <label className='text-sm' htmlFor='sign-up-cpf'>
              CPF
            </label>
            <input
              id='sign-up-cpf'
              className={inputStyle}
              value={cpfValue || ''}
              onChange={event => {
                signUpForm.setValue('cpf', formatCpf(event.target.value), {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }}
              placeholder='000.000.000-00'
            />
            {signUpForm.formState.errors.cpf && (
              <p className='text-xs text-destructive'>{signUpForm.formState.errors.cpf.message}</p>
            )}
          </div>

          <div className='space-y-1'>
            <label className='text-sm' htmlFor='sign-up-password'>
              Password
            </label>
            <input
              id='sign-up-password'
              className={inputStyle}
              type='password'
              {...signUpForm.register('password')}
              placeholder='********'
            />
            {signUpForm.formState.errors.password && (
              <p className='text-xs text-destructive'>{signUpForm.formState.errors.password.message}</p>
            )}
          </div>

          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      )}

      {currentErrorMessage && <p role='alert' className='text-sm text-destructive'>{currentErrorMessage}</p>}
    </section>
  )
}
