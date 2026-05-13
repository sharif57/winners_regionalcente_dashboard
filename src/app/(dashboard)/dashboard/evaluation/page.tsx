"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Download, Check, X } from "lucide-react";
import { useAgreementDetailsQuery, useUserAgreementsQuery, useUserAgreementStepReviewMutation } from "@/redux/feature/evaluationSlice";

type EvaluationStatus = "all" | "pending" | "step1" | "step2" | "step3" | "step4" | "step5" | "step6";

type EvaluationRow = {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
    step: number;
    stepStatus: string;
    forms: Array<{
        name: string;
        status: "Completed" | "Pending";
        url?: string;
    }>;
};

type UserAgreementItem = {
    user_id: number;
    user_name: string;
    user_email: string;
    user_phone: string;
    completed_steps: number;
    current_step: number;
    step_label: string;
    step_status: string;
};

type SubmittedDocument = {
    id: number;
    user_name: string;
    user_email: string;
    step: number;
    title: string;
    download_file?: string;
    signed_file?: string;
    status: "approved" | "rejected" | "submitted" | string;
    admin_note?: string;
    submitted_at?: string;
    reviewed_at?: string | null;
};

type AgreementDetailsResponse = {
    status: string;
    code: number;
    message: string;
    data?: {
        user_id: number;
        user_name: string;
        user_email: string;
        total_steps: number;
        current_step: number;
        submitted_documents: SubmittedDocument[];
    };
};

type UserAgreementsResponse = {
    status: string;
    code: number;
    message: string;
    data: UserAgreementItem[];
};

type ModalState = {
    isOpen: boolean;
    evaluationId: number | null;
    evaluationName: string;
};

const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
        case "completed":
            return "text-[#038862]";
        case "in_progress":
        case "pending":
            return "text-[#F65353]";
        default:
            return "text-[#F65353]";
    }
};

const getInitials = (name: string): string => {
    const initials = name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");

    return initials || "U";
};

export default function Evaluation() {
    const [activeTab, setActiveTab] = useState<EvaluationStatus>("all");
    const [modal, setModal] = useState<ModalState>({
        isOpen: false,
        evaluationId: null,
        evaluationName: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewLoadingId, setReviewLoadingId] = useState<number | null>(null);
    const itemsPerPage = 6;

    const { data: userAgreementsData } = useUserAgreementsQuery(undefined) as {
        data?: UserAgreementsResponse;
    };

    const { data: userAgreementDetails } = useAgreementDetailsQuery(modal.evaluationId as number, {
        skip: !modal.isOpen || modal.evaluationId == null,
    }) as {
        data?: AgreementDetailsResponse;
    };

    const [userAgreementStepReview] = useUserAgreementStepReviewMutation();

    const evaluationData = useMemo<EvaluationRow[]>(() => {
        const items = userAgreementsData?.data ?? [];

        return items.map((item) => ({
            id: item.user_id,
            name: item.user_name,
            email: item.user_email,
            phone: item.user_phone || "-",
            status: item.step_label || `Step ${item.current_step}`,
            step: item.current_step,
            stepStatus: item.step_status,
            forms: [
                {
                    name: item.step_label || `Step ${item.current_step}`,
                    status: item.step_status === "completed" ? "Completed" : "Pending",
                    url: "#",
                },
            ],
        }));
    }, [userAgreementsData]);

    const filteredData = useMemo(() => {
        if (activeTab === "all") {
            return evaluationData;
        }

        if (activeTab === "pending") {
            return evaluationData.filter((item) => item.stepStatus.toLowerCase() !== "completed");
        }

        const stepNumber = Number(activeTab.replace("step", ""));
        return evaluationData.filter((item) => item.step === stepNumber);
    }, [activeTab, evaluationData]);

    const totalPages = Math.max(Math.ceil(filteredData.length / itemsPerPage), 1);
    const paginatedData = useMemo(() => {
        const startIdx = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIdx, startIdx + itemsPerPage);
    }, [filteredData, currentPage]);

    const submittedDocuments = useMemo(() => {
        const documents = userAgreementDetails?.data?.submitted_documents ?? [];
        return [...documents].sort((left, right) => left.step - right.step);
    }, [userAgreementDetails]);

    const nextReviewableDocumentId = useMemo(() => {
        return submittedDocuments.find((document) => document.status === "submitted")?.id ?? null;
    }, [submittedDocuments]);

    const handleViewForms = (evaluation: EvaluationRow) => {
        setModal({
            isOpen: true,
            evaluationId: evaluation.id,
            evaluationName: evaluation.name,
        });
    };

    const handleReviewDocument = async (documentId: number, status: "approved" | "rejected") => {
        try {
            setReviewLoadingId(documentId);

            await userAgreementStepReview({
                id: documentId,
                data: {
                    status,
                },
            }).unwrap();
        } catch (error) {
            console.error(`Failed to ${status} document:`, error);
        } finally {
            setReviewLoadingId(null);
        }
    };

    const handleOpenDocument = (url?: string) => {
        if (!url) {
            return;
        }

        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="bg-white px-4 py-6 sm:px-6 sm:py-8">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="mb-4 text-2xl font-bold italic text-[#1F1F1F] sm:text-[32px]">Evaluation Request</h1>

                    <div className="flex gap-6 overflow-x-auto border-b border-[#EAECF0] pb-2 sm:gap-7">
                        {[
                            { id: "all", label: "All" },
                            { id: "pending", label: "Pending" },
                            { id: "step1", label: "Step 1" },
                            { id: "step2", label: "Step 2" },
                            { id: "step3", label: "Step 3" },
                            { id: "step4", label: "Step 4" },
                            { id: "step5", label: "Step 5" },
                            { id: "step6", label: "Step 6" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id as EvaluationStatus);
                                    setCurrentPage(1);
                                }}
                                className={`whitespace-nowrap pb-3 text-base font-normal transition-colors ${activeTab === tab.id
                                    ? "border-b-2 border-[#F65353] text-[#F65353]"
                                    : "text-[#696969] hover:text-[#1F1F1F]"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <Link
                    href="/dashboard/evaluation/evaluation-form-list"
                    className="whitespace-nowrap bg-[#B21F1F] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#8B1818]"
                >
                    Evaluation Form List
                </Link>
            </div>

            {evaluationData.length === 0 ? (
                <div className="rounded-md border border-dashed border-[#EAECF0] bg-[#F9FAFB] px-6 py-12 text-center text-[#667085]">
                    No evaluation data found.
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto rounded-md bg-white">
                        <table className="min-w-250 w-full border-collapse text-left">
                            <thead>
                                <tr className="border-y border-[#EAECF0] bg-[#E8E9EC80]">
                                    <th className="p-4 text-[13px] font-semibold uppercase tracking-wider text-[#667085]">NAME</th>
                                    <th className="p-4 text-[13px] font-semibold uppercase tracking-wider text-[#667085]">GMAIL</th>
                                    <th className="p-4 text-[13px] font-semibold uppercase tracking-wider text-[#667085]">PHONE</th>
                                    <th className="p-4 text-[13px] font-semibold uppercase tracking-wider text-[#667085]">STATUS</th>
                                    <th className="p-4 text-[13px] font-semibold uppercase tracking-wider text-[#667085]">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((evaluation) => (
                                    <tr key={evaluation.id} className="border-b border-[#EAECF0] transition-colors hover:bg-gray-50/50">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F65353] text-sm font-bold text-white">
                                                    {getInitials(evaluation.name)}
                                                </div>
                                                <span className="text-[15px] font-medium text-[#1F1F1F]">{evaluation.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-[14px] font-medium text-[#475467]">{evaluation.email}</td>
                                        <td className="p-4 text-[14px] font-medium text-[#475467]">{evaluation.phone}</td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1">
                                                <span className={`text-[14px] font-medium ${getStatusColor(evaluation.stepStatus)}`}>
                                                    {evaluation.status}
                                                </span>
                                                <span className="text-[12px] capitalize text-[#667085]">
                                                    {evaluation.stepStatus.replace(/_/g, " ")}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleViewForms(evaluation)}
                                                className="text-[#667085] transition-colors hover:text-[#1F1F1F]"
                                                title="View forms"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 3C5.58172 3 1.81623 6.04545 0.896865 10.2045C0.729134 10.9881 0.729134 11.0119 0.896865 11.7955C1.81623 15.9545 5.58172 19 10 19C14.4183 19 18.1838 15.9545 19.1031 11.7955C19.2709 11.0119 19.2709 10.9881 19.1031 10.2045C18.1838 6.04545 14.4183 3 10 3ZM10 17C6.13401 17 2.89495 14.5518 2.13507 11.25C2.89495 7.94821 6.13401 5.5 10 5.5C13.866 5.5 17.105 7.94821 17.8649 11.25C17.105 14.5518 13.866 17 10 17ZM10 7.5C8.34315 7.5 7 8.84315 7 10.5C7 12.1569 8.34315 13.5 10 13.5C11.6569 13.5 13 12.1569 13 10.5C13 8.84315 11.6569 7.5 10 7.5ZM10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z" fill="currentColor" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="border border-[#D0D5DD] px-4 py-2 font-medium text-[#475467] transition-colors hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            ← Previous
                        </button>

                        <div className="flex gap-1">
                            {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-2 text-sm font-medium transition-colors ${currentPage === page
                                        ? "bg-[#F65353] text-white"
                                        : "border border-[#D0D5DD] text-[#475467] hover:bg-[#F9FAFB]"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                            {totalPages > 10 && <span className="px-2 py-2 text-[#475467]">...</span>}
                        </div>

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="border border-[#D0D5DD] px-4 py-2 font-medium text-[#475467] transition-colors hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Next →
                        </button>
                    </div>
                </>
            )}

            {modal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="mx-4 w-full max-w-4xl rounded-lg bg-white p-6 animate-in fade-in zoom-in duration-300">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold italic text-[#1F1F1F]">{modal.evaluationName}</h2>
                                <p className="text-sm text-[#667085]">
                                    {userAgreementDetails?.data
                                        ? `${userAgreementDetails.data.user_email} · Step ${userAgreementDetails.data.current_step} of ${userAgreementDetails.data.total_steps}`
                                        : "Loading agreement details..."}
                                </p>
                            </div>
                            <button
                                onClick={() => setModal((prev) => ({ ...prev, isOpen: false }))}
                                className="text-[#667085] transition-colors hover:text-[#1F1F1F]"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="mb-6 grid gap-4 md:grid-cols-2">
                            {submittedDocuments.map((document) => {
                                const isApproved = document.status === "approved";
                                const isRejected = document.status === "rejected";
                                const canReviewThisDocument = document.id === nextReviewableDocumentId;

                                return (
                                    <div key={document.id} className="rounded-md border border-[#EAECF0] bg-[#F9FAFB] p-4">
                                        <div className="mb-4 flex items-start justify-between gap-3">
                                            <div>
                                                <p className="text-[15px] font-semibold text-[#1F1F1F]">
                                                    {document.title}
                                                </p>
                                                <p className="text-[13px] text-[#667085]">
                                                    Step {document.step} · {document.status}
                                                </p>
                                                <p className="mt-1 text-[12px] text-[#667085]">
                                                    Submitted: {document.submitted_at ? new Date(document.submitted_at).toLocaleString() : "-"}
                                                </p>
                                            </div>
                                            <span className={`text-[12px] font-semibold capitalize ${getStatusColor(document.status)}`}>
                                                {document.status}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            <button
                                                onClick={() => handleOpenDocument(document.download_file)}
                                                className="flex items-center gap-2 border border-[#D0D5DD] px-4 py-2 text-sm font-bold text-[#1F1F1F] transition-colors hover:bg-white"
                                            >
                                                <Download size={16} />
                                                VIEW FILE
                                            </button>
                                            <button
                                                onClick={() => handleReviewDocument(document.id, "approved")}
                                                disabled={!canReviewThisDocument || reviewLoadingId === document.id}
                                                className="flex items-center gap-2 border border-[#038862] px-4 py-2 text-sm font-bold text-[#038862] transition-colors hover:bg-[#F4FBF8] disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <Check size={16} />
                                                {isApproved ? "APPROVED" : "APPROVE"}
                                            </button>
                                            <button
                                                onClick={() => handleReviewDocument(document.id, "rejected")}
                                                disabled={!canReviewThisDocument || reviewLoadingId === document.id}
                                                className="flex items-center gap-2 border border-[#F65353] px-4 py-2 text-sm font-bold text-[#F65353] transition-colors hover:bg-[#FFF7F7] disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <X size={16} />
                                                {isRejected ? "REJECTED" : "REJECT"}
                                            </button>
                                        </div>

                                        {!canReviewThisDocument && document.status === "submitted" ? (
                                            <p className="mt-3 text-xs text-[#667085]">
                                                Review the previous step first.
                                            </p>
                                        ) : null}

                                        {/* {document.admin_note ? (
                                            <p className="mt-4 rounded-md bg-white px-3 py-2 text-sm text-[#475467]">
                                                Note: {document.admin_note}
                                            </p>
                                        ) : null} */}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
