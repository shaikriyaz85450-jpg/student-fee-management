"use client";

import { DashboardSidebar } from "../../components/sidebar/sidebar";
import { DashboardNavbar } from "../../components/navbar/navbar";
import AnalyticsStatCard from "../../components/statcards/statcards";

import {
  Users,
  CalendarDays,
  ClipboardCheck,
  BadgeAlert,
} from "lucide-react";
import { useData } from "@/app/data/provider"
import { Card, CardContent } from "@/components/ui/card"

// import { FeesBarChart } from "../../components/charts/FeeAnalyticsChart";
// import { MonthlyActivityChart } from "../../components/charts/MothlyFeeActivity";

// import { RecentPaymentsTable } from "../../components/tables/RecentPaymentsTable";

export default function FacultyDashboard() {
  const { students, loading, error } = useData()
  
  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardNavbar />
          <main className="p-6">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="pt-6">
                <p className="text-red-800 font-semibold">Error loading data:</p>
                <p className="text-red-600">{error}</p>
                <p className="text-sm text-red-500 mt-2">Check browser console (F12 → Console) for details.</p>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardNavbar />
          <main className="p-6">
            <p className="text-gray-600">Loading data...</p>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1">

        {/* Navbar */}
        <DashboardNavbar />

        {/* Dashboard Content */}
        <main className="p-6">

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ml-14">

            <AnalyticsStatCard
              label="Total Students"
              value={String(students.length)}
              subValue="Across All Departments"
              change="12%"
              trend="up"
              icon={Users}
              gradient="primary"
              textColor="black"
            />

            <AnalyticsStatCard
              label="Today's Classes"
              value="08"
              subValue="Scheduled Today"
              change="4%"
              trend="up"
              icon={CalendarDays}
              gradient="emerald"
              textColor="black"
            />

            <AnalyticsStatCard
              label="Attendance"
              value="92%"
              subValue="Average Attendance"
              change="3%"
              trend="up"
              icon={ClipboardCheck}
              gradient="amber"
              textColor="black"
            />

            <AnalyticsStatCard
              label="Pending Fees"
              value={String(students.filter((s) => s.status !== "Paid").length)}
              subValue="Students Pending"
              change="2%"
              trend="down"
              icon={BadgeAlert}
              gradient="amber"
              textColor="black"
            />

          </div>

          {/* Dashboard Sections */}
          <div className="space-y-4 lg:space-y-6 mt-6 ml-14">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* My Classes - aggregate by class */}
              <Card>
                <CardContent>
                  <h3 className="text-lg font-semibold">My Classes</h3>
                  <p className="text-sm text-muted-foreground mt-2">Classes you're teaching and student counts</p>
                  <div className="mt-4 space-y-2">
                    {(() => {
                      const counts: Record<string, number> = {}
                      students.forEach((s) => {
                        const cls = s.class || "Unassigned"
                        counts[cls] = (counts[cls] || 0) + 1
                      })
                      return Object.entries(counts).slice(0, 8).map(([cls, cnt]) => (
                        <div key={cls} className="flex items-center justify-between">
                          <span className="text-sm">{cls}</span>
                          <span className="text-sm font-medium">{cnt} students</span>
                        </div>
                      ))
                    })()}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Students */}
              <Card className="lg:col-span-2">
                <CardContent>
                  <h3 className="text-lg font-semibold">Recent Students</h3>
                  <p className="text-sm text-muted-foreground mt-2">Latest enrolled or updated student records</p>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-xs text-muted-foreground text-left">
                          <th className="px-3 py-2">Name</th>
                          <th className="px-3 py-2">Roll No</th>
                          <th className="px-3 py-2">Class</th>
                          <th className="px-3 py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...students].reverse().slice(0, 8).map((s) => (
                          <tr key={s.id} className="border-t">
                            <td className="px-3 py-2 font-medium">{s.name}</td>
                            <td className="px-3 py-2 text-muted-foreground">{s.rollNo}</td>
                            <td className="px-3 py-2">{s.class}</td>
                            <td className="px-3 py-2 text-sm">{s.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>

        </main>

      </div>

    </div>
  );
}
