import { ConnectedDevices } from "@/app/accountant/settings/connected-devices";
import { SecuritySettings } from "@/app/accountant/settings/Security-Settings";
import { SettingsSection } from "@/app/accountant/settings/Settings-Section";
import { NotificationSettings } from "@/app/accountant/settings/Notification-Settings";

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-6">

      <SettingsSection title="Notifications" description="Manage your notification preferences">
        <NotificationSettings />
      </SettingsSection>

      <SettingsSection title="Security" description="Manage your account security settings">
        <SecuritySettings />
      </SettingsSection>

      <SettingsSection title="Connected Devices" description="View and manage your connected devices">
        <ConnectedDevices />
      </SettingsSection>

    </div>
  );
}