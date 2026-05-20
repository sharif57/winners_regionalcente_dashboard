"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForgotPasswordMutation, useVerifyEmailMutation } from "@/redux/feature/authSlice";

function VerifyEmailForm() {
    const [timer, setTimer] = useState(30);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const searchParams = useSearchParams();
    const router = useRouter();
    const mode = searchParams.get("mode");
    const emailParam = searchParams.get("email");

    const [verifyEmail] = useVerifyEmailMutation();
    const [forgotPassword] = useForgotPasswordMutation();

    // const nextStep = mode === "recover" ? "/auth/reset-password" : "/auth/success";
    const nextStep = mode === "recover" ? "/auth/reset-password" : "/auth/success";

    useEffect(() => {
        if (timer > 0) {
            const id = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(id);
        }
    }, [timer]);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
        if (!pasted) return;
        e.preventDefault();

        const newOtp = [...otp];
        for (let i = 0; i < pasted.length && index + i < 6; i++) {
            newOtp[index + i] = pasted[i];
        }
        setOtp(newOtp);

        const nextPos = Math.min(6, index + pasted.length);
        if (nextPos < 6) {
            inputRefs.current[nextPos]?.focus();
        } else {
            inputRefs.current[5]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyEmail = async () => {
        if (!emailParam) {
            toast.error("Email not found. Please try again.");
            return;
        }

        const otpCode = otp.join("");
        if (otpCode.length !== 6) {
            toast.error("Please enter a 6-digit OTP");
            return;
        }

        setIsLoading(true);
        try {
            const response = await verifyEmail({
                email: emailParam,
                otp: otpCode,
            }).unwrap();
            console.log("Verify Email Response:", response);
            const resetToken = response?.data?.reset_token;

            // if (resetToken) {
            //     localStorage.setItem("reset_token", resetToken);
            // }

            toast.success(response?.message || "Email verified successfully!");
            router.push(`/auth/reset-password?reset_token=${resetToken}`);
        } catch (error) {
            console.error("Verify Email Error:", error);
            const errorMessage = (error as { data?: { message?: string } })?.data?.message || "Failed to verify OTP. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (!emailParam) {
            toast.error("Email not found. Please try again.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await forgotPassword({ email: emailParam }).unwrap();
            console.log("Resend OTP Response:", response);
            toast.success(response?.message || "OTP resent successfully!");
            setTimer(30);
            setOtp(["", "", "", "", "", ""]);
        } catch (error) {
            console.error("Resend OTP Error:", error);
            const errorMessage = (error as { data?: { message?: string } })?.data?.message || "Failed to resend OTP. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

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
                            ref={(el) => {
                                inputRefs.current[i] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={otp[i]}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            onPaste={(e) => handlePaste(i, e)}
                            disabled={isLoading}
                            className="w-12 h-16 md:w-16 md:h-20 bg-white border-none text-center text-2xl font-bold text-[#1F1F1F] focus:ring-2 focus:ring-[#F65353] outline-none transition-all shadow-sm disabled:opacity-50"
                        />
                    ))}
                </div>
            </div>

            {/* Action and Resend */}
            <div className="space-y-8">
                <Button
                    onClick={handleVerifyEmail}
                    disabled={isLoading || otp.join("").length !== 6}
                    className="w-full bg-[#C51D1D] hover:bg-[#A31818] disabled:bg-[#C51D1D]/50 disabled:cursor-not-allowed text-white py-8 text-base font-bold uppercase tracking-widest rounded-none shadow-xl transform transition-all hover:scale-[1.02] disabled:hover:scale-100"
                >
                    {isLoading ? "Verifying..." : "Verify Email"}
                </Button>

                <div className="text-center space-y-3">
                    <p className="text-[#696969] text-sm font-medium">
                        Resend code in <span className="text-[#1F1F1F] font-bold">{timer}s</span>
                    </p>
                    <button
                        onClick={handleResendCode}
                        type="button"
                        className="text-[#F65353] font-bold uppercase hover:underline underline-offset-4 disabled:opacity-50 disabled:no-underline transition-all"
                        disabled={timer > 0 || isLoading}
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
