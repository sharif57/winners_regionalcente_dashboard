"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const inputClasses = "w-full bg-white border-none px-6 py-4 text-sm focus:ring-1 focus:ring-[#F65353] transition-all outline-none pr-12";
    const labelClasses = "text-[11px] text-[#696969] font-bold uppercase tracking-wider pl-4";

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700">
            {/* Header Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#F65353]" />
                    <span className="text-[#F65353] text-[13px] font-bold uppercase tracking-widest">
                        Password Recover
                    </span>
                </div>
                <h1 className="text-[#1F1F1F] text-3xl md:text-4xl font-bold italic leading-tight">
                    Create New Password
                </h1>
                <p className="text-[#696969] text-base lg:text-lg">
                    Your new password must be different from previous one
                </p>
            </div>

            {/* Input Box Section */}
            <div className="bg-[#E8E9EC80] p-8 md:p-10 space-y-6">
                <div className="flex flex-col gap-2">
                    <label className={labelClasses}>New password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New password"
                            className={inputClasses}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className={labelClasses}>Confirm password</label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm"
                            className={inputClasses}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-6">
                <Button
                    className="w-full bg-[#C51D1D] hover:bg-[#A31818] text-white py-8 text-base font-bold uppercase tracking-widest rounded-none shadow-xl transform transition-all hover:scale-[1.02]"
                >
                    <Link href="/auth/success">Reset Password</Link>
                </Button>

                <div className="flex justify-center">
                    <Link
                        href="/auth/login"
                        className="flex items-center gap-2 text-[#696969] text-sm font-medium hover:text-[#F65353] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Login</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
