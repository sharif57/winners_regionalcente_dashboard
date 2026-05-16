'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Mail, MessageSquareText, Sparkles, X } from 'lucide-react';
import { useApprovedEvaluationRequestMutation, useGetEvaluationRequestsListQuery } from '@/redux/feature/evaluationSlice';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type EvaluationRequest = {
    id: number;
    email: string;
    full_name: string;
    message: string;
    is_approved: boolean;
    created_at: string;
    updated_at: string;
};

type EvaluationRequestsResponse = {
    status: string;
    code: number;
    message: string;
    data: {
        count: number;
        next: string | null;
        previous: string | null;
        results: EvaluationRequest[];
    };
};

type ActiveModal = {
    type: 'message' | 'approve';
    request: EvaluationRequest;
} | null;

const PAGE_SIZE = 6;

function formatDate(value: string) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(value));
}

function getVisiblePages(currentPage: number, totalPages: number) {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
        return [1, 2, 3, 4, '...', totalPages];
    }

    if (currentPage >= totalPages - 3) {
        return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}

function getPreview(message: string) {
    const cleaned = message.replace(/\s+/g, ' ').trim();
    return cleaned.length > 180 ? `${cleaned.slice(0, 180)}...` : cleaned;
}

function getInitials(name: string) {
    const initials = name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('');

    return initials || 'U';
}

export default function EvaluationRequestList() {
    const [page, setPage] = useState(1);
    const [activeModal, setActiveModal] = useState<ActiveModal>(null);
    const [isApproving, setIsApproving] = useState(false);

    const { data, isLoading, isFetching, error } = useGetEvaluationRequestsListQuery({
        page,
        page_size: PAGE_SIZE,
    }) as {
        data?: EvaluationRequestsResponse;
        isLoading: boolean;
        isFetching: boolean;
        error?: unknown;
    };

    const [approvedEvaluationRequest] = useApprovedEvaluationRequestMutation();

    const requests = useMemo(() => data?.data?.results ?? [], [data]);
    const totalCount = data?.data?.count ?? 0;
    const totalPages = Math.max(Math.ceil(totalCount / PAGE_SIZE), 1);

    const visiblePages = useMemo(() => getVisiblePages(page, totalPages), [page, totalPages]);

    const approvedCount = useMemo(() => requests.filter((request) => request.is_approved).length, [requests]);
    const pendingCount = requests.length - approvedCount;

    const startItem = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
    const endItem = Math.min(page * PAGE_SIZE, totalCount);

    const handlePageChange = (nextPage: number) => {
        const safePage = Math.min(Math.max(nextPage, 1), totalPages);
        setPage(safePage);
    };

    const handleOpenMessage = (request: EvaluationRequest) => {
        setActiveModal({ type: 'message', request });
    };

    const handleOpenApprove = (request: EvaluationRequest) => {
        setActiveModal({ type: 'approve', request });
    };

    const handleApproveRequest = async () => {
        if (!activeModal || activeModal.type !== 'approve') {
            return;
        }

        try {
            setIsApproving(true);
            await approvedEvaluationRequest({
                id: activeModal.request.id,
                data: {
                    is_approved: true,
                },
            }).unwrap();
            setActiveModal(null);
        } catch (approveError) {
            console.error('Failed to approve evaluation request:', approveError);
        } finally {
            setIsApproving(false);
        }
    };

    return (
        <section className="space-y-8  py-6  sm:py-8 ">
            <div className="relative overflow-hidden rounded-[32px] border border-[#E8E3DD] bg-[linear-gradient(135deg,#FFF8F5_0%,#FFFFFF_42%,#F7F9FC_100%)] p-6 shadow-[0_20px_60px_rgba(17,24,39,0.06)] sm:p-8">
                <div className="absolute -right-20 -top-20 size-52 rounded-full bg-[#F65353]/10 blur-3xl" />
                <div className="absolute -bottom-24 left-1/3 size-56 rounded-full bg-[#B21F1F]/10 blur-3xl" />

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#F3D1D1] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#B21F1F] backdrop-blur">
                            <Sparkles className="size-4" />
                            Evaluation Requests
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-3xl font-bold tracking-tight text-[#171717] sm:text-4xl lg:text-5xl">
                                Review incoming evaluation requests with a clean, focused dashboard.
                            </h1>
                            <p className="max-w-2xl text-sm leading-7 text-[#667085] sm:text-base">
                                Track every request, inspect the submitted message, and move through the list with page controls built for high-volume review.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3 lg:w-115 lg:grid-cols-3">
                        <div className="rounded-2xl border border-[#EAECEF] bg-white p-4 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#667085]">Total</p>
                            <p className="mt-2 text-2xl font-bold text-[#1F1F1F]">{totalCount}</p>
                        </div>
                        <div className="rounded-2xl border border-[#EAECEF] bg-white p-4 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#667085]">Approved</p>
                            <p className="mt-2 text-2xl font-bold text-[#038862]">{approvedCount}</p>
                        </div>
                        <div className="rounded-2xl border border-[#EAECEF] bg-white p-4 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#667085]">Pending</p>
                            <p className="mt-2 text-2xl font-bold text-[#F65353]">{pendingCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 rounded-[28px] border border-[#EAECF0] bg-white p-4 shadow-[0_16px_40px_rgba(17,24,39,0.05)] sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#667085]">Current Page</p>
                    <h2 className="mt-1 text-lg font-semibold text-[#1F1F1F]">
                        {totalCount === 0 ? 'No requests available' : `Showing ${startItem}-${endItem} of ${totalCount}`}
                    </h2>
                </div>

                <div className="flex items-center gap-3 text-sm text-[#667085]">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#F9FAFB] px-3 py-2">
                        <Mail className="size-4 text-[#B21F1F]" />
                        Email-first review
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#F9FAFB] px-3 py-2">
                        <CalendarDays className="size-4 text-[#B21F1F]" />
                        Updated by page
                    </span>
                </div>
            </div>

            {isLoading ? (
                <div className="rounded-[28px] border border-dashed border-[#D0D5DD] bg-white p-12 text-center text-[#667085] shadow-sm">
                    Loading evaluation requests...
                </div>
            ) : error ? (
                <div className="rounded-[28px] border border-[#FEE4E2] bg-[#FFFBFA] p-12 text-center text-[#B42318] shadow-sm">
                    Unable to load evaluation requests right now.
                </div>
            ) : requests.length === 0 ? (
                <div className="rounded-[28px] border border-dashed border-[#D0D5DD] bg-white p-12 text-center text-[#667085] shadow-sm">
                    No evaluation requests found.
                </div>
            ) : (
                <>
                    <div className="grid gap-4 xl:grid-cols-2">
                        {requests.map((request) => (
                            <article
                                key={request.id}
                                className="group rounded-[28px] border border-[#EAECF0] bg-white p-5 shadow-[0_12px_32px_rgba(17,24,39,0.05)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(17,24,39,0.09)]"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#FDECEC] text-sm font-bold text-[#B21F1F] ring-8 ring-[#F8F9FC]">
                                            {getInitials(request.full_name)}
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="text-lg font-semibold text-[#1F1F1F]">{request.full_name}</h3>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (!request.is_approved) {
                                                            handleOpenApprove(request);
                                                        }
                                                    }}
                                                    className={cn(
                                                        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition-colors',
                                                        request.is_approved
                                                            ? 'cursor-default bg-[#ECFDF3] text-[#027A48]'
                                                            : 'bg-[#FFF1F3] text-[#C01048] hover:bg-[#FFE4E8]'
                                                    )}
                                                    disabled={request.is_approved}
                                                >
                                                    {request.is_approved ? 'Approved' : 'Pending'}
                                                </button>
                                            </div>

                                            <a
                                                href={`mailto:${request.email}`}
                                                className="inline-flex items-center gap-2 text-sm text-[#667085] transition-colors hover:text-[#B21F1F]"
                                            >
                                                <Mail className="size-4" />
                                                {request.email}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-[#F9FAFB] px-4 py-3 text-left sm:text-right">
                                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#667085]">Request ID</p>
                                        <p className="mt-1 text-base font-semibold text-[#1F1F1F]">#{request.id}</p>
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-2xl bg-[#F9FAFB] p-4">
                                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#667085]">
                                            <MessageSquareText className="size-4 text-[#B21F1F]" />
                                            Message Preview
                                        </p>
                                        <p className="mt-3 line-clamp-4 text-sm leading-6 text-[#344054]">{getPreview(request.message)}</p>
                                        <button
                                            type="button"
                                            onClick={() => handleOpenMessage(request)}
                                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#B21F1F] transition-colors hover:text-[#8B1818]"
                                        >
                                            See more
                                            <ChevronRight className="size-4" />
                                        </button>
                                    </div>

                                    <div className="grid gap-3">
                                        <div className="rounded-2xl bg-[#F9FAFB] p-4">
                                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#667085]">Created</p>
                                            <p className="mt-2 text-sm font-medium text-[#1F1F1F]">{formatDate(request.created_at)}</p>
                                        </div>
                                        <div className="rounded-2xl bg-[#F9FAFB] p-4">
                                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#667085]">Updated</p>
                                            <p className="mt-2 text-sm font-medium text-[#1F1F1F]">{formatDate(request.updated_at)}</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4 rounded-[28px] border border-[#EAECF0] bg-white px-4 py-5 shadow-[0_12px_32px_rgba(17,24,39,0.05)] sm:px-6 lg:flex-row lg:items-center lg:justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-11 w-full border-[#D0D5DD] bg-white px-5 text-sm font-semibold text-[#344054] hover:bg-[#F8FAFC] lg:w-auto"
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1 || isFetching}
                        >
                            <ChevronLeft className="size-4" />
                            Previous
                        </Button>

                        <div className="flex items-center justify-center gap-2 overflow-x-auto">
                            {visiblePages.map((visiblePage, index) =>
                                visiblePage === '...' ? (
                                    <span key={`ellipsis-${index}`} className="px-2 text-[#98A2B3]">
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={visiblePage}
                                        type="button"
                                        onClick={() => {
                                            if (typeof visiblePage === 'number') {
                                                handlePageChange(visiblePage);
                                            }
                                        }}
                                        className={cn(
                                            'flex size-10 items-center justify-center rounded-xl text-sm font-semibold transition-colors',
                                            page === visiblePage
                                                ? 'bg-[#B21F1F] text-white shadow-md shadow-[#B21F1F]/20'
                                                : 'bg-[#F9FAFB] text-[#344054] hover:bg-[#EEF2F6]'
                                        )}
                                        disabled={isFetching}
                                    >
                                        {visiblePage}
                                    </button>
                                )
                            )}
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="h-11 w-full border-[#D0D5DD] bg-white px-5 text-sm font-semibold text-[#344054] hover:bg-[#F8FAFC] lg:w-auto"
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages || isFetching}
                        >
                            Next
                            <ChevronRight className="size-4" />
                        </Button>
                    </div>
                </>
            )}

            {activeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/55 p-4 backdrop-blur-sm">
                    <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl">
                        <div className="flex items-start justify-between gap-4 border-b border-[#EAECF0] px-6 py-5">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#667085]">
                                    {activeModal.type === 'message' ? 'Full Message' : 'Approve Request'}
                                </p>
                                <h3 className="mt-2 text-2xl font-bold text-[#1F1F1F]">{activeModal.request.full_name}</h3>
                                <p className="mt-1 text-sm text-[#667085]">{activeModal.request.email}</p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setActiveModal(null)}
                                className="rounded-full p-2 text-[#667085] transition-colors hover:bg-[#F3F4F6] hover:text-[#1F1F1F]"
                                aria-label="Close modal"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl bg-[#F9FAFB] p-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#667085]">Request ID</p>
                                    <p className="mt-2 text-base font-semibold text-[#1F1F1F]">#{activeModal.request.id}</p>
                                </div>
                                <div className="rounded-2xl bg-[#F9FAFB] p-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#667085]">Status</p>
                                    <p
                                        className={cn(
                                            'mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]',
                                            activeModal.request.is_approved ? 'bg-[#ECFDF3] text-[#027A48]' : 'bg-[#FFF1F3] text-[#C01048]'
                                        )}
                                    >
                                        {activeModal.request.is_approved ? 'Approved' : 'Pending'}
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-[#F9FAFB] p-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#667085]">Updated</p>
                                    <p className="mt-2 text-base font-semibold text-[#1F1F1F]">{formatDate(activeModal.request.updated_at)}</p>
                                </div>
                            </div>

                            <div className="rounded-[24px] border border-dashed border-[#D0D5DD] bg-[#FCFCFD] p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#667085]">Message</p>
                                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#344054]">{activeModal.request.message}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 border-t border-[#EAECF0] px-6 py-5 sm:flex-row sm:justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-11 border-[#D0D5DD] bg-white px-5 text-sm font-semibold text-[#344054] hover:bg-[#F8FAFC]"
                                onClick={() => setActiveModal(null)}
                            >
                                Close
                            </Button>

                            {activeModal.type === 'approve' && !activeModal.request.is_approved && (
                                <Button
                                    type="button"
                                    className="h-11 bg-[#B21F1F] px-5 text-sm font-semibold text-white hover:bg-[#8B1818]"
                                    onClick={handleApproveRequest}
                                    disabled={isApproving}
                                >
                                    <CheckCircle2 className="size-4" />
                                    {isApproving ? 'Approving...' : 'Approve Request'}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
