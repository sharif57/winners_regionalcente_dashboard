"use client";

import { useGetAdminDashboardQuery } from "@/redux/feature/dashboardSlice";

export default function StatsBar() {
    const { data: dashboardData, isLoading } = useGetAdminDashboardQuery();

    const portfolioStats = [
        {
            label: "TOTAL USERS",
            value: dashboardData?.data?.total_users?.toLocaleString() ?? "0",
        },
        {
            label: "TOTAL INVESTMENT",
            value: dashboardData?.data?.total_investments?.toLocaleString() ?? "0",
        },
        {
            label: "ACTIVE  PROJECT",
            value: dashboardData?.data?.active_projects?.toLocaleString() ?? "0",
        },
        {
            label: "PENDING REQUEST",
            value: dashboardData?.data?.pending_investments?.toLocaleString() ?? "0",
            labelClassName: "text-[#F65353]",
        },
    ];

    return (
        <div className="mb-5 bg-white px-4 py-4 sm:mb-7 sm:px-6 sm:py-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0">
                {portfolioStats.map((item, index) => (
                    <div
                        key={item.label}
                        className={`px-3 sm:px-4 xl:px-6 ${index !== portfolioStats.length - 1
                            ? "xl:border-r xl:border-[#C9C9CB]"
                            : ""
                            }`}
                    >
                        {isLoading ? (
                            <div className="space-y-3">
                                <div className="h-4 w-32 animate-pulse bg-gray-200" />
                                <div className="h-10 w-24 animate-pulse bg-gray-200" />
                            </div>
                        ) : (
                            <>
                                <p
                                    className={`text-base leading-tight font-normal uppercase ${item.labelClassName ?? "text-secondary"}`}
                                >
                                    {item.label}
                                </p>
                                <p className={`mt-1 text-2xl lg:text-[32px]  font-black italic text-[#1F1F1F] sm:text-[40px] ${item.labelClassName ?? "text-secondary"}`}>
                                    {item.value}
                                </p>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
