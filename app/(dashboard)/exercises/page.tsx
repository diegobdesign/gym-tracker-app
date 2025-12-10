'use client'

import { useState } from 'react'
import { useExercises } from '@/hooks/use-exercises'
import { ExerciseList } from '@/components/exercises/exercise-list'
import { ExerciseFilter } from '@/components/exercises/exercise-filter'
import { ExerciseSearch } from '@/components/exercises/exercise-search'
import { ExerciseFilters } from '@/lib/types/exercise.types'
import { Loader2 } from 'lucide-react'

export default function ExercisesPage() {
  const [filters, setFilters] = useState<ExerciseFilters>({})

  const { data: exercises, isLoading } = useExercises(filters)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Exercise Library</h1>
        <p className="text-muted-foreground">
          Browse and search through our comprehensive exercise database
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <ExerciseSearch
          value={filters.search || ''}
          onChange={(search) => setFilters({ ...filters, search: search || undefined })}
        />
        <ExerciseFilter filters={filters} onChange={setFilters} />
      </div>

      {isLoading ? (
        <div className="flex h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <ExerciseList exercises={exercises || []} />
      )}
    </div>
  )
}
