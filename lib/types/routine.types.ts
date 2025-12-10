import { Exercise } from './exercise.types'

export interface Routine {
  id: string
  user_id: string
  name: string
  description?: string
  is_template: boolean
  created_at: string
  updated_at: string
}

export interface RoutineExercise {
  id: string
  routine_id: string
  exercise_id: string
  order_index: number
  target_sets: number
  target_reps_min?: number
  target_reps_max?: number
  rest_period_seconds: number
  notes?: string
  created_at: string
  exercise?: Exercise
}

export interface RoutineWithExercises extends Routine {
  routine_exercises: RoutineExercise[]
}

export interface CreateRoutineData {
  name: string
  description?: string
  exercises: Array<{
    exercise_id: string
    order_index: number
    target_sets: number
    target_reps_min?: number
    target_reps_max?: number
    rest_period_seconds: number
    notes?: string
  }>
}
