"use client"

import { Calendar, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CalendarEvent {
  date: number
  events: number
  hasDeadline: boolean
}

export interface SimpleCalendarProps {
  month: number
  year: number
  events?: CalendarEvent[]
}

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function SimpleCalendar({ month, year, events = [] }: SimpleCalendarProps) {
  const daysInMonth = DAYS_IN_MONTH[month]
  const firstDay = new Date(year, month, 1).getDay()
  const days = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))

  const getEventCount = (date: number) => {
    return events.find(e => e.date === date)?.events || 0
  }

  const hasDeadline = (date: number) => {
    return events.find(e => e.date === date)?.hasDeadline || false
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">{MONTHS[month]} {year}</h3>
        <Button variant="ghost" size="sm">
          <Calendar className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_NAMES.map(day => (
          <div key={day} className="py-2 text-center text-xs font-semibold text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, idx) => (
          <div
            key={idx}
            className={`aspect-square rounded-lg p-1 text-center text-sm font-medium transition-all ${
              date === null
                ? "bg-transparent"
                : hasDeadline(date)
                ? "bg-red-500/10 border border-red-500/30 text-foreground hover:shadow-md cursor-pointer"
                : getEventCount(date) > 0
                ? "bg-primary/10 border border-primary/30 text-foreground hover:shadow-md cursor-pointer"
                : "bg-muted/30 text-muted-foreground hover:bg-muted/50 cursor-pointer"
            }`}
          >
            {date && (
              <>
                <p>{date}</p>
                {(hasDeadline(date) || getEventCount(date) > 0) && (
                  <p className="text-xs text-primary font-semibold">
                    {getEventCount(date) > 0 && `${getEventCount(date)}`}
                  </p>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4 border-t border-border pt-3">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded bg-primary/50" />
          <span className="text-xs text-muted-foreground">Events</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded bg-red-500/50" />
          <span className="text-xs text-muted-foreground">Deadline</span>
        </div>
      </div>
    </div>
  )
}
