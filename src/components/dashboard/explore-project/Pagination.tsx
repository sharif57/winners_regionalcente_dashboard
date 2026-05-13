"use client";

import React from "react";
import { MoveLeft, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

function buildPageItems(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: Array<number | "..."> = [1];
  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  if (startPage > 2) {
    items.push("...");
  }

  for (let page = startPage; page <= endPage; page += 1) {
    items.push(page);
  }

  if (endPage < totalPages - 1) {
    items.push("...");
  }

  items.push(totalPages);

  return items;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}) => {
  const pageItems = buildPageItems(currentPage, totalPages);
  const canGoPrevious = currentPage > 1 && !disabled;
  const canGoNext = currentPage < totalPages && !disabled;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-16 md:mt-24 gap-6 md:gap-12 pb-10">
      {/* Previous */}
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={!canGoPrevious}
        className="flex items-center gap-3 px-5 py-2.5 border border-[#BDBDBD] rounded-md text-[#666666] hover:bg-[#121E38] hover:text-white hover:border-[#121E38] transition-all duration-300 font-medium group disabled:cursor-not-allowed disabled:opacity-50"
      >
        <MoveLeft size={18} className="transition-transform group-hover:-translate-x-1" />
        <span className="text-[15px]">Previous</span>
      </button>

      {/* Pages */}
      <div className="flex items-center gap-1 md:gap-3">
        {pageItems.map((page, idx) => (
          <button
            key={`${page}-${idx}`}
            type="button"
            onClick={() => typeof page === "number" && onPageChange(page)}
            className={cn(
              "w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-sm text-[16px] md:text-[18px] font-semibold transition-all duration-300",
              page === currentPage
                ? "bg-[#E8E9EC] text-[#EA4335]"
                : page === "..."
                  ? "text-[#666666] cursor-default"
                  : "text-[#666666] hover:bg-gray-200"
            )}
            disabled={disabled || page === "..."}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={!canGoNext}
        className="flex items-center gap-3 px-5 py-2.5 border border-[#BDBDBD] rounded-md text-[#666666] hover:bg-[#121E38] hover:text-white hover:border-[#121E38] transition-all duration-300 font-medium group text-[15px] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span>Next</span>
        <MoveRight size={18} className="transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default Pagination;
