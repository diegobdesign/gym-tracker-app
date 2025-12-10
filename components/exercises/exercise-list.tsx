import { Exercise } from '@/lib/types/exercise.types'
import { ExerciseCard } from './exercise-card'

interface ExerciseListProps {
  exercises: Exercise[]
}

export function ExerciseList({ exercises }: ExerciseListProps) {
  if (exercises.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <p className="text-lg font-medium">No exercises found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your filters or search query
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  )
}
