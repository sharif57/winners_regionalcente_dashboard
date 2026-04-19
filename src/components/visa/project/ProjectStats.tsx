"use client";

import React from "react";

const stats = [
    {
        label: "Total Project Value",
        value: "$220M",
        subValue: "",
    },
    {
        label: "Min. Investment",
        value: "$800K",
        subValue: "",
    },
    {
        label: "Expected ROI",
        value: "5-7%",
        subValue: "( PER ANNUAL )",
        subValueColor: "text-teal-600",
    },
    {
        label: "Capital Raised",
        value: "$140M",
        subValue: "( 65% FUNDED )",
        subValueColor: "text-teal-600",
    },
    {
        label: "Duration",
        value: "Jan 2026 - Dec 2028",
        subValue: "",
    },
];

export default function ProjectStats() {
    return (
        <section className="bg-[#F2F2F2] py-10 lg:py-16">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 lg:divide-x divide-gray-300">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex-1 w-full flex flex-col items-center md:items-start lg:pl-10 text-center md:text-left animate-in fade-in slide-in-from-bottom-5 duration-700"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <span className="text-[#696969] text-xs font-bold uppercase tracking-widest mb-3">
                                {stat.label}
                            </span>
                            <div className="flex flex-col xl:flex-row items-baseline gap-2">
                                <h2 className="text-[#1F1F1F] text-2xl lg:text-3xl font-bold italic">
                                    {stat.value}
                                </h2>
                                {stat.subValue && (
                                    <span
                                        className={`text-[10px] font-black uppercase tracking-tighter ${stat.subValueColor || "text-[#696969]"
                                            }`}
                                    >
                                        {stat.subValue}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
