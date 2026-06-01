"use client"

// app/accountant/dashboard/page.tsx
import { Users, IndianRupee, AlertTriangle, TrendingUp } from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Topbar } from "../_components/topbar"
import { StatusBadge } from "../_components/status-badge"
import { useData } from "@/app/data/provider"
import { DashboardSidebar } from "@/app/components/sidebar/sidebar"
import { DashboardNavbar } from "@/app/components/navbar/navbar"
import AnalyticsStatCard from "@/app/components/statcards/statcards"
import { format } from "date-fns"

const fmt = (n: number) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`

export default function DashboardPage() {
  const { students, payments, monthlyCollection, categoryCollection } = useData()

  const currentMonthData = monthlyCollection[monthlyCollection.length - 1] || { collected: 0, pending: 0 };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardNavbar />

        <main className="p-6 md:ml-[260px]">
          <Topbar
            title="Dashboard"
            subtitle={format(new Date(), "EEEE, d MMMM yyyy")}
          />
          <div className="p-0 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnalyticsStatCard
            label="Total Students"
            value={String(students.length)}
            subValue="Enrolled"
            change={`+${Math.round((students.length / 200) * 100)}%`}
            trend="up"
            icon={Users}
            gradient="amber"
            textColor="black"
          />
          <AnalyticsStatCard
            label="Fees Collected"
            value={`₹${payments.reduce((s, p) => s + p.amount, 0).toLocaleString("en-IN")}`}
            subValue="YTD"
            change="+12%"
            trend="up"
            icon={IndianRupee}
            gradient="amber"
            textColor="black"
          />
          <AnalyticsStatCard
            label="Pending Amount"
            value={`₹${students.reduce((s, t) => s + (t.dueAmount || 0), 0).toLocaleString("en-IN")}`}
            subValue="Across students"
            change="-8%"
            trend="down"
            icon={AlertTriangle}
            gradient="amber"
            textColor="black"
          />
          <AnalyticsStatCard
            label="This Month"
            value={`₹${currentMonthData.collected.toLocaleString("en-IN")}`}
            subValue={`${currentMonthData.collected ? currentMonthData.collected.toLocaleString("en-IN") : 0} collected`}
            change="+5%"
            trend="up"
            icon={TrendingUp}
            gradient="amber"
            textColor="black"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-5">
          {/* Bar chart */}
          <Card className="lg:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Monthly fee collection</CardTitle>
              <p className="text-xs text-muted-foreground">Academic year 2024–25</p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-3">
                {[{ color: "#1a2e4a", label: "Collected" }, { color: "#e8a020", label: "Pending" }].map((l) => (
                  <span key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: l.color }} />
                    {l.label}
                  </span>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyCollection} barSize={10} barGap={3}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={(v) => `₹${v / 1000}K`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={48} />
                  <Tooltip formatter={(v: number) => fmt(v)} />
                  <Bar dataKey="collected" fill="#1a2e4a" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="pending" fill="#e8a020" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie chart */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Collection by category</CardTitle>
              <p className="text-xs text-muted-foreground">Current month breakdown</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={categoryCollection} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                    {categoryCollection.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Legend
                    formatter={(value, entry: any) => (
                      <span className="text-xs text-foreground">{value} {entry.payload.value}%</span>
                    )}
                  />
                  <Tooltip formatter={(v) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent payments */}
        <Card>
          <CardHeader className="flex-row items-center justify-between py-3">
            <CardTitle className="text-sm font-medium">Recent payments</CardTitle>
            <a href="/accountant/payments" className="text-xs text-blue-600 hover:underline">View all →</a>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    {["Student", "Class", "Category", "Amount", "Date", "Status"].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payments.slice(0, 6).map((p) => (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{p.studentName}</td>
                      <td className="px-4 py-3 text-muted-foreground">{p.class}</td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 text-[11px]">{p.category}</Badge>
                      </td>
                      <td className="px-4 py-3 font-medium">₹{p.amount.toLocaleString("en-IN")}</td>
                      <td className="px-4 py-3 text-muted-foreground">{format(new Date(p.date), "d MMM yyyy")}</td>
                      <td className="px-4 py-3"><StatusBadge status="Paid" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

          </div>

        </main>
      </div>
    </div>
  )
}
