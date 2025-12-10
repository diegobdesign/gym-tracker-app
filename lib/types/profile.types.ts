export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say'
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'
export type PrimaryGoal = 'strength' | 'hypertrophy' | 'endurance' | 'weight_loss' | 'general_fitness'
export type PreferredUnits = 'metric' | 'imperial'

export interface Profile {
  id: string
  email: string
  full_name?: string
  date_of_birth?: string
  gender?: Gender
  current_weight?: number
  height?: number
  body_fat_percentage?: number
  target_weight?: number
  experience_level?: ExperienceLevel
  primary_goal?: PrimaryGoal
  preferred_units: PreferredUnits
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}
