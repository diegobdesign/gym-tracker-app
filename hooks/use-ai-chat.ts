'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { AIFeatureType, UserContext, ChatResponse } from '@/lib/types/ai.types'

interface SendMessageParams {
  message: string
  feature?: AIFeatureType
  context?: UserContext
  conversationHistory?: { role: string; content: string }[]
}

export function useAIChat() {
  const sendMessage = useMutation({
    mutationFn: async (params: SendMessageParams) => {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to send message')
      }

      return response.json() as Promise<ChatResponse>
    },
  })

  return {
    sendMessage: sendMessage.mutateAsync,
    isLoading: sendMessage.isPending,
    error: sendMessage.error,
  }
}

export function useUserContext() {
  return useQuery({
    queryKey: ['ai-context'],
    queryFn: async () => {
      const response = await fetch('/api/ai/context')
      if (!response.ok) {
        throw new Error('Failed to fetch context')
      }
      return response.json() as Promise<UserContext>
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
