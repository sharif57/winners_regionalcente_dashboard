"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, X, Plus, Pencil, Trash2, Eye, CheckCircle, AlertCircle, Loader2, FileText, Hash, RefreshCw } from "lucide-react";
import {
    useAgreementFormsQuery,
    useCreateAgreementFormMutation,
    useUpdateAgreementFormMutation,
    useDeleteAgreementFormMutation,
} from "@/redux/feature/evaluationSlice";

// ─── Types ─────────────────────────────────────────────────────────────────────
type ApiForm = { id: number; title: string; file: string; step: number };
type ToastType = "success" | "error";
type Toast = { id: number; type: ToastType; message: string };

type DeleteModalState = { isOpen: boolean; formId: number | null; formTitle: string };

type FormModalState = {
    isOpen: boolean;
    mode: "add" | "edit";
    formId: number | null;
    title: string;
    step: string;
    file: File | null;
    existingFileUrl: string;
    dragOver: boolean;
};

// ─── Toast ─────────────────────────────────────────────────────────────────────
function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
    return (
        <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    style={{ animation: "toastSlide 0.3s ease forwards" }}
                    className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-2xl min-w-[280px] border
            ${t.type === "success" ? "bg-white border-l-4 border-l-emerald-500 border-[#EAECF0]" : "bg-white border-l-4 border-l-red-500 border-[#EAECF0]"}`}
                >
                    {t.type === "success"
                        ? <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                        : <AlertCircle size={16} className="text-red-500 shrink-0" />}
                    <p className="text-[#1F1F1F] text-sm font-medium flex-1">{t.message}</p>
                    <button onClick={() => onDismiss(t.id)} className="text-[#ABABAB] hover:text-[#1F1F1F] transition-colors">
                        <X size={14} />
                    </button>
                </div>
            ))}
        </div>
    );
}

function getApiErrorMessage(error: unknown, fallback: string) {
    if (typeof error === "object" && error !== null && "data" in error) {
        const responseData = (error as { data?: unknown }).data;

        if (typeof responseData === "object" && responseData !== null) {
            const message = (responseData as { message?: unknown }).message;
            if (typeof message === "string" && message.trim()) {
                return message;
            }

            const detail = (responseData as { detail?: unknown }).detail;
            if (typeof detail === "string" && detail.trim()) {
                return detail;
            }

            const errors = (responseData as { errors?: unknown }).errors;
            if (Array.isArray(errors) && errors.length > 0) {
                const firstError = errors[0];
                if (typeof firstError === "string" && firstError.trim()) {
                    return firstError;
                }
            }

            const nonFieldErrors = (responseData as { non_field_errors?: unknown }).non_field_errors;
            if (Array.isArray(nonFieldErrors) && nonFieldErrors.length > 0) {
                const firstError = nonFieldErrors[0];
                if (typeof firstError === "string" && firstError.trim()) {
                    return firstError;
                }
            }
        }
    }

    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    return fallback;
}

// ─── Delete Confirm Modal ──────────────────────────────────────────────────────
function DeleteConfirmModal({ modal, onConfirm, onCancel, isLoading }: {
    modal: DeleteModalState; onConfirm: () => void; onCancel: () => void; isLoading: boolean;
}) {
    if (!modal.isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 shadow-2xl" style={{ animation: "modalIn 0.2s ease" }}>
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                        <Trash2 size={26} className="text-[#B21F1F]" />
                    </div>
                    <div>
                        <h3 className="text-[#1F1F1F] text-lg font-bold mb-1">Delete Form?</h3>
                        <p className="text-[#696969] text-sm leading-relaxed">
                            Are you sure you want to delete <span className="font-semibold text-[#1F1F1F]">&ldquo;{modal.formTitle}&rdquo;</span>? This cannot be undone.
                        </p>
                    </div>
                    <div className="flex gap-3 w-full">
                        <button onClick={onCancel} disabled={isLoading}
                            className="flex-1 border border-[#D0D5DD] text-[#667085] hover:bg-[#F9FAFB] font-semibold py-2.5 text-sm rounded-lg transition-colors">
                            Cancel
                        </button>
                        <button onClick={onConfirm} disabled={isLoading}
                            className="flex-1 bg-[#B21F1F] hover:bg-[#8B1818] text-white font-semibold py-2.5 text-sm rounded-lg flex items-center justify-center gap-2 transition-colors">
                            {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Add / Edit Modal ──────────────────────────────────────────────────────────
function FormModal({ modal, onClose, onSubmit, isLoading, onChange }: {
    modal: FormModalState;
    onClose: () => void;
    onSubmit: () => void;
    isLoading: boolean;
    onChange: (p: Partial<FormModalState>) => void;
}) {
    if (!modal.isOpen) return null;

    const handleFile = (file: File) => {
        const ok = ["application/pdf", "image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (ok.includes(file.type)) onChange({ file });
        else alert("Only PDF or image files accepted.");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden" style={{ animation: "modalIn 0.2s ease" }}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAECF0]">
                    <div>
                        <h2 className="text-[#1F1F1F] text-base font-bold">
                            {modal.mode === "add" ? "Add New Form" : "Edit Form"}
                        </h2>
                        <p className="text-[#696969] text-xs mt-0.5">
                            {modal.mode === "add" ? "Fill in the details and upload a file" : "Update form details"}
                        </p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-[#F9FAFB] flex items-center justify-center text-[#696969] hover:text-[#1F1F1F] transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="px-6 py-5 space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-[#344054] font-semibold text-sm mb-1.5">
                            Form Title <span className="text-[#B21F1F]">*</span>
                        </label>
                        <input
                            type="text"
                            value={modal.title}
                            onChange={(e) => onChange({ title: e.target.value })}
                            placeholder="e.g. NDA Agreement, Form 7"
                            className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#1F1F1F] text-sm placeholder-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#B21F1F]/20 focus:border-[#B21F1F] transition-all"
                        />
                    </div>

                    {/* Step */}
                    <div>
                        <label className="block text-[#344054] font-semibold text-sm mb-1.5">
                            Step Number <span className="text-[#B21F1F]">*</span>
                        </label>
                        <div className="relative">
                            <Hash size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C0C0C0]" />
                            <input
                                type="number"
                                min={1}
                                value={modal.step}
                                onChange={(e) => onChange({ step: e.target.value })}
                                placeholder="1"
                                className="w-full pl-9 pr-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#1F1F1F] text-sm placeholder-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#B21F1F]/20 focus:border-[#B21F1F] transition-all"
                            />
                        </div>
                    </div>

                    {/* File */}
                    <div>
                        <label className="block text-[#344054] font-semibold text-sm mb-1.5">
                            File {modal.mode === "add" && <span className="text-[#B21F1F]">*</span>}
                            {modal.mode === "edit" && <span className="text-[#ABABAB] font-normal"> (optional — keep empty to keep current)</span>}
                        </label>

                        {modal.file ? (
                            <div className="flex items-center gap-3 px-3.5 py-3 border border-emerald-300 bg-emerald-50 rounded-lg">
                                <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-[9px] font-black shrink-0">
                                    {modal.file.type.startsWith("image/") ? "IMG" : "PDF"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[#1F1F1F] font-medium text-sm truncate">{modal.file.name}</p>
                                    <p className="text-emerald-600 text-xs">{(modal.file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                                <button onClick={() => onChange({ file: null })} className="text-[#696969] hover:text-[#B21F1F] transition-colors">
                                    <X size={16} />
                                </button>
                            </div>

                        ) : modal.existingFileUrl && modal.mode === "edit" ? (
                            <div className="flex items-center gap-3 px-3.5 py-3 border border-[#D0D5DD] bg-[#F9FAFB] rounded-lg">
                                <div className="w-9 h-9 rounded-lg bg-[#EAECF0] flex items-center justify-center shrink-0">
                                    <FileText size={18} className="text-[#696969]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[#1F1F1F] font-medium text-sm truncate">Current file</p>
                                    <a href={modal.existingFileUrl} target="_blank" rel="noreferrer" className="text-[#B21F1F] text-xs hover:underline">
                                        View file ↗
                                    </a>
                                </div>
                                <label className="cursor-pointer text-xs font-semibold text-white bg-[#B21F1F] hover:bg-[#8B1818] px-3 py-1.5 rounded-md transition-colors shrink-0">
                                    Replace
                                    <input type="file" accept=".pdf,image/*" className="hidden"
                                        onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
                                </label>
                            </div>

                        ) : (
                            <div
                                onDragOver={(e) => { e.preventDefault(); onChange({ dragOver: true }); }}
                                onDragLeave={() => onChange({ dragOver: false })}
                                onDrop={(e) => { e.preventDefault(); onChange({ dragOver: false }); if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]); }}
                                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
                  ${modal.dragOver ? "border-[#B21F1F] bg-red-50" : "border-[#D0D5DD] hover:border-[#B21F1F]/50 hover:bg-[#FAFAFA]"}`}
                            >
                                <input type="file" accept=".pdf,image/*" id="modal-file" className="hidden"
                                    onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
                                <label htmlFor="modal-file" className="cursor-pointer">
                                    <div className={`w-10 h-10 rounded-full mx-auto mb-2.5 flex items-center justify-center transition-colors
                    ${modal.dragOver ? "bg-[#B21F1F]" : "bg-[#F2F4F7]"}`}>
                                        <Upload size={18} className={modal.dragOver ? "text-white" : "text-[#667085]"} />
                                    </div>
                                    <p className="text-[#344054] text-sm font-semibold">
                                        {modal.dragOver ? "Drop here!" : "Click to upload"}
                                        {!modal.dragOver && <span className="font-normal text-[#696969]"> or drag and drop</span>}
                                    </p>
                                    <p className="text-[#ABABAB] text-xs mt-1">PDF, JPG, PNG, WEBP</p>
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 px-6 pb-6">
                    <button onClick={onClose} disabled={isLoading}
                        className="flex-1 border border-[#D0D5DD] text-[#344054] hover:bg-[#F9FAFB] font-semibold py-2.5 text-sm rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button onClick={onSubmit} disabled={isLoading}
                        className="flex-1 bg-[#B21F1F] hover:bg-[#8B1818] text-white font-semibold py-2.5 text-sm rounded-lg flex items-center justify-center gap-2 transition-colors">
                        {isLoading ? <Loader2 size={14} className="animate-spin" /> : modal.mode === "add" ? <Plus size={14} /> : <CheckCircle size={14} />}
                        {modal.mode === "add" ? "Add Form" : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── File View Modal ───────────────────────────────────────────────────────────
function ViewModal({ url, title, onClose }: { url: string; title: string; onClose: () => void }) {
    const isImg = /\.(jpg|jpeg|png|webp|gif|svg)(\?|$)/i.test(url);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl max-w-2xl w-full" style={{ animation: "modalIn 0.2s ease" }} onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#EAECF0]">
                    <div className="flex items-center gap-2.5">
                        <FileText size={16} className="text-[#B21F1F]" />
                        <span className="text-[#1F1F1F] font-semibold text-sm">{title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <a href={url} target="_blank" rel="noreferrer"
                            className="text-xs font-semibold text-[#B21F1F] hover:underline px-3 py-1.5 border border-[#B21F1F]/30 rounded-md hover:bg-red-50 transition-colors">
                            Open ↗
                        </a>
                        <button onClick={onClose} className="w-7 h-7 rounded-full hover:bg-[#F9FAFB] flex items-center justify-center text-[#696969]">
                            <X size={16} />
                        </button>
                    </div>
                </div>
                <div className="bg-[#F9FAFB] flex items-center justify-center min-h-[400px] p-6">
                    {isImg ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={url} alt={title} className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-md" />
                    ) : (
                        <div className="flex flex-col items-center gap-5 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-[#B21F1F]/10 border border-[#B21F1F]/20 flex items-center justify-center">
                                <FileText size={36} className="text-[#B21F1F]" />
                            </div>
                            <div>
                                <p className="text-[#1F1F1F] font-bold text-base mb-1">{title}</p>
                                <p className="text-[#696969] text-sm mb-4">PDF Document</p>
                                <a href={url} target="_blank" rel="noreferrer"
                                    className="bg-[#B21F1F] hover:bg-[#8B1818] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors inline-flex items-center gap-2">
                                    <Eye size={14} /> Open PDF
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Form Card (matches screenshot layout exactly) ─────────────────────────────
function FormCard({ form, onView, onUpload, onEdit, onDelete }: {
    form: ApiForm;
    onView: () => void;
    onUpload: () => void;
    onEdit: () => void;
    onDelete: () => void;
}) {
    const hasFile = !!form.file;
    const isImg = /\.(jpg|jpeg|png|webp|gif|svg)(\?|$)/i.test(form.file || "");

    const fileLabel = hasFile
        ? isImg ? "Image file" : "PDF · file attached"
        : "Pdf file only";

    return (
        <div className="bg-white border border-[#E4E7EC] rounded-lg p-4 hover:shadow-md transition-shadow duration-200 group relative">
            {/* Top row: title + action icons */}
            <div className="flex items-start justify-between mb-1">
                <h3 className="text-[#1F1F1F] font-bold text-sm leading-snug">{form.title}</h3>
                {/* Edit / Delete icons — always visible but subtle */}
                <div className="flex items-center gap-1 ml-2 shrink-0">
                    <button
                        onClick={onEdit}
                        title="Edit"
                        className="w-6 h-6 rounded flex items-center justify-center text-[#C0C0C0] hover:text-[#1F1F1F] hover:bg-[#F2F4F7] transition-colors"
                    >
                        <Pencil size={12} />
                    </button>
                    <button
                        onClick={onDelete}
                        title="Delete"
                        className="w-6 h-6 rounded flex items-center justify-center text-[#C0C0C0] hover:text-[#B21F1F] hover:bg-red-50 transition-colors"
                    >
                        <Trash2 size={12} />
                    </button>
                </div>
            </div>

            {/* Step badge */}
            <div className="mb-1">
                <span className="text-[10px] font-bold text-[#B21F1F] bg-red-50 px-1.5 py-0.5 rounded-full">
                    STEP {form.step}
                </span>
            </div>

            {/* File size / type label */}
            <p className="text-[#696969] text-xs mb-3">{fileLabel}</p>

            {/* Buttons row */}
            <div className="flex gap-2">
                {hasFile && (
                    <button
                        onClick={onView}
                        className="flex items-center gap-1.5 px-8 py-1.5 border border-[#D0D5DD] text-[#344054] text-lg font-semibold  hover:bg-[#F9FAFB] transition-colors"
                    >
                        {/* <Eye size={12} /> */}
                        VIEW
                    </button>
                )}
                <button
                    onClick={onUpload}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 border text-lg font-semibold  transition-colors
            ${hasFile
                            ? "border text-[#121E38] hover:bg-red-50"
                            : "border text-[#344054] hover:bg-[#F9FAFB]"
                        }`}
                >
                    {hasFile ? (
                        <> REUPLOAD NOW</>
                    ) : (
                        <> UPLOAD NOW</>
                    )}
                </button>
            </div>
        </div>
    );
}

// ─── Reupload / Upload Inline Modal ────────────────────────────────────────────
function UploadDrawer({ form, onClose, onDone, isLoading, onChange: onChangeProp }: {
    form: ApiForm | null;
    onClose: () => void;
    onDone: (file: File) => void;
    isLoading: boolean;
    onChange?: () => void;
}) {
    const [file, setFile] = useState<File | null>(null);
    const [drag, setDrag] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    if (!form) return null;

    const handleFile = (f: File) => {
        const ok = ["application/pdf", "image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (ok.includes(f.type)) setFile(f);
        else alert("Only PDF or image files accepted.");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl overflow-hidden" style={{ animation: "modalIn 0.2s ease" }}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAECF0]">
                    <div>
                        <h3 className="text-[#1F1F1F] font-bold text-sm">
                            {form.file ? "Reupload File" : "Upload File"}
                        </h3>
                        <p className="text-[#696969] text-xs mt-0.5">{form.title} · Step {form.step}</p>
                    </div>
                    <button onClick={onClose} className="w-7 h-7 rounded-full hover:bg-[#F9FAFB] flex items-center justify-center text-[#696969]">
                        <X size={16} />
                    </button>
                </div>

                <div className="p-5">
                    {file ? (
                        <div className="flex items-center gap-3 px-3.5 py-3 border border-emerald-300 bg-emerald-50 rounded-lg mb-4">
                            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-[9px] font-black shrink-0">
                                {file.type.startsWith("image/") ? "IMG" : "PDF"}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[#1F1F1F] font-medium text-sm truncate">{file.name}</p>
                                <p className="text-emerald-600 text-xs">{(file.size / (1024 * 1024)).toFixed(2)} MB · Ready</p>
                            </div>
                            <button onClick={() => setFile(null)} className="text-[#696969] hover:text-red-500 transition-colors">
                                <X size={15} />
                            </button>
                        </div>
                    ) : (
                        <div
                            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                            onDragLeave={() => setDrag(false)}
                            onDrop={(e) => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]); }}
                            onClick={() => inputRef.current?.click()}
                            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all mb-4
                ${drag ? "border-[#B21F1F] bg-red-50" : "border-[#D0D5DD] hover:border-[#B21F1F]/50 hover:bg-[#FAFAFA]"}`}
                        >
                            <input ref={inputRef} type="file" accept=".pdf,image/*" className="hidden"
                                onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
                            <div className={`w-10 h-10 rounded-full mx-auto mb-2.5 flex items-center justify-center transition-colors
                ${drag ? "bg-[#B21F1F]" : "bg-[#F2F4F7]"}`}>
                                <Upload size={18} className={drag ? "text-white" : "text-[#667085]"} />
                            </div>
                            <p className="text-[#344054] text-sm font-semibold">
                                {drag ? "Drop here!" : "Click or drag to upload"}
                            </p>
                            <p className="text-[#ABABAB] text-xs mt-1">PDF, JPG, PNG, WEBP</p>
                        </div>
                    )}

                    <div className="flex gap-2.5">
                        <button onClick={onClose} disabled={isLoading}
                            className="flex-1 border border-[#D0D5DD] text-[#344054] hover:bg-[#F9FAFB] font-semibold py-2.5 text-sm rounded-lg transition-colors">
                            Cancel
                        </button>
                        <button
                            onClick={() => { if (file) onDone(file); }}
                            disabled={!file || isLoading}
                            className="flex-1 bg-[#B21F1F] hover:bg-[#8B1818] disabled:opacity-50 text-white font-semibold py-2.5 text-sm rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                            {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                            Upload
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function EvaluationFormList() {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [deleteModal, setDeleteModal] = useState<DeleteModalState>({ isOpen: false, formId: null, formTitle: "" });
    const [formModal, setFormModal] = useState<FormModalState>({
        isOpen: false, mode: "add", formId: null, title: "", step: "", file: null, existingFileUrl: "", dragOver: false,
    });
    const [viewModal, setViewModal] = useState<{ form: ApiForm | null; open: boolean }>({ form: null, open: false });
    const [uploadDrawer, setUploadDrawer] = useState<{ form: ApiForm | null; open: boolean }>({ form: null, open: false });
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [uploading, setUploading] = useState(false);

    const { data, isLoading, isError, refetch } = useAgreementFormsQuery(undefined);
    const [createAgreementForm] = useCreateAgreementFormMutation();
    const [updateAgreementForm] = useUpdateAgreementFormMutation();
    const [deleteAgreementForm] = useDeleteAgreementFormMutation();

    const forms: ApiForm[] = data?.data ?? [];

    const toast = useCallback((type: ToastType, message: string) => {
        const id = Date.now();
        setToasts((p) => [...p, { id, type, message }]);
        setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
    }, []);

    // ── Open modals ──
    const openAdd = () => setFormModal({ isOpen: true, mode: "add", formId: null, title: "", step: "", file: null, existingFileUrl: "", dragOver: false });
    const openEdit = (f: ApiForm) => setFormModal({ isOpen: true, mode: "edit", formId: f.id, title: f.title, step: String(f.step), file: null, existingFileUrl: f.file, dragOver: false });
    const closeFormModal = () => setFormModal((p) => ({ ...p, isOpen: false }));

    // ── Add / Edit submit ──
    const handleFormSubmit = async () => {
        const { mode, formId, title, step, file } = formModal;
        if (!title.trim()) { toast("error", "Please enter a form title."); return; }
        if (!step || isNaN(Number(step)) || Number(step) < 1) { toast("error", "Please enter a valid step number."); return; }
        if (mode === "add" && !file) { toast("error", "Please upload a file."); return; }

        setSubmitting(true);
        try {
            const fd = new FormData();
            fd.append("title", title.trim());
            fd.append("step", step);
            if (file) fd.append("file", file);

            if (mode === "add") {
                await createAgreementForm(fd).unwrap();
                toast("success", `"${title}" created successfully!`);
            } else {
                await updateAgreementForm({ id: formId, data: fd }).unwrap();
                toast("success", `"${title}" updated successfully!`);
            }
            closeFormModal();
        } catch (error) {
            const message = getApiErrorMessage(
                error,
                mode === "add" ? "Failed to create form." : "Failed to update form."
            );
            toast("error", message);
        } finally {
            setSubmitting(false);
        }
    };

    // ── Delete ──
    const handleDelete = async () => {
        if (!deleteModal.formId) return;
        setDeleting(true);
        try {
            await deleteAgreementForm(deleteModal.formId).unwrap();
            toast("success", `"${deleteModal.formTitle}" deleted.`);
            setDeleteModal({ isOpen: false, formId: null, formTitle: "" });
        } catch {
            toast("error", "Failed to delete form.");
        } finally {
            setDeleting(false);
        }
    };

    // ── Upload / Reupload (file only patch) ──
    const handleUploadDone = async (file: File) => {
        if (!uploadDrawer.form) return;
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append("title", uploadDrawer.form.title);
            fd.append("step", String(uploadDrawer.form.step));
            fd.append("file", file);
            await updateAgreementForm({ id: uploadDrawer.form.id, data: fd }).unwrap();
            toast("success", `File uploaded for "${uploadDrawer.form.title}"`);
            setUploadDrawer({ form: null, open: false });
        } catch {
            toast("error", "Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    // ── Loading ──
    if (isLoading) {
        return (
            <div className="p-6 bg-[#F9FAFB] min-h-screen">
                <div className="bg-white rounded-xl border border-[#E4E7EC] p-6">
                    <div className="h-7 w-36 bg-gray-100 rounded-lg animate-pulse mb-6" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="border border-[#E4E7EC] rounded-lg p-4 animate-pulse">
                                <div className="h-4 w-20 bg-gray-100 rounded mb-2" />
                                <div className="h-3 w-16 bg-gray-50 rounded mb-4" />
                                <div className="flex gap-2">
                                    <div className="h-8 w-16 bg-gray-100 rounded" />
                                    <div className="h-8 flex-1 bg-gray-100 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <AlertCircle size={40} className="text-[#B21F1F] mb-3 opacity-60" />
                <h3 className="text-[#1F1F1F] font-bold text-lg mb-2">Failed to load forms</h3>
                <p className="text-[#696969] text-sm mb-4">Something went wrong while fetching agreement forms.</p>
                <button onClick={() => refetch()} className="bg-[#B21F1F] text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-[#8B1818] transition-colors">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <>
            <style>{`
        @keyframes toastSlide { from { opacity:0; transform:translateX(12px); } to { opacity:1; transform:translateX(0); } }
        @keyframes modalIn    { from { opacity:0; transform:scale(0.96);      } to { opacity:1; transform:scale(1);    } }
      `}</style>

            <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((p) => p.filter((t) => t.id !== id))} />

            <DeleteConfirmModal
                modal={deleteModal}
                onConfirm={handleDelete}
                onCancel={() => setDeleteModal({ isOpen: false, formId: null, formTitle: "" })}
                isLoading={deleting}
            />

            <FormModal
                modal={formModal}
                onClose={closeFormModal}
                onSubmit={handleFormSubmit}
                isLoading={submitting}
                onChange={(p) => setFormModal((prev) => ({ ...prev, ...p }))}
            />

            {viewModal.open && viewModal.form && (
                <ViewModal
                    url={viewModal.form.file}
                    title={viewModal.form.title}
                    onClose={() => setViewModal({ form: null, open: false })}
                />
            )}

            <UploadDrawer
                form={uploadDrawer.open ? uploadDrawer.form : null}
                onClose={() => setUploadDrawer({ form: null, open: false })}
                onDone={handleUploadDone}
                isLoading={uploading}
            />

            {/* ── Page ── */}
            <div className="p-4 sm:p-6 bg-[#F9FAFB] min-h-screen">
                <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 sm:p-6">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                        <h1 className="text-[#1F1F1F] text-xl font-bold italic">
                            Total {forms.length} Forms
                        </h1>
                        <button
                            onClick={openAdd}
                            className="flex items-center gap-1.5 bg-[#B21F1F] hover:bg-[#8B1818] active:scale-95 text-white font-bold px-4 py-2 text-xs tracking-widest uppercase rounded-lg shadow transition-all"
                        >
                            <Plus size={14} />
                            Add New Form
                        </button>
                    </div>

                    {/* Empty state */}
                    {forms.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-16 h-16 rounded-full bg-[#F2F4F7] border-2 border-dashed border-[#D0D5DD] flex items-center justify-center mb-4">
                                <FileText size={28} className="text-[#C0C0C0]" />
                            </div>
                            <p className="text-[#1F1F1F] font-bold mb-1">No forms yet</p>
                            <p className="text-[#696969] text-sm mb-4">Add your first agreement form to get started.</p>
                            <button onClick={openAdd} className="bg-[#B21F1F] text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-[#8B1818] transition-colors flex items-center gap-1.5">
                                <Plus size={14} /> Add Form
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {forms.map((form) => (
                                <FormCard
                                    key={form.id}
                                    form={form}
                                    onView={() => setViewModal({ form, open: true })}
                                    onUpload={() => setUploadDrawer({ form, open: true })}
                                    onEdit={() => openEdit(form)}
                                    onDelete={() => setDeleteModal({ isOpen: true, formId: form.id, formTitle: form.title })}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}