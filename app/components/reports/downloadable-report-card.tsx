"use client"

import React from "react"
import { Download, FileText, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DownloadableReportCardProps {
  title: string
  description: string
  generatedDate: string
  fileSize: string
  reportType: "pdf" | "excel" | "csv"
  period: string
}

const reportTypeIcons = {
  pdf: "📄",
  excel: "📊",
  csv: "📋",
}

export const DownloadableReportCard: React.FC<DownloadableReportCardProps> = ({
  title,
  description,
  generatedDate,
  fileSize,
  reportType,
  period,
}) => {
  return (
    <div className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:bg-card/80">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
            <span className="text-xl">{reportTypeIcons[reportType]}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {period}
              </div>
              <span>•</span>
              <span>Generated: {generatedDate}</span>
              <span>•</span>
              <span>{fileSize}</span>
            </div>
          </div>
        </div>
        <Button
          size="sm"
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  )
}

export default DownloadableReportCard
