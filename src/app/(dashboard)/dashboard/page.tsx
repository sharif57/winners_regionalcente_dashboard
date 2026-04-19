import React from "react";
import StatsBar from "@/components/dashboard/StatsBar";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import JobProgress from "@/components/dashboard/JobProgress";
import MyProjects from "@/components/dashboard/MyProjects";
import AlertList from "@/components/dashboard/AlertList";
import EliteOpportunities from "@/components/dashboard/EliteOpportunities";

export default function DashboardPage() {
    return (
        <div className="space-y-8 ">
            {/* Top Metrics Row */}
            <StatsBar />

            {/* Charts Section: Performance and Job Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[28px]">
                <div className="lg:col-span-8">
                    <PerformanceChart />
                </div>
                <div className="lg:col-span-4">
                    <JobProgress />
                </div>
            </div>

            {/* Content Section: My Projects and Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[28px]">
                <div className="lg:col-span-8">
                    <MyProjects />
                </div>
                <div className="lg:col-span-4">
                    <AlertList />
                </div>
            </div>

            {/* Opportunities Section */}
            <EliteOpportunities />
        </div>
    );
}
