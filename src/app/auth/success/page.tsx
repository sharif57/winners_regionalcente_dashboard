"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-700">
            {/* Header Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#F65353]" />
                    <span className="text-[#F65353] text-[13px] font-bold uppercase tracking-widest">
                        Secure Portal Access
                    </span>
                </div>
                <h1 className="text-[#1F1F1F] text-3xl md:text-4xl font-bold italic leading-tight">
                    Email Verified Successfully
                </h1>
                <p className="text-[#696969] text-base lg:text-lg">
                    Your account has been successfully created. You can now go to the dashboard to explore our
                    various projects, make investments, and access detailed information.
                </p>
            </div>

            {/* Success Icon Box */}
            <div className="bg-[#E8E9EC80] p-16 md:p-24 rounded-sm flex justify-center items-center">
                <div className="relative w-24 h-24 md:w-32 md:h-32">
                    {/* Gear SVG with Checkmark */}
                    <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full text-[#0D9488] fill-current animate-spin-slow"
                    >
                        <path d="M50 0 L55 10 A40 40 0 0 1 65 15 L75 10 L80 15 L75 25 A40 40 0 0 1 85 35 L95 35 L100 40 L95 50 L100 60 L95 65 L85 65 A40 40 0 0 1 75 75 L80 85 L75 90 L65 85 A40 40 0 0 1 55 90 L50 100 L40 95 L35 85 A40 40 0 0 1 25 80 L15 85 L10 80 L15 70 A40 40 0 0 1 5 60 L0 55 L0 45 L10 40 A40 40 0 0 1 15 30 L10 20 L15 15 L25 20 A40 40 0 0 1 35 10 L40 0 Z" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                            viewBox="0 0 24 24"
                            className="w-10 h-10 md:w-14 md:h-14 text-white fill-none stroke-current stroke-[3px]"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-8">
                <Button
                    className="w-full bg-[#C51D1D] hover:bg-[#A31818] text-white py-8 text-base font-bold uppercase tracking-widest rounded-none shadow-xl transform transition-all hover:scale-[1.02]"
                >
                    <Link href="/dashboard">Go to Dashboard</Link>
                </Button>

                <p className="text-center text-[#696969] text-sm font-medium pt-4">
                    Winner Regional Center Security
                </p>
            </div>
        </div>
    );
}
