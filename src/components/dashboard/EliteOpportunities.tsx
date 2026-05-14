/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProjectListQuery, type ProjectItem } from "@/redux/feature/projectSlice";
import Link from "next/link";

const getStatusColor = (status: string) => {
    if (status === "active") return "bg-[#14213D]";
    if (status === "completed") return "bg-[#038862]";
    return "bg-[#F59E0B]";
};

const formatInvestment = (value: string) => {
    const amount = Number.parseFloat(value);

    if (Number.isNaN(amount)) {
        return value;
    }

    if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
    }

    if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}k`;
    }

    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
};

const buildImageSrc = (project: ProjectItem) => project.banner || "/image/project-3.png";
export default function EliteOpportunities() {
    const { data } = useProjectListQuery({ page: 1, page_size: 6 });

    const projects = useMemo(() => data?.data ?? [], [data]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000 bg-white p-6">
            <h3 className="text-[#1F1F1F] text-xl font-bold italic">
                Recently Created Project
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.slice(0, 3).map((project) => (
                    <div
                        key={project.id}
                        className="bg-[#E8E9EC52] group transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Image with Badge */}
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={buildImageSrc(project)}
                                alt={project.name}
                                // fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 w-full"
                            />
                            <div className={cn(
                                "absolute top-4 right-0 px-4 py-1.5 text-xs font-bold text-white tracking-wider",
                                getStatusColor(project.status)
                            )}>
                                {project.status.toUpperCase()}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col flex-grow space-y-2">
                            <h3 className="text-xl font-bold italic uppercase text-secondary max-w-xs leading-snug">
                                {project.name}
                            </h3>

                            <div className="flex items-center gap-6 py-4">
                                <div className="space-y-1">
                                    <p className="text-base font-normal uppercase tracking-widest text-[#696969]">INVESTMENT</p>
                                    <p className="text-xl font-bold text-secondary">{formatInvestment(project.total_project_value)}</p>
                                </div>
                                {project.roi && (
                                    <>
                                        <div className="w-[2px] h-10 bg-[#000000]" />
                                        <div className="space-y-1">
                                            <p className="text-base uppercase tracking-widest text-[#=#696969] font-normal">EST.ROI</p>
                                            <p className="text-lg font-bold text-[#EA4335]">{project.roi}</p>
                                        </div>
                                    </>
                                )}
                                <Link href={`/dashboard/explore-project/${project.id}`} className="ml-auto">
                                    <Button variant={"outline"} size="lg" className="ml-auto text-base font-bold text-[#121E38] rounded-none px-[24px] py-[12px] ">
                                        View Details
                                    </Button>
                                </Link>
                            </div>


                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


