"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("admin@example.com");
    const [password, setPassword] = useState("password123");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const { login, isAuthenticated } = useAuth();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/dashboard");
        }
    }, [isAuthenticated, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }

        setIsSubmitting(true);
        try {
            const success = await login(email, password);
            if (success) {
                router.push("/dashboard");
            } else {
                setError("Invalid email or password. Use demo credentials.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

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
            <form onSubmit={handleLogin} className="bg-[#E8E9EC80] p-8 md:p-10 space-y-6">
                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[11px] text-[#696969] font-bold uppercase tracking-wider pl-4">
                            Enter email address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            className="w-full bg-white border-none px-6 py-4 text-sm focus:ring-1 focus:ring-[#F65353] transition-all outline-none"
                            required
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Your password"
                                className="w-full bg-white border-none px-6 py-4 text-sm focus:ring-1 focus:ring-[#F65353] transition-all outline-none pr-12"
                                required
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

                <div className="pt-2">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#C51D1D] hover:bg-[#A31818] text-white py-8 text-base font-bold uppercase tracking-widest rounded-none shadow-xl transform transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Signing In...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </div>
            </form>

            <div className="space-y-6">
                <p className="text-center text-[#696969] text-sm font-medium">
                    Don&lsquo;t have an account?{" "}
                    <Link
                        href="/auth/register"
                        className="text-[#F65353] font-bold uppercase hover:underline transition-all"
                    >
                        Sign Up
                    </Link>
                </p>

                {/* Demo Credentials Hint */}
                <div className="bg-blue-50 border border-blue-100 p-4 text-center">
                    <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-1">Demo Credentials</p>
                    <p className="text-xs text-gray-600 italic">Email: admin@example.com | Password: password123</p>
                </div>
            </div>
        </div>
    );
}
