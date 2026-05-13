/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
// import NotificationCard from "./NotificationCard";
import { Button } from "@/components/ui/button";
import { useNotificationListQuery } from "@/redux/feature/notificationSlice";
import NotificationCard from "./NotificationCard";

interface NotificationListProps {
    onCreateNew: () => void;
}

type NotificationApiItem = {
    id: number;
    title: string;
    message: string;
    created_at: string;
    is_read: boolean;
};

const PAGE_SIZE = 10;

const formatDate = (value: string) =>
    new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
    }).format(new Date(value));

export default function NotificationList({ onCreateNew }: NotificationListProps) {
    const [page, setPage] = useState(1);
    const [notifications, setNotifications] = useState<NotificationApiItem[]>([]);
    const { data, isLoading, isFetching } = useNotificationListQuery({ page, page_size: PAGE_SIZE });

    useEffect(() => {
        const results = data?.data?.results ?? [];

        if (page === 1) {
            setNotifications(results);
            return;
        }

        if (results.length > 0) {
            setNotifications((current) => {
                const existingIds = new Set(current.map((item) => item.id));
                const merged = [...current];

                results.forEach((item : any) => {
                    if (!existingIds.has(item.id)) {
                        merged.push(item);
                    }
                });

                return merged;
            });
        }
    }, [data, page]);

    const totalCount = data?.data?.count ?? 0;
    const hasMore = Boolean(data?.data?.next);

    return (
        <section className="space-y-10 animate-in fade-in duration-500">
            {/* List Header */}
            <div className="flex items-center justify-between px-4 lg:px-0">
                <div className="space-y-0.5">
                    <p className="text-[#667085] text-xs font-semibold uppercase tracking-widest">TOTAL</p>
                    <h1 className="text-[#1F1F1F] text-[34px] lg:text-[42px] font-bold leading-none">{totalCount}</h1>
                </div>

                <Button
                    onClick={onCreateNew}
                    className="bg-[#B21F1F] hover:bg-[#8B1818] text-white font-bold px-4 lg:px-8 py-4 rounded-none tracking-widest h-auto text-xs lg:text-sm uppercase transition-all"
                >
                    CREATE NEW NOTIFICATION
                </Button>
            </div>

            {/* List Body */}
            <div className="space-y-4 md:space-y-6">
                {isLoading ? (
                    <div className="rounded-sm border border-[#EAECF0] bg-white p-6 text-center text-[#667085]">
                        Loading notifications...
                    </div>
                ) : notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <NotificationCard
                            key={notification.id}
                            id={String(notification.id)}
                            title={notification.title}
                            message={notification.message}
                            date={formatDate(notification.created_at)}
                            isRead={notification.is_read}
                        />
                    ))
                ) : (
                    <div className="rounded-sm border border-[#EAECF0] bg-white p-6 text-center text-[#667085]">
                        No notifications found.
                    </div>
                )}
            </div>

            {/* Pagination/Load More */}
            <div className="flex justify-center pt-4 pb-10">
                <Button
                    onClick={() => setPage((current) => current + 1)}
                    disabled={!hasMore || isFetching}
                    variant="outline"
                    className="border-[#EAECF0] text-[#1D2939] font-medium px-4 py-2 rounded-sm hover:bg-gray-50 bg-white transition-all shadow-sm h-auto text-base"
                >
                    {isFetching ? "Loading..." : hasMore ? "Load More History" : "No More History"}
                </Button>
            </div>
        </section>
    );
}
