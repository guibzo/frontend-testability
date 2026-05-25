'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useActionState, useMemo, useState, useTransition } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { type SignInSchema, signInSchema, type SignUpSchema, signUpSchema } from '@/app/auth/sign-in/schemas'
import { formatCpf } from '@/utils/format-cpf'

import { type AuthActionState, signInAction, signUpAction } from '../actions'
import { AuthField } from './auth-field'
import { AuthInput } from './auth-input'
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
    <section data-testid='auth-panel' className='w-full max-w-md space-y-4 rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm'>
      <header className='space-y-1'>
        <h1 className='text-2xl font-semibold'>Admin Access</h1>
        <p className='text-sm text-muted-foreground'>Use email/password to access the protected dashboard.</p>
      </header>

      <div className='grid grid-cols-2 gap-2'>
        <Button
          data-testid='auth-tab-sign-in'
          type='button'
          variant={mode === 'sign-in' ? 'default' : 'outline'}
          onClick={() => setMode('sign-in')}
        >
          Sign in
        </Button>
        <Button
          data-testid='auth-tab-sign-up'
          type='button'
          variant={mode === 'sign-up' ? 'default' : 'outline'}
          onClick={() => setMode('sign-up')}
        >
          Sign up
        </Button>
      </div>

      {mode === 'sign-in' && (
        <form className='space-y-3' onSubmit={handleSignInSubmit}>
          <AuthField id='sign-in-email' label='Email' error={signInForm.formState.errors.email?.message}>
            <AuthInput
              data-testid='auth-sign-in-email'
              id='sign-in-email'
              {...signInForm.register('email')}
              placeholder='admin@company.com'
            />
          </AuthField>

          <AuthField id='sign-in-password' label='Password' error={signInForm.formState.errors.password?.message}>
            <AuthInput
              id='sign-in-password'
              data-testid='auth-sign-in-password'
              type='password'
              {...signInForm.register('password')}
              placeholder='********'
            />
          </AuthField>

          <Button data-testid='auth-sign-in-submit' type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      )}

      {mode === 'sign-up' && (
        <form className='space-y-3' onSubmit={handleSignUpSubmit}>
          <AuthField id='sign-up-name' label='Name' error={signUpForm.formState.errors.name?.message}>
            <AuthInput
              data-testid='auth-sign-up-name'
              id='sign-up-name'
              {...signUpForm.register('name')}
              placeholder='Jane Doe'
            />
          </AuthField>

          <AuthField id='sign-up-email' label='Email' error={signUpForm.formState.errors.email?.message}>
            <AuthInput
              data-testid='auth-sign-up-email'
              id='sign-up-email'
              {...signUpForm.register('email')}
              placeholder='jane@company.com'
            />
          </AuthField>

          <AuthField id='sign-up-cpf' label='CPF' error={signUpForm.formState.errors.cpf?.message}>
            <AuthInput
              id='sign-up-cpf'
              data-testid='auth-sign-up-cpf'
              value={cpfValue || ''}
              onChange={event => {
                signUpForm.setValue('cpf', formatCpf(event.target.value), {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }}
              placeholder='000.000.000-00'
            />
          </AuthField>

          <AuthField id='sign-up-password' label='Password' error={signUpForm.formState.errors.password?.message}>
            <AuthInput
              id='sign-up-password'
              data-testid='auth-sign-up-password'
              type='password'
              {...signUpForm.register('password')}
              placeholder='********'
            />
          </AuthField>

          <Button data-testid='auth-sign-up-submit' type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      )}

      {currentErrorMessage && (
        <p data-testid='auth-error' role='alert' className='text-sm text-destructive'>
          {currentErrorMessage}
        </p>
      )}
    </section>
  )
}
