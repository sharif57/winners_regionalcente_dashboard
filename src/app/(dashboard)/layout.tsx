"use client";

import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex bg-[#E8E9EC] min-h-screen">
            {/* Sidebar */}
            <Sidebar 
                isOpen={sidebarOpen} 
                onClose={() => setSidebarOpen(false)} 
            />

            {/* Main Content Area */}
            <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
                <DashboardHeader 
                    onMenuClick={() => setSidebarOpen(true)} 
                />
                <main className="flex-1 p-4 md:p-6 lg:p-[28px] overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
