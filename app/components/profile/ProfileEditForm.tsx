"use client"

import React, { useState } from "react"
import { Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ProfileEditFormProps {
  fullName: string
  email: string
  phoneNumber: string
  location: string
  department: string
  semester: string
  onSave?: (data: any) => void
  onCancel?: () => void
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  fullName: initialFullName,
  email: initialEmail,
  phoneNumber: initialPhoneNumber,
  location: initialLocation,
  department: initialDepartment,
  semester: initialSemester,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    fullName: initialFullName,
    email: initialEmail,
    phoneNumber: initialPhoneNumber,
    location: initialLocation,
    department: initialDepartment,
    semester: initialSemester,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    onSave?.(formData)
  }

  return (
    <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 transition-all duration-300">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Edit Profile</h2>
        <button
          onClick={onCancel}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground transition-all hover:bg-muted/70 focus:bg-muted/80"
            placeholder="Enter full name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email</label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground transition-all hover:bg-muted/70 focus:bg-muted/80"
            placeholder="Enter email"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <Input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground transition-all hover:bg-muted/70 focus:bg-muted/80"
            placeholder="Enter phone number"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Location</label>
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground transition-all hover:bg-muted/70 focus:bg-muted/80"
            placeholder="Enter location"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Department</label>
          <Input
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground transition-all hover:bg-muted/70 focus:bg-muted/80"
            placeholder="Enter department"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Semester</label>
          <Input
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground transition-all hover:bg-muted/70 focus:bg-muted/80"
            placeholder="Enter semester"
          />
        </div>
      </div>

      <div className="mt-8 flex gap-3 justify-end">
        <Button
          variant="outline"
          onClick={onCancel}
          className="rounded-lg border border-border"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/20 transition-all hover:shadow-xl"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
