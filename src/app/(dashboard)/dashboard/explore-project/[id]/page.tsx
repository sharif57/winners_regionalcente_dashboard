// import type { ReactNode } from "react";
// import type { LucideIcon } from "lucide-react";
// import { ArrowLeftRight, BarChart3, Globe } from "lucide-react";
// import ProjectHero from "@/components/visa/project/ProjectHero";
// import TopStatsBar from "@/components/dashboard/explore-project/TopStatsBar";
// import AboutProjectCard from "@/components/dashboard/explore-project/AboutProjectCard";
// import JobCreationProgressCard from "@/components/dashboard/explore-project/JobCreationProgressCard";
// import { TopStat } from "@/components/dashboard/explore-project/types";

// type ExploreProjectDetailsProps = {
//     params: Promise<{ id: string }>;
// };

// type ReviewFieldProps = {
//     label: string;
//     type?: string;
// };

// type ReviewSectionProps = {
//     number: string;
//     title: string;
//     children: ReactNode;
//     className?: string;
// };

// type StrategyOption = {
//     id: string;
//     label: string;
//     icon: LucideIcon;
//     defaultChecked?: boolean;
// };

// const tabs = ["INVESTOR INFORMATION", "DOCUMENTS", "AGREEMENTS"] as const;

// const personalInformationFields: ReviewFieldProps[] = [
//     { label: "Full name ( Legal )" },
//     { label: "Enter email address", type: "email" },
//     { label: "Phone number", type: "tel" },
//     { label: "Nationality" },
// ];

// const regulatoryFields: ReviewFieldProps[] = [
//     { label: "Current Country of residence" },
//     { label: "Source fo fund" },
// ];

// const strategyOptions: StrategyOption[] = [
//     { id: "immigration", label: "IMMIGRATION", icon: Globe, defaultChecked: true },
//     { id: "profit", label: "PROFIT", icon: BarChart3 },
//     { id: "both", label: "BOTH", icon: ArrowLeftRight },
// ];

// function cn(...classes: Array<string | false | null | undefined>) {
//     return classes.filter(Boolean).join(" ");
// }

// function ReviewField({ label, type = "text" }: ReviewFieldProps) {
//     return (
//         <input
//             type={type}
//             placeholder={label}
//             aria-label={label}
//             className="h-12 w-full border border-[#ECECEE] bg-white px-4 text-[13px] text-[#1F1F1F] shadow-[0_8px_18px_rgba(15,23,42,0.04)] outline-none transition focus:border-[#F65353] focus:ring-1 focus:ring-[#F65353]/20"
//         />
//     );
// }

// function ReviewSection({ number, title, children, className }: ReviewSectionProps) {
//     return (
//         <article className={cn("rounded-sm bg-[#E8E9EC52] p-4 sm:p-5 lg:p-6", className)}>
//             <span className="inline-flex h-6 min-w-6 items-center justify-center bg-[#F65353] px-1.5 text-[11px] font-semibold text-white">
//                 {number}
//             </span>
//             <h2 className="mt-3 text-lg font-semibold italic text-secondary sm:text-2xl">{title}</h2>
//             <div className="mt-5">{children}</div>
//         </article>
//     );
// }

// const topStats: TopStat[] = [
//     { label: "TOTAL PROJECT VALUE", value: "$220M", sub: "" },
//     { label: "MIN. INVESTMENT", value: "$800K", sub: "" },
//     { label: "EXPECTED ROI", value: "5-7%", sub: "( PER ANNUAL )" },
//     { label: "CAPITAL RAISED", value: "$140M", sub: "( 65% FUNDED )" },
//     { label: "DURATION", value: "Jan 2026 - Dec 2028", sub: "" },
// ];

// export default async function ExploreProjectDetailsPage({ params }: ExploreProjectDetailsProps) {
//     const { id } = await params;

//     return (
//         <div>
//             <ProjectHero />
//             <section className="mx-auto w-full  space-y-4 bg-white  p-3 sm:p-4" data-project-id={id}>
//                 <div>
//                     <section className="w-full ">
//                         <TopStatsBar stats={topStats} />

//                         <div className="mb-3 grid grid-cols-1 gap-3 xl:grid-cols-10 sm:mb-4 sm:gap-4">
//                             <AboutProjectCard />
//                             <JobCreationProgressCard />
//                         </div>

//                     </section>
//                 </div>
//                 <article className="rounded-sm bg-[#E8E9EC52] p-4 sm:p-6 lg:p-7">
//                     <h1 className="text-[28px] leading-tight font-semibold italic text-secondary sm:text-4xl">
//                         Review Submitted Details
//                     </h1>

//                     <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium italic tracking-[0.04em] text-[#6A6A6A] sm:gap-x-8">
//                         {tabs.map((tab, index) => (
//                             <button
//                                 key={tab}
//                                 type="button"
//                                 className={cn(
//                                     "transition-colors hover:text-[#F65353]",
//                                     index === 0 && "text-[#F65353]"
//                                 )}
//                             >
//                                 {tab}
//                             </button>
//                         ))}
//                     </div>
//                 </article>

//                 <ReviewSection number="1" title="Personal Information">
//                     <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                         {personalInformationFields.map((field) => (
//                             <ReviewField key={field.label} label={field.label} type={field.type} />
//                         ))}
//                     </div>
//                 </ReviewSection>

//                 <ReviewSection number="2" title="Geographic & Regulatory">
//                     <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//                         {regulatoryFields.map((field) => (
//                             <ReviewField key={field.label} label={field.label} type={field.type} />
//                         ))}
//                     </div>
//                 </ReviewSection>

//                 <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
//                     <ReviewSection number="3" title="Investment Strategy & Amount" className="h-full">
//                         <div className="space-y-4">
//                             <ReviewField label="Invest amount" />

//                             <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                                 {strategyOptions.map((option) => {
//                                     const Icon = option.icon;

//                                     return (
//                                         <label key={option.id} className="cursor-pointer">
//                                             <input
//                                                 type="radio"
//                                                 name={`investment-strategy-${id}`}
//                                                 value={option.id}
//                                                 defaultChecked={option.defaultChecked}
//                                                 className="peer sr-only"
//                                             />
//                                             <span className="flex min-h-[92px] flex-col items-center justify-center gap-2 border border-[#D3D5DA] bg-white px-3 py-4 text-center text-[13px] font-medium text-[#5E5E5E] transition peer-checked:border-[#F65353] peer-checked:bg-[#FFF7F7] peer-checked:text-[#1F1F1F] hover:border-[#F65353]/60">
//                                                 <Icon className="h-5 w-5 text-[#8B8B8B] transition peer-checked:text-[#F65353]" />
//                                                 <span>{option.label}</span>
//                                             </span>
//                                         </label>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     </ReviewSection>

//                     <aside className="flex min-h-[220px] items-center justify-center rounded-sm bg-white px-5 py-8 sm:px-8 xl:min-h-full">
//                         <div className="w-full max-w-[360px] text-center">
//                             <h2 className="text-[28px] font-semibold italic text-secondary sm:text-4xl">
//                                 Update Your Data
//                             </h2>
//                             <button
//                                 type="button"
//                                 className="mt-6 inline-flex w-full items-center justify-center bg-[#C91E1E] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#AD1717] sm:text-base"
//                             >
//                                 Save Now
//                             </button>
//                         </div>
//                     </aside>
//                 </div>
//             </section>
//         </div>
//     );
// }
import AboutProjectCard from "@/components/dashboard/explore-project/AboutProjectCard";
import DocumentsSection from "@/components/dashboard/explore-project/DocumentsSection";
import FundingProgressCard from "@/components/dashboard/explore-project/FundingProgressCard";
import InvestorList from "@/components/dashboard/explore-project/investor-list";
import JobCreationProgressCard from "@/components/dashboard/explore-project/JobCreationProgressCard";
import ProjectTimelineCard from "@/components/dashboard/explore-project/ProjectTimelineCard";
import TopStatsBar from "@/components/dashboard/explore-project/TopStatsBar";
import { DocumentItem, TopStat } from "@/components/dashboard/explore-project/types";
import ProjectHero from "@/components/visa/project/ProjectHero";

const topStats: TopStat[] = [
    { label: "TOTAL PROJECT VALUE", value: "$220M", sub: "" },
    { label: "MIN. INVESTMENT", value: "$800K", sub: "" },
    { label: "EXPECTED ROI", value: "5-7%", sub: "( PER ANNUAL )" },
    { label: "CAPITAL RAISED", value: "$140M", sub: "( 65% FUNDED )" },
    { label: "DURATION", value: "Jan 2026 - Dec 2028", sub: "" },
];

const documents: DocumentItem[] = [
    { name: "Bushiness Plan", type: "PDF . 12MB" },
    { name: "Financial Report", type: "XLSX . 2.2MB" },
    { name: "Legal Documents", type: "PDF .12MB" },
    { name: "Agreement", type: "PDF .12MB" },
];

export default function ExploreProject() {
    return (
        <div>
            <ProjectHero />
            <section className="w-full bg-white p-3 sm:p-4">
                <TopStatsBar stats={topStats} />

                <div className="mb-3 grid grid-cols-1 gap-3 xl:grid-cols-10 sm:mb-4 sm:gap-4">
                    <AboutProjectCard />
                    <JobCreationProgressCard />
                </div>

                <div className="mb-3 grid grid-cols-1 gap-3 lg:grid-cols-2 sm:mb-4 sm:gap-4">
                    <FundingProgressCard />
                    <ProjectTimelineCard />
                </div>

                <DocumentsSection documents={documents} />
                <InvestorList />
            </section>
        </div>
    );
}
