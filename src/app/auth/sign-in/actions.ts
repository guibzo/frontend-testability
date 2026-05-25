'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { type SignInSchema, signInSchema, type SignUpSchema, signUpSchema } from '@/app/auth/sign-in/schemas'
import { auth } from '@/lib/auth'

export type AuthActionState = {
  status: 'idle' | 'error'
  message: string
}

const parseErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) return error.message
  return 'Unable to authenticate user.'
}

export const signInAction = async (_previousState: AuthActionState, values: SignInSchema): Promise<AuthActionState> => {
  const parsedData = signInSchema.safeParse(values)

  if (!parsedData.success) {
    return {
      status: 'error',
      message: parsedData.error.issues[0]?.message || 'Invalid form data.',
    }
  }

  try {
    const requestHeaders = await headers()
    await auth.api.signInEmail({
      body: parsedData.data,
      headers: requestHeaders,
    })
  } catch (error) {
    return {
      status: 'error',
      message: parseErrorMessage(error),
    }
  }

  redirect('/admin')
}

export const signUpAction = async (_previousState: AuthActionState, values: SignUpSchema): Promise<AuthActionState> => {
  const parsedData = signUpSchema.safeParse(values)

  if (!parsedData.success) {
    return {
      status: 'error',
      message: parsedData.error.issues[0]?.message || 'Invalid form data.',
    }
  }

  const { name, email, password } = parsedData.data

  try {
    const requestHeaders = await headers()
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: requestHeaders,
    })
  } catch (error) {
    return {
      status: 'error',
      message: parseErrorMessage(error),
    }
  }

  redirect('/admin')
}

export const signOutAction = async () => {
  await auth.api.signOut({
    headers: await headers(),
  })
  redirect('/auth/sign-in')
}
