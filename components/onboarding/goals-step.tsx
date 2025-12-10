'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const goalsSchema = z.object({
  target_weight: z.coerce.number().positive().optional().or(z.literal('')),
  experience_level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  primary_goal: z.enum(['strength', 'hypertrophy', 'endurance', 'weight_loss', 'general_fitness']).optional(),
})

type GoalsFormData = z.infer<typeof goalsSchema>

export function GoalsStep() {
  const { data, updateData, nextStep, prevStep } = useOnboardingStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<GoalsFormData>({
    resolver: zodResolver(goalsSchema),
    defaultValues: {
      target_weight: data.target_weight || undefined,
      experience_level: data.experience_level,
      primary_goal: data.primary_goal,
    },
  })

  const experienceLevel = watch('experience_level')
  const primaryGoal = watch('primary_goal')

  const onSubmit = (formData: GoalsFormData) => {
    const cleanedData = {
      target_weight: formData.target_weight || undefined,
      experience_level: formData.experience_level,
      primary_goal: formData.primary_goal,
    }
    updateData(cleanedData)
    nextStep()
  }

  const isMetric = data.preferred_units === 'metric'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="target_weight">
            Target Weight {isMetric ? '(kg)' : '(lbs)'} (Optional)
          </Label>
          <Input
            id="target_weight"
            type="number"
            step="0.1"
            placeholder={isMetric ? '75' : '165'}
            {...register('target_weight')}
          />
          {errors.target_weight && (
            <p className="text-sm text-destructive">{errors.target_weight.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience_level">Training Experience</Label>
          <Select
            value={experienceLevel}
            onValueChange={(value) => setValue('experience_level', value as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner (0-1 year)</SelectItem>
              <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
              <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="primary_goal">Primary Goal</Label>
          <Select
            value={primaryGoal}
            onValueChange={(value) => setValue('primary_goal', value as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your primary goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="strength">Build Strength</SelectItem>
              <SelectItem value="hypertrophy">Build Muscle (Hypertrophy)</SelectItem>
              <SelectItem value="endurance">Improve Endurance</SelectItem>
              <SelectItem value="weight_loss">Lose Weight</SelectItem>
              <SelectItem value="general_fitness">General Fitness</SelectItem>
            </SelectContent>
          </Select>
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
