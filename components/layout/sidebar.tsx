'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Home,
  Dumbbell,
  ClipboardList,
  PlayCircle,
  History,
  TrendingUp,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Exercises', href: '/exercises', icon: Dumbbell },
  { name: 'Routines', href: '/routines', icon: ClipboardList },
  { name: 'Start Workout', href: '/workout', icon: PlayCircle },
  { name: 'History', href: '/history', icon: History },
  { name: 'Progress', href: '/progress', icon: TrendingUp },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="flex h-full flex-col gap-2 p-4">
      <div className="mb-4 px-3">
        <h2 className="text-2xl font-bold">Gym Tracker</h2>
        <p className="text-sm text-muted-foreground">Track your progress</p>
      </div>

      {navigation.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <Icon className="h-5 w-5" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
