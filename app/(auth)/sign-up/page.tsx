import { SignUpForm } from '@/components/auth/sign-up-form'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Get Started</h1>
          <p className="mt-2 text-muted-foreground">
            Create your account and start your fitness journey today
          </p>
        </div>

        <div className="rounded-lg border bg-card p-8 shadow-lg">
          <SignUpForm />
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/sign-in" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
