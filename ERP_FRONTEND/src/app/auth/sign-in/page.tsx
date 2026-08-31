"use client";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "@/store/auth";
import { Loader2, Lock, Mail, Eye, EyeOff } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Minimum 6 characters"),
});
type SignInForm = z.infer<typeof signInSchema>;

const fieldClass =
  "w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#1C4B40] focus:ring-2 focus:ring-[#1C4B40]/10 transition-colors bg-gray-50";

function MicrosoftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 21 21" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

function SignInForm() {
  const { signIn, isLoading, setTokens } = useAuthStore();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/dashboard";
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (data: SignInForm) => {
    // 1. Check for local mock credentials first
    if (data.email === "admin@nitda.gov.ng" && data.password === "123456789") {
      setTokens("demo-access-token", "demo-refresh-token");
      useAuthStore.setState({
        user: {
          id: "demo-admin-01",
          firstName: "NITDA",
          lastName: "ADMIN",
          phone: "+234 701 700 0862",
          email: data.email,
          role: "ADMIN",
          isVerified: true,
          isBanned: false,
        },
      });
      toast.success("Welcome back, Admin!");
      router.push(next);
      return;
    }
    try {
      await signIn(data.email, data.password);
      toast.success("Welcome back!");
      router.push(next);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (!err.response) {
          toast.error("Cannot connect to server. Check your internet connection.");
        } else {
          const msg = err.response.data?.message;
          toast.error(Array.isArray(msg) ? msg[0] : (msg || "Invalid email or password."));
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleSsoSignIn = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/sso/entra/login?next=${encodeURIComponent(next)}`;
  };

  return (
    <div className="min-h-screen bg-[#F0F2F0] flex flex-col items-center justify-center px-4 py-12">
      <div className="flex flex-col items-center mb-6">
        <Image src="/nitda-logo.png" alt="NITDA" width={100} height={60} className="object-contain" />
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#1C4B40] mt-2">ERP</p>
        <p className="text-sm text-gray-500 mt-1">Sign in to access your account</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-8 py-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-full bg-[#1C4B40]/10 flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#1C4B40]" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Sign In</h1>
          </div>
          <div className="h-px bg-gray-100 mb-6" />

          <button
            type="button"
            onClick={handleSsoSignIn}
            className="w-full py-3 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2 mb-6"
          >
            <MicrosoftIcon />
            Sign in with Microsoft
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-gray-100 flex-1" />
            <span className="text-xs text-gray-400">or</span>
            <div className="h-px bg-gray-100 flex-1" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input {...register("email")} type="email" placeholder="you@nitda.gov.ng" autoComplete="email" autoCapitalize="none" autoCorrect="off" className={fieldClass} />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-[#1C4B40] hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input {...register("password")} type={showPassword ? "text" : "password"} placeholder="••••••••••" autoComplete="current-password" autoCapitalize="none" autoCorrect="off" spellCheck={false} className={`${fieldClass} pr-10`} />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-[#1C4B40] hover:bg-[#254f43] text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
            >
              {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</> : "Sign In"}
            </button>
          </form>
        </div>

        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Copyright © {new Date().getFullYear()} NITDA | All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
