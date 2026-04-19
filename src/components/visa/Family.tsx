import Image from 'next/image'
import React from 'react'

// ── Types ────────────────────────────────────────────────────────────────────

type Section = {
    id: number
    badge?: string
    heading: string
    paragraphs: string[]
    bullets?: string[]
    image: string
    imageAlt: string
    reverse?: boolean
    bgColor?: string
    border?: string
}

// ── Data ────────────────────────────────────────────────────────────────────

const sections: Section[] = [
    {
        id: 1,
        badge: "migration to the US Program",
        heading: "Family Migration To The United States",
        paragraphs: [
            "The EB-5 visa program was created by Congress in 1990 to stimulate the U.S. economy by attracting foreign investment and creating jobs. The EB-5 visa program is a citizen-investor program, which means that the investor and their qualifying family members are eligible to live and work in the United States.",
            "Currently, standard investment amount is $1.05 and $800,000 for Targeted Employment Area (TEA). TEA program is for investment in high-unemployment areas or rural areas, and special interest areas. The EB-5 program currently allows for the minimum investment of $800,000 in those areas.",
            "After two years, if the investment has met the job creation or preservation requirements, the investor and family members are granted permanent residents status, then they can expect a five year path to become citizens. Processing of EB-5 visas typically takes about 3 to 12 months.",
        ],
        image: "/image/image.png",
        imageAlt: "Family Migration",
        reverse: false,
        border: "border-b border-[#E5E5E5]",
        bgColor: "bg-white",
    },
    {
        id: 2,
        heading: "Is It Worth It?",
        paragraphs: [
            "The EB-5 visa is one of the most reliable and fastest ways to obtain a Green Card. If you're looking to provide your family with the security and opportunities of American life, this is the most direct path to lawful permanent residency.",
            "The EB-5 Reform and Integrity Act of 2022 has made the investment process more secure and streamlined for EB-5 program.",
        ],
        bullets: [
            "Path to US Green Card",
            "Live, work and study anywhere in the United States",
            "Apply for Social Security Card and...",
            "No educational background required",
            "Green Card holders can lead to US citizenship after 5 years",
        ],
        image: "/image/image2.png",
        imageAlt: "Is It Worth It?",
        reverse: true,
        bgColor: "bg-white",
        border: "border-b border-[#E5E5E5]",
    },
    {
        id: 3,
        heading: "Costs",
        paragraphs: [
            "EB-5 program has three distinct costs that you need to know about during the process. It is important to know that accountability will be required for the funds you plan on investing, which are:",
            "You will need to provide detailed documentation on the source of all funds, and may require the services of professionals to assist in this process.",
        ],
        bullets: [
            "Personal funds that belong to you",
            "Administrative fees (escrow fee)",
            "Legal fees and government filing fees",
        ],
        image: "/image/image3.png",
        imageAlt: "Costs",
        reverse: false,
        bgColor: "bg-white",
        border: "border-b border-[#E5E5E5]",
    },
    {
        id: 4,
        heading: "We provide answers for free",
        paragraphs: [
            "It can be easier than you probably think. The first step is to call us and follow an EB-5 visa consultant and discover our investment offering. Together we can help your family obtain U.S. Green Cards through an EB-5 investment.",
        ],
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000",
        imageAlt: "Answers",
        reverse: true,
        bgColor: "bg-white",
        border: "border-b border-[#E5E5E5]",
    },
]

// ── Sub-components ───────────────────────────────────────────────────────────

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="mt-6 space-y-4 font-medium text-[#1f1f1f]">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b91d1d]" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    )
}

function SectionBlock({ section }: { section: Section }) {
    const { badge, heading, paragraphs, bullets, image, imageAlt, reverse, bgColor, border } = section

    return (
        <section className={`px-4 py-12 lg:px-0 lg:py-10 ${bgColor ?? ""} ${border ?? ""}`}>
            <div
                className={`mx-auto flex max-w-[1240px] flex-col items-center gap-10 lg:gap-20
                    ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}
            >
                {/* Image */}
                <div className="relative h-[350px] w-full overflow-hidden rounded-sm sm:h-[450px] lg:h-[770px] lg:w-1/2">
                    <Image
                        src={image}
                        alt={imageAlt}
                        fill
                        className="object-cover"
                        priority={section.id === 1}
                    />
                </div>

                {/* Text */}
                <div className="w-full lg:w-1/2">
                    {/* Badge */}
                    {badge && (
                        <div className="mb-4 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#F65353]" />
                            <span className="text-base font-medium uppercase tracking-widest text-[#F65353]">
                                {badge}
                            </span>
                        </div>
                    )}

                    {/* Heading */}
                    <h2 className="mb-6 text-3xl font-semibold italic text-secondary sm:text-4xl">
                        {heading}
                    </h2>

                    {/* Paragraphs */}
                    <div className="space-y-2 text-lg font-normal leading-relaxed text-[#1F1F1F] ">
                        {paragraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>

                    {/* Bullets */}
                    {bullets && bullets.length > 0 && (
                        <BulletList items={bullets} />
                    )}
                </div>
            </div>
        </section>
    )
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function Family() {
    return (
        <div>
            {sections.map((section) => (
                <SectionBlock key={section.id} section={section} />
            ))}

            {/* ── Final CTA ── */}
            <section className="border-t border-[#eee] bg-white px-4 py-16 sm:py-24">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-10 text-2xl font-semibold italic leading-tight text-secondary sm:text-3xl lg:text-[28px]">
                        Begin your EB-5 journey to US Permanent Residency for your family by getting expert advice.
                    </h2>
                    <button className="bg-primary px-12 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[#9f1717] sm:text-base">
                        REACHOUT NOW
                    </button>
                </div>
            </section>
        </div>
    )
}