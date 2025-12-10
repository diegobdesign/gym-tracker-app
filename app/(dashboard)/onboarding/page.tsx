'use client'

import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { ProfileStep } from '@/components/onboarding/profile-step'
import { MetricsStep } from '@/components/onboarding/metrics-step'
import { GoalsStep } from '@/components/onboarding/goals-step'
import { PreferencesStep } from '@/components/onboarding/preferences-step'
import { Progress } from '@/components/ui/progress'

const TOTAL_STEPS = 4

export default function OnboardingPage() {
  const { step } = useOnboardingStore()

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ProfileStep />
      case 2:
        return <MetricsStep />
      case 3:
        return <GoalsStep />
      case 4:
        return <PreferencesStep />
      default:
        return <ProfileStep />
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return 'Tell us about yourself'
      case 2:
        return 'Your current metrics'
      case 3:
        return 'Set your goals'
      case 4:
        return 'Final preferences'
      default:
        return ''
    }
  }

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return 'Let\'s start with some basic information'
      case 2:
        return 'This helps us track your progress over time'
      case 3:
        return 'What are you working towards?'
      case 4:
        return 'Just a few more settings and you\'re done!'
      default:
        return ''
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">Welcome to Gym Tracker</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Let's set up your profile to personalize your experience
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Step {step} of {TOTAL_STEPS}</span>
              <span className="text-muted-foreground">{Math.round((step / TOTAL_STEPS) * 100)}% Complete</span>
            </div>
            <Progress value={(step / TOTAL_STEPS) * 100} className="h-2" />
          </div>
        </div>

        <div className="rounded-lg border bg-card p-8 shadow-lg">
          <div className="mb-6 space-y-1">
            <h2 className="text-2xl font-semibold">{getStepTitle()}</h2>
            <p className="text-muted-foreground">{getStepDescription()}</p>
          </div>
          {renderStep()}
        </div>
      </div>
    </div>
  )
}
