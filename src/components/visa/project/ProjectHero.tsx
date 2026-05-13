"use client";

import React from "react";
import { MapPin } from "lucide-react";

type ProjectHeroProps = {
    title?: string;
    location?: string;
    bannerUrl?: string;
    statusLabel?: string;
    secondaryLabel?: string;
};

export default function ProjectHero({
    title = "Winners Tower at Milk - Dallas, Texas",
    location = "301 Congress Ave, Austin, TX",
    bannerUrl = "/image/background6.png",
    statusLabel = "TEA Qualified",
    secondaryLabel = "EB-5 Eligible",
}: ProjectHeroProps) {
    return (
        <section className="relative w-full min-h-125 lg:min-h-175 flex items-end overflow-hidden">
            {/* Background Image with Dark Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
                style={{ backgroundImage: `url('${bannerUrl}')` }}
            >
                <div className="absolute inset-0 bg-black/50 lg:bg-linear-to-t lg:from-black/80 lg:to-black/20" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-20">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                    <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-left-10 duration-1000">
                        {/* Badges */}
                        <div className="flex flex-wrap gap-4">
                            <span className="bg-[#F65353] text-white text-xs font-bold px-5 py-2 uppercase tracking-widest shadow-lg">
                                {statusLabel}
                            </span>
                            <span className="border border-white/40 text-white text-xs font-bold px-5 py-2 uppercase tracking-widest backdrop-blur-sm">
                                {secondaryLabel}
                            </span>
                            <span className="border border-white/40 text-white text-xs font-bold px-5 py-2 uppercase tracking-widest backdrop-blur-sm">
                                USCIS Compliant
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-white text-3xl md:text-5xl lg:text-[56px] font-bold italic uppercase leading-none transform transition-all duration-500 hover:translate-x-2">
                            {title}
                        </h1>
                    </div>

                    {/* Floating Location Card */}
                    <div className="bg-white p-6 shadow-2xl flex items-center gap-5 translate-y-4 lg:translate-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                        <div className="space-y-1">
                            <p className="text-[#696969] text-xs font-medium uppercase tracking-wider">
                                Strategic Location
                            </p>
                            <h3 className="text-[#1F1F1F] text-lg lg:text-xl font-bold italic">
                                {location}
                            </h3>
                        </div>
                        <div className="w-12 h-12 bg-[#F65353]/10 flex items-center justify-center rounded-full">
                            <MapPin className="text-[#F65353] w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
