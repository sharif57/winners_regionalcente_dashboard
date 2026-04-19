"use client";

import React, { useState } from "react";
import ReusableHeader from "@/hook/resuable-header";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is the EB-5 Immigrant Investor Program?",
    answer: "The EB-5 program allows foreign investors to obtain U.S. permanent residency (Green Card) by investing in qualified projects that create jobs for the U.S. economy.",
  },
  {
    question: "How much do I need to invest?",
    answer: "The minimum investment is typically $800,000 for projects in Targeted Employment Areas (TEAs) or $1,050,000 otherwise.",
  },
  {
    question: "How long does the EB-5 process take?",
    answer: "Processing times vary, but the EB-5 journey typically includes petition approval, conditional residency, and eventual permanent residency over several years.",
  },
  {
    question: "Can my family be included in the application?",
    answer: "Yes, the investor, their spouse, and unmarried children under 21 are eligible for green cards through a single investment.",
  },
  {
    question: "Is my investment guaranteed?",
    answer: "By law, the investment must be 'at risk' to qualify for the EB-5 program, meaning no regional center can guarantee a return of capital.",
  },
  {
    question: "What happens after I receive my conditional Green Card?",
    answer: "You will hold conditional residency for two years, after which you must file a petition to remove conditions and receive a permanent Green Card.",
  },
  {
    question: "Do I need to actively manage the investment?",
    answer: "Most EB-5 investors in regional center projects are passive limited partners, allowing them to live and work anywhere in the U.S.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-[32px] bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ReusableHeader
          badge="FAQ"
          title="FREQUENTLY ASKED QUESTIONS"
          description="Find answers to common questions about EB-5 investments, U.S. Immigration, and our Wealth Management services"
          className="pb-16"
        />

        {/* FAQ List Container */}
        <div className="bg-[#F9F9F9] p-4 md:p-12 lg:p-16  flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  "bg-white transition-all duration-300",
                  isOpen ? "shadow-md" : "hover:bg-white/80"
                )}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-6 md:p-8 text-left group"
                >
                  <span className="text-lg md:text-xl font-bold italic text-[#1A1A1A] group-hover:text-primary transition-colors pr-8">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <Minus className="w-6 h-6 text-primary" />
                    ) : (
                      <Plus className="w-6 h-6 text-[#A1A1A1]" />
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-6 md:px-8 pb-8 text-[#666666] text-sm md:text-base leading-relaxed border-t border-[#F1F1F1] pt-6">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
