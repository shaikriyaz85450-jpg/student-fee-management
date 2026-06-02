"use client"

import { Bell, Check, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface ReminderProps {
  id: string
  title: string
  description: string
  dueDate: string
  time: string
  type: "payment" | "submission" | "exam" | "event"
  acknowledged: boolean
  onAcknowledge: (id: string) => void
}

const typeStyles = {
  payment: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  submission: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  exam: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  event: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
}

const typeIcons = {
  payment: AlertCircle,
  submission: Clock,
  exam: Bell,
  event: Check,
}

export function ReminderItem({
  id,
  title,
  description,
  dueDate,
  time,
  type,
  acknowledged,
  onAcknowledge,
}: ReminderProps) {
  const Icon = typeIcons[type]

  return (
    <div
      className={`rounded-xl border transition-all ${
        acknowledged
          ? "border-border bg-muted/30 opacity-60"
          : "border-border bg-card hover:border-primary/30 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${typeStyles[type]}`}>
          <Icon className="h-5 w-5" />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
            <span>{dueDate}</span>
            <span>•</span>
            <span>{time}</span>
          </div>
        </div>

        {!acknowledged && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAcknowledge(id)}
            className="shrink-0"
          >
            <Check className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
