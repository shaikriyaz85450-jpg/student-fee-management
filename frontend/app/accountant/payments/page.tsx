"use client"

// app/accountant/payments/page.tsx
import { useState } from "react"
import { Download, Printer } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

import { Topbar } from "../_components/topbar"
import { CategoryBadge } from "../_components/status-badge"
import { RecordPaymentDialog } from "../_components/record-payment-dialog"
import { useData } from "@/app/data/provider"
import type { Payment } from "@/types"
import { DashboardSidebar } from "../../components/sidebar/sidebar"
import { DashboardNavbar } from "../../components/navbar/navbar"

export default function PaymentsPage() {
  const [payOpen, setPayOpen] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [modeFilter, setModeFilter] = useState("all")

  const { payments } = useData()
  const filtered = payments.filter((p: Payment) => {
    const matchCat = categoryFilter === "all" || p.category === categoryFilter
    const matchMode = modeFilter === "all" || p.mode === modeFilter
    return matchCat && matchMode
  })

  const totalAmount = filtered.reduce((s, p) => s + p.amount, 0)

  const exportCSV = () => {
    const headers = ["Receipt No", "Student", "Class", "Category", "Amount", "Mode", "Date", "Ref"]
    const rows = filtered.map((p) => [p.receiptNo, p.studentName, p.class, p.category, p.amount, p.mode, p.date, p.transactionRef])
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "payments.csv"
    a.click()
    toast.success("CSV exported!")
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardNavbar />

        <main className="p-6 md:ml-[260px]">
          <Topbar title="Fee collection" subtitle={`${filtered.length} transactions · Total ₹${totalAmount.toLocaleString("en-IN")}`}>
            <Button variant="outline" size="sm" onClick={exportCSV}>
              <Download className="h-3.5 w-3.5" /> Export
            </Button>
          </Topbar>
          <RecordPaymentDialog open={payOpen} onOpenChange={setPayOpen} />

          <div className="p-0 space-y-4">
            <div className="flex flex-wrap gap-3 items-center">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-36"><SelectValue placeholder="All categories" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {["Tuition", "Lab", "Bus", "Library", "Sports"].map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={modeFilter} onValueChange={setModeFilter}>
            <SelectTrigger className="w-36"><SelectValue placeholder="All modes" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All modes</SelectItem>
              {["Cash", "UPI", "Bank Transfer", "Cheque", "DD"].map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" className="bg-[#1a2e4a] hover:bg-[#2a4a72] text-white ml-auto" onClick={() => setPayOpen(true)}>
            + Record payment
          </Button>
        </div>

        <Card className="p-0">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  {["Receipt #", "Student", "Class", "Category", "Amount", "Mode", "Date", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{p.receiptNo}</td>
                    <td className="px-4 py-3 font-medium">{p.studentName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.class}</td>
                    <td className="px-4 py-3"><CategoryBadge category={p.category} /></td>
                    <td className="px-4 py-3 font-semibold">₹{p.amount.toLocaleString("en-IN")}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-[11px]">{p.mode}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{format(new Date(p.date), "d MMM yyyy")}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast.info("Printing receipt...")}>
                          <Printer className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast.info("Downloading receipt...")}>
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-sm text-muted-foreground">No payments found.</div>
            )}
          </CardContent>
        </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
