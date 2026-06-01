"use client"

import React from "react"
import { Award, Target, BookOpen, Zap } from "lucide-react"
import { useData } from "@/app/data/provider"

interface PerformanceMetric {
  label: string
  value: string
  description: string
  progress: number
  icon: React.ReactNode
}

export const PerformanceOverviewCard: React.FC = () => {
  const { students } = useData()
  const currentStudent = students.find(s => s.id === "S001") || students[0]

  const totalFee = currentStudent?.totalFee || 1
  const paidAmount = currentStudent?.paidAmount || 0
  const dueAmount = currentStudent?.dueAmount || 0

  const coveragePct = Math.min(100, Math.round((paidAmount / totalFee) * 100))
  const compliancePct = dueAmount === 0 ? 100 : currentStudent?.daysOverdue ? Math.max(0, 100 - currentStudent.daysOverdue * 2) : 90
  
  const academicStatus = dueAmount === 0 ? "Active" : "Dues Pending"
  const academicProgress = dueAmount === 0 ? 100 : 75

  const healthStatus = dueAmount === 0 ? "Excellent" : paidAmount > 0 ? "Good" : "Attention"
  const healthProgress = dueAmount === 0 ? 100 : paidAmount > 0 ? 75 : 30

  const metrics: PerformanceMetric[] = [
    {
      label: "Payment Compliance",
      value: `${compliancePct}%`,
      description: dueAmount === 0 ? "All payments on time" : `${currentStudent?.daysOverdue || 0} days past due date`,
      progress: compliancePct,
      icon: <Award className="h-5 w-5" />,
    },
    {
      label: "Fee Coverage",
      value: `${coveragePct}%`,
      description: `₹${paidAmount.toLocaleString("en-IN")} of ₹${totalFee.toLocaleString("en-IN")} paid`,
      progress: coveragePct,
      icon: <Target className="h-5 w-5" />,
    },
    {
      label: "Academic Status",
      value: academicStatus,
      description: dueAmount === 0 ? "No fee dues blocking account" : "Clear dues to avoid hold",
      progress: academicProgress,
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      label: "Payment Health",
      value: healthStatus,
      description: dueAmount === 0 ? "Consistent on-time payments" : "Outstanding balance remaining",
      progress: healthProgress,
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
