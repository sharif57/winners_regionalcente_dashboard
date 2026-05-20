"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/redux/feature/authSlice";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [forgotPassword] = useForgotPasswordMutation();

    const handleForgotPassword = async () => {
        if (!email || !email.trim()) {
            toast.error("Please enter your email address");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        setIsLoading(true);
        try {
            const response = await forgotPassword({ email }).unwrap();
            console.log("Forgot Password Response:", response);
            toast.success(response?.message || "OTP sent to your email successfully!");
            router.push("/auth/verify-email?email=" + encodeURIComponent(email));
        } catch (error) {
            console.error("Forgot Password Error:", error);
            const errorMessage = (error as { data?: { message?: string } })?.data?.message || "Failed to send OTP. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleForgotPassword()}
                        disabled={isLoading}
                        className="w-full bg-white border-none px-6 py-4 text-sm focus:ring-1 focus:ring-[#F65353] transition-all outline-none disabled:opacity-50"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-6">
                <Button
                    onClick={handleForgotPassword}
                    disabled={isLoading}
                    className="w-full bg-[#C51D1D] hover:bg-[#A31818] disabled:bg-[#C51D1D]/50 disabled:cursor-not-allowed text-white py-8 text-base font-bold uppercase tracking-widest rounded-none shadow-xl transform transition-all hover:scale-[1.02] disabled:hover:scale-100"
                >
                    {isLoading ? "Sending..." : "Send Code"}
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
