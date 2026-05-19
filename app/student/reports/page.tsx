import DownloadableReportCard from "@/app/components/reports/downloadable-report-card";
import PerformanceOverviewCard from "@/app/components/reports/performance-overview-card";
import TransactionSummaryCard from "@/app/components/reports/transaction-summary-card";

export default function ReportsPage() {
  return (
    <div className="space-y-6 p-6">

      <PerformanceOverviewCard />

      <TransactionSummaryCard />

      <DownloadableReportCard 
        title="Semester Fee Report"
        description="Complete fee payment and transaction details for the current semester"
        generatedDate={new Date().toLocaleDateString()}
        fileSize="2.4 MB"
        reportType="pdf"
        period="Spring 2026"
      />

    </div>
  );
}