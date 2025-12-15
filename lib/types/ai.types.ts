export type AIMessageRole = 'user' | 'assistant' | 'system'

export interface AIMessage {
  id: string
  role: AIMessageRole
  content: string
  timestamp: number
  feature?: AIFeatureType
}

export type AIFeatureType =
  | 'routine-suggestion'
  | 'workout-analysis'
  | 'form-tips'
  | 'general-qa'

export interface AIFeatureConfig {
  type: AIFeatureType
  label: string
  description: string
  icon: string
  systemPrompt: string
  contextRequired: ('profile' | 'workouts' | 'exercises' | 'routines')[]
}

export interface UserContext {
  profile: {
    experience_level: string
    primary_goal: string
    current_weight?: number
    height?: number
  }
  recentWorkouts: {
    name: string
    date: string
    exercises: { name: string; sets: number; reps: number }[]
  }[]
  exercises: {
    name: string
    muscle_group: string
    difficulty: string
  }[]
  routines: {
    name: string
    exercises: string[]
  }[]
}

export interface ChatRequest {
  message: string
  feature?: AIFeatureType
  context?: UserContext
  conversationHistory?: { role: string; content: string }[]
}

export interface ChatResponse {
  message: string
  messageId: string
}
