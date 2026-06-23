/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, MapPin, Calendar, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreateProjectsMutation } from "@/redux/feature/projectSlice";
import RichTextEditor from "@/components/shareUI/RichTextEditor";

const CreateProjectPage = () => {
    const router = useRouter();
    const [createProjects, { isLoading }] = useCreateProjectsMutation();

    // Form state for all fields
    const [formData, setFormData] = useState({
        name: "",
        short_description: "",
        city: "",
        state: "",
        location: "",
        project_start_date: "",
        project_end_date: "",
        is_eb_5_enabled: false,
        total_project_value: "",
        minimum_investment: "",
        roi: "",
        job_impact: "",
    });

    // File state
    const [files, setFiles] = useState({
        business_plan: null as File | null,
        financial_report: null as File | null,
        legal_document: null as File | null,
        agreement: null as File | null,
        banner: null as File | null,
    });

    // Preview state for banner
    const [bannerPreview, setBannerPreview] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitMessage, setSubmitMessage] = useState("");

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;

        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                [name]: (e.target as HTMLInputElement).checked,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof typeof files) => {
        const file = e.target.files?.[0];

        if (file) {
            setFiles((prev) => ({
                ...prev,
                [fileType]: file,
            }));

            if (fileType === "banner") {
                const reader = new FileReader();

                reader.onload = (event) => {
                    setBannerPreview(event.target?.result as string);
                };

                reader.readAsDataURL(file);
            }

            if (errors[fileType]) {
                setErrors((prev) => ({
                    ...prev,
                    [fileType]: "",
                }));
            }
        }
    };

    // Validate form
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Project name is required";
        }

        if (!formData.short_description.trim()) {
            newErrors.short_description = "Description is required";
        }

        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        }

        if (!formData.state.trim()) {
            newErrors.state = "State is required";
        }

        if (!formData.location.trim()) {
            newErrors.location = "Location is required";
        }

        if (!formData.project_start_date) {
            newErrors.project_start_date = "Start date is required";
        }

        if (!formData.project_end_date) {
            newErrors.project_end_date = "End date is required";
        }

        if (formData.project_start_date && formData.project_end_date && formData.project_start_date >= formData.project_end_date) {
            newErrors.project_end_date = "End date must be after start date";
        }

        if (!formData.total_project_value.trim()) {
            newErrors.total_project_value = "Total project value is required";
        }

        if (!formData.minimum_investment.trim()) {
            newErrors.minimum_investment = "Minimum investment is required";
        }

        if (!formData.roi.trim()) {
            newErrors.roi = "ROI is required";
        }

        if (!formData.job_impact.trim()) {
            newErrors.job_impact = "Job impact is required";
        }

        if (!files.banner) {
            newErrors.banner = "Banner image is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Submit form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            setSubmitMessage("Please fix all errors before submitting");
            return;
        }

        const submitFormData = new FormData();

        // Append all text fields
        submitFormData.append("name", formData.name);
        submitFormData.append("short_description", formData.short_description);
        submitFormData.append("city", formData.city);
        submitFormData.append("state", formData.state);
        submitFormData.append("location", formData.location);
        submitFormData.append("project_start_date", formData.project_start_date);
        submitFormData.append("project_end_date", formData.project_end_date);
        submitFormData.append("is_eb_5_enabled", String(formData.is_eb_5_enabled));
        submitFormData.append("total_project_value", formData.total_project_value);
        submitFormData.append("minimum_investment", formData.minimum_investment);
        submitFormData.append("roi", formData.roi);
        submitFormData.append("job_impact", formData.job_impact);

        // Append files
        if (files.business_plan) {
            submitFormData.append("business_plan", files.business_plan);
        }

        if (files.financial_report) {
            submitFormData.append("financial_report", files.financial_report);
        }

        if (files.legal_document) {
            submitFormData.append("legal_document", files.legal_document);
        }

        if (files.agreement) {
            submitFormData.append("agreement", files.agreement);
        }

        if (files.banner) {
            submitFormData.append("banner", files.banner);
        }

        try {
            setSubmitMessage("");
            await createProjects(submitFormData).unwrap();
            setSubmitMessage("Project created successfully!");
            // Reset form
            setTimeout(() => {
                router.push("/dashboard/explore-project");
            }, 1500);
        } catch (error: any) {
            const errorMessage = error && typeof error === "object" && "data" in error && "message" in (error.data ?? {}) ? (error.data as Record<string, unknown>).message : "Failed to create project. Please try again.";
            setSubmitMessage(errorMessage as string);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="pb-20 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 px-4 lg:px-0">
                <div className="flex items-start gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="mt-1 text-[#1F1F1F] hover:text-[#B21F1F] transition-colors"
                    >
                        <ArrowLeft size={28} />
                    </button>
                    <div className="space-y-1">
                        <h1 className="text-[#1F1F1F] text-2xl lg:text-[32px] font-bold italic">Create Project</h1>
                        <p className="text-[#696969] text-sm lg:text-[15px] max-w-2xl leading-relaxed">
                            Initialize a new institutional investment project. Ensure all financial parameters and visual assets align with the Winners Regional quality standards.
                        </p>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#B21F1F] hover:bg-[#8B1818] disabled:bg-[#BDBDBD] text-white font-bold px-10 py-6 text-sm tracking-widest rounded-none uppercase transition-all whitespace-nowrap"
                >
                    SAVE & LIVE NOW
                </button>
            </header>

            {submitMessage && (
                <div className={`mb-6 px-4 py-4 rounded-sm text-sm font-medium ${submitMessage.includes("successfully") ? "bg-[#E8F5E9] text-[#038862]" : "bg-[#FFF7F7] text-[#B21F1F]"
                    }`}>
                    {submitMessage}
                </div>
            )}

            {/* Form Sections */}
            <div className="space-y-6">
                {/* 1. Project Identity */}
                <section className="bg-white p-6 lg:p-10 rounded-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-8 h-8 bg-[#9BA3AF] text-white flex items-center justify-center  font-bold text-sm">
                            1
                        </div>
                        <h2 className="text-[#1F1F1F] text-lg lg:text-2xl font-semibold italic">Project Identity</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#E8E9EC52] p-3 rounded-lg">
                        {/* Left Side: Name and Description */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-[#667085] ml-1">Project name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Project name"
                                    className="w-full p-4 bg-white border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#B21F1F] text-base font-normal"
                                />
                                {errors.name && <p className="text-xs text-[#B21F1F]">{errors.name}</p>}
                            </div>
                            <div className="space-y-2 h-[350px] flex flex-col">
                                <label className="text-xs font-medium text-[#667085] ml-1">Short Description</label>
                                <RichTextEditor
                                    value={formData.short_description}
                                    onChange={(value) => {
                                        setFormData((prev) => ({ ...prev, short_description: value }));
                                        if (errors.short_description) {
                                            setErrors((prev) => ({ ...prev, short_description: "" }));
                                        }
                                    }}
                                    placeholder="Short Description"
                                    className="flex-1"
                                />
                                {errors.short_description && <p className="text-xs text-[#B21F1F]">{errors.short_description}</p>}
                            </div>
                        </div>

                        {/* Right Side: Details */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-[#667085] ml-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="City"
                                    className="w-full p-4 bg-white border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#B21F1F] text-base font-normal"
                                />
                                {errors.city && <p className="text-xs text-[#B21F1F]">{errors.city}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-[#667085] ml-1">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    placeholder="State"
                                    className="w-full p-4 bg-white border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#B21F1F] text-base font-normal"
                                />
                                {errors.state && <p className="text-xs text-[#B21F1F]">{errors.state}</p>}
                            </div>
                            <div className="space-y-2 relative">
                                <label className="text-xs font-medium text-[#667085] ml-1">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder="Location"
                                    className="w-full p-4 bg-white border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#B21F1F] text-[15px]"
                                />
                                <MapPin size={18} className="absolute right-4 bottom-7 text-[#667085]" />
                                {errors.location && <p className="text-xs text-[#B21F1F]">{errors.location}</p>}
                            </div>
                            <div className="space-y-2 relative">
                                <label className="text-xs font-medium text-[#667085] ml-1">Start Date</label>
                                <input
                                    type="date"
                                    name="project_start_date"
                                    value={formData.project_start_date}
                                    onChange={handleInputChange}
                                    className="w-full p-4 bg-white border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#B21F1F] text-base font-normal"
                                />
                                {/* <Calendar size={18} className="absolute right-4 bottom-4 text-[#667085]" /> */}
                                {errors.project_start_date && <p className="text-xs text-[#B21F1F]">{errors.project_start_date}</p>}
                            </div>
                            <div className="space-y-2 relative">
                                <label className="text-xs font-medium text-[#667085] ml-1">End Date</label>
                                <input
                                    type="date"
                                    name="project_end_date"
                                    value={formData.project_end_date}
                                    onChange={handleInputChange}
                                    className="w-full p-4 bg-white border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#B21F1F] text-base font-normal"
                                />
                                {/* <Calendar size={18} className="absolute right-4 bottom-4 text-[#667085]" /> */}
                                {errors.project_end_date && <p className="text-xs text-[#B21F1F]">{errors.project_end_date}</p>}
                            </div>
                            <div className="p-4 bg-white border border-[#EAECF0] rounded-sm flex items-center justify-between">
                                <span className="text-[14px] text-[#667085] font-medium">EB - 5 enable</span>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="is_eb_5_enabled"
                                        checked={formData.is_eb_5_enabled}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 accent-[#B21F1F]"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Financial Parameters */}
                <section className="bg-[#F9FAFB] p-6 lg:p-10 rounded-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-8 h-8 bg-[#9BA3AF] text-white flex items-center justify-center  font-bold text-sm">
                            2
                        </div>
                        <h2 className="text-[#1F1F1F] text-lg lg:text-2xl font-semibold italic">Financial Parameters</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#667085] ml-1">Total project value</label>
                            <input
                                type="text"
                                name="total_project_value"
                                value={formData.total_project_value}
                                onChange={handleInputChange}
                                placeholder="Total project value"
                                className="w-full p-4 bg-white border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#B21F1F] text-[15px]"
                            />
                            {errors.total_project_value && <p className="text-xs text-[#B21F1F]">{errors.total_project_value}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#667085] ml-1">Minimum Investment</label>
                            <input
                                type="text"
                                name="minimum_investment"
                                value={formData.minimum_investment}
                                onChange={handleInputChange}
                                placeholder="Minimum Investment"
                                className="w-full p-4 bg-white border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#B21F1F] text-[15px]"
                            />
                            {errors.minimum_investment && <p className="text-xs text-[#B21F1F]">{errors.minimum_investment}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#667085] ml-1">ROI</label>
                            <input
                                type="text"
                                name="roi"
                                value={formData.roi}
                                onChange={handleInputChange}
                                placeholder="ROI"
                                className="w-full p-4 bg-white border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#B21F1F] text-[15px]"
                            />
                            {errors.roi && <p className="text-xs text-[#B21F1F]">{errors.roi}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#667085] ml-1">Job Impact</label>
                            <input
                                type="number"
                                name="job_impact"
                                value={formData.job_impact}
                                onChange={handleInputChange}
                                placeholder="Job Impact"
                                className="w-full p-4 bg-white border border-[#EAECF0] rounded-sm focus:outline-none focus:border-[#B21F1F] text-[15px]"
                            />
                            {errors.job_impact && <p className="text-xs text-[#B21F1F]">{errors.job_impact}</p>}
                        </div>
                    </div>
                </section>

                {/* 3. Upload Documents */}
                <section className="bg-[#F9FAFB] p-6 lg:p-10 rounded-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-8 h-8 bg-[#9BA3AF] text-white flex items-center justify-center  font-bold text-sm">
                            3
                        </div>
                        <h2 className="text-[#1F1F1F] text-lg lg:text-2xl font-semibold italic">Upload Documents</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Business Plan", key: "business_plan", info: "PDF . 12MB" },
                            { title: "Financial Report", key: "financial_report", info: "Please upload it" },
                            { title: "Legal Documents", key: "legal_document", info: "PDF . 12MB" },
                            { title: "Agreement", key: "agreement", info: "PDF . 12MB" }
                        ].map((doc) => (
                            <div key={doc.key} className="bg-white p-6 rounded-sm border border-[#EAECF0] space-y-4">
                                <div className="space-y-1">
                                    <h3 className="text-[#1F1F1F] text-base lg:text-lg font-bold">{doc.title}</h3>
                                    <p className="text-[#667085] text-xs uppercase tracking-wider">
                                        {files[doc.key as keyof typeof files] ? files[doc.key as keyof typeof files]?.name : doc.info}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="flex-1 py-2 text-xs font-bold border border-[#EAECF0] hover:bg-gray-50 transition-colors uppercase tracking-widest text-center cursor-pointer">
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, doc.key as keyof typeof files)}
                                            accept=".pdf,.doc,.docx,.xlsx,.xls"
                                        />
                                        UPLOAD
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. Visual Assets */}
                <section className="bg-[#F9FAFB] p-6 lg:p-10 rounded-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-8 h-8 bg-[#9BA3AF] text-white flex items-center justify-center font-bold text-sm">
                            4
                        </div>
                        <h2 className="text-[#1F1F1F] text-lg lg:text-2xl font-semibold italic">Visual Assets</h2>
                    </div>

                    <div className="bg-white border border-[#EAECF0] border-dashed rounded-sm py-20 flex flex-col items-center justify-center text-center px-6">
                        <h3 className="text-[#1F1F1F] text-xl lg:text-2xl font-bold italic mb-6">Add a Banner of Your Project</h3>

                        <div className="w-21 h-21 bg-[#F9FAFB] border border-[#EAECF0] rounded-sm flex items-center justify-center mb-6 overflow-hidden">
                            {bannerPreview ? (
                                <Image src={bannerPreview} alt="Banner preview" width={84} height={84} className="w-full h-full object-cover" />
                            ) : (
                                <ImageIcon className="text-[#667085] w-8 h-8" />
                            )}
                        </div>

                        <h4 className="text-[#1F1F1F] text-base font-bold mb-2">Drop Project Media</h4>
                        <p className="text-[#667085] text-sm">
                            Drag and drop architectural renders or <label className="underline cursor-pointer text-[#B21F1F]">
                                browse local files
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e, "banner")}
                                    accept="image/*"
                                />
                            </label>.
                        </p>
                        {errors.banner && <p className="text-xs text-[#B21F1F] mt-2">{errors.banner}</p>}
                    </div>
                </section>
            </div>
        </form>
    );
};

export default CreateProjectPage;

