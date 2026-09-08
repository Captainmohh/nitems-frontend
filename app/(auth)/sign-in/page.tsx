"use client";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* LEFT SIDE - INTRODUCTION */}
      <section
        className="w-full lg:w-1/2 min-h-screen flex items-center bg-linear-to-r from bg-[#ECF0FF] to-white justify-center px-6 sm:px-10 lg:px-16
          py-12">
        <div className="w-full max-w-md lg:max-w-lg">
          <img
            src="./nitems.png"
            alt="NITDA Logo"
            className="w:386px h:94px top:172px left:94px mt-10 mb-6"></img>

          <h1 className="w:530px h:78px top:305px left:114px text-1xl sm:text-2xl lg:text-3xl font-semibold text-black mb-10">
            Welcome to the NITDA <br /> Employment Management System
          </h1>

          <p className="w:578px h:410px top:497px left:114px text-sm sm:text-base text-black leading-relaxed mb-6">
            The NITDA Employment Management System is a secure digital platform
            designed to streamline the recruitment and employment management
            process within the National Information <br />
            Technology Development Agency. The system enables applicants,
            administrators, and authorized personnel to efficiently manage job
            applications, review candidate profiles, and monitor recruitment
            activities.
          </p>
          <p className="text-sm sm:text-base text-black leading-relaxed">
            Authorized users can log in to access their dashboard, submit or
            review applications, track recruitment progress, and manage
            employment records in a transparent and efficient manner.
          </p>
        </div>
      </section>

      {/* Form section */}

      <section
        className="w-full lg:w-1/2 min-h-screen flex items-start
         bg-white justify-center px-6 sm:px-10 lg:px-16
          py-5">
        <div className="mt-30 w-full max-w-md lg:max-w-lg">
          <img
            src="./nitems.png"
            alt="NITDA Logo"
            className="w-64 h-full mb-6"></img>

          <h1 className="text-1xl sm:text-2xl lg:text-3xl font-semibold text-black mb-3">
            Sign In to your Account
          </h1>
          <p className="mb-4 text-sm sm:text-base leading-relaxed text-black font-light">
            Welcome back! please enter your detail
          </p>

          {/* E-mail */}
          <form className="space-y-4">
            <div className="relative">
              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="email"
                placeholder="Email"
                required
                style={{ paddingLeft: "50px" }}
                className="w-full p-3 sm:p-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-400 
                font-medium text-black focus:outline-none focus:ring-2 focus:ring-emerald-200"></input>
            </div>

            {/*  Password */}
            <div className="relative w-full">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                style={{ paddingLeft: "50px", paddingRight: "50px" }}
                className="w-full p-3 sm:p-4 rounded-lg bg-gray-100 border 
                border-gray-200 placeholder-gray-400 font-medium text-black focus:outline-none 
                focus:ring-2 focus:ring-emerald-200"
              />

              {/* Show/hide password button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400
               hover:text-gray-600">
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between mt-3">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span>Remember me</span>
              </label>

              <a
                href="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-900 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Sign in button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white 
              font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
