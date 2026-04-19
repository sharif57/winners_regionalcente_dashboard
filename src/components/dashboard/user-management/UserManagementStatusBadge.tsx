import { cn } from "@/lib/utils";
import type { UserStatus } from "./types";

const statusStyles: Record<UserStatus, string> = {
    Pending: "bg-[#FFF3EE] text-[#F65353]",
    Completed: "bg-[#E7F8F2] text-[#038862]",
    Active: "bg-[#E8E9EC] text-[#1F1F1F]",
};

export default function UserManagementStatusBadge({
    status,
    className,
}: {
    status: UserStatus;
    className?: string;
}) {
    return (
        <span
            className={cn(
                "inline-flex min-w-[96px] items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium",
                statusStyles[status],
                className
            )}
        >
            {status}
        </span>
    );
}
