"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { GraduationCap, ArrowLeft, Eye, EyeOff, User, Lock, BookOpen, CreditCard, FileText, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login, registerUser } from "@/lib/api"

export default function StudentLoginPage() {
  const features = [
    { icon: CreditCard, text: "View & Pay Fees Online" },
    { icon: BookOpen, text: "Track Payment History" },
    { icon: Shield, text: "Secure Transactions" },
  ];
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [semester, setSemester] = useState("1");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        await registerUser({
          name,
          email: studentId,
          password,
          role: "STUDENT",
          rollNumber: rollNumber || undefined,
          semester: parseInt(semester),
        });
      }
      await login(studentId, password, "STUDENT");
      router.push("/student/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : isRegister ? "Unable to register" : "Unable to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background font-sans">
      {/* Gradient Overlay */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-primary/5" />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        
        {/* Right Panel - Login Form */}
        <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
          {/* Mobile Logo */}
          <div className="mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                <GraduationCap className="h-5 w-5 text-white" />
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
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {isRegister ? "Student Registration" : "Student Login"}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {isRegister ? "Create your student account with your details" : "Enter your credentials to access your fee dashboard"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-xl border-border bg-card px-4 text-foreground focus:border-emerald-500 focus:ring-emerald-500/20"
                    required
                  />
                </div>
              )}
              {/* Student ID Field */}
              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-sm font-medium text-foreground">
                  Email or Roll Number
                </Label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="studentId"
                    type="text"
                    placeholder="Enter your email or roll number"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="h-12 rounded-xl border-border bg-card pl-11 text-foreground placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-emerald-500/20"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              {isRegister && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rollNumber" className="text-sm font-medium text-foreground">Roll Number (Optional)</Label>
                    <Input
                      id="rollNumber"
                      type="text"
                      placeholder="e.g. 21CS001"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      className="h-12 rounded-xl border-border bg-card px-4 focus:border-emerald-500 focus:ring-emerald-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester" className="text-sm font-medium text-foreground">Semester</Label>
                    <select
                      id="semester"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="h-12 w-full rounded-xl border border-border bg-card px-4 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                        <option key={s} value={String(s)}>Semester {s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
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
                    className="h-12 rounded-xl border-border bg-card pl-11 pr-11 text-foreground placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-emerald-500/20"
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

              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 rounded-xl border-border bg-card px-4 text-foreground focus:border-emerald-500 focus:ring-emerald-500/20"
                    required
                  />
                </div>
              )}

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  href="/student/forgot-password"
                  className="text-sm font-medium text-emerald-500 transition-colors hover:text-emerald-400"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              {error && <p className="text-sm font-medium text-destructive">{error}</p>}
<Button
  type="submit"
  className="h-12 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 font-semibold text-white"
  disabled={isLoading}
>
  {isLoading ? (isRegister ? "Creating account..." : "Signing in...") : isRegister ? "Register & Sign In" : "Sign In"}
</Button>
              <Button
                type="button"
                variant="secondary"
                className="h-12 w-full rounded-xl font-semibold"
                onClick={() => {
                  setIsRegister(!isRegister)
                  setError("")
                }}
              >
                {isRegister ? "Back to Login" : "Register as Student"}
              </Button>
            </form>

            {/* Security Note */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Secured with 256-bit encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
