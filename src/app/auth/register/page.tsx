"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const inputClasses = "w-full bg-white border-none px-6 py-4 text-sm focus:ring-1 focus:ring-[#F65353] transition-all outline-none";
    const labelClasses = "text-[11px] text-[#696969] font-bold uppercase tracking-wider pl-4";

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
                    variant="outline"
                    className="bg-transparent border-[#E5E7EB] hover:bg-gray-50 text-[#1F1F1F] px-10 py-6 text-sm font-bold uppercase tracking-widest rounded-none transform transition-all"
                >
                    <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button
                    className="bg-[#0A1224] hover:bg-[#141C2E] text-white px-10 py-6 text-sm font-bold uppercase tracking-widest rounded-none shadow-lg transform transition-all hover:scale-105"
                >
                    Sign Up
                </Button>
            </div>

            {/* Form Box Section (Multi-column) */}
            <div className="bg-[#E8E9EC80] p-8 md:p-10 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    {/* Full Name */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClasses}>Enter your full name</label>
                        <input type="text" placeholder="Full name" className={inputClasses} />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClasses}>Enter email address</label>
                        <input type="email" placeholder="Email address" className={inputClasses} />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClasses}>Enter phone number</label>
                        <input type="tel" placeholder="Phone number" className={inputClasses} />
                    </div>

                    {/* DOB & Address Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className={labelClasses}>Date of birth</label>
                            <input type="date" className={inputClasses} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className={labelClasses}>Current address</label>
                            <input type="text" placeholder="Current address" className={inputClasses} />
                        </div>
                    </div>

                    {/* Country Selector */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClasses}>Country</label>
                        <div className="relative">
                            <select className={cn(inputClasses, "appearance-none cursor-pointer pr-12")}>
                                <option value="">Select country</option>
                                <option value="US">United States</option>
                                <option value="BD">Bangladesh</option>
                                <option value="IN">India</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Passwords Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className={labelClasses}>Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
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
                </div>
            </div>

            {/* Terms and Action */}
            <div className="space-y-6">
                <div className="flex items-start gap-4 px-2">
                    <input
                        type="checkbox"
                        id="terms"
                        className="mt-1 w-5 h-5 accent-[#F65353] border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-xs text-[#696969] leading-relaxed cursor-pointer">
                        I agree to the <span className="text-[#1F1F1F] font-bold underline">Terms of Service</span> and{" "}
                        <span className="text-[#1F1F1F] font-bold underline">Privacy Policy</span>. I understand my
                        data is protected under institutional security protocol.
                    </label>
                </div>

                <div className="space-y-6">
                    <Button
                        className="w-full bg-[#C51D1D] hover:bg-[#A31818] text-white py-8 text-base font-bold uppercase tracking-widest rounded-none shadow-xl transform transition-all hover:scale-[1.02]"
                    >
                        <Link href="/auth/verify-email">Create Account</Link>
                    </Button>

                    <p className="text-center text-[#696969] text-sm font-medium">
                        Already have an account?{" "}
                        <Link
                            href="/auth/login"
                            className="text-[#F65353] font-bold uppercase hover:underline transition-all"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
