export default function FundingProgressCard() {
    return (
        <article className="rounded-md bg-[#E8E9EC52] p-4 sm:p-6">
            <div className="mb-3 flex items-end justify-between">
                <h2 className="text-2xl font-semibold italic text-secondary sm:text-[36px]">Funding Progress</h2>
                <p className="text-2xl leading-none font-semibold italic text-[#F65353] sm:text-4xl">
                    65%
                    <span className="ml-2 text-[16px] font-normal not-italic text-[#2A2A2A] sm:text-base">(OF 8.0M GOAL)</span>
                </p>
            </div>

            <div className="mb-3 h-3 w-full overflow-hidden rounded-full bg-[#C9C9CC]">
                <div className="h-full w-[65%] bg-[#4A556F]" />
            </div>
            <div className="flex items-center justify-between font-medium text-base text-[#4C4C4C] sm:text-xl">
                <span>$5.2 M Raised</span>
                <span>120 Committed Investor</span>
            </div>
        </article>
    );
}
