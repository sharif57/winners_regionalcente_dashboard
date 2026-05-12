/* eslint-disable @next/next/no-img-element */
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserDetail, UserStatus } from "../types";

function getStatusClassName(status: UserStatus) {
    if (status === "Pending") {
        return "text-[#F65353]";
    }

    if (status === "Completed") {
        return "text-[#038862]";
    }

    return "text-[#1F1F1F]";
}

const infoItems = [
    { key: "origin", label: "ORIGIN" },
    { key: "aumContribution", label: "AUM CONTRIBUTION" },
    { key: "address", label: "ADDRESS" },
    { key: "dateOfBirth", label: "DOB" },
    { key: "joiningDate", label: "JOINING DATE" },
    { key: "status", label: "STATUS" },
] as const;

export default function UserProfileHero({
    user,
    status,
}: {
    user: UserDetail;
    status: UserStatus;
}) {
    return (
        <section className="rounded-lg   bg-white px-5 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:px-7 sm:py-7">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-center">
                <div className="flex items-center gap-4 sm:gap-6 xl:min-w-75">
                    <div className="relative size-27.5 overflow-hidden rounded-md border border-[#D6D8DD] bg-[#233641] shadow-sm sm:size-32">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="object-cover w-full h-full"
                        />
                        <span className="absolute bottom-0 right-0 inline-flex rounded-full bg-white p-0.5">
                            <CheckCircle2 className="size-5 text-[#17B65E]" fill="#17B65E" />
                        </span>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <h2 className="text-xl leading-none font-semibold italic text-[#000A24] sm:text-[32px]">
                                {user.name}
                            </h2>
                            <p className="mt-3 text-base leading-none font-normal text-[#45464D] sm:text-base">
                                {user.phone}
                            </p>
                        </div>
                        <div>
                            <p className="text-base font-normal uppercase text-[#696969]">Origin</p>
                            <p className="text-lg font-semibold leading-snug text-[#1F1F1F]">{user.origin}</p>
                        </div>
                    </div>
                </div>

                <div className="grid flex-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-0">
                    {infoItems.map((item, index) => (
                        <div
                            key={item.key}
                            className={cn(
                                "space-y-3 xl:px-7",
                                index > 0 && "xl:border-l xl:border-[#D7DBE2]"
                            )}
                        >
                            <p className="text-base font-normal uppercase text-[#696969]">{item.label}</p>

                            {item.key === "aumContribution" && <p className="text-[20px] leading-snug text-[#1F1F1F]">{user.aumContribution}</p>}
                            {item.key === "address" && (
                                <div className="text-[20px] leading-snug text-[#1F1F1F]">
                                    <p>{user.addressLines[0]}</p>
                                    <p>{user.addressLines[1]}</p>
                                </div>
                            )}
                            {item.key === "dateOfBirth" && <p className="text-[20px] leading-snug text-[#1F1F1F]">{user.dateOfBirth}</p>}
                            {item.key === "joiningDate" && <p className="text-[20px] leading-snug text-[#1F1F1F]">{user.joiningDate}</p>}
                            {item.key === "status" && (
                                <p className={cn("text-[20px] leading-snug", getStatusClassName(status))}>{status}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
