"use client";

import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useProjectDetailsQuery, useUpdateProjectMutation } from "@/redux/feature/projectSlice";
// import { useGetProjectByIdQuery, useUpdateProjectMutation } from "@/redux/feature/projectSlice";

type Props = {
    projectId: number;
    onClose: () => void;
};

export default function UpdateProjectModal({ projectId, onClose }: Props) {
    const { data, isLoading } = useProjectDetailsQuery(projectId);
    const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

    const [form, setForm] = useState({
        name: "",
        short_description: "",
        city: "",
        state: "",
        location: "",
        project_start_date: "",
        project_end_date: "",
        total_project_value: "",
        minimum_investment: "",
        roi: "",
        job_impact: "",
        status: "active",
    });

    useEffect(() => {
        if (data?.data) {
            const p = data.data;
            setForm({
                name: p.name ?? "",
                short_description: p.short_description ?? "",
                city: p.city ?? "",
                state: p.state ?? "",
                location: p.location ?? "",
                project_start_date: p.project_start_date ?? "",
                project_end_date: p.project_end_date ?? "",
                total_project_value: p.total_project_value ?? "",
                minimum_investment: p.minimum_investment ?? "",
                roi: p.roi ?? "",
                job_impact: p.job_impact ?? "",
                status: p.status ?? "active",
            });
        }
    }, [data]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("short_description", form.short_description);
        formData.append("city", form.city);
        formData.append("state", form.state);
        formData.append("location", form.location);
        formData.append("project_start_date", form.project_start_date);
        formData.append("project_end_date", form.project_end_date);
        formData.append("total_project_value", form.total_project_value);
        formData.append("minimum_investment", form.minimum_investment);
        formData.append("roi", form.roi);
        formData.append("job_impact", form.job_impact);
        formData.append("status", form.status);

        try {
            await updateProject({ id: projectId, data: formData }).unwrap();
            onClose();
        } catch (err) {
            console.error("Update failed:", err);
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white w-full max-w-2xl rounded-sm shadow-xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#F2F2F2]">
                    <h2 className="text-[#121E38] text-lg font-semibold">Update Project</h2>
                    <button onClick={onClose} className="text-[#9E9E9E] hover:text-[#121E38] transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto flex-1 px-6 py-5">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 className="w-6 h-6 animate-spin text-[#434D64]" />
                        </div>
                    ) : (
                        <form id="update-form" onSubmit={handleSubmit} className="space-y-4">
                            {/* Project Name */}
                            <Field label="Project Name">
                                <input name="name" value={form.name} onChange={handleChange} required className={inputCls} />
                            </Field>

                            {/* Short Description */}
                            <Field label="Short Description">
                                <textarea
                                    name="short_description"
                                    value={form.short_description}
                                    onChange={handleChange}
                                    rows={3}
                                    className={inputCls}
                                />
                            </Field>

                            {/* Row: City & State */}
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="City">
                                    <input name="city" value={form.city} onChange={handleChange} className={inputCls} />
                                </Field>
                                <Field label="State">
                                    <input name="state" value={form.state} onChange={handleChange} className={inputCls} />
                                </Field>
                            </div>

                            {/* Location */}
                            <Field label="Location">
                                <input name="location" value={form.location} onChange={handleChange} className={inputCls} />
                            </Field>

                            {/* Row: Start & End Date */}
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Start Date">
                                    <input type="date" name="project_start_date" value={form.project_start_date} onChange={handleChange} className={inputCls} />
                                </Field>
                                <Field label="End Date">
                                    <input type="date" name="project_end_date" value={form.project_end_date} onChange={handleChange} className={inputCls} />
                                </Field>
                            </div>

                            {/* Row: Total Value & Min Investment */}
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Total Project Value ($)">
                                    <input type="number" name="total_project_value" value={form.total_project_value} onChange={handleChange} className={inputCls} />
                                </Field>
                                <Field label="Minimum Investment ($)">
                                    <input type="number" name="minimum_investment" value={form.minimum_investment} onChange={handleChange} className={inputCls} />
                                </Field>
                            </div>

                            {/* Row: ROI & Job Impact */}
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="ROI">
                                    <input name="roi" value={form.roi} onChange={handleChange} className={inputCls} />
                                </Field>
                                <Field label="Job Impact">
                                    <input name="job_impact" value={form.job_impact} onChange={handleChange} className={inputCls} />
                                </Field>
                            </div>

                            {/* Status */}
                            <Field label="Status">
                                <select name="status" value={form.status} onChange={handleChange} className={inputCls}>
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </Field>
                        </form>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#F2F2F2]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-sm border border-[#E0E0E0] text-[#696969] text-sm font-medium hover:bg-[#F7F7F8] transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="update-form"
                        disabled={isUpdating || isLoading}
                        className="px-5 py-2.5 rounded-sm bg-[#434D64] text-white text-sm font-medium hover:bg-[#121E38] transition-all disabled:opacity-60 flex items-center gap-2"
                    >
                        {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Reusable field wrapper
function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#1F1F1F]">{label}</label>
            {children}
        </div>
    );
}

const inputCls =
    "w-full px-3 py-2.5 bg-[#FCFCFC] border border-[#E0E0E0] rounded-sm text-sm text-[#1F1F1F] focus:outline-none focus:border-[#434D64] transition-all placeholder:text-[#9E9E9E]";