"use client";

import React from "react";
import { MoveLeft, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Pagination = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-16 md:mt-24 gap-6 md:gap-12 pb-10">
      {/* Previous */}
      <button className="flex items-center gap-3 px-5 py-2.5 border border-[#BDBDBD] rounded-md text-[#666666] hover:bg-[#121E38] hover:text-white hover:border-[#121E38] transition-all duration-300 font-medium group">
        <MoveLeft size={18} className="transition-transform group-hover:-translate-x-1" />
        <span className="text-[15px]">Previous</span>
      </button>

      {/* Pages */}
      <div className="flex items-center gap-1 md:gap-3">
        {[1, 2, 3, "...", 8, 9, 10].map((page, idx) => (
          <button
            key={idx}
            className={cn(
              "w-10 h-10 md:w-[44px] md:h-[44px] flex items-center justify-center rounded-sm text-[16px] md:text-[18px] font-semibold transition-all duration-300",
              page === 1
                ? "bg-[#E8E9EC] text-[#EA4335]"
                : page === "..."
                ? "text-[#666666] cursor-default"
                : "text-[#666666] hover:bg-gray-200"
            )}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button className="flex items-center gap-3 px-5 py-2.5 border border-[#BDBDBD] rounded-md text-[#666666] hover:bg-[#121E38] hover:text-white hover:border-[#121E38] transition-all duration-300 font-medium group text-[15px]">
        <span>Next</span>
        <MoveRight size={18} className="transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default Pagination;
