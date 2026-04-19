import type { UserDetail, UserDocumentSection, UserProject, UserRecord, UserStatus } from "./types";

const names = [
    "Olivia Rhye",
    "Mason Carter",
    "Sophia Bennett",
    "Liam Brooks",
    "Ava Mitchell",
    "Noah Turner",
    "Emma Collins",
    "Ethan Foster",
    "Isabella Diaz",
    "James Walker",
];

const countries = ["Bangladesh", "United States", "Canada", "United Kingdom", "UAE"];
const statuses: UserStatus[] = ["Pending", "Completed", "Active", "Active", "Completed", "Pending"];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const projectTitles = [
    "Winner Tower at Milk",
    "Dallas Mixed-Use Development",
    "Harbor Point Residence",
    "Summit Ridge Plaza",
];

const projectImages = [
    "/image/project-1.png",
    "/image/project-2.png",
    "/image/project-3.png",
    "/image/journey.png",
];

function createEmail(name: string, index: number) {
    return `${name.toLowerCase().replace(/\s+/g, ".")}${index + 1}@gmail.com`;
}

function createPhone(index: number) {
    return `01758${String(498500 + index).slice(-6)}`;
}

function createJoiningDate(index: number) {
    const day = (index % 27) + 1;
    const month = months[(index + 2) % months.length];
    return `${day} ${month}, 2026`;
}

export const USER_MANAGEMENT_USERS: UserRecord[] = Array.from({ length: 60 }, (_, index) => {
    const name = names[index % names.length];

    return {
        id: 3066 + index,
        name,
        email: createEmail(name, index),
        phone: createPhone(index),
        country: countries[index % countries.length],
        joiningDate: createJoiningDate(index),
        status: statuses[index % statuses.length],
    };
});

function createDateOfBirth(index: number) {
    const day = (index % 27) + 1;
    const month = months[(index + 5) % months.length];
    const year = 1978 + (index % 16);

    return `${day} ${month}, ${year}`;
}

function createAddress(index: number, country: string): [string, string] {
    const houseNumber = 10 + (index % 80);
    const postalCodes = ["W1J 5AW", "M5V 2T6", "10001", "EC2A 4NE", "1212"];

    return [`${postalCodes[index % postalCodes.length]}`, `${houseNumber} Mayfair Avenue, ${country}`];
}

function createProjects(index: number): UserProject[] {
    const progressValues = [75, 68, 82, 59];

    return Array.from({ length: 2 }, (_, itemIndex) => {
        const projectIndex = (index + itemIndex) % projectTitles.length;

        return {
            id: `project-${index + 1}-${itemIndex + 1}`,
            title: projectTitles[projectIndex],
            invested: `$${(5000 + index * 150 + itemIndex * 500).toLocaleString()} invested`,
            progress: progressValues[(index + itemIndex) % progressValues.length],
            status: itemIndex % 2 === 0 ? "Active" : "Completed",
            image: projectImages[projectIndex],
        };
    });
}

function createDocumentSections(user: UserRecord, index: number): UserDocumentSection[] {
    return [
        {
            id: `identity-${user.id}`,
            step: 1,
            title: "Personal Identity",
            documents: [
                {
                    id: `passport-${user.id}`,
                    title: "Passport Copy",
                    subtitle: "Color scan",
                    fileName: `PASSPORT_${user.id}.PDF`,
                    previewText: `${user.name}'s passport scan uploaded for identity verification.`,
                },
                {
                    id: `address-${user.id}`,
                    title: "Proof of Address",
                    subtitle: "Utility bill or bank statement (Last 90 Day's)",
                    fileName: `ADDRESS_${user.id}.PDF`,
                    previewText: `Address verification document showing residence in ${user.country}.`,
                },
            ],
        },
        {
            id: `finance-${user.id}`,
            step: 2,
            title: "Financial Verification",
            documents: [
                {
                    id: `funds-${user.id}`,
                    title: "Proof of Funds",
                    subtitle: "Color scan",
                    fileName: `SOURCE_OF_FUND_${user.id}.PDF`,
                    previewText: `Proof of fund statement prepared for regional center review.`,
                },
                {
                    id: `bank-${user.id}`,
                    title: "Bank Statement",
                    subtitle: "Last 6 Months",
                    fileName: `BANK_${user.id}.PDF`,
                    previewText: `Six-month bank statement snapshot for compliance review.`,
                },
            ],
        },
        {
            id: `agreement-${user.id}`,
            step: 3,
            title: "Sign to Agreement",
            documents: [
                {
                    id: `signed-${user.id}`,
                    title: "Signed Agreement",
                    subtitle: "Color scan",
                    fileName: `AGREEMENT_${index + 1}.PDF`,
                    previewText: `Signed subscription agreement ready for final approval.`,
                },
            ],
        },
    ];
}

export function getUserRecordById(userId: number) {
    return USER_MANAGEMENT_USERS.find((user) => user.id === userId) ?? null;
}

export function getUserDetailById(userId: number): UserDetail | null {
    const user = getUserRecordById(userId);

    if (!user) {
        return null;
    }

    const index = Math.max(0, user.id - USER_MANAGEMENT_USERS[0].id);

    return {
        ...user,
        avatar: "/image/men.png",
        origin: user.country,
        aumContribution: `£${(2.4 + (index % 5) * 0.35).toFixed(1)}M`,
        addressLines: createAddress(index, user.country),
        dateOfBirth: createDateOfBirth(index),
        projects: createProjects(index),
        documentSections: createDocumentSections(user, index),
    };
}
