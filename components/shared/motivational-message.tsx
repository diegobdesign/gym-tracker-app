'use client'

import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

const MOTIVATIONAL_MESSAGES = [
  "You're stronger than you think!",
  "Every rep counts. Keep pushing!",
  "Progress, not perfection.",
  "Your only limit is you.",
  "Make today count!",
  "Sweat is just fat crying.",
  "The pain you feel today is the strength you feel tomorrow.",
  "Don't stop when you're tired. Stop when you're done.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Excuses don't burn calories!",
  "The only bad workout is the one that didn't happen.",
  "Push yourself because no one else is going to do it for you.",
  "Success starts with self-discipline.",
  "Great things never come from comfort zones.",
  "Dream big. Work hard. Stay focused.",
]

export function MotivationalMessage() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Select random message on mount
    const randomMessage = MOTIVATIONAL_MESSAGES[
      Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)
    ]
    setMessage(randomMessage)
  }, [])

  if (!message) return null

  return (
    <div className="relative overflow-hidden rounded-lg border bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 animate-[fadeInUp_0.5s_ease-out]">
      <div className="flex items-center gap-3">
        <Sparkles className="h-5 w-5 text-primary animate-pulse" />
        <p className="text-sm font-medium text-foreground">
          {message}
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-[shimmer_3s_infinite] bg-[length:200%_100%]" />
    </div>
  )
}
