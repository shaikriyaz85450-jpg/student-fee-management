"use client"

// app/accountant/fee-structure/page.tsx
import { Edit2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

import { Topbar } from "../_components/topbar"
import { DashboardSidebar } from "../../components/sidebar/sidebar"
import { DashboardNavbar } from "../../components/navbar/navbar"
import { useData } from "@/app/data/provider"

export default function FeeStructurePage() {
  const { feeStructure, discounts, classFeeMap } = useData()

  const maxFee = classFeeMap.length > 0 
    ? Math.max(...classFeeMap.map(c => c.annualFee))
    : 14000

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardNavbar />

        <main className="p-6 md:ml-[260px]">
          <Topbar title="Fee structure" subtitle="Academic year 2024–25">
            <Button size="sm" variant="outline" onClick={() => toast.info("Edit mode coming soon!")}>
              <Edit2 className="h-3.5 w-3.5" /> Edit structure
            </Button>
          </Topbar>

          <div className="p-6 grid gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Fee categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {feeStructure.map((f) => (
                <div key={f.id} className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">{f.category}</p>
                    <p className="text-xs text-muted-foreground">{f.description} · {f.frequency} · {f.applicableClasses}</p>
                  </div>
                  <p className="text-base font-semibold text-[#1a2e4a]">₹{f.amount.toLocaleString("en-IN")}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Discounts & scholarships</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Type</th>
                    <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Discount</th>
                    <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Applicable on</th>
                  </tr>
                </thead>
                <tbody>
                  {discounts.map((d) => (
                    <tr key={d.type} className="border-b last:border-0">
                      <td className="py-2.5">{d.type}</td>
                      <td className="py-2.5">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${d.variant}`}>{d.pct}</span>
                      </td>
                      <td className="py-2.5 text-muted-foreground">{d.applicable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Class-wise annual fee</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {classFeeMap.map((c) => {
              const pct = Math.round((c.annualFee / maxFee) * 100)
              return (
                <div key={c.class}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">{c.class}</span>
                    <span className="font-semibold text-[#1a2e4a]">₹{c.annualFee.toLocaleString("en-IN")}</span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              )
            })}

            <div className="mt-6 rounded-lg border bg-muted/30 p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Fee summary</p>
              {[
                { label: "Min annual fee", value: "₹8,800", cls: "Class 6" },
                { label: "Max annual fee", value: "₹12,500", cls: "Class 10" },
                { label: "Average across classes", value: "₹10,500", cls: "All classes" },
              ].map((r) => (
                <div key={r.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-medium">{r.value} <span className="text-xs text-muted-foreground">({r.cls})</span></span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
