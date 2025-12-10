'use client'

import { useEffect, useState, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Timer } from 'lucide-react'
import { useWorkoutStore } from '@/lib/stores/workout-store'
import { toast } from 'sonner'

interface RestTimerProps {
  endTime: number
}

export function RestTimer({ endTime }: RestTimerProps) {
  const [timeLeft, setTimeLeft] = useState(0)
  const hasNotified = useRef(false)
  const clearRestTimer = useWorkoutStore((state) => state.clearRestTimer)

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000))
      setTimeLeft(remaining)

      // Celebration when timer completes
      if (remaining === 0 && !hasNotified.current) {
        hasNotified.current = true

        // Vibration on mobile
        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200])
        }

        // Success toast
        toast.success('Rest complete! Ready for next set 💪', {
          duration: 3000,
        })

        clearInterval(interval)
      }
    }, 100)

    return () => {
      clearInterval(interval)
      hasNotified.current = false
    }
  }, [endTime])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  // Color transitions based on time remaining
  const getTimerColor = () => {
    if (timeLeft === 0) return 'text-success'
    if (timeLeft <= 10) return 'text-warning'
    return 'text-info'
  }

  const getBackgroundColor = () => {
    if (timeLeft === 0) return 'bg-success/5 border-success/30'
    if (timeLeft <= 10) return 'bg-warning/5 border-warning/30'
    return 'bg-info/5 border-info/30'
  }

  return (
    <Card
      className={`sticky top-4 z-10 border-2 p-4 transition-all duration-300 ${getBackgroundColor()}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Timer
            className={`h-5 w-5 ${getTimerColor()} ${
              timeLeft > 0 && timeLeft <= 10 ? 'animate-pulse' : ''
            }`}
          />
          <div>
            <p className="text-sm font-medium">
              {timeLeft === 0 ? 'Rest Complete!' : 'Rest Timer'}
            </p>
            <p className={`text-2xl font-bold tabular-nums ${getTimerColor()}`}>
              {minutes}:{seconds.toString().padStart(2, '0')}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={clearRestTimer}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
