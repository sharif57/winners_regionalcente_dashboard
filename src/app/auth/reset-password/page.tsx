"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/feature/authSlice";

function ResetPasswordPage() {
    // http://localhost:3000/auth/reset-password?reset_token=5PdWRVN0Dr73KPO93FRKJ0CB8-JIaxcxHWBclU9_Hys

    const searchParams = useSearchParams();
    const resetToken = searchParams.get("reset_token");
    console.log(resetToken)

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [resetPassword] = useResetPasswordMutation();

    const inputClasses = "w-full bg-white border-none px-6 py-4 text-sm focus:ring-1 focus:ring-[#F65353] transition-all outline-none pr-12";
    const labelClasses = "text-[11px] text-[#696969] font-bold uppercase tracking-wider pl-4";

    const handleResetPassword = async () => {
        if (!newPassword.trim() || !newPasswordConfirm.trim()) {
            toast.error("Please fill in both password fields.");
            return;
        }

        if (newPassword.length < 8) {
            toast.error("Password must be at least 8 characters long.");
            return;
        }

        if (newPassword !== newPasswordConfirm) {
            toast.error("Passwords do not match.");
            return;
        }



        setIsLoading(true);
        try {
            const response = await resetPassword({
                reset_token: resetToken,
                new_password: newPassword,
                new_password_confirm: newPasswordConfirm,
            }).unwrap();

            console.log("Reset Password Response:", response);
            toast.success(response?.message || "Password reset successfully!");
            router.push("/auth/login");
        } catch (error) {
            console.error("Reset Password Error:", error);
            const errorMessage = (error as { data?: { message?: string } })?.data?.message || "Failed to reset password. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

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
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            disabled={isLoading}
                            className={inputClasses}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
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
                            value={newPasswordConfirm}
                            onChange={(e) => setNewPasswordConfirm(e.target.value)}
                            disabled={isLoading}
                            className={inputClasses}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={isLoading}
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
                    onClick={handleResetPassword}
                    disabled={isLoading}
                    className="w-full bg-[#C51D1D] hover:bg-[#A31818] text-white py-8 text-base font-bold uppercase tracking-widest rounded-none shadow-xl transform transition-all hover:scale-[1.02]"
                >
                    {isLoading ? "Resetting..." : "Reset Password"}
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

export default function AuthResetPage() {
    return (
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <ResetPasswordPage />
        </Suspense>
    );
}