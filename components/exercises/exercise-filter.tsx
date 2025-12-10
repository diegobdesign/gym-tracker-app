'use client'

import { ExerciseFilters, MuscleGroup, Equipment, Difficulty } from '@/lib/types/exercise.types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface ExerciseFilterProps {
  filters: ExerciseFilters
  onChange: (filters: ExerciseFilters) => void
}

const muscleGroups: MuscleGroup[] = ['chest', 'back', 'legs', 'shoulders', 'biceps', 'triceps', 'core', 'cardio']
const equipmentTypes: Equipment[] = ['barbell', 'dumbbells', 'machine', 'cable', 'bodyweight', 'other']
const difficulties: Difficulty[] = ['beginner', 'intermediate', 'advanced']

export function ExerciseFilter({ filters, onChange }: ExerciseFilterProps) {
  const hasFilters = filters.muscle_group || filters.equipment || filters.difficulty

  const clearFilters = () => {
    onChange({})
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        value={filters.muscle_group || 'all'}
        onValueChange={(value) =>
          onChange({ ...filters, muscle_group: value === 'all' ? undefined : value as MuscleGroup })
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Muscle Group" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Muscles</SelectItem>
          {muscleGroups.map((muscle) => (
            <SelectItem key={muscle} value={muscle} className="capitalize">
              {muscle}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.equipment || 'all'}
        onValueChange={(value) =>
          onChange({ ...filters, equipment: value === 'all' ? undefined : value as Equipment })
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Equipment" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Equipment</SelectItem>
          {equipmentTypes.map((equip) => (
            <SelectItem key={equip} value={equip} className="capitalize">
              {equip}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.difficulty || 'all'}
        onValueChange={(value) =>
          onChange({ ...filters, difficulty: value === 'all' ? undefined : value as Difficulty })
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          {difficulties.map((diff) => (
            <SelectItem key={diff} value={diff} className="capitalize">
              {diff}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="mr-1 h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  )
}
