"use client"

import React from "react"
import { AlertCircle, Calendar, DollarSign, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaymentReminderProps {
  title: string
  amount: string
  dueDate: string
  daysRemaining: number
  category: "tuition" | "lab" | "exam" | "library" | "sports"
  onPayNow?: () => void
}

const categoryConfig = {
  tuition: { color: "bg-blue-500/10", textColor: "text-blue-500", label: "Tuition" },
  lab: { color: "bg-emerald-500/10", textColor: "text-emerald-500", label: "Lab Fee" },
  exam: { color: "bg-amber-500/10", textColor: "text-amber-500", label: "Exam Fee" },
  library: { color: "bg-purple-500/10", textColor: "text-purple-500", label: "Library Fee" },
  sports: { color: "bg-pink-500/10", textColor: "text-pink-500", label: "Sports Fee" },
}

export const PaymentReminderCard: React.FC<PaymentReminderProps> = ({
  title,
  amount,
  dueDate,
  daysRemaining,
  category,
  onPayNow,
}) => {
  const config = categoryConfig[category]
  const isUrgent = daysRemaining <= 3

  return (
    <div className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
      isUrgent 
        ? "border-amber-500/30 bg-card hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10" 
        : "border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
    }`}>
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="relative p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${config.color}`}>
              {isUrgent ? (
                <Bell className={`h-5 w-5 ${config.textColor}`} />
              ) : (
                <DollarSign className={`h-5 w-5 ${config.textColor}`} />
              )}
            </div>
            <div>
              <p className="font-medium text-foreground">{title}</p>
              <p className="text-xs text-muted-foreground mt-1">{config.label}</p>
            </div>
          </div>
          {isUrgent && (
            <div className="flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-1">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-medium text-amber-500">Urgent</span>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Amount Due</span>
            <span className="font-semibold text-foreground">{amount}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Due Date</span>
            </div>
            <span className={`font-medium ${isUrgent ? "text-amber-500" : "text-foreground"}`}>
              {dueDate}
            </span>
          </div>
          <div className="pt-2 border-t border-border">
            <p className={`text-xs font-medium ${isUrgent ? "text-amber-500" : "text-muted-foreground"}`}>
              {daysRemaining} day{daysRemaining !== 1 ? "s" : ""} remaining
            </p>
          </div>
        </div>

        <Button 
          onClick={onPayNow}
          className="mt-4 w-full bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 hover:shadow-lg hover:shadow-primary/40"
          size="sm"
        >
          Pay Now
        </Button>
      </div>
    </div>
  )
}
