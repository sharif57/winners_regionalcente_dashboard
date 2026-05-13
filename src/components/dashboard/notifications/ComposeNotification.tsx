"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Loader2, Search, Users, User } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSendNotificationMutation } from "@/redux/feature/notificationSlice";
import { useAllUsersQuery } from "@/redux/feature/userSlice";

interface ComposeNotificationProps {
    onBack?: () => void;
}

type TargetType = "all" | "specific";

type Recipient = {
    id: number;
    name: string;
    email: string;
    country: string;
    is_active: boolean;
    created_at: string;
};

const PAGE_SIZE = 10;

const extractErrorMessage = (error: unknown) => {
    if (typeof error === "object" && error !== null && "data" in error) {
        const data = (error as { data?: { message?: string } }).data;
        if (data?.message) {
            return data.message;
        }
    }

    return "Failed to send notification";
};

export default function ComposeNotification({ onBack }: ComposeNotificationProps) {
    const [target, setTarget] = useState<TargetType>("all");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [page, setPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([]);
    const [, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [sendNotification, { isLoading }] = useSendNotificationMutation();

    const { data, isFetching } = useAllUsersQuery({ page, page_size: PAGE_SIZE });

    const users = useMemo<Recipient[]>(() => {
        return data?.data ?? [];
    }, [data]);

    const hasMore = Boolean(data?.meta?.next) || (data?.meta ? data.meta.page < data.meta.total_pages : false);

    const filteredUsers = useMemo(() => {
        if (!searchQuery.trim()) {
            return users;
        }

        const query = searchQuery.toLowerCase();
        return users.filter((user) => {
            return (
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.country.toLowerCase().includes(query)
            );
        });
    }, [searchQuery, users]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const container = containerRef.current;
        if (!container) {
            return;
        }

        const handleScroll = () => {
            const nearBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 24;
            if (nearBottom && hasMore && !isFetching) {
                setPage((current) => current + 1);
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [hasMore, isFetching, isOpen]);

    const toggleRecipient = (user: Recipient) => {
        setSelectedRecipients((current) => {
            const exists = current.some((item) => item.id === user.id);
            if (exists) {
                return current.filter((item) => item.id !== user.id);
            }

            return [...current, user];
        });
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            toast.error("Please enter a notification title");
            return;
        }

        if (!message.trim()) {
            toast.error("Please enter a notification message");
            return;
        }

        if (target === "specific" && selectedRecipients.length === 0) {
            toast.error("Please select at least one recipient");
            return;
        }

        const payload = {
            title,
            message,
            target: target === "all" ? "all" : "specific",
            recipient_ids: target === "specific" ? selectedRecipients.map((recipient) => recipient.id) : [],
        };

        try {
            await sendNotification(payload).unwrap();
            toast.success("Notification sent successfully");
            setTitle("");
            setMessage("");
            setTarget("all");
            setSelectedRecipients([]);
            setSearchQuery("");
            setPage(1);
            setHasMore(true);
            setIsOpen(false);
            onBack?.();
        } catch (error) {
            toast.error(extractErrorMessage(error));
        }
    };

    return (
        <section className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500 pb-20 px-4 lg:px-0">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-[#1F1F1F] text-2xl lg:text-[32px] font-bold italic">Compose Notification</h1>
                    <p className="text-[#667085] text-sm lg:text-[15px] font-medium leading-relaxed">
                        Send a notification to all users or selected recipients
                    </p>
                </div>

                <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-[#B21F1F] hover:bg-[#8B1818] text-white font-bold px-10 py-6 rounded-none tracking-widest h-auto text-sm uppercase transition-all shadow-md active:scale-[0.98]"
                >
                    {isLoading ? (
                        <span className="inline-flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin" />
                            Sending...
                        </span>
                    ) : (
                        "SEND NOTIFICATION"
                    )}
                </Button>
            </div>

            {/* Form Body */}
            <div className="space-y-10">
                {/* 0. Title */}
                <div className="space-y-4">
                    <h3 className="text-[#1F1F1F] text-base lg:text-lg font-bold">Title</h3>
                    <input
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Enter notification title"
                        className="w-full h-14 rounded-sm border border-[#E4E7EC] bg-white px-4 text-[#1F1F1F] font-medium placeholder:text-[#98A2B3] focus:border-[#EA4335] focus:outline-none"
                    />
                </div>

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
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="text-[#1F1F1F] text-base lg:text-lg font-bold">Recipients</h3>
                            <button
                                type="button"
                                onClick={() => setIsOpen((current) => !current)}
                                className="inline-flex items-center gap-2 rounded-sm border border-[#EAECF0] bg-white px-4 py-2 text-sm font-semibold text-[#1F1F1F] transition-all hover:bg-[#F9FAFB]"
                            >
                                Select users
                                <ChevronDown size={16} />
                            </button>
                        </div>

                        {selectedRecipients.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {selectedRecipients.map((recipient) => (
                                    <button
                                        key={recipient.id}
                                        type="button"
                                        onClick={() => toggleRecipient(recipient)}
                                        className="inline-flex items-center gap-2 rounded-full bg-[#FFF5F5] px-3 py-1.5 text-sm font-medium text-[#B21F1F]"
                                    >
                                        {recipient.name}
                                        <span aria-hidden="true">×</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {isOpen && (
                            <div className="rounded-lg border border-[#EAECF0] bg-white shadow-sm">
                                <div className="border-b border-[#EAECF0] p-4">
                                    <div className="relative">
                                        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]" size={18} />
                                        <input
                                            value={searchQuery}
                                            onChange={(event) => setSearchQuery(event.target.value)}
                                            placeholder="Search user by name, email, or country"
                                            className="h-12 w-full rounded-sm border border-[#E4E7EC] bg-white pl-11 pr-4 text-[#1F1F1F] placeholder:text-[#98A2B3] focus:border-[#EA4335] focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div ref={containerRef} className="max-h-80 overflow-y-auto p-2">
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user) => {
                                            const isSelected = selectedRecipients.some((item) => item.id === user.id);

                                            return (
                                                <button
                                                    key={user.id}
                                                    type="button"
                                                    onClick={() => toggleRecipient(user)}
                                                    className={cn(
                                                        "flex w-full items-center justify-between rounded-sm px-4 py-3 text-left transition-all",
                                                        isSelected ? "bg-[#FFF5F5]" : "hover:bg-[#F9FAFB]"
                                                    )}
                                                >
                                                    <div className="space-y-0.5">
                                                        <p className="font-semibold text-[#1F1F1F]">{user.name}</p>
                                                        <p className="text-sm text-[#667085]">{user.email} • {user.country || "No country"}</p>
                                                    </div>
                                                    <div className={cn(
                                                        "h-5 w-5 rounded-full border flex items-center justify-center transition-colors",
                                                        isSelected ? "border-[#B21F1F] bg-[#B21F1F] text-white" : "border-[#D0D5DD]"
                                                    )}>
                                                        {isSelected ? "✓" : ""}
                                                    </div>
                                                </button>
                                            );
                                        })
                                    ) : isFetching ? (
                                        <div className="flex items-center justify-center gap-2 py-8 text-[#667085]">
                                            <Loader2 size={16} className="animate-spin" /> Loading users...
                                        </div>
                                    ) : (
                                        <div className="py-8 text-center text-[#667085]">No users found.</div>
                                    )}

                                    {hasMore && (
                                        <button
                                            type="button"
                                            onClick={() => setPage((current) => current + 1)}
                                            disabled={isFetching}
                                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-sm border border-dashed border-[#EAECF0] py-3 text-sm font-semibold text-[#667085] transition-all hover:bg-[#F9FAFB] disabled:opacity-50"
                                        >
                                            {isFetching ? <Loader2 size={16} className="animate-spin" /> : null}
                                            {isFetching ? "Loading more" : "Load more users"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="text-sm text-[#667085]">
                            Selected recipients: <span className="font-semibold text-[#1F1F1F]">{selectedRecipients.length}</span>
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
