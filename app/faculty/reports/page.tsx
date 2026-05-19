"use client";

import AnalyticsStatCard from "@/app/components/statcards/statcards";

import {
  Users,
  ClipboardCheck,
  BadgeCheck,
  BadgeAlert,
} from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Reports Dashboard
        </h1>

        <p className="text-muted-foreground mt-1">
          Academic and fee analytics overview
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
          label="Attendance"
          value="92%"
          subValue="Average Attendance"
          change="5%"
          trend="up"
          icon={ClipboardCheck}
          gradient="emerald"
        />

        <AnalyticsStatCard
          label="Paid Students"
          value="980"
          subValue="Fee Completed"
          change="8%"
          trend="up"
          icon={BadgeCheck}
          gradient="amber"
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

      </div>

    </div>
  );
}