"use client"

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { Student, Payment, Receipt, FeeStructureItem, MonthlyCollection, CategoryCollection, PendingFee } from "@/types"
import { CLASS_FEE_MAP, DISCOUNTS as INITIAL_DISCOUNTS } from "./feeStructure"
import { getMonthlyCollection, getCategoryCollection, getPendingFees } from "./reports"
import { apiRequest, getAccessToken, getStoredUser } from "@/lib/api"

type DataContextType = {
  students: Student[]
  payments: Payment[]
  receipts: Receipt[]
  feeStructure: FeeStructureItem[]
  discounts: any[]
  classFeeMap: any[]
  monthlyCollection: MonthlyCollection[]
  categoryCollection: CategoryCollection[]
  pendingFees: PendingFee[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  addStudent: (s: Student) => Promise<Student>
  updateStudent: (s: Student) => Promise<Student>
  deleteStudent: (id: string) => Promise<void>
  addPayment: (p: Payment) => Promise<Payment>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

const semesterToNumber = (semester?: string | number | null) => {
  if (typeof semester === "number") return semester
  const parsed = Number(String(semester || "").match(/\d+/)?.[0] || 1)
  return Number.isFinite(parsed) ? parsed : 1
}

const numberToSemester = (semester?: number | string | null) =>
  typeof semester === "number" ? `${semester}${semester === 1 ? "st" : semester === 2 ? "nd" : semester === 3 ? "rd" : "th"} Semester` : String(semester || "")

const paymentModeToApi = (mode: string) =>
  ({ Cash: "CASH", UPI: "UPI", "Bank Transfer": "BANK_TRANSFER", Cheque: "CHEQUE", DD: "CHEQUE" }[mode] || mode)

const paymentModeFromApi = (mode: string) =>
  ({ CASH: "Cash", UPI: "UPI", BANK_TRANSFER: "Bank Transfer", CHEQUE: "Cheque", CARD: "Bank Transfer", NET_BANKING: "Bank Transfer" }[mode] || mode)

const normalizeAmount = (value: unknown) => Number(value || 0)

const mapStudent = (student: any): Student => {
  const payments = student.payments || []
  const paidAmount = payments
    .filter((payment: any) => payment.status === "PAID")
    .reduce((sum: number, payment: any) => sum + normalizeAmount(payment.amount), 0)
  const feeTotal = payments.reduce((sum: number, payment: any) => sum + normalizeAmount(payment.amount), 0)
  const totalFee = Math.max(feeTotal, paidAmount)
  const dueAmount = Math.max(totalFee - paidAmount, 0)

  return {
    id: student.id,
    name: student.name,
    rollNo: student.rollNumber,
    class: numberToSemester(student.semester),
    section: "",
    parentName: "",
    phone: student.phone || "",
    email: student.email || "",
    department: student.department || "",
    semester: numberToSemester(student.semester),
    totalFee,
    paidAmount,
    dueAmount,
    status: dueAmount === 0 && paidAmount > 0 ? "Paid" : paidAmount > 0 ? "Partial" : "Pending",
    discount: "None",
    feeCategory: "Tuition",
    joinDate: student.createdAt?.slice(0, 10) || new Date().toISOString().slice(0, 10),
  }
}

const mapPayment = (payment: any): Payment => ({
  id: payment.id,
  receiptNo: payment.receipt?.receiptNumber || "",
  studentId: payment.studentId,
  studentName: payment.student?.name || "",
  class: numberToSemester(payment.student?.semester),
  category: payment.feeCategory as Payment["category"],
  amount: normalizeAmount(payment.amount),
  mode: paymentModeFromApi(payment.paymentMode) as Payment["mode"],
  date: payment.paymentDate?.slice(0, 10) || payment.createdAt?.slice(0, 10) || "",
  transactionRef: payment.id,
})

const mapReceipt = (receipt: any): Receipt => ({
  id: receipt.id,
  receiptNo: receipt.receiptNumber,
  studentId: receipt.payment?.studentId || "",
  studentName: receipt.payment?.student?.name || "",
  class: numberToSemester(receipt.payment?.student?.semester),
  category: (receipt.payment?.feeCategory || "Tuition") as Receipt["category"],
  amount: normalizeAmount(receipt.payment?.amount),
  mode: paymentModeFromApi(receipt.payment?.paymentMode || "CASH") as Receipt["mode"],
  date: receipt.generatedDate?.slice(0, 10) || "",
  transactionRef: receipt.paymentId,
})

const mapFeeStructure = (fee: any): FeeStructureItem => ({
  id: fee.id,
  category: fee.category as FeeStructureItem["category"],
  description: `${fee.category} fee for ${numberToSemester(fee.semester)}`,
  amount: normalizeAmount(fee.amount),
  frequency: "Per Term",
  applicableClasses: numberToSemester(fee.semester),
})

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [feeStructure, setFeeStructure] = useState<FeeStructureItem[]>([])
  const [discounts] = useState(() => INITIAL_DISCOUNTS)
  const [classFeeMap] = useState(() => CLASS_FEE_MAP)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    if (!getAccessToken()) return

    setLoading(true)
    setError(null)

    try {
      const user = getStoredUser()
      const [studentResponse, paymentResponse, receiptResponse, feeResponse] = await Promise.all([
        user?.role === "STUDENT" && user.profile?.id
          ? apiRequest<any>(`/students/${user.profile.id}`)
          : apiRequest<any>("/students?limit=100"),
        apiRequest<any>("/payments?limit=100"),
        apiRequest<any>("/receipts"),
        apiRequest<any>("/fee-structures?limit=100"),
      ])

      const studentRows = Array.isArray(studentResponse.data) ? studentResponse.data : [studentResponse.data]
      setStudents(studentRows.filter(Boolean).map(mapStudent))
      setPayments((paymentResponse.data || []).map(mapPayment))
      setReceipts((receiptResponse.data || []).map(mapReceipt))
      setFeeStructure((feeResponse.data || []).map(mapFeeStructure))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load data")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const addStudent = async (s: Student & { password?: string }) => {
    const response = await apiRequest<{ data: any }>("/students", {
      method: "POST",
      body: JSON.stringify({
        rollNumber: s.rollNo,
        name: s.name,
        department: s.department || s.class || "General",
        semester: semesterToNumber(s.semester || s.class),
        email: s.email || `${s.rollNo.replace(/\W+/g, ".").toLowerCase()}@student.local`,
        phone: s.phone || null,
        password: (s as any).password || "Student@123",
      }),
    })
    const created = mapStudent(response.data)
    setStudents((prev) => [created, ...prev])
    return created
  }

  const updateStudent = async (s: Student) => {
    const response = await apiRequest<{ data: any }>(`/students/${s.id}`, {
      method: "PUT",
      body: JSON.stringify({
        rollNumber: s.rollNo,
        name: s.name,
        department: s.department || s.class || "General",
        semester: semesterToNumber(s.semester || s.class),
        email: s.email,
        phone: s.phone || null,
      }),
    })
    const updated = mapStudent(response.data)
    setStudents((prev) => prev.map((student) => (student.id === updated.id ? updated : student)))
    return updated
  }

  const deleteStudent = async (id: string) => {
    await apiRequest<void>(`/students/${id}`, { method: "DELETE" })
    setStudents((prev) => prev.filter((student) => student.id !== id))
  }

  const addPayment = async (p: Payment) => {
    const response = await apiRequest<{ data: any }>("/payments", {
      method: "POST",
      body: JSON.stringify({
        studentId: p.studentId,
        amount: p.amount,
        paymentDate: p.date,
        paymentMode: paymentModeToApi(p.mode),
        status: "PAID",
        feeCategory: p.category,
      }),
    })
    const created = mapPayment(response.data)
    await refresh()
    return created
  }

  // Derive dynamic collections reactively
  const monthlyCollection = useMemo(() => getMonthlyCollection(payments, students), [payments, students])
  const categoryCollection = useMemo(() => getCategoryCollection(payments), [payments])
  const pendingFees = useMemo(() => getPendingFees(students), [students])

  const value: DataContextType = {
    students,
    payments,
    receipts,
    feeStructure,
    discounts,
    classFeeMap,
    monthlyCollection,
    categoryCollection,
    pendingFees,
    loading,
    error,
    refresh,
    addStudent,
    updateStudent,
    deleteStudent,
    addPayment,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error("useData must be used within DataProvider")
  return ctx
}

export default DataContext
