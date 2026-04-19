"use client";

import React from "react";
import SupportCard from "./SupportCard";
import { Button } from "@/components/ui/button";

const mockSupportTickets = [
    {
        id: "1",
        userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        isAllUsers: true,
        message: "Dear users, the platform will undergo scheduled maintenance tonight from 2:00 AM to 3:00 AM. During this time, some features may be temporarily unavailable.",
        date: "2024-03-09 - 10:30 AM",
    },
    {
        id: "2",
        userImage: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=150&auto=format&fit=crop",
        isAllUsers: true,
        recipientsCount: 6,
        message: "Dear users, the platform will undergo scheduled maintenance tonight from 2:00 AM to 3:00 AM. During this time, some features may be temporarily unavailable.",
        date: "2024-03-09 - 10:30 AM",
    },
    {
        id: "3",
        userImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
        isAllUsers: true,
        message: "Dear users, the platform will undergo scheduled maintenance tonight from 2:00 AM to 3:00 AM. During this time, some features may be temporarily unavailable.",
        date: "2024-03-09 - 10:30 AM",
    },
    {
        id: "4",
        userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
        isAllUsers: true,
        message: "Dear users, the platform will undergo scheduled maintenance tonight from 2:00 AM to 3:00 AM. During this time, some features may be temporarily unavailable.",
        date: "2024-03-09 - 10:30 AM",
    },
    {
        id: "5",
        userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
        isAllUsers: true,
        message: "Dear users, the platform will undergo scheduled maintenance tonight from 2:00 AM to 3:00 AM. During this time, some features may be temporarily unavailable.",
        date: "2024-03-09 - 10:30 AM",
    },
];

export default function SupportList() {
    return (
        <section className="space-y-10 animate-in fade-in duration-500 ">
            {/* List Header */}
            <div className="flex items-center justify-between px-4 lg:px-0">
                <div className="space-y-0.5">
                    <p className="text-[#667085] text-xs font-semibold uppercase tracking-widest">TOTAL</p>
                    <h1 className="text-[#1F1F1F] text-[34px] lg:text-[42px] font-bold leading-none">78</h1>
                </div>
            </div>

            {/* List Body */}
            <div className="space-y-4 md:space-y-6">
                {mockSupportTickets.map((ticket) => (
                    <SupportCard
                        key={ticket.id}
                        {...ticket}
                        onDelete={(id) => console.log("Delete ticket", id)}
                    />
                ))}
            </div>

            {/* Pagination/Load More */}
            <div className="flex justify-center pt-4">
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
