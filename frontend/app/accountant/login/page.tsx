"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Building2, ArrowLeft, Eye, EyeOff, User, Lock, CreditCard, BookOpen, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AccountantLoginPage() {
  const features = [
    { icon: CreditCard, text: "Manage Fee Collections" },
    { icon: BookOpen, text: "Generate Receipts & Reports" },
    { icon: Shield, text: "Secure Financial Data" },
  ]
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/accountant/dashboard")
    }, 400)
  }

  return (
    <div className="relative min-h-screen bg-background font-sans">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-amber-50 via-transparent to-primary/5" />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="hidden w-1/2 flex-col justify-center gap-6 px-12 py-24 lg:flex">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Accountant Portal</h1>
          <p className="max-w-md text-muted-foreground">Sign in to manage collections, receipts and reports for your institution.</p>

          <div className="mt-6 space-y-4">
            {features.map((f) => (
              <div key={f.text} className="flex items-start gap-3">
                <div className="rounded-lg bg-amber-100 p-2">
                  <f.icon className="h-5 w-5 text-amber-700" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
          {/* Mobile Logo */}
          <div className="mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">EduFee</span>
            </Link>
          </div>

          {/* Back to Home */}
          <Link
            href="/"
            className="group mb-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          {/* Login Card */}
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-400/25">
                <Building2 className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Accountant Login</h2>
              <p className="mt-2 text-muted-foreground">Enter your credentials to access the accountant dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="accountant@edufee.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl border-border bg-card pl-11 text-foreground placeholder:text-muted-foreground focus:border-amber-500 focus:ring-amber-500/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl border-border bg-card pl-11 pr-11 text-foreground placeholder:text-muted-foreground focus:border-amber-500 focus:ring-amber-500/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link href="/accountant/forgot-password" className="text-sm font-medium text-amber-500 transition-colors hover:text-amber-400">Forgot Password?</Link>
              </div>

              <Button type="submit" className="h-12 w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 font-semibold text-white" disabled={isLoading}>
                Sign In
              </Button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Secured with 256-bit encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
