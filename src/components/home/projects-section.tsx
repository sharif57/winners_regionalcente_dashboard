"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReusableHeader from "@/hook/resuable-header";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    image: "/image/project-1.png",
    status: "Active",
    statusColor: "bg-[#1E293B]",
    title: "WINNERS TOWER AT MILK-DALLAS, TEXAS",
    investment: "$800k",
    roi: null,
    description: "Premium residential complex in the heart of Austin teach corridor.",
    buttonLabel: "VIEW DETAILS",
    buttonVariant: "outline",
  },
  {
    id: 2,
    image: "/image/project-2.png",
    status: "Limited",
    statusColor: "bg-[#C51D1D]",
    title: "Houston Commercial Tower Project",
    investment: "$800k",
    roi: null,
    description: "Iconic business center targeting professionals service in Houston.",
    buttonLabel: "VIEW DETAILS",
    buttonVariant: "outline",
  },
  {
    id: 3,
    image: "/image/project-3.png",
    status: "Fully Funded",
    statusColor: "bg-[#94A3B8]",
    title: "Dallas Mixed-Use Development",
    investment: "$800k",
    roi: "5.5%",
    description: "Urban lifestyle development successfully funded by global investor.",
    buttonLabel: "CLOSED",
    buttonVariant: "ghost",
  },
];

export default function ProjectsSection() {
  return (
    <section className="py-[32px] bg-[#F9F9F9]">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ReusableHeader
          badge="EB-5 PROJECTS"
          title="Signature Opportunities"
          description=""
          className="pb-12"
        />

        {/* Projects Grid */}
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
                      <div className="w-[1px] h-10 bg-[#EEEEEE]" />
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-[#666666] font-medium">EST.ROI</p>
                        <p className="text-lg font-bold text-[#EA4335]">{project.roi}</p>
                      </div>
                    </>
                  )}
                </div>

                <p className="text-[#696969] text-base font-normal leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="pt-4">
                  <Button
                    variant={project.buttonVariant === "ghost" ? "secondary" : "outline"}
                    className={cn(
                      "w-full rounded-none py-6 font-bold tracking-widest text-base transition-all duration-300",
                      project.buttonVariant === "ghost"
                        ? "bg-[#94A3B8]/20 text-[#64748B] hover:bg-[#94A3B8]/30 cursor-not-allowed"
                        : "border-[#9399A6] text-[#121E38] hover:bg-[#121E38] hover:text-white"
                    )}
                  >
                    {project.buttonLabel}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-6 mt-16 text-[#1A1A1A]">
          <button className="p-2 hover:text-primary transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  i === 1 ? "bg-primary w-6" : "bg-[#D1D1D1]"
                )}
              />
            ))}
          </div>
          <button className="p-2 hover:text-primary transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
