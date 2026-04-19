"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700">
            {/* Header Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#F65353]" />
                    <span className="text-[#F65353] text-[13px] font-bold uppercase tracking-widest">
                        Secure Portal Access
                    </span>
                </div>
                <h1 className="text-[#1F1F1F] text-3xl md:text-4xl font-bold italic leading-tight">
                    Start your EB-5 or investment today
                </h1>
            </div>

            {/* Auth Switcher Tabs */}
            <div className="flex gap-4">
                <Button
                    className="bg-[#0A1224] hover:bg-[#141C2E] text-white px-10 py-6 text-sm font-bold uppercase tracking-widest rounded-none shadow-lg transform transition-all hover:scale-105"
                >
                    Sign In
                </Button>
                <Button
                    variant="outline"
                    className="bg-transparent border-[#E5E7EB] hover:bg-gray-50 text-[#1F1F1F] px-10 py-6 text-sm font-bold uppercase tracking-widest rounded-none transform transition-all"
                >
                    <Link href="/auth/register">Sign Up</Link>
                </Button>
            </div>

            {/* Form Box Section */}
            <div className="bg-[#E8E9EC80] p-8 md:p-10 space-y-6">
                <div className="space-y-4">
                    {/* Email Input */}
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

                    {/* Password Input Area */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[11px] text-[#696969] font-bold uppercase tracking-wider pl-4">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Your password"
                                className="w-full bg-white border-none px-6 py-4 text-sm focus:ring-1 focus:ring-[#F65353] transition-all outline-none pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                    <Link
                        href="/auth/forgot-password"
                        className="text-[#F65353] text-sm font-bold italic hover:underline transition-all"
                    >
                        Forgot Password ?
                    </Link>
                </div>
            </div>

            {/* Primary Action */}
            <div className="space-y-6">
                <Button
                    className="w-full bg-[#C51D1D] hover:bg-[#A31818] text-white py-8 text-base font-bold uppercase tracking-widest rounded-none shadow-xl transform transition-all hover:scale-[1.02]"
                >
                    <Link href="/auth/verify-email">Sign In</Link>
                </Button>

                <p className="text-center text-[#696969] text-sm font-medium">
                    Don&lsquo;t have an account?{" "}
                    <Link
                        href="/auth/register"
                        className="text-[#F65353] font-bold uppercase hover:underline transition-all"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
