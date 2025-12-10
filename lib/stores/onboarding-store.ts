import { create } from 'zustand'
import { Profile } from '@/lib/types/profile.types'

interface OnboardingState {
  step: number
  data: Partial<Profile>
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateData: (data: Partial<Profile>) => void
  reset: () => void
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 1,
  data: {
    preferred_units: 'metric',
  },
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 4) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
  updateData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),
  reset: () => set({ step: 1, data: { preferred_units: 'metric' } }),
}))
