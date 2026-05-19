"use client"

import React from "react"
import { Award, Target, BookOpen, Zap } from "lucide-react"

interface PerformanceMetric {
  label: string
  value: string
  description: string
  progress: number
  icon: React.ReactNode
}

export const PerformanceOverviewCard: React.FC = () => {
  const metrics: PerformanceMetric[] = [
    {
      label: "Payment Compliance",
      value: "96%",
      description: "On-time payments",
      progress: 96,
      icon: <Award className="h-5 w-5" />,
    },
    {
      label: "Fee Coverage",
      value: "90%",
      description: "Total fees paid",
      progress: 90,
      icon: <Target className="h-5 w-5" />,
    },
    {
      label: "Academic Status",
      value: "Active",
      description: "No fee dues blocking",
      progress: 100,
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      label: "Payment Health",
      value: "Excellent",
      description: "Consistent payments",
      progress: 98,
      icon: <Zap className="h-5 w-5" />,
    },
  ]

  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
      <h2 className="mb-5 text-lg font-semibold text-foreground">Performance Overview</h2>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 text-primary flex-shrink-0">
              {metric.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-foreground">{metric.label}</p>
                <span className="text-sm font-semibold text-primary">{metric.value}</span>
              </div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
              <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500"
                  style={{ width: `${metric.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PerformanceOverviewCard
