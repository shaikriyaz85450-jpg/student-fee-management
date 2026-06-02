"use client";

import { LucideIcon } from "lucide-react";
import { ArrowUp, ArrowDown } from "lucide-react";

interface AnalyticsStatCardProps {
  label: string;
  value: string;
  subValue: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  gradient?: "primary" | "emerald" | "amber";
}

export function AnalyticsStatCard({
  label,
  value,
  subValue,
  change,
  trend,
  icon: Icon,
  gradient = "primary",
}: AnalyticsStatCardProps) {
  const gradientClasses = {
    primary: "from-blue-500/10 to-cyan-500/10 border-blue-200",
    emerald: "from-emerald-500/10 to-teal-500/10 border-emerald-200",
    amber: "from-amber-500/10 to-orange-500/10 border-amber-200",
  };

  const iconColorClasses = {
    primary: "text-blue-600",
    emerald: "text-emerald-600",
    amber: "text-amber-600",
  };

  const trendColorClasses =
    trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-600" : "text-gray-600";

  return (
    <div
      className={`bg-gradient-to-br ${gradientClasses[gradient]} rounded-lg border p-6 backdrop-blur-sm`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
          <p className="mt-1 text-xs text-gray-500">{subValue}</p>
        </div>
        <div className={`rounded-lg bg-white/50 p-3 ${iconColorClasses[gradient]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1">
        <span className={`flex items-center gap-0.5 text-sm font-semibold ${trendColorClasses}`}>
          {trend === "up" ? (
            <ArrowUp className="h-4 w-4" />
          ) : trend === "down" ? (
            <ArrowDown className="h-4 w-4" />
          ) : null}
          {change}
        </span>
        <span className="text-xs text-gray-500">vs last month</span>
      </div>
    </div>
  );
}
