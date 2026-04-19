"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
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
                    Forgot Password
                </h1>
                <p className="text-[#696969] text-sm md:text-base">
                    Enter your email and we will send you 6 digit OTP for recover your password
                </p>
            </div>

            {/* Input Box Section */}
            <div className="bg-[#E8E9EC80] p-8 md:p-10">
                <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#696969] font-bold uppercase tracking-wider pl-4">
                        Enter email address
                    </label>
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full bg-white border-none px-6 py-4 text-sm focus:ring-1 focus:ring-[#F65353] transition-all outline-none"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-6">
                <Button
                    className="w-full bg-[#C51D1D] hover:bg-[#A31818] text-white py-8 text-base font-bold uppercase tracking-widest rounded-none shadow-xl transform transition-all hover:scale-[1.02]"
                >
                    <Link href="/auth/verify-email?mode=recover">Send Code</Link>
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
