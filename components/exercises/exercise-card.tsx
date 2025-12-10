import { Exercise } from '@/lib/types/exercise.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface ExerciseCardProps {
  exercise: Exercise
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <Link href={`/exercises/${exercise.id}`}>
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 animate-[fadeInUp_0.4s_ease-out]">
        {exercise.image_url && (
          <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-muted/20 to-muted/5 md:aspect-[3/4] md:max-h-[280px]">
            <img
              src={exercise.image_url}
              alt={exercise.name}
              className="h-full w-full object-cover md:object-contain"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{exercise.name}</CardTitle>
            {exercise.is_custom && (
              <Badge variant="secondary" className="ml-2">
                Custom
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="capitalize">
              {exercise.primary_muscle_group}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {exercise.equipment}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {exercise.difficulty}
            </Badge>
          </div>
          {exercise.description && (
            <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
              {exercise.description}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
