"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col lg:flex-row min-h-screen font-sans">
            {/* Left Pane: Logo Section */}
            <div className="hidden lg:flex lg:w-[40%] bg-[#E8E9EC52] items-center justify-center p-12 relative">
                {/* Back Button (Desktop) */}
                <Link
                    href="/"
                    className="absolute top-10 left-10 p-2 hover:bg-gray-100 transition-all rounded-full group"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600 group-hover:-translate-x-1 transition-transform" />
                </Link>

                <div className="text-center space-y-4 animate-in fade-in zoom-in duration-1000">
                    <Image
                        src="/image/authlogo.svg"
                        alt="Winners Regional Center Logo"
                        width={280}
                        height={100}
                        className="mx-auto"
                        priority
                    />
                </div>
            </div>

            {/* Right Pane: Content Section */}
            <div className="flex-1 lg:w-[60%] flex flex-col bg-white relative">
                {/* Back Button (Mobile) */}
                <Link
                    href="/"
                    className="lg:hidden absolute top-6 left-6 p-2 hover:bg-gray-100 transition-all rounded-full group"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </Link>

                <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-20">
                    <div className="w-full max-w-[580px] mx-auto animate-in fade-in slide-in-from-right-10 duration-700">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
