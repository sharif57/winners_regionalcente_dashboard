"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ReusableHeader from "@/hook/resuable-header";
import { cn } from "@/lib/utils";

const newsItems = [
  {
    id: 1,
    image: "/image/news-1.png",
    date: "March 10, 2026",
    readTime: "5 min read",
    title: "Understanding the Latest EB-5 Visa Updates in 2026",
    excerpt: "Recent policy updates have introduced new opportunities and requirements for investors. Here's what you need to know...",
    href: "/news/eb5-updates-2026",
  },
  {
    id: 2,
    image: "/image/news-2.png",
    date: "March 10, 2026",
    readTime: "5 min read",
    title: "Top U.S. Cities for Real Estate Investment in 2026",
    excerpt: "Explore why Texas continues to attract global investors and how EB-5 projects are shaping the market...",
    href: "/news/top-cities-2026",
  },
  {
    id: 3,
    image: "/image/news-3.png",
    date: "March 10, 2026",
    readTime: "5 min read",
    title: "Step-by-Step Guide to the EB-5 Application Process",
    excerpt: "A simplified breakdown of the EB-5 journey from investment selection to green card approval.",
    href: "/news/eb5-guide",
  },
];

export default function NewsSection() {
  return (
    <section className="py-[32px] bg-[#E8E9EC52]">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ReusableHeader
          badge="NEWS & INSIGHTS"
          title="Stay Informed With Market Insights"
          description=""
          className="pb-12"
        />

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Card Content */}
              <div className="p-8 flex flex-col flex-grow space-y-4">
                {/* Metadata */}
                <div className="flex justify-between items-center text-base font-normal text-accent tracking-wide">
                  <span>{item.date}</span>
                  <span>{item.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold italic text-secondary leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-accent text-base font-normal  flex-grow">
                  {item.excerpt}
                </p>

                {/* CTA Link */}
                <div className="pt-4">
                  <Link
                    href={item.href}
                    className="inline-flex items-center justify-between gap-2 text-base w-full font-bold tracking-widest text-secondary hover:text-primary transition-colors"
                  >
                    READ ARTICLE
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls Mockup */}
        <div className="flex items-center justify-center gap-6 mt-16 text-[#1A1A1A]">
          <button className="p-2 hover:text-primary transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "w-2.5 h-2.5 rounded-full",
                  i === 1 ? "bg-primary" : "bg-[#D1D1D1]"
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
