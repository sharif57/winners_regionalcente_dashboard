"use client";

import React, { useState } from "react";
import NotificationList from "@/components/dashboard/notifications/NotificationList";
import ComposeNotification from "@/components/dashboard/notifications/ComposeNotification";

export default function NotificationsPage() {
    const [view, setView] = useState<"list" | "compose">("list");

    return (
        <div className="w-full bg-white rounded-sm min-h-[calc(100vh-140px)] border border-[#EAECF0] p-4">
            <div className=" p-6">
                {view === "list" ? (
                    <NotificationList onCreateNew={() => setView("compose")} />
                ) : (
                    <ComposeNotification onBack={() => setView("list")} />
                )}
            </div>
        </div>
    );
}
