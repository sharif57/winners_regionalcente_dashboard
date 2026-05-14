"use client";

import Link from "next/link";
import { startTransition, useDeferredValue, useMemo, useState } from "react";
import { Eye, Loader2, Search, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import UserManagementPagination from "./UserManagementPagination";
import UserManagementStatusBadge from "./UserManagementStatusBadge";
import type { UserRecord } from "./types";
import { useAllUsersQuery, useDeleteUserMutation } from "@/redux/feature/userSlice";

const FILTERS = ["ALL", "ACTIVE", "PENDING", "COMPLETED"] as const;
const PAGE_SIZE = 6;
const avatarTones = [
    "bg-[#FDE7E4] text-[#F65353]",
    "bg-[#E7F8F2] text-[#038862]",
    "bg-[#EEF2FF] text-[#434D64]",
    "bg-[#FFF6DB] text-[#A16207]",
];

type FilterValue = (typeof FILTERS)[number];

type DeleteUserTarget = {
    id: number;
    name: string;
};

function getInitials(name: string) {
    return name
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0])
        .join("");
}

function matchesFilter(user: UserRecord, filter: FilterValue) {
    if (filter === "ALL") {
        return true;
    }

    return user.status.toUpperCase() === filter;
}

function matchesSearch(user: UserRecord, search: string) {
    if (!search) {
        return true;
    }

    const value = search.toLowerCase();

    return [
        user.id.toString(),
        user.name,
        user.email,
        user.phone,
        user.country,
        user.joiningDate,
        user.status,
    ].some((field) => field.toLowerCase().includes(value));
}

function formatJoiningDate(rawDate: string) {
    const date = new Date(rawDate);

    if (Number.isNaN(date.getTime())) {
        return rawDate;
    }

    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function extractErrorMessage(error: unknown) {
    if (typeof error === "object" && error !== null && "data" in error) {
        const errorData = (error as { data?: unknown }).data;

        if (typeof errorData === "object" && errorData !== null && "message" in errorData) {
            const message = (errorData as { message?: unknown }).message;

            if (typeof message === "string" && message.trim()) {
                return message;
            }
        }
    }

    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    return "Failed to delete user. Please try again.";
}

export default function UserManagementClient() {
    const [activeFilter, setActiveFilter] = useState<FilterValue>("ALL");
    const [search, setSearch] = useState("");
    const [requestedPage, setRequestedPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [deletedIds, setDeletedIds] = useState<number[]>([]);
    const [deleteTarget, setDeleteTarget] = useState<DeleteUserTarget | null>(null);
    const deferredSearch = useDeferredValue(search);
    const trimmedSearch = deferredSearch.trim();

    const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();

    const statusParam = useMemo(() => {
        if (activeFilter === "ACTIVE") {
            return true;
        }

        if (activeFilter === "PENDING") {
            return false;
        }

        return undefined;
    }, [activeFilter]);

    const { data: userList, isLoading, isFetching } = useAllUsersQuery({
        page: requestedPage,
        page_size: PAGE_SIZE,
        search: trimmedSearch || undefined,
        status: statusParam,
    });

    const users = useMemo<UserRecord[]>(() => {
        const apiUsers = userList?.data ?? [];

        return apiUsers
            .filter((user) => !deletedIds.includes(user.id))
            .map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone_number || "-",
                country: user.country || "-",
                joiningDate: formatJoiningDate(user.created_at),
                status: user.is_active ? "Active" : "Pending",
            }));
    }, [deletedIds, userList?.data]);

    const filteredUsers = users.filter(
        (user) => matchesFilter(user, activeFilter) && matchesSearch(user, trimmedSearch)
    );

    const totalPages = activeFilter === "COMPLETED"
        ? 1
        : Math.max(1, userList?.meta?.total_pages ?? 1);
    const currentPage = activeFilter === "COMPLETED" ? 1 : (userList?.meta?.page ?? requestedPage);
    const currentUsers = filteredUsers;
    const currentIds = currentUsers.map((user) => user.id);
    const allCurrentSelected = currentIds.length > 0 && currentIds.every((id) => selectedIds.includes(id));
    const totalResults = activeFilter === "COMPLETED"
        ? currentUsers.length
        : Math.max(0, (userList?.meta?.count ?? 0) - deletedIds.length);

    function handleFilterChange(filter: FilterValue) {
        startTransition(() => {
            setActiveFilter(filter);
            setRequestedPage(1);
            setSelectedIds([]);
        });
    }

    function handleSearchChange(value: string) {
        setSearch(value);
        startTransition(() => {
            setRequestedPage(1);
            setSelectedIds([]);
        });
    }

    function handleToggleUser(userId: number) {
        setSelectedIds((previous) =>
            previous.includes(userId)
                ? previous.filter((id) => id !== userId)
                : [...previous, userId]
        );
    }

    function handleToggleAllCurrent() {
        setSelectedIds((previous) => {
            if (allCurrentSelected) {
                return previous.filter((id) => !currentIds.includes(id));
            }

            return Array.from(new Set([...previous, ...currentIds]));
        });
    }

    async function handleConfirmDelete() {
        if (!deleteTarget) {
            return;
        }

        try {
            await deleteUser(String(deleteTarget.id)).unwrap();
            setDeletedIds((previous) =>
                previous.includes(deleteTarget.id) ? previous : [...previous, deleteTarget.id]
            );
            setSelectedIds((previous) => previous.filter((id) => id !== deleteTarget.id));
            toast.success("User deleted successfully");
            setDeleteTarget(null);
        } catch (error) {
            toast.error(extractErrorMessage(error));
        }
    }

    function closeDeleteModal() {
        if (isDeletingUser) {
            return;
        }

        setDeleteTarget(null);
    }

    return (
        <section className="overflow-hidden rounded-[24px] border border-[#E3E5E8] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
            <div className="border-b border-[#E3E5E8] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div className="space-y-4">
                        <div>
                            <h1 className="text-xl font-semibold italic text-[#1F1F1F] sm:text-[28px]">
                                User Management
                            </h1>
                        </div>

                        <div className="flex flex-wrap items-center gap-5 text-xl font-normal italic text-[#1F1F1F]">
                            {FILTERS.map((filter) => (
                                <button
                                    key={filter}
                                    type="button"
                                    onClick={() => handleFilterChange(filter)}
                                    className={cn(
                                        "transition-colors",
                                        activeFilter === filter
                                            ? "text-[#F65353]"
                                            : "text-[#1F1F1F] hover:text-[#F65353]"
                                    )}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <label className="flex h-12 w-full items-center gap-3 border border-[#D0D5DD] bg-white px-4 text-[#667085] shadow-sm xl:max-w-100">
                        <Search className="size-5 text-[#98A2B3]" />
                        <input
                            value={search}
                            onChange={(event) => handleSearchChange(event.target.value)}
                            placeholder="Search"
                            className="h-full w-full border-0 bg-transparent text-base text-[#1F1F1F] outline-none placeholder:text-[#98A2B3]"
                        />
                    </label>
                </div>
            </div>

            <div className="hidden overflow-x-auto lg:block">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-[#F3F4F6] text-left text-sm uppercase italic text-[#667085]">
                            <th className="w-22.5 px-6 py-4 text-base font-medium">
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        className="size-5 accent-[#F65353]"
                                        checked={allCurrentSelected}
                                        onChange={handleToggleAllCurrent}
                                        aria-label="Select all users on this page"
                                    />
                                    <span>ID</span>
                                </label>
                            </th>
                            <th className="px-6 py-4 text-base font-medium">Name</th>
                            <th className="px-6 py-4 text-base font-medium">Gmail</th>
                            <th className="px-6 py-4 text-base font-medium">Phone</th>
                            <th className="px-6 py-4 text-base font-medium">Country</th>
                            <th className="px-6 py-4 text-base font-medium">Joining Date</th>
                            <th className="px-6 py-4 text-base font-medium">Status</th>
                            <th className="px-6 py-4 text-base font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading || isFetching ? (
                            Array.from({ length: PAGE_SIZE }).map((_, rowIndex) => (
                                <tr key={`table-skeleton-${rowIndex}`} className="border-b border-[#E3E5E8] bg-white">
                                    <td className="px-6 py-6"><div className="h-5 w-12 animate-pulse bg-[#ECEFF3]" /></td>
                                    <td className="px-6 py-6"><div className="h-5 w-40 animate-pulse bg-[#ECEFF3]" /></td>
                                    <td className="px-6 py-6"><div className="h-5 w-52 animate-pulse bg-[#ECEFF3]" /></td>
                                    <td className="px-6 py-6"><div className="h-5 w-32 animate-pulse bg-[#ECEFF3]" /></td>
                                    <td className="px-6 py-6"><div className="h-5 w-32 animate-pulse bg-[#ECEFF3]" /></td>
                                    <td className="px-6 py-6"><div className="h-5 w-36 animate-pulse bg-[#ECEFF3]" /></td>
                                    <td className="px-6 py-6"><div className="h-8 w-24 animate-pulse bg-[#ECEFF3]" /></td>
                                    <td className="px-6 py-6"><div className="h-8 w-20 animate-pulse bg-[#ECEFF3]" /></td>
                                </tr>
                            ))
                        ) : currentUsers.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-6 py-12 text-center text-base text-[#667085]">
                                    No users found for the current filter.
                                </td>
                            </tr>
                        ) : (
                            currentUsers.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className={cn(
                                        "border-b border-[#E3E5E8] text-[#4B5563]",
                                        index % 2 === 0 ? "bg-white" : "bg-[#FCFCFD]"
                                    )}
                                >
                                    <td className="px-6 py-6">
                                        <label className="flex items-center gap-3 text-xl">
                                            <input
                                                type="checkbox"
                                                className="size-5 accent-[#F65353]"
                                                checked={selectedIds.includes(user.id)}
                                                onChange={() => handleToggleUser(user.id)}
                                                aria-label={`Select ${user.name}`}
                                            />
                                            <span className="text-base font-normal text-[#181D27]">#{user.id}</span>
                                        </label>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={cn(
                                                    "flex size-10 items-center justify-center rounded-full text-sm font-bold",
                                                    avatarTones[user.id % avatarTones.length]
                                                )}
                                            >
                                                {getInitials(user.name)}
                                            </div>
                                            <span className="text-base font-normal text-[#181D27]">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-base font-normal text-[#181D27]">{user.email}</td>
                                    <td className="px-6 py-6 text-base font-normal text-[#181D27]">{user.phone}</td>
                                    <td className="px-6 py-6 text-base font-normal text-[#181D27]">{user.country}</td>
                                    <td className="px-6 py-6 text-base font-normal text-[#181D27]">{user.joiningDate}</td>
                                    <td className="px-6 py-6">
                                        <UserManagementStatusBadge status={user.status} />
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setDeleteTarget({ id: user.id, name: user.name })}
                                                className="rounded-full p-2 text-[#4B5563] transition-colors hover:bg-[#FFF1F1] hover:text-[#F65353]"
                                                aria-label={`Delete ${user.name}`}
                                            >
                                                <Trash2 className="size-5" />
                                            </button>
                                            <Link
                                                href={`/dashboard/user-management/${user.id}`}
                                                className="rounded-full p-2 text-[#4B5563] transition-colors hover:bg-[#F3F4F6] hover:text-[#1F1F1F]"
                                                aria-label={`View ${user.name}`}
                                            >
                                                <Eye className="size-5" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="space-y-4 p-4 sm:p-6 lg:hidden">
                <div className="flex items-center justify-between rounded-2xl bg-[#F8F9FB] px-4 py-3">
                    <label className="flex items-center gap-3 text-sm font-medium text-[#344054]">
                        <input
                            type="checkbox"
                            className="size-5 accent-[#F65353]"
                            checked={allCurrentSelected}
                            onChange={handleToggleAllCurrent}
                            aria-label="Select all users on this page"
                        />
                        Select visible users
                    </label>
                    <span className="text-sm text-[#667085]">
                        {totalResults} result{totalResults === 1 ? "" : "s"}
                    </span>
                </div>

                {isLoading || isFetching ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <article
                            key={`mobile-skeleton-${index}`}
                            className="rounded-[22px] border border-[#E4E7EC] bg-white p-5 shadow-sm"
                        >
                            <div className="h-5 w-40 animate-pulse bg-[#ECEFF3]" />
                            <div className="mt-5 grid grid-cols-1 gap-4 rounded-2xl bg-[#F8F9FB] p-4 sm:grid-cols-2">
                                <div className="h-4 w-28 animate-pulse bg-[#ECEFF3]" />
                                <div className="h-4 w-28 animate-pulse bg-[#ECEFF3]" />
                                <div className="h-4 w-28 animate-pulse bg-[#ECEFF3]" />
                                <div className="h-4 w-28 animate-pulse bg-[#ECEFF3]" />
                            </div>
                        </article>
                    ))
                ) : currentUsers.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#D0D5DD] px-5 py-12 text-center text-[#667085]">
                        No users found for the current filter.
                    </div>
                ) : (
                    currentUsers.map((user) => (
                        <article key={user.id} className="rounded-[22px] border border-[#E4E7EC] bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        className="mt-1 size-5 accent-[#F65353]"
                                        checked={selectedIds.includes(user.id)}
                                        onChange={() => handleToggleUser(user.id)}
                                        aria-label={`Select ${user.name}`}
                                    />
                                    <div
                                        className={cn(
                                            "flex size-12 items-center justify-center rounded-full text-sm font-bold",
                                            avatarTones[user.id % avatarTones.length]
                                        )}
                                    >
                                        {getInitials(user.name)}
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-[#1F1F1F]">{user.name}</p>
                                        <p className="text-sm text-[#667085]">#{user.id}</p>
                                    </div>
                                </div>
                                <UserManagementStatusBadge status={user.status} className="min-w-0 px-2.5 text-xs" />
                            </div>

                            <div className="mt-5 grid grid-cols-1 gap-4 rounded-2xl bg-[#F8F9FB] p-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.16em] text-[#98A2B3]">Gmail</p>
                                    <p className="mt-1 break-all text-sm text-[#344054]">{user.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.16em] text-[#98A2B3]">Phone</p>
                                    <p className="mt-1 text-sm text-[#344054]">{user.phone}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.16em] text-[#98A2B3]">Country</p>
                                    <p className="mt-1 text-sm text-[#344054]">{user.country}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.16em] text-[#98A2B3]">Joining Date</p>
                                    <p className="mt-1 text-sm text-[#344054]">{user.joiningDate}</p>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap items-center gap-3">
                                <Link
                                    href={`/dashboard/user-management/${user.id}`}
                                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#D0D5DD] px-4 text-sm font-medium text-[#344054] transition-colors hover:bg-[#F9FAFB]"
                                >
                                    <Eye className="size-4" />
                                    View
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => setDeleteTarget({ id: user.id, name: user.name })}
                                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#F1B8B8] bg-[#FFF5F5] px-4 text-sm font-medium text-[#F65353] transition-colors hover:bg-[#FFE9E9]"
                                >
                                    <Trash2 className="size-4" />
                                    Delete
                                </button>
                            </div>
                        </article>
                    ))
                )}
            </div>

            {deleteTarget ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-[24px] border border-[#E4E7EC] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2">
                                <div className="flex size-12 items-center justify-center rounded-full bg-[#FFF1F1] text-[#F65353]">
                                    <Trash2 className="size-6" />
                                </div>
                                <h2 className="text-xl font-semibold text-[#1F1F1F]">Delete user</h2>
                                <p className="text-sm leading-6 text-[#667085]">
                                    Are you sure you want to delete <span className="font-semibold text-[#1F1F1F]">{deleteTarget.name}</span>? This action cannot be undone.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={closeDeleteModal}
                                className="rounded-full p-2 text-[#98A2B3] transition-colors hover:bg-[#F2F4F7] hover:text-[#1F1F1F]"
                                aria-label="Close delete dialog"
                                disabled={isDeletingUser}
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={closeDeleteModal}
                                disabled={isDeletingUser}
                                className="inline-flex h-11 items-center justify-center rounded-xl border border-[#D0D5DD] px-5 text-sm font-medium text-[#344054] transition-colors hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmDelete}
                                disabled={isDeletingUser}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#F65353] px-5 text-sm font-medium text-white transition-colors hover:bg-[#E54848] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isDeletingUser ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                                {isDeletingUser ? "Deleting..." : "Delete user"}
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            <UserManagementPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setRequestedPage(Math.min(Math.max(page, 1), totalPages))}
            />
        </section>
    );
}
