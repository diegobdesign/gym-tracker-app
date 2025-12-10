import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Dumbbell, TrendingUp, Target, BarChart3 } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-8 flex items-center justify-center">
          <div className="rounded-full bg-primary/10 p-6">
            <Dumbbell className="h-16 w-16 text-primary" />
          </div>
        </div>

        <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          Gym Tracker
        </h1>

        <p className="mb-8 max-w-2xl text-xl text-muted-foreground sm:text-2xl">
          Track your workouts, monitor your progress, and achieve your fitness goals
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="text-lg">
            <Link href="/sign-up">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t bg-background/50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Everything you need to track your fitness journey
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Dumbbell className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Exercise Library</h3>
              <p className="text-muted-foreground">
                Access 50+ exercises with instructions and demos
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Custom Routines</h3>
              <p className="text-muted-foreground">
                Build personalized workout routines that fit your goals
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your weight, strength, and performance over time
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Visual Analytics</h3>
              <p className="text-muted-foreground">
                See your progress with beautiful charts and insights
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
