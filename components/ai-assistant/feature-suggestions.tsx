'use client'

import { Button } from '@/components/ui/button'
import {
  ClipboardList,
  TrendingUp,
  Dumbbell,
  MessageCircle
} from 'lucide-react'
import { AIFeatureType } from '@/lib/types/ai.types'

interface FeatureSuggestionsProps {
  onSelectFeature: (feature: AIFeatureType, prompt: string) => void
}

const features = [
  {
    type: 'routine-suggestion' as AIFeatureType,
    icon: ClipboardList,
    label: 'Routine Suggestions',
    prompt: 'Can you suggest a workout routine for me based on my goals?',
  },
  {
    type: 'workout-analysis' as AIFeatureType,
    icon: TrendingUp,
    label: 'Analyze Workouts',
    prompt: 'Can you analyze my recent workouts and give me insights?',
  },
  {
    type: 'form-tips' as AIFeatureType,
    icon: Dumbbell,
    label: 'Form Tips',
    prompt: 'Can you give me form tips for proper exercise technique?',
  },
  {
    type: 'general-qa' as AIFeatureType,
    icon: MessageCircle,
    label: 'Ask Anything',
    prompt: '',
  },
]

export function FeatureSuggestions({ onSelectFeature }: FeatureSuggestionsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 p-4 border-b">
      {features.map((feature) => {
        const Icon = feature.icon
        return (
          <Button
            key={feature.type}
            variant="outline"
            className="h-auto flex-col gap-2 p-3"
            onClick={() => onSelectFeature(feature.type, feature.prompt)}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs">{feature.label}</span>
          </Button>
        )
      })}
    </div>
  )
}
