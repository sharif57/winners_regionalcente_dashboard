"use client";

import React from "react";
import ReusableHeader from "@/hook/resuable-header";

const steps = [
  {
    number: 1,
    title: "Invest 800K +",
    description: "Initial capital placement in a qualifying TEAs project.",
  },
  {
    number: 2,
    title: "Job Creation",
    description: "Minimum 10+ jobs per visa applicant",
  },
  {
    number: 3,
    title: "Conditional Green Card",
    description: "US Residency benefits for you and your family",
  },
  {
    number: 4,
    title: "Project Completion",
    description: "Verification of full capital deployment.",
  },
  {
    number: 5,
    title: "Permanent Residency",
    description: "Removal of conditions and replacement with Permanent Green Card.",
  },
];

export default function HowItWorks() {
  return (
    <section className=" bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ReusableHeader
          badge="HOW IT WORKS"
          title="The EB-5 Immigration Program"
          description=""
          className="pb-16"
        />

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center px-6 py-12 border border-[#989898] transition-all duration-300 hover:shadow-lg hover:border-primary/20 group h-full"
            >
              {/* Step Number Circle */}
              <div className="w-14 h-14 rounded-full border border-[#4C4C4C] flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary group-hover:text-white">
                <span className="text-2xl lg:text-[32px] font-semibold text-[#4C4C4C] group-hover:text-white">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-medium italic text-secondary mb-4 group-hover:text-primary transition-colors">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-accent text-base font-normal leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
