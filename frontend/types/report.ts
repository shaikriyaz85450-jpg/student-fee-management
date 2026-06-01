import type { FeeCategory } from "./student"

export interface MonthlyCollection {
  month: string
  collected: number
  pending: number
}

export interface CategoryCollection {
  name: string
  value: number
  fill: string
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

export interface Report {
  id: string
  title: string
  description: string
  generatedDate: string
  fileSize: string
  reportType: "pdf" | "excel" | "csv"
  period: string
}

