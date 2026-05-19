"use client"

import React from "react"
import { Mail, Phone, GraduationCap, BookOpen, Code } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StudentProfileCardProps {
  fullName?: string
  rollNumber?: string
  department?: string
  semester?: string
  email?: string
  phoneNumber?: string
  avatarGradient?: "emerald" | "blue" | "purple" | "amber"
  className?: string
}

const avatarGradients = {
  emerald: "from-emerald-500 to-teal-600",
  blue: "from-blue-500 to-cyan-600",
  purple: "from-purple-500 to-pink-600",
  amber: "from-amber-500 to-orange-600",
}

export const StudentProfileCard: React.FC<StudentProfileCardProps> = ({
  fullName = "John Student",
  rollNumber = "STU-2024-001",
  department = "Computer Science",
  semester = "4th Semester",
  email = "john.student@university.edu",
  phoneNumber = "+91 98765 43210",
  avatarGradient = "emerald",
  className = "",
}) => {
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:bg-card/80 ${className}`}
    >
      {/* Gradient blob on hover */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Content */}
      <div className="relative space-y-5">
        {/* Avatar Section */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${avatarGradients[avatarGradient]} text-lg font-bold text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-110`}
            >
              {initials}
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-foreground">{fullName}</h3>
              <p className="text-sm text-muted-foreground font-medium">{rollNumber}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-border/0 via-border/50 to-border/0" />

        {/* Academic Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 rounded-lg bg-muted/30 p-3 transition-colors group-hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Department</p>
            </div>
            <p className="text-sm font-semibold text-foreground">{department}</p>
          </div>
          <div className="space-y-2 rounded-lg bg-muted/30 p-3 transition-colors group-hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-accent" />
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Semester</p>
            </div>
            <p className="text-sm font-semibold text-foreground">{semester}</p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/40">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground truncate">{email}</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/40">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{phoneNumber}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 h-10 rounded-lg font-medium">
          Edit Profile
        </Button>
      </div>
    </div>
  )
}

export default StudentProfileCard
