export type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'biceps' | 'triceps' | 'core' | 'cardio'
export type Equipment = 'barbell' | 'dumbbells' | 'machine' | 'cable' | 'bodyweight' | 'other'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type ExerciseType = 'compound' | 'isolation' | 'cardio'

export interface Exercise {
  id: string
  name: string
  description?: string
  instructions?: string
  video_url?: string
  image_url?: string
  primary_muscle_group: MuscleGroup
  secondary_muscle_groups?: MuscleGroup[]
  equipment: Equipment
  difficulty: Difficulty
  exercise_type: ExerciseType
  is_custom: boolean
  created_by?: string
  created_at: string
  updated_at: string
}

export interface ExerciseFilters {
  muscle_group?: MuscleGroup
  equipment?: Equipment
  difficulty?: Difficulty
  search?: string
}
