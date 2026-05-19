"use client";

import { DashboardSidebar } from "../../components/sidebar/sidebar";
import { DashboardNavbar } from "../../components/navbar/navbar";
import AnalyticsStatCard from "../../components/statcards/statcards";

import { IndianRupee, CreditCard, Wallet } from "lucide-react";

import { FeesBarChart } from "../../components/charts/FeeAnalyticsChart";
import { MonthlyActivityChart } from "../../components/charts/MothlyFeeActivity";

import { RecentPaymentsTable } from "../../components/tables/RecentPaymentsTable";

import { StudentProfileCard } from "../../components/profile/StudentProfileCard";

export default function StudentDashboard() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ml-14">

            <AnalyticsStatCard
              label="Total Fees"
              value="₹45,000"
              subValue="This Semester"
              change="12%"
              trend="up"
              icon={IndianRupee}
              gradient="primary"
              textColor="black"
            />

            <AnalyticsStatCard
              label="Paid Fees"
              value="₹30,000"
              subValue="Successfully Paid"
              change="8%"
              trend="up"
              icon={CreditCard}
              gradient="emerald"
              textColor="black"
            />

            <AnalyticsStatCard
              label="Pending Fees"
              value="₹15,000"
              subValue="Remaining Balance"
              change="2%"
              trend="down"
              icon={Wallet}
              gradient="amber"
              textColor="black"
            />

          </div>

          {/* Dashboard Sections */}
          <div className="space-y-4 lg:space-y-6 mt-6 ml-14">

            <FeesBarChart />

            <MonthlyActivityChart />

            <RecentPaymentsTable />

            <StudentProfileCard />

          </div>

        </main>

      </div>

    </div>
  );
}