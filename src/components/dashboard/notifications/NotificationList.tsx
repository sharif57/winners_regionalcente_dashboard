"use client";

import React from "react";
import NotificationCard from "./NotificationCard";
import { Button } from "@/components/ui/button";

interface NotificationListProps {
    onCreateNew: () => void;
}

const mockNotifications = [
    {
        id: "1",
        type: "all" as const,
        recipient: "All Users",
        recipientsCount: 6,
        message: "Dear users, the platform will undergo scheduled maintenance tonight from 2:00 AM to 3:00 AM. During this time, some features may be temporarily unavailable.",
        date: "2024-03-09 - 10:30 AM",
        readCount: 6,
    },
    {
        id: "2",
        type: "specific" as const,
        recipient: "Mr. John",
        message: "Dear users, the platform will undergo scheduled maintenance tonight from 2:00 AM to 3:00 AM. During this time, some features may be temporarily unavailable.",
        date: "2024-03-09 - 10:30 AM",
        readCount: 6,
    },
    {
        id: "3",
        type: "specific" as const,
        recipient: "Mr. John",
        message: "Dear users, the platform will undergo scheduled maintenance tonight from 2:00 AM to 3:00 AM. During this time, some features may be temporarily unavailable.",
        date: "2024-03-09 - 10:30 AM",
        readCount: 6,
    },
    {
        id: "4",
        type: "all" as const,
        recipient: "All Users",
        recipientsCount: 6,
        message: "Dear users, the platform will undergo scheduled maintenance tonight from 2:00 AM to 3:00 AM. During this time, some features may be temporarily unavailable.",
        date: "2024-03-09 - 10:30 AM",
        readCount: 6,
    },
    {
        id: "5",
        type: "all" as const,
        recipient: "All Users",
        recipientsCount: 6,
        message: "Dear users, the platform will undergo scheduled maintenance tonight from 2:00 AM to 3:00 AM. During this time, some features may be temporarily unavailable.",
        date: "2024-03-09 - 10:30 AM",
        readCount: 6,
    },
];

export default function NotificationList({ onCreateNew }: NotificationListProps) {
    return (
        <section className="space-y-10 animate-in fade-in duration-500">
            {/* List Header */}
            <div className="flex items-center justify-between px-4 lg:px-0">
                <div className="space-y-0.5">
                    <p className="text-[#667085] text-xs font-semibold uppercase tracking-widest">TOTAL</p>
                    <h1 className="text-[#1F1F1F] text-[34px] lg:text-[42px] font-bold leading-none">78</h1>
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
                {mockNotifications.map((notification) => (
                    <NotificationCard
                        key={notification.id}
                        {...notification}
                        onDelete={(id) => console.log("Delete notification", id)}
                    />
                ))}
            </div>

            {/* Pagination/Load More */}
            <div className="flex justify-center pt-4 pb-10">
                <Button
                    variant="outline"
                    className="border-[#EAECF0] text-[#1D2939] font-medium px-4 py-2 rounded-sm hover:bg-gray-50 bg-white transition-all shadow-sm h-auto text-base"
                >
                    Load More History
                </Button>
            </div>
        </section>
    );
}
