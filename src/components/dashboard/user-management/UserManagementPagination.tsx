"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function getVisiblePages(currentPage: number, totalPages: number): Array<number | "..."> {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
        return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
        return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
}

export default function UserManagementPagination({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) {
    const visiblePages = getVisiblePages(currentPage, totalPages);

    return (
        <div className="flex flex-col gap-4 border-t border-[#E3E5E8] px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <Button
                variant="outline"
                className="h-11 w-full border-[#BFC5CF] bg-white px-4 text-base text-[#4B5563] hover:bg-[#F8F8F8] lg:w-auto"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ArrowLeft className="size-4" />
                Previous
            </Button>

            <div className="flex items-center justify-center gap-2 overflow-x-auto">
                {visiblePages.map((page, index) =>
                    page === "..." ? (
                        <span key={`ellipsis-${index}`} className="px-2 text-[#6B7280]">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            type="button"
                            onClick={() => onPageChange(page)}
                            className={cn(
                                "flex size-10 items-center justify-center rounded-md text-base transition-colors",
                                currentPage === page
                                    ? "bg-[#F2F4F7] text-[#F65353]"
                                    : "text-[#4B5563] hover:bg-[#F7F7F7]"
                            )}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            <Button
                variant="outline"
                className="h-11 w-full border-[#BFC5CF] bg-white px-4 text-base text-[#4B5563] hover:bg-[#F8F8F8] lg:w-auto"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
                <ArrowRight className="size-4" />
            </Button>
        </div>
    );
}
