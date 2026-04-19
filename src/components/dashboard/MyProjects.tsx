"use client";

import React from "react";

const myProjects = [
    { name: "Alexandar Moti", invested: "sharifmahamud@gmail.com", status: "Confirm" },
    { name: "Alexandar Moti", invested: "sharifmahamud@gmail.com",  status: "Confirm" },
    { name: "Alexandar Moti", invested: "sharifmahamud@gmail.com", status: "Confirm" },
];

export default function MyProjects() {
    return (
        <div className="bg-white px-6  py-4 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <h3 className="text-[#1F1F1F]  text-lg lg:text-[28px] font-semibold italic mb-8">
              Latest Investor
            </h3>

            <div className="space-y-4I. I. ">
                {myProjects.map((project, index) => (
                    <div
                        key={index}
                        className="bg-[#F9FAFB] p-6 lg:p-8 
      flex flex-col md:flex-row md:items-center 
      gap-6 justify-between hover:shadow-md transition-all"
                    >

                        {/* LEFT SIDE */}
                        <div className="flex items-center gap-6 ">

                            <div
                                className="w-16 h-16 lg:w-20 lg:h-20 
          bg-gray-200 rounded-full overflow-hidden 
          shrink-0 border-2 border-white shadow-sm"
                            >

                                <div
                                    className="bg-[#121E38] w-full h-full 
            flex items-center justify-center 
            text-white text-xs"
                                >
                                    IMG
                                </div>

                            </div>

                            <div className="space-y-1">
                                <h4
                                    className="text-[#1F1F1F] 
            text-base lg:text-xl 
            font-bold italic"
                                >
                                    {project.name}
                                </h4>

                                <p
                                    className="text-[#696969] 
            text-base font-medium"
                                >
                                    {project.invested} invested
                                </p>
                            </div>

                        </div>

                

                        {/* RIGHT SIDE */}
                        <div
                            className="flex flex-col 
        md:items-end gap-3 
        md:min-w-[200px]"
                        >

                            <span
                                className="bg-[#038862] text-white 
          text-lg font-medium 
          px-4 py-1.5 
          uppercase rounded-sm 
          self-start md:self-auto"
                            >
                                {project.status}
                            </span>

                          

                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
