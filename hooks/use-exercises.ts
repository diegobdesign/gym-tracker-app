'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getExercises, getExerciseById, createCustomExercise, deleteExercise } from '@/lib/queries/exercises'
import { Exercise, ExerciseFilters } from '@/lib/types/exercise.types'

export function useExercises(filters?: ExerciseFilters) {
  return useQuery({
    queryKey: ['exercises', filters],
    queryFn: () => getExercises(filters),
  })
}

export function useExercise(id: string) {
  return useQuery({
    queryKey: ['exercises', id],
    queryFn: () => getExerciseById(id),
    enabled: !!id,
  })
}

export function useCreateExercise() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCustomExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] })
    },
  })
}

export function useDeleteExercise() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] })
    },
  })
}
