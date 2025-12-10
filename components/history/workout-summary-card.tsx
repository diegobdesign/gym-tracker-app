'use client'

import { Workout } from '@/lib/types/workout.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Dumbbell } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

interface WorkoutSummaryCardProps {
  workout: Workout
}

export function WorkoutSummaryCard({ workout }: WorkoutSummaryCardProps) {
  const workoutDate = new Date(workout.started_at)
  const formattedDate = format(workoutDate, 'EEEE, MMMM d, yyyy')
  const formattedTime = format(workoutDate, 'h:mm a')

  return (
    <Link href={`/history/${workout.id}`}>
      <Card className="transition-shadow hover:shadow-md cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl">{workout.name}</CardTitle>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formattedDate}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formattedTime}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {workout.duration_minutes && (
              <div className="flex items-center gap-1">
                <Dumbbell className="h-4 w-4" />
                <span>{workout.duration_minutes} min</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
