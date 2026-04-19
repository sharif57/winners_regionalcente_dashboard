import { TopStat } from "./types";

type TopStatsBarProps = {
    stats: TopStat[];
};

export default function TopStatsBar({ stats }: TopStatsBarProps) {
    return (
        <div className="mb-3 rounded-sm bg-[#E8E9EC52] p-5 sm:mb-4 sm:p-7">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5 xl:gap-0">
                {stats.map((item, idx) => (
                    <div
                        key={item.label}
                        className={`px-2 sm:px-4 ${idx !== stats.length - 1 ? "xl:border-r xl:border-[#BEBFC2]" : ""}`}
                    >
                        <p className="text-base font-medium text-[#4C4C4C]">{item.label}</p>
                        <p className="mt-1 text-[26px] leading-none font-black italic text-secondary sm:text-[32px]">
                            {item.value}
                            {item.sub ? (
                                <span className="ml-2 text-[12px] font-medium not-italic text-[#038862] sm:text-base">
                                    {item.sub}
                                </span>
                            ) : null}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
