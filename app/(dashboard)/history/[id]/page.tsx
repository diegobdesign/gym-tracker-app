'use client'

import { useParams, useRouter } from 'next/navigation'
import { useWorkout, useDeleteWorkout } from '@/hooks/use-workouts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Loader2, Calendar, Clock, Dumbbell, Trash2, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

export default function WorkoutDetailPage() {
  const params = useParams()
  const router = useRouter()
  const workoutId = params.id as string

  const { data: workout, isLoading } = useWorkout(workoutId)
  const { mutate: deleteWorkout, isPending: isDeleting } = useDeleteWorkout()

  const handleDelete = () => {
    deleteWorkout(workoutId, {
      onSuccess: () => {
        toast.success('Workout deleted')
        router.push('/history')
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to delete workout')
      },
    })
  }

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!workout) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Workout Not Found</h1>
        <p className="text-muted-foreground">
          The workout you're looking for doesn't exist.
        </p>
        <Button onClick={() => router.push('/history')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to History
        </Button>
      </div>
    )
  }

  const workoutDate = new Date(workout.started_at)
  const formattedDate = format(workoutDate, 'EEEE, MMMM d, yyyy')
  const formattedTime = format(workoutDate, 'h:mm a')

  // Calculate total volume and sets
  let totalVolume = 0
  let totalSets = 0

  workout.workout_exercises.forEach((we) => {
    if (we.sets) {
      we.sets.forEach((set) => {
        totalSets++
        if (set.weight) {
          totalVolume += set.weight * set.reps
        }
      })
    }
  })

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-start justify-between">
        <Button variant="ghost" onClick={() => router.push('/history')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to History
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" disabled={isDeleting}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Workout</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this workout? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div>
        <h1 className="text-3xl font-bold">{workout.name}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formattedTime}
          </Badge>
          {workout.duration_minutes && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Dumbbell className="h-3 w-3" />
              {workout.duration_minutes} min
            </Badge>
          )}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Exercises
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{workout.workout_exercises.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalSets}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalVolume.toFixed(0)} kg</p>
          </CardContent>
        </Card>
      </div>

      {/* Exercises */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Exercises</h2>
        {workout.workout_exercises
          .sort((a, b) => a.order_index - b.order_index)
          .map((workoutExercise, index) => (
            <Card key={workoutExercise.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{index + 1}</Badge>
                      <CardTitle className="text-lg">
                        {workoutExercise.exercise?.name || 'Unknown Exercise'}
                      </CardTitle>
                    </div>
                    {workoutExercise.exercise && (
                      <div className="mt-2 flex gap-2">
                        <Badge variant="outline" className="capitalize">
                          {workoutExercise.exercise.primary_muscle_group}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {workoutExercise.exercise.equipment}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {workoutExercise.sets && workoutExercise.sets.length > 0 ? (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Sets</h3>
                    <div className="space-y-2">
                      {workoutExercise.sets
                        .sort((a, b) => a.set_number - b.set_number)
                        .map((set) => (
                          <div
                            key={set.id}
                            className="flex items-center justify-between rounded-lg border p-3"
                          >
                            <div className="flex items-center gap-4">
                              <span className="font-medium">Set {set.set_number}</span>
                              <span className="text-muted-foreground">
                                {set.weight ? `${set.weight} kg` : 'Bodyweight'} × {set.reps} reps
                              </span>
                              {set.rpe && (
                                <Badge variant="secondary">RPE {set.rpe}</Badge>
                              )}
                              {set.is_warmup && (
                                <Badge variant="outline">Warmup</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No sets logged</p>
                )}
              </CardContent>
            </Card>
          ))}
      </div>

      {workout.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{workout.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
