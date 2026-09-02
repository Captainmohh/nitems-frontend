"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { User, Lock, Save } from "lucide-react";
import { userApi } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ProfilePage() {
  const { user, refreshProfile } = useAuthStore();

  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
  });

  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const profileMutation = useMutation({
    mutationFn: () => userApi.updateProfile(profileForm),
    onSuccess: async () => {
      await refreshProfile();
      toast.success("Profile updated");
    },
    onError: () => toast.error("Failed to update profile"),
  });

  const passwordMutation = useMutation({
    mutationFn: () =>
      userApi.changePassword({
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      }),
    onSuccess: () => {
      toast.success("Password changed");
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    },
    onError: () => toast.error("Failed to change password"),
  });

  const handlePasswordSubmit = () => {
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (pwForm.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    passwordMutation.mutate();
  };

  return (
    <div className="min-h-full">
      <TopBar title="Profile & Settings" subtitle="Manage your account" />
      <div className="p-6 max-w-2xl space-y-6">
        {/* Profile Info */}
        <Card>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#1C4B40] flex items-center justify-center">
              <User className="w-5 h-5 text-[#1C4B40]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Personal Information</h3>
              <p className="text-xs text-gray-500">Update your name and contact details</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={profileForm.firstName}
                onChange={(e) =>
                  setProfileForm((f) => ({ ...f, firstName: e.target.value }))
                }
              />
              <Input
                label="Last Name"
                value={profileForm.lastName}
                onChange={(e) =>
                  setProfileForm((f) => ({ ...f, lastName: e.target.value }))
                }
              />
            </div>

            <Input
              label="Email Address"
              value={user?.email ?? ""}
              disabled
              className="opacity-60 cursor-not-allowed"
            />

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-500">
              <span className="font-semibold text-gray-900">Role: </span>
              <span className="text-[#1C4B40] font-mono">{user?.role}</span>
            </div>

            <div className="flex justify-end">
              <Button
                loading={profileMutation.isPending}
                onClick={() => profileMutation.mutate()}
              >
                <Save className="w-4 h-4" /> Save Changes
              </Button>
            </div>
          </div>
        </Card>

        {/* Change Password */}
        <Card>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#1C4B40] flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#1C4B40]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Change Password</h3>
              <p className="text-xs text-gray-500">Use a strong, unique password</p>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••"
              value={pwForm.currentPassword}
              onChange={(e) =>
                setPwForm((f) => ({ ...f, currentPassword: e.target.value }))
              }
            />
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={pwForm.newPassword}
              onChange={(e) =>
                setPwForm((f) => ({ ...f, newPassword: e.target.value }))
              }
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              value={pwForm.confirmPassword}
              onChange={(e) =>
                setPwForm((f) => ({ ...f, confirmPassword: e.target.value }))
              }
              error={
                pwForm.confirmPassword &&
                pwForm.newPassword !== pwForm.confirmPassword
                  ? "Passwords do not match"
                  : undefined
              }
            />

            <div className="flex justify-end">
              <Button
                loading={passwordMutation.isPending}
                onClick={handlePasswordSubmit}
                disabled={
                  !pwForm.currentPassword ||
                  !pwForm.newPassword ||
                  !pwForm.confirmPassword
                }
              >
                <Lock className="w-4 h-4" /> Update Password
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
