/* eslint-disable @next/next/no-img-element */
"use client";

import { useProjectInvestmentsQuery } from "@/redux/feature/dashboardSlice";
import React, { useMemo } from "react";

type Investment = {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    nationality: string;
    current_country_of_residence: string;
    source_of_funds: string;
    investment_amount: string;
    investment_strategy: string;
    status: "pending" | "approved" | "rejected";
    passport_copy: string;
    proof_of_address: string;
    proof_of_funds: string;
    bank_statements: string;
    upload_agreement: string;
    created_at: string;
    updated_at: string;
    user: number;
    project: number;
    profile_image: string;
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "approved":
            return "bg-[#038862] text-white";
        case "pending":
            return "bg-[#F59E0B] text-white";
        case "rejected":
            return "bg-[#F65353] text-white";
        default:
            return "bg-[#EAECF0] text-[#1F1F1F]";
    }
};

const formatCurrency = (value: string | number) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num);
};

export default function MyProjects() {
    const { data, isLoading } = useProjectInvestmentsQuery(undefined);

    const investments = useMemo<Investment[]>(
        () => data?.data?.results ?? [],
        [data]
    );

    console.log(investments)

    if (isLoading) {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-5 h-full bg-white px-6 py-4 duration-1000">
                <h3 className="mb-8 text-lg font-semibold italic text-[#1F1F1F] lg:text-[28px]">
                    Latest Investors
                </h3>
                <div className="flex items-center justify-center py-8">
                    <p className="text-[#667085]">Loading investments...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-5 h-full bg-white px-6 py-4 duration-1000 flex flex-col">
            <h3 className="mb-8 text-lg font-semibold italic text-[#1F1F1F] lg:text-[28px]">
                Latest Investors ({investments.length})
            </h3>

            <div className="space-y-4">
                {investments.length > 0 ? (
                    investments.map((investment) => (
                        <div
                            key={investment.id}
                            className="flex flex-col gap-6 rounded-sm bg-[#F9FAFB] p-6 transition-all hover:shadow-md md:flex-row md:items-center md:justify-between "
                        >
                            {/* LEFT SIDE */}
                            <div className="flex items-center gap-6">
                                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white bg-gray-200 shadow-sm lg:h-20 lg:w-20">
                                    <div className="flex h-full w-full items-center justify-center bg-[#121E38] text-xs text-white overflow-hidden">
                                        {investment?.profile_image ? (
                                            <img
                                                src={investment.profile_image}
                                                alt={investment.full_name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            investment?.full_name?.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-base font-bold italic text-[#1F1F1F] lg:text-xl">
                                        {investment.full_name}
                                    </h4>
                                    <p className="text-base font-medium text-[#696969]">
                                        {formatCurrency(investment.investment_amount)} invested
                                    </p>
                                    <p className="text-sm text-[#667085]">{investment.email}</p>
                                </div>
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="flex flex-col gap-3 md:min-w-[200px] md:items-end">
                                <span
                                    className={`self-start rounded-sm px-4 py-1.5 text-lg font-medium uppercase md:self-auto ${getStatusColor(
                                        investment.status
                                    )}`}
                                >
                                    {investment.status}
                                </span>
                                {/* <div className="space-y-1 text-right text-sm">
                                    <p className="text-[#667085]">
                                        <span className="font-semibold text-[#1F1F1F]">Strategy:</span> {investment.investment_strategy}
                                    </p>
                                    <p className="text-[#667085]">
                                        <span className="font-semibold text-[#1F1F1F]">{investment.current_country_of_residence}</span>
                                    </p>
                                </div> */}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="rounded-sm border border-[#EAECF0] bg-white p-8 text-center text-[#667085]">
                        No investments found
                    </div>
                )}
            </div>
        </div>
    );
}
