import { createClient } from '@/lib/supabase/client'
import { WeightLog, CreateWeightLogData } from '@/lib/types/progress.types'

export async function getWeightLogs() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('weight_logs')
    .select('*')
    .eq('user_id', user!.id)
    .order('logged_at', { ascending: false })

  if (error) throw error
  return data as WeightLog[]
}

export async function createWeightLog(logData: CreateWeightLogData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('weight_logs')
    .insert({
      user_id: user!.id,
      ...logData,
    })
    .select()
    .single()

  if (error) throw error
  return data as WeightLog
}

export async function deleteWeightLog(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('weight_logs')
    .delete()
    .eq('id', id)

  if (error) throw error
}
