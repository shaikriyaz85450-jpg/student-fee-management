"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface StudentPreviewModalProps {
  isOpen: boolean
  student?: {
    id: string
    name: string
    rollNumber: string
    department: string
    semester: string
    feeStatus: "paid" | "pending" | "overdue"
    contact: string
  }
  onClose: () => void
}

export function StudentPreviewModal({ isOpen, student, onClose }: StudentPreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
          <DialogDescription>
            Review student information and contact details.
          </DialogDescription>
        </DialogHeader>

        {student ? (
          <div className="space-y-4 py-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Name</p>
              <p>{student.name}</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Roll Number</p>
              <p>{student.rollNumber}</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Department</p>
              <p>{student.department}</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Semester</p>
              <p>{student.semester}</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Fee Status</p>
              <p>{student.feeStatus}</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Contact</p>
              <p>{student.contact}</p>
            </div>
          </div>
        ) : (
          <p className="py-4 text-sm text-muted-foreground">Select a student to view details.</p>
        )}

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
