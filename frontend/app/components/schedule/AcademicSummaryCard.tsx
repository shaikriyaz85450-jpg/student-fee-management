"use client"

import React from "react"
import { BookOpen, Award, TrendingUp, Calendar } from "lucide-react"

interface AcademicSummaryCardProps {
  gpa: string
  credits: string
  attendance: string
  year: string
}

export const AcademicSummaryCard: React.FC<AcademicSummaryCardProps> = ({
  gpa,
  credits,
  attendance,
  year,
}) => {
  const cards = [
    {
      label: "Current GPA",
      value: gpa,
      icon: Award,
      color: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-500",
    },
    {
      label: "Credits Earned",
      value: credits,
      icon: BookOpen,
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      label: "Attendance",
      value: attendance,
      icon: TrendingUp,
      color: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-500",
    },
    {
      label: "Academic Year",
      value: year,
      icon: Calendar,
      color: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-500",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl border border-border bg-card/50 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/10"
          >
            {/* Gradient blob on hover */}
            <div className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${card.color} opacity-0 transition-opacity group-hover:opacity-100`} />

            {/* Content */}
            <div className="relative space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${card.color}`}>
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
