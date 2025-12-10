'use client'

import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { WorkoutExercise, WorkoutSetInput } from '@/lib/stores/workout-store'
import { Trash2 } from 'lucide-react'

interface SetLoggerProps {
  exercise: WorkoutExercise
  exerciseIndex: number
  onAddSet: (set: WorkoutSetInput) => void
  onUpdateSet: (setIndex: number, updates: Partial<WorkoutSetInput>) => void
  onRemoveSet: (setIndex: number) => void
  onStartRestTimer: (seconds: number) => void
}

export function SetLogger({
  exercise,
  exerciseIndex,
  onAddSet,
  onUpdateSet,
  onRemoveSet,
  onStartRestTimer,
}: SetLoggerProps) {
  const [weight, setWeight] = useState<string>('')
  const [reps, setReps] = useState<string>('')

  const handleAddSet = () => {
    if (!reps || parseInt(reps) <= 0) {
      return
    }

    const newSet: WorkoutSetInput = {
      set_number: exercise.sets.length + 1,
      weight: weight ? parseFloat(weight) : undefined,
      reps: parseInt(reps),
      is_warmup: false,
    }

    onAddSet(newSet)
    setWeight('')
    setReps('')

    // Mini confetti celebration for set completion
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#3B82F6', '#10B981'],
      disableForReducedMotion: true,
    })

    // Auto-start rest timer (90 seconds default)
    onStartRestTimer(90)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            {exercise.exercise.image_url && (
              <div className="flex-shrink-0 h-24 w-24 overflow-hidden rounded-lg border bg-gradient-to-br from-muted/30 via-muted/15 to-transparent">
                <img
                  src={exercise.exercise.image_url}
                  alt={exercise.exercise.name}
                  className="h-full w-full object-contain p-0.5"
                />
              </div>
            )}
            <div className="flex-1">
              <CardTitle>{exercise.exercise.name}</CardTitle>
              <div className="mt-2 flex gap-2">
                <Badge variant="outline" className="capitalize">
                  {exercise.exercise.primary_muscle_group}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {exercise.exercise.equipment}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Previous sets */}
          {exercise.sets.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Completed Sets</h3>
              <div className="space-y-2">
                {exercise.sets.map((set, index) => (
                  <div
                    key={index}
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
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveSet(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add new set */}
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-medium">Log Set {exercise.sets.length + 1}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`weight-${exerciseIndex}`}>
                  Weight (kg) - Optional
                </Label>
                <Input
                  id={`weight-${exerciseIndex}`}
                  type="number"
                  step="0.5"
                  placeholder="e.g., 50"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`reps-${exerciseIndex}`}>Reps *</Label>
                <Input
                  id={`reps-${exerciseIndex}`}
                  type="number"
                  min="1"
                  placeholder="e.g., 10"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleAddSet} className="w-full" disabled={!reps}>
              Add Set
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
