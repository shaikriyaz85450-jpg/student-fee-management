"use client"

// app/accountant/settings/page.tsx
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

import { Topbar } from "../_components/topbar"

import { getStoredUser, updateProfile } from "@/lib/api"

export default function SettingsPage() {
  const user = getStoredUser()
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState(user?.profile?.phone || "")
  const [designation, setDesignation] = useState(user?.profile?.designation || "")
  
  const [emailReminders, setEmailReminders] = useState(true)
  const [autoReceipt, setAutoReceipt] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)

  const save = async () => {
    setSaving(true)
    try {
      await updateProfile({
        name,
        email,
        phone,
        designation
      })
      toast.success("Profile updated successfully!")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Topbar title="Settings" subtitle="Manage accountant portal preferences" />

      <div className="p-0 space-y-6 max-w-2xl">

        {/* Profile */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Account profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Full name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Role</Label>
                <Input value={designation} onChange={(e) => setDesignation(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* School info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">School information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">School name</Label>
              <Input defaultValue="FeeFlow School" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Address</Label>
                <Input defaultValue="123 School Road, Tirupati" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Phone</Label>
                <Input defaultValue="(0877) 234-5678" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Receipt footer text</Label>
              <Input defaultValue="Thank you for your payment. Keep this receipt for your records." />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Email reminders for overdue fees", sub: "Automatically notify parents of pending dues", value: emailReminders, onChange: setEmailReminders },
              { label: "Auto-generate receipts", sub: "Generate receipt automatically on payment recording", value: autoReceipt, onChange: setAutoReceipt },
              { label: "Two-factor authentication", sub: "Require OTP on login for extra security", value: twoFactor, onChange: setTwoFactor },
            ].map((pref, i) => (
              <div key={i}>
                {i > 0 && <Separator className="mb-4" />}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{pref.label}</p>
                    <p className="text-xs text-muted-foreground">{pref.sub}</p>
                  </div>
                  <Switch checked={pref.value} onCheckedChange={pref.onChange} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Danger zone */}
        <Card className="border-red-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-red-600">Danger zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Reset all fee data</p>
                <p className="text-xs text-muted-foreground">Permanently delete all fee records for the current year</p>
              </div>
              <Button variant="destructive" size="sm" onClick={() => toast.error("Action disabled in demo mode")}>Reset data</Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="bg-[#1a2e4a] hover:bg-[#2a4a72] text-white px-6" onClick={save} disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save settings
          </Button>
        </div>
      </div>
    </div>
  )
}
