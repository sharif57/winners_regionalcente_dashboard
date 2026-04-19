"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  return (
    <section className="py-[32px] bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* Left Column: Form */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#F65353]" />
              <span className="text-[#F65353] text-base font-medium tracking-widest uppercase">
                INVESTMENT STRATEGY
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold italic text-secondary leading-tight">
              Start Your EB-5 Journey Today
            </h2>

            <p className="text-[#4C4C4C] text-sm md:text-base leading-relaxed max-w-xl">
              Our immigration experts and financial advisors will evaluate your eligibility and provide a custom investment road map for your family.
            </p>

            {/* Form Fields */}
            <form className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full px-6 py-4 border border-[#989898] focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="w-full px-6 py-4 border border-[#989898] focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-6 py-4 border border-[#989898] focus:outline-none focus:border-primary transition-colors text-sm"
                />
              </div>

              <div className="space-y-2">
                <textarea
                  placeholder="Add Your Note"
                  rows={4}
                  className="w-full px-6 py-4 border border-[#989898] focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                />
              </div>

              <div className="pt-4">
                <Button
                  className="w-full bg-[#C51D1D] hover:bg-[#A31818] text-white py-8 text-base font-bold tracking-widest uppercase rounded-none transition-all duration-300 transform"
                >
                  SUBMIT YOUR EVALUATION REQUEST
                </Button>
              </div>
            </form>
          </div>

          {/* Right Column: Image with Quote Overlay */}
          <div className="w-full lg:w-1/2 relative">
            <div className="h-[850px] w-full overflow-hidden">
              <Image
                src="/image/journey.png"
                alt="Start your journey"
                fill
                className="object-cover"
              />


            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
