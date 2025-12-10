'use client'

import { useParams, useRouter } from 'next/navigation'
import { useRoutine, useDeleteRoutine } from '@/hooks/use-routines'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Play, Trash2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
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

export default function RoutineDetailPage() {
  const params = useParams()
  const router = useRouter()
  const routineId = params.id as string

  const { data: routine, isLoading } = useRoutine(routineId)
  const { mutate: deleteRoutine, isPending: isDeleting } = useDeleteRoutine()

  const handleDelete = () => {
    deleteRoutine(routineId, {
      onSuccess: () => {
        toast.success('Routine deleted successfully')
        router.push('/routines')
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to delete routine')
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

  if (!routine) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/routines">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Routine Not Found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/routines">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{routine.name}</h1>
          {routine.description && (
            <p className="mt-1 text-muted-foreground">{routine.description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/workout/routine/${routine.id}`}>
              <Play className="mr-2 h-4 w-4" />
              Start Workout
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon" disabled={isDeleting}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Routine?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete "{routine.name}" and all its exercises.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Exercises ({routine.routine_exercises.length})
        </h2>

        {routine.routine_exercises.length === 0 ? (
          <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground">No exercises in this routine</p>
          </div>
        ) : (
          <div className="space-y-4">
            {routine.routine_exercises.map((routineExercise, index) => (
              <Card key={routineExercise.id}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <CardTitle>{routineExercise.exercise?.name}</CardTitle>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="outline" className="capitalize">
                          {routineExercise.exercise?.primary_muscle_group}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {routineExercise.exercise?.equipment}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Sets</p>
                      <p className="text-lg font-semibold">
                        {routineExercise.target_sets}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reps</p>
                      <p className="text-lg font-semibold">
                        {routineExercise.target_reps_min && routineExercise.target_reps_max
                          ? `${routineExercise.target_reps_min}-${routineExercise.target_reps_max}`
                          : routineExercise.target_reps_min || routineExercise.target_reps_max || '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rest</p>
                      <p className="text-lg font-semibold">
                        {routineExercise.rest_period_seconds}s
                      </p>
                    </div>
                  </div>
                  {routineExercise.notes && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">Notes</p>
                      <p className="mt-1 text-sm">{routineExercise.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
