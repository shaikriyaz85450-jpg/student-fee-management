"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  User, 
  CreditCard, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut,
  GraduationCap,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link";

interface MenuItem {
  id: string
  label: string
  icon: React.ElementType
  href: string
  badge?: string
}

const studentMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/student/dashboard",
  },

  {
    id: "profile",
    label: "Profile",
    icon: User,
    href: "/student/profile",
  },

  {
    id: "payments",
    label: "Fee Payments",
    icon: CreditCard,
    href: "/student/FeePayments",
    badge: "3",
  },

  {
    id: "schedule",
    label: "Schedule",
    icon: Calendar,
    href: "/student/schedule",
  },

  {
    id: "reports",
    label: "Reports",
    icon: FileText,
    href: "/student/reports",
  },

  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/student/settings",
  },
]

const facultyMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/faculty/dashboard",
  },
  {
    id: "add-student",
    label: "Add Student",
    icon: GraduationCap,
    href: "/faculty/add-student",
  },
  {
    id: "fee-status",
    label: "Fee Status",
    icon: CreditCard,
    href: "/faculty/fee-status",
  },
  {
    id: "attendence",
    label: "Attendance",
    icon: Calendar,
    href: "/faculty/attendence",
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileText,
    href: "/faculty/reports",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/faculty/settings",
  },
]

interface DashboardSidebarProps {
  className?: string
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = React.useState(false)
  const [activeItem, setActiveItem] = React.useState("dashboard")
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const isFaculty = pathname?.startsWith("/faculty")
  const menuItems = isFaculty ? facultyMenuItems : studentMenuItems

  React.useEffect(() => {
    const segment = pathname?.split("/")[2] || "dashboard"
    setActiveItem(segment)
  }, [pathname])

  return (
    <TooltipProvider delayDuration={0}>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <LayoutDashboard className="h-5 w-5" />
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out",
          collapsed ? "w-[72px]" : "w-[260px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span
              className={cn(
                "text-lg font-bold tracking-tight text-sidebar-foreground transition-all duration-300",
                collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              )}
            >
              EduFee
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "hidden h-8 w-8 shrink-0 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground md:flex",
              collapsed && "mx-auto"
            )}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <div className={cn("mb-4", collapsed ? "px-0" : "px-2")}>
            <span
              className={cn(
                "text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50 transition-all duration-300",
                collapsed ? "sr-only" : "block"
              )}
            >
              Main Menu
            </span>
          </div>

          {menuItems.map((item) => {
            const isActive = activeItem === item.id
            const Icon = item.icon

            const button = (
  <Link
    href={item.href}
    key={item.id}
    onClick={() => {
      setActiveItem(item.id)
      setMobileOpen(false)
    }}
    className={cn(
      "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
      isActive
        ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary shadow-sm"
        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
      collapsed && "justify-center px-2"
    )}
  >
    {/* Active indicator */}
    {isActive && (
      <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
    )}

    <div
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
        isActive
          ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
          : "bg-sidebar-accent/50 text-sidebar-foreground/70 group-hover:bg-sidebar-accent group-hover:text-sidebar-foreground"
      )}
    >
      <Icon className="h-[18px] w-[18px]" />
    </div>

    <span
      className={cn(
        "flex-1 truncate transition-all duration-300",
        collapsed ? "hidden" : "block"
      )}
    >
      {item.label}
    </span>

    {item.badge && !collapsed && (
      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
        {item.badge}
      </span>
    )}
  </Link>
);
            if (collapsed) {
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>{button}</TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center gap-2">
                    {item.label}
                    {item.badge && (
                      <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return button
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-3">
          {/* User Profile */}
          <div
            className={cn(
              "mb-3 flex items-center gap-3 rounded-xl bg-sidebar-accent/50 p-2.5 transition-all duration-300",
              collapsed && "justify-center p-2"
            )}
          >
            <div className="relative">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-semibold text-white">
                F
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-sidebar bg-emerald-500" />
            </div>
            <div
              className={cn(
                "min-w-0 flex-1 transition-all duration-300",
                collapsed ? "hidden" : "block"
              )}
            >
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                Faculty User
              </p>
              <p className="truncate text-xs text-sidebar-foreground/60">
                faculty@edufee.com
              </p>
            </div>
          </div>

          {/* Logout Button */}
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => router.push(isFaculty ? '/faculty/login' : '/student/login')} className="flex w-full items-center justify-center rounded-xl p-2.5 text-sidebar-foreground/70 transition-colors hover:bg-red-500/10 hover:text-red-500">
                  <LogOut className="h-[18px] w-[18px]" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          ) : (
            <button onClick={() => router.push(isFaculty ? '/faculty/login' : '/student/login')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-red-500/10 hover:text-red-500">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent/50">
                <LogOut className="h-[18px] w-[18px]" />
              </div>
              <span>Logout</span>
            </button>
          )}
        </div>
      </aside>
    </TooltipProvider>
  )
}
