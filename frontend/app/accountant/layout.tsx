"use client"

// app/accountant/layout.tsx

import { usePathname, useRouter } from "next/navigation"
import { DashboardSidebar } from "@/app/components/sidebar/sidebar"
import { DashboardNavbar } from "@/app/components/navbar/navbar"
import { toast } from "sonner"
import { LayoutDashboard, Users, CreditCard, AlertTriangle, List, FileText, Receipt, Settings } from "lucide-react"

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/accountant/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Student Records",
    href: "/accountant/student-records",
    icon: Users,
  },

  {
    label: "Fee Collection",
    href: "/accountant/payments",
    icon: CreditCard,
  },

  {
    label: "Pending Fees",
    href: "/accountant/pending-fees",
    icon: AlertTriangle,
    badge: 12,
  },

  {
    label: "Fee Structure",
    href: "/accountant/fee-structure",
    icon: List,
  },

  {
    label: "Reports",
    href: "/accountant/reports",
    icon: FileText,
  },

  {
    label: "Receipts",
    href: "/accountant/receipts",
    icon: Receipt,
  },

  {
    label: "Settings",
    href: "/accountant/settings",
    icon: Settings,
  },
]

export default function AccountantLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()
  const router = useRouter()
  // ✅ LOGIN PAGE CHECK — hide chrome on login
  const isLoginPage = pathname === "/accountant/login"
  if (isLoginPage) return <>{children}</>

  return (
    <div className="flex min-h-screen bg-gray-100">

      <DashboardSidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-x-hidden">
        <DashboardNavbar studentName="Ravi Accountant" studentEmail="accountant@school.edu" />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

    </div>
  )
}