'use client'

import { RoutineExerciseForm } from '@/lib/stores/routine-builder-store'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { GripVertical, Trash2 } from 'lucide-react'

interface RoutineExerciseItemProps {
  exercise: RoutineExerciseForm
  index: number
  onUpdate: (updates: Partial<RoutineExerciseForm>) => void
  onRemove: () => void
}

export function RoutineExerciseItem({
  exercise,
  index,
  onUpdate,
  onRemove,
}: RoutineExerciseItemProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="flex items-center gap-2">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              {index + 1}
            </span>
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              {exercise.exercise.image_url && (
                <div className="flex-shrink-0 h-16 w-16 overflow-hidden rounded border bg-gradient-to-br from-muted/25 to-muted/5">
                  <img
                    src={exercise.exercise.image_url}
                    alt={exercise.exercise.name}
                    className="h-full w-full object-contain p-0.5"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold">{exercise.exercise.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {exercise.exercise.primary_muscle_group} • {exercise.exercise.equipment}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor={`sets-${index}`}>Sets</Label>
                <Input
                  id={`sets-${index}`}
                  type="number"
                  min="1"
                  value={exercise.target_sets}
                  onChange={(e) =>
                    onUpdate({ target_sets: parseInt(e.target.value) || 1 })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`reps-${index}`}>Reps (Range)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id={`reps-${index}`}
                    type="number"
                    min="1"
                    placeholder="8"
                    value={exercise.target_reps_min || ''}
                    onChange={(e) =>
                      onUpdate({
                        target_reps_min: parseInt(e.target.value) || undefined,
                      })
                    }
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    type="number"
                    min="1"
                    placeholder="12"
                    value={exercise.target_reps_max || ''}
                    onChange={(e) =>
                      onUpdate({
                        target_reps_max: parseInt(e.target.value) || undefined,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`rest-${index}`}>Rest (seconds)</Label>
                <Input
                  id={`rest-${index}`}
                  type="number"
                  min="0"
                  step="15"
                  value={exercise.rest_period_seconds}
                  onChange={(e) =>
                    onUpdate({
                      rest_period_seconds: parseInt(e.target.value) || 90,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`notes-${index}`}>Notes (Optional)</Label>
              <Textarea
                id={`notes-${index}`}
                placeholder="Add notes about form, technique, etc."
                value={exercise.notes || ''}
                onChange={(e) => onUpdate({ notes: e.target.value })}
                rows={2}
              />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
