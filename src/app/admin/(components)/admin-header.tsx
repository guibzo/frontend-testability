import { signOutAction } from '@/app/auth/sign-in/actions'
import { Button } from '@/components/ui/button'

export const AdminHeader = ({ email }: { email: string }) => {
  return (
    <header className='flex flex-col gap-4 rounded-lg border border-border bg-card p-4 text-card-foreground md:flex-row md:items-center md:justify-between'>
      <div>
        <h1 className='text-2xl font-semibold'>Admin Dashboard</h1>
        <p className='text-sm text-muted-foreground'>Authenticated as {email}</p>
      </div>

      <form action={signOutAction}>
        <Button type='submit' variant='outline'>
          Sign out
        </Button>
      </form>
    </header>
  )
}

