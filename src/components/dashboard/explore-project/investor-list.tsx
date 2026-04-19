"use client";

import React from "react";
import Image from "next/image";
import { Trash2, Eye, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const investors = [
    {
        id: "#3066",
        name: "Olivia Rhye",
        amount: "$800 k",
        email: "qwed45454@gma",
        phone: "01758498545",
        country: "Bangladesh",
        date: "12 March, 2026",
        status: "Active",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    },
    {
        id: "#3066",
        name: "Olivia Rhye",
        amount: "$800 k",
        email: "qwed45454@gma",
        phone: "01758498545",
        country: "Bangladesh",
        date: "12 March, 2026",
        status: "Active",
        image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=150&auto=format&fit=crop",
    },
    {
        id: "#3066",
        name: "Olivia Rhye",
        amount: "$800 k",
        email: "qwed45454@gma",
        phone: "01758498545",
        country: "Bangladesh",
        date: "12 March, 2026",
        status: "Active",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
    },
];

export default function InvestorList() {
    return (
        <div className=" overflow-hidden  animate-in fade-in duration-500">
            <div className="p-4 ">
                <h2 className="text-[#1F1F1F] text-xl lg:text-[24px] font-bold italic mb-6">
                    Investor List
                </h2>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-[#E8E9EC80] border-y border-[#EAECF0]">
                                <th className="p-4 w-12 text-center">
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-[#D0D5DD] text-[#121E38] focus:ring-[#121E38] cursor-pointer"
                                        />
                                    </div>
                                </th>
                                <th className="p-4 text-[13px] font-semibold text-[#667085] uppercase tracking-wider">
                                    <div className="flex items-center gap-1 italic">
                                        ID <ArrowDown size={14} className="text-[#667085]" />
                                    </div>
                                </th>
                                <th className="p-4 text-[13px] font-semibold text-[#667085] uppercase tracking-wider italic">
                                    NAME
                                </th>
                                <th className="p-4 text-[13px] font-semibold text-[#667085] uppercase tracking-wider italic">
                                    INVESTED AMOUNT
                                </th>
                                <th className="p-4 text-[13px] font-semibold text-[#667085] uppercase tracking-wider italic">
                                    GMAIL
                                </th>
                                <th className="p-4 text-[13px] font-semibold text-[#667085] uppercase tracking-wider italic">
                                    PHONE
                                </th>
                                <th className="p-4 text-[13px] font-semibold text-[#667085] uppercase tracking-wider italic">
                                    COUNTRY
                                </th>
                                <th className="p-4 text-[13px] font-semibold text-[#667085] uppercase tracking-wider italic">
                                    JOINING DATE
                                </th>
                                <th className="p-4 text-[13px] font-semibold text-[#667085] uppercase tracking-wider italic">
                                    STATUS
                                </th>
                                <th className="p-4 text-[13px] font-semibold text-[#667085] uppercase tracking-wider italic">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {investors.map((investor, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-[#EAECF0] hover:bg-gray-50/50 transition-colors"
                                >
                                    <td className="p-4 text-center">
                                        <div className="flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-[#D0D5DD] text-[#121E38] focus:ring-[#121E38] cursor-pointer"
                                            />
                                        </div>
                                    </td>
                                    <td className="p-4 text-[14px] text-[#344054] font-medium font-sans">
                                        {investor.id}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                                                <Image
                                                    src={investor.image}
                                                    alt={investor.name}
                                                    width={80}
                                                    height={80}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="text-[15px] font-medium text-[#1F1F1F]">
                                                {investor.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-[14px] text-[#475467] font-medium">
                                        {investor.amount}
                                    </td>
                                    <td className="p-4 text-[14px] text-[#475467] font-medium">
                                        {investor.email}
                                    </td>
                                    <td className="p-4 text-[14px] text-[#475467] font-medium">
                                        {investor.phone}
                                    </td>
                                    <td className="p-4 text-[14px] text-[#475467] font-medium">
                                        {investor.country}
                                    </td>
                                    <td className="p-4 text-[14px] text-[#475467] font-medium">
                                        {investor.date}
                                    </td>
                                    <td className="p-4">
                                        <span className="bg-[#D1D5DB] bg-opacity-40 text-[#3D475C] text-[13px] font-semibold px-3 py-1 rounded-sm tracking-wide">
                                            Avtive
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <button className="text-[#667085] hover:text-red-600 transition-colors transform hover:scale-110">
                                                <Trash2 size={20} strokeWidth={1.5} />
                                            </button>
                                            <button className="text-[#667085] hover:text-[#121E38] transition-colors transform hover:scale-110">
                                                <Eye size={20} strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
