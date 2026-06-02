"use client"

import React from "react"
import { Laptop, Smartphone, Globe, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Device {
  id: string
  name: string
  type: "laptop" | "mobile" | "web"
  browser?: string
  location: string
  lastActive: string
  isCurrent?: boolean
}

export function ConnectedDevices() {
  const [devices] = React.useState<Device[]>([
    {
      id: "1",
      name: "MacBook Pro",
      type: "laptop",
      browser: "Chrome",
      location: "New Delhi, India",
      lastActive: "Active now",
      isCurrent: true,
    },
    {
      id: "2",
      name: "iPhone 14",
      type: "mobile",
      browser: "Safari",
      location: "New Delhi, India",
      lastActive: "2 hours ago",
    },
    {
      id: "3",
      name: "Web Browser",
      type: "web",
      browser: "Firefox",
      location: "Bangalore, India",
      lastActive: "1 day ago",
    },
  ])

  const getIcon = (type: string) => {
    switch (type) {
      case "laptop":
        return <Laptop className="h-5 w-5 text-primary" />
      case "mobile":
        return <Smartphone className="h-5 w-5 text-accent" />
      case "web":
        return <Globe className="h-5 w-5 text-emerald-500" />
      default:
        return <Laptop className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-3">
      {devices.map((device) => (
        <div
          key={device.id}
          className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-4 transition-all hover:bg-muted/50"
        >
          <div className="flex items-start gap-4">
            <div className="mt-1">{getIcon(device.type)}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground">{device.name}</p>
                {device.isCurrent && (
                  <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
                    Current
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{device.browser} • {device.location}</p>
              <p className="text-xs text-muted-foreground mt-1">{device.lastActive}</p>
            </div>
          </div>
          {!device.isCurrent && (
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
