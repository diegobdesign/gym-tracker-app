import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Exercise } from '@/lib/types/exercise.types'

export interface WorkoutSetInput {
  set_number: number
  weight?: number
  reps: number
  rpe?: number
  is_warmup: boolean
}

export interface WorkoutExercise {
  exercise: Exercise
  order_index: number
  sets: WorkoutSetInput[]
  notes?: string
}

interface WorkoutState {
  workoutId?: string
  routineId?: string
  name: string
  startedAt?: string
  exercises: WorkoutExercise[]
  currentExerciseIndex: number
  restTimerEndTime?: number

  // Actions
  startWorkout: (routineId: string | undefined, name: string, exercises: WorkoutExercise[]) => void
  addSet: (exerciseIndex: number, set: WorkoutSetInput) => void
  updateSet: (exerciseIndex: number, setIndex: number, updates: Partial<WorkoutSetInput>) => void
  removeSet: (exerciseIndex: number, setIndex: number) => void
  setCurrentExercise: (index: number) => void
  startRestTimer: (seconds: number) => void
  clearRestTimer: () => void
  reset: () => void
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set) => ({
      name: '',
      exercises: [],
      currentExerciseIndex: 0,

      startWorkout: (routineId, name, exercises) =>
        set({
          routineId,
          name,
          exercises,
          startedAt: new Date().toISOString(),
          currentExerciseIndex: 0,
          restTimerEndTime: undefined,
        }),

      addSet: (exerciseIndex, newSet) =>
        set((state) => ({
          exercises: state.exercises.map((ex, i) =>
            i === exerciseIndex
              ? { ...ex, sets: [...ex.sets, newSet] }
              : ex
          ),
        })),

      updateSet: (exerciseIndex, setIndex, updates) =>
        set((state) => ({
          exercises: state.exercises.map((ex, i) =>
            i === exerciseIndex
              ? {
                  ...ex,
                  sets: ex.sets.map((s, si) =>
                    si === setIndex ? { ...s, ...updates } : s
                  ),
                }
              : ex
          ),
        })),

      removeSet: (exerciseIndex, setIndex) =>
        set((state) => ({
          exercises: state.exercises.map((ex, i) =>
            i === exerciseIndex
              ? { ...ex, sets: ex.sets.filter((_, si) => si !== setIndex) }
              : ex
          ),
        })),

      setCurrentExercise: (index) =>
        set({ currentExerciseIndex: index }),

      startRestTimer: (seconds) =>
        set({ restTimerEndTime: Date.now() + seconds * 1000 }),

      clearRestTimer: () =>
        set({ restTimerEndTime: undefined }),

      reset: () =>
        set({
          workoutId: undefined,
          routineId: undefined,
          name: '',
          exercises: [],
          currentExerciseIndex: 0,
          startedAt: undefined,
          restTimerEndTime: undefined,
        }),
    }),
    {
      name: 'workout-session',
    }
  )
)
