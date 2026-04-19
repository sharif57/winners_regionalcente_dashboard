"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

type NavItem = {
    label: string;
    href: string;
    active?: boolean;
    dropdown?: Array<{ label: string; href: string }>;
};

const navItems: NavItem[] = [
    { label: "Home", href: "#", active: true },
    {
        label: "About Us",
        href: "#",
        dropdown: [
            { label: "Our Story", href: "#" },
            { label: "Leadership Team", href: "#" },
            { label: "Why Choose Us", href: "#" },
        ],
    },
    {
        label: "EB-5 Immigration",
        href: "#",
        dropdown: [
            { label: "Steps in the EB-5 Process", href: "/eb-5-visa" },
            { label: "Our Projects", href: "/eb-5-visa/our-project" },
        ],
    },
    { label: "Wealth Management", href: "/wealth-management" },
    { label: "FAQ", href: "#" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

    const toggleMobileDropdown = (label: string) => {
        setMobileExpanded((current) => (current === label ? null : label));
    };

    return (
        <header className="w-full border-b border-[#e9e9e9] bg-white">
            <div className="mx-auto flex h-[76px] w-full  items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="#" className="shrink-0" aria-label="The Winners Regional Center">
                    <Image
                        src="/image/logo.svg"
                        alt="The Winners Regional Center"
                        width={178}
                        height={52}
                        priority
                        className="h-auto w-[146px] sm:w-[160px] lg:w-[178px]"
                    />
                </Link>

                <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
                    {navItems.map((item) => {
                        if (!item.dropdown) {
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`inline-flex items-center gap-1 text-base leading-none transition-colors ${item.active
                                        ? "font-bold text-[#1f1f1f]"
                                        : "font-normal text-[#1f1f1f] hover:text-[#b91d1d]"
                                        }`}
                                >
                                    <span className="relative pb-[7px]">
                                        {item.label}
                                        {item.active && (
                                            <span className="absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-[#b91d1d]" />
                                        )}
                                    </span>
                                </Link>
                            );
                        }

                        return (
                            <div key={item.label} className="group relative">
                                <Link
                                    href={item.href}
                                    className="inline-flex items-center gap-1 pb-[7px] text-[18px] font-normal leading-none text-[#1f1f1f] transition-colors hover:text-[#b91d1d]"
                                >
                                    <span>{item.label}</span>
                                    <ChevronDown className="mt-[1px] h-4 w-4" />
                                </Link>

                                <div className="invisible absolute left-1/2 top-full z-30 mt-4 w-64 -translate-x-1/2 rounded-md border border-[#ececec] bg-white p-2 opacity-0 shadow-[0_18px_40px_rgba(0,0,0,0.08)] transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                                    {item.dropdown.map((subItem) => (
                                        <Link
                                            key={subItem.label}
                                            href={subItem.href}
                                            className="block rounded-md px-3 py-2.5 text-[15px] text-[#1f1f1f] transition-colors hover:bg-[#f6f6f6] hover:text-[#b91d1d]"
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </nav>

                <div className="hidden lg:block">
                    <button className="h-[48px] min-w-[210px] bg-[#b91d1d] px-7 text-[15px] font-bold uppercase tracking-[0.01em] text-white transition-colors hover:bg-[#9f1717]">
                        Request Evaluation
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#d9d9d9] text-[#1f1f1f] lg:hidden"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {menuOpen && (
                <div className="border-t border-[#ededed] bg-white lg:hidden">
                    <nav
                        className="mx-auto flex w-full max-w-[1200px] flex-col px-4 py-3 sm:px-6"
                        aria-label="Mobile Primary"
                    >
                        {navItems.map((item) => {
                            if (!item.dropdown) {
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`flex items-center justify-between py-3 text-[16px] ${item.active ? "font-bold text-[#1f1f1f]" : "font-normal text-[#1f1f1f]"
                                            }`}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            }

                            const expanded = mobileExpanded === item.label;

                            return (
                                <div key={item.label} className="py-1">
                                    <button
                                        type="button"
                                        onClick={() => toggleMobileDropdown(item.label)}
                                        className="flex w-full items-center justify-between py-2 text-left text-[16px] font-normal text-[#1f1f1f]"
                                        aria-expanded={expanded}
                                    >
                                        <span>{item.label}</span>
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : "rotate-0"}`}
                                        />
                                    </button>

                                    {expanded && (
                                        <div className="mt-1 flex flex-col rounded-md bg-[#fafafa] p-2">
                                            {item.dropdown.map((subItem) => (
                                                <Link
                                                    key={subItem.label}
                                                    href={subItem.href}
                                                    className="rounded-md px-2 py-2 text-[14px] text-[#1f1f1f] transition-colors hover:bg-[#f1f1f1] hover:text-[#b91d1d]"
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        <button className="mt-2 h-11 w-full bg-[#b91d1d] px-4 text-[14px] font-bold uppercase tracking-[0.01em] text-white">
                            Request Evaluation
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}
