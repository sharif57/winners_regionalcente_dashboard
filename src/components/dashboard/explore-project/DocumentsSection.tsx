import { Download } from "lucide-react";
import { DocumentItem } from "./types";
import Link from "next/link";

type DocumentsSectionProps = {
    documents: DocumentItem[];
};

export default function DocumentsSection({ documents }: DocumentsSectionProps) {
    return (
        <article className="rounded-md bg-[#E8E9EC52] p-4 sm:p-6">
            <h2 className="mb-4 text-2xl font-semibold text-secondary sm:text-4xl">Documents</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4 sm:gap-4">
                {documents.map((item) => (
                    <div key={item.name} className="rounded-md bg-white p-4">
                        <p className="mb-2 text-xl font-medium text-secondary font-semibold">{item.name}</p>
                        <p className="mb-3 text-base font-normal text-[#4C4C4C]">{item.type}</p>
                        <div className="flex items-center gap-2">
                            <Link
                                href="/dashboard/explore-project/1"
                                type="button"
                                className="flex-1 border text-center border-[#C8C8CA] bg-[#F1F1F2] px-3 py-2 text-base font-bold text-[#121E38]"
                            >
                                VIEW
                            </Link>
                            <button
                                type="button"
                                aria-label={`Download ${item.name}`}
                                className="grid h-[40px] w-[80px] place-items-center bg-[#C91E1E] text-white"
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
