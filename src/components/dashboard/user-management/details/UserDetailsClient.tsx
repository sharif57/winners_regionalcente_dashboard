"use client";

import { getUserDetailById } from "../mock-data";
import UserDetailsTopBar from "./UserDetailsTopBar";
import UserProfileHero from "./UserProfileHero";
import UserProjectList from "./UserProjectList";
import type { UserDetail, UserProject } from "../types";
import { useSingleUserQuery, type ApiUserProject, type AppUser } from "@/redux/feature/userSlice";

function formatDate(value?: string | null) {
    if (!value) {
        return "N/A";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function mapProject(project: ApiUserProject, index: number): UserProject {
    const status = project.status.toLowerCase() === "completed" ? "Completed" : "Active";
    const progress = status === "Completed" ? 100 : 70;
    const localImages = ["/image/project-1.png", "/image/project-2.png", "/image/project-3.png", "/image/journey.png"];

    return {
        id: String(project.id),
        title: project.name,
        invested: `$${Number(project.investment_amount).toLocaleString()} invested`,
        progress,
        status,
        image: localImages[index % localImages.length],
    };
}

function buildDocumentSections(user: AppUser, detailFallback: UserDetail | null) {
    if (detailFallback) {
        return detailFallback.documentSections;
    }

    const userCountry = user.country || "Unknown";
    const userName = user.name || "User";
    const addressValue = user.current_address?.trim() || userCountry;

    return [
        {
            id: `identity-${user.id}`,
            step: 1,
            title: "Personal Identity",
            documents: [
                {
                    id: `passport-${user.id}`,
                    title: "Passport Copy",
                    subtitle: "Color scan",
                    fileName: `PASSPORT_${user.id}.PDF`,
                    previewText: `${userName}'s passport scan uploaded for identity verification.`,
                },
                {
                    id: `address-${user.id}`,
                    title: "Proof of Address",
                    subtitle: "Utility bill or bank statement (Last 90 Day's)",
                    fileName: `ADDRESS_${user.id}.PDF`,
                    previewText: `Address verification document showing residence in ${addressValue}.`,
                },
            ],
        },
        {
            id: `finance-${user.id}`,
            step: 2,
            title: "Financial Verification",
            documents: [
                {
                    id: `funds-${user.id}`,
                    title: "Proof of Funds",
                    subtitle: "Color scan",
                    fileName: `SOURCE_OF_FUND_${user.id}.PDF`,
                    previewText: `Proof of fund statement prepared for regional center review.`,
                },
                {
                    id: `bank-${user.id}`,
                    title: "Bank Statement",
                    subtitle: "Last 6 Months",
                    fileName: `BANK_${user.id}.PDF`,
                    previewText: `Six-month bank statement snapshot for compliance review.`,
                },
            ],
        },
        {
            id: `agreement-${user.id}`,
            step: 3,
            title: "Sign to Agreement",
            documents: [
                {
                    id: `signed-${user.id}`,
                    title: "Signed Agreement",
                    subtitle: "Color scan",
                    fileName: `AGREEMENT_${user.id}.PDF`,
                    previewText: `Signed subscription agreement ready for final approval.`,
                },
            ],
        },
    ];
}

function buildUserDetail(user: AppUser): UserDetail {
    const fallback = getUserDetailById(Number(user.id));
    const projects = Array.isArray(user.projects) && user.projects.length > 0
        ? user.projects.map((project, index) => mapProject(project, index))
        : fallback?.projects ?? [];

    const totalInvestment = Array.isArray(user.projects)
        ? user.projects.reduce((sum, project) => sum + Number(project.investment_amount || 0), 0)
        : 0;

    const currentAddress = user.current_address?.trim();
    const country = user.country || fallback?.origin || "Unknown";

    return {
        id: Number(user.id),
        name: user.name,
        email: user.email,
        phone: user.phone || "-",
        country,
        joiningDate: formatDate(user.created_at),
        status: user.is_active === false ? "Pending" : "Active",
        avatar: user.profile_image || fallback?.avatar || "/image/avatar-placeholder.png",
        origin: country,
        aumContribution: totalInvestment > 0 ? `£${totalInvestment.toLocaleString()}` : (fallback?.aumContribution ?? "£0"),
        addressLines: [currentAddress || country, country],
        dateOfBirth: formatDate(user.date_of_birth),
        projects,
        documentSections: buildDocumentSections(user, fallback),
    };
}

export default function UserDetailsClient({ userId }: { userId: number }) {
    const { data, isLoading, isFetching } = useSingleUserQuery(String(userId));

    if (isLoading || isFetching) {
        return (
            <div className="space-y-6">
                <div className="h-35 animate-pulse rounded-[28px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)]" />
                <div className="h-55 animate-pulse rounded-[28px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)]" />
                <div className="h-105 animate-pulse rounded-[28px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)]" />
            </div>
        );
    }

    const user = data?.data ? buildUserDetail(data.data) : null;

    if (!user) {
        return (
            <div className="rounded-[28px] bg-white px-5 py-8 text-center shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                <h2 className="text-[28px] font-semibold italic text-[#1F1F1F]">User not found</h2>
                <p className="mt-3 text-lg text-[#5D6169]">The selected user could not be loaded.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <UserDetailsTopBar user={user} />
            <UserProfileHero user={user} status={user.status} />
            <UserProjectList projects={user.projects} />
        </div>
    );
}
