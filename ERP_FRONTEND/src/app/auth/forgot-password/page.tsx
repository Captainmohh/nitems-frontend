"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { authApi } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authApi.requestPasswordReset(email.trim());
      setSent(true);
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      setError(Array.isArray(msg) ? msg[0] : msg ?? "Something went wrong. Please try again.");
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
          <Link href="/auth/sign-in" className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to login
          </Link>

          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Check your email</h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                If an account exists for <strong>{email}</strong>, we've sent a password reset link. Check your inbox and follow the link to reset your password.
              </p>
              <p className="text-xs text-gray-400">Didn't get it? Check your spam folder or{" "}
                <button onClick={() => setSent(false)} className="text-[#1C4B40] underline">try again</button>.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-[#1C4B40]/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#1C4B40]" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Forgot Password</h1>
              </div>
              <p className="text-sm text-gray-500 mb-6">Enter your email address and we'll send you a link to reset your password.</p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email" required autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#1C4B40] focus:ring-2 focus:ring-[#1C4B40]/10 bg-gray-50"
                    />
                  </div>
                </div>
                <button
                  type="submit" disabled={loading}
                  className="w-full py-3 rounded-lg bg-[#1C4B40] hover:bg-[#254f43] text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send Reset Link"}
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
