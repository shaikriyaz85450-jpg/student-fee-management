"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

interface FeesBarChartProps {
  data?: Array<{
    category: string
    paid: number
    pending: number
  }>
}

const defaultData = [
  { category: "Tuition", paid: 45000, pending: 0 },
  { category: "Library", paid: 2500, pending: 0 },
  { category: "Lab", paid: 0, pending: 5000 },
  { category: "Exam", paid: 0, pending: 1500 },
  { category: "Sports", paid: 0, pending: 1000 },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card/95 p-3 shadow-lg backdrop-blur-sm">
        <p className="text-sm font-medium text-foreground">{payload[0].payload.category}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-xs font-semibold">
            {entry.name}: ₹{entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function FeesBarChart({ data = defaultData }: FeesBarChartProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Paid vs Pending Fees</h3>
          <p className="text-sm text-muted-foreground">Fee breakdown by category</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
          <XAxis 
            dataKey="category" 
            stroke="var(--muted-foreground)"
            style={{ fontSize: "12px", fontWeight: "500" }}
          />
          <YAxis 
            stroke="var(--muted-foreground)"
            style={{ fontSize: "12px" }}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="circle"
          />
          <Bar dataKey="paid" fill="var(--accent)" radius={[8, 8, 0, 0]} />
          <Bar dataKey="pending" fill="var(--destructive)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
