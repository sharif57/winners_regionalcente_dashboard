"use client";

import React from "react";

export default function JobProgress() {
    return (
         <article className=" bg-white h-[430px] px-5 py-10 xl:col-span-3">
            <p className="text-center text-xl font-semibold italic text-semibold sm:text-2xl">Job Creation Progress</p>
            <div className="mx-auto my-4 grid h-36 w-36 place-items-center rounded-full border-[10px] border-[#99A0AC] border-r-[#038862] border-b-[#038862] border-l-[#038862] sm:h-56 sm:w-56 sm:border-[14px]">
                <span className="text-[38px] font-black text-[#1F1F1F] sm:text-[40px]">30%</span>
            </div>
            <p className="text-center text-[16px] leading-tight text-[#1F1F1F] sm:text-lg font-medium">
                850 / 1200 jobs required for residency qualification.
            </p>
        </article>
    );
}
