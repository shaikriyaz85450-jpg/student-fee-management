"use client"

import React, { useEffect, useState } from "react"
import { DashboardSidebar } from "../../components/sidebar/sidebar"
import { DashboardNavbar } from "../../components/navbar/navbar"
import { FacultyStatCard } from "@/components/faculty-stat-card"
import { StudentsFilter } from "@/components/students-filter"
import { StudentsTable } from "@/components/students-table"
import { StudentPreviewModal } from "@/components/student-preview-modal"
import { Users, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react"
import { useData } from "@/app/data/provider"
import type { Student } from "@/types"
import type { StudentTableRow } from "@/components/students-table"

type FacultyRow = {
  id: string
  name: string
  rollNumber: string
  department: string
  semester: string
  feeStatus: "paid" | "pending" | "overdue"
  contact: string
}

export default function FacultyStudentsPage() {
  const { students } = useData()
  const [selectedStudent, setSelectedStudent] = useState<StudentTableRow | null>(null)
  const mappedStudents: FacultyRow[] = students.map((s) => ({
    id: s.id,
    name: s.name,
    rollNumber: s.rollNo,
    department: s.department || "-",
    semester: s.semester || "-",
    feeStatus: s.status === "Paid" ? "paid" : s.status === "Partial" ? "pending" : "overdue",
    contact: s.phone || "",
  }))
  const [filteredStudents, setFilteredStudents] = useState<FacultyRow[]>([])

  // Keep filtered list in sync when provider `students` changes
  useEffect(() => {
    setFilteredStudents(mappedStudents)
  }, [students])

  const handleSearch = (query: string) => {
    const filtered = mappedStudents.filter(
      (s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(query.toLowerCase()) ||
        s.contact.includes(query)
    )
    setFilteredStudents(filtered)
  }

  const handleDepartmentChange = (dept: string) => {
    if (dept === "All Departments") {
      setFilteredStudents(mappedStudents)
    } else {
      const filtered = mappedStudents.filter((s) => s.department === dept)
      setFilteredStudents(filtered)
    }
  }

  const handleSemesterChange = (sem: string) => {
    if (sem === "All Semesters") {
      setFilteredStudents(mappedStudents)
    } else {
      const filtered = mappedStudents.filter((s) => s.semester === sem)
      setFilteredStudents(filtered)
    }
  }

  const handleReset = () => {
    setFilteredStudents(mappedStudents)
  }

  // Calculate statistics
  const totalStudents = mappedStudents.length
  const paidStudents = mappedStudents.filter((s) => s.feeStatus === "paid").length
  const pendingStudents = mappedStudents.filter((s) => s.feeStatus !== "paid").length
  const avgAttendance = 87

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <main className="transition-all duration-300 md:ml-[260px]">
        <DashboardNavbar 
          studentName="Dr. Faculty Name" 
          studentEmail="faculty@university.edu"
        />

        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Students Management</h1>
            <p className="mt-1 text-muted-foreground">
              View and manage your enrolled students
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <FacultyStatCard
              label="Total Students"
              value={totalStudents}
              subValue="Enrolled in your classes"
              change="+12%"
              trend="up"
              icon={Users}
              gradient="primary"
            />
            <FacultyStatCard
              label="Paid Students"
              value={paidStudents}
              subValue={`${Math.round((paidStudents / totalStudents) * 100)}% of total`}
              change="+8%"
              trend="up"
              icon={CheckCircle2}
              gradient="emerald"
            />
            <FacultyStatCard
              label="Pending Fees"
              value={pendingStudents}
              subValue={`${Math.round((pendingStudents / totalStudents) * 100)}% awaiting`}
              change="-2"
              trend="down"
              icon={AlertCircle}
              gradient="amber"
            />
            <FacultyStatCard
              label="Average Attendance"
              value={`${avgAttendance}%`}
              subValue="Current semester"
              change="+5%"
              trend="up"
              icon={TrendingUp}
              gradient="purple"
            />
          </div>

          {/* Filter Section */}
          <div className="mb-6">
            <StudentsFilter
              onSearch={handleSearch}
              onDepartmentChange={handleDepartmentChange}
              onSemesterChange={handleSemesterChange}
              onReset={handleReset}
            />
          </div>

          {/* Students Table */}
          <StudentsTable
            students={filteredStudents}
            onViewStudent={setSelectedStudent}
          />

          {/* Student Preview Modal */}
          <StudentPreviewModal
            isOpen={!!selectedStudent}
            student={selectedStudent || undefined}
            onClose={() => setSelectedStudent(null)}
          />
        </div>
      </main>
    </div>
  )
}
