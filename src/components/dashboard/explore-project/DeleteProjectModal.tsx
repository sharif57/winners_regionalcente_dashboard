"use client";

import React from "react";
import { X, Loader2, AlertTriangle } from "lucide-react";
import { useDeleteProjectMutation } from "@/redux/feature/projectSlice";

type Props = {
    projectId: number;
    projectTitle: string;
    onClose: () => void;
};

export default function DeleteProjectModal({ projectId, projectTitle, onClose }: Props) {
    const [deleteProject, { isLoading }] = useDeleteProjectMutation();

    async function handleDelete() {
        try {
            await deleteProject(projectId).unwrap();
            onClose();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white w-full max-w-md rounded-sm shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#F2F2F2]">
                    <h2 className="text-[#121E38] text-lg font-semibold">Delete Project</h2>
                    <button onClick={onClose} className="text-[#9E9E9E] hover:text-[#121E38] transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-8 flex flex-col items-center text-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                        <AlertTriangle className="w-7 h-7 text-[#F65353]" />
                    </div>
                    <div>
                        <p className="text-[#1F1F1F] font-semibold text-base">Are you sure?</p>
                        <p className="text-[#696969] text-sm mt-1">
                            You are about to delete{" "}
                            <span className="font-semibold text-[#121E38]">{projectTitle}</span>.
                            This action cannot be undone.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#F2F2F2]">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-sm border border-[#E0E0E0] text-[#696969] text-sm font-medium hover:bg-[#F7F7F8] transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="px-5 py-2.5 rounded-sm bg-[#F65353] text-white text-sm font-medium hover:bg-red-600 transition-all disabled:opacity-60 flex items-center gap-2"
                    >
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isLoading ? "Deleting..." : "Yes, Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}