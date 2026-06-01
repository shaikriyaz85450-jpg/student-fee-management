"use client"

// app/accountant/pending-fees/page.tsx
import { useState } from "react"
import { Bell, CreditCard, Download, AlertTriangle, IndianRupee, Clock } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { Topbar } from "../_components/topbar"
import { DashboardSidebar } from "../../components/sidebar/sidebar"
import { DashboardNavbar } from "../../components/navbar/navbar"
import { StatCard } from "../_components/stat-card"
import { CategoryBadge } from "../_components/status-badge"
import { RecordPaymentDialog } from "../_components/record-payment-dialog"
import { useData } from "@/app/data/provider"

export default function PendingFeesPage() {
  const { pendingFees } = useData()
  const [payOpen, setPayOpen] = useState(false)

  const totalDue = pendingFees.reduce((s, p) => s + p.dueAmount, 0)
  const avgDays = pendingFees.length > 0 
    ? Math.round(pendingFees.reduce((s, p) => s + p.daysOverdue, 0) / pendingFees.length)
    : 0

  const exportCSV = () => {
    const csv = ["Student,Class,Category,Due Amount,Due Date,Days Overdue",
      ...pendingFees.map((p) => `${p.studentName},${p.class},${p.category},${p.dueAmount},${p.dueDate},${p.daysOverdue}`)
    ].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = "pending-fees.csv"; a.click()
    toast.success("CSV exported!")
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardNavbar />

        <main className="p-6 md:ml-[260px]">
          <Topbar title="Pending fees" subtitle="Students with outstanding dues">
            <Button variant="outline" size="sm" onClick={exportCSV}>
              <Download className="h-3.5 w-3.5" /> Export
            </Button>
          </Topbar>
          <RecordPaymentDialog open={payOpen} onOpenChange={setPayOpen} />

          <div className="p-6 space-y-6">
        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Overdue students" value={String(pendingFees.length)} sub="Requires immediate action" subType="down" icon={AlertTriangle} iconBg="bg-red-50" iconColor="text-red-600" />
          <StatCard label="Total pending" value={`₹${(totalDue / 100000).toFixed(2)}L`} sub="Across all categories" icon={IndianRupee} iconBg="bg-amber-50" iconColor="text-amber-600" />
          <StatCard label="Avg overdue days" value={String(avgDays)} sub="Days past due date" subType="down" icon={Clock} iconBg="bg-orange-50" iconColor="text-orange-600" />
        </div>

        <Card className="p-0">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  {["Student", "Class", "Category", "Due Amount", "Due Date", "Overdue", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pendingFees.map((p, i) => {
                  const initials = p.studentName.split(" ").map((w) => w[0]).join("").slice(0, 2)
                  const urgency = p.daysOverdue >= 20 ? "destructive" : p.daysOverdue >= 10 ? "secondary" : "outline"
                  return (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-[11px] font-semibold text-red-700">
                            {initials}
                          </div>
                          <span className="font-medium">{p.studentName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{p.class}</td>
                      <td className="px-4 py-3"><CategoryBadge category={p.category} /></td>
                      <td className="px-4 py-3 font-semibold text-red-600">₹{p.dueAmount.toLocaleString("en-IN")}</td>
                      <td className="px-4 py-3 text-muted-foreground">{format(new Date(p.dueDate), "d MMM yyyy")}</td>
                      <td className="px-4 py-3">
                        <Badge variant={urgency} className={`text-[11px] ${p.daysOverdue >= 20 ? "bg-red-50 text-red-700 border-red-200" : p.daysOverdue >= 10 ? "bg-amber-50 text-amber-700 border-amber-200" : ""}`}>
                          {p.daysOverdue} days
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast.success(`Reminder sent to ${p.studentName}`)}>
                            <Bell className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPayOpen(true)}>
                            <CreditCard className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
