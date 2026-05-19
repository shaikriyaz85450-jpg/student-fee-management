"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface StudentsFilterProps {
  onSearch: (query: string) => void
  onDepartmentChange: (dept: string) => void
  onSemesterChange: (sem: string) => void
  onReset: () => void
}

const departments = [
  "All Departments",
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Electrical",
  "Civil",
]

const semesters = [
  "All Semesters",
  "1st Semester",
  "2nd Semester",
  "3rd Semester",
  "4th Semester",
  "5th Semester",
  "6th Semester",
  "7th Semester",
  "8th Semester",
]

export function StudentsFilter({
  onSearch,
  onDepartmentChange,
  onSemesterChange,
  onReset,
}: StudentsFilterProps) {
  const [query, setQuery] = React.useState("")
  const [department, setDepartment] = React.useState(departments[0])
  const [semester, setSemester] = React.useState(semesters[0])

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Input
        placeholder="Search students"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSearch(query)
          }
        }}
      />

      <select
        className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary"
        value={department}
        onChange={(event) => {
          setDepartment(event.target.value)
          onDepartmentChange(event.target.value)
        }}
      >
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      <select
        className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary"
        value={semester}
        onChange={(event) => {
          setSemester(event.target.value)
          onSemesterChange(event.target.value)
        }}
      >
        {semesters.map((sem) => (
          <option key={sem} value={sem}>
            {sem}
          </option>
        ))}
      </select>

      <Button
        type="button"
        variant="secondary"
        onClick={() => {
          setQuery("")
          setDepartment(departments[0])
          setSemester(semesters[0])
          onReset()
        }}
      >
        Reset Filters
      </Button>
    </div>
  )
}
