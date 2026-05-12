import { notFound } from "next/navigation";
import UserDetailsClient from "../../../../../components/dashboard/user-management/details/UserDetailsClient";

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

    return <UserDetailsClient userId={userId} />;
}
