"use client"

// app/accountant/reports/page.tsx
import { useState } from "react"
import { FileText, Download, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"

import { Topbar } from "../_components/topbar"
import { useData } from "@/app/data/provider"
import { DashboardSidebar } from "../../components/sidebar/sidebar"
import { DashboardNavbar } from "../../components/navbar/navbar"

const REPORT_TYPES = [
  "Monthly collection summary",
  "Student-wise fee status",
  "Defaulter list",
  "Category-wise collection",
  "Term-wise summary",
]

export default function ReportsPage() {
  const { students, monthlyCollection } = useData()
  const [reportType, setReportType] = useState(REPORT_TYPES[0])
  const [fromDate, setFromDate] = useState("2025-04-01")
  const [toDate, setToDate] = useState("2025-05-20")
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  const generateReport = async () => {
    setGenerating(true)
    await new Promise((r) => setTimeout(r, 1000))
    setGenerating(false)
    setGenerated(true)
    toast.success("Report generated!")
  }

  const exportCSV = () => {
    toast.success("Report exported as CSV!")
  }

  const totalCollected = monthlyCollection.reduce((s, m) => s + m.collected, 0)
  const totalPending = monthlyCollection.reduce((s, m) => s + m.pending, 0)
  
  const clearedCount = students.filter(s => s.status === "Paid").length

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardNavbar />

        <main className="p-6 md:ml-[260px]">
          <Topbar title="Reports" subtitle="Generate and download fee reports" />

          <div className="p-6 space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Report generator */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Generate report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Report type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {REPORT_TYPES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">From date</Label>
                <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">To date</Label>
                <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
              </div>
              <div className="flex gap-2 pt-1">
                <Button className="flex-1 bg-[#1a2e4a] hover:bg-[#2a4a72] text-white" size="sm" onClick={generateReport} disabled={generating}>
                  {generating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-3.5 w-3.5" />}
                  Generate
                </Button>
                <Button variant="outline" size="sm" onClick={exportCSV} disabled={!generated}>
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Summary stats */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Total collected (YTD)", value: `₹${(totalCollected / 100000).toFixed(1)}L`, color: "text-emerald-600" },
                { label: "Total pending (YTD)", value: `₹${(totalPending / 1000).toFixed(0)}K`, color: "text-red-600" },
                { label: "Collection rate", value: `${Math.round((totalCollected / Math.max(1, totalCollected + totalPending)) * 100)}%`, color: "text-blue-600" },
                { label: "Students cleared", value: `${clearedCount} / ${students.length}`, color: "text-foreground" },
              ].map((s) => (
                <Card key={s.label}>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className={`mt-1 text-xl font-semibold ${s.color}`}>{s.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Annual chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Annual collection overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyCollection} barSize={12} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `₹${v / 1000}K`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={50} />
                <Tooltip formatter={(v: number) => `₹${(v / 1000).toFixed(0)}K`} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="collected" name="Collected" fill="#1a2e4a" radius={[3, 3, 0, 0]} />
                <Bar dataKey="pending" name="Pending" fill="#e8a020" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
