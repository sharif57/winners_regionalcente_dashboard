"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    }), []);

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'link'
    ];

    return (
        <div className={`rich-text-editor-container flex flex-col h-full w-full ${className || ''}`}>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                className="bg-white flex flex-col h-full w-full"
            />
            <style jsx global>{`
                .rich-text-editor-container .quill {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    max-height: 100%;
                    overflow: hidden;
                }
                .rich-text-editor-container .ql-container {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    border-bottom-left-radius: 0.125rem;
                    border-bottom-right-radius: 0.125rem;
                    font-family: inherit;
                    font-size: 1rem;
                    border-color: #EAECF0 !important;
                }
                .rich-text-editor-container .ql-toolbar {
                    flex-shrink: 0;
                    border-top-left-radius: 0.125rem;
                    border-top-right-radius: 0.125rem;
                    background-color: #f9fafb;
                    border-color: #EAECF0 !important;
                }
                .rich-text-editor-container .ql-editor {
                    flex-grow: 1;
                    overflow-y: auto;
                    min-height: 100px;
                }
                .rich-text-editor-container:focus-within .ql-container,
                .rich-text-editor-container:focus-within .ql-toolbar {
                    border-color: #B21F1F !important;
                }
            `}</style>
        </div>
    );
}
