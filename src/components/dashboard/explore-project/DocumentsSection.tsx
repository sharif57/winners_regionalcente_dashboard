"use client";

import { Download } from "lucide-react";
import { DocumentItem } from "./types";
import React from "react";

type DocumentsSectionProps = {
    documents: DocumentItem[];
    projectId?: number;
};

async function downloadFile(url: string, filename?: string) {
    try {
        const res = await fetch(url, { mode: "cors" });

        // If fetch fails because of CORS or other reasons, fall back to opening in a new tab
        if (!res.ok) {
            window.open(url, "_blank", "noopener,noreferrer");
            return;
        }

        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename || url.split("/").pop() || "download";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(blobUrl);
    } catch {
        // fallback
        window.open(url, "_blank", "noopener,noreferrer");
    }
}

export default function DocumentsSection({ documents, projectId }: DocumentsSectionProps) {
    return (
        <article className="rounded-md bg-[#E8E9EC52] p-4 sm:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-secondary sm:text-4xl">Documents</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4 sm:gap-4">
                {documents.map((item) => (
                    <div key={item.name} className="rounded-md bg-white p-4">
                        <p className="mb-2 text-xl font-medium text-secondary font-semibold">{item.name}</p>
                        <p className="mb-3 text-base font-normal text-[#4C4C4C]">{item.type}</p>
                        <div className="flex items-center gap-2">
                            <a
                                href={item.url ?? (projectId ? `/dashboard/explore-project/${projectId}` : "/dashboard/explore-project")}
                                target={item.url ? "_blank" : undefined}
                                rel={item.url ? "noopener noreferrer" : undefined}
                                className="flex-1 border text-center border-[#C8C8CA] bg-[#F1F1F2] px-3 py-2 text-base font-bold text-[#121E38]"
                            >
                                VIEW
                            </a>
                            <button
                                type="button"
                                aria-label={`Download ${item.name}`}
                                onClick={() => item.url && downloadFile(item.url, item.name)}
                                disabled={!item.url}
                                className={`grid h-10 w-20 place-items-center text-white ${item.url ? "bg-[#C91E1E]" : "bg-[#E5E7EB] cursor-not-allowed"}`}
                            >
                                <Download size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </article>
    );
}
