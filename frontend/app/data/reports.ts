import type { MonthlyCollection, CategoryCollection, PendingFee, Student, Payment } from "@/types"

export const MONTHLY_COLLECTION: MonthlyCollection[] = [
  { month: "Jun", collected: 310000, pending: 40000 },
  { month: "Jul", collected: 290000, pending: 55000 },
  { month: "Aug", collected: 340000, pending: 30000 },
  { month: "Sep", collected: 280000, pending: 70000 },
  { month: "Oct", collected: 360000, pending: 20000 },
  { month: "Nov", collected: 310000, pending: 50000 },
  { month: "Dec", collected: 290000, pending: 60000 },
  { month: "Jan", collected: 340000, pending: 35000 },
  { month: "Feb", collected: 280000, pending: 80000 },
  { month: "Mar", collected: 310000, pending: 45000 },
  { month: "Apr", collected: 340000, pending: 35000 },
  { month: "May", collected: 410000, pending: 32000 },
]

export const CATEGORY_COLLECTION: CategoryCollection[] = [
  { name: "Tuition", value: 58, fill: "#1a2e4a" },
  { name: "Bus", value: 18, fill: "#e8a020" },
  { name: "Lab", value: 14, fill: "#2e7d32" },
  { name: "Others", value: 10, fill: "#c62828" },
]

export const PENDING_FEES: PendingFee[] = [
  { studentId: "S003", studentName: "Rahul Kumar", class: "Class 10", category: "Tuition", dueAmount: 12500, dueDate: "2025-04-30", daysOverdue: 20 },
  { studentId: "S007", studentName: "Vikram Singh", class: "Class 10", category: "Tuition", dueAmount: 12500, dueDate: "2025-04-30", daysOverdue: 20 },
  { studentId: "S002", studentName: "Priya Sharma", class: "Class 8", category: "Bus", dueAmount: 3500, dueDate: "2025-05-05", daysOverdue: 15 },
  { studentId: "S005", studentName: "Mohammed Ali", class: "Class 6", category: "Tuition", dueAmount: 4400, dueDate: "2025-05-10", daysOverdue: 10 },
  { studentId: "S009", studentName: "Kiran Babu", class: "Class 6", category: "Bus", dueAmount: 4400, dueDate: "2025-05-12", daysOverdue: 8 },
]

export const getMonthlyCollection = (payments: Payment[], students: Student[]): MonthlyCollection[] => {
  const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
  return months.map(monthName => {
    const paymentsInMonth = payments.filter(p => {
      const pMonth = new Date(p.date).toLocaleString("en-US", { month: "short" });
      return pMonth === monthName;
    });
    const collected = paymentsInMonth.reduce((sum, p) => sum + p.amount, 0);

    const pending = students
      .filter(st => st.dueAmount > 0 && st.dueDate && new Date(st.dueDate).toLocaleString("en-US", { month: "short" }) === monthName)
      .reduce((sum, st) => sum + st.dueAmount, 0);

    const baselineCollected = {
      Jun: 310000, Jul: 290000, Aug: 340000, Sep: 280000, Oct: 360000, Nov: 310000, Dec: 290000, Jan: 340000, Feb: 280000, Mar: 310000, Apr: 340000, May: 360000
    }[monthName] || 0;
    
    const baselinePending = {
      Jun: 40000, Jul: 55000, Aug: 30000, Sep: 70000, Oct: 20000, Nov: 50000, Dec: 60000, Jan: 35000, Feb: 80000, Mar: 45000, Apr: 35000, May: 0
    }[monthName] || 0;

    return {
      month: monthName,
      collected: monthName === "May" ? collected + 360000 : baselineCollected + collected,
      pending: monthName === "May" ? pending : baselinePending + pending
    };
  });
};

export const getCategoryCollection = (payments: Payment[]): CategoryCollection[] => {
  const categories = ["Tuition", "Bus", "Lab"];
  const categorySums = categories.map(cat => {
    const sum = payments
      .filter(p => p.category.toLowerCase() === cat.toLowerCase())
      .reduce((s, p) => s + p.amount, 0);
    return { name: cat, value: sum };
  });

  const othersSum = payments
    .filter(p => !categories.map(c => c.toLowerCase()).includes(p.category.toLowerCase()))
    .reduce((s, p) => s + p.amount, 0);

  const allCategories = [...categorySums, { name: "Others", value: othersSum }];
  const total = allCategories.reduce((sum, c) => sum + c.value, 0) || 1;

  const colors = {
    Tuition: "#1a2e4a",
    Bus: "#e8a020",
    Lab: "#2e7d32",
    Others: "#c62828"
  };

  return allCategories.map(c => ({
    name: c.name,
    value: Math.round((c.value / total) * 100),
    fill: colors[c.name as keyof typeof colors] || "#64748b"
  }));
};

export const getPendingFees = (students: Student[]): PendingFee[] => {
  return students
    .filter(st => st.dueAmount > 0)
    .map(st => {
      const category = st.feeCategory.split(" + ")[0] || "Tuition";
      return {
        studentId: st.id,
        studentName: st.name,
        class: st.class,
        category: category as any,
        dueAmount: st.dueAmount,
        dueDate: st.dueDate || "2025-05-31",
        daysOverdue: st.daysOverdue || 0
      };
    });
};
