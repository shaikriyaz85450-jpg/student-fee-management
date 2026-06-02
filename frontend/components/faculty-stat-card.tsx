"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FacultyStatCardProps {
  label: string
  value: number | string
  subValue: string
  change: string
  trend: "up" | "down"
  icon: React.ComponentType<{ className?: string }>
  gradient?: "primary" | "emerald" | "amber" | "purple"
}

const gradientClasses: Record<NonNullable<FacultyStatCardProps["gradient"]>, string> = {
  primary: "bg-gradient-to-br from-primary to-primary/70 text-white",
  emerald: "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white",
  amber: "bg-gradient-to-br from-amber-500 to-amber-600 text-white",
  purple: "bg-gradient-to-br from-violet-500 to-violet-600 text-white",
}

export function FacultyStatCard({
  label,
  value,
  subValue,
  change,
  trend,
  icon: Icon,
  gradient = "primary",
}: FacultyStatCardProps) {
  return (
    <Card className="overflow-hidden rounded-3xl border border-border bg-card/70">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {label}
            </p>
            <p className="text-3xl font-semibold text-foreground">{value}</p>
          </div>
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-3xl shadow-sm", gradientClasses[gradient])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>{subValue}</p>
          <span className={cn("font-semibold", trend === "up" ? "text-emerald-500" : "text-rose-500")}>{change}</span>
        </div>
      </CardContent>
    </Card>
  )
}
