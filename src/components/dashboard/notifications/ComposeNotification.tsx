"use client";

import React, { useState } from "react";
import { Users, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ComposeNotificationProps {
    onBack?: () => void;
}

export default function ComposeNotification({ onBack }: ComposeNotificationProps) {
    const [target, setTarget] = useState<"all" | "specific">("all");
    const [message, setMessage] = useState("");

    return (
        <section className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500 pb-20 px-4 lg:px-0">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-[#1F1F1F] text-2xl lg:text-[32px] font-bold italic">Compose Notification</h1>
                    <p className="text-[#667085] text-sm lg:text-[15px] font-medium leading-relaxed">
                        Send a notification to your all user or specific user
                    </p>
                </div>

                <Button 
                    className="bg-[#B21F1F] hover:bg-[#8B1818] text-white font-bold px-10 py-6 rounded-none tracking-widest h-auto text-sm uppercase transition-all shadow-md active:scale-[0.98]"
                >
                    SEND NOTIFICATION
                </Button>
            </div>

            {/* Form Body */}
            <div className="space-y-10">
                {/* 1. Target Selection */}
                <div className="space-y-6">
                    <h3 className="text-[#1F1F1F] text-base lg:text-lg font-bold">Select Target</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                        {/* Option: All Users */}
                        <div 
                            onClick={() => setTarget("all")}
                            className={cn(
                                "flex items-center gap-4 p-6 rounded-lg border-2 cursor-pointer transition-all duration-300",
                                target === "all" 
                                    ? "bg-[#FFF5F5] border-[#EA4335] shadow-sm" 
                                    : "bg-white border-[#EAECF0] hover:border-[#EA4335]/30"
                            )}
                        >
                            <div className={cn(
                                "w-12 h-12 flex items-center justify-center rounded-sm transition-colors",
                                target === "all" ? "bg-[#B21F1F] text-white" : "bg-[#F9FAFB] text-[#667085]"
                            )}>
                                <Users size={24} />
                            </div>
                            <div className="space-y-0.5 text-left">
                                <h4 className={cn(
                                    "text-lg font-bold leading-tight",
                                    target === "all" ? "text-primary dark:text-[#EA4335]" : "text-[#1F1F1F]"
                                )}>All Users</h4>
                                <p className="text-[#667085] text-sm font-medium">Send to all users</p>
                            </div>
                        </div>

                        {/* Option: Specific User */}
                        <div 
                            onClick={() => setTarget("specific")}
                            className={cn(
                                "flex items-center gap-4 p-6 rounded-lg border-2 cursor-pointer transition-all duration-300",
                                target === "specific" 
                                    ? "bg-[#FFF5F5] border-[#EA4335] shadow-sm" 
                                    : "bg-white border-[#EAECF0] hover:border-[#EA4335]/30"
                            )}
                        >
                            <div className={cn(
                                "w-12 h-12 flex items-center justify-center rounded-sm transition-colors",
                                target === "specific" ? "bg-[#B21F1F] text-white" : "bg-[#F9FAFB] text-[#667085]"
                            )}>
                                <User size={24} />
                            </div>
                            <div className="space-y-0.5 text-left">
                                <h4 className={cn(
                                    "text-lg font-bold leading-tight",
                                    target === "specific" ? "text-primary dark:text-[#EA4335]" : "text-[#1F1F1F]"
                                )}>Specific User</h4>
                                <p className="text-[#667085] text-sm font-medium">Send to a specific user</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Specific User Dropdown (Conditional) */}
                {target === "specific" && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <h3 className="text-[#1F1F1F] text-base lg:text-lg font-bold">Select Target</h3>
                        <div className="relative group">
                            <select 
                                className="w-full h-14 pl-4 pr-12 bg-white border border-[#E4E7EC] rounded-sm appearance-none focus:outline-none focus:border-[#EA4335] text-[#1F1F1F] font-medium cursor-pointer"
                                defaultValue=""
                            >
                                <option value="" disabled>Chose a specific user</option>
                                <option value="1">John Roy</option>
                                <option value="2">Alice Smith</option>
                                <option value="3">Bob Johnson</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3] pointer-events-none group-focus-within:text-[#EA4335] transition-colors" size={20} />
                        </div>
                    </div>
                )}

                {/* 3. Message Area */}
                <div className="space-y-4">
                    <h3 className="text-[#1F1F1F] text-base lg:text-lg font-bold">Message</h3>
                    <div className="relative">
                        <textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your notification message here..."
                            className="w-full h-48 p-6 bg-[#F2F4F7] border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#EA4335] focus:bg-white text-[#1F1F1F] font-medium leading-relaxed resize-none transition-all"
                        />
                        <div className="absolute right-0 -bottom-8">
                             <span className="text-[#98A2B3] text-[13px] font-medium tracking-tight">
                                {message.length} characters
                             </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to history link */}
            <div className="pt-10">
                <button 
                    onClick={onBack}
                    className="text-[#667085] hover:text-[#B21F1F] font-semibold text-base transition-colors flex items-center gap-2"
                >
                    &larr; Back to History
                </button>
            </div>
        </section>
    );
}
