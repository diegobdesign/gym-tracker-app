'use client'

import { WeightLog, WeightChartData } from '@/lib/types/progress.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { format } from 'date-fns'
import { useMemo } from 'react'

interface WeightChartProps {
  weightLogs: WeightLog[]
}

export function WeightChart({ weightLogs }: WeightChartProps) {
  const chartData = useMemo(() => {
    if (!weightLogs || weightLogs.length === 0) return []

    // Sort by date ascending for chart
    const sorted = [...weightLogs].sort(
      (a, b) => new Date(a.logged_at).getTime() - new Date(b.logged_at).getTime()
    )

    // Calculate 7-day moving average
    const data: WeightChartData[] = sorted.map((log, index) => {
      const startIndex = Math.max(0, index - 6)
      const recentLogs = sorted.slice(startIndex, index + 1)
      const average = recentLogs.reduce((sum, l) => sum + l.weight, 0) / recentLogs.length

      return {
        date: format(new Date(log.logged_at), 'MMM d'),
        weight: log.weight,
        movingAverage: recentLogs.length >= 3 ? Number(average.toFixed(1)) : undefined,
      }
    })

    return data
  }, [weightLogs])

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weight Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            Log at least one weight entry to see your progress chart
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weight Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                name="Weight (kg)"
              />
              {chartData.some(d => d.movingAverage !== undefined) && (
                <Line
                  type="monotone"
                  dataKey="movingAverage"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="7-day Average"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
