export type UserStatus = "Active" | "Pending" | "Completed";

export interface UserRecord {
    id: number;
    name: string;
    email: string;
    phone: string;
    country: string;
    joiningDate: string;
    status: UserStatus;
}

export interface UserProject {
    id: string;
    title: string;
    invested: string;
    progress: number;
    status: "Active" | "Completed";
    image: string;
}

export interface UserDocument {
    id: string;
    title: string;
    subtitle: string;
    fileName: string;
    previewText: string;
}

export interface UserDocumentSection {
    id: string;
    step: number;
    title: string;
    documents: UserDocument[];
}

export interface UserDetail extends UserRecord {
    avatar: string;
    origin: string;
    aumContribution: string;
    addressLines: [string, string];
    dateOfBirth: string;
    projects: UserProject[];
    documentSections: UserDocumentSection[];
}
