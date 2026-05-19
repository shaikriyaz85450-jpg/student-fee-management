"use client"

import React from "react"
import { Download, FileText, Calendar, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Receipt {
  id: string
  title: string
  amount: string
  date: string
  receiptNumber: string
  transactionId: string
}

interface DownloadableReceiptsProps {
  receipts?: Receipt[]
}

const dummyReceipts: Receipt[] = [
  {
    id: "1",
    title: "Tuition Fee - Semester 2",
    amount: "₹45,000",
    date: "Apr 28, 2026",
    receiptNumber: "RCP-2026-001",
    transactionId: "TXN-45000-APR28",
  },
  {
    id: "2",
    title: "Library Fee - Annual",
    amount: "₹2,500",
    date: "Apr 15, 2026",
    receiptNumber: "RCP-2026-002",
    transactionId: "TXN-2500-APR15",
  },
  {
    id: "3",
    title: "Lab Fee - Semester 2",
    amount: "₹5,000",
    date: "Apr 10, 2026",
    receiptNumber: "RCP-2026-003",
    transactionId: "TXN-5000-APR10",
  },
]

export const DownloadableReceipts: React.FC<DownloadableReceiptsProps> = ({
  receipts = dummyReceipts,
}) => {
  const handleDownload = (receiptId: string) => {
    console.log("[v0] Downloading receipt:", receiptId)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="border-b border-border bg-gradient-to-r from-card/50 to-card/30 px-6 py-5">
        <h2 className="text-lg font-semibold text-foreground">Downloadable Receipts</h2>
        <p className="text-sm text-muted-foreground">Access and download your payment receipts</p>
      </div>

      <div className="divide-y divide-border">
        {receipts.map((receipt) => (
          <div
            key={receipt.id}
            className="group flex items-center justify-between border-b border-border/50 p-5 transition-colors last:border-0 hover:bg-muted/30"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{receipt.title}</p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{receipt.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <DollarSign className="h-3.5 w-3.5" />
                    <span>{receipt.amount}</span>
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground/70">
                  Receipt: <code className="font-mono">{receipt.receiptNumber}</code>
                </p>
              </div>
            </div>
            <Button
              onClick={() => handleDownload(receipt.id)}
              variant="outline"
              size="sm"
              className="gap-2 transition-colors hover:border-primary/50"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </div>
        ))}
      </div>

      <div className="border-t border-border bg-muted/20 px-6 py-4">
        <p className="text-xs text-muted-foreground">
          Showing {receipts.length} receipt{receipts.length !== 1 ? "s" : ""}. All receipts are sent to your email as well.
        </p>
      </div>
    </div>
  )
}
