'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getRoutines, getRoutineById, createRoutine, updateRoutine, deleteRoutine } from '@/lib/queries/routines'
import { CreateRoutineData } from '@/lib/types/routine.types'

export function useRoutines() {
  return useQuery({
    queryKey: ['routines'],
    queryFn: getRoutines,
  })
}

export function useRoutine(id: string) {
  return useQuery({
    queryKey: ['routines', id],
    queryFn: () => getRoutineById(id),
    enabled: !!id,
  })
}

export function useCreateRoutine() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createRoutine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] })
    },
  })
}

export function useUpdateRoutine() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateRoutineData> }) =>
      updateRoutine(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] })
    },
  })
}

export function useDeleteRoutine() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteRoutine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] })
    },
  })
}
