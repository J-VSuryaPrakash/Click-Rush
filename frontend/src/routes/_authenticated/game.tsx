import Spinner from "@/components/Spinner";
import { createFileRoute } from '@tanstack/react-router'
import GamePage from '@/pages/GamePage';
import { getCurrentUser } from '@/api/auth.api';

export const Route = createFileRoute("/_authenticated/game")({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData({
      queryKey: ["auth", "me"],
      queryFn: getCurrentUser,
    });

    return {
      user,
    };
  },

  component: RouteComponent,
  pendingComponent: PageLoader
});

function RouteComponent() {
  return <div>
    <GamePage />
  </div>
}

function PageLoader() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-rush-paper">
      <Spinner />
    </div>
  );
}