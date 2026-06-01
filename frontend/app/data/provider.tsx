"use client"

import React, { createContext, useContext, useState } from "react"
import type { Student, Payment, Receipt, FeeStructureItem, MonthlyCollection, CategoryCollection, PendingFee } from "@/types"
import { STUDENTS as INITIAL_STUDENTS } from "./students"
import { PAYMENTS as INITIAL_PAYMENTS } from "./payments"
import { RECEIPTS as INITIAL_RECEIPTS } from "./receipts"
import { FEE_STRUCTURE as INITIAL_FEE_STRUCTURE, CLASS_FEE_MAP, DISCOUNTS as INITIAL_DISCOUNTS } from "./feeStructure"
import { getMonthlyCollection, getCategoryCollection, getPendingFees } from "./reports"

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
  addStudent: (s: Student) => void
  updateStudent: (s: Student) => void
  addPayment: (p: Payment) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>(() => INITIAL_STUDENTS)
  const [payments, setPayments] = useState<Payment[]>(() => INITIAL_PAYMENTS)
  const [receipts, setReceipts] = useState<Receipt[]>(() => INITIAL_RECEIPTS)
  const [feeStructure] = useState<FeeStructureItem[]>(() => INITIAL_FEE_STRUCTURE)
  const [discounts] = useState(() => INITIAL_DISCOUNTS)
  const [classFeeMap] = useState(() => CLASS_FEE_MAP)

  const addStudent = (s: Student) => {
    setStudents((prev) => [...prev, s])
  }

  const updateStudent = (s: Student) => {
    setStudents((prev) => prev.map((st) => (st.id === s.id ? s : st)))
  }

  const addPayment = (p: Payment) => {
    setPayments((prev) => [p, ...prev])
    // also add receipt
    setReceipts((prev) => [p as unknown as Receipt, ...prev])
    // update student balances
    setStudents((prev) =>
      prev.map((st) => {
        if (st.id !== p.studentId) return st
        const paidAmount = (st.paidAmount || 0) + p.amount
        const dueAmount = Math.max(0, (st.totalFee || 0) - paidAmount)
        const status = dueAmount === 0 ? "Paid" : paidAmount === 0 ? "Pending" : "Partial"
        return { ...st, paidAmount, dueAmount, status }
      })
    )
  }

  // Derive dynamic collections reactively
  const monthlyCollection = getMonthlyCollection(payments, students)
  const categoryCollection = getCategoryCollection(payments)
  const pendingFees = getPendingFees(students)

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
    addStudent,
    updateStudent,
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
