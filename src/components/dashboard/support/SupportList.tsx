"use client";

import React, { useEffect, useState } from "react";
import SupportCard from "./SupportCard";
import { Button } from "@/components/ui/button";
import { useAllSupportMessagesQuery, useSubmitSupportMessageMutation } from "@/redux/feature/supportSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface SupportTicket {
    id: number;
    message: string;
    created_at: string;
    user_name: string;
    user_email: string;
    user_profile_image: string | null;
    replies: Array<{
        id: number;
        message: string;
        created_at: string;
    }>;
}

interface PaginationMeta {
    count: number;
    page: number;
    page_size: number;
    next: string | null;
    previous: string | null;
    total_pages: number;
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

const PAGE_SIZE = 10;

export default function SupportList() {
    const [page, setPage] = useState(1);
    const [allTickets, setAllTickets] = useState<SupportTicket[]>([]);
    const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);

    const { data: supportData, isLoading } = useAllSupportMessagesQuery({ page, page_size: PAGE_SIZE });
    const [submitSupportMessage, { isLoading: isSubmitting }] = useSubmitSupportMessageMutation();

    // Update allTickets when new page data arrives
    useEffect(() => {
        if (supportData?.data) {
            if (page === 1) {
                setAllTickets(supportData.data);
            } else {
                setAllTickets((prev) => [...prev, ...supportData.data]);
            }
            setPaginationMeta(supportData.meta);
        }
    }, [supportData, page]);

    const handleReply = async (ticketId: number, replyMessage: string) => {
        if (!replyMessage.trim()) {
            toast.error("Please enter a reply message");
            return;
        }

        try {
            await submitSupportMessage({ id: ticketId, message: replyMessage }).unwrap();
            toast.success("Reply sent successfully");
        } catch (error) {
            toast.error("Failed to send reply. Please try again.");
            console.error(error);
        }
    };

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    const canLoadMore = paginationMeta?.next !== null && !isLoading;

    if (isLoading && page === 1) {
        return (
            <section className="space-y-10 animate-in fade-in duration-500">
                <div className="flex items-center justify-center py-12">
                    <p className="text-[#667085]">Loading support tickets...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="space-y-10 animate-in fade-in duration-500 ">
            {/* List Header */}
            <div className="flex items-center justify-between px-4 lg:px-0">
                <div className="space-y-0.5">
                    <p className="text-[#667085] text-xs font-semibold uppercase tracking-widest">TOTAL</p>
                    <h1 className="text-[#1F1F1F] text-[34px] lg:text-[42px] font-bold leading-none">
                        {paginationMeta?.count || allTickets.length}
                    </h1>
                </div>
            </div>

            {/* List Body */}
            <div className="space-y-4 md:space-y-6">
                {allTickets.length > 0 ? (
                    allTickets.map((ticket) => (
                        <SupportCard
                            key={ticket.id}
                            id={String(ticket.id)}
                            userName={ticket.user_name}
                            userEmail={ticket.user_email}
                            userImage={ticket.user_profile_image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"}
                            message={ticket.message}
                            date={formatDate(ticket.created_at)}
                            replies={ticket.replies}
                            onReply={(message) => handleReply(ticket.id, message)}
                            isSubmitting={isSubmitting}
                        />
                    ))
                ) : (
                    <div className="text-center py-12">
                        <p className="text-[#667085]">No support tickets found</p>
                    </div>
                )}
            </div>

            {/* Pagination/Load More */}
            {canLoadMore && (
                <div className="flex justify-center pt-4">
                    <Button
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        variant="outline"
                        className="border-[#EAECF0] text-[#1D2939] font-medium px-4 py-2 rounded-sm hover:bg-gray-50 bg-white transition-all shadow-sm h-auto text-base disabled:opacity-50"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Loading...
                            </span>
                        ) : (
                            "Load More History"
                        )}
                    </Button>
                </div>
            )}
        </section>
    );
}
