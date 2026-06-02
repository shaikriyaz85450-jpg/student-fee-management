// app/accountant/types.ts

export type FeeStatus = "Paid" | "Partial" | "Pending"
export type PaymentMode = "Cash" | "UPI" | "Bank Transfer" | "Cheque" | "DD"
export type FeeCategory = "Tuition" | "Lab" | "Bus" | "Library" | "Sports"
export type DiscountType = "None" | "Merit (25%)" | "Sibling (10%)" | "Staff Ward (50%)" | "SC/ST (100%)"

export interface Student {
  id: string
  name: string
  rollNo: string
  class: string
  section: string
  parentName: string
  phone: string
  totalFee: number
  paidAmount: number
  dueAmount: number
  status: FeeStatus
  discount: DiscountType
  feeCategory: string
  joinDate: string
}

export interface Payment {
  id: string
  receiptNo: string
  studentId: string
  studentName: string
  class: string
  category: FeeCategory
  amount: number
  mode: PaymentMode
  date: string
  transactionRef: string
  remarks?: string
}

export interface PendingFee {
  studentId: string
  studentName: string
  class: string
  category: FeeCategory
  dueAmount: number
  dueDate: string
  daysOverdue: number
}

export interface FeeStructureItem {
  id: string
  category: FeeCategory
  description: string
  amount: number
  frequency: "Per Term" | "Annual" | "Monthly"
  applicableClasses: string
}

export interface ClassFeeMap {
  class: string
  annualFee: number
}
