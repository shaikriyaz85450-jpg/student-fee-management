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

import { FeesBarChart } from "../../components/charts/FeeAnalyticsChart";
import { MonthlyActivityChart } from "../../components/charts/MothlyFeeActivity";

import { RecentPaymentsTable } from "../../components/tables/RecentPaymentsTable";

export default function FacultyDashboard() {
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
              value="1,240"
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
              value="126"
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

            <FeesBarChart />

            <MonthlyActivityChart />

            <RecentPaymentsTable />

          </div>

        </main>

      </div>

    </div>
  );
}
