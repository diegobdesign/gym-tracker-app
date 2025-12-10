'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRoutineBuilderStore } from '@/lib/stores/routine-builder-store'
import { useCreateRoutine } from '@/hooks/use-routines'
import { ExerciseSelector } from '@/components/routines/exercise-selector'
import { RoutineExerciseItem } from '@/components/routines/routine-exercise-item'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Plus, Save } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function NewRoutinePage() {
  const router = useRouter()
  const [selectorOpen, setSelectorOpen] = useState(false)

  const {
    name,
    description,
    exercises,
    setName,
    setDescription,
    addExercise,
    removeExercise,
    updateExercise,
    reset,
  } = useRoutineBuilderStore()

  const { mutate: createRoutine, isPending } = useCreateRoutine()

  const handleSave = () => {
    if (!name.trim()) {
      toast.error('Please enter a routine name')
      return
    }

    if (exercises.length === 0) {
      toast.error('Please add at least one exercise')
      return
    }

    createRoutine(
      {
        name,
        description,
        exercises: exercises.map((ex) => ({
          exercise_id: ex.exercise.id,
          order_index: ex.order_index,
          target_sets: ex.target_sets,
          target_reps_min: ex.target_reps_min,
          target_reps_max: ex.target_reps_max,
          rest_period_seconds: ex.rest_period_seconds,
          notes: ex.notes,
        })),
      },
      {
        onSuccess: () => {
          toast.success('Routine created successfully!')
          reset()
          router.push('/routines')
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to create routine')
        },
      }
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
          <h1 className="text-3xl font-bold">Create Routine</h1>
          <p className="text-muted-foreground">
            Build a custom workout routine with your chosen exercises
          </p>
        </div>
        <Button onClick={handleSave} disabled={isPending}>
          <Save className="mr-2 h-4 w-4" />
          {isPending ? 'Saving...' : 'Save Routine'}
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Routine Name *</Label>
          <Input
            id="name"
            placeholder="e.g., Push Day, Upper Body A"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Describe your routine..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Exercises</h2>
          <Button onClick={() => setSelectorOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Exercise
          </Button>
        </div>

        {exercises.length === 0 ? (
          <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <p className="font-medium">No exercises added</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add exercises to build your routine
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <RoutineExerciseItem
                key={`${exercise.exercise.id}-${index}`}
                exercise={exercise}
                index={index}
                onUpdate={(updates) => updateExercise(index, updates)}
                onRemove={() => removeExercise(index)}
              />
            ))}
          </div>
        )}
      </div>

      <ExerciseSelector
        open={selectorOpen}
        onOpenChange={setSelectorOpen}
        onSelectExercise={(exercise) => {
          addExercise(exercise)
          toast.success(`${exercise.name} added to routine`)
        }}
        selectedExerciseIds={exercises.map((ex) => ex.exercise.id)}
      />
    </div>
  )
}
