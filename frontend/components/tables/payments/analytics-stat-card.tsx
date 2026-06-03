"use client";

import { LucideIcon } from "lucide-react";
import { ArrowUp, ArrowDown } from "lucide-react";

interface AnalyticsStatCardProps {
  label: string;
  value: React.ReactNode;
  subValue?: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  gradient?: "primary" | "emerald" | "amber";
}

export function AnalyticsStatCard({
  label,
  value,
  subValue,
  change,
  trend = "neutral",
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
    trend === "up" ? "text-emerald-600 bg-emerald-50" : trend === "down" ? "text-red-600 bg-red-50" : "text-gray-600 bg-gray-50";

  return (
    <div className={`bg-gradient-to-br ${gradientClasses[gradient]} rounded-lg border p-5 backdrop-blur-sm`}>
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-600 truncate">{label}</p>
          <div className="mt-2 flex items-center gap-3">
            <p className="text-3xl font-extrabold text-gray-900 truncate">{value}</p>
            {change ? (
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${trendColorClasses}`}>
                {trend === "up" ? <ArrowUp className="h-4 w-4 mr-1" /> : trend === "down" ? <ArrowDown className="h-4 w-4 mr-1" /> : null}
                {change}
              </span>
            ) : null}
          </div>
          {subValue ? <p className="mt-1 text-xs text-gray-500 truncate">{subValue}</p> : null}
        </div>

        <div className={`flex-shrink-0 rounded-lg bg-white/60 p-3 ring-1 ring-inset ${iconColorClasses[gradient]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
