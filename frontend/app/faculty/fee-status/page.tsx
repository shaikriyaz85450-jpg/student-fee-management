"use client";

import AnalyticsStatCard from "@/app/components/statcards/statcards";
import { useData } from "@/app/data/provider"

import {
  IndianRupee,
  BadgeCheck,
  BadgeAlert,
  Wallet,
} from "lucide-react";

export default function FeeStatusPage() {
  const { students, payments } = useData()
  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Fee Status
        </h1>

        <p className="text-muted-foreground mt-1">
          Monitor student fee payment records
        </p>
      </div>

      {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <AnalyticsStatCard
          label="Total Collection"
          value={`₹${payments.reduce((s, p) => s + p.amount, 0).toLocaleString("en-IN")}`}
          subValue="This Semester"
          change="12%"
          trend="up"
          icon={IndianRupee}
          gradient="primary"
        />

        <AnalyticsStatCard
          label="Paid Students"
          value={String(students.filter((s) => s.status === "Paid").length)}
          subValue="Fee Completed"
          change="8%"
          trend="up"
          icon={BadgeCheck}
          gradient="emerald"
        />

        <AnalyticsStatCard
          label="Pending Students"
          value={String(students.filter((s) => s.status !== "Paid").length)}
          subValue="Pending Fees"
          change="2%"
          trend="down"
          icon={BadgeAlert}
          gradient="red"
        />

        <AnalyticsStatCard
          label="Pending Amount"
          value={`₹${students.reduce((s, t) => s + (t.dueAmount || 0), 0).toLocaleString("en-IN")}`}
          subValue="Remaining Balance"
          change="3%"
          trend="down"
          icon={Wallet}
          gradient="amber"
        />

      </div>

      {/* Table */}
      <div className="border border-border bg-card/50 backdrop-blur-sm rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Student Fee Records
        </h2>

        <table className="w-full border-collapse">

          <thead className="border-b border-border">

            <tr>
              <th className="text-left p-3">Student</th>
              <th className="text-left p-3">Department</th>
              <th className="text-left p-3">Paid</th>
              <th className="text-left p-3">Pending</th>
              <th className="text-left p-3">Status</th>
            </tr>

          </thead>

          <tbody>

            {[...students].reverse().slice(0, 8).map((s) => (
              <tr key={s.id} className="border-b border-border hover:bg-muted/40 transition-colors">
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.department || s.class}</td>
                <td className="p-3">₹{(s.paidAmount || 0).toLocaleString("en-IN")}</td>
                <td className="p-3">₹{(s.dueAmount || 0).toLocaleString("en-IN")}</td>
                <td className="p-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${s.status === "Paid" ? "bg-emerald-500/20 text-emerald-500" : s.status === "Partial" ? "bg-amber-500/10 text-amber-600" : "bg-red-500/10 text-red-600"}`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}