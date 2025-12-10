'use client'

import { useWeightLogs, useDeleteWeightLog } from '@/hooks/use-progress'
import { WeightLogger } from '@/components/progress/weight-logger'
import { WeightChart } from '@/components/progress/weight-chart'
import { StatsSummary } from '@/components/progress/stats-summary'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Loader2, Trash2, Scale } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

export default function ProgressPage() {
  const { data: weightLogs, isLoading } = useWeightLogs()
  const { mutate: deleteWeightLog, isPending: isDeleting } = useDeleteWeightLog()

  const handleDelete = (id: string) => {
    deleteWeightLog(id, {
      onSuccess: () => {
        toast.success('Weight log deleted')
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to delete weight log')
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Progress Tracking</h1>
        <p className="text-muted-foreground">
          Track your weight and monitor your progress over time
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <WeightLogger />

          {weightLogs && weightLogs.length > 0 && (
            <>
              <StatsSummary weightLogs={weightLogs} />
              <WeightChart weightLogs={weightLogs} />

              <Card>
                <CardHeader>
                  <CardTitle>Weight History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {weightLogs.slice(0, 10).map((log) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-4">
                          <Scale className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{log.weight} kg</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(log.logged_at), 'EEEE, MMMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={isDeleting}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Weight Log</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this weight log? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(log.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    ))}
                    {weightLogs.length > 10 && (
                      <p className="text-center text-sm text-muted-foreground pt-2">
                        Showing 10 most recent entries out of {weightLogs.length} total
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}
    </div>
  )
}
