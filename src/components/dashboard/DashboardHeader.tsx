"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

export default function DashboardHeader({ onMenuClick }: { onMenuClick?: () => void }) {
    const pathname = usePathname();
    const hideHeader = /^\/dashboard\/user-management\/[^/]+$/.test(pathname);

    if (hideHeader) {
        return null;
    }

    return (
        <header className="flex items-center justify-between p-4 md:p-6 lg:p-8 bg-white border-b border-gray-100">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-[#696969] hover:bg-gray-100 rounded-md transition-all"
                >
                    <Menu size={24} />
                </button>
                <div className="space-y-0.5 md:space-y-1">
                    <h1 className="text-[#1F1F1F] text-xl md:text-2xl lg:text-[28px] font-bold italic">
                        Wellcome Back, johnson Roy
                    </h1>
                    <p className="text-[#696969] text-[10px] md:text-xs lg:text-sm font-medium">
                        Your EB-5 is actively contributing to following regional economic developers.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border-2 border-gray-100 cursor-pointer hover:border-[#F65353] transition-all">
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-[#121E38] font-bold text-lg">
                        JR
                    </div>
                </div>
            </div>
        </header>
    );
}
