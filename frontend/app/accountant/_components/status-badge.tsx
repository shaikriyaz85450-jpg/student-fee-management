// app/accountant/_components/status-badge.tsx
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { FeeStatus } from "@/types"

export function StatusBadge({ status }: { status: FeeStatus }) {
  return (
    <Badge
      variant="secondary"
      className={cn("text-[11px] font-medium", {
        "bg-emerald-50 text-emerald-700 hover:bg-emerald-50": status === "Paid",
        "bg-amber-50 text-amber-700 hover:bg-amber-50": status === "Partial",
        "bg-red-50 text-red-700 hover:bg-red-50": status === "Pending",
      })}
    >
      {status}
    </Badge>
  )
}

export function CategoryBadge({ category }: { category: string }) {
  return (
    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 text-[11px]">
      {category}
    </Badge>
  )
}
