import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bell } from "lucide-react";
import type { UserDetail } from "../types";

export default function UserDetailsTopBar({ user }: { user: UserDetail }) {
    return (
        <div className="flex flex-col gap-5 rounded-[28px] bg-white px-5 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:px-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
                <Link
                    href="/dashboard/user-management"
                    className="mt-1 inline-flex size-10 items-center justify-center rounded-full text-[#1F1F1F] transition-colors hover:bg-[#F4F4F5]"
                    aria-label="Back to user management"
                >
                    <ArrowLeft className="size-8" strokeWidth={1.8} />
                </Link>

                <div>
                    <h1 className="text-[34px] leading-none font-semibold italic text-[#1F1F1F] sm:text-[42px]">
                        {user.name}
                    </h1>
                    <p className="mt-3 text-lg text-[#5C5F66]">{user.email}</p>
                </div>
            </div>

            <div className="flex items-center gap-4 self-end lg:self-auto">
                <button
                    type="button"
                    className="inline-flex size-12 items-center justify-center rounded-full text-[#1F1F1F] transition-colors hover:bg-[#F4F4F5]"
                    aria-label="Notifications"
                >
                    <Bell className="size-8" strokeWidth={1.8} />
                </button>
                <div className="relative size-[52px] overflow-hidden rounded-full border border-[#E5E7EB]">
                    <Image
                        src={user.avatar}
                        alt={user.name}
                        fill
                        className="object-cover"
                        sizes="52px"
                    />
                </div>
            </div>
        </div>
    );
}
