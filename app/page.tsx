"use client"

import { GraduationCap, BookOpen, Calculator, ArrowRight, Users, CreditCard, FileText, TrendingUp, Shield, Bell, BarChart3, Wallet, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link";

const stats = [
  { label: "Active Students", value: "12,500+", icon: Users },
  { label: "Transactions", value: "₹2.5 Cr+", icon: CreditCard },
  { label: "Fee Receipts", value: "45,000+", icon: FileText },
  { label: "Collection Rate", value: "98.5%", icon: TrendingUp },
]

const roles = [
  {
    id: "student",
    title: "Student",
    description: "Access your fee details, payment history, and download receipts. Stay updated with upcoming due dates.",
    icon: GraduationCap,
    gradient: "from-emerald-500 to-teal-600",
    shadowColor: "shadow-emerald-500/25",
  },
  {
    id: "faculty",
    title: "Faculty",
    description: "View student fee records, track payment compliance, and generate reports for your classes.",
    icon: BookOpen,
    gradient: "from-blue-500 to-indigo-600",
    shadowColor: "shadow-blue-500/25",
  },
  {
    id: "accountant",
    title: "Accountant",
    description: "Complete financial oversight with advanced reporting, fee structure management, and processing.",
    icon: Calculator,
    gradient: "from-amber-500 to-orange-600",
    shadowColor: "shadow-amber-500/25",
  },
]

const features = [
  { icon: Shield, title: "Secure Payments", description: "Bank-grade encryption for all transactions" },
  { icon: Bell, title: "Smart Alerts", description: "Automated reminders for due dates" },
  { icon: BarChart3, title: "Analytics", description: "Detailed financial reports and insights" },
  { icon: Wallet, title: "Multi-Payment", description: "UPI, Cards, Net Banking supported" },
]

const feeCategories = [
  { name: "Tuition Fee", amount: "₹45,000", period: "Per Semester", status: "primary" },
  { name: "Library Fee", amount: "₹2,500", period: "Per Year", status: "secondary" },
  { name: "Lab Fee", amount: "₹5,000", period: "Per Semester", status: "secondary" },
  { name: "Exam Fee", amount: "₹1,500", period: "Per Exam", status: "secondary" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Gradient Overlay */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">EduFee</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Features</a>
            <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Pricing</a>
            <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Contact</a>
          </nav>
          <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80 font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-20 md:pt-28">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent"></span>
              </span>
              <span className="text-muted-foreground">Trusted by <span className="font-semibold text-foreground">500+</span> Institutions</span>
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Student Fee Management
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">Made Simple</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Streamline your institution&apos;s fee collection with our comprehensive management system. 
              Secure, efficient, and designed for everyone.
            </p>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card"
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Role Selection */}
          <div className="mt-24">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Choose Your Portal</h2>
              <p className="mt-2 text-muted-foreground">Select your role to access the dashboard</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl ${role.shadowColor}`}
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${role.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      <role.icon className="h-7 w-7 text-white" />
                    </div>
                    {/* Content */}
                    <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-white">{role.title}</h3>
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-white/80">
                      {role.description}
                    </p>
                    {/* Login Button */}
                    {role.id === "student" ? (
                      <Link href="/student/login" className="block">
                        <Button 
                          className="w-full gap-2 bg-secondary font-medium text-secondary-foreground transition-all duration-300 group-hover:bg-white group-hover:text-gray-900"
                          variant="secondary"
                        >
                          Login as {role.title}
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        className="w-full gap-2 bg-secondary font-medium text-secondary-foreground transition-all duration-300 group-hover:bg-white group-hover:text-gray-900"
                        variant="secondary"
                        disabled
                      >
                        Login as {role.title}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fee Categories */}
          <div className="mt-24">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Fee Structure Overview</h2>
              <p className="mt-2 text-muted-foreground">Transparent fee categories managed by our system</p>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              {feeCategories.map((fee, index) => (
                <div
                  key={fee.name}
                  className={`group relative overflow-hidden rounded-2xl border border-border p-5 transition-all duration-300 hover:border-primary/50 ${index === 0 ? 'bg-gradient-to-br from-primary/10 to-card' : 'bg-card/50'}`}
                >
                  {index === 0 && (
                    <div className="absolute right-3 top-3">
                      <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">Primary</span>
                    </div>
                  )}
                  <p className="text-sm font-medium text-muted-foreground">{fee.name}</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">{fee.amount}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{fee.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-24">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Why Choose EduFee?</h2>
              <p className="mt-2 text-muted-foreground">Powerful features for modern institutions</p>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-border bg-card/50 p-6 text-center transition-all duration-300 hover:border-primary/50 hover:bg-card"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="mb-2 font-semibold text-foreground">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-8 md:p-12">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="relative z-10 flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
                <div>
                  <h3 className="text-2xl font-bold text-white md:text-3xl">Ready to streamline your fee management?</h3>
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-white/80 md:justify-start">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> Free 30-day trial</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> No credit card required</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> 24/7 Support</span>
                  </div>
                </div>
                <Button size="lg" className="bg-white font-semibold text-primary shadow-xl hover:bg-white/90">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
                <GraduationCap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">EduFee</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 EduFee. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Terms</a>
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}