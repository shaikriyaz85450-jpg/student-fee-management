export type FeeStatus = "Paid" | "Partial" | "Pending"
export type DiscountType = "None" | "Merit (25%)" | "Sibling (10%)" | "Staff Ward (50%)" | "SC/ST (100%)"
export type FeeCategory = "Tuition" | "Lab" | "Bus" | "Library" | "Sports"

export interface Student {
  id: string
  name: string
  rollNo: string
  class: string
  section: string
  parentName?: string
  phone?: string
  email?: string
  department?: string
  semester?: string
  totalFee: number
  paidAmount: number
  dueAmount: number
  status: FeeStatus
  discount: DiscountType
  feeCategory: string
  joinDate: string
  dueDate?: string
  daysOverdue?: number
}
