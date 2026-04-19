import Image from "next/image";
import { cn } from "@/lib/utils";
import type { UserProject } from "../types";

export default function UserProjectList({ projects }: { projects: UserProject[] }) {
    return (
        <section className="space-y-4">
            <h3 className="text-[28px] font-semibold italic text-[#1F1F1F] sm:text-[34px]">
                Project List
            </h3>

            <div className="space-y-4">
                {projects.map((project) => (
                    <article
                        key={project.id}
                        className="flex flex-col gap-5 rounded-[24px] bg-[#F7F8FA] px-5 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:px-6 lg:flex-row lg:items-center lg:justify-between"
                    >
                        <div className="flex items-center gap-4 sm:gap-5">
                            <div className="relative size-[78px] overflow-hidden rounded-full bg-white">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="78px"
                                />
                            </div>

                            <div>
                                <h4 className="text-[22px] font-semibold italic text-[#1F1F1F] sm:text-[26px]">
                                    {project.title}
                                </h4>
                                <p className="mt-2 text-xl text-[#4B5563]">{project.invested}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 lg:w-[42%] lg:min-w-[320px] lg:flex-row lg:items-center lg:justify-end">
                            <div className="flex-1 lg:max-w-[280px]">
                                <div className="h-3 overflow-hidden rounded-full bg-[#D9DDE3]">
                                    <div
                                        className="h-full rounded-full bg-[#434D64]"
                                        style={{ width: `${project.progress}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-4 lg:min-w-[170px] lg:flex-col lg:items-end">
                                <span
                                    className={cn(
                                        "inline-flex min-w-[92px] items-center justify-center rounded-md px-4 py-2 text-xl",
                                        project.status === "Active"
                                            ? "bg-[#069668] text-white"
                                            : "bg-[#E7F8F2] text-[#038862]"
                                    )}
                                >
                                    {project.status}
                                </span>
                                <p className="text-[18px] font-medium text-[#333333] sm:text-[20px]">
                                    {project.progress}% Completed
                                </p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
