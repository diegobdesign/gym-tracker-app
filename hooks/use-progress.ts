'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getWeightLogs, createWeightLog, deleteWeightLog } from '@/lib/queries/progress'
import { CreateWeightLogData } from '@/lib/types/progress.types'

export function useWeightLogs() {
  return useQuery({
    queryKey: ['weight-logs'],
    queryFn: getWeightLogs,
  })
}

export function useCreateWeightLog() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createWeightLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weight-logs'] })
    },
  })
}

export function useDeleteWeightLog() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteWeightLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weight-logs'] })
    },
  })
}
