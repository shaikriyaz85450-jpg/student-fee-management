"use client";

import { DashboardSidebar } from "../../components/sidebar/sidebar";
import { DashboardNavbar } from "../../components/navbar/navbar";
import AnalyticsStatCard from "../../components/statcards/statcards";

import { IndianRupee, CreditCard, Wallet } from "lucide-react";

import { FeesBarChart } from "../../components/charts/FeeAnalyticsChart";
import { MonthlyActivityChart } from "../../components/charts/MothlyFeeActivity";

import { RecentPaymentsTable } from "../../components/tables/RecentPaymentsTable";

import { StudentProfileCard } from "../../components/profile/StudentProfileCard";
import { useData } from "@/app/data/provider";

export default function StudentDashboard() {
  const { students, payments, feeStructure } = useData();
  
  // Select active student (defaults to Arjun Reddy, S001)
  const currentStudent = students.find(s => s.id === "S001") || students[0];

  // Calculate dynamic bar chart categories for this student
  const chartData = ["Tuition", "Lab", "Bus", "Library", "Sports"].map(cat => {
    const isApplicable = currentStudent?.feeCategory.toLowerCase().includes(cat.toLowerCase());
    const expected = isApplicable
      ? (feeStructure.find(f => f.category.toLowerCase() === cat.toLowerCase())?.amount || 0)
      : 0;
    const paid = payments
      .filter(p => p.studentId === currentStudent?.id && p.category.toLowerCase() === cat.toLowerCase())
      .reduce((sum, p) => sum + p.amount, 0);
    const pending = Math.max(0, expected - paid);
    return { category: cat, paid, pending };
  }).filter(d => d.paid > 0 || d.pending > 0);

  // Calculate monthly activity trend for this student
  const monthlyActivityData = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(m => {
    const collected = payments
      .filter(p => p.studentId === currentStudent?.id && new Date(p.date).toLocaleString("en-US", { month: "short" }) === m)
      .reduce((sum, p) => sum + p.amount, 0);
    return {
      month: m,
      collected: collected,
      pending: m === "May" ? currentStudent?.dueAmount || 0 : 0
    };
  });

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1">

        {/* Navbar */}
        <DashboardNavbar 
          studentName={currentStudent?.name}
          studentEmail={currentStudent?.email}
        />

        {/* Dashboard Content */}
        <main className="p-6">

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ml-14">

            <AnalyticsStatCard
              label="Total Fees"
              value={`₹${(currentStudent?.totalFee || 0).toLocaleString("en-IN")}`}
              subValue="This Semester"
              change="12%"
              trend="up"
              icon={IndianRupee}
              gradient="primary"
              textColor="black"
            />

            <AnalyticsStatCard
              label="Paid Fees"
              value={`₹${(currentStudent?.paidAmount || 0).toLocaleString("en-IN")}`}
              subValue="Successfully Paid"
              change="8%"
              trend="up"
              icon={CreditCard}
              gradient="emerald"
              textColor="black"
            />

            <AnalyticsStatCard
              label="Pending Fees"
              value={`₹${(currentStudent?.dueAmount || 0).toLocaleString("en-IN")}`}
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

            <FeesBarChart data={chartData} />

            <MonthlyActivityChart data={monthlyActivityData} />

            <RecentPaymentsTable payments={payments.filter(p => p.studentId === currentStudent?.id)} />

            <StudentProfileCard 
              fullName={currentStudent?.name}
              rollNumber={currentStudent?.rollNo}
              department={currentStudent?.department || "Science"}
              semester={currentStudent?.semester || "4th Semester"}
              email={currentStudent?.email}
              phoneNumber={currentStudent?.phone}
            />

          </div>

        </main>

      </div>

    </div>
  );
}