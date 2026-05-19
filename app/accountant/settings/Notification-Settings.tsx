"use client"

import React from "react"
import { Switch } from "@/components/ui/switch"
import { Bell, Mail, MessageSquare, Clock } from "lucide-react"

export function NotificationSettings() {
  const [notifications, setNotifications] = React.useState({
    paymentReminders: true,
    emailUpdates: true,
    smsAlerts: false,
    pushNotifications: true,
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-4 transition-all hover:bg-muted/50">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium text-foreground">Payment Reminders</p>
            <p className="text-sm text-muted-foreground">Get notified before payment deadlines</p>
          </div>
        </div>
        <Switch
          checked={notifications.paymentReminders}
          onCheckedChange={(checked) =>
            setNotifications({ ...notifications, paymentReminders: checked })
          }
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-4 transition-all hover:bg-muted/50">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-accent" />
          <div>
            <p className="font-medium text-foreground">Email Updates</p>
            <p className="text-sm text-muted-foreground">Receive email notifications</p>
          </div>
        </div>
        <Switch
          checked={notifications.emailUpdates}
          onCheckedChange={(checked) =>
            setNotifications({ ...notifications, emailUpdates: checked })
          }
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-4 transition-all hover:bg-muted/50">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-5 w-5 text-emerald-500" />
          <div>
            <p className="font-medium text-foreground">SMS Alerts</p>
            <p className="text-sm text-muted-foreground">Receive text message notifications</p>
          </div>
        </div>
        <Switch
          checked={notifications.smsAlerts}
          onCheckedChange={(checked) =>
            setNotifications({ ...notifications, smsAlerts: checked })
          }
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-4 transition-all hover:bg-muted/50">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-amber-500" />
          <div>
            <p className="font-medium text-foreground">Push Notifications</p>
            <p className="text-sm text-muted-foreground">Receive browser notifications</p>
          </div>
        </div>
        <Switch
          checked={notifications.pushNotifications}
          onCheckedChange={(checked) =>
            setNotifications({ ...notifications, pushNotifications: checked })
          }
        />
      </div>
    </div>
  )
}
