"use client";

import AnalyticsStatCard from "@/app/components/statcards/statcards";

import {
  IndianRupee,
  BadgeCheck,
  BadgeAlert,
  Wallet,
} from "lucide-react";

export default function FeeStatusPage() {
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
          value="₹24L"
          subValue="This Semester"
          change="12%"
          trend="up"
          icon={IndianRupee}
          gradient="primary"
        />

        <AnalyticsStatCard
          label="Paid Students"
          value="980"
          subValue="Fee Completed"
          change="8%"
          trend="up"
          icon={BadgeCheck}
          gradient="emerald"
        />

        <AnalyticsStatCard
          label="Pending Students"
          value="260"
          subValue="Pending Fees"
          change="2%"
          trend="down"
          icon={BadgeAlert}
          gradient="red"
        />

        <AnalyticsStatCard
          label="Pending Amount"
          value="₹8L"
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

            <tr className="border-b border-border hover:bg-muted/40 transition-colors">
              <td className="p-3">Rahul</td>
              <td className="p-3">CSE</td>
              <td className="p-3">₹45,000</td>
              <td className="p-3">₹0</td>
              <td className="p-3">
                <span className="rounded-full bg-emerald-500/20 text-emerald-500 px-3 py-1 text-xs font-medium">
                  Paid
                </span>
              </td>
            </tr>

            <tr className="hover:bg-muted/40 transition-colors">
              <td className="p-3">Arjun</td>
              <td className="p-3">ECE</td>
              <td className="p-3">₹20,000</td>
              <td className="p-3">₹25,000</td>
              <td className="p-3">
                <span className="rounded-full bg-red-500/20 text-red-500 px-3 py-1 text-xs font-medium">
                  Pending
                </span>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}