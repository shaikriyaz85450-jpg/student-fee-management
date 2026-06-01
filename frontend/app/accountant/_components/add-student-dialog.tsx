"use client"

// app/accountant/_components/add-student-dialog.tsx
import { useState } from "react"
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
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(1, "Required"),
  rollNo: z.string().min(3, "Required"),
  class: z.string().min(1, "Required"),
  section: z.string().min(1, "Required"),
  parentName: z.string().min(2, "Required"),
  phone: z.string().min(10, "Enter valid phone"),
  feeCategory: z.string().min(1, "Required"),
  discount: z.string().min(1, "Required"),
})
type FormValues = z.infer<typeof schema>

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
  onSuccess?: () => void
}

export function AddStudentDialog({ open, onOpenChange, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const { addStudent, classFeeMap } = useData()
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: "", lastName: "", rollNo: "", class: "", section: "A", parentName: "", phone: "", feeCategory: "Tuition + Lab + Bus", discount: "None" },
  })

  async function onSubmit() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))

    const vals = form.getValues()
    const totalFee = classFeeMap.find((c: any) => c.class === vals.class)?.annualFee ?? 10000
    const newStudent: Student = {
      id: `S${Date.now()}`,
      name: `${vals.firstName} ${vals.lastName}`,
      rollNo: vals.rollNo,
      class: vals.class,
      section: vals.section,
      parentName: vals.parentName,
      phone: vals.phone,
      email: "",
      department: "",
      semester: "",
      totalFee,
      paidAmount: 0,
      dueAmount: totalFee,
      status: "Pending",
      discount: vals.discount as any,
      feeCategory: vals.feeCategory,
      joinDate: new Date().toISOString().split("T")[0],
    }

    addStudent(newStudent)
    toast.success("Student added successfully!")
    setLoading(false)
    onOpenChange(false)
    form.reset()
    onSuccess?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add new student</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="firstName" render={({ field }) => (
                <FormItem><FormLabel>First name</FormLabel><FormControl><Input placeholder="Arjun" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="lastName" render={({ field }) => (
                <FormItem><FormLabel>Last name</FormLabel><FormControl><Input placeholder="Reddy" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="rollNo" render={({ field }) => (
                <FormItem><FormLabel>Roll number</FormLabel><FormControl><Input placeholder="09-A-015" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="class" render={({ field }) => (
                <FormItem><FormLabel>Class</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"].map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="section" render={({ field }) => (
                <FormItem><FormLabel>Section</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>{["A", "B", "C"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="9876543210" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="parentName" render={({ field }) => (
              <FormItem><FormLabel>Parent / Guardian</FormLabel><FormControl><Input placeholder="Suresh Reddy" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="feeCategory" render={({ field }) => (
                <FormItem><FormLabel>Fee category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {["Tuition + Lab + Bus", "Tuition + Lab", "Tuition + Bus", "Tuition only"].map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="discount" render={({ field }) => (
                <FormItem><FormLabel>Discount</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {["None", "Merit (25%)", "Sibling (10%)", "Staff Ward (50%)", "SC/ST (100%)"].map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
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
                Save student
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
