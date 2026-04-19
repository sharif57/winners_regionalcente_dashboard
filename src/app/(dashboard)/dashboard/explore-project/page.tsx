"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import ProjectCard from "@/components/dashboard/explore-project/ProjectCard";
import ProjectFilterTabs from "@/components/dashboard/explore-project/ProjectFilterTabs";
import Pagination from "@/components/dashboard/explore-project/Pagination";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const allProjects = [
    {
        id: 1,
        title: "WINNERS TOWER AT MILK-DALLAS, TEXAS",
        status: "Active" as const,
        description: "Premium residential complex in the heart of Austin teach corridor.",
        investment: "$800k",
        roi: "5-7%",
        progress: "75%",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "WINNERS TOWER AT MILK-DALLAS, TEXAS",
        status: "Completed" as const,
        description: "Premium residential complex in the heart of Austin teach corridor.",
        investment: "$800k",
        roi: "5-7%",
        progress: "75%",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "WINNERS TOWER AT MILK-DALLAS, TEXAS",
        status: "Completed" as const,
        description: "Premium residential complex in the heart of Austin teach corridor.",
        investment: "$800k",
        roi: "5-7%",
        progress: "75%",
        image: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "WINNERS TOWER AT MILK-DALLAS, TEXAS",
        status: "Active" as const,
        description: "Premium residential complex in the heart of Austin teach corridor.",
        investment: "$800k",
        roi: "5-7%",
        progress: "75%",
        image: "https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=1000&auto=format&fit=crop"
    },
];

export default function ExploreProjectPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProjects = allProjects.filter((project) => {
        const matchesTab = activeTab === "ALL" || project.status.toUpperCase() === activeTab;
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className=" mx-auto animate-in fade-in duration-700">
            {/* Top Header Card */}
            <div className="bg-white rounded-sm shadow-sm border border-[#F2F2F2] mb-8">
                <div className="px-4 md:px-6 lg:px-10 py-6 flex flex-col items-center justify-between gap-6 md:flex-row">
                    <h1 className="text-secondary text-xl md:text-2xl lg:text-[28px] font-semibold italic leading-none whitespace-nowrap order-1">
                        All Project
                    </h1>

                    {/* Search Bar */}
                    <div className="relative w-full max-w-[580px] order-3 md:order-2">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-5 h-5 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-2.5 md:py-3 bg-[#FCFCFC] border border-[#E0E0E0] rounded-sm focus:outline-none focus:border-[#EA4335] transition-all text-[14px] md:text-[15px] text-[#1F1F1F] placeholder:text-[#9E9E9E]"
                        />
                    </div>

                    <Button
                        onClick={() => router.push("/dashboard/explore-project/create-project")}
                        className="bg-primary hover:bg-[#8B1818] text-white font-bold px-6 md:px-6 py-3  tracking-wider h-auto text-xs md:text-base transition-colors uppercase whitespace-nowrap order-2 md:order-3 w-full md:w-auto"
                    >
                        CREATE NEW PROJECT
                    </Button>
                </div>

                {/* Separator Line */}
                <div className="h-[1px] w-full bg-[#F2F2F2]" />

                {/* Filters Tabs Area */}
                <div className="px-6 lg:px-10 py-6">
                    <ProjectFilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10 mt-2">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} {...project} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <Pagination />
                </div>
            </div>
        </div>
    );
}
