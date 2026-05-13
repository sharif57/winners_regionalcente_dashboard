"use client";

import React from "react";
import { Clock, Mail, MailOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
    id: string;
    title: string;
    message: string;
    date: string;
    isRead: boolean;
}

export default function NotificationCard({
    title,
    message,
    date,
    isRead,
}: NotificationCardProps) {
    return (
        <div className="group flex flex-col gap-4 rounded-sm bg-[#E8E9EC52] p-5 transition-all hover:shadow-sm md:p-6 lg:p-8">
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <span
                            className={cn(
                                "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-white",
                                isRead ? "bg-[#434D64]" : "bg-[#F65353]"
                            )}
                        >
                            {isRead ? <MailOpen size={12} /> : <Mail size={12} />}
                            {isRead ? "Read" : "Unread"}
                        </span>
                        <span className="text-sm font-semibold uppercase tracking-widest text-[#667085]">
                            {title}
                        </span>
                    </div>

                    <p className="max-w-225 text-base leading-relaxed text-[#1F1F1F] md:text-[18px]">
                        {message}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4 text-[#98A2B3]">
                <div className="flex items-center gap-1.5">
                    <Clock size={16} />
                    <span className="text-[14px] font-medium">{date}</span>
                </div>
            </div>
        </div>
    );
}
