import { createClient } from '@/lib/supabase/client'
import { Exercise, ExerciseFilters } from '@/lib/types/exercise.types'

export async function getExercises(filters?: ExerciseFilters) {
  const supabase = createClient()
  let query = supabase
    .from('exercises')
    .select('*')
    .order('name')

  if (filters?.muscle_group) {
    query = query.eq('primary_muscle_group', filters.muscle_group)
  }

  if (filters?.equipment) {
    query = query.eq('equipment', filters.equipment)
  }

  if (filters?.difficulty) {
    query = query.eq('difficulty', filters.difficulty)
  }

  if (filters?.search) {
    query = query.ilike('name', `%${filters.search}%`)
  }

  const { data, error } = await query

  if (error) throw error
  return data as Exercise[]
}

export async function getExerciseById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Exercise
}

export async function createCustomExercise(exercise: Partial<Exercise>) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('exercises')
    .insert({
      ...exercise,
      is_custom: true,
      created_by: user!.id,
    })
    .select()
    .single()

  if (error) throw error
  return data as Exercise
}

export async function updateExercise(id: string, exercise: Partial<Exercise>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('exercises')
    .update(exercise)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Exercise
}

export async function deleteExercise(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('exercises')
    .delete()
    .eq('id', id)

  if (error) throw error
}
