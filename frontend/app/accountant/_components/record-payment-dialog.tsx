"use client"

// app/accountant/_components/record-payment-dialog.tsx
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
import type { Payment } from "@/types"

const schema = z.object({
  studentName: z.string().min(2, "Required"),
  category: z.string().min(1, "Required"),
  amount: z.coerce.number().min(1, "Enter valid amount"),
  mode: z.string().min(1, "Required"),
  date: z.string().min(1, "Required"),
  transactionRef: z.string().optional(),
  remarks: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
  onSuccess?: () => void
}

export function RecordPaymentDialog({ open, onOpenChange, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const today = new Date().toISOString().split("T")[0]
  const { students, addPayment } = useData()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { studentName: "", category: "", amount: 0, mode: "UPI", date: today, transactionRef: "", remarks: "" },
  })

  async function onSubmit() {
    setLoading(true)

    const vals = form.getValues()
    const matched = students.find((s) => `${s.name}`.toLowerCase().includes(vals.studentName.toLowerCase()) || s.rollNo.toLowerCase().includes(vals.studentName.toLowerCase()))
    if (!matched) {
      toast.error("Select an existing student by name or roll number")
      setLoading(false)
      return
    }
    const studentId = matched.id
    const studentName = matched?.name ?? vals.studentName
    const newPayment = {
      id: `P${Date.now()}`,
      receiptNo: `RCP-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
      studentId,
      studentName,
      class: matched?.class ?? "-",
      category: vals.category as unknown as Payment["category"],
      amount: Number(vals.amount),
      mode: vals.mode as unknown as Payment["mode"],
      date: vals.date,
      transactionRef: vals.transactionRef || "",
      remarks: vals.remarks || "",
    }

    try {
      await addPayment(newPayment as Payment)
      toast.success("Payment recorded successfully!")
      onOpenChange(false)
      form.reset()
      onSuccess?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unable to record payment")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Record fee payment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="studentName" render={({ field }) => (
              <FormItem><FormLabel>Student name / Roll No</FormLabel><FormControl><Input placeholder="Search student..." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem><FormLabel>Fee category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {["Tuition", "Lab", "Bus", "Library", "Sports"].map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="amount" render={({ field }) => (
                <FormItem><FormLabel>Amount (₹)</FormLabel><FormControl><Input type="number" placeholder="8000" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="mode" render={({ field }) => (
                <FormItem><FormLabel>Payment mode</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {["Cash", "UPI", "Bank Transfer", "Cheque", "DD"].map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="date" render={({ field }) => (
                <FormItem><FormLabel>Payment date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="transactionRef" render={({ field }) => (
              <FormItem><FormLabel>Transaction / Reference ID</FormLabel><FormControl><Input placeholder="UPI ref / Cheque no." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="remarks" render={({ field }) => (
              <FormItem><FormLabel>Remarks (optional)</FormLabel><FormControl><Input placeholder="e.g. partial payment, advance..." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" className="bg-[#1a2e4a] hover:bg-[#2a4a72] text-white" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Record payment
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
