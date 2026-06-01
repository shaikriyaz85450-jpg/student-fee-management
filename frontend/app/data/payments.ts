import type { Payment } from "@/types"

export const PAYMENTS: Payment[] = [
  { id: "P001", receiptNo: "RCP-2025-0184", studentId: "S001", studentName: "Arjun Reddy", class: "Class 9", category: "Tuition", amount: 8000, mode: "UPI", date: "2025-05-20", transactionRef: "UPI2025052000842", remarks: "" },
  { id: "P002", receiptNo: "RCP-2025-0183", studentId: "S004", studentName: "Sneha Patel", class: "Class 7", category: "Bus", amount: 2500, mode: "Cash", date: "2025-05-19", transactionRef: "CASH-0183", remarks: "" },
  { id: "P003", receiptNo: "RCP-2025-0182", studentId: "S006", studentName: "Ananya Das", class: "Class 9", category: "Lab", amount: 1200, mode: "Bank Transfer", date: "2025-05-18", transactionRef: "NEFT2025051801234", remarks: "" },
  { id: "P004", receiptNo: "RCP-2025-0181", studentId: "S008", studentName: "Lakshmi Devi", class: "Class 8", category: "Tuition", amount: 8000, mode: "UPI", date: "2025-05-17", transactionRef: "UPI2025051700123", remarks: "" },
  { id: "P005", receiptNo: "RCP-2025-0180", studentId: "S001", studentName: "Arjun Reddy", class: "Class 9", category: "Bus", amount: 2500, mode: "Cash", date: "2025-05-15", transactionRef: "CASH-0180", remarks: "Advance payment" },
  { id: "P006", receiptNo: "RCP-2025-0179", studentId: "S005", studentName: "Mohammed Ali", class: "Class 6", category: "Tuition", amount: 4400, mode: "Cheque", date: "2025-05-14", transactionRef: "CHQ-004521", remarks: "Partial payment" },
  { id: "P007", receiptNo: "RCP-2025-0178", studentId: "S002", studentName: "Priya Sharma", class: "Class 8", category: "Tuition", amount: 7000, mode: "UPI", date: "2025-05-12", transactionRef: "UPI2025051200567", remarks: "" },
  { id: "P008", receiptNo: "RCP-2025-0177", studentId: "S010", studentName: "Divya Nair", class: "Class 7", category: "Tuition", amount: 8000, mode: "Bank Transfer", date: "2025-05-10", transactionRef: "NEFT2025051000891", remarks: "" },
]
