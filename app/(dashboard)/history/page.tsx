'use client'

import { useWorkouts } from '@/hooks/use-workouts'
import { WorkoutSummaryCard } from '@/components/history/workout-summary-card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function HistoryPage() {
  const { data: workouts, isLoading } = useWorkouts()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Workout History</h1>
        <p className="text-muted-foreground">
          View your past workouts and track your progress
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : workouts && workouts.length > 0 ? (
        <div className="space-y-4">
          {workouts.map((workout) => (
            <WorkoutSummaryCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <p className="text-lg font-medium">No workouts yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Complete your first workout to see it here
            </p>
            <Button asChild className="mt-4">
              <Link href="/workout">Start Workout</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
