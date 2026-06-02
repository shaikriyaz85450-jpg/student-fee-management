"use client";

import { useState } from "react";
import { getStoredUser, updateProfile } from "@/lib/api";
import { toast } from "sonner";

export default function SettingsPage() {
  const user = getStoredUser();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      await updateProfile({ name, email });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!password || password !== confirmPassword) {
      toast.error("Passwords must match and not be empty");
      return;
    }
    setIsLoading(true);
    try {
      await updateProfile({ password });
      toast.success("Password updated successfully!");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage faculty account preferences and security</p>
      </div>

      <div className="border border-border bg-card/50 backdrop-blur-sm rounded-xl p-6 space-y-5">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Faculty Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter faculty name"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 outline-none focus:border-primary"
            />
          </div>
        </div>
        <button
          onClick={handleUpdateProfile}
          disabled={isLoading}
          className="rounded-xl bg-primary px-6 py-3 text-primary-foreground hover:opacity-90 transition-all disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="border border-border bg-card/50 backdrop-blur-sm rounded-xl p-6 space-y-5">
        <h2 className="text-xl font-semibold">Security Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 outline-none focus:border-primary"
            />
          </div>
        </div>
        <button
          onClick={handleUpdatePassword}
          disabled={isLoading}
          className="rounded-xl bg-primary px-6 py-3 text-primary-foreground hover:opacity-90 transition-all disabled:opacity-50"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}