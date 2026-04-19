"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

function VerifyEmailForm() {
    const [timer, setTimer] = useState(30);
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode");

    const nextStep = mode === "recover" ? "/auth/reset-password" : "/auth/success";

    useEffect(() => {
        if (timer > 0) {
            const id = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(id);
        }
    }, [timer]);

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-700">
            {/* Header Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#F65353]" />
                    <span className="text-[#F65353] text-[13px] font-bold uppercase tracking-widest">
                        Email Verification
                    </span>
                </div>
                <h1 className="text-[#1F1F1F] text-3xl md:text-4xl font-bold italic leading-tight">
                    Verify EMAIL
                </h1>
                <p className="text-[#696969] text-base lg:text-lg">
                    Enter the 6-digit code send to your email address
                </p>
            </div>

            {/* Verification Inputs Box */}
            <div className="bg-[#E8E9EC80] p-10 md:p-14 rounded-sm flex justify-center items-center">
                <div className="flex gap-4 md:gap-5">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <input
                            key={i}
                            type="text"
                            maxLength={1}
                            className="w-12 h-16 md:w-16 md:h-20 bg-white border-none text-center text-2xl font-bold text-[#1F1F1F] focus:ring-2 focus:ring-[#F65353] outline-none transition-all shadow-sm"
                        />
                    ))}
                </div>
            </div>

            {/* Action and Resend */}
            <div className="space-y-8">
                <Button
                    className="w-full bg-[#C51D1D] hover:bg-[#A31818] text-white py-8 text-base font-bold uppercase tracking-widest rounded-none shadow-xl transform transition-all hover:scale-[1.02]"
                >
                    <Link href={nextStep}>Verify Email</Link>
                </Button>

                <div className="text-center space-y-3">
                    <p className="text-[#696969] text-sm font-medium">
                        Resend code in <span className="text-[#1F1F1F] font-bold">{timer}s</span>
                    </p>
                    <button
                        className="text-[#F65353] font-bold uppercase hover:underline underline-offset-4 disabled:opacity-50 disabled:no-underline"
                        disabled={timer > 0}
                    >
                        Resend Code
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <VerifyEmailForm />
        </Suspense>
    );
}
