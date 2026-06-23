type AboutProjectCardProps = {
    title?: string;
    status?: string;
    shortDescription?: string;
    description?: string;
};

export default function AboutProjectCard({
    title = "Winner tower at Milk - Dallas, Texas",
    status = "Active",
    shortDescription = "Winner Tower at MLK is a landmark mixed-use development located in the rapidly growing MLK district of Dallas, Texas.",
    description = "The development aims to support the city's expanding population and business ecosystem by offering state-of-the-art infrastructure, sustainable design, and strong connectivity to key commercial and transportation hubs. With its contemporary architecture and thoughtfully planned amenities, Winner Tower is",
}: AboutProjectCardProps) {
    return (
        <article className="rounded-md bg-[#E8E9EC52] p-4 sm:p-6 xl:col-span-7">
            <p className="mb-2 text-base text-[#F65353] font-normal">| ABOUT PROJECT</p>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-[34px] leading-tight font-semibold italic text-secondary sm:text-[36px]">
                    {title}
                </h1>
                <span className="bg-[#4A556F] px-5 py-1 text-[16px] text-white sm:text-lg font-medium">
                    {status}
                </span>
            </div>
            <div 
                className="mb-4 text-[14px] leading-relaxed text-[#696969] sm:text-[18px] font-normal prose-p:my-0 prose-headings:my-0"
                dangerouslySetInnerHTML={{ __html: shortDescription }}
            />
            <p className="text-[14px] leading-relaxed text-[#696969] sm:text-[18px] font-normal">
                {description}
            </p>
        </article>
    );
}
