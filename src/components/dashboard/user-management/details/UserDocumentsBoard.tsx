import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserDocument, UserDocumentSection } from "../types";

export default function UserDocumentsBoard({
    sections,
    onDocumentView,
}: {
    sections: UserDocumentSection[];
    onDocumentView: (sectionTitle: string, document: UserDocument) => void;
}) {
    return (
        <>
            {sections.map((section) => (
                <article
                    key={section.id}
                    className="rounded-[24px] bg-[#F7F8FA] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:p-6"
                >
                    <div className="flex items-center gap-3">
                        <span className="inline-flex size-9 items-center justify-center bg-[#667085] text-sm font-semibold text-white">
                            {section.step}
                        </span>
                        <h4 className="text-[22px] font-semibold italic text-[#1F1F1F] sm:text-[26px]">
                            {section.title}
                        </h4>
                    </div>

                    <div
                        className={cn(
                            "mt-6 grid gap-4",
                            section.documents.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
                        )}
                    >
                        {section.documents.map((document) => (
                            <div key={document.id} className="rounded-[20px] bg-white p-5 shadow-sm">
                                <FileText className="size-9 text-[#6B7280]" strokeWidth={1.6} />
                                <h5 className="mt-6 text-[20px] font-medium text-[#1F1F1F] sm:text-[22px]">
                                    {document.title}
                                </h5>
                                <p className="mt-2 text-base leading-relaxed text-[#5D6169]">
                                    {document.subtitle}
                                </p>

                                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="break-all text-base text-[#3D4148]">{document.fileName}</p>
                                    <button
                                        type="button"
                                        onClick={() => onDocumentView(section.title, document)}
                                        className="inline-flex h-11 items-center justify-center border border-[#D5D8DE] px-6 text-lg font-semibold text-[#1F2937] transition-colors hover:bg-[#F8FAFC]"
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            ))}
        </>
    );
}
