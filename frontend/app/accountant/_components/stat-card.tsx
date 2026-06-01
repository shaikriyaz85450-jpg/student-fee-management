// app/accountant/_components/stat-card.tsx
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  label: string
  value: string
  sub?: string
  subType?: "up" | "down" | "neutral"
  icon: LucideIcon
  iconBg?: string
  iconColor?: string
}

export function StatCard({ label, value, sub, subType = "neutral", icon: Icon, iconBg = "bg-muted", iconColor = "text-muted-foreground" }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className={cn("mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg", iconBg)}>
          <Icon className={cn("h-4.5 w-4.5", iconColor)} />
        </div>
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="mt-1 text-xl font-semibold tracking-tight">{value}</p>
        {sub && (
          <p className={cn("mt-1 text-xs", {
            "text-emerald-600": subType === "up",
            "text-red-600": subType === "down",
            "text-muted-foreground": subType === "neutral",
          })}>
            {sub}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
