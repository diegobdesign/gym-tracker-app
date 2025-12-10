export interface WeightLog {
  id: string
  user_id: string
  weight: number
  logged_at: string
  notes?: string
  created_at: string
}

export interface CreateWeightLogData {
  weight: number
  logged_at: string
  notes?: string
}

export interface WeightChartData {
  date: string
  weight: number
  movingAverage?: number
}
