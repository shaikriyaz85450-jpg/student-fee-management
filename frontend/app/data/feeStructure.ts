import type { FeeStructureItem, ClassFeeMap, DiscountDefinition } from "@/types"

export const FEE_STRUCTURE: FeeStructureItem[] = [
  { id: "F001", category: "Tuition", description: "Core academic tuition fee", amount: 8000, frequency: "Per Term", applicableClasses: "All classes" },
  { id: "F002", category: "Lab", description: "Science & computer lab fee", amount: 1200, frequency: "Per Term", applicableClasses: "Class 8–10" },
  { id: "F003", category: "Bus", description: "School transport fee", amount: 2500, frequency: "Per Term", applicableClasses: "Optional" },
  { id: "F004", category: "Library", description: "Library & reading resources", amount: 600, frequency: "Annual", applicableClasses: "All classes" },
  { id: "F005", category: "Sports", description: "Sports & physical education", amount: 400, frequency: "Annual", applicableClasses: "All classes" },
]

export const CLASS_FEE_MAP: ClassFeeMap[] = [
  { class: "Class 6", annualFee: 8800 },
  { class: "Class 7", annualFee: 9500 },
  { class: "Class 8", annualFee: 10500 },
  { class: "Class 9", annualFee: 11700 },
  { class: "Class 10", annualFee: 12500 },
]

export const DISCOUNTS: DiscountDefinition[] = [
  { type: "Merit Scholarship", pct: "25%", applicable: "Tuition", variant: "bg-emerald-50 text-emerald-700" },
  { type: "Sibling Discount", pct: "10%", applicable: "All fees", variant: "bg-blue-50 text-blue-700" },
  { type: "Staff Ward", pct: "50%", applicable: "All fees", variant: "bg-amber-50 text-amber-700" },
  { type: "SC/ST Concession", pct: "100%", applicable: "Tuition", variant: "bg-emerald-50 text-emerald-700" },
]

export const MAX_FEE = 14000
