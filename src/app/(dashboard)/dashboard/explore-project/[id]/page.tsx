'use client';
import { useMemo } from "react";
import AboutProjectCard from "@/components/dashboard/explore-project/AboutProjectCard";
import DocumentsSection from "@/components/dashboard/explore-project/DocumentsSection";
import FundingProgressCard from "@/components/dashboard/explore-project/FundingProgressCard";
import InvestorList, { type InvestorRow } from "@/components/dashboard/explore-project/investor-list";
import JobCreationProgressCard from "@/components/dashboard/explore-project/JobCreationProgressCard";
import ProjectTimelineCard from "@/components/dashboard/explore-project/ProjectTimelineCard";
import TopStatsBar from "@/components/dashboard/explore-project/TopStatsBar";
import { DocumentItem, TopStat } from "@/components/dashboard/explore-project/types";
import ProjectHero from "@/components/visa/project/ProjectHero";
import { useProjectDetailsInvestorsQuery, useProjectDetailsQuery } from "@/redux/feature/projectSlice";
import { useParams } from "next/navigation";

const fallbackTopStats: TopStat[] = [
    { label: "TOTAL PROJECT VALUE", value: "$220M", sub: "" },
    { label: "MIN. INVESTMENT", value: "$800K", sub: "" },
    { label: "EXPECTED ROI", value: "5-7%", sub: "" },
    { label: "JOB IMPACT", value: "1,200+", sub: "" },
    { label: "DURATION", value: "Jan 2026 - Dec 2028", sub: "" },
];

const fallbackDocuments: DocumentItem[] = [
    { name: "Business Plan", type: "PDF . 12MB" },
    { name: "Financial Report", type: "PDF . 12MB" },
    { name: "Legal Documents", type: "PDF . 12MB" },
    { name: "Agreement", type: "PDF . 12MB" },
];

const formatCurrency = (value?: string) => {
    if (!value) {
        return "-";
    }

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
        return value;
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(numericValue);
};

const formatMonthYear = (value?: string) => {
    if (!value) {
        return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
    }).format(date);
};

const formatTitle = (value?: string) => {
    if (!value) {
        return "-";
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
};

export default function ExploreProject() {
    const params = useParams();
    const projectId = Number(params.id);
    const isValidProjectId = Number.isFinite(projectId) && projectId > 0;
    const { data: projectDetails } = useProjectDetailsQuery(projectId, {
        skip: !isValidProjectId,
    });
    const { data: projectInvestors } = useProjectDetailsInvestorsQuery(projectId, {
        skip: !isValidProjectId,
    });

    const project = projectDetails?.data;

    const topStats = useMemo<TopStat[]>(() => {
        if (!project) {
            return fallbackTopStats;
        }

        return [
            { label: "TOTAL PROJECT VALUE", value: formatCurrency(project.total_project_value), sub: "" },
            { label: "MIN. INVESTMENT", value: formatCurrency(project.minimum_investment), sub: "" },
            { label: "EXPECTED ROI", value: project.roi || "-", sub: "" },
            { label: "JOB IMPACT", value: project.job_impact || "-", sub: "" },
            {
                label: "DURATION",
                value: `${formatMonthYear(project.project_start_date)} - ${formatMonthYear(project.project_end_date)}`,
                sub: "",
            },
        ];
    }, [project]);

    const documents: DocumentItem[] = useMemo(() => {
        if (!project) {
            return fallbackDocuments;
        }

        return [
            { name: "Business Plan", type: "PDF . 12MB", url: project.business_plan },
            { name: "Financial Report", type: "PDF . 12MB", url: project.financial_report },
            { name: "Legal Documents", type: "PDF . 12MB", url: project.legal_document },
            { name: "Agreement", type: "PDF . 12MB", url: project.agreement },
        ];
    }, [project]);

    const investorRows = useMemo<InvestorRow[] | undefined>(() => {
        const investorsData = projectInvestors?.data;

        if (Array.isArray(investorsData)) {
            return investorsData.map((item, index) => {
                const investor = item as Record<string, unknown>;

                return {
                    id: String(investor.id ?? investor.investor_id ?? `#${index + 1}`),
                    name: String(investor.name ?? investor.full_name ?? investor.investor_name ?? "Investor"),
                    amount: String(investor.amount ?? investor.invested_amount ?? investor.investment_amount ?? "-"),
                    email: String(investor.email ?? investor.gmail ?? "-"),
                    phone: String(investor.phone ?? investor.mobile ?? "-"),
                    country: String(investor.country ?? "-"),
                    date: String(investor.date ?? investor.joining_date ?? investor.created_at ?? "-"),
                    status: String(investor.status ?? "Active"),
                    image: String(investor.image ?? investor.avatar ?? "/image/background6.png"),
                };
            });
        }

        if (investorsData && typeof investorsData === "object") {
            const results = (investorsData as { results?: unknown[] }).results;

            if (Array.isArray(results)) {
                return results.map((item, index) => {
                    const investor = item as Record<string, unknown>;

                    return {
                        id: String(investor.id ?? investor.investor_id ?? `#${index + 1}`),
                        name: String(investor.name ?? investor.full_name ?? investor.investor_name ?? "Investor"),
                        amount: String(investor.amount ?? investor.invested_amount ?? investor.investment_amount ?? "-"),
                        email: String(investor.email ?? investor.gmail ?? "-"),
                        phone: String(investor.phone ?? investor.mobile ?? "-"),
                        country: String(investor.country ?? "-"),
                        date: String(investor.date ?? investor.joining_date ?? investor.created_at ?? "-"),
                        status: String(investor.status ?? "Active"),
                        image: String(investor.image ?? investor.avatar ?? "/image/background6.png"),
                    };
                });
            }
        }

        return undefined;
    }, [projectInvestors]);

    // compute funding values: if API doesn't provide raised amount, assume 65% funded of total
    const numericTotal = project?.total_project_value ? Number(project.total_project_value) : NaN;
    const defaultRaised = Number.isFinite(numericTotal) ? Math.round(numericTotal * 0.65) : undefined;
    const raisedAmount = project?.total_project_value
        ? formatCurrency(String(defaultRaised ?? Number(project.total_project_value)))
        : "$0";
    const progress = Number.isFinite(numericTotal) && defaultRaised ? Math.round((defaultRaised / numericTotal) * 100) : 0;
    const investorCount = Array.isArray(investorRows) ? String(investorRows.length) : "-";

    return (
        <div>
            <ProjectHero
                title={project ? `${project.name} - ${project.city}, ${project.state}` : undefined}
                location={project?.location || undefined}
                bannerUrl={project?.banner || undefined}
                statusLabel={project ? formatTitle(project.status) : undefined}
                secondaryLabel={project?.is_eb_5_enabled ? "EB-5 Eligible" : "EB-5 Disabled"}
            />
            <section className="w-full bg-white p-3 sm:p-4">
                <TopStatsBar stats={topStats} />

                <div className="mb-3 grid grid-cols-1 gap-3 xl:grid-cols-10 sm:mb-4 sm:gap-4">
                    <AboutProjectCard
                        title={project ? `${project.name} - ${project.city}, ${project.state}` : undefined}
                        status={project ? formatTitle(project.status) : undefined}
                        shortDescription={project?.short_description || undefined}
                        description={project?.location ? `${project.location}.` : undefined}
                    />
                    <JobCreationProgressCard jobImpact={project?.job_impact || undefined} />
                </div>

                <div className="mb-3 grid grid-cols-1 gap-3 lg:grid-cols-2 sm:mb-4 sm:gap-4">
                    <FundingProgressCard progress={progress} raisedAmount={raisedAmount} goal={"8.0M GOAL"} investorCount={investorCount} />
                    <ProjectTimelineCard
                        projectStartDate={project?.project_start_date}
                        projectEndDate={project?.project_end_date}
                        status={project?.status}
                    />
                </div>

                <DocumentsSection documents={documents} projectId={project?.id} />
                <InvestorList investors={investorRows} />
            </section>
        </div>
    );
}
