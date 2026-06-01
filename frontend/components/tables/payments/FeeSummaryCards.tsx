"use client"

import React from "react"
import { AnalyticsStatCard } from "./analytics-stat-card"
import { useData } from "@/app/data/provider"
import { CreditCard, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react"

interface FeeSummarCardsProps {
  totalFee?: string
  paidFee?: string
  pendingFee?: string
  paidPercentage?: number
}

export const FeeSummaryCards: React.FC<FeeSummarCardsProps> = ({
  totalFee,
  paidFee,
  pendingFee,
  paidPercentage,
}) => {
  const { students } = useData()
  
  const total = totalFee ?? `₹${students.reduce((s, t) => s + t.totalFee, 0).toLocaleString("en-IN")}`
  const paid = paidFee ?? `₹${students.reduce((s, t) => s + t.paidAmount, 0).toLocaleString("en-IN")}`
  const pending = pendingFee ?? `₹${(students.reduce((s, t) => s + t.totalFee, 0) - students.reduce((s, t) => s + t.paidAmount, 0)).toLocaleString("en-IN")}`
  const pct = paidPercentage ?? Math.round((students.reduce((s, t) => s + t.paidAmount, 0) / Math.max(1, students.reduce((s, t) => s + t.totalFee, 0))) * 100)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <AnalyticsStatCard
        label="Total Fee"
        value={total}
        subValue="This academic year"
        change={`${pct}% paid`}
        trend="neutral"
        icon={CreditCard}
        gradient="primary"
      />
      <AnalyticsStatCard
        label="Paid Fee"
        value={paid}
        subValue="Successfully paid"
        change="+8%"
        trend="up"
        icon={CheckCircle2}
        gradient="emerald"
      />
      <AnalyticsStatCard
        label="Pending Fee"
        value={pending}
        subValue="Awaiting payment"
        change="-2"
        trend="down"
        icon={AlertCircle}
        gradient="amber"
      />
      <AnalyticsStatCard
        label="Payment Trend"
        value="↑ 12%"
        subValue="vs last semester"
        change="Increasing"
        trend="up"
        icon={TrendingUp}
        gradient="primary"
      />
    </div>
  )
}
