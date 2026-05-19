import React from "react"
import { Lock, Shield, Smartphone, Key } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SecuritySettings() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-4 transition-all hover:bg-muted/50">
        <div className="flex items-center gap-3">
          <Lock className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium text-foreground">Change Password</p>
            <p className="text-sm text-muted-foreground">Update your password regularly for security</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Change
        </Button>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-4 transition-all hover:bg-muted/50">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-accent" />
          <div>
            <p className="font-medium text-foreground">Two-Factor Authentication</p>
            <p className="text-sm text-muted-foreground">Enable 2FA for enhanced security</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Enable
        </Button>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-4 transition-all hover:bg-muted/50">
        <div className="flex items-center gap-3">
          <Key className="h-5 w-5 text-emerald-500" />
          <div>
            <p className="font-medium text-foreground">API Keys</p>
            <p className="text-sm text-muted-foreground">Manage your API credentials</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Manage
        </Button>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-4 transition-all hover:bg-muted/50">
        <div className="flex items-center gap-3">
          <Smartphone className="h-5 w-5 text-amber-500" />
          <div>
            <p className="font-medium text-foreground">Session Management</p>
            <p className="text-sm text-muted-foreground">View and manage active sessions</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          View Sessions
        </Button>
      </div>
    </div>
  )
}
