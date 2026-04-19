"use client";

import React from "react";
import { TrendingUp, Building2, Globe } from "lucide-react";
import ReusableHeader from "@/hook/resuable-header";

const features = [
  {
    id: 1,
    icon: <TrendingUp className="w-8 h-8 text-[#1A1A1A]" />,
    title: "Fastest - Growing Economy",
    description: "Texas consistently outpaces the national average in capital growth, providing a stable and investment-stimulating environment for large-scale capital.",
  },
  {
    id: 2,
    icon: <Building2 className="w-8 h-8 text-[#1A1A1A]" />,
    title: "Job Creation Leader",
    description: "The top destination for Fortune 500 relocations, creating a robust demand for residential, commercial and infrastructure projects.",
  },
  {
    id: 3,
    icon: <Globe className="w-8 h-8 text-[#1A1A1A]" />,
    title: "Global Investment Hub",
    description: "A primary destination for international capital offering a friendly business climate.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ReusableHeader
          badge="WHY TEXAS"
          title="Texas: The Economic Engine of America"
          description=""
          className="pb-12"
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center text-center p-8 border border-[#B6BAC3] transition-all duration-300 hover:shadow-lg hover:border-primary/20 group"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 rounded-full border border-[#D1D1D1] flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/5">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-medium italic text-secondary mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-accent text-base font-normal leading-relaxed max-w-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
