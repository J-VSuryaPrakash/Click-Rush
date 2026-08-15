import { Outlet, createFileRoute } from "@tanstack/react-router";
import Navbar from "@/features/game/components/Navbar";

export const Route = createFileRoute("/_authenticated")({
    component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
    return (
        <div className="min-h-screen bg-slate-950">
            <Navbar />

            <main>
                <Outlet />
            </main>
        </div>
    );
}