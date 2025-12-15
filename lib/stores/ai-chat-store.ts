import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AIMessage, AIFeatureType } from '@/lib/types/ai.types'

interface AIChatState {
  messages: AIMessage[]
  currentFeature: AIFeatureType | null
  isOpen: boolean
  isLoading: boolean

  // Actions
  addMessage: (message: Omit<AIMessage, 'id' | 'timestamp'>) => void
  setFeature: (feature: AIFeatureType | null) => void
  setOpen: (open: boolean) => void
  setLoading: (loading: boolean) => void
  clearMessages: () => void
  removeMessage: (id: string) => void
}

export const useAIChatStore = create<AIChatState>()(
  persist(
    (set) => ({
      messages: [],
      currentFeature: null,
      isOpen: false,
      isLoading: false,

      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
              timestamp: Date.now(),
            },
          ],
        })),

      setFeature: (feature) =>
        set({ currentFeature: feature }),

      setOpen: (open) =>
        set({ isOpen: open }),

      setLoading: (loading) =>
        set({ isLoading: loading }),

      clearMessages: () =>
        set({ messages: [], currentFeature: null }),

      removeMessage: (id) =>
        set((state) => ({
          messages: state.messages.filter((m) => m.id !== id),
        })),
    }),
    {
      name: 'ai-chat-storage',
      partialize: (state) => ({
        messages: state.messages.slice(-50), // Keep last 50 messages
      }),
    }
  )
)
