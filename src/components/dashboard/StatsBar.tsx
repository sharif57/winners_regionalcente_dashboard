"use client";


const portfolioStats = [
    { label: "TOTAL USERS", value: "500" },
    { label: "TOTAL INVESTMENT", value: "8.2 B" },
    { label: "ACTIVE  PROJECT", value: "3" },
    { label: "PENDING REQUEST", value: "12", labelClassName: "text-[#F65353]" },
];

export default function StatsBar() {
    return (
        <div className="mb-5 bg-white px-4 py-4 sm:mb-7 sm:px-6 sm:py-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0">
                {portfolioStats.map((item, index) => (
                    <div
                        key={item.label}
                        className={`px-3 sm:px-4 xl:px-6 ${index !== portfolioStats.length - 1
                            ? "xl:border-r xl:border-[#C9C9CB]"
                            : ""
                            }`}
                    >
                        <p
                            className={`text-base leading-tight font-normal uppercase ${item.labelClassName ?? "text-secondary"}`}
                        >
                            {item.label}
                        </p>
                        <p className={`mt-1 text-2xl lg:text-[32px]  font-black italic text-[#1F1F1F] sm:text-[40px] ${item.labelClassName ?? "text-secondary"}`}>
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
