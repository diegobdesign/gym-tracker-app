import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Dumbbell, PlayCircle, TrendingUp, ClipboardList, Calendar, Clock, Scale, Flame } from 'lucide-react'
import { format, startOfWeek, endOfWeek, differenceInDays } from 'date-fns'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user!.id)
    .single()

  const firstName = profile?.full_name?.split(' ')[0] || 'there'

  // Fetch workouts
  const { data: workouts } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', user!.id)
    .order('started_at', { ascending: false })

  // Fetch recent weight log
  const { data: recentWeight } = await supabase
    .from('weight_logs')
    .select('weight, logged_at')
    .eq('user_id', user!.id)
    .order('logged_at', { ascending: false })
    .limit(1)
    .single()

  // Calculate stats
  const totalWorkouts = workouts?.length || 0
  const recentWorkouts = workouts?.slice(0, 3) || []

  // Calculate this week's workouts
  const now = new Date()
  const weekStart = startOfWeek(now, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 })
  const thisWeekWorkouts = workouts?.filter(w => {
    const workoutDate = new Date(w.started_at)
    return workoutDate >= weekStart && workoutDate <= weekEnd
  }).length || 0

  // Calculate streak (consecutive days with workouts)
  let streak = 0
  if (workouts && workouts.length > 0) {
    const sortedWorkouts = [...workouts].sort(
      (a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
    )
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let currentDate = today
    let foundToday = false

    for (const workout of sortedWorkouts) {
      const workoutDate = new Date(workout.started_at)
      workoutDate.setHours(0, 0, 0, 0)

      const daysDiff = differenceInDays(currentDate, workoutDate)

      if (daysDiff === 0) {
        if (!foundToday) {
          foundToday = true
          streak = 1
        }
      } else if (daysDiff === 1) {
        streak++
        currentDate = workoutDate
      } else {
        break
      }
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome back, {firstName}!
        </h1>
        <p className="mt-2 text-muted-foreground">
          Ready to crush your fitness goals today?
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Start</CardTitle>
            <PlayCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/workout">Start Workout</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exercises</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/exercises">Browse Library</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Routines</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/routines">Manage Routines</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/progress">View Progress</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentWorkouts.length > 0 ? (
              <div className="space-y-3">
                {recentWorkouts.map((workout) => (
                  <Link key={workout.id} href={`/history/${workout.id}`}>
                    <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                      <div className="flex-1">
                        <p className="font-medium">{workout.name}</p>
                        <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(workout.started_at), 'MMM d, yyyy')}
                          </span>
                          {workout.duration_minutes && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {workout.duration_minutes} min
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge variant="secondary">View</Badge>
                    </div>
                  </Link>
                ))}
                {totalWorkouts > 3 && (
                  <Button asChild variant="ghost" className="w-full">
                    <Link href="/history">View All Workouts</Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                No recent workouts. Start your first workout to see your activity here!
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Workouts</span>
                <span className="text-2xl font-bold">{totalWorkouts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="text-2xl font-bold">{thisWeekWorkouts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Streak</span>
                <div className="flex items-center gap-2">
                  {streak > 0 && (
                    <Flame
                      className={`h-5 w-5 ${
                        streak >= 7
                          ? 'text-milestone animate-pulse'
                          : streak >= 3
                            ? 'text-warning animate-bounce'
                            : 'text-warning'
                      }`}
                    />
                  )}
                  <span
                    className={`text-2xl font-bold ${
                      streak >= 7 ? 'text-milestone' : streak >= 3 ? 'text-warning' : ''
                    }`}
                  >
                    {streak} {streak === 1 ? 'day' : 'days'}
                  </span>
                </div>
              </div>
              {recentWeight && (
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-sm text-muted-foreground">Current Weight</span>
                  <span className="flex items-center gap-1 text-2xl font-bold">
                    <Scale className="h-5 w-5" />
                    {recentWeight.weight} kg
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
