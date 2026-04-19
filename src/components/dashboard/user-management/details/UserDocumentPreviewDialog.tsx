import { X } from "lucide-react";
import type { UserDocument } from "../types";

export default function UserDocumentPreviewDialog({
    sectionTitle,
    document,
    onClose,
}: {
    sectionTitle: string;
    document: UserDocument | null;
    onClose: () => void;
}) {
    if (!document) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/45 p-4">
            <div className="w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-2xl sm:p-7">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm uppercase tracking-[0.18em] text-[#98A2B3]">{sectionTitle}</p>
                        <h3 className="mt-2 text-3xl font-semibold italic text-[#1F1F1F]">
                            {document.title}
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-2 text-[#667085] transition-colors hover:bg-[#F3F4F6] hover:text-[#1F1F1F]"
                        aria-label="Close document preview"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <div className="mt-6 rounded-[22px] bg-[#F7F8FA] p-5">
                    <p className="text-base text-[#5D6169]">{document.subtitle}</p>
                    <p className="mt-4 text-lg font-medium text-[#1F1F1F]">{document.fileName}</p>
                    <div className="mt-6 rounded-[18px] border border-dashed border-[#CBD5E1] bg-white p-6">
                        <p className="text-lg leading-relaxed text-[#344054]">{document.previewText}</p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 items-center justify-center border border-[#D5D8DE] px-5 text-lg font-medium text-[#1F2937] transition-colors hover:bg-[#F8FAFC]"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
