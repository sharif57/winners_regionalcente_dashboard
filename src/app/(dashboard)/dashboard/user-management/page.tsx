import StatsBar from "@/components/dashboard/StatsBar";
import UserManagementClient from "@/components/dashboard/user-management/UserManagementClient";

export default function UserManagementPage() {
    return <div className="space-y-8">
        <StatsBar />
        <UserManagementClient />
    </div>;
}
