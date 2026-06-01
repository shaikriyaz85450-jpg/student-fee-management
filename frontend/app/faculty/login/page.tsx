"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { GraduationCap, ArrowLeft, Eye, EyeOff, User, Lock, BookOpen, CreditCard, FileText, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FacultyAuthPage() {
  const [isRegister, setIsRegister] = useState(false)
  const features = [
    { icon: CreditCard, text: "View & Pay Fees Online" },
    { icon: BookOpen, text: "Track Payment History" },
    { icon: Shield, text: "Secure Transactions" },
  ];
  const [showPassword, setShowPassword] = useState(false);
  const [facultyId, setFacultyId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      facultyId,
      email: isRegister ? email : undefined,
      password,
      confirmPassword: isRegister ? confirmPassword : undefined,
    };
    console.log(isRegister ? "Register form submitted" : "Login form submitted", payload);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/faculty/dashboard");
    }, 300);
  };

  return (
    <div className="relative min-h-screen bg-background font-sans">
      {/* Gradient Overlay */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-primary/5" />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        
        {/* Right Panel - Login Form */}
        <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
          {/* Mobile Logo */}
          <div className="mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-600 shadow-lg">
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
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-teal-600 shadow-lg shadow-blue-500/25">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Faculty Login</h2>
              <p className="mt-2 text-muted-foreground">
                Enter your credentials to access students details
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Faculty ID Field */}
              <div className="space-y-2">
                <Label htmlFor="facultyId" className="text-sm font-medium text-foreground">
                  Faculty ID
                </Label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="facultyId"
                    type="text"
                    placeholder="Enter your faculty ID"
                    value={facultyId}
                    onChange={(e) => setFacultyId(e.target.value)}
                    className="h-12 rounded-xl border-border bg-card pl-11 text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                </div>
              </div>

              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl border-border bg-card px-4 text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                </div>
              )}

              {/* Password Field */}
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
                    className="h-12 rounded-xl border-border bg-card pl-11 pr-11 text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-blue-500/20"
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
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 rounded-xl border-border bg-card pl-11 pr-11 text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                </div>
              )}

              {/* Forgot Password */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {isRegister ? "Create your faculty account" : "Enter your faculty credentials"}
                  </span>
                  <Link
                    href="/faculty/forgot-password"
                    className="text-sm font-medium text-blue-500 transition-colors hover:text-blue-400"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-500 to-teal-600 font-semibold text-white"
                >
                  {isRegister ? "Register" : "Sign In"}
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  className="h-12 w-full rounded-xl font-semibold"
                  onClick={() => setIsRegister(!isRegister)}
                >
                  {isRegister ? "Back to Login" : "Create an account"}
                </Button>
              </div>
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
