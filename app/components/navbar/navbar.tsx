"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Bell, Search, ChevronDown, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface NotificationItem {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
}

const notifications: NotificationItem[] = [
  {
    id: "1",
    title: "Payment Successful",
    message: "Your tuition fee payment of ₹45,000 was processed",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    title: "Upcoming Deadline",
    message: "Lab fee of ₹5,000 due in 6 days",
    timestamp: "1 day ago",
    read: false,
  },
  {
    id: "3",
    title: "Fee Receipt Generated",
    message: "Receipt for Library Fee is ready to download",
    timestamp: "2 days ago",
    read: true,
  },
]

interface DashboardNavbarProps {
  studentName?: string
  studentEmail?: string
  className?: string
}

export function DashboardNavbar({
  studentName = "John Student",
  studentEmail = "john@student.edu",
  className,
}: DashboardNavbarProps) {
  const router = useRouter()
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")
  const unreadCount = notifications.filter((n) => !n.read).length

  const handleSearch = (query: string) => {
    if (!query.trim()) return
    
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes("payment") || lowerQuery.includes("fee")) {
      router.push("/student/FeePayments")
    } else if (lowerQuery.includes("schedule") || lowerQuery.includes("class")) {
      router.push("/student/schedule")
    } else if (lowerQuery.includes("report") || lowerQuery.includes("transaction")) {
      router.push("/student/reports")
    } else if (lowerQuery.includes("profile")) {
      router.push("/student/profile")
    } else if (lowerQuery.includes("setting")) {
      router.push("/student/settings")
    } else {
      // Default to dashboard
      router.push("/student/dashboard")
    }
    
    setSearchValue("")
    setSearchOpen(false)
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchValue)
    }
  }

  return (
    <nav
      className={cn(
        "sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl",
        className
      )}
    >
      <div className="flex h-16 items-center justify-between gap-4 px-6">
        {/* Left Section - Title */}
        <div className="flex-shrink-0">
          <h1 className="text-xl font-semibold text-foreground"> ..........</h1>
        </div>

        {/* Middle Section - Search Bar */}
        <div className="hidden flex-1 max-w-md md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search payments, fees, schedule..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              className="pl-9 pr-4 bg-card/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:bg-card/80 transition-colors"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground transition-colors"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-[10px] font-bold text-white shadow-lg shadow-red-500/30">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="border-b border-border bg-card">
                <div className="flex items-center justify-between p-4">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs font-medium text-muted-foreground">
                      {unreadCount} new
                    </span>
                  )}
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto divide-y divide-border">
                {notifications.length === 0 ? (
                  <div className="flex h-32 items-center justify-center text-center">
                    <p className="text-sm text-muted-foreground">
                      No notifications yet
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-4 transition-colors hover:bg-muted/50",
                        !notification.read && "bg-primary/5"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "mt-1 h-2 w-2 rounded-full shrink-0",
                            !notification.read
                              ? "bg-primary"
                              : "bg-transparent"
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">
                            {notification.title}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground/60">
                            {notification.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {notifications.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full rounded-none border-t border-border text-primary hover:bg-muted"
                >
                  View All Notifications
                </Button>
              )}
            </PopoverContent>
          </Popover>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-2 hover:bg-card/60 transition-colors"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-semibold text-white shadow-md shadow-primary/20">
                  {studentName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="hidden flex-col items-start sm:flex">
                  <span className="text-sm font-medium text-foreground leading-none">
                    {studentName}
                  </span>
                  <span className="text-xs text-muted-foreground leading-none mt-1">
                    {studentEmail}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-xs font-semibold text-white">
                  {studentName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{studentName}</span>
                  <span className="text-xs text-muted-foreground">
                    {studentEmail}
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Payment History
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Download Receipts
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-500/10" onClick={() => router.push('/student/login')}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="border-t border-border bg-card/50 px-6 py-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search payments, fees, schedule..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              autoFocus
              className="pl-9 pr-4 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50"
            />
          </div>
        </div>
      )}
    </nav>
  )
}

