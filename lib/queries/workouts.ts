import { createClient } from '@/lib/supabase/client'
import { Workout, WorkoutWithDetails, CreateWorkoutData } from '@/lib/types/workout.types'

export async function getWorkouts() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', user!.id)
    .order('started_at', { ascending: false })

  if (error) throw error
  return data as Workout[]
}

export async function getWorkoutById(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('workouts')
    .select(`
      *,
      workout_exercises (
        *,
        exercise:exercises (*),
        sets:workout_sets (*)
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data as WorkoutWithDetails
}

export async function createWorkout(workoutData: CreateWorkoutData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Calculate duration
  const startedAt = new Date(workoutData.started_at)
  const completedAt = new Date()
  const durationMinutes = Math.floor((completedAt.getTime() - startedAt.getTime()) / 1000 / 60)

  // Create workout
  const { data: workout, error: workoutError } = await supabase
    .from('workouts')
    .insert({
      user_id: user!.id,
      routine_id: workoutData.routine_id,
      name: workoutData.name,
      started_at: workoutData.started_at,
      completed_at: completedAt.toISOString(),
      duration_minutes: durationMinutes,
    })
    .select()
    .single()

  if (workoutError) throw workoutError

  // Add exercises and sets
  for (const exercise of workoutData.exercises) {
    const { data: workoutExercise, error: exerciseError } = await supabase
      .from('workout_exercises')
      .insert({
        workout_id: workout.id,
        exercise_id: exercise.exercise_id,
        order_index: exercise.order_index,
      })
      .select()
      .single()

    if (exerciseError) throw exerciseError

    // Add sets
    if (exercise.sets.length > 0) {
      const setsWithExerciseId = exercise.sets.map((set) => ({
        ...set,
        workout_exercise_id: workoutExercise.id,
      }))

      const { error: setsError } = await supabase
        .from('workout_sets')
        .insert(setsWithExerciseId)

      if (setsError) throw setsError
    }
  }

  return workout as Workout
}

export async function deleteWorkout(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('workouts')
    .delete()
    .eq('id', id)

  if (error) throw error
}
