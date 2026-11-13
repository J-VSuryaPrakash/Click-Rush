import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient;
}>()({
    component: RootLayout,
});

function RootLayout() {
    return (
        <div className="min-h-screen bg-rush-paper text-rush-ink">
            <Outlet />
        </div>
    );
}
