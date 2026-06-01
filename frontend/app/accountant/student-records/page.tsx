"use client"

// app/accountant/student-records/page.tsx
import { useState } from "react"
import { Download, Edit2, Receipt, Search } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

import { Topbar } from "../_components/topbar"
import { StatusBadge } from "../_components/status-badge"
import { AddStudentDialog } from "../_components/add-student-dialog"
import { useData } from "@/app/data/provider"
import type { Student } from "@/types"
import { DashboardSidebar } from "../../components/sidebar/sidebar"
import { DashboardNavbar } from "../../components/navbar/navbar"

export default function StudentRecordsPage() {
  const [search, setSearch] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [addOpen, setAddOpen] = useState(false)

  const { students, addStudent } = useData()
  const filtered = students.filter((s: Student) => {
    const matchSearch = !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase())
    const matchClass = classFilter === "all" || s.class === classFilter
    const matchStatus = statusFilter === "all" || s.status === statusFilter
    return matchSearch && matchClass && matchStatus
  })

  const exportCSV = () => {
    const headers = ["Name", "Roll No", "Class", "Section", "Total Fee", "Paid", "Due", "Status", "Discount"]
    const rows = filtered.map((s) => [s.name, s.rollNo, s.class, s.section, s.totalFee, s.paidAmount, s.dueAmount, s.status, s.discount])
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "students.csv"
    a.click()
    toast.success("CSV exported!")
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardNavbar />

        <main className="p-6 md:ml-[260px]">
          <Topbar title="Student records" subtitle={`${filtered.length} students`}>
            <Button variant="outline" size="sm" onClick={exportCSV}>
              <Download className="h-3.5 w-3.5" /> Export CSV
            </Button>
          </Topbar>
          <AddStudentDialog open={addOpen} onOpenChange={setAddOpen} onSuccess={() => {}} />

          <div className="p-0 space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-8"
              placeholder="Search by name, roll number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-36"><SelectValue placeholder="All classes" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All classes</SelectItem>
              {["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"].map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32"><SelectValue placeholder="All status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Partial">Partial</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="bg-[#1a2e4a] hover:bg-[#2a4a72] text-white ml-auto" onClick={() => setAddOpen(true)}>
            + Add student
          </Button>
        </div>

        <Card className="p-0">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  {["Student", "Roll No", "Class", "Total Fee", "Paid", "Due", "Progress", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => {
                  const pct = Math.round((s.paidAmount / s.totalFee) * 100)
                  const initials = s.name.split(" ").map((w) => w[0]).join("").slice(0, 2)
                  return (
                    <tr key={s.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a2e4a] text-[11px] font-semibold text-white">
                            {initials}
                          </div>
                          <div>
                            <p className="font-medium leading-tight">{s.name}</p>
                            {s.discount !== "None" && (
                              <p className="text-[11px] text-amber-600">{s.discount}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{s.rollNo}</td>
                      <td className="px-4 py-3">{s.class} — {s.section}</td>
                      <td className="px-4 py-3">₹{s.totalFee.toLocaleString("en-IN")}</td>
                      <td className="px-4 py-3 text-emerald-700">₹{s.paidAmount.toLocaleString("en-IN")}</td>
                      <td className={`px-4 py-3 font-medium ${s.dueAmount > 0 ? "text-red-600" : "text-emerald-600"}`}>
                        ₹{s.dueAmount.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 w-28">
                        <div className="space-y-1">
                          <Progress value={pct} className="h-1.5" />
                          <p className="text-[10px] text-muted-foreground">{pct}% paid</p>
                        </div>
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast.info(`Editing ${s.name}`)}>
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast.info(`Receipt for ${s.name}`)}>
                            <Receipt className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-sm text-muted-foreground">No students found.</div>
            )}
          </CardContent>
        </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
