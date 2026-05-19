"use client"

import React, { useState } from "react"
import { DashboardSidebar } from "../../components/sidebar/sidebar"
import { DashboardNavbar } from "../../components/navbar/navbar"
import { FacultyStatCard } from "@/components/faculty-stat-card"
import { StudentsFilter } from "@/components/students-filter"
import { StudentsTable } from "@/components/students-table"
import { StudentPreviewModal } from "@/components/student-preview-modal"
import { Users, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react"

interface Student {
  id: string
  name: string
  rollNumber: string
  department: string
  semester: string
  feeStatus: "paid" | "pending" | "overdue"
  contact: string
}

const allStudents: Student[] = [
  {
    id: "STU-001",
    name: "John Student",
    rollNumber: "CS-2024-001",
    department: "Computer Science",
    semester: "4th Semester",
    feeStatus: "paid",
    contact: "+91 98765 43210",
  },
  {
    id: "STU-002",
    name: "Sarah Khan",
    rollNumber: "CS-2024-002",
    department: "Computer Science",
    semester: "4th Semester",
    feeStatus: "pending",
    contact: "+91 98765 43211",
  },
  {
    id: "STU-003",
    name: "Ahmed Ali",
    rollNumber: "IT-2024-003",
    department: "Information Technology",
    semester: "3rd Semester",
    feeStatus: "overdue",
    contact: "+91 98765 43212",
  },
  {
    id: "STU-004",
    name: "Priya Sharma",
    rollNumber: "EC-2024-004",
    department: "Electronics",
    semester: "5th Semester",
    feeStatus: "paid",
    contact: "+91 98765 43213",
  },
  {
    id: "STU-005",
    name: "Rajesh Kumar",
    rollNumber: "ME-2024-005",
    department: "Mechanical",
    semester: "2nd Semester",
    feeStatus: "pending",
    contact: "+91 98765 43214",
  },
  {
    id: "STU-006",
    name: "Emma Wilson",
    rollNumber: "CS-2024-006",
    department: "Computer Science",
    semester: "2nd Semester",
    feeStatus: "paid",
    contact: "+91 98765 43215",
  },
]

export default function FacultyStudentsPage() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [filteredStudents, setFilteredStudents] = useState(allStudents)

  const handleSearch = (query: string) => {
    const filtered = allStudents.filter(
      (s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(query.toLowerCase()) ||
        s.contact.includes(query)
    )
    setFilteredStudents(filtered)
  }

  const handleDepartmentChange = (dept: string) => {
    if (dept === "All Departments") {
      setFilteredStudents(allStudents)
    } else {
      const filtered = allStudents.filter((s) => s.department === dept)
      setFilteredStudents(filtered)
    }
  }

  const handleSemesterChange = (sem: string) => {
    if (sem === "All Semesters") {
      setFilteredStudents(allStudents)
    } else {
      const filtered = allStudents.filter((s) => s.semester === sem)
      setFilteredStudents(filtered)
    }
  }

  const handleReset = () => {
    setFilteredStudents(allStudents)
  }

  // Calculate statistics
  const totalStudents = allStudents.length
  const paidStudents = allStudents.filter((s) => s.feeStatus === "paid").length
  const pendingStudents = allStudents.filter((s) => s.feeStatus !== "paid").length
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
