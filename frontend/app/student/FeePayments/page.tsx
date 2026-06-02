"use client"

import { PaymentReminderCard } from "@/components/tables/payments/PaymentReminderCard";
import { DownloadableReceipts } from "@/components/tables/payments/DownloadableReceipt";
import { FeeSummaryCards } from "@/components/tables/payments/FeeSummaryCards";
import { useData } from "@/app/data/provider";

export default function PaymentsPage() {
  const { students, payments, feeStructure } = useData();
  const currentStudent = students.find(s => s.id === "S001") || students[0];

  const totalFeeStr = `₹${(currentStudent?.totalFee || 0).toLocaleString("en-IN")}`;
  const paidFeeStr = `₹${(currentStudent?.paidAmount || 0).toLocaleString("en-IN")}`;
  const pendingFeeStr = `₹${(currentStudent?.dueAmount || 0).toLocaleString("en-IN")}`;
  const paidPercentageVal = Math.round(((currentStudent?.paidAmount || 0) / Math.max(1, currentStudent?.totalFee || 0)) * 100);

  // Compute dynamic pending fee reminders
  const studentPayments = payments.filter(p => p.studentId === currentStudent?.id);
  const reminders = ["Tuition", "Lab", "Bus", "Library", "Sports"].map(cat => {
    const isApplicable = currentStudent?.feeCategory.toLowerCase().includes(cat.toLowerCase());
    if (!isApplicable) return null;
    const expected = feeStructure.find(f => f.category.toLowerCase() === cat.toLowerCase())?.amount || 0;
    const paid = studentPayments
      .filter(p => p.category.toLowerCase() === cat.toLowerCase())
      .reduce((sum, p) => sum + p.amount, 0);
    const due = Math.max(0, expected - paid);
    
    if (due <= 0) return null;

    return {
      title: `${cat} Fee`,
      amount: `₹${due.toLocaleString("en-IN")}`,
      dueDate: currentStudent?.dueDate || "May 31, 2026",
      daysRemaining: currentStudent?.daysOverdue ? -currentStudent.daysOverdue : 14,
      category: cat.toLowerCase() as "lab" | "exam" | "tuition" | "library" | "sports"
    };
  }).filter((r): r is NonNullable<typeof r> => r !== null);

  // Map payments to receipts format
  const studentReceipts = studentPayments.map(p => ({
    id: p.id,
    title: `${p.category} Fee Payment`,
    amount: `₹${p.amount.toLocaleString("en-IN")}`,
    date: new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    receiptNumber: p.receiptNo,
    transactionId: p.transactionRef
  }));

  return (
    <div className="space-y-6 p-6">
      <FeeSummaryCards 
        totalFee={totalFeeStr}
        paidFee={paidFeeStr}
        pendingFee={pendingFeeStr}
        paidPercentage={paidPercentageVal}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {reminders.length === 0 ? (
          <div className="col-span-2 rounded-2xl border border-emerald-200 bg-emerald-50/30 p-6 text-center shadow-sm">
            <p className="text-emerald-800 font-semibold text-lg">No Outstanding Dues!</p>
            <p className="text-emerald-600 text-sm mt-1">Excellent! All your fee categories for this semester are fully paid.</p>
          </div>
        ) : (
          reminders.map((r, idx) => (
            <PaymentReminderCard 
              key={idx}
              title={r.title}
              amount={r.amount}
              dueDate={r.dueDate}
              daysRemaining={r.daysRemaining}
              category={r.category}
            />
          ))
        )}
      </div>

      <DownloadableReceipts receipts={studentReceipts} />
    </div>
  );
}