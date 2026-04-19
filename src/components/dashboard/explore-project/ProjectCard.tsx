"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  image: string;
  title: string;
  status: "Active" | "Completed";
  description: string;
  investment: string;
  roi: string;
  progress: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  status,
  description,
  investment,
  roi,
  progress,
}) => {
  const router = useRouter();
  return (
    <div className="bg-[#E8E9EC52] p-5 md:p-6 lg:p- flex flex-col md:flex-row gap-8 md:gap-6 lg:gap-[40px] hover:shadow-xl transition-all duration-500 rounded-sm border border-[#F2F2F2]">
      {/* Circle Image Wrapper */}
      <div className="relative shrink-0 flex justify-center items-center">
        <div className=" rounded-full overflow-hidden border-[1px] border-[#E8E9EC] shadow-md relative group">
          <Image
            src={image}
            alt={title}
            width={800}
            height={800}
            className="size-[200px] object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="w-full">
          {/* Title and Status */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-[#1F1F1F] text-lg lg:text-xl font-semibold italic uppercase leading-[1.2] max-w-[80%]">
              {title}
            </h3>
            <span
              className={cn(
                "px-[14px] py-[6px] text-xs font-bold text-white tracking-widest",
                status === "Active" ? "bg-[#3D475C]" : "bg-[#038862]"
              )}
            >
              {status}
            </span>
          </div>

          {/* Description */}
          <p className="text-[#696969] text-[15px] lg:text-[16px] font-normal mb-8 leading-relaxed max-w-[480px]">
            {description}
          </p>

          {/* Stats Section */}
          <div className="flex flex-wrap items-center gap-y-4 gap-x-6 lg:gap- mb-8">
            <div className="space-y-1.5 min-w-[100px]">
              <p className="text-[#696969] text-[11px] lg:text-base font-medium uppercase tracking-[0.1em]">
                INVESTMENT
              </p>
              <p className="text-[#1F1F1F] text-lg lg:text-xl font-bold">
                {investment}
              </p>
            </div>
            <div className="hidden sm:block w-[1.5px] h-[40px] lg:h-[48px] bg-[#E8E9EC]" />
            <div className="space-y-1.5 min-w-[80px]">
              <p className="text-[#696969] text-[11px] lg:text-base font-medium uppercase tracking-[0.1em]">
                EST.ROI
              </p>
              <p className="text-[#EA4335] text-lg lg:text-xl font-bold">
                {roi}
              </p>
            </div>
            <div className="hidden sm:block w-[1.5px] h-[40px] lg:h-[48px] bg-[#E8E9EC]" />
            <div className="space-y-1.5 min-w-[80px]">
              <p className="text-[#696969] text-[11px] lg:text-base font-medium uppercase tracking-[0.1em]">
                PROGRESS
              </p>
              <p className="text-[#EA4335] text-lg lg:text-xl font-bold">
                {progress}
              </p>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <Button
          onClick={() => {
            router.push(`/dashboard/explore-project/1`);
          }}
          variant="outline"
          className="w-full rounded-none border-[#121E38] text-[#121E38] font-bold py-6 lg:py-5 text-xs lg:text-base tracking-[0.2em] border-[1px] hover:bg-[#121E38] hover:text-white transition-all duration-300 uppercase mt-auto"
        >
          VIEW DETAILS
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
