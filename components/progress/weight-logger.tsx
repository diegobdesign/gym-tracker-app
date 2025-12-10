'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useCreateWeightLog } from '@/hooks/use-progress'
import { toast } from 'sonner'
import { format } from 'date-fns'

export function WeightLogger() {
  const [weight, setWeight] = useState<string>('')
  const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))

  const { mutate: createWeightLog, isPending } = useCreateWeightLog()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!weight || parseFloat(weight) <= 0) {
      toast.error('Please enter a valid weight')
      return
    }

    createWeightLog(
      {
        weight: parseFloat(weight),
        logged_at: new Date(date).toISOString(),
      },
      {
        onSuccess: () => {
          toast.success('Weight logged successfully')
          setWeight('')
          setDate(format(new Date(), 'yyyy-MM-dd'))
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to log weight')
        },
      }
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Weight</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="e.g., 75.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Logging...' : 'Log Weight'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
