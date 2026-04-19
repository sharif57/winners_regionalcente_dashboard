"use client";

import React from "react";
import { ArrowLeft, MapPin, Calendar, Upload, FileText, Image as ImageIcon, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const CreateProjectPage = () => {
    const router = useRouter();

    return (
        <div className=" pb-20 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 px-4 lg:px-0">
                <div className="flex items-start gap-4">
                    <button
                        onClick={() => router.back()}
                        className="mt-1 text-[#1F1F1F] hover:text-[#B21F1F] transition-colors"
                    >
                        <ArrowLeft size={28} />
                    </button>
                    <div className="space-y-1">
                        <h1 className="text-[#1F1F1F] text-2xl lg:text-[32px] font-bold italic">Create Project</h1>
                        <p className="text-[#696969] text-sm lg:text-[15px] max-w-2xl leading-relaxed">
                            Initialize a new institutional investment project. Ensure all financial parameters and visual assets align with the Winners Regional quality standards.
                        </p>
                    </div>
                </div>
                <Button className="bg-[#B21F1F] hover:bg-[#8B1818] text-white font-bold px-10 py-6 text-sm tracking-widest rounded-none uppercase transition-all whitespace-nowrap">
                    SAVE & LIVE NOW
                </Button>
            </header>

            {/* Form Sections */}
            <div className="space-y-6">
                {/* 1. Project Identity */}
                <section className="bg-white p-6 lg:p-10 rounded-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-8 h-8 bg-[#9BA3AF] text-white flex items-center justify-center  font-bold text-sm">
                            1
                        </div>
                        <h2 className="text-[#1F1F1F] text-lg lg:text-2xl font-semibold italic">Project Identity</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#E8E9EC52] p-3 rounded-lg">
                        {/* Left Side: Name and Description */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-[#667085] ml-1">Project name</label>
                                <input
                                    type="text"
                                    placeholder="Project name"
                                    className="w-full p-4 bg-white border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#B21F1F] text-base font-normal"
                                />
                            </div>
                            <div className="space-y-2 h-[240px] flex flex-col">
                                <label className="text-xs font-medium text-[#667085] ml-1">Short Description</label>
                                <textarea
                                    placeholder="Short Description"
                                    className="w-full flex-1 p-4 bg-white border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#B21F1F] text-base font-normal resize-none"
                                />
                            </div>
                        </div>

                        {/* Right Side: Details */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-[#667085] ml-1">City</label>
                                <input type="text" placeholder="City" className="w-full p-4 bg-white border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#B21F1F] text-base font-normal" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-[#667085] ml-1">State</label>
                                <input type="text" placeholder="State" className="w-full p-4 bg-white border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#B21F1F] text-base font-normal" />
                            </div>
                            <div className="space-y-2 relative">
                                <label className="text-xs font-medium text-[#667085] ml-1">Location</label>
                                <input type="text" placeholder="Location" className="w-full p-4 bg-white border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#B21F1F] text-[15px]" />
                                <MapPin size={18} className="absolute right-4 bottom-7 text-[#667085]" />
                            </div>
                            <div className="space-y-2 relative">
                                <label className="text-xs font-medium text-[#667085] ml-1">Project duration</label>
                                <div className="w-full p-4 bg-white border border-[#EAECF0] rounded-sm text-[#667085] text-base font-normal">
                                    12 March, 2025 -
                                </div>
                                <Calendar size={18} className="absolute right-4 bottom-4 text-[#667085]" />
                            </div>
                            <div className="p-4 bg-white border border-[#EAECF0] rounded-sm flex items-center justify-between">
                                <span className="text-[14px] text-[#667085] font-medium">EB - 5 enable</span>
                                <div className="w-5 h-5 border-2 border-[#D0D5DD] rounded-sm flex items-center justify-center cursor-pointer">
                                    {/* Check icon if enabled */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Financial Parameters */}
                <section className="bg-[#F9FAFB] p-6 lg:p-10 rounded-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-8 h-8 bg-[#9BA3AF] text-white flex items-center justify-center  font-bold text-sm">
                            2
                        </div>
                        <h2 className="text-[#1F1F1F] text-lg lg:text-2xl font-semibold italic">Financial Parameters</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#667085] ml-1">Total project value</label>
                            <input type="text" placeholder="Total project value" className="w-full p-4 bg-white border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#B21F1F] text-[15px]" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#667085] ml-1">Minimum Investment</label>
                            <input type="text" placeholder="Minimum Investment" className="w-full p-4 bg-white border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#B21F1F] text-[15px]" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#667085] ml-1">ROI</label>
                            <input type="text" placeholder="ROI" className="w-full p-4 bg-white border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#B21F1F] text-[15px]" />
                        </div>
                    </div>
                </section>

                {/* 3. Upload Documents */}
                <section className="bg-[#F9FAFB] p-6 lg:p-10 rounded-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-8 h-8 bg-[#9BA3AF] text-white flex items-center justify-center  font-bold text-sm">
                            3
                        </div>
                        <h2 className="text-[#1F1F1F] text-lg lg:text-2xl font-semibold italic">Upload Documents</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Business Plan", info: "PDF . 12MB" },
                            { title: "Financial Report", info: "Please upload it" },
                            { title: "Legal Documents", info: "PDF . 12MB" },
                            { title: "Agreement", info: "PDF . 12MB" }
                        ].map((doc, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-sm border border-[#EAECF0] space-y-4">
                                <div className="space-y-1">
                                    <h3 className="text-[#1F1F1F] text-base lg:text-lg font-bold">{doc.title}</h3>
                                    <p className="text-[#667085] text-xs uppercase tracking-wider">{doc.info}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="flex-1 py-2 text-xs font-bold border border-[#EAECF0] hover:bg-gray-50 transition-colors uppercase tracking-widest">VIEW</button>
                                    <button className="flex-1 py-2 text-xs font-bold border border-[#EAECF0] hover:bg-gray-50 transition-colors uppercase tracking-widest">UPLOAD NOW</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. Visual Assets */}
                <section className="bg-[#F9FAFB] p-6 lg:p-10 rounded-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-8 h-8 bg-[#9BA3AF] text-white flex items-center justify-center font-bold text-sm">
                            4
                        </div>
                        <h2 className="text-[#1F1F1F] text-lg lg:text-2xl font-semibold italic">Visual Assets</h2>
                    </div>

                    <div className="bg-white border-[1px] border-[#EAECF0] border-dashed rounded-sm py-20 flex flex-col items-center justify-center text-center px-6">
                        <h3 className="text-[#1F1F1F] text-xl lg:text-2xl font-bold italic mb-6">Add a Banner of Your Project</h3>

                        <div className="w-[84px] h-[84px] bg-[#F9FAFB] border border-[#EAECF0] rounded-sm flex items-center justify-center mb-6">
                            <ImageIcon className="text-[#667085] w-8 h-8" />
                        </div>

                        <h4 className="text-[#1F1F1F] text-base font-bold mb-2">Drop Project Media</h4>
                        <p className="text-[#667085] text-sm">
                            Drag and drop architectural renders or <span className="underline cursor-pointer text-[#B21F1F]">browse local files</span>.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CreateProjectPage;
