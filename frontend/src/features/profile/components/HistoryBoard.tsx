import History from "./History.tsx";
import { useProfile, useRanks } from "@/hooks/useProfile.ts";
import EmptyState from "@/components/EmptyState.tsx";
import { useCurrentUser } from "@/hooks/useCurrentUser.ts";
import Loading from "@/components/Loading.tsx";
import StatCell from "@/features/game/components/StatCell.tsx";
import { container, frameHeader, ledgerGrid } from "@/lib/ui";

interface HistoryData {
    id: number;
    score: number;
    endedAt: string;
}

const rankValue = (rank?: number) => (rank !== undefined ? `#${rank}` : "—");
const rankNote = (score?: number) => (score !== undefined ? `Score: ${score}` : undefined);

function HistoryBoard() {


    const { user, isLoading } = useCurrentUser();

    const {
        data: profile
    } = useProfile();

    const {
        data: ranks
    } = useRanks();

    const history: HistoryData[] = profile?.gameHistory ?? [];

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (history.length === 0) {
        return (
            <EmptyState
                title="No games played yet"
                description="Your game profile will appear here once you complete your first ClickRush game."
                buttonText="Play Now"
            />
        )
    }

    const global = ranks?.globalRank?.at(0);
    const daily = ranks?.dailyRank?.at(0);
    const weekly = ranks?.weeklyRank?.at(0);

    return (
        <div className="min-h-[calc(100dvh-4rem)] bg-rush-paper text-rush-ink">
            <div className={`${container} py-5 lg:py-8`}>

                <div className="mx-auto w-full max-w-4xl border border-rush-rule">

                    {/* Header */}
                    <div className={frameHeader}>
                        <h1 className="text-base font-semibold tracking-[-0.01em]">
                            Profile
                        </h1>
                        {user?.data.name && (
                            <p className="truncate text-sm text-rush-muted">
                                {user.data.name}
                            </p>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-px border-b border-rush-rule bg-rush-rule sm:grid-cols-3">
                        <StatCell label="High Score" value={user?.data.bestScore ?? "—"} />
                        <StatCell label="Avg Clicks" value={profile?.avgClick ?? "—"} />
                        <StatCell label="Games Played" value={profile?.numOfGames ?? "—"} />
                    </div>

                    {/* Ranks */}
                    <div className="grid grid-cols-1 gap-px border-b border-rush-rule bg-rush-rule sm:grid-cols-3">
                        <StatCell label="Global Rank" value={rankValue(global?.rank)} note={rankNote(global?.score)} />
                        <StatCell label="Daily Rank" value={rankValue(daily?.rank)} note={rankNote(daily?.score)} />
                        <StatCell label="Weekly Rank" value={rankValue(weekly?.rank)} note={rankNote(weekly?.score)} />
                    </div>

                    {/* History Header */}
                    <div className={frameHeader}>
                        <h2 className="text-base font-semibold tracking-[-0.01em]">
                            Game history
                        </h2>
                    </div>

                    <div className={`${ledgerGrid} h-10 border-b border-rush-rule text-[13px] text-rush-muted`}>
                        <span>S.No</span>
                        <span>Score</span>
                        <span className="text-right">Date</span>
                    </div>

                    {/* History Rows */}
                    <ol>
                        {history.map((game, index) => (
                            <History
                                key={game.id}
                                serialNo={index + 1}
                                score={game.score}
                                date={game.endedAt.split('T')[0]}
                            />
                        ))}
                    </ol>

                </div>

            </div>
        </div>
    );
}

export default HistoryBoard;
