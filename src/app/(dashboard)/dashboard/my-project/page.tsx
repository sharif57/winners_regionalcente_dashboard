"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ProjectStatus = "Active" | "Pending" | "Completed";
type FilterTab = "All" | ProjectStatus;

type ProjectItem = {
    id: number;
    title: string;
    description: string;
    investment: string;
    estRoi: string;
    progress: string;
    status: ProjectStatus;
};

const tabs: FilterTab[] = ["All", "Active", "Pending", "Completed"];
const portfolioStats = [
    { label: "TOTAL INVESTED", value: "$800K" },
    { label: "ANNUAL YIELD", value: "8% ROI" },
    { label: "ACTIVE ASSETS", value: "3 PROJECTS" },
    { label: "ECONOMIC IMPACT", value: "1250+ JOBS" },
];

const projects: ProjectItem[] = [
    {
        id: 1,
        title: "WINNERS TOWER AT MILK-DALLAS, TEXAS",
        description: "Premium residential complex in the heart of Austin teach corridor.",
        investment: "$800k",
        estRoi: "5-7%",
        progress: "75%",
        status: "Active",
    },
    {
        id: 2,
        title: "WINNERS TOWER AT MILK-DALLAS, TEXAS",
        description: "Premium residential complex in the heart of Austin teach corridor.",
        investment: "$800k",
        estRoi: "5-7%",
        progress: "75%",
        status: "Completed",
    },
    {
        id: 3,
        title: "WINNERS TOWER AT MILK-DALLAS, TEXAS",
        description: "Premium residential complex in the heart of Austin teach corridor.",
        investment: "$800k",
        estRoi: "5-7%",
        progress: "75%",
        status: "Pending",
    },
    {
        id: 4,
        title: "WINNERS TOWER AT MILK-DALLAS, TEXAS",
        description: "Premium residential complex in the heart of Austin teach corridor.",
        investment: "$800k",
        estRoi: "5-7%",
        progress: "75%",
        status: "Active",
    },
];

const statusStyles: Record<ProjectStatus, string> = {
    Active: "bg-[#4B5776] text-white",
    Pending: "bg-[#9EA0A8] text-white",
    Completed: "bg-[#07966F] text-white",
};

export default function ProjectPage() {
    const [activeTab, setActiveTab] = useState<FilterTab>("All");

    const filteredProjects = useMemo(() => {
        if (activeTab === "All") {
            return projects;
        }
        return projects.filter((project) => project.status === activeTab);
    }, [activeTab]);

    return (
        <section>
            <div className="mb-5 bg-white px-4 py-4 sm:mb-7 sm:px-6 sm:py-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0">
                    {portfolioStats.map((item, index) => (
                        <div
                            key={item.label}
                            className={`px-3 sm:px-4 xl:px-6 ${index !== portfolioStats.length - 1
                                ? "xl:border-r xl:border-[#C9C9CB]"
                                : ""
                                }`}
                        >
                            <p className="text-base  leading-tight font-normal text-secondary uppercase">
                                {item.label}
                            </p>
                            <p className="mt-1 text-2xl lg:text-[32px]  font-black italic text-[#1F1F1F] sm:text-[40px]">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <section className="w-full bg-white p-4 ">

                <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2 sm:mb-7 sm:gap-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`text-[16px] leading-none italic transition-colors sm:text-[24px] font-semibold ${activeTab === tab ? "text-[#F65353]" : "text-secondary hover:text-[#DE6D70]"
                                }`}
                        >
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                    {filteredProjects.map((project) => (
                        <article
                            key={project.id}
                            className=" bg-[#E8E9EC52] p-4 sm:p-6 lg:p-7"
                        >
                            <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-6">
                                <Image
                                    src="/image/project-1.png"
                                    alt={project.title}
                                    width={190}
                                    height={190}
                                    className="h-[170px] w-[170px] shrink-0 rounded-full object-cover shadow-md sm:h-[190px] sm:w-[190px]"
                                    priority={project.id <= 2}
                                />

                                <div className="flex-1">
                                    <div className="mb-4 flex  items-center justify-between gap-3">
                                        <h3 className="max-w-[390px] text-xl leading-[1.18] font-black italic text-[#1F1F1F] uppercase sm:text-[25px]">
                                            {project.title}
                                        </h3>
                                        <span
                                            className={`inline-flex  justify-center px-3 py-1.5 text-lg leading-none ${statusStyles[project.status]}`}
                                        >
                                            {project.status}
                                        </span>
                                    </div>

                                    <p className="mb-4 max-w-[500px] text-[14px] leading-[1.35] text-[#636363] sm:text-base">
                                        {project.description}
                                    </p>

                                    <div className="mb-5 flex flex-wrap items-center gap-y-3 text-[12px] text-[#6B6B6B] uppercase sm:text-[16px]">
                                        <div className="pr-4">
                                            <p>Investment</p>
                                            <p className="text-[24px] leading-tight font-semibold normal-case text-[#1F1F1F] sm:text-[30px]">
                                                {project.investment}
                                            </p>
                                        </div>
                                        <div className="mx-4 h-12 w-px bg-[#A5A5A5]" />
                                        <div className="pr-4">
                                            <p>Est.Roi</p>
                                            <p className="text-[24px] leading-tight font-medium normal-case text-[#D45D72] sm:text-[30px]">
                                                {project.estRoi}
                                            </p>
                                        </div>
                                        <div className="mx-4 h-12 w-px bg-[#A5A5A5]" />
                                        <div>
                                            <p>Progress</p>
                                            <p className="text-[24px] leading-tight font-medium normal-case text-[#D45D72] sm:text-[30px]">
                                                {project.progress}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="w-full border border-[#C4C4C4] bg-white px-4 py-3 text-center text-[15px] font-bold text-[#1E2738] uppercase transition-colors hover:bg-white sm:text-[18px]"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </section>
    );
}
