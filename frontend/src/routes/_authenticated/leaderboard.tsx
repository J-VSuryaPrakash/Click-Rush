import Spinner from "@/components/Spinner";
import { getCurrentUser } from '@/api/auth.api';
import Board from '@/features/leaderboard/components/Board'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/leaderboard')({
  beforeLoad: async () => {
    try {
      await getCurrentUser();
    } catch {
      throw redirect({
        to: '/login'
      })
    }
  },
  component: RouteComponent,
  pendingComponent: PageLoader
})

function RouteComponent() {
  return <div>
    <Board />
  </div>
}

function PageLoader() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-rush-paper">
            <Spinner />
        </div>
    );
}
