'use client'

import { useState } from 'react'
import { useWorkoutStore } from '@/lib/stores/workout-store'
import { useCreateWorkout } from '@/hooks/use-workouts'
import { SetLogger } from './set-logger'
import { RestTimer } from './rest-timer'
import { WorkoutCompletionModal } from '@/components/celebrations/workout-completion-modal'
import { MotivationalMessage } from '@/components/shared/motivational-message'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function WorkoutSession() {
  const router = useRouter()
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [completionData, setCompletionData] = useState<{
    totalSets: number
    duration?: number
  } | null>(null)

  const {
    routineId,
    name,
    startedAt,
    exercises,
    currentExerciseIndex,
    restTimerEndTime,
    addSet,
    updateSet,
    removeSet,
    setCurrentExercise,
    startRestTimer,
    reset,
  } = useWorkoutStore()

  const { mutate: saveWorkout, isPending } = useCreateWorkout()

  const currentExercise = exercises[currentExerciseIndex]

  const handleComplete = () => {
    if (!startedAt) return

    // Check if at least one set is logged
    const hasSets = exercises.some((ex) => ex.sets.length > 0)
    if (!hasSets) {
      toast.error('Please log at least one set before completing')
      return
    }

    // Calculate stats
    const totalSets = exercises.reduce((sum, ex) => sum + ex.sets.length, 0)
    const duration = Math.round(
      (Date.now() - new Date(startedAt).getTime()) / 60000
    )

    saveWorkout(
      {
        routine_id: routineId,
        name,
        started_at: startedAt,
        exercises: exercises
          .filter((ex) => ex.sets.length > 0)
          .map((ex) => ({
            exercise_id: ex.exercise.id,
            order_index: ex.order_index,
            sets: ex.sets,
          })),
      },
      {
        onSuccess: () => {
          // Show celebration modal instead of toast
          setCompletionData({ totalSets, duration })
          setShowCompletionModal(true)
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to save workout')
        },
      }
    )
  }

  const handleModalClose = () => {
    setShowCompletionModal(false)
    reset()
    // Modal buttons will handle navigation
  }

  if (!currentExercise) {
    return <div>No exercises in this workout</div>
  }

  return (
    <>
      <div className="space-y-6">
        {restTimerEndTime && <RestTimer endTime={restTimerEndTime} />}

        <MotivationalMessage />

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm text-muted-foreground">
              Exercise {currentExerciseIndex + 1} of {exercises.length}
            </p>
          </div>
          <Button onClick={handleComplete} disabled={isPending} size="lg">
            <Check className="mr-2 h-4 w-4" />
            {isPending ? 'Saving...' : 'Complete Workout'}
          </Button>
        </div>

        {/* Exercise navigation */}
        <div className="flex flex-wrap gap-2">
          {exercises.map((ex, index) => {
            const isActive = index === currentExerciseIndex
            const hasProgress = ex.sets.length > 0

            return (
              <Button
                key={index}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentExercise(index)}
                className="relative"
              >
                {index + 1}
                {hasProgress && (
                  <Badge
                    variant="secondary"
                    className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {ex.sets.length}
                  </Badge>
                )}
              </Button>
            )
          })}
        </div>

        <SetLogger
          exercise={currentExercise}
          exerciseIndex={currentExerciseIndex}
          onAddSet={(set) => addSet(currentExerciseIndex, set)}
          onUpdateSet={(setIndex, updates) =>
            updateSet(currentExerciseIndex, setIndex, updates)
          }
          onRemoveSet={(setIndex) => removeSet(currentExerciseIndex, setIndex)}
          onStartRestTimer={startRestTimer}
        />

        {/* Quick navigation */}
        <div className="flex gap-2">
          {currentExerciseIndex > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentExercise(currentExerciseIndex - 1)}
            >
              Previous Exercise
            </Button>
          )}
          {currentExerciseIndex < exercises.length - 1 && (
            <Button
              variant="outline"
              onClick={() => setCurrentExercise(currentExerciseIndex + 1)}
              className="ml-auto"
            >
              Next Exercise
            </Button>
          )}
        </div>
      </div>

      {/* Completion Modal */}
      <WorkoutCompletionModal
        isOpen={showCompletionModal}
        onClose={handleModalClose}
        workoutName={name}
        totalSets={completionData?.totalSets || 0}
        duration={completionData?.duration}
      />
    </>
  )
}
