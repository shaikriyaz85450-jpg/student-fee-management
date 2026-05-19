"use client"

import React from "react"
import { AnalyticsStatCard } from "./analytics-stat-card"
import { CreditCard, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react"

interface FeeSummarCardsProps {
  totalFee?: string
  paidFee?: string
  pendingFee?: string
  paidPercentage?: number
}

export const FeeSummaryCards: React.FC<FeeSummarCardsProps> = ({
  totalFee = "₹52,500",
  paidFee = "₹47,500",
  pendingFee = "₹5,000",
  paidPercentage = 90,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <AnalyticsStatCard
        label="Total Fee"
        value={totalFee}
        subValue="This academic year"
        change={`${paidPercentage}% paid`}
        trend="neutral"
        icon={CreditCard}
        gradient="primary"
      />
      <AnalyticsStatCard
        label="Paid Fee"
        value={paidFee}
        subValue="Successfully paid"
        change="+8%"
        trend="up"
        icon={CheckCircle2}
        gradient="emerald"
      />
      <AnalyticsStatCard
        label="Pending Fee"
        value={pendingFee}
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
