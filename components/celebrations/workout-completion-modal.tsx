'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Trophy, TrendingUp, Flame, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface WorkoutCompletionModalProps {
  isOpen: boolean
  onClose: () => void
  workoutName: string
  totalSets: number
  duration?: number
  isPersonalRecord?: boolean
  currentStreak?: number
}

export function WorkoutCompletionModal({
  isOpen,
  onClose,
  workoutName,
  totalSets,
  duration,
  isPersonalRecord,
  currentStreak,
}: WorkoutCompletionModalProps) {
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      // Celebration confetti burst
      const duration = 3000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
      }

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)

        // Two simultaneous bursts from different positions
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#3B82F6', '#10B981', '#F97316', '#8B5CF6'],
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#3B82F6', '#10B981', '#F97316', '#8B5CF6'],
        })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [isOpen])

  const handleViewHistory = () => {
    onClose()
    router.push('/history')
  }

  const handleStartNew = () => {
    onClose()
    router.push('/workout')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-success/20 to-success/5 animate-[bounce_1s_ease-in-out_3]">
            <Trophy className="h-10 w-10 text-success" />
          </div>
          <DialogTitle className="text-center text-2xl">
            Workout Complete!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Amazing work on completing{' '}
            <span className="font-semibold text-foreground">{workoutName}</span>!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border bg-accent/50 p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary">
                <Star className="h-5 w-5" />
                {totalSets}
              </div>
              <p className="text-xs text-muted-foreground">Sets Completed</p>
            </div>

            {duration && (
              <div className="rounded-lg border bg-accent/50 p-3 text-center">
                <div className="text-2xl font-bold text-primary">{duration}</div>
                <p className="text-xs text-muted-foreground">Minutes</p>
              </div>
            )}

            {currentStreak && currentStreak > 1 && (
              <div className="col-span-2 rounded-lg border-2 border-warning/30 bg-gradient-to-r from-warning/10 to-warning/5 p-3 text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-warning">
                  <Flame className="h-6 w-6 animate-pulse" />
                  {currentStreak} Day Streak!
                </div>
                <p className="text-xs text-muted-foreground">Keep it going!</p>
              </div>
            )}

            {isPersonalRecord && (
              <div className="col-span-2 rounded-lg border-2 border-milestone/30 bg-gradient-to-r from-milestone/10 to-milestone/5 p-3 text-center">
                <div className="flex items-center justify-center gap-2 text-lg font-bold text-milestone">
                  <TrendingUp className="h-5 w-5" />
                  New Personal Record!
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleViewHistory}
            >
              View History
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-primary to-primary/80"
              onClick={handleStartNew}
            >
              Start New Workout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
