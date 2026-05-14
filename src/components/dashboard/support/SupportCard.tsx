"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Trash2, Reply, X, Send, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Reply {
    id: number;
    message: string;
    created_at: string;
}

interface SupportCardProps {
    id: string;
    userName: string;
    userEmail: string;
    userImage: string;
    message: string;
    date: string;
    replies?: Reply[];
    onReply?: (message: string) => void;
    isSubmitting?: boolean;
    onDelete?: (id: string) => void;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function SupportCard({
    id,
    userName,
    userEmail,
    userImage,
    message,
    date,
    replies = [],
    onReply,
    isSubmitting = false,
    onDelete,
}: SupportCardProps) {
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("");

    const handleSendReply = async () => {
        if (!replyText.trim()) return;

        await onReply?.(replyText);
        setReplyText("");
        setIsReplying(false);
    };

    return (
        <div className="bg-[#E8E9EC52] p-5 lg:p-8 rounded-sm transition-all animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 relative">
                {/* User Avatar */}
                <div className="shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                        <Image
                            src={userImage}
                            alt={userName}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 space-y-3">
                    {/* User Info */}
                    <div className="space-y-1">
                        <h4 className="text-[#1F1F1F] font-semibold text-[15px] lg:text-[16px]">{userName}</h4>
                        <p className="text-[#667085] text-[13px]">{userEmail}</p>
                    </div>

                    {/* Message */}
                    <p className="text-[#1F1F1F] text-[15px] lg:text-[18px] leading-relaxed max-w-[1000px]">
                        {message}
                    </p>

                    {/* Footer Date */}
                    <div className="flex items-center gap-2 text-[#98A2B3]">
                        <Clock size={16} />
                        <span className="text-[14px] font-medium">{date}</span>
                    </div>

                    {/* Existing Replies */}
                    {replies.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-[#EAECF0] space-y-4">
                            <p className="text-[#667085] text-sm font-semibold uppercase tracking-wider">Replies ({replies.length})</p>
                            {replies.map((reply) => (
                                <div key={reply.id} className="bg-white rounded-sm p-4 space-y-2">
                                    <p className="text-[#1F1F1F] text-[14px] leading-relaxed">{reply.message}</p>
                                    <div className="flex items-center gap-2 text-[#98A2B3]">
                                        <Clock size={14} />
                                        <span className="text-[12px]">{formatDate(reply.created_at)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Reply Section (Conditional) */}
                    {isReplying && (
                        <div className="mt-6 pt-4 border-t border-[#EAECF0] animate-in slide-in-from-top-2 duration-300">
                            <div className="flex items-center justify-between mb-3">
                                <label className="block text-[#1F1F1F] text-sm font-bold">Write Reply</label>
                            </div>
                            <div className="relative">
                                <textarea
                                    className="w-full bg-white border border-[#EAECF0] rounded-sm p-4 lg:p-6 text-[15px] lg:text-[16px] placeholder:text-[#696969] focus:outline-none focus:border-[#B21F1F] min-h-[120px] transition-all disabled:opacity-50"
                                    placeholder="Write your reply here..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    disabled={isSubmitting}
                                />
                                <button
                                    className="absolute right-4 bottom-4 p-2 text-[#98A2B3] hover:text-[#B21F1F] transition-colors disabled:opacity-50"
                                    onClick={handleSendReply}
                                    disabled={isSubmitting || !replyText.trim()}
                                >
                                    {isSubmitting ? (
                                        <Loader2 size={24} className="animate-spin" />
                                    ) : (
                                        <Send size={24} className="rotate-0 transition-transform hover:translate-x-1" />
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex md:flex-col items-center gap-4 md:absolute md:right-0 md:top-0">
                    {/* <button
                        onClick={() => onDelete?.(id)}
                        className="text-[#98A2B3] hover:text-[#B21F1F] transition-colors p-1"
                    >
                        <Trash2 size={24} strokeWidth={1.5} />
                    </button> */}
                    <button
                        onClick={() => setIsReplying(!isReplying)}
                        className={cn(
                            "transition-all duration-300 p-1 flex items-center justify-center",
                            isReplying ? "text-[#1F1F1F]" : "text-[#98A2B3] hover:text-[#1F1F1F]"
                        )}
                        disabled={isSubmitting}
                    >
                        {isReplying ? <X size={24} strokeWidth={2} /> : <Reply size={24} strokeWidth={1.5} className="scale-x-[-1]" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
