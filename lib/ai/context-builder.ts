import { UserContext } from '@/lib/types/ai.types'

export function buildContextPrompt(context: UserContext, feature: string): string {
  const parts: string[] = []

  // Always include profile
  if (context.profile) {
    parts.push(`User Profile:
- Experience Level: ${context.profile.experience_level}
- Primary Goal: ${context.profile.primary_goal}
${context.profile.current_weight ? `- Current Weight: ${context.profile.current_weight} kg` : ''}
${context.profile.height ? `- Height: ${context.profile.height} cm` : ''}`)
  }

  // Include recent workouts for analysis
  if (context.recentWorkouts?.length > 0 && ['workout-analysis', 'routine-suggestion'].includes(feature)) {
    const workoutSummary = context.recentWorkouts.slice(0, 5).map((w) =>
      `${w.name} (${w.date}): ${w.exercises.length} exercises`
    ).join('\n')
    parts.push(`\nRecent Workouts (last 5):\n${workoutSummary}`)
  }

  // Include routines for routine suggestions
  if (context.routines?.length > 0 && feature === 'routine-suggestion') {
    const routineSummary = context.routines.map((r) =>
      `${r.name}: ${r.exercises.join(', ')}`
    ).join('\n')
    parts.push(`\nExisting Routines:\n${routineSummary}`)
  }

  // Include exercise library for form tips
  if (context.exercises?.length > 0 && feature === 'form-tips') {
    const exerciseList = context.exercises.slice(0, 20).map((e) =>
      `${e.name} (${e.muscle_group}, ${e.difficulty})`
    ).join(', ')
    parts.push(`\nAvailable Exercises: ${exerciseList}`)
  }

  return parts.join('\n\n')
}

export function sanitizeContext(context: any): UserContext {
  // Remove sensitive data, limit size
  return {
    profile: {
      experience_level: context.profile?.experience_level || 'intermediate',
      primary_goal: context.profile?.primary_goal || 'general_fitness',
      current_weight: context.profile?.current_weight,
      height: context.profile?.height,
    },
    recentWorkouts: (context.recentWorkouts || []).slice(0, 10),
    exercises: (context.exercises || []).slice(0, 50),
    routines: (context.routines || []).slice(0, 10),
  }
}
