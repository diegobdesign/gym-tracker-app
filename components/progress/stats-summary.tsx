'use client'

import { WeightLog } from '@/lib/types/progress.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'

interface StatsSummaryProps {
  weightLogs: WeightLog[]
}

export function StatsSummary({ weightLogs }: StatsSummaryProps) {
  if (!weightLogs || weightLogs.length === 0) {
    return null
  }

  // Sort by date
  const sorted = [...weightLogs].sort(
    (a, b) => new Date(a.logged_at).getTime() - new Date(b.logged_at).getTime()
  )

  const currentWeight = sorted[sorted.length - 1].weight
  const startWeight = sorted[0].weight
  const weightChange = currentWeight - startWeight

  // Calculate average for last 7 entries
  const recentEntries = sorted.slice(-7)
  const recentAverage = recentEntries.reduce((sum, log) => sum + log.weight, 0) / recentEntries.length

  const getTrendIcon = () => {
    if (Math.abs(weightChange) < 0.1) {
      return <Minus className="h-4 w-4" />
    }
    return weightChange > 0 ? (
      <TrendingUp className="h-4 w-4" />
    ) : (
      <TrendingDown className="h-4 w-4" />
    )
  }

  const getTrendColor = () => {
    if (Math.abs(weightChange) < 0.1) return 'text-muted-foreground'
    return weightChange > 0 ? 'text-orange-500' : 'text-green-500'
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Current Weight
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{currentWeight.toFixed(1)} kg</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Change
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <p className={`text-2xl font-bold ${getTrendColor()}`}>
              {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg
            </p>
            <span className={getTrendColor()}>{getTrendIcon()}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            7-Day Average
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{recentAverage.toFixed(1)} kg</p>
        </CardContent>
      </Card>
    </div>
  )
}
