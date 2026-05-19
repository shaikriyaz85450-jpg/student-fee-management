"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"
import { Calendar } from "lucide-react"

interface MonthlyActivityChartProps {
  data?: Array<{
    month: string
    collected: number
    pending: number
  }>
}

const defaultData = [
  { month: "Jan", collected: 15000, pending: 8000 },
  { month: "Feb", collected: 18000, pending: 6500 },
  { month: "Mar", collected: 22000, pending: 4000 },
  { month: "Apr", collected: 27000, pending: 5000 },
  { month: "May", collected: 32000, pending: 3500 },
  { month: "Jun", collected: 38000, pending: 2000 },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card/95 p-3 shadow-lg backdrop-blur-sm">
        <p className="text-sm font-medium text-foreground">{payload[0].payload.month}</p>
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

export function MonthlyActivityChart({ data = defaultData }: MonthlyActivityChartProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">All Students Monthly Activity</h3>
          <p className="text-sm text-muted-foreground">Monthly fee collection trends across all students</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Calendar className="h-5 w-5 text-primary" />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
          <XAxis 
            dataKey="month" 
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
            iconType="line"
          />
          <Line 
            type="monotone" 
            dataKey="collected" 
            stroke="var(--accent)" 
            strokeWidth={3}
            dot={{ fill: "var(--accent)", r: 5 }}
            activeDot={{ r: 7 }}
            isAnimationActive={true}
          />
          <Line 
            type="monotone" 
            dataKey="pending" 
            stroke="var(--destructive)" 
            strokeWidth={3}
            dot={{ fill: "var(--destructive)", r: 5 }}
            activeDot={{ r: 7 }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
