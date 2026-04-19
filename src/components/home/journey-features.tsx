"use client";

import { TrendingUp, BarChart3, Workflow, Coins, ClipboardCheck, Settings } from "lucide-react";
import ReusableHeader from "@/hook/resuable-header";

const journeyColumns = [
  {
    title: "Strategic Advantages of Working with WRC",
    items: [
      {
        icon: <TrendingUp className="w-5 h-5 text-white" />,
        header: "Family Green Cards",
        description: "Your family enjoys full legal protection to school, work or travel anywhere within the United States.",
      },
      {
        icon: <BarChart3 className="w-5 h-5 text-white" />,
        header: "Investment Advice",
        description: "SEC-registered investment advisers guide you through funding options for EB-5 opportunities.",
      },
      {
        icon: <Workflow className="w-5 h-5 text-white" />,
        header: "Partnerships",
        description: "Customized integration of your immigration and investment journey for a seamless experience.",
      },
    ],
  },
  {
    title: "Elite Oversights & Capital Protection",
    items: [
      {
        icon: <Coins className="w-5 h-5 text-white" />,
        header: "Capital Growth",
        description: "Our mutual interest in capital growth for economic development inspires success in profitable investments.",
      },
      {
        icon: <ClipboardCheck className="w-5 h-5 text-white" />,
        header: "Professional Support",
        description: "Due diligence confirms the integrity of our family of partners providing professional support for your ambition.",
      },
      {
        icon: <Settings className="w-5 h-5 text-white" />,
        header: "Developer Assistance",
        description: "We help actors in the EB-5 space to rent, sell or certify Regional Center activities and projects",
      },
    ],
  },
];

export default function JourneyFeatures() {
  return (
    <section className="py-15 bg-[#0F172A]">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ReusableHeader
          variant="dark"
          badge="FEATURES"
          title="Everything You Need for a Successful EB-5 Journey"
          description=""
          className="pb-16"
        />

        {/* Features Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
          {journeyColumns.map((column, idx) => (
            <div
              key={idx}
              className="bg-[#1E293B]/40 p-8 md:p-12 border border-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-[#1E293B]/60"
            >
              {/* Column Title with Line */}
              <div className="mb-10">
                <div className="w-10 h-[2px] bg-white/40 mb-6" />
                <h3 className="text-xl md:text-2xl lg:text-2xl font-semibold italic text-white leading-tight">
                  {column.title}
                </h3>
              </div>

              {/* Items List */}
              <div className="space-y-10">
                {column.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex gap-6 group">
                    {/* Icon Container */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#14213D] border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                      {item.icon}
                    </div>

                    {/* Text Content */}
                    <div className="space-y-2">
                      <h4 className="text-xl font-medium text-white transition-colors group-hover:text-primary">
                        {item.header}
                      </h4>
                      <p className="text-[#BABABA] text-base font-normal leading-relaxed max-w-md">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
