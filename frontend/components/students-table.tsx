"use client"

import { Button } from "@/components/ui/button"

export interface StudentTableRow {
  id: string
  name: string
  rollNumber: string
  department: string
  semester: string
  feeStatus: "paid" | "pending" | "overdue"
  contact: string
}

interface StudentsTableProps {
  students: StudentTableRow[]
  onViewStudent: (student: StudentTableRow) => void
}

export function StudentsTable({ students, onViewStudent }: StudentsTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border text-left text-sm">
          <thead className="bg-muted/70 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Roll Number</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Semester</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-background">
            {students.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-sm text-muted-foreground">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="hover:bg-muted/60 transition-colors">
                  <td className="px-4 py-4 text-foreground">{student.name}</td>
                  <td className="px-4 py-4 text-muted-foreground">{student.rollNumber}</td>
                  <td className="px-4 py-4 text-muted-foreground">{student.department}</td>
                  <td className="px-4 py-4 text-muted-foreground">{student.semester}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${
                        student.feeStatus === "paid"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : student.feeStatus === "pending"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-rose-500/10 text-rose-500"
                      }`}
                    >
                      {student.feeStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <Button size="sm" variant="secondary" onClick={() => onViewStudent(student)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
