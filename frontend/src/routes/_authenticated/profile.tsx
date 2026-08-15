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
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-950">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-violet-500" />
        </div>
    );
}
