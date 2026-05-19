"use client";

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Settings
        </h1>

        <p className="text-muted-foreground mt-1">
          Manage faculty account preferences and security
        </p>
      </div>

      {/* Profile Settings */}
      <div className="border border-border bg-card/50 backdrop-blur-sm rounded-xl p-6 space-y-5">

        <h2 className="text-xl font-semibold">
          Profile Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium">
              Faculty Name
            </label>

            <input
              type="text"
              placeholder="Enter faculty name"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter email"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 outline-none focus:border-primary"
            />
          </div>

        </div>

        <button className="rounded-xl bg-primary px-6 py-3 text-primary-foreground hover:opacity-90 transition-all">
          Save Changes
        </button>

      </div>

      {/* Security Settings */}
      <div className="border border-border bg-card/50 backdrop-blur-sm rounded-xl p-6 space-y-5">

        <h2 className="text-xl font-semibold">
          Security Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 outline-none focus:border-primary"
            />
          </div>

        </div>

        <button className="rounded-xl bg-primary px-6 py-3 text-primary-foreground hover:opacity-90 transition-all">
          Update Password
        </button>

      </div>

    </div>
  );
}