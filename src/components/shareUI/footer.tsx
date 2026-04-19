// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { FormEvent, useState } from "react";

// export default function Footer() {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         note: "",
//     });

//     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         console.log("Form submitted:", formData);
//     };

//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     return (
//         <footer className="w-full  bg-[#121E38]">
//             {/* Main Footer Content */}
//             <div className=" w-full  container mx-auto  px-4 py-12 sm:px-6 lg:px-8">
//                 <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 ">
//                     {/* Left Column - Company Info */}
//                     <div className="flex flex-col gap-5">
//                         <div className="flex items-center gap-3">
//                             <Image
//                                 src="/image/logo.svg"
//                                 alt="The Winners Regional Center"
//                                 width={178}
//                                 height={52}
//                                 priority
//                                 className="h-auto w-[146px] sm:w-[160px] lg:w-[178px]"
//                             />
//                         </div>

//                         <p className="text-[14px] leading-relaxed text-white">
//                             We are a United States Immigration Services (USCIS) approved Employment_Based Fifth Preference (EB-5)
//                             immigration investor regional center for the State of Texas.
//                         </p>

//                         <div className="flex flex-col gap-2">
//                             <h3 className="text-[16px] font-bold italic text-white">Address</h3>
//                             <p className="text-[14px] text-white">
//                                 1709 Martin Luther King Jr Blvd, Dallas, TX 75215.
//                             </p>
//                         </div>

//                         <div className="flex flex-col gap-2">
//                             <h3 className="text-[16px] font-bold italic text-white">Call Now</h3>
//                             <Link
//                                 href="tel:1-214-916-8282"
//                                 className="text-[14px] text-white transition-colors hover:text-[#b91d1d]"
//                             >
//                                 1-214-916-8282
//                             </Link>
//                         </div>
//                     </div>

//                     {/* Middle Column - Request an Evaluation Form */}
//                     <div className="flex flex-col gap-4">
//                         <h2 className="text-center text-[28px] font-italic text-white">
//                             Request an Evaluation
//                         </h2>

//                         <div className="h-[3px] w-16 rounded-full bg-[#b91d1d] mx-auto mb-4" />

//                         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//                             <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 w-full">
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     placeholder="Enter your full name"
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     className="h-12 rounded-lg border border-[#E9E9E9] bg-transparent px-4 w-full text-[14px] placeholder-[#8fa3bf] text-white transition-colors focus:border-[#b91d1d] focus:outline-none"
//                                 />

//                                 <input
//                                     type="email"
//                                     name="email"
//                                     placeholder="Enter your email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     className="h-12 rounded-lg border border-[#E9E9E9] w-full bg-transparent px-4 text-[14px] placeholder-[#8fa3bf] text-white transition-colors focus:border-[#b91d1d] focus:outline-none"
//                                 />
//                             </div>

//                             <textarea
//                                 name="note"
//                                 placeholder="Add Note"
//                                 value={formData.note}
//                                 onChange={handleChange}
//                                 rows={4}
//                                 className="rounded-lg border border-[#E9E9E9] bg-transparent px-4 py-3 text-[14px] placeholder-[#8fa3bf] text-white transition-colors focus:border-[#b91d1d] focus:outline-none resize-none"
//                             />

//                             <button
//                                 type="submit"
//                                 className="h-12 w-full bg-[#b91d1d] text-[14px] font-bold uppercase tracking-[0.02em] text-white transition-colors hover:bg-[#9f1717]"
//                             >
//                                 Connect Now
//                             </button>
//                         </form>
//                     </div>

//                     {/* Right Column - Links & Social */}
//                     <div className="flex flex-col gap-8">
//                         {/* Important Links */}
//                         <div className="flex flex-col gap-3">
//                             <h3 className="text-[20px] italic text-white">Important Links</h3>
//                             <div className="h-[2px] w-12 rounded-full bg-[#b91d1d]" />
//                             <nav className="flex flex-col gap-2">
//                                 <Link
//                                     href="#"
//                                     className="text-[14px] text-white transition-colors hover:text-[#b91d1d]"
//                                 >
//                                     About Us
//                                 </Link>
//                                 <Link
//                                     href="#"
//                                     className="text-[14px] text-white transition-colors hover:text-[#b91d1d]"
//                                 >
//                                     How it works
//                                 </Link>
//                                 <Link
//                                     href="#"
//                                     className="text-[14px] text-white transition-colors hover:text-[#b91d1d]"
//                                 >
//                                     Our Projects
//                                 </Link>
//                             </nav>
//                         </div>

//                         {/* Social */}
//                         {/* <div className="flex flex-col gap-3">
//                             <h3 className="text-[20px] font-italic text-white">Social</h3>
//                             <div className="h-[2px] w-12 rounded-full bg-[#b91d1d]" />
//                             <div className="flex items-center gap-3">
//                                 <Link
//                                     href="#"
//                                     className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white transition-colors hover:border-[#b91d1d] hover:text-[#b91d1d]"
//                                     aria-label="Facebook"
//                                 >
//                                     <Facebook className="h-4 w-4" />
//                                 </Link>
//                                 <Link
//                                     href="#"
//                                     className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white transition-colors hover:border-[#b91d1d] hover:text-[#b91d1d]"
//                                     aria-label="Twitter"
//                                 >
//                                     <Pie className="h-4 w-4" />
//                                 </Link>
//                                 <Link
//                                     href="#"
//                                     className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white transition-colors hover:border-[#b91d1d] hover:text-[#b91d1d]"
//                                     aria-label="Instagram"
//                                 >
//                                     <Instagram className="h-4 w-4" />
//                                 </Link>
//                                 <Link
//                                     href="#"
//                                     className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white transition-colors hover:border-[#b91d1d] hover:text-[#b91d1d]"
//                                     aria-label="LinkedIn"
//                                 >
//                                     <Grid3x3 className="h-4 w-4" />
//                                 </Link>
//                             </div>
//                         </div> */}
//                     </div>
//                 </div>
//             </div>

//             {/* Copyright Bar */}
//             <div className="border-t border-[#2a3f5f] bg-[#141f36] py-4">
//                 <div className="mx-auto w-full  px-4 sm:px-6 lg:px-8">
//                     <p className="text-center text-[14px] text-white">
//                         © 2026 All Rights Reserved
//                     </p>
//                 </div>
//             </div>
//         </footer>
//     );
// }
"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Footer() {
    const [formData, setFormData] = useState({ name: "", email: "", note: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", note: "" });
        }, 2500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <footer className="w-full bg-[#121E38]">

            {/* ── Main Content ── */}
            <div className="mx-auto w-full container     px-5 py-14 sm:px-8 lg:px-12">
                <div className="flex flex-wrap gap-10 lg:gap-[200px]">

                    {/* ── Col 1: Brand Info ── */}
                    <div className="flex w-full flex-col gap-5 sm:w-auto sm:flex-1 sm:basis-60">
                        <Image
                            src="/image/logo.svg"
                            alt="The Winners Regional Center"
                            width={178}
                            height={52}
                            priority
                            className="h-auto w-[146px] sm:w-[160px] lg:w-[178px]"
                        />

                        <p className="text-sm leading-relaxed text-[#8fa3bf]">
                            We are a United States Immigration Services (USCIS) approved
                            Employment-Based Fifth Preference (EB-5) immigration investor
                            regional center for the State of Texas.
                        </p>

                        <div className="flex flex-col gap-1">
                            <h3 className="font-['Playfair_Display'] text-base font-bold italic text-white">
                                Address
                            </h3>
                            <p className="text-sm text-[#8fa3bf]">
                                1709 Martin Luther King Jr Blvd, Dallas, TX 75215.
                            </p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <h3 className="font-['Playfair_Display'] text-base font-bold italic text-white">
                                Call Now
                            </h3>
                            <Link
                                href="tel:12149168282"
                                className="text-sm text-[#8fa3bf] transition-colors hover:text-[#b91d1d]"
                            >
                                1-214-916-8282
                            </Link>
                        </div>
                    </div>

                    {/* ── Col 2: Evaluation Form ── */}
                    <div className="flex w-full flex-col gap-4 sm:flex-1 sm:basis-72 lg:order-none">
                        <h2 className="text-center font-['Playfair_Display'] text-[26px] font-normal italic text-white">
                            Request an Evaluation
                        </h2>
                        <div className="mx-auto h-[3px] w-14 rounded-full bg-[#b91d1d]" />

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            {/* Name + Email row */}
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                    className="h-12 w-full rounded-lg border border-white/25 bg-transparent px-4 text-sm text-white placeholder-[#8fa3bf] outline-none transition-all focus:border-[#b91d1d] focus:ring-2 focus:ring-[#b91d1d]/20"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    className="h-12 w-full rounded-lg border border-white/25 bg-transparent px-4 text-sm text-white placeholder-[#8fa3bf] outline-none transition-all focus:border-[#b91d1d] focus:ring-2 focus:ring-[#b91d1d]/20"
                                />
                            </div>

                            {/* Textarea */}
                            <textarea
                                name="note"
                                placeholder="Add Note"
                                value={formData.note}
                                onChange={handleChange}
                                rows={4}
                                className="w-full resize-none rounded-lg border border-white/25 bg-transparent px-4 py-3 text-sm text-white placeholder-[#8fa3bf] outline-none transition-all focus:border-[#b91d1d] focus:ring-2 focus:ring-[#b91d1d]/20"
                            />

                            {/* Submit */}
                            <button
                                type="submit"
                                className={`h-12 w-full text-sm font-semibold uppercase tracking-widest text-white transition-all active:scale-[0.98] ${submitted
                                    ? "bg-green-700 cursor-default"
                                    : "bg-[#b91d1d] hover:bg-[#9f1717]"
                                    }`}
                            >
                                {submitted ? "✓ Message Sent!" : "Connect Now"}
                            </button>
                        </form>
                    </div>

                    {/* ── Col 3: Important Links ── */}
                    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-1 sm:basis-44">
                        <h3 className="font-['Playfair_Display'] text-xl font-normal italic text-white">
                            Important Links
                        </h3>
                        <div className="h-[2px] w-10 rounded-full bg-[#b91d1d]" />

                        <nav className="flex flex-col gap-2">
                            {[
                                { label: "About Us", href: "#" },
                                { label: "How it works", href: "#" },
                                { label: "Our Projects", href: "#" },
                                { label: "EB-5 Program", href: "#" },
                                { label: "Contact Us", href: "#" },
                            ].map(({ label, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="group flex items-center gap-2 text-sm text-[#8fa3bf] transition-colors hover:text-[#b91d1d]"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#b91d1d] opacity-0 transition-opacity group-hover:opacity-100" />
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                </div>
            </div>

            {/* ── Copyright Bar ── */}
            <div className="border-t border-[#2a3f5f] bg-[#0e1a2e] py-4">
                <p className="text-center text-sm text-[#8fa3bf]">
                    © 2026 The Winners Regional Center. All Rights Reserved.
                </p>
            </div>

        </footer>
    );
}