"use client"

import React from "react"
import { Camera, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import {ProfileEditForm} from "../../components/profile/ProfileEditForm";

interface ProfileHeaderProps {
  fullName: string
  email: string
  phoneNumber: string
  location: string
  avatarGradient?: "emerald" | "blue" | "purple" | "amber"
  onEditClick?: () => void
}

const avatarGradients = {
  emerald: "from-emerald-500 to-teal-600",
  blue: "from-blue-500 to-cyan-600",
  purple: "from-purple-500 to-pink-600",
  amber: "from-amber-500 to-orange-600",
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  fullName,
  email,
  phoneNumber,
  location,
  avatarGradient = "emerald",
  onEditClick,
}) => {
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 transition-all duration-300 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        {/* Avatar and Basic Info */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div
              className={`flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br ${avatarGradients[avatarGradient]} text-3xl font-bold text-white shadow-lg shadow-primary/25`}
            >
              {initials}
            </div>
            <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110">
              <Camera className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{fullName}</h1>
              <p className="text-sm text-muted-foreground">Active Student</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                {phoneNumber}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {location}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={onEditClick}
          className="bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
        >
          Edit Profile
        </Button>
      </div>
    </div>
  )
}
export default function ProfilePage() {
  const [profileData, setProfileData] = React.useState({
    fullName: "John Doe",
    email: "john.doe@university.edu",
    phoneNumber: "+1 (555) 123-4567",
    location: "New York, USA",
    department: "Computer Science",
    semester: "6",
  });

  const [isEditing, setIsEditing] = React.useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (data: any) => {
    setProfileData(data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      {!isEditing ? (
        <ProfileHeader
          fullName={profileData.fullName}
          email={profileData.email}
          phoneNumber={profileData.phoneNumber}
          location={profileData.location}
          onEditClick={handleEditClick}
        />
      ) : (
        <ProfileEditForm
          fullName={profileData.fullName}
          email={profileData.email}
          phoneNumber={profileData.phoneNumber}
          location={profileData.location}
          department={profileData.department}
          semester={profileData.semester}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}