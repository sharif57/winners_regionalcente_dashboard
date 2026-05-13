"use client";

import React, { startTransition, useDeferredValue, useMemo, useState } from "react";
import { Search } from "lucide-react";
import ProjectCard from "@/components/dashboard/explore-project/ProjectCard";
import ProjectFilterTabs from "@/components/dashboard/explore-project/ProjectFilterTabs";
import Pagination from "@/components/dashboard/explore-project/Pagination";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { type ProjectItem, useProjectListQuery } from "@/redux/feature/projectSlice";

const PAGE_SIZE = 4;

type FilterValue = "ALL" | "ACTIVE" | "COMPLETED";

type ExploreProjectCard = {
    id: number;
    title: string;
    status: "Active" | "Completed" | string;
    description: string;
    investment: string;
    roi: string;
    progress: string;
    image: string;
};

function formatCurrency(value: string) {
    const amount = Number.parseFloat(value);

    if (Number.isNaN(amount)) {
        return value;
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(amount);
}

function titleCase(value: string) {
    return value
        .toLowerCase()
        .split(/[_\s-]+/)
        .filter(Boolean)
        .map((part) => part[0].toUpperCase() + part.slice(1))
        .join(" ");
}

function getProjectProgress(project: ProjectItem) {
    const startDate = new Date(project.project_start_date);
    const endDate = new Date(project.project_end_date);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
        return project.status.toLowerCase() === "completed" ? "100%" : "0%";
    }

    if (project.status.toLowerCase() === "completed") {
        return "100%";
    }

    const now = new Date();

    if (now <= startDate) {
        return "0%";
    }

    if (now >= endDate || endDate <= startDate) {
        return "100%";
    }

    const progress = ((now.getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime())) * 100;

    return `${Math.min(100, Math.max(0, Math.round(progress)))}%`;
}

function mapProjectToCard(project: ProjectItem): ExploreProjectCard {
    return {
        id: project.id,
        title: project.name,
        status: titleCase(project.status),
        description: project.short_description,
        investment: formatCurrency(project.total_project_value),
        roi: project.roi,
        progress: getProjectProgress(project),
        image: project.banner,
    };
}

function matchesSearch(project: ExploreProjectCard, search: string) {
    if (!search) {
        return true;
    }

    const value = search.toLowerCase();

    return [
        project.title,
        project.description,
        project.investment,
        project.roi,
        project.status,
        project.progress,
    ].some((field) => field.toLowerCase().includes(value));
}

export default function ExploreProjectPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<FilterValue>("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const deferredSearchQuery = useDeferredValue(searchQuery);
    const trimmedSearchQuery = deferredSearchQuery.trim();

    const queryParams = useMemo(() => ({
        page: currentPage,
        page_size: PAGE_SIZE,
        status: activeTab === "ALL" ? undefined : activeTab.toLowerCase(),
        search: trimmedSearchQuery || undefined,
    }), [activeTab, currentPage, trimmedSearchQuery]);

    const { data: projectsData, isLoading, isFetching } = useProjectListQuery(queryParams);

    const projects = useMemo(
        () => (projectsData?.data ?? []).map(mapProjectToCard),
        [projectsData?.data]
    );

    const filteredProjects = useMemo(
        () => projects.filter((project) => matchesSearch(project, trimmedSearchQuery)),
        [projects, trimmedSearchQuery]
    );

    const totalPages = Math.max(1, projectsData?.meta?.total_pages ?? 1);
    const activePage = Math.min(projectsData?.meta?.page ?? currentPage, totalPages);

    function handleTabChange(tab: string) {
        startTransition(() => {
            setActiveTab(tab as FilterValue);
            setCurrentPage(1);
        });
    }

    function handleSearchChange(value: string) {
        setSearchQuery(value);

        startTransition(() => {
            setCurrentPage(1);
        });
    }

    const isEmpty = !isLoading && filteredProjects.length === 0;

    return (
        <div className=" mx-auto animate-in fade-in duration-700">
            {/* Top Header Card */}
            <div className="bg-white rounded-sm shadow-sm border border-[#F2F2F2] mb-8">
                <div className="px-4 md:px-6 lg:px-10 py-6 flex flex-col items-center justify-between gap-6 md:flex-row">
                    <h1 className="text-secondary text-xl md:text-2xl lg:text-[28px] font-semibold italic leading-none whitespace-nowrap order-1">
                        All Project
                    </h1>

                    {/* Search Bar */}
                    <div className="relative w-full max-w-145 order-3 md:order-2">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-5 h-5 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
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
                <div className="h-px w-full bg-[#F2F2F2]" />

                {/* Filters Tabs Area */}
                <div className="px-6 lg:px-10 py-6">
                    <ProjectFilterTabs activeTab={activeTab} setActiveTab={handleTabChange} />

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10 mt-2">
                        {isLoading || isFetching
                            ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
                                <div
                                    key={`project-skeleton-${index}`}
                                    className="min-h-85 animate-pulse rounded-sm border border-[#F2F2F2] bg-[#F7F7F8] p-5 md:p-6"
                                />
                            ))
                            : isEmpty
                                ? (
                                    <div className="col-span-full rounded-sm border border-dashed border-[#E0E0E0] bg-[#FCFCFC] px-6 py-16 text-center">
                                        <p className="text-lg font-semibold text-[#1F1F1F]">No projects found</p>
                                        <p className="mt-2 text-sm text-[#696969]">
                                            Try a different search or switch to another status.
                                        </p>
                                    </div>
                                )
                                : filteredProjects.map((project) => (
                                    <ProjectCard key={project.id} {...project} />
                                ))}
                    </div>

                    {/* Pagination */}
                    <Pagination
                        currentPage={activePage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        disabled={isLoading || isFetching}
                    />
                </div>
            </div>
        </div>
    );
}
