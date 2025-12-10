'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface ExerciseSearchProps {
  value: string
  onChange: (value: string) => void
}

export function ExerciseSearch({ value, onChange }: ExerciseSearchProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search exercises..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  )
}
