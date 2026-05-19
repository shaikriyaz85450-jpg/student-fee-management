"use client"

import React from "react"
import { CreditCard, CheckCircle2, Clock, TrendingUp } from "lucide-react"

interface TransactionStats {
  label: string
  value: string
  icon: React.ReactNode
  color: "emerald" | "primary" | "amber" | "blue"
}

const colorClasses = {
  emerald: "from-emerald-500/20 to-emerald-400/5 text-emerald-500",
  primary: "from-primary/20 to-primary/5 text-primary",
  amber: "from-amber-500/20 to-amber-400/5 text-amber-500",
  blue: "from-blue-500/20 to-blue-400/5 text-blue-500",
}

export const TransactionSummaryCard: React.FC = () => {
  const stats: TransactionStats[] = [
    {
      label: "Total Transactions",
      value: "47",
      icon: <CreditCard className="h-5 w-5" />,
      color: "primary",
    },
    {
      label: "Completed",
      value: "44",
      icon: <CheckCircle2 className="h-5 w-5" />,
      color: "emerald",
    },
    {
      label: "Pending",
      value: "3",
      icon: <Clock className="h-5 w-5" />,
      color: "amber",
    },
    {
      label: "Success Rate",
      value: "93.6%",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "blue",
    },
  ]

  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
      <h2 className="mb-5 text-lg font-semibold text-foreground">Transaction Summary</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group rounded-xl border border-border bg-muted/30 p-4 transition-all hover:border-primary/30"
          >
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${colorClasses[stat.color]} mb-3`}>
              {stat.icon}
            </div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionSummaryCard
