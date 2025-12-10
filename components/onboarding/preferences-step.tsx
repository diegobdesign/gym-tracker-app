'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const preferencesSchema = z.object({
  preferred_units: z.enum(['metric', 'imperial']),
})

type PreferencesFormData = z.infer<typeof preferencesSchema>

export function PreferencesStep() {
  const router = useRouter()
  const { data, updateData, prevStep, reset } = useOnboardingStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    handleSubmit,
    setValue,
    watch,
  } = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      preferred_units: data.preferred_units || 'metric',
    },
  })

  const preferredUnits = watch('preferred_units')

  const onSubmit = async (formData: PreferencesFormData) => {
    setIsSubmitting(true)
    updateData(formData)

    const supabase = createClient()

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user found')

      // Combine all onboarding data
      const profileData = {
        ...data,
        ...formData,
        onboarding_completed: true,
      }

      // Update profile in database
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)

      if (error) throw error

      toast.success('Profile completed successfully!')
      reset()
      router.push('/dashboard')
      router.refresh()
    } catch (error: any) {
      console.error('Error completing onboarding:', error)
      toast.error(error.message || 'Failed to complete onboarding')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-3">
          <Label>Preferred Units</Label>
          <RadioGroup
            value={preferredUnits}
            onValueChange={(value) => setValue('preferred_units', value as any)}
          >
            <div className="flex items-center space-x-2 rounded-lg border p-4">
              <RadioGroupItem value="metric" id="metric" />
              <Label htmlFor="metric" className="flex-1 cursor-pointer">
                <div className="font-medium">Metric</div>
                <div className="text-sm text-muted-foreground">
                  Kilograms (kg) and Centimeters (cm)
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-4">
              <RadioGroupItem value="imperial" id="imperial" />
              <Label htmlFor="imperial" className="flex-1 cursor-pointer">
                <div className="font-medium">Imperial</div>
                <div className="text-sm text-muted-foreground">
                  Pounds (lbs) and Inches (in)
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="rounded-lg bg-muted p-4">
          <h3 className="font-medium">You're all set!</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Click finish to start tracking your workouts and progress.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="flex-1"
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? 'Finishing...' : 'Finish'}
        </Button>
      </div>
    </form>
  )
}
