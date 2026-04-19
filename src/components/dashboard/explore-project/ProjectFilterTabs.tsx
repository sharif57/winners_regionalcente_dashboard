"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProjectFilterTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProjectFilterTabs: React.FC<ProjectFilterTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = ["ALL", "ACTIVE", "COMPLETED"];

  return (
    <div className="flex items-center gap-6 lg:gap-10 mb-8 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={cn(
            "pb-1 text-base lg:text-base font-normal italic tracking-wide transition-all duration-300 whitespace-nowrap",
            activeTab === tab
              ? "text-[#EA4335]"
              : "text-[#1F1F1F] hover:text-[#EA4335]/70"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilterTabs;
