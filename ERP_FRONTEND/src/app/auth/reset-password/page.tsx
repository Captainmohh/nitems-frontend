"use client";
import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Loader2, Eye, EyeOff, CheckCircle } from "lucide-react";
import { authApi } from "@/lib/api";

function ResetPasswordForm() {
  const params = useSearchParams();
  const router = useRouter();
  const userId = params.get("userId") ?? "";
  const token = params.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (!userId || !token) { setError("Invalid or expired reset link."); return; }

    setLoading(true);
    try {
      await authApi.resetPassword(userId, token, password);
      setDone(true);
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      setError(Array.isArray(msg) ? msg[0] : msg ?? "Invalid or expired reset link.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F2F0] flex flex-col items-center justify-center px-4 py-12">
      <div className="flex flex-col items-center mb-6">
        <Image src="/nitda-logo.png" alt="NITDA" width={100} height={60} className="object-contain" />
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#1C4B40] mt-2">ERP</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-8 py-8">
          {done ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Password Reset</h1>
              <p className="text-gray-500 text-sm">Your password has been updated successfully.</p>
              <button
                onClick={() => router.push("/auth/sign-in")}
                className="w-full py-3 rounded-lg bg-[#1C4B40] hover:bg-[#254f43] text-white font-bold text-sm transition-colors mt-2"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-[#1C4B40]/10 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-[#1C4B40]" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Set New Password</h1>
              </div>

              {(!userId || !token) && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4">
                  Invalid or expired reset link. <Link href="/auth/forgot-password" className="underline">Request a new one</Link>.
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPwd ? "text" : "password"} required autoFocus
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#1C4B40] focus:ring-2 focus:ring-[#1C4B40]/10 bg-gray-50"
                    />
                    <button type="button" onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPwd ? "text" : "password"} required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#1C4B40] focus:ring-2 focus:ring-[#1C4B40]/10 bg-gray-50"
                    />
                  </div>
                </div>
                <button
                  type="submit" disabled={loading || !userId || !token}
                  className="w-full py-3 rounded-lg bg-[#1C4B40] hover:bg-[#254f43] text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Resetting…</> : "Reset Password"}
                </button>
              </form>
            </>
          )}
        </div>

        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">Copyright © {new Date().getFullYear()} NITDA | All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return <Suspense><ResetPasswordForm /></Suspense>;
}
