'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const metricsSchema = z.object({
  current_weight: z.coerce.number().positive('Weight must be positive').optional(),
  height: z.coerce.number().positive('Height must be positive').optional(),
  body_fat_percentage: z.coerce.number().min(0).max(100).optional().or(z.literal('')),
})

type MetricsFormData = z.infer<typeof metricsSchema>

export function MetricsStep() {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MetricsFormData>({
    resolver: zodResolver(metricsSchema),
    defaultValues: {
      current_weight: data.current_weight || undefined,
      height: data.height || undefined,
      body_fat_percentage: data.body_fat_percentage || undefined,
    },
  })

  const onSubmit = (formData: MetricsFormData) => {
    // Convert empty strings to undefined
    const cleanedData = {
      current_weight: formData.current_weight || undefined,
      height: formData.height || undefined,
      body_fat_percentage: formData.body_fat_percentage || undefined,
    }
    updateData(cleanedData)
    nextStep()
  }

  const isMetric = data.preferred_units === 'metric'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current_weight">
            Current Weight {isMetric ? '(kg)' : '(lbs)'}
          </Label>
          <Input
            id="current_weight"
            type="number"
            step="0.1"
            placeholder={isMetric ? '70' : '154'}
            {...register('current_weight')}
          />
          {errors.current_weight && (
            <p className="text-sm text-destructive">{errors.current_weight.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">
            Height {isMetric ? '(cm)' : '(inches)'}
          </Label>
          <Input
            id="height"
            type="number"
            step="0.1"
            placeholder={isMetric ? '175' : '69'}
            {...register('height')}
          />
          {errors.height && (
            <p className="text-sm text-destructive">{errors.height.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="body_fat_percentage">Body Fat % (Optional)</Label>
          <Input
            id="body_fat_percentage"
            type="number"
            step="0.1"
            placeholder="15"
            {...register('body_fat_percentage')}
          />
          {errors.body_fat_percentage && (
            <p className="text-sm text-destructive">{errors.body_fat_percentage.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
          Back
        </Button>
        <Button type="submit" className="flex-1">
          Next
        </Button>
      </div>
    </form>
  )
}
