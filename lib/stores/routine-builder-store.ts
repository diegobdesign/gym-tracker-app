import { create } from 'zustand'
import { Exercise } from '@/lib/types/exercise.types'

export interface RoutineExerciseForm {
  exercise: Exercise
  order_index: number
  target_sets: number
  target_reps_min?: number
  target_reps_max?: number
  rest_period_seconds: number
  notes?: string
}

interface RoutineBuilderState {
  name: string
  description: string
  exercises: RoutineExerciseForm[]
  setName: (name: string) => void
  setDescription: (description: string) => void
  addExercise: (exercise: Exercise) => void
  removeExercise: (index: number) => void
  updateExercise: (index: number, updates: Partial<RoutineExerciseForm>) => void
  reorderExercises: (startIndex: number, endIndex: number) => void
  loadRoutine: (name: string, description: string, exercises: RoutineExerciseForm[]) => void
  reset: () => void
}

export const useRoutineBuilderStore = create<RoutineBuilderState>((set) => ({
  name: '',
  description: '',
  exercises: [],

  setName: (name) => set({ name }),

  setDescription: (description) => set({ description }),

  addExercise: (exercise) =>
    set((state) => ({
      exercises: [
        ...state.exercises,
        {
          exercise,
          order_index: state.exercises.length,
          target_sets: 3,
          target_reps_min: 8,
          target_reps_max: 12,
          rest_period_seconds: 90,
          notes: '',
        },
      ],
    })),

  removeExercise: (index) =>
    set((state) => ({
      exercises: state.exercises
        .filter((_, i) => i !== index)
        .map((ex, i) => ({ ...ex, order_index: i })),
    })),

  updateExercise: (index, updates) =>
    set((state) => ({
      exercises: state.exercises.map((ex, i) =>
        i === index ? { ...ex, ...updates } : ex
      ),
    })),

  reorderExercises: (startIndex, endIndex) =>
    set((state) => {
      const exercises = [...state.exercises]
      const [removed] = exercises.splice(startIndex, 1)
      exercises.splice(endIndex, 0, removed)
      return {
        exercises: exercises.map((ex, i) => ({ ...ex, order_index: i })),
      }
    }),

  loadRoutine: (name, description, exercises) =>
    set({ name, description, exercises }),

  reset: () => set({ name: '', description: '', exercises: [] }),
}))
