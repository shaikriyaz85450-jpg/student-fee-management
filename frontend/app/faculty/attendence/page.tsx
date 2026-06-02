"use client";

import AnalyticsStatCard from "@/app/components/statcards/statcards";

import {
  Users,
  ClipboardCheck,
  UserX,
  CalendarDays,
} from "lucide-react";

export default function AttendancePage() {
  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Attendance Management
        </h1>

        <p className="text-muted-foreground mt-1">
          Monitor and manage student attendance records
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <AnalyticsStatCard
          label="Total Students"
          value="1,240"
          subValue="Across Departments"
          change="12%"
          trend="up"
          icon={Users}
          gradient="primary"
        />

        <AnalyticsStatCard
          label="Present Today"
          value="1,120"
          subValue="Students Present"
          change="6%"
          trend="up"
          icon={ClipboardCheck}
          gradient="emerald"
        />

        <AnalyticsStatCard
          label="Absent Today"
          value="120"
          subValue="Students Absent"
          change="2%"
          trend="down"
          icon={UserX}
          gradient="red"
        />

        <AnalyticsStatCard
          label="Classes Today"
          value="08"
          subValue="Scheduled Classes"
          change="3%"
          trend="up"
          icon={CalendarDays}
          gradient="amber"
        />

      </div>

      {/* Table */}
      <div className="border border-border bg-card/50 backdrop-blur-sm rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Attendance Records
        </h2>

        <table className="w-full border-collapse">

          <thead className="border-b border-border">

            <tr>
              <th className="text-left p-3">Student</th>
              <th className="text-left p-3">Department</th>
              <th className="text-left p-3">Semester</th>
              <th className="text-left p-3">Attendance</th>
            </tr>

          </thead>

          <tbody>

            <tr className="border-b border-border hover:bg-muted/40 transition-colors">
              <td className="p-3">Rahul</td>
              <td className="p-3">CSE</td>
              <td className="p-3">5th</td>
              <td className="p-3">
                <span className="rounded-full bg-emerald-500/20 text-emerald-500 px-3 py-1 text-xs font-medium">
                  Present
                </span>
              </td>
            </tr>

            <tr className="hover:bg-muted/40 transition-colors">
              <td className="p-3">Arjun</td>
              <td className="p-3">ECE</td>
              <td className="p-3">4th</td>
              <td className="p-3">
                <span className="rounded-full bg-red-500/20 text-red-500 px-3 py-1 text-xs font-medium">
                  Absent
                </span>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}