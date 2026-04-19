"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserContactCard from "./UserContactCard";
import UserDetailsTopBar from "./UserDetailsTopBar";
import UserDocumentPreviewDialog from "./UserDocumentPreviewDialog";
import UserDocumentsBoard from "./UserDocumentsBoard";
import UserProfileHero from "./UserProfileHero";
import UserProjectList from "./UserProjectList";
import type { UserDetail, UserDocument, UserStatus } from "../types";

export default function UserDetailsClient({ user }: { user: UserDetail }) {
    const [currentStatus, setCurrentStatus] = useState<UserStatus>(user.status);
    const [contactEmail, setContactEmail] = useState(user.email);
    const [note, setNote] = useState("");
    const [selectedDocument, setSelectedDocument] = useState<UserDocument | null>(null);
    const [selectedSectionTitle, setSelectedSectionTitle] = useState("");

    function handleApprove() {
        setCurrentStatus("Completed");
    }

    function handleReject() {
        setCurrentStatus("Pending");
    }

    function handleDocumentView(sectionTitle: string, document: UserDocument) {
        setSelectedSectionTitle(sectionTitle);
        setSelectedDocument(document);
    }

    function handleContactNow() {
        const subject = encodeURIComponent(`Regarding ${user.name}'s documents`);
        const body = encodeURIComponent(
            note || `Hello ${user.name},\n\nI wanted to follow up on your submitted documents.`
        );

        window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    }

    return (
        <>
            <div className="space-y-6">
                <UserDetailsTopBar user={user} />
                <UserProfileHero user={user} status={currentStatus} />
                <UserProjectList projects={user.projects} />

                <section className="space-y-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h3 className="text-[28px] font-semibold italic text-[#1F1F1F] sm:text-[34px]">
                                Documents
                            </h3>
                            <p className="mt-2 text-lg text-[#5D6169]">
                                Review the documents and update the status.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button
                                variant="outline"
                                className="h-12 border-[#D5D8DE] bg-white px-8 text-lg font-semibold text-[#1F2937] hover:bg-[#F8FAFC]"
                                onClick={handleReject}
                            >
                                REJECT
                            </Button>
                            <Button
                                className="h-12 rounded-none bg-[#C91E1E] px-8 text-lg font-semibold text-white hover:bg-[#B61B1B]"
                                onClick={handleApprove}
                            >
                                APPROVE
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-2">
                        <UserDocumentsBoard
                            sections={user.documentSections.slice(0, 2)}
                            onDocumentView={handleDocumentView}
                        />

                        <UserDocumentsBoard
                            sections={user.documentSections.slice(2)}
                            onDocumentView={handleDocumentView}
                        />

                        <div className="xl:col-start-2 xl:row-start-2">
                            <UserContactCard
                                email={contactEmail}
                                note={note}
                                onEmailChange={setContactEmail}
                                onNoteChange={setNote}
                                onSubmit={handleContactNow}
                            />
                        </div>
                    </div>
                </section>
            </div>

            <UserDocumentPreviewDialog
                sectionTitle={selectedSectionTitle}
                document={selectedDocument}
                onClose={() => setSelectedDocument(null)}
            />
        </>
    );
}
