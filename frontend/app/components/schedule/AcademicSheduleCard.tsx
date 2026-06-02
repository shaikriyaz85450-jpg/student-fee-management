"use client"

import { Clock, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface AcademicScheduleCardProps {
  subject: string
  courseCode: string
  instructor: string
  startTime: string
  endTime: string
  room: string
  days: string[]
  type: "lecture" | "lab" | "tutorial" | "practical"
}

const typeColors = {
  lecture: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  lab: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  tutorial: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  practical: "bg-amber-500/10 text-amber-500 border-amber-500/20",
}

export function AcademicScheduleCard({
  subject,
  courseCode,
  instructor,
  startTime,
  endTime,
  room,
  days,
  type,
}: AcademicScheduleCardProps) {
  return (
    <div className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`rounded-md border px-2 py-1 text-xs font-semibold ${typeColors[type]}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          </div>
          <h3 className="mt-2 font-semibold text-foreground">{subject}</h3>
          <p className="text-sm text-muted-foreground">{courseCode}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4 border-t border-border pt-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-3.5 w-3.5" />
          {instructor}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {startTime} - {endTime}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {room}
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {days.map((day) => (
          <span
            key={day}
            className="rounded-full bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground"
          >
            {day}
          </span>
        ))}
      </div>

      <Button variant="outline" size="sm" className="w-full">
        Add Reminder
      </Button>
    </div>
  )
}
