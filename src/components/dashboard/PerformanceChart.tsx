"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Data
const yearlyData = [
  { label: "2020", value: 4200 },
  { label: "2021", value: 5800 },
  { label: "2022", value: 7100 },
  { label: "2023", value: 6500 },
  { label: "2024", value: 8200 },
  { label: "2025", value: 8900 },
  { label: "2026", value: 9500 },
];

const monthlyData = [
  { label: "Jan", value: 6200 },
  { label: "Feb", value: 6800 },
  { label: "Mar", value: 7100 },
  { label: "Apr", value: 6900 },
  { label: "May", value: 7400 },
  { label: "Jun", value: 8100 },
  { label: "Jul", value: 8500 },
  { label: "Aug", value: 8900 },
  { label: "Sep", value: 9200 },
  { label: "Oct", value: 8800 },
  { label: "Nov", value: 9100 },
  { label: "Dec", value: 9500 },
];

export default function PerformanceChart() {
  const [view, setView] = useState<"Yearly" | "Monthly">("Monthly");

  const data = view === "Yearly" ? yearlyData : monthlyData;

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
              formatter={(value: number) => [value.toLocaleString(), "Value"]}
            />
            <Bar dataKey="value" fill="#434D64" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}