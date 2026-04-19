"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProjectCTA() {
    return (
        <section className="relative w-full py-24 lg:py-32 overflow-hidden bg-[#0A1224]">
            {/* Wave/Arc Background Pattern (SVG) */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 1440 320"
                    fill="none"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        fill="#F65353"
                    />
                </svg>
            </div>

            {/* Content Context */}
            <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center space-y-10">
                <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                    <h2 className="text-white text-3xl md:text-5xl lg:text-[56px] font-bold italic uppercase tracking-tight">
                        Ready To Take The Next Step?
                    </h2>
                    <p className="text-white/70 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                        A USCIS - approved gateway connecting global investor to premier Texas development project through the EB-5 program.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                    <Button
                        className="w-full sm:w-auto bg-[#C51D1D] hover:bg-[#A31818] text-white px-12 py-8 text-base font-bold uppercase tracking-widest rounded-none shadow-xl transform transition-all hover:scale-105"
                    >
                        <Link href="/investment">Start Investment</Link>
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white/10 px-12 py-8 text-base font-bold uppercase tracking-widest rounded-none backdrop-blur-sm transition-all"
                    >
                        <Link href="/evaluation">Request Evaluation</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
