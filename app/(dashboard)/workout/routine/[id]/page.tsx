'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useRoutine } from '@/hooks/use-routines'
import { useWorkoutStore } from '@/lib/stores/workout-store'
import { WorkoutSession } from '@/components/workout/workout-session'
import { Loader2 } from 'lucide-react'

export default function WorkoutFromRoutinePage() {
  const params = useParams()
  const routineId = params.id as string

  const { data: routine, isLoading } = useRoutine(routineId)
  const { startedAt, startWorkout } = useWorkoutStore()

  useEffect(() => {
    if (routine && !startedAt) {
      // Convert routine exercises to workout exercises
      const workoutExercises = routine.routine_exercises.map((re) => ({
        exercise: re.exercise!,
        order_index: re.order_index,
        sets: [],
        notes: re.notes,
      }))

      startWorkout(routineId, routine.name, workoutExercises)
    }
  }, [routine, startedAt, routineId, startWorkout])

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!routine) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Routine Not Found</h1>
        <p className="text-muted-foreground">
          The routine you're looking for doesn't exist.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl">
      <WorkoutSession />
    </div>
  )
}
