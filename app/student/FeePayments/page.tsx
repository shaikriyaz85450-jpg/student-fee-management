import {PaymentReminderCard} from "@/components/tables/payments/PaymentReminderCard";
import {DownloadableReceipts} from "@/components/tables/payments/DownloadableReceipt";
import {FeeSummaryCards} from "@/components/tables/payments/FeeSummaryCards";

export default function PaymentsPage() {
  return (
    <div className="space-y-6 p-6">

      <FeeSummaryCards />

      <div className="grid gap-4 md:grid-cols-2">
        <PaymentReminderCard 
          title="Tuition Fee"
          amount="₹45,000"
          dueDate="May 31, 2026"
          daysRemaining={14}
          category="tuition"
        />
        <PaymentReminderCard 
          title="Lab Fee"
          amount="₹5,000"
          dueDate="May 25, 2026"
          daysRemaining={8}
          category="lab"
        />
      </div>

      <DownloadableReceipts />

    </div>
  );
}