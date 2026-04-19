"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const projects = [
 
  {
    id: 1,
    image: "/image/project-3.png",
    status: "Active",
    statusColor: "bg-[#14213D]",
    title: "Dallas Mixed-Use Development",
    investment: "$800k",
    roi: "5.5%",
    description: "Urban lifestyle development successfully funded by global investor.",
    buttonLabel: "CLOSED",
    buttonVariant: "ghost",
  },
  {
    id: 2,
    image: "/image/project-3.png",
    status: "Active",
    statusColor: "bg-[#14213D]",
    title: "Dallas Mixed-Use Development",
    investment: "$800k",
    roi: "5.5%",
    description: "Urban lifestyle development successfully funded by global investor.",
    buttonLabel: "CLOSED",
    buttonVariant: "ghost",
  },
  {
    id: 3,
    image: "/image/project-3.png",
    status: "Active",
    statusColor: "bg-[#14213D]",
    title: "Dallas Mixed-Use Development",
    investment: "$800k",
    roi: "5.5%",
    description: "Urban lifestyle development successfully funded by global investor.",
    buttonLabel: "CLOSED",
    buttonVariant: "ghost",
  },
];
export default function EliteOpportunities() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000 bg-white p-6">
            <h3 className="text-[#1F1F1F] text-xl font-bold italic">
                Recently Created Project
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-[#E8E9EC52] group transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Image with Badge */}
                        <div className="relative h-64 overflow-hidden">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className={cn(
                                "absolute top-4 right-0 px-4 py-1.5 text-xs font-bold text-white tracking-wider",
                                project.statusColor
                            )}>
                                {project.status}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col flex-grow space-y-2">
                            <h3 className="text-xl font-bold italic uppercase text-secondary max-w-xs leading-snug">
                                {project.title}
                            </h3>

                            <div className="flex items-center gap-6 py-4">
                                <div className="space-y-1">
                                    <p className="text-base font-normal uppercase tracking-widest text-[#696969]">INVESTMENT</p>
                                    <p className="text-xl font-bold text-secondary">{project.investment}</p>
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
                                <Button variant={"outline"} size="lg" className="ml-auto text-base font-bold text-[#121E38] rounded-none px-[24px] py-[12px] ">
                                    View Details
                                </Button>
                            </div>


                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


