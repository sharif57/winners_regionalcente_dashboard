"use client";

import { useBanner } from "@/hook/use-banner";

export default function ManagementBanner() {
    const {
        tagline,
        title,
        description,
        backgroundImage,
    } = useBanner("management");

    return (
        <section className="relative w-full min-h-[500px] lg:min-h-[800px] flex items-center overflow-hidden">
            {/* Background Image with Dark Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            >
                <div className="absolute inset-0 bg-black/60 lg:bg-gradient-to-r lg:from-black/80 lg:to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-6 lg:px-12 py-20">
                <div className="max-w-4xl space-y-5 animate-in fade-in slide-in-from-left-10 duration-1000">

                    {/* Tagline */}
                    <p className="text-primary font-bold text-sm lg:text-base tracking-[0.2em] transform transition-all hover:translate-x-1">
                        {tagline}
                    </p>

                    {/* Title */}
                    <h1 className="text-white text-2xl lg:text-[60px] font-extrabold italic  leading-relaxed lg:leading-snug max-w-2xl lg:max-w-6xl">
                        {title}
                    </h1>

                    {/* Main Description with Red Vertical Border */}
                    <div className="border-l-4 border-primary pl-6 lg:pl-6">
                        <h1 className="text-white text-[22px]  leading-relaxed lg:leading-snug font-medium max-w-2xl lg:max-w-6xl">
                            {description}
                        </h1>
                    </div>

                </div>
            </div>
        </section>
    );
}
