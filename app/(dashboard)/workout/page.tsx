'use client'

import { useRoutines } from '@/hooks/use-routines'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function WorkoutPage() {
  const { data: routines, isLoading } = useRoutines()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Start Workout</h1>
        <p className="text-muted-foreground">
          Choose a routine to begin your workout
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : routines && routines.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {routines.map((routine) => (
            <Card key={routine.id} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle>{routine.name}</CardTitle>
                {routine.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {routine.description}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={`/workout/routine/${routine.id}`}>
                    <Play className="mr-2 h-4 w-4" />
                    Start Workout
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <p className="text-lg font-medium">No routines yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Create a routine first to start working out
            </p>
            <Button asChild className="mt-4">
              <Link href="/routines/new">Create Routine</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
