"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FacultyForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-10 shadow-lg">
        <Link
          href="/faculty/login"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Faculty Login
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Forgot Password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your faculty email to receive reset instructions.
        </p>
        <form className="mt-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@school.edu" className="h-12 rounded-xl" required />
          </div>
          <Button type="submit" className="h-12 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 font-semibold text-white">
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  )
}
