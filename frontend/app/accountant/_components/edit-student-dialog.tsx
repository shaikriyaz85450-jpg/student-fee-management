"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useData } from "@/app/data/provider"
import type { Student } from "@/types"

const schema = z.object({
  name: z.string().min(2, "Required"),
  rollNo: z.string().min(3, "Required"),
  email: z.string().email("Enter valid email"),
  class: z.string().min(1, "Required"),
  phone: z.string().min(10, "Enter valid phone"),
  dueDate: z.string().optional(),
  totalFee: z.coerce.number().min(0),
  status: z.enum(["Paid", "Partial", "Pending"]),
})
type FormValues = z.infer<typeof schema>

interface Props {
  student: Student | null
  open: boolean
  onOpenChange: (v: boolean) => void
  onSuccess?: () => void
}

export function EditStudentDialog({ student, open, onOpenChange, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const { updateStudent } = useData()
  
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      rollNo: "",
      email: "",
      class: "",
      phone: "",
      dueDate: "",
      totalFee: 0,
      status: "Pending",
    },
  })

  useEffect(() => {
    if (student) {
      form.reset({
        name: student.name,
        rollNo: student.rollNo,
        email: student.email,
        class: student.class,
        phone: student.phone,
        dueDate: student.dueDate || "",
        totalFee: student.totalFee,
        status: student.status,
      })
    }
  }, [student, form])

  async function onSubmit() {
    if (!student) return
    setLoading(true)

    const vals = form.getValues()
    const updatedStudent: Student = {
      ...student,
      name: vals.name,
      rollNo: vals.rollNo,
      email: vals.email,
      class: vals.class,
      phone: vals.phone,
      dueDate: vals.dueDate,
      totalFee: vals.totalFee,
      status: vals.status as any,
    }

    try {
      await updateStudent(updatedStudent)
      toast.success("Student updated successfully!")
      onOpenChange(false)
      onSuccess?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unable to update student")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Student Fee & Info</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Full name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="rollNo" render={({ field }) => (
                <FormItem><FormLabel>Roll number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="class" render={({ field }) => (
                <FormItem><FormLabel>Class / Semester</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"].map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="dueDate" render={({ field }) => (
                <FormItem><FormLabel>Fee Due Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="totalFee" render={({ field }) => (
                <FormItem><FormLabel>Total Annual Fee (₹)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem><FormLabel>Fee Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {["Paid", "Partial", "Pending"].map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" className="bg-[#1a2e4a] hover:bg-[#2a4a72] text-white" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Student
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
