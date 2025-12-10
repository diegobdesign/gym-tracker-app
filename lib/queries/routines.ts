import { createClient } from '@/lib/supabase/client'
import { Routine, RoutineWithExercises, CreateRoutineData } from '@/lib/types/routine.types'

export async function getRoutines() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('routines')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Routine[]
}

export async function getRoutineById(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('routines')
    .select(`
      *,
      routine_exercises (
        *,
        exercise:exercises (*)
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data as RoutineWithExercises
}

export async function createRoutine(routineData: CreateRoutineData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Create routine
  const { data: routine, error: routineError } = await supabase
    .from('routines')
    .insert({
      user_id: user!.id,
      name: routineData.name,
      description: routineData.description,
    })
    .select()
    .single()

  if (routineError) throw routineError

  // Add exercises
  if (routineData.exercises.length > 0) {
    const exercisesWithRoutineId = routineData.exercises.map((ex) => ({
      ...ex,
      routine_id: routine.id,
    }))

    const { error: exercisesError } = await supabase
      .from('routine_exercises')
      .insert(exercisesWithRoutineId)

    if (exercisesError) throw exercisesError
  }

  return routine as Routine
}

export async function updateRoutine(id: string, routineData: Partial<CreateRoutineData>) {
  const supabase = createClient()

  // Update routine metadata
  if (routineData.name || routineData.description !== undefined) {
    const { error } = await supabase
      .from('routines')
      .update({
        name: routineData.name,
        description: routineData.description,
      })
      .eq('id', id)

    if (error) throw error
  }

  // Update exercises if provided
  if (routineData.exercises) {
    // Delete existing exercises
    await supabase
      .from('routine_exercises')
      .delete()
      .eq('routine_id', id)

    // Add new exercises
    if (routineData.exercises.length > 0) {
      const exercisesWithRoutineId = routineData.exercises.map((ex) => ({
        ...ex,
        routine_id: id,
      }))

      const { error } = await supabase
        .from('routine_exercises')
        .insert(exercisesWithRoutineId)

      if (error) throw error
    }
  }
}

export async function deleteRoutine(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('routines')
    .delete()
    .eq('id', id)

  if (error) throw error
}
