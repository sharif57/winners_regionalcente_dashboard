import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProcessCTA() {
    return (
        <section className="relative w-full py-24 lg:py-32 overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
                style={{ backgroundImage: `url('/image/background4.png')` }}
            >
                <div className="absolute inset-0 bg-[#000A24]/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Title */}
                    <h2 className="text-white text-3xl md:text-5xl lg:text-[56px] font-bold italic leading-tight">
                        Start Your EB-5 Journey Today
                    </h2>

                    {/* Subtitle */}
                    <p className="text-[#E9E9E9] text-base md:text-lg lg:text-[18px] font-medium max-w-3xl mx-auto leading-relaxed">
                        Partner with an institutional regional center that prioritizes transparency,
                        compliance, and your path to residency.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                        <Button
                            className="w-full sm:w-auto bg-[#C51D1D] hover:bg-[#A31818] text-white px-10 py-7 text-sm font-bold uppercase tracking-wider rounded-none transition-all duration-300 transform hover:scale-105"
                        >
                            <Link href="/projects">EXPLORE PROJECT</Link>
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white/10 px-10 py-7 text-sm font-bold uppercase hover:text-white tracking-wider rounded-none transition-all duration-300 backdrop-blur-sm"
                        >
                            <Link href="#">CONTACT ADVISOR</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
