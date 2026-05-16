/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Trash2, Eye, ArrowDown, X, Loader2 } from "lucide-react";
import { useDeleteInvestorMutation, useProjectInvestorDetailsQuery, useUpdateInvestmentStatusMutation } from "@/redux/feature/projectSlice";

export type InvestorRow = {
    id: string;
    name: string;
    amount: string;
    email: string;
    phone: string;
    country: string;
    date: string;
    status: string;
    profile_image: string;
};


type InvestorListProps = {
    investors?: InvestorRow[];
};

type InvestorStatus = "pending" | "approved" | "rejected";

type InvestorDetails = {
    id: number;
    profile_image: string | null;
    full_name: string;
    email: string;
    phone: string;
    nationality: string;
    current_country_of_residence: string;
    source_of_funds: string;
    investment_amount: string;
    investment_strategy: string;
    status: InvestorStatus;
    passport_copy: string;
    proof_of_address: string;
    proof_of_funds: string;
    bank_statements: string;
    upload_agreement: string;
    created_at: string;
    updated_at: string;
    user: number;
    project: number;
};

const statusLabelMap: Record<InvestorStatus, string> = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
};

const statusBadgeMap: Record<InvestorStatus, string> = {
    pending: "bg-[#FFF6E4] text-[#B54708]",
    approved: "bg-[#ECFDF3] text-[#027A48]",
    rejected: "bg-[#FEF3F2] text-[#B42318]",
};

function getStatusValue(status: string): InvestorStatus {
    if (status === "approved" || status === "rejected") {
        return status;
    }

    return "pending";
}

function formatAmount(value: string) {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return value;
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    }).format(numericValue);
}

function formatDate(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
}

export default function InvestorList({ investors }: InvestorListProps) {
    const [selectedInvestorId, setSelectedInvestorId] = useState<number | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<InvestorRow | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<InvestorStatus>("pending");
    const [statusOverrides, setStatusOverrides] = useState<Record<string, InvestorStatus>>({});

    const { data: investorDetailsResponse, isFetching: isDetailsLoading } = useProjectInvestorDetailsQuery(selectedInvestorId as number, {
        skip: selectedInvestorId == null,
    }) as {
        data?: { data?: InvestorDetails };
        isFetching: boolean;
    };

    const [updateInvestmentStatus, { isLoading: isUpdatingStatus }] = useUpdateInvestmentStatusMutation();
    const [deleteInvestor, { isLoading: isDeletingInvestor }] = useDeleteInvestorMutation();

    const investorDetails = investorDetailsResponse?.data;

    const tableRows = useMemo(() => investors ?? [], [investors]);

    const closeDetailsModal = () => {
        setSelectedInvestorId(null);
    };

    const handleOpenDetails = (investor: InvestorRow) => {
        const numericId = Number(investor.id);

        if (!Number.isFinite(numericId)) {
            return;
        }

        setSelectedInvestorId(numericId);
        setSelectedStatus(getStatusValue(investor.status));
    };

    const handleUpdateStatus = async () => {
        if (selectedInvestorId == null) {
            return;
        }

        try {
            await updateInvestmentStatus({
                id: selectedInvestorId,
                data: { status: selectedStatus },
            }).unwrap();

            setStatusOverrides((previous) => ({
                ...previous,
                [String(selectedInvestorId)]: selectedStatus,
            }));
        } catch (updateError) {
            console.error("Failed to update investor status:", updateError);
        }
    };

    const handleDeleteInvestor = async () => {
        if (!deleteTarget) {
            return;
        }

        const numericId = Number(deleteTarget.id);

        if (!Number.isFinite(numericId)) {
            return;
        }

        try {
            await deleteInvestor(numericId).unwrap();
            setDeleteTarget(null);

            if (selectedInvestorId === numericId) {
                closeDetailsModal();
            }
        } catch (deleteError) {
            console.error("Failed to delete investor:", deleteError);
        }
    };

    return (
        <div className="overflow-hidden animate-in fade-in duration-500">
            <div className="p-4 ">
                <h2 className="text-[#1F1F1F] text-xl lg:text-[24px] font-bold italic mb-6">
                    Investor List
                </h2>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-250">
                        <thead>
                            <tr className="bg-[#E8E9EC80] border-y border-[#EAECF0]">
                                <th className="p-4 w-12 text-center">
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-[#D0D5DD] text-[#121E38] focus:ring-[#121E38] cursor-pointer"
                                        />
                                    </div>
                                </th>
                                <th className="p-4 text-[13px] font-semibold text-[#667085] uppercase tracking-wider">
                                    <div className="flex items-center gap-1 italic">
                                        ID <ArrowDown size={14} className="text-[#667085]" />
                                    </div>
                                </th>
                                <th className="p-4 text-[13px] font-semibold text-[#667085] uppercase tracking-wider italic">
                                    NAME
                                </th>
                                <th className="p-4 text-[13px] font-semibold text-[#667085] uppercase tracking-wider italic">
                                    INVESTED AMOUNT
                                </th>
                                <th className="p-4 text-[13px] font-semibold text-[#667085] uppercase tracking-wider italic">
                                    GMAIL
                                </th>
                                <th className="p-4 text-[13px] font-semibold text-[#667085] uppercase tracking-wider italic">
                                    PHONE
                                </th>
                                <th className="p-4 text-[13px] font-semibold text-[#667085] uppercase tracking-wider italic">
                                    COUNTRY
                                </th>
                                <th className="p-4 text-[13px] font-semibold text-[#667085] uppercase tracking-wider italic">
                                    JOINING DATE
                                </th>
                                <th className="p-4 text-[13px] font-semibold text-[#667085] uppercase tracking-wider italic">
                                    STATUS
                                </th>
                                <th className="p-4 text-[13px] font-semibold text-[#667085] uppercase tracking-wider italic">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows.map((investor) => {
                                const statusValue = statusOverrides[investor.id] ?? getStatusValue(investor.status);

                                return (
                                    <tr
                                        key={investor.id}
                                        className="border-b border-[#EAECF0] hover:bg-gray-50/50 transition-colors"
                                    >
                                        <td className="p-4 text-center">
                                            <div className="flex items-center justify-center">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded border-[#D0D5DD] text-[#121E38] focus:ring-[#121E38] cursor-pointer"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4 text-[14px] text-[#344054] font-medium font-sans">
                                            {investor.id}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                                                    <img
                                                        src={investor.profile_image}
                                                        alt={investor.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className="text-[15px] font-medium text-[#1F1F1F]">
                                                    {investor.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-[14px] text-[#475467] font-medium">
                                            {formatAmount(investor.amount)}
                                        </td>
                                        <td className="p-4 text-[14px] text-[#475467] font-medium">
                                            {investor.email}
                                        </td>
                                        <td className="p-4 text-[14px] text-[#475467] font-medium">
                                            {investor.phone}
                                        </td>
                                        <td className="p-4 text-[14px] text-[#475467] font-medium">
                                            {investor.country}
                                        </td>
                                        <td className="p-4 text-[14px] text-[#475467] font-medium">
                                            {formatDate(investor.date)}
                                        </td>
                                        <td className="p-4">
                                            <span className={`${statusBadgeMap[statusValue]} text-[13px] font-semibold px-3 py-1 rounded-sm tracking-wide`}>
                                                {statusLabelMap[statusValue]}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <button
                                                    type="button"
                                                    className="text-[#667085] hover:text-red-600 transition-colors transform hover:scale-110"
                                                    onClick={() => setDeleteTarget(investor)}
                                                >
                                                    <Trash2 size={20} strokeWidth={1.5} />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-[#667085] hover:text-[#121E38] transition-colors transform hover:scale-110"
                                                    onClick={() => handleOpenDetails(investor)}
                                                >
                                                    <Eye size={20} strokeWidth={1.5} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {tableRows.length === 0 && (
                        <div className="py-10 text-center text-sm font-medium text-[#667085]">
                            No investors found.
                        </div>
                    )}
                </div>
            </div>

            {selectedInvestorId != null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-[#EAECF0] px-6 py-4">
                            <div>
                                <h3 className="text-xl font-bold text-[#1F1F1F]">Investor Details</h3>
                                <p className="text-sm text-[#667085]">Review details and update investor status</p>
                            </div>
                            <button
                                type="button"
                                onClick={closeDetailsModal}
                                className="rounded-full p-2 text-[#667085] transition-colors hover:bg-[#F2F4F7]"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {isDetailsLoading ? (
                                <div className="flex items-center justify-center py-20 text-[#667085]">
                                    <Loader2 className="mr-2 size-5 animate-spin" />
                                    Loading investor details...
                                </div>
                            ) : !investorDetails ? (
                                <div className="rounded-lg border border-dashed border-[#D0D5DD] p-10 text-center text-[#667085]">
                                    Investor details not found.
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        <div className="rounded-lg bg-[#F9FAFB] p-4">
                                            <p className="text-xs font-semibold uppercase tracking-widest text-[#667085]">Full Name</p>
                                            <p className="mt-2 text-sm font-semibold text-[#1F1F1F]">{investorDetails.full_name || "-"}</p>
                                        </div>
                                        <div className="rounded-lg bg-[#F9FAFB] p-4">
                                            <p className="text-xs font-semibold uppercase tracking-widest text-[#667085]">Email</p>
                                            <p className="mt-2 break-all text-sm font-semibold text-[#1F1F1F]">{investorDetails.email || "-"}</p>
                                        </div>
                                        <div className="rounded-lg bg-[#F9FAFB] p-4">
                                            <p className="text-xs font-semibold uppercase tracking-widest text-[#667085]">Phone</p>
                                            <p className="mt-2 text-sm font-semibold text-[#1F1F1F]">{investorDetails.phone || "-"}</p>
                                        </div>
                                        <div className="rounded-lg bg-[#F9FAFB] p-4">
                                            <p className="text-xs font-semibold uppercase tracking-widest text-[#667085]">Country</p>
                                            <p className="mt-2 text-sm font-semibold text-[#1F1F1F]">{investorDetails.current_country_of_residence || "-"}</p>
                                        </div>
                                        <div className="rounded-lg bg-[#F9FAFB] p-4">
                                            <p className="text-xs font-semibold uppercase tracking-widest text-[#667085]">Nationality</p>
                                            <p className="mt-2 text-sm font-semibold text-[#1F1F1F]">{investorDetails.nationality || "-"}</p>
                                        </div>
                                        <div className="rounded-lg bg-[#F9FAFB] p-4">
                                            <p className="text-xs font-semibold uppercase tracking-widest text-[#667085]">Investment Amount</p>
                                            <p className="mt-2 text-sm font-semibold text-[#1F1F1F]">{formatAmount(investorDetails.investment_amount)}</p>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-[#EAECF0] p-4">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-[#667085]">Status Update</p>
                                        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                                            <select
                                                value={selectedStatus}
                                                onChange={(event) => setSelectedStatus(getStatusValue(event.target.value))}
                                                className="h-11 w-full rounded-md border border-[#D0D5DD] px-3 text-sm text-[#1F1F1F] focus:border-[#121E38] focus:outline-none sm:max-w-60"
                                            >
                                                {/* <option value="pending">Pending</option> */}
                                                <option value="approved">Approved</option>
                                                <option value="rejected">Rejected</option>
                                            </select>

                                            <button
                                                type="button"
                                                onClick={handleUpdateStatus}
                                                disabled={isUpdatingStatus}
                                                className="inline-flex h-11 items-center justify-center rounded-md bg-[#121E38] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0E172E] disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                {isUpdatingStatus ? (
                                                    <>
                                                        <Loader2 className="mr-2 size-4 animate-spin" />
                                                        Updating...
                                                    </>
                                                ) : (
                                                    "Update Status"
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-[#EAECF0] p-4">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-[#667085]">Documents</p>
                                        <div className="mt-3 grid gap-2">
                                            {[
                                                { label: "Passport Copy", url: investorDetails.passport_copy },
                                                { label: "Proof of Address", url: investorDetails.proof_of_address },
                                                { label: "Proof of Funds", url: investorDetails.proof_of_funds },
                                                { label: "Bank Statements", url: investorDetails.bank_statements },
                                                { label: "Agreement", url: investorDetails.upload_agreement },
                                                { label: "Source of Funds", url: investorDetails.source_of_funds },
                                            ].map((document) => (
                                                <a
                                                    key={document.label}
                                                    href={document.url || "#"}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="rounded-md bg-[#F9FAFB] px-3 py-2 text-sm font-medium text-[#344054] transition-colors hover:bg-[#EEF2F6]"
                                                >
                                                    {document.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h3 className="text-lg font-bold text-[#1F1F1F]">Delete Investor</h3>
                        <p className="mt-2 text-sm text-[#667085]">
                            Are you sure you want to delete <span className="font-semibold text-[#1F1F1F]">{deleteTarget.name}</span>? This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setDeleteTarget(null)}
                                className="h-10 rounded-md border border-[#D0D5DD] px-4 text-sm font-semibold text-[#344054] transition-colors hover:bg-[#F2F4F7]"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteInvestor}
                                disabled={isDeletingInvestor}
                                className="inline-flex h-10 items-center rounded-md bg-[#B42318] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#912018] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isDeletingInvestor ? (
                                    <>
                                        <Loader2 className="mr-2 size-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    "Delete"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
