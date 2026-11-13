import { memo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLeaderBoard } from "@/hooks/useLeaderBoard";
import type { Leader } from "@/api/leaderboard.api";

type Period = "daily" | "weekly" | "global";

const periods: Period[] = ["daily", "weekly", "global"];

const ROW_LIMIT = 10;

const rowGrid = "grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-3 px-5";

const focusRing =
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rush-ink";

interface LiveLeaderboardProps {
    currentUserId?: string;
    onOpenFull: () => void;
}

function LiveLeaderboard({ currentUserId, onOpenFull }: LiveLeaderboardProps) {
    const [period, setPeriod] = useState<Period>("daily");
    const { data: leaders = [], isLoading, isError } = useLeaderBoard(period);
    const rows = leaders.slice(0, ROW_LIMIT);

    return (
        <div className="flex h-full flex-col">

            {/* Header */}
            <div className="flex h-14 items-center justify-between gap-4 border-b border-rush-rule px-5">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-rush-ink">
                    Leaderboard
                </h2>

                <div aria-label="Leaderboard period" role="group" className="flex h-full items-stretch gap-4">
                    {periods.map((p) => {
                        const active = p === period;
                        return (
                            <button
                                key={p}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setPeriod(p)}
                                className={`-mb-px cursor-pointer border-b-2 text-[13px] capitalize ${focusRing} ${
                                    active
                                        ? "border-rush-accent text-rush-ink"
                                        : "border-transparent text-rush-muted hover:text-rush-ink active:text-rush-ink"
                                }`}
                            >
                                {p}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Column heads */}
            <div className={`${rowGrid} h-9 border-b border-rush-rule text-[13px] text-rush-muted`}>
                <span>Rank</span>
                <span>Player</span>
                <span className="text-right">Score</span>
            </div>

            {/* Rows */}
            <div className="flex-1">
                {isLoading && (
                    <ul aria-label="Loading leaderboard">
                        {Array.from({ length: 6 }, (_, i) => (
                            <li key={i} className={`${rowGrid} h-11 border-b border-rush-rule`}>
                                <span className="h-3 w-5 bg-rush-panel" />
                                <span className="h-3 w-28 bg-rush-panel" />
                                <span className="h-3 w-10 bg-rush-panel" />
                            </li>
                        ))}
                    </ul>
                )}

                {!isLoading && isError && (
                    <p className="px-5 py-6 text-sm text-rush-muted">
                        Couldn&rsquo;t load the leaderboard.
                    </p>
                )}

                {!isLoading && !isError && rows.length === 0 && (
                    <p className="px-5 py-6 text-sm text-rush-muted">
                        No scores yet. Finish a round to set the first one.
                    </p>
                )}

                {!isLoading && !isError && rows.length > 0 && (
                    <ol>
                        {rows.map((leader: Leader) => {
                            const isMe = leader.id === currentUserId;
                            return (
                                <li
                                    key={leader.id}
                                    aria-current={isMe ? "true" : undefined}
                                    className={`${rowGrid} h-11 border-b border-rush-rule text-sm tabular-nums ${
                                        isMe ? "bg-rush-panel" : ""
                                    }`}
                                >
                                    <span className={isMe ? "text-rush-accent" : "text-rush-muted"}>
                                        {String(Number(leader.rank)).padStart(2, "0")}
                                    </span>

                                    <span className={`truncate ${isMe ? "font-semibold text-rush-ink" : "text-rush-ink"}`}>
                                        {leader.username}
                                        {isMe && <span className="ml-2 font-normal text-rush-muted">you</span>}
                                    </span>

                                    <span className="text-right font-medium text-rush-ink">
                                        {leader.score}
                                    </span>
                                </li>
                            );
                        })}
                    </ol>
                )}
            </div>

            {/* Footer */}
            <div className="border-t border-rush-rule px-5 py-3">
                <button
                    type="button"
                    onClick={onOpenFull}
                    className={`inline-flex h-9 cursor-pointer items-center gap-2 text-sm font-medium text-rush-ink hover:text-rush-accent active:text-rush-accent-press ${focusRing}`}
                >
                    Full leaderboard
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

export default memo(LiveLeaderboard);
