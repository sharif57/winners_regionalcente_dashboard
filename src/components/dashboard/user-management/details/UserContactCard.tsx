export default function UserContactCard({
    email,
    note,
    onEmailChange,
    onNoteChange,
    onSubmit,
}: {
    email: string;
    note: string;
    onEmailChange: (value: string) => void;
    onNoteChange: (value: string) => void;
    onSubmit: () => void;
}) {
    return (
        <article className="rounded-[24px] bg-[#F7F8FA] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:p-6">
            <h4 className="text-[22px] font-semibold italic text-[#1F1F1F] sm:text-[26px]">
                Add Note & Contact
            </h4>

            <div className="mt-6 space-y-5 rounded-[20px] bg-white p-5 shadow-sm">
                <input
                    value={email}
                    onChange={(event) => onEmailChange(event.target.value)}
                    className="h-14 w-full border border-[#D5D8DE] px-4 text-lg text-[#1F1F1F] outline-none placeholder:text-[#98A2B3]"
                    placeholder="Email address"
                    type="email"
                />

                <textarea
                    value={note}
                    onChange={(event) => onNoteChange(event.target.value)}
                    className="min-h-[146px] w-full resize-none border border-[#D5D8DE] px-4 py-4 text-lg text-[#1F1F1F] outline-none placeholder:text-[#98A2B3]"
                    placeholder="Add Your Note"
                />

                <button
                    type="button"
                    onClick={onSubmit}
                    className="inline-flex h-14 w-full items-center justify-center bg-[#C91E1E] px-6 text-xl font-semibold text-white transition-colors hover:bg-[#B61B1B]"
                >
                    CONTACT NOW
                </button>
            </div>
        </article>
    );
}
