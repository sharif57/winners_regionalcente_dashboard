"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useGetAdminDashboardQuery } from "@/redux/feature/dashboardSlice";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

type ChartData = {
  label: string;
  value: number;
};

export default function PerformanceChart() {
  const [view, setView] = useState<"Yearly" | "Monthly">("Monthly");
  const { data: dashboardData, isLoading } = useGetAdminDashboardQuery();

  const monthlyData: ChartData[] =
    dashboardData?.data?.investor_growth?.labels?.map((label, index) => ({
      label,
      value: dashboardData?.data?.investor_growth?.data?.[index] ?? 0,
    })) ?? [];

  const yearlyData: ChartData[] =
    monthlyData.length > 0
      ? [
        {
          label: "This Year",
          value: monthlyData.reduce((sum, item) => sum + item.value, 0),
        },
      ]
      : [];

  const data = (view === "Yearly" ? yearlyData : monthlyData).length
    ? view === "Yearly"
      ? yearlyData
      : monthlyData
    : [{ label: "-", value: 0 }];

  return (
    <div className="w-full  mx-auto bg-white text-[#1F1F1F] p-8 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold italic text-secondary">Portfolio Performance</h2>
        </div>

        {/* Toggle Buttons */}
        <div className="flex bg-gray-100 rounded-xl p-1">
          {["Yearly", "Monthly"].map((mode) => (
            <button
              key={mode}
              onClick={() => setView(mode as "Yearly" | "Monthly")}
              className={cn(
                "px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all",
                view === mode
                  ? "bg-white text-[#1F1F1F] shadow-sm"
                  : "text-gray-500 hover:text-[#1F1F1F]"
              )}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>


      {/* Chart Area */}
      <div className="h-[290px]">
        {isLoading ? (
          <div className="h-full w-full animate-pulse bg-gray-100" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(31, 31, 31, 0.06)" }}
                formatter={(value) => [
                  typeof value === "number" ? value.toLocaleString() : String(value ?? ""),
                  "Value",
                ]}
              />
              <Bar dataKey="value" fill="#434D64" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}