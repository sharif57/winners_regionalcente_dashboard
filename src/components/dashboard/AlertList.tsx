/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSupportQueriesQuery } from "@/redux/feature/notificationSlice";
import Link from "next/link";




export default function AlertList() {

    const { data } = useSupportQueriesQuery(undefined);
    console.log(data, '========5')

    return (
        <div className="h-full bg-white p-6  animate-in fade-in slide-in-from-right-5 duration-1000 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#1F1F1F]  text-lg lg:text-[28px] font-semibold italic ">
                    Support Queries
                </h3>
                <Link href="/dashboard/support" className="text-[#F65353] text-sm font-medium border border-[#F65353] px-3 py-1  hover:bg-[#F65353] hover:text-white transition-colors">
                    View All
                </Link>
            </div>

            <div className="space-y-4 overflow-y-auto">
                {data?.data?.map((alert: any, index: any) => (
                    <div
                        key={index}
                        className="bg-[#F9FAFB] p-5 lg:p-6 flex items-start gap-4 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all rounded-sm"
                    >
                        <div className="w-4 h-4 rounded-full bg-[#038862] shrink-0 mt-1" />
                        <div className="space-y-1">
                            <h4 className="text-[#1F1F1F] text-[15px] font-bold">
                                {alert?.message}
                            </h4>
                            <p className="text-[#696969] text-xs lg:text-sm leading-relaxed">
                                {alert?.user_name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}
