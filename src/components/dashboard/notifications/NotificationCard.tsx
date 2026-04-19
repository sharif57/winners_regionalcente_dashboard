"use client";

import React from "react";
import { Trash2, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
    id: string;
    type: "all" | "specific";
    recipient: string;
    recipientsCount?: number;
    message: string;
    date: string;
    readCount: number;
    onDelete?: (id: string) => void;
}

export default function NotificationCard({
    id,
    type,
    recipient,
    recipientsCount,
    message,
    date,
    readCount,
    onDelete,
}: NotificationCardProps) {
    return (
        <div className="bg-[#E8E9EC52] flex flex-col md:flex-row gap-4 p-5 md:p-6 lg:p-8 rounded-sm hover:shadow-sm transition-all relative group">
            {/* Avatar Placeholder */}
            <div className="shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#E0E2E7] flex items-center justify-center rounded-sm text-[#4E4E4E]">
                    <User size={20} />
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 space-y-3">
                {/* Header: Badge and Subtitle */}
                <div className="flex items-center gap-2 flex-wrap">
                    <span
                        className={cn(
                            "px-2 py-0.5 text-[11px] font-bold  text-white",
                            type === "all" ? "bg-[#434D64]" : "bg-[#F65353]"
                        )}
                    >
                        {type === "all" ? "All Users" : recipient}
                    </span>
                    {type === "all" && recipientsCount && (
                        <span className="text-[#98A2B3] text-sm font-medium">
                            • {recipientsCount} recipients
                        </span>
                    )}
                </div>

                {/* Message Body */}
                <p className="text-[#1F1F1F] text-base md:text-[18px] leading-relaxed max-w-[900px]">
                    {message}
                </p>

                {/* Footer: Time and Read Status */}
                <div className="flex items-center gap-4 text-[#98A2B3]">
                    <div className="flex items-center gap-1.5">
                        <Clock size={16} />
                        <span className="text-[14px] font-medium">{date}</span>
                    </div>
                    {type === "all" && (
                        <div className="flex items-center gap-1.5">
                            <span className="text-[14px] font-medium">• {readCount} read</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Actions: Delete Button */}
            <button
                onClick={() => onDelete?.(id)}
                className="md:absolute md:right-8 md:top-8 text-[#98A2B3] hover:text-[#B21F1F] transition-colors p-2 rounded-full hover:bg-white/50"
            >
                <Trash2 size={20} />
            </button>
        </div>
    );
}
