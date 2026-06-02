import type { FeeCategory } from "./student"

export type PaymentMode = "Cash" | "UPI" | "Bank Transfer" | "Cheque" | "DD"

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
