"use client";

import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { Upload, Camera } from "lucide-react";
import { Employee } from "@/lib/data/employees";

interface ProfileHeaderProps {
  employee: Employee;
}

export function ProfileHeader({ employee }: ProfileHeaderProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
      {/* Top Green Bar */}
      <div className="bg-[#22C55E] px-6 py-3.5 text-white font-bold text-sm tracking-wide">
        Profile
      </div>

      <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start justify-between gap-6">
        {/* Left Column: Details */}
        <div className="space-y-6 flex-1">
          <div>
            <span className="text-xs text-gray-400 block mb-1">Full Name</span>
            <h2 className="text-2xl font-bold text-[#16A34A] tracking-tight">
              {employee.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 max-w-xl">
            <div>
              <span className="text-xs text-gray-400 block">Staff ID</span>
              <span className="text-xs font-semibold text-gray-800 mt-1 block">
                {employee.staffId}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-400 block">Email</span>
              <span className="text-xs font-semibold text-gray-800 mt-1 block">
                {employee.email}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-400 block">Department</span>
              <span className="text-xs font-semibold text-gray-800 mt-1 block">
                {employee.departmentFull}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-400 block">Title</span>
              <span className="text-xs font-semibold text-gray-800 mt-1 block">
                {employee.title}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Upload Box & Level/Step Pill */}
        <div className="flex flex-col items-center md:items-end gap-4 shrink-0">
          <div className="relative w-36 h-44 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center overflow-hidden group">
            {uploadedImage ? (
              <>
                <Image
                  src={uploadedImage}
                  alt={employee.name}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs gap-1"
                >
                  <Camera className="w-4 h-4" />
                  Change Image
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center gap-2 p-3 text-center text-gray-500 hover:text-[#16A34A] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-gray-200 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-gray-400 group-hover:text-[#16A34A] transition-colors" />
                </div>
                <span className="text-xs font-semibold">Upload Photo</span>
                <span className="text-[10px] text-gray-400">PNG, JPG up to 2MB</span>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Level & Step Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm min-w-[130px] flex items-center justify-center">
            <div className="flex items-start gap-2.5">
              {/* Level Section */}
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-normal text-gray-600 mb-0.5">
                  Level
                </span>
                <span className="text-6xl font-bold text-[#38A169] leading-none tracking-tight">
                  {employee.level}
                </span>
              </div>

              {/* Step Section */}
              <div className="flex flex-col items-center pt-1.5">
                <span className="text-4xl font-bold text-[#FF0000] leading-none tracking-tight">
                  {employee.step}
                </span>
                <span className="text-[10px] font-normal text-gray-600 mt-1">
                  Step
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}