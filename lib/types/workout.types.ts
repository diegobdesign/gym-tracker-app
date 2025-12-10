import { Exercise } from './exercise.types'

export interface Workout {
  id: string
  user_id: string
  routine_id?: string
  name: string
  started_at: string
  completed_at?: string
  duration_minutes?: number
  notes?: string
  created_at: string
}

export interface WorkoutExercise {
  id: string
  workout_id: string
  exercise_id: string
  order_index: number
  notes?: string
  created_at: string
  exercise?: Exercise
  sets?: WorkoutSet[]
}

export interface WorkoutSet {
  id: string
  workout_exercise_id: string
  set_number: number
  weight?: number
  reps: number
  rpe?: number
  is_warmup: boolean
  created_at: string
}

export interface WorkoutWithDetails extends Workout {
  workout_exercises: WorkoutExercise[]
}

export interface CreateWorkoutData {
  routine_id?: string
  name: string
  started_at: string
  exercises: Array<{
    exercise_id: string
    order_index: number
    sets: Array<{
      set_number: number
      weight?: number
      reps: number
      rpe?: number
      is_warmup: boolean
    }>
  }>
}
