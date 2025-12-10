'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useExercises } from '@/hooks/use-exercises'
import { ExerciseSearch } from '@/components/exercises/exercise-search'
import { ExerciseFilter } from '@/components/exercises/exercise-filter'
import { ExerciseFilters, Exercise } from '@/lib/types/exercise.types'
import { Loader2, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ExerciseSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectExercise: (exercise: Exercise) => void
  selectedExerciseIds: string[]
}

export function ExerciseSelector({
  open,
  onOpenChange,
  onSelectExercise,
  selectedExerciseIds,
}: ExerciseSelectorProps) {
  const [filters, setFilters] = useState<ExerciseFilters>({})
  const { data: exercises, isLoading } = useExercises(filters)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add Exercise to Routine</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <ExerciseSearch
            value={filters.search || ''}
            onChange={(search) => setFilters({ ...filters, search: search || undefined })}
          />
          <ExerciseFilter filters={filters} onChange={setFilters} />
        </div>

        <ScrollArea className="h-[400px] pr-4">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-2">
              {exercises?.map((exercise) => {
                const isSelected = selectedExerciseIds.includes(exercise.id)
                return (
                  <div
                    key={exercise.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{exercise.name}</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="outline" className="capitalize">
                          {exercise.primary_muscle_group}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {exercise.equipment}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onSelectExercise(exercise)}
                      disabled={isSelected}
                    >
                      {isSelected ? (
                        'Added'
                      ) : (
                        <>
                          <Plus className="mr-1 h-4 w-4" />
                          Add
                        </>
                      )}
                    </Button>
                  </div>
                )
              })}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
