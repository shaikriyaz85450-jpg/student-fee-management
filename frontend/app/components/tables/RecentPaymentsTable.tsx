"use client"

import React from "react"
import { 
  CreditCard, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  XCircle,
  CreditCardIcon,
  Building2,
  Smartphone
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useData } from "@/app/data/provider"
import type { Payment } from "@/types"

export interface PaymentRecord {
  id: string
  date: string
  amount: string
  method: "card" | "bank" | "upi"
  status: "paid" | "pending" | "failed"
}

interface RecentPaymentsTableProps {
  payments?: (Payment | PaymentRecord)[]
  onViewAll?: () => void
  isCompact?: boolean
}


// payments will be derived from the shared store inside the component

const paymentMethodIcons = {
  card: CreditCard,
  bank: Building2,
  upi: Smartphone,
}

const paymentMethodLabels = {
  card: "Credit Card",
  bank: "Bank Transfer",
  upi: "UPI",
}

const getStatusConfig = (status: "paid" | "pending" | "failed") => {
  switch (status) {
    case "paid":
      return {
        badge: "bg-emerald-500/10 text-emerald-500",
        icon: CheckCircle2,
        label: "Paid",
        dotColor: "bg-emerald-500",
      }
    case "pending":
      return {
        badge: "bg-amber-500/10 text-amber-500",
        icon: Clock,
        label: "Pending",
        dotColor: "bg-amber-500",
      }
    case "failed":
      return {
        badge: "bg-red-500/10 text-red-500",
        icon: XCircle,
        label: "Failed",
        dotColor: "bg-red-500",
      }
  }
}

export const RecentPaymentsTable: React.FC<RecentPaymentsTableProps> = ({
  payments,
  onViewAll,
  isCompact = false,
}) => {
  const { payments: storePayments } = useData()
  const sourcePayments = payments ?? storePayments ?? []
  const mapped = sourcePayments.map((p: any) => {
    const isStorePayment = "mode" in p;
    const method = isStorePayment 
      ? (p.mode === "UPI" ? "upi" : p.mode === "Bank Transfer" ? "bank" : "card")
      : p.method;
    const status = isStorePayment ? "paid" : p.status;
    const amount = isStorePayment ? `₹${p.amount.toLocaleString("en-IN")}` : p.amount;
    return {
      id: p.id,
      date: new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      amount,
      method: method as "card" | "bank" | "upi",
      status: status as "paid" | "pending" | "failed",
    };
  })
  const displayPayments = isCompact ? mapped.slice(0, 3) : mapped

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-card/50 to-card/30 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Recent Student Payments</h2>
          <p className="text-sm text-muted-foreground">Latest payments across all student accounts</p>
        </div>
        {isCompact && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onViewAll}
            className="gap-2"
          >
            <DollarSign className="h-4 w-4" />
            View All
          </Button>
        )}
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Payment ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Payment Method
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {displayPayments.map((payment, index) => {
              const statusConfig = getStatusConfig(payment.status)
              const MethodIcon = paymentMethodIcons[payment.method]
              const StatusIcon = statusConfig.icon

              return (
                <tr
                  key={payment.id}
                  className="group border-b border-border/50 transition-colors hover:bg-muted/40"
                >
                  {/* Payment ID */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-2.5 w-2.5 rounded-full ${statusConfig.dotColor}`} />
                      <code className="text-sm font-mono font-semibold text-foreground">
                        {payment.id}
                      </code>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {payment.date}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-foreground">
                      {payment.amount}
                    </span>
                  </td>

                  {/* Payment Method */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                        <MethodIcon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">
                        {paymentMethodLabels[payment.method]}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${statusConfig.badge}`}
                      >
                        <StatusIcon className="h-3.5 w-3.5" />
                        {statusConfig.label}
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {!isCompact && (
        <div className="border-t border-border bg-muted/20 px-6 py-4">
          <p className="text-xs text-muted-foreground">
            Showing {displayPayments.length} of {sourcePayments.length} payments
          </p>
        </div>
      )}
    </div>
  )
}

export default RecentPaymentsTable
