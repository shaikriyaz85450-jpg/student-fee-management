// app/accountant/_components/topbar.tsx
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface TopbarProps {
  title: string
  subtitle?: string
  action?: {
    label: string
    onClick: () => void
  }
  children?: React.ReactNode
}

export function Topbar({ title, subtitle, action, children }: TopbarProps) {
  return (
    <div className="flex items-center justify-between border-b bg-background px-6 py-3 sticky top-0 z-10">
      <div>
        <h1 className="text-base font-semibold">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        {children}
        {action && (
          <Button size="sm" onClick={action.onClick} className="bg-[#1a2e4a] hover:bg-[#2a4a72] text-white">
            <Plus className="h-3.5 w-3.5" />
            {action.label}
          </Button>
        )}
      </div>
    </div>
  )
}
