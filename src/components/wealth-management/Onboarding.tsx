"use client";

import ReusableHeader from '@/hook/resuable-header'
import React, { useRef, useState, useEffect } from 'react'
import {
    SearchCode,
    Building2,
    ShieldCheck,
    FileSignature,
    LibraryBig,
    Wallet,
    UserPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingStep {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
}

const steps: OnboardingStep[] = [
    {
        id: "01",
        title: "Lead Generation & Qualification",
        description: "Initial screening and suitability assessment to ensure alignment with institutional mandates.",
        icon: SearchCode,
    },
    {
        id: "02",
        title: "Digital Intake",
        description: "Secure digital questionnaire for KYC/AML collecting essential ID and tax documentation.",
        icon: Building2,
    },
    {
        id: "03",
        title: "Risk Assessment",
        description: "Global AML, KYC, and sanctions checks utilizing advanced biometric verification.",
        icon: ShieldCheck,
    },
    {
        id: "04",
        title: "Legal Review",
        description: "Subscription Agreement and LPA execution via secure e-signature protocols.",
        icon: FileSignature,
    },
    {
        id: "05",
        title: "Account Setup",
        description: "Final compliance sign-off and internal account creation in relevant systems.",
        icon: LibraryBig,
    },
    {
        id: "06",
        title: "Capital Funding",
        description: "Managed escrow wire transfer and secure fund verification process.",
        icon: Wallet,
    },
    {
        id: "07",
        title: "Final Admission",
        description: "Successful onboarding completion and entry to the investor portal.",
        icon: UserPlus,
    },
];

export default function Onboarding() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const sLeft = scrollRef.current.scrollLeft;
        // Approximation for index based on card width + gap
        const index = Math.round(sLeft / 320);
        setActiveIndex(Math.min(index, steps.length - 1));
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section className="bg-white py-[32px]">
            <ReusableHeader
                badge=""
                title="International Investor Onboarding Process"
                description="Our streamlined 7-step architecture ensures rigorous compliance while maintaining institutional velocity."
                className="pb-12"
            />

            <div className="container mx-auto px-4">
                {/* Scrollable Container */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className={cn(
                        "flex gap-6 overflow-x-auto overflow-y-hidden pb-10 scrollbar-hide lg:px-12 touch-pan-y transition-all",
                        isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"
                    )}
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        touchAction: 'pan-y'
                    }}
                >
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="flex-shrink-0 w-[280px] md:w-[320px] bg-[#F9F9F9] p-8  snap-start transition-all hover:bg-gray-100 group"
                        >
                            <div className="mb-6 flex items-center justify-start">
                                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <step.icon className="w-6 h-6 text-[#1F1F1F]" />
                                </div>
                            </div>

                            <span className="text-[14px] font-bold text-[#1F1F1F] mb-4 block">
                                {step.id}
                            </span>

                            <h3 className="text-[20px] md:text-[20px] font-medium italic text-secondary mb-4 leading-tight">
                                {step.title}
                            </h3>

                            <p className="text-[#4C4C4C] font-normal text-sm md:text-base leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center items-center gap-2 mt-4">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-1 w-10 transition-all duration-300 rounded-full",
                                activeIndex >= i * 2.3 && activeIndex < (i + 1) * 2.3
                                    ? "bg-[#F65353]"
                                    : "bg-[#D9D9D9]"
                            )}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    )
}
