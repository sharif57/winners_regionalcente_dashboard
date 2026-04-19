"use client";

import React from "react";

const alerts = [
    { title: "New Project Available", message: "The Huston Logistics Phase II is now open for enrole" },
    { title: "New Project Available", message: "The Huston Logistics Phase II is now open for enrole" },
    { title: "New Project Available", message: "The Huston Logistics Phase II is now open for enrole" },
    { title: "New Project Available", message: "The Huston Logistics Phase II is now open for enrole" },
];

export default function AlertList() {
    return (
        <div className="bg-white p-6  animate-in fade-in slide-in-from-right-5 duration-1000">
            <h3 className="text-[#1F1F1F]  text-lg lg:text-[28px] font-semibold italic mb-8">
                Alerts
            </h3>

            <div className="space-y-4">
                {alerts.map((alert, index) => (
                    <div
                        key={index}
                        className="bg-[#F9FAFB] p-5 lg:p-6 flex items-start gap-4 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all rounded-sm"
                    >
                        <div className="w-4 h-4 rounded-full bg-[#038862] shrink-0 mt-1" />
                        <div className="space-y-1">
                            <h4 className="text-[#1F1F1F] text-[15px] font-bold">
                                {alert.title}
                            </h4>
                            <p className="text-[#696969] text-xs lg:text-sm leading-relaxed">
                                {alert.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
