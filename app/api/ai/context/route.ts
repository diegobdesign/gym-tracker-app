import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sanitizeContext } from '@/lib/ai/context-builder'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Fetch user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('experience_level, primary_goal, current_weight, height')
      .eq('id', user.id)
      .single()

    // Fetch recent workouts (last 10)
    const { data: workouts } = await supabase
      .from('workouts')
      .select(`
        id,
        name,
        started_at,
        workout_exercises (
          exercise_id,
          exercises (name),
          workout_sets (
            set_number,
            reps,
            weight
          )
        )
      `)
      .eq('user_id', user.id)
      .order('started_at', { ascending: false })
      .limit(10)

    // Fetch user's routines
    const { data: routines } = await supabase
      .from('routines')
      .select(`
        id,
        name,
        routine_exercises (
          exercise_id,
          exercises (name)
        )
      `)
      .eq('user_id', user.id)
      .limit(10)

    // Fetch available exercises (sample)
    const { data: exercises } = await supabase
      .from('exercises')
      .select('name, primary_muscle_group, difficulty')
      .limit(50)

    // Build context object
    const context = {
      profile,
      recentWorkouts: workouts?.map((w: any) => ({
        name: w.name,
        date: new Date(w.started_at).toLocaleDateString(),
        exercises: w.workout_exercises?.map((we: any) => ({
          name: we.exercises?.name || 'Unknown',
          sets: we.workout_sets?.length || 0,
          reps: we.workout_sets?.[0]?.reps || 0,
        })) || [],
      })) || [],
      routines: routines?.map((r: any) => ({
        name: r.name,
        exercises: r.routine_exercises?.map((re: any) => re.exercises?.name || 'Unknown') || [],
      })) || [],
      exercises: exercises?.map((e: any) => ({
        name: e.name,
        muscle_group: e.primary_muscle_group,
        difficulty: e.difficulty,
      })) || [],
    }

    return NextResponse.json(sanitizeContext(context))

  } catch (error) {
    console.error('Context fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch context' },
      { status: 500 }
    )
  }
}
