'use client'

import { useRoutines } from '@/hooks/use-routines'
import { RoutineCard } from '@/components/routines/routine-card'
import { Button } from '@/components/ui/button'
import { Plus, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function RoutinesPage() {
  const { data: routines, isLoading } = useRoutines()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Routines</h1>
          <p className="text-muted-foreground">
            Create and manage your workout routines
          </p>
        </div>
        <Button asChild>
          <Link href="/routines/new">
            <Plus className="mr-2 h-4 w-4" />
            New Routine
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : routines && routines.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {routines.map((routine) => (
            <RoutineCard key={routine.id} routine={routine} />
          ))}
        </div>
      ) : (
        <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <p className="text-lg font-medium">No routines yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Create your first workout routine to get started
            </p>
            <Button asChild className="mt-4">
              <Link href="/routines/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Routine
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
