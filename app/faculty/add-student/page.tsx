"use client"

import React, { useState } from "react"
import { DashboardSidebar } from "../../components/sidebar/sidebar"
import { DashboardNavbar } from "../../components/navbar/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Plus, RotateCcw, CheckCircle2 } from "lucide-react"

interface StudentFormData {
  fullName: string
  rollNumber: string
  email: string
  phone: string
  department: string
  semester: string
  tuitionFee: string
  labFee: string
  libraryFee: string
  otherFee: string
  photo: File | null
}

const departments = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Electrical",
  "Civil",
  "Chemical",
]

const semesters = [
  "1st Semester",
  "2nd Semester",
  "3rd Semester",
  "4th Semester",
  "5th Semester",
  "6th Semester",
  "7th Semester",
  "8th Semester",
]

export default function AddStudentPage() {
  const [formData, setFormData] = useState<StudentFormData>({
    fullName: "",
    rollNumber: "",
    email: "",
    phone: "",
    department: "",
    semester: "",
    tuitionFee: "45000",
    labFee: "5000",
    libraryFee: "2500",
    otherFee: "0",
    photo: null,
  })

  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleReset = () => {
    setFormData({
      fullName: "",
      rollNumber: "",
      email: "",
      phone: "",
      department: "",
      semester: "",
      tuitionFee: "45000",
      labFee: "5000",
      libraryFee: "2500",
      otherFee: "0",
      photo: null,
    })
    setPhotoPreview(null)
  }

  const totalFee =
    (parseInt(formData.tuitionFee) || 0) +
    (parseInt(formData.labFee) || 0) +
    (parseInt(formData.libraryFee) || 0) +
    (parseInt(formData.otherFee) || 0)

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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Add New Student</h1>
            <p className="mt-1 text-muted-foreground">
              Register a new student in your class
            </p>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 backdrop-blur-sm flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <p className="text-sm font-medium text-emerald-400">
                Student registered successfully!
              </p>
            </div>
          )}

          {/* Form Container */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden"
          >
            <div className="p-8">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Photo Upload Section */}
                <div className="lg:col-span-1 flex flex-col items-center">
                  <div className="mb-4 w-full max-w-xs">
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Student Photo
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed border-border bg-muted/30 cursor-pointer transition-all hover:border-primary/50 hover:bg-muted/50"
                      >
                        {photoPreview ? (
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-xl"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-2 py-8">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <p className="text-sm font-medium text-muted-foreground">
                              Upload Photo
                            </p>
                            <p className="text-xs text-muted-foreground">
                              JPG, PNG up to 5MB
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Form Fields Section */}
                <div className="lg:col-span-2">
                  {/* Personal Information */}
                  <div className="mb-8">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">
                      Personal Information
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Full Name
                        </label>
                        <Input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter full name"
                          className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Roll Number
                        </label>
                        <Input
                          type="text"
                          name="rollNumber"
                          value={formData.rollNumber}
                          onChange={handleInputChange}
                          placeholder="e.g., CS-2024-001"
                          className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="student@university.edu"
                          className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="mb-8">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">
                      Academic Information
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Department
                        </label>
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground transition-all hover:bg-muted/70 focus:bg-muted/80"
                          required
                        >
                          <option value="">Select Department</option>
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Semester
                        </label>
                        <select
                          name="semester"
                          value={formData.semester}
                          onChange={handleInputChange}
                          className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground transition-all hover:bg-muted/70 focus:bg-muted/80"
                          required
                        >
                          <option value="">Select Semester</option>
                          {semesters.map((sem) => (
                            <option key={sem} value={sem}>
                              {sem}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Fee Details */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-foreground">
                      Fee Details
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2 mb-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Tuition Fee (₹)
                        </label>
                        <Input
                          type="number"
                          name="tuitionFee"
                          value={formData.tuitionFee}
                          onChange={handleInputChange}
                          className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Lab Fee (₹)
                        </label>
                        <Input
                          type="number"
                          name="labFee"
                          value={formData.labFee}
                          onChange={handleInputChange}
                          className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Library Fee (₹)
                        </label>
                        <Input
                          type="number"
                          name="libraryFee"
                          value={formData.libraryFee}
                          onChange={handleInputChange}
                          className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Other Fee (₹)
                        </label>
                        <Input
                          type="number"
                          name="otherFee"
                          value={formData.otherFee}
                          onChange={handleInputChange}
                          className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground"
                        />
                      </div>
                    </div>

                    {/* Total Fee Display */}
                    <div className="rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 p-4">
                      <p className="text-sm text-muted-foreground">Total Fee Amount</p>
                      <p className="text-2xl font-bold text-primary">₹{totalFee.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="border-t border-border bg-muted/30 px-8 py-4 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="rounded-lg border border-border"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/20 transition-all hover:shadow-xl rounded-lg"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
