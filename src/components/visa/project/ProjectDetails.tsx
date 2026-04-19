"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectDetails() {
    return (
        <section className="bg-white  py-[32px]">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 items-start">
                    {/* Left Column: About Project */}
                    <div className="lg:col-span-8 space-y-8 animate-in bg-[#E8E9EC52] p-6   fade-in slide-in-from-left-5 duration-1000">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-6 bg-[#F65353]" />
                                <span className="text-primary text-base  font-normal uppercase tracking-widest">
                                    About Project
                                </span>
                            </div>
                            <h2 className="text-secondary text-3xl lg:text-4xl font-semibold italic">
                                Winner tower at Milk - Dallas, Texas
                            </h2>
                        </div>

                        <div className="space-y-6 text-[#696969] text-base lg:text-lg font-normal leading-relaxed max-w-4xl">
                            <p>
                                Winner Tower at MLK is a landmark mixed-use development located in the rapidly
                                growing MLK district of Dallas, Texas. Strategically positioned in a high-demand
                                urban corridor, the project is designed to combine modern residential living,
                                premium office spaces, and vibrant retail experiences within a single iconic high-rise.
                            </p>
                            <p>
                                The development aims to support the city&lsquo;s expanding population and business
                                ecosystem by offering state-of-the-art infrastructure, sustainable design, and
                                strong connectivity to key commercial and transportation hubs. With its
                                contemporary architecture and thoughtfully planned amenities, Winner Tower is
                            </p>
                        </div>

                        <div className="pt-6">
                            <Button
                                variant="outline"
                                className="w-full  border-[#BABABA] hover:border-[#1F1F1F] text-[#1F1F1F] px-10 py-7 text-sm font-bold uppercase tracking-widest rounded-none transition-all duration-300 group"
                            >
                                <span>See Agreement</span>
                                <Download className="ml-3 w-5 h-5 group-hover:translate-y-1 transition-transform" />
                            </Button>
                        </div>
                    </div>

                    {/* Right Column: Job Creation Progress */}
                    <div className="lg:col-span-4 flex flex-col items-center bg-[#E8E9EC52] px-5 py-[40px] ">

                        <h3 className="text-secondary text-2xl font-semibold italic mb-3 text-center">
                            Job Creation Progress
                        </h3>

                        <div className="relative w-48 h-48 md:w-56 md:h-56">

                            {/* SVG */}
                            <svg
                                viewBox="0 0 200 200"
                                className="w-full h-full transform -rotate-90"
                            >
                                {/* Background Circle */}
                                <circle
                                    strokeWidth="8"
                                    stroke="#E5E7EB"
                                    fill="transparent"
                                    r="80"
                                    cx="100"
                                    cy="100"
                                />

                                {/* Progress Circle */}
                                <circle
                                    strokeWidth="10"
                                    stroke="#038862"
                                    fill="transparent"
                                    r="80"
                                    cx="100"
                                    cy="100"
                                    strokeDasharray={2 * Math.PI * 80}
                                    strokeDashoffset={2 * Math.PI * 80 * 0.25}
                                    strokeLinecap="round"
                                />
                            </svg>

                            {/* Center Text */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl md:text-[40px] font-extrabold italic text-[#1F1F1F]">
                                    1200+
                                </span>
                            </div>

                        </div>

                        <div className="mt-10 text-center space-y-4 max-w-xs">
                            <p className="text-[#1F1F1F] text-xs lg:text-lg font-medium leading-relaxed">
                                Verified economic impacts jobs projected through USCIS compliant
                                methodologies.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
