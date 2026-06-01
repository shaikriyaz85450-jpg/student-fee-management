"use client"

import { Calendar, Clock, MapPin, AlertCircle, CheckCircle2 } from "lucide-react"

export interface UpcomingDeadlineProps {
  title: string
  date: string
  daysLeft: number
  amount?: string
  type: "fee" | "exam" | "event"
  priority: "high" | "medium" | "low"
}

export function UpcomingDeadlineCard({ 
  title, 
  date, 
  daysLeft, 
  amount, 
  type,
  priority 
}: UpcomingDeadlineProps) {
  const priorityColors = {
    high: "border-red-500/30 bg-red-500/5",
    medium: "border-amber-500/30 bg-amber-500/5",
    low: "border-emerald-500/30 bg-emerald-500/5",
  }

  const priorityDots = {
    high: "bg-red-500",
    medium: "bg-amber-500",
    low: "bg-emerald-500",
  }

  const typeIcons = {
    fee: <AlertCircle className="h-4 w-4" />,
    exam: <Calendar className="h-4 w-4" />,
    event: <Clock className="h-4 w-4" />,
  }

  return (
    <div className={`rounded-xl border p-4 transition-all hover:shadow-md ${priorityColors[priority]}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${priorityDots[priority]}`} />
            <h3 className="font-semibold text-foreground">{title}</h3>
          </div>
          
          <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              {date}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="rounded-lg bg-muted/50 px-3 py-1.5">
            <p className="text-sm font-semibold text-foreground">{daysLeft}d</p>
          </div>
          {amount && <p className="mt-2 text-xs font-medium text-primary">{amount}</p>}
        </div>
      </div>
    </div>
  )
}
