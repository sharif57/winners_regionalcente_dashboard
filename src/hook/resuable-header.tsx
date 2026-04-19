"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ReusableHeaderProps {
  badge?: string;
  title?: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  variant?: "light" | "dark";
}

export default function ReusableHeader({
  badge,
  title,
  description,
  className,
  titleClassName,
  variant = "light",
}: ReusableHeaderProps) {
  const isDark = variant === "dark";

  return (
    <div className={cn("flex flex-col items-center text-center space-y-4 max-w-5xl mx-auto px-6 py-10", className)}>
      {/* Badge with Red Swoosh */}
      {/* Badge with Red Swoosh */}
      {/* Badge with Red Swoosh */}
      {badge && (
        <div className="relative inline-flex flex-col items-center">
          <span
            className={cn(
              "text-base font-normal tracking-widest uppercase",
              isDark ? "text-white/80" : "text-[#121E38]"
            )}
          >
            {badge}
          </span>

          <svg
            className="mt-1"
            width="80"
            height="2"
            viewBox="0 0 80 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="40" cy="1" rx="40" ry="1" fill="#F65353" />
          </svg>
        </div>
      )}
      {/* <div className="relative inline-flex flex-col items-center">
        <span
          className={cn(
            "text-base font-normal tracking-widest uppercase",
            isDark ? "text-white/80" : "text-[#121E38]"
          )}
        >
          {badge}
        </span>

        <svg className="mt-1" width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="40" cy="1" rx="40" ry="1" fill="#F65353" />
        </svg>

      </div> */}

      {/* Main Title - Italic & Bold */}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-[36px] font-bold italic leading-tight pt-4 max-w-xl",
          isDark ? "text-white" : "text-foreground",
          titleClassName
        )}
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className={cn(
          "text-sm md:text-base lg:text-lg leading-relaxed max-w-5xl pt-2",
          isDark ? "text-white/70" : "text-[#696969]"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
