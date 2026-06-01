"use client"

// app/accountant/receipts/page.tsx
import { useState } from "react"
import { Printer, Download, Search, Eye } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import { Topbar } from "../_components/topbar"
import { CategoryBadge } from "../_components/status-badge"
import { useData } from "@/app/data/provider"
import type { Payment } from "@/types"
import { DashboardSidebar } from "../../components/sidebar/sidebar"
import { DashboardNavbar } from "../../components/navbar/navbar"

export default function ReceiptsPage() {
  const [search, setSearch] = useState("")
  const [preview, setPreview] = useState<Payment | null>(null)

  const { payments } = useData()
  const filtered = payments.filter((p) =>
    !search ||
    p.studentName.toLowerCase().includes(search.toLowerCase()) ||
    p.receiptNo.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardNavbar />

        <main className="p-6 md:ml-[260px]">
          <Topbar title="Receipts" subtitle="View, print & download payment receipts" />

          <div className="p-0 space-y-6">
            <div className="grid gap-6 lg:grid-cols-5">
          {/* Receipt list */}
          <div className="lg:col-span-3 space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8"
                placeholder="Search by student name or receipt number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Card className="p-0">
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      {["Receipt #", "Student", "Category", "Amount", "Date", ""].map((h) => (
                        <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p) => (
                      <tr key={p.id} className={`border-b last:border-0 hover:bg-muted/20 transition-colors cursor-pointer ${preview?.id === p.id ? "bg-blue-50/50" : ""}`} onClick={() => setPreview(p)}>
                        <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{p.receiptNo}</td>
                        <td className="px-4 py-3 font-medium">{p.studentName}</td>
                        <td className="px-4 py-3"><CategoryBadge category={p.category} /></td>
                        <td className="px-4 py-3 font-semibold">₹{p.amount.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-3 text-muted-foreground">{format(new Date(p.date), "d MMM yy")}</td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="h-3.5 w-3.5" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          {/* Receipt preview */}
          <div className="lg:col-span-2">
            {preview ? (
              <Card>
                <CardContent className="p-5">
                  {/* Header */}
                  <div className="text-center mb-5 pb-4 border-b">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Payment Receipt</p>
                    <h2 className="text-lg font-bold text-[#1a2e4a]">FeeFlow School</h2>
                    <p className="text-xs text-muted-foreground">123 School Road, Tirupati · (0877) 234-5678</p>
                  </div>

                  {/* Meta */}
                  {[
                    { label: "Receipt No.", value: preview.receiptNo },
                    { label: "Student", value: preview.studentName },
                    { label: "Class", value: `${preview.class}` },
                    { label: "Date", value: format(new Date(preview.date), "d MMMM yyyy") },
                    { label: "Payment Mode", value: preview.mode },
                    { label: "Reference", value: preview.transactionRef || "—" },
                  ].map((r) => (
                    <div key={r.label} className="flex justify-between py-1.5 text-sm">
                      <span className="text-muted-foreground">{r.label}</span>
                      <span className="font-medium">{r.value}</span>
                    </div>
                  ))}

                  <Separator className="my-3" />

                  {/* Amount */}
                  <div className="flex justify-between py-1.5 text-sm">
                    <span className="text-muted-foreground">{preview.category} Fee</span>
                    <span>₹{preview.amount.toLocaleString("en-IN")}</span>
                  </div>

                  <Separator className="my-3" />

                  <div className="flex justify-between text-base font-semibold">
                    <span>Total Paid</span>
                    <span className="text-[#1a2e4a]">₹{preview.amount.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="mt-4 rounded-lg bg-emerald-50 py-2 text-center">
                    <p className="text-xs font-medium text-emerald-700">✓ Payment received</p>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1 bg-[#1a2e4a] hover:bg-[#2a4a72] text-white" size="sm" onClick={() => toast.success("Printing...")}>
                      <Printer className="mr-1.5 h-3.5 w-3.5" /> Print
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => toast.success("Downloaded!")}>
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="flex items-center justify-center h-64 border-dashed">
                <div className="text-center text-muted-foreground">
                  <Eye className="mx-auto h-8 w-8 mb-2 opacity-40" />
                  <p className="text-sm">Select a receipt to preview</p>
                </div>
              </Card>
            )}
          </div>
        </div>
          </div>
        </main>
      </div>
    </div>
  )
}
