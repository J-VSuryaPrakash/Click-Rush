import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/api/auth.api";

export const Route = createFileRoute("/_authenticated")({
    beforeLoad: async ({ context }) => {
        try {
            await context.queryClient.ensureQueryData({
                queryKey: ["auth", "me"],
                queryFn: getCurrentUser,
            });
        } catch {
            throw redirect({
                to: "/login",
            });
        }
    },

    component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
    return (
        <div className="min-h-screen bg-rush-paper text-rush-ink">
            <Navbar />

            <main>
                <Outlet />
            </main>
        </div>
    );
}