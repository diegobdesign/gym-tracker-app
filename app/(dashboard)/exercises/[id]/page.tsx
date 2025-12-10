'use client'

import { useParams, useRouter } from 'next/navigation'
import { useExercise } from '@/hooks/use-exercises'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function ExerciseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const exerciseId = params.id as string

  const { data: exercise, isLoading } = useExercise(exerciseId)

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!exercise) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Exercise Not Found</h1>
        </div>
        <p className="text-muted-foreground">
          The exercise you're looking for doesn't exist.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/exercises">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{exercise.name}</h1>
          {exercise.is_custom && (
            <Badge variant="secondary" className="mt-2">
              Custom Exercise
            </Badge>
          )}
        </div>
      </div>

      {exercise.image_url && (
        <div className="relative overflow-hidden rounded-lg border bg-gradient-to-b from-muted/30 to-muted/10">
          <img
            src={exercise.image_url}
            alt={`${exercise.name} demonstration`}
            className="h-auto w-full object-cover max-h-[400px] md:object-contain md:max-h-[600px] md:max-w-[400px] md:mx-auto"
          />
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {exercise.description && (
              <div>
                <h3 className="mb-2 font-semibold">Description</h3>
                <p className="text-muted-foreground">{exercise.description}</p>
              </div>
            )}

            {exercise.instructions && (
              <div>
                <h3 className="mb-2 font-semibold">Instructions</h3>
                <p className="whitespace-pre-line text-muted-foreground">
                  {exercise.instructions}
                </p>
              </div>
            )}

            {exercise.video_url && (
              <div>
                <h3 className="mb-2 font-semibold">Video Tutorial</h3>
                <a
                  href={exercise.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Watch Video
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Primary Muscle</p>
                <Badge variant="outline" className="mt-1 capitalize">
                  {exercise.primary_muscle_group}
                </Badge>
              </div>

              {exercise.secondary_muscle_groups && exercise.secondary_muscle_groups.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">Secondary Muscles</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {exercise.secondary_muscle_groups.map((muscle) => (
                      <Badge key={muscle} variant="outline" className="capitalize">
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground">Equipment</p>
                <Badge variant="outline" className="mt-1 capitalize">
                  {exercise.equipment}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Difficulty</p>
                <Badge variant="outline" className="mt-1 capitalize">
                  {exercise.difficulty}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <Badge variant="outline" className="mt-1 capitalize">
                  {exercise.exercise_type}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
