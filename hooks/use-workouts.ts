'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getWorkouts, getWorkoutById, createWorkout, deleteWorkout } from '@/lib/queries/workouts'
import { CreateWorkoutData } from '@/lib/types/workout.types'

export function useWorkouts() {
  return useQuery({
    queryKey: ['workouts'],
    queryFn: getWorkouts,
  })
}

export function useWorkout(id: string) {
  return useQuery({
    queryKey: ['workouts', id],
    queryFn: () => getWorkoutById(id),
    enabled: !!id,
  })
}

export function useCreateWorkout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
    },
  })
}

export function useDeleteWorkout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
    },
  })
}
