import { notFound } from "next/navigation";
import UserDetailsClient from "@/components/dashboard/user-management/details/UserDetailsClient";
import { getUserDetailById } from "@/components/dashboard/user-management/mock-data";

export default async function UserDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const userId = Number(id);

    if (!Number.isFinite(userId)) {
        notFound();
    }

    const user = getUserDetailById(userId);

    if (!user) {
        notFound();
    }

    return <UserDetailsClient user={user} />;
}
