"use client";

import Link from "next/link";
import { startTransition, useDeferredValue, useState } from "react";
import { Eye, Search, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { USER_MANAGEMENT_USERS } from "./mock-data";
import UserManagementPagination from "./UserManagementPagination";
import UserManagementStatusBadge from "./UserManagementStatusBadge";
import type { UserRecord, UserStatus } from "./types";

const FILTERS = ["ALL", "ACTIVE", "PENDING", "COMPLETED"] as const;
const PAGE_SIZE = 6;
const avatarTones = [
    "bg-[#FDE7E4] text-[#F65353]",
    "bg-[#E7F8F2] text-[#038862]",
    "bg-[#EEF2FF] text-[#434D64]",
    "bg-[#FFF6DB] text-[#A16207]",
];

type FilterValue = (typeof FILTERS)[number];

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

export default function UserManagementClient() {
    const [users, setUsers] = useState(USER_MANAGEMENT_USERS);
    const [activeFilter, setActiveFilter] = useState<FilterValue>("ALL");
    const [search, setSearch] = useState("");
    const [requestedPage, setRequestedPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const deferredSearch = useDeferredValue(search);

    const filteredUsers = users.filter(
        (user) => matchesFilter(user, activeFilter) && matchesSearch(user, deferredSearch.trim())
    );

    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
    const currentPage = Math.min(requestedPage, totalPages);
    const pageStart = (currentPage - 1) * PAGE_SIZE;
    const currentUsers = filteredUsers.slice(pageStart, pageStart + PAGE_SIZE);
    const currentIds = currentUsers.map((user) => user.id);
    const allCurrentSelected = currentIds.length > 0 && currentIds.every((id) => selectedIds.includes(id));

    function handleFilterChange(filter: FilterValue) {
        startTransition(() => {
            setActiveFilter(filter);
            setRequestedPage(1);
        });
    }

    function handleSearchChange(value: string) {
        setSearch(value);
        startTransition(() => {
            setRequestedPage(1);
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

    function handleDelete(userId: number) {
        setUsers((previous) => previous.filter((user) => user.id !== userId));
        setSelectedIds((previous) => previous.filter((id) => id !== userId));
    }

    const statusCounts = users.reduce<Record<"ALL" | UserStatus, number>>(
        (counts, user) => {
            counts.ALL += 1;
            counts[user.status] += 1;
            return counts;
        },
        { ALL: 0, Active: 0, Pending: 0, Completed: 0 }
    );

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
                            {FILTERS.map((filter) => {
                                const statusKey =
                                    filter === "ALL"
                                        ? "ALL"
                                        : ((filter[0] + filter.slice(1).toLowerCase()) as UserStatus);

                                return (
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
                                );
                            })}
                        </div>
                    </div>

                    <label className="flex h-12 w-full items-center gap-3 border border-[#D0D5DD] bg-white px-4 text-[#667085] shadow-sm xl:max-w-[400px]">
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
                            <th className="w-[90px] px-6 py-4 text-base font-medium">
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
                        {currentUsers.length === 0 ? (
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
                                                onClick={() => handleDelete(user.id)}
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
                        {filteredUsers.length} result{filteredUsers.length === 1 ? "" : "s"}
                    </span>
                </div>

                {currentUsers.length === 0 ? (
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
                                    onClick={() => handleDelete(user.id)}
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

            <UserManagementPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setRequestedPage(Math.min(Math.max(page, 1), totalPages))}
            />
        </section>
    );
}
