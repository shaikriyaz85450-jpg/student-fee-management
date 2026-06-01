import type { FeeCategory } from "./student"

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

export interface DiscountDefinition {
  type: string
  pct: string
  applicable: string
  variant: string
}

export type FeeStructure = FeeStructureItem

