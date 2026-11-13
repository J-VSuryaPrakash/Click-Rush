import Spinner from "@/components/Spinner";
import HistoryBoard from '@/features/profile/components/HistoryBoard'
import { createFileRoute } from '@tanstack/react-router'
import { getCurrentUser } from '@/api/auth.api';
import { redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/profile')({
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
    <HistoryBoard />
  </div>
}

function PageLoader() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-rush-paper">
            <Spinner />
        </div>
    );
}
