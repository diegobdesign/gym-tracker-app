import { Routine } from '@/lib/types/routine.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ClipboardList } from 'lucide-react'

interface RoutineCardProps {
  routine: Routine
}

export function RoutineCard({ routine }: RoutineCardProps) {
  return (
    <Link href={`/routines/${routine.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">{routine.name}</CardTitle>
                {routine.is_template && (
                  <Badge variant="secondary" className="mt-1">
                    Template
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        {routine.description && (
          <CardContent>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {routine.description}
            </p>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}
