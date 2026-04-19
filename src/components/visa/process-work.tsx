import React from "react";
import {
    UserCheck,
    FileSignature,
    FileDown,
    ClipboardCheck,
    Settings,
    Wallet,
    CheckCircle2,
    UserPlus,
    Building2,
    ArrowUpFromLine,
    Plane,
    CreditCard,
    FileText,
    BadgeCheck,
    HelpingHand,
    Info,
} from "lucide-react";

interface Step {
    label: string;
    description?: string;
    icon?: React.ReactNode;
    status?: string;
}

interface Phase {
    id: string;
    title: string;
    description: string;
    steps: Step[];
    variant: "#14213D" | "red";
    reverse?: boolean;
    icon: React.ReactNode;
}

const phases: Phase[] = [
    {
        id: "01",
        title: "Preparation & Onboarding",
        description: "Initial legal selection and document review to establish a solid foundation for your petition.",
        variant: "#14213D",
        icon: <UserCheck className="w-5 h-5 text-[#F65353]" />,
        steps: [
            { label: "Hire Immigration Attorney", icon: <CheckCircle2 className="w-4 h-4 text-gray-400" /> },
            { label: "Sign NDA", icon: <CheckCircle2 className="w-4 h-4 text-gray-400" /> },
            { label: "Receive Offering Documents", icon: <CheckCircle2 className="w-4 h-4 text-gray-400" /> },
            { label: "Submit Partnership Docs", icon: <CheckCircle2 className="w-4 h-4 text-gray-400" /> },
        ],
    },
    {
        id: "02",
        title: "Investment Setup & Verification",
        description: "Financial commitment phase involving escrow security and rigorous compliance reviews.",
        variant: "red",
        reverse: true,
        icon: <FileSignature className="w-5 h-5 text-white" />,
        steps: [
            { label: "Escrow Setup", icon: <CheckCircle2 className="w-4 h-4 text-gray-400" /> },
            { label: "Deposit Funds", icon: <CheckCircle2 className="w-4 h-4 text-gray-400" /> },
            { label: "Deposit Confirmation", icon: <CheckCircle2 className="w-4 h-4 text-gray-400" /> },
            { label: "Deposit Confirmation", icon: <CheckCircle2 className="w-4 h-4 text-gray-400" /> },
            { label: "Investor Admission", icon: <CheckCircle2 className="w-4 h-4 text-gray-400" /> },
        ],
    },
    {
        id: "03",
        title: "Funds Deployment & Petitions Filling",
        description: "The pivotal moment where capital enters the project and legal petitions are formalized with USCIS.",
        variant: "#14213D",
        icon: <HelpingHand className="w-5 h-5 text-[#F65353]" />,
        steps: [
            {
                label: "Fund Deployment",
                description: "Capital is released from escrow to the approved commercial enterprise",
                icon: <Building2 className="w-4 h-4 text-gray-900" />,
            },
            {
                label: "File I-526 Petitions",
                description: "Official submission of the immigrant petitions by investor",
                icon: <ArrowUpFromLine className="w-4 h-4 text-gray-900" />,
            },
        ],
    },
    {
        id: "04",
        title: "Visa & Conditional Residency",
        description: "Transitioning to U.S. residency status through consular processing or adjustment.",
        variant: "#14213D",
        reverse: true,
        icon: <Plane className="w-5 h-5 text-[#F65353]" />,
        steps: [
            {
                label: "Visa Application",
                description: "DS-260 or I-485 filing depending on location.",
                status: "red-border",
            },
            {
                label: "Green Card Issuance",
                description: "Approval of 2-year conditional permanent residency.",
                status: "red-border",
            },
        ],
    },
    {
        id: "05",
        title: "Permanent Residency & Citizenship",
        description: "The final stage: removing conditions and securing your legacy as a U.S. citizen.",
        variant: "red",
        icon: <BadgeCheck className="w-5 h-5 text-white" />,
        steps: [
            { label: "File I-829 Petitions", status: "CRUCIAL STEP", icon: <FileText className="w-4 h-4 text-gray-500" /> },
            { label: "Capital Return Eligibility", icon: <Wallet className="w-4 h-4 text-gray-500" /> },
            { label: "Apply for U.S. Citizenship", icon: <FileSignature className="w-4 h-4 text-gray-500" /> },
        ],
    },
];

export default function ProcessWork() {
    return (
        <section className="bg-white py-10">
            <div className="container mx-auto  px-4 space-y-12">
                {phases.map((phase) => (
                    <div
                        key={phase.id}
                        className={`flex flex-col lg:flex-row min-h-[280px] rounded-sm overflow-hidden shadow-sm bg-[#F2F2F2] ${phase.reverse ? "lg:flex-row-reverse" : ""
                            }`}
                    >
                        {/* Sidebar */}
                        <div
                            className={`flex items-center justify-center w-full lg:w-[150px] py-10 lg:py-0 ${phase.variant === "red" ? "bg-[#F65353]" : "bg-[#121E38]"
                                }`}
                        >
                            <span className="text-[36px] font-medium text-white select-none">
                                {phase.id}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-8 lg:p-12">
                            <div className="flex items-center gap-3 mb-4">
                                {phase.icon}
                                <h3 className="text-xl lg:text-[28px] font-semibold text-[#4C4C4C]">
                                    {phase.title}
                                </h3>
                            </div>
                            <p className="text-[#4C4C4C] text-base lg:text-xl font-normal mb-8 max-w-2xl">
                                {phase.description}
                            </p>

                            {/* Steps Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {phase.steps.map((step, idx) => (
                                    <div
                                        key={idx}
                                        className={`bg-white p-4 rounded-md  flex items-start gap-4 transition-all hover:shadow-md ${step.status === "red-border" ? "border-l-4 border-[#F65353]" : ""
                                            } ${step.description ? "md:col-span-1" : ""}`}
                                    >
                                        <div className="mt-1 flex-shrink-0">{step.icon}</div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium text-[#4C4C4C] text-sm lg:text-base leading-tight">
                                                    {step.label}
                                                </h4>
                                                {step.status === "CRUCIAL STEP" && (
                                                    <span className="text-[#F65353] text-[10px] font-black uppercase tracking-tighter">
                                                        {step.status}
                                                    </span>
                                                )}
                                            </div>
                                            {step.description && (
                                                <p className="text-xs text-[#696969] mt-1 leading-relaxed">
                                                    {step.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Important Note Footer */}
                <div className="mt-16 bg-[#F2F2F2] p-10 text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#F65353]" />
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#F65353] mb-6 transform transition-transform group-hover:rotate-12">
                        <Info className="w-6 h-6 text-[#F65353]" />
                    </div>
                    <h4 className="text-xl lg:text-[28px] font-medium text-[#1F1F1F] mb-4">
                        Important Note: USCIS Processing Times
                    </h4>
                    <p className="text-[#4C4C4C] text-sm lg:text-base font-normal max-w-4xl mx-auto leading-relaxed">
                        EB-5 processing times can fluctuate based on volume and country of origin. Elite Patriot provides updated quarterly reports and case tracking tools to keep our investors informed of their status in real-time. We recommend consultation with your designated legal counsel for the most current adjudication windows.
                    </p>
                </div>
            </div>
        </section>
    );
}
