import type { Receipt } from "@/types"
import { PAYMENTS } from "./payments"

export const RECEIPTS: Receipt[] = PAYMENTS.map((p) => ({
  ...p,
}))
